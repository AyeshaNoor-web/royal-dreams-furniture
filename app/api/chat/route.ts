import Anthropic from "@anthropic-ai/sdk";
import { runAgent, type ChatEvent } from "@/lib/ai/agent";
import { chatRequestSchema, prepareHistory, redact } from "@/lib/ai/guard";
import { clientIp, json, sameOrigin } from "@/lib/request-guard";
import { rateLimit } from "@/lib/ratelimit";
import { SITE, whatsappLink } from "@/lib/site";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const TIMEOUT_MS = 25_000;
const FALLBACK = whatsappLink(`Hello ${SITE.name}, I have a question about made-to-measure furniture.`);

const aiAvailable = () => process.env.AI_CHAT_ENABLED === "true" && Boolean(process.env.ANTHROPIC_API_KEY);

/** Streams newline-delimited JSON events. 503 ai_disabled tells the browser to use the keyword matcher instead. */
export async function POST(req: Request) {
  if (!aiAvailable()) return json(503, { ok: false, code: "ai_disabled" });
  if (!sameOrigin(req)) return json(403, { ok: false, error: "Forbidden" });
  const limit = await rateLimit(clientIp(req), "chat");
  if (!limit.success) return json(429, { ok: false, error: "Too many messages. Please wait a minute, or continue on WhatsApp.", whatsapp: FALLBACK });

  const parsed = chatRequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json(422, { ok: false, error: "Invalid message", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
  const history = prepareHistory(parsed.data.messages);
  if (history.length === 0) return json(422, { ok: false, error: "Empty message" });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: TIMEOUT_MS });
  const model = process.env.CHAT_MODEL || "claude-haiku-5-5";
  const estimatorEnabled = process.env.NEXT_PUBLIC_ESTIMATOR_ENABLED === "true";
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(ctrl) {
      const emit = (e: ChatEvent) => ctrl.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
      try {
        for await (const e of runAgent(history, { client, model, estimatorEnabled, signal: controller.signal })) emit(e);
        emit({ type: "done" });
      } catch (e) {
        // No message content, phone numbers or emails in logs: only the error class.
        console.error("chat: " + redact(e instanceof Error ? e.name + ": " + e.message.slice(0, 120) : "unknown error"));
        emit({ type: "error", message: "I lost the connection for a moment. You can try again, or continue with a designer on WhatsApp." });
        emit({ type: "link", label: "Talk to a designer on WhatsApp", href: FALLBACK, external: true });
        emit({ type: "done" });
      } finally {
        clearTimeout(timer);
        ctrl.close();
      }
    },
    cancel() {
      controller.abort();
      clearTimeout(timer);
    },
  });

  return new Response(body, { headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" } });
}
