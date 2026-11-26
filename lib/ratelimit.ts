import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type Bucket = "estimate" | "lead" | "chat";

/** Requests allowed per window, per IP. */
const limits: Record<Bucket, { requests: number; window: `${number} ${"s" | "m" | "h"}` }> = {
  estimate: { requests: 30, window: "1 m" },
  lead: { requests: 5, window: "10 m" },
  chat: { requests: 20, window: "1 m" },
};

const toMs = (w: string) => {
  const [n, u] = w.split(" ");
  return Number(n) * (u === "s" ? 1000 : u === "m" ? 60_000 : 3_600_000);
};

let warned = false;
const memory = new Map<string, number[]>();

/** Per-instance fallback. Serverless instances do not share it, so it only slows an attacker down. */
const memoryLimit = (key: string, bucket: Bucket) => {
  const { requests, window } = limits[bucket];
  const now = Date.now();
  const since = now - toMs(window);
  const hits = (memory.get(key) ?? []).filter((t) => t > since);
  hits.push(now);
  memory.set(key, hits);
  if (memory.size > 5000) memory.clear();
  return { success: hits.length <= requests, remaining: Math.max(0, requests - hits.length) };
};

const limiters = new Map<Bucket, Ratelimit>();
const upstash = (bucket: Bucket) => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  let l = limiters.get(bucket);
  if (!l) {
    const { requests, window } = limits[bucket];
    l = new Ratelimit({ redis: new Redis({ url, token }), limiter: Ratelimit.slidingWindow(requests, window), prefix: "mfc:" + bucket });
    limiters.set(bucket, l);
  }
  return l;
};

export async function rateLimit(ip: string, bucket: Bucket): Promise<{ success: boolean; remaining: number }> {
  const l = upstash(bucket);
  if (l) {
    try {
      const r = await l.limit(ip);
      return { success: r.success, remaining: r.remaining };
    } catch {
      // Redis unreachable: fall through to memory rather than block every visitor.
    }
  } else if (!warned && process.env.NODE_ENV === "production") {
    warned = true;
    console.warn("rate limit: UPSTASH_REDIS_REST_URL/TOKEN not set, using per-instance memory limiter");
  }
  return memoryLimit(bucket + ":" + ip, bucket);
}

/** Test hook. */
export const resetMemoryLimiter = () => memory.clear();
