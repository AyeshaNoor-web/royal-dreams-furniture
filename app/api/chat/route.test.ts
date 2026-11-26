import { beforeEach, describe, expect, it, vi } from "vitest";

// The SDK is replaced with a scripted client so the route can be exercised without a key or network.
const streamMock = vi.fn();
vi.mock("@anthropic-ai/sdk", () => ({
  default: class {
    messages = { stream: streamMock };
  },
}));

import { POST } from "@/app/api/chat/route";
import { resetMemoryLimiter } from "@/lib/ratelimit";

const scripted = (text: string) => ({
  async *[Symbol.asyncIterator]() {
    for (const w of text.split(" ")) yield { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: w + " " } };
  },
  finalMessage: async () => ({ content: [{ type: "text", text }], stop_reason: "end_turn" }),
});

const post = (body: unknown, headers: Record<string, string> = {}) =>
  POST(new Request("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000", host: "localhost:3000", "x-forwarded-for": "203.0.113.9", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  }));

const events = async (res: Response) => (await res.text()).trim().split("\n").map((l) => JSON.parse(l) as { type: string; text?: string; href?: string; message?: string });

describe("POST /api/chat", () => {
  beforeEach(() => {
    process.env.AI_CHAT_ENABLED = "true";
    process.env.ANTHROPIC_API_KEY = "test-key";
    resetMemoryLimiter();
    streamMock.mockReset();
  });

  it("answers 503 ai_disabled when the flag or key is missing, so the browser falls back to the matcher", async () => {
    process.env.AI_CHAT_ENABLED = "false";
    const res = await post({ messages: [{ role: "user", content: "hi" }] });
    expect(res.status).toBe(503);
    expect((await res.json()).code).toBe("ai_disabled");
    process.env.AI_CHAT_ENABLED = "true";
    delete process.env.ANTHROPIC_API_KEY;
    expect((await post({ messages: [{ role: "user", content: "hi" }] })).status).toBe(503);
  });

  it("rejects foreign origins and malformed bodies", async () => {
    expect((await post({ messages: [{ role: "user", content: "hi" }] }, { origin: "https://evil.example" })).status).toBe(403);
    expect((await post("{nope")).status).toBe(422);
    expect((await post({ messages: [{ role: "user", content: "x".repeat(5000) }] })).status).toBe(422);
    expect((await post({ messages: [{ role: "assistant", content: "only assistant" }] })).status).toBe(422);
  });

  it("streams newline-delimited text events and a done marker", async () => {
    streamMock.mockReturnValue(scripted("Hello from the assistant"));
    const res = await post({ messages: [{ role: "user", content: "hello" }] });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/x-ndjson");
    const ev = await events(res);
    expect(ev.filter((e) => e.type === "text").map((e) => e.text).join("")).toBe("Hello from the assistant ");
    expect(ev.at(-1)?.type).toBe("done");
    const params = streamMock.mock.calls[0][0];
    expect(params.model).toBe("claude-haiku-5-5");
    expect(params.max_tokens).toBe(400);
  });

  it("turns an SDK failure into a friendly message with a WhatsApp link, not a 500", async () => {
    streamMock.mockImplementation(() => { throw Object.assign(new Error("boom 050 433 5872"), { status: 500 }); });
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const res = await post({ messages: [{ role: "user", content: "hello" }] });
    expect(res.status).toBe(200);
    const ev = await events(res);
    expect(ev.some((e) => e.type === "error" && /WhatsApp/.test(e.message ?? ""))).toBe(true);
    expect(ev.some((e) => e.type === "link" && e.href?.startsWith("https://wa.me/"))).toBe(true);
    expect(spy.mock.calls[0][0]).not.toContain("050 433 5872");
    spy.mockRestore();
  });

  it("turns a key, credits or permission rejection into a fallback event so the matcher answers", async () => {
    for (const [status, msg] of [[401, "rejected"], [402, "rejected"], [403, "rejected"], [400, "Your credit balance is too low to access the Anthropic API."]] as const) {
      resetMemoryLimiter();
      streamMock.mockImplementation(() => { throw Object.assign(new Error(msg), { status }); });
      const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
      const ev = await events(await post({ messages: [{ role: "user", content: "hello" }] }));
      expect(ev.map((e) => e.type)).toEqual(["fallback", "done"]);
      spy.mockRestore();
    }
  });

  it("rate limits after 20 messages a minute from one IP", async () => {
    streamMock.mockReturnValue(scripted("ok"));
    let last = 0;
    for (let i = 0; i < 21; i++) last = (await post({ messages: [{ role: "user", content: "hi" }] })).status;
    expect(last).toBe(429);
  });
});
