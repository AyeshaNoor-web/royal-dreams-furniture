import { beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/estimate/route";
import { resetMemoryLimiter } from "@/lib/ratelimit";

const post = (body: unknown, headers: Record<string, string> = {}) =>
  POST(
    new Request("http://localhost:3000/api/estimate", {
      method: "POST",
      headers: { "content-type": "application/json", origin: "http://localhost:3000", host: "localhost:3000", "x-forwarded-for": "203.0.113.7", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );

const good = { items: [{ collection: "sofas", size: 4, tier: "standard", extras: [] }] };

describe("POST /api/estimate", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_ESTIMATOR_ENABLED = "true";
    resetMemoryLimiter();
  });

  it("returns a range for a valid basket", async () => {
    const res = await post(good);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.result.total.min).toBeLessThan(data.result.total.max);
    expect(JSON.stringify(data)).not.toMatch(/"rates"/);
  });

  it("404s when the estimator is disabled", async () => {
    process.env.NEXT_PUBLIC_ESTIMATOR_ENABLED = "false";
    expect((await post(good)).status).toBe(404);
  });

  it("rejects a foreign or missing origin", async () => {
    expect((await post(good, { origin: "https://evil.example" })).status).toBe(403);
    const res = await POST(new Request("http://localhost:3000/api/estimate", { method: "POST", headers: { host: "localhost:3000" }, body: JSON.stringify(good) }));
    expect(res.status).toBe(403);
  });

  it("returns structured 422 errors for bad input", async () => {
    const res = await post({ items: [{ collection: "sofas", size: "big", tier: "gold" }] });
    expect(res.status).toBe(422);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(Array.isArray(data.issues)).toBe(true);
    expect(data.issues.some((i: { path: string }) => i.path.includes("tier"))).toBe(true);
  });

  it("rejects unknown extras and malformed JSON", async () => {
    const res = await post({ items: [{ collection: "sofas", size: 4, tier: "standard", extras: ["gold-leaf"] }] });
    expect(res.status).toBe(422);
    expect((await res.json()).code).toBe("unknown_extra");
    expect((await post("{not json")).status).toBe(422);
  });

  it("rate limits after 30 requests a minute from one IP", async () => {
    let last = 0;
    for (let i = 0; i < 31; i++) last = (await post(good)).status;
    expect(last).toBe(429);
    expect((await post(good, { "x-forwarded-for": "198.51.100.9" })).status).toBe(200);
  });
});
