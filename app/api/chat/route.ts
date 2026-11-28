import { NextResponse } from "next/server";
import { knownPages, systemPrompt } from "@/lib/chat-knowledge";
import { whatsappLink } from "@/lib/site";

// The AI side of the chat assistant. It needs ANTHROPIC_API_KEY in the environment. Without the key
// (or when the call fails) it answers 503 and the browser falls back to the built-in keyword answers,
// so the chat always works.

export const runtime = "nodejs";

interface Turn {
  role: "user" | "bot";
  text: string;
}

const MODEL = process.env.CHAT_MODEL ?? "claude-haiku-5-5";
const MAX_TURNS = 12;
const MAX_CHARS = 600;

// Best-effort limit per visitor. It lives in memory, so it resets when the server instance restarts.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 25;
const hits = new Map<string, number[]>();

const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
};

let cachedPrompt: string | null = null;
const prompt = () => (cachedPrompt ??= systemPrompt());

const pages = new Map(knownPages.map((p) => [p.path, p.label]));

/** Splits the model reply into the text and the optional "LINK: path" line, and keeps only links to real pages. */
const parse = (raw: string, lastQuestion: string) => {
  const lines = raw.trim().split("\n");
  let target = "";
  const kept: string[] = [];
  for (const line of lines) {
    const m = /^\s*LINK:\s*(\S+)\s*$/i.exec(line);
    if (m) target = m[1];
    else kept.push(line);
  }
  const text = kept.join("\n").trim();
  if (!target) return { text };
  if (target.toLowerCase() === "whatsapp") {
    return { text, lead: true, link: { label: "Chat on WhatsApp", href: whatsappLink(`Hello, I asked on your website: "${lastQuestion}".`), external: true } };
  }
  const path = target.replace(/^https?:\/\/[^/]+/i, "");
  const label = pages.get(path);
  return label ? { text, link: { label, href: path } } : { text };
};

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ ok: false, configured: false }, { status: 503 });

  const body = (await req.json().catch(() => null)) as { messages?: unknown } | null;
  const input = Array.isArray(body?.messages) ? (body.messages as Turn[]) : [];
  const turns = input
    .filter((m) => m && (m.role === "user" || m.role === "bot") && typeof m.text === "string" && m.text.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role === "user" ? ("user" as const) : ("assistant" as const), content: m.text.trim().slice(0, MAX_CHARS) }));

  // The API wants the conversation to start with the visitor and to alternate, so merge neighbours.
  const messages: { role: "user" | "assistant"; content: string }[] = [];
  for (const t of turns) {
    if (messages.length === 0 && t.role === "assistant") continue;
    const prev = messages[messages.length - 1];
    if (prev && prev.role === t.role) prev.content += "\n" + t.content;
    else messages.push({ ...t });
  }
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") return NextResponse.json({ ok: false, error: "No question" }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many messages" }, { status: 429 });

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 450,
        system: [{ type: "text", text: prompt(), cache_control: { type: "ephemeral" } }],
        messages,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const raw = (data.content ?? []).filter((b) => b.type === "text").map((b) => b.text ?? "").join("").trim();
    if (!raw) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.json({ ok: true, ...parse(raw, last.content.split("\n").pop() ?? "") });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
