import { NextResponse } from "next/server";
import { knownPages, systemPrompt } from "@/lib/chat-knowledge";
import { topicsFor } from "@/lib/chatbot";
import { whatsappLink } from "@/lib/site";

// The AI side of the chat assistant, on Groq's free plan. It needs GROQ_API_KEY in the environment.
// Without the key, or when the free limit is used up or the call fails, it answers with an error
// status and the browser falls back to the built-in answers, so the chat always works.

export const runtime = "nodejs";

interface Turn {
  role: "user" | "bot";
  text: string;
}

// Tried in order. Each model has its own free allowance, so when one is used up the next still answers,
// and a retired model name does not break the chat. Override with CHAT_MODELS="model-a,model-b".
const MODELS = (process.env.CHAT_MODELS ?? "llama-3.3-70b-versatile,openai/gpt-oss-120b,llama-3.1-8b-instant").split(",").map((m) => m.trim()).filter(Boolean);
const MAX_TURNS = 8;
const MAX_CHARS = 500;

// Best-effort limit per visitor. It lives in memory, so it resets when the server instance restarts.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
};

const pages = new Map(knownPages.map((p) => [p.path, p.label]));

/** Splits the model reply into the text and the optional "LINK: path" line, and keeps only links to real pages. */
const parse = (raw: string, lastQuestion: string) => {
  let target = "";
  const kept: string[] = [];
  for (const line of raw.trim().split("\n")) {
    const m = /^\s*\**LINK:\**\s*<?([^\s>]+)>?\s*$/i.exec(line);
    if (m) target = m[1];
    else kept.push(line);
  }
  const text = kept.join("\n").replace(/\*\*/g, "").trim();
  if (!target) return { text };
  if (target.toLowerCase() === "whatsapp") {
    return { text, lead: true, link: { label: "Chat on WhatsApp", href: whatsappLink(`Hello, I asked on your website: "${lastQuestion}".`), external: true } };
  }
  const path = target.replace(/^https?:\/\/[^/]+/i, "");
  const label = pages.get(path);
  return label ? { text, link: { label, href: path } } : { text };
};

async function ask(key: string, model: string, messages: { role: string; content: string }[]) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, temperature: 0.4, max_tokens: 350 }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content?.trim() || null;
}

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ ok: false, configured: false }, { status: 503 });

  const body = (await req.json().catch(() => null)) as { messages?: unknown } | null;
  const input = Array.isArray(body?.messages) ? (body.messages as Turn[]) : [];
  const turns = input
    .filter((m) => m && (m.role === "user" || m.role === "bot") && typeof m.text === "string" && m.text.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text.trim().slice(0, MAX_CHARS) }));
  while (turns.length && turns[0].role === "assistant") turns.shift();
  const last = turns[turns.length - 1];
  if (!last || last.role !== "user") return NextResponse.json({ ok: false, error: "No question" }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many messages" }, { status: 429 });

  // Only the collections this conversation is about are sent in full, newest question first.
  const asked = turns.filter((t) => t.role === "user").map((t) => t.content).reverse();
  const focus: string[] = [];
  for (const q of asked) for (const s of topicsFor(q)) if (!focus.includes(s) && focus.length < 2) focus.push(s);

  const messages = [{ role: "system", content: systemPrompt(focus) }, ...turns];
  for (const model of MODELS) {
    try {
      const raw = await ask(key, model, messages);
      if (raw) return NextResponse.json({ ok: true, ...parse(raw, last.content) });
    } catch {
      // Timed out or unreachable: try the next model.
    }
  }
  return NextResponse.json({ ok: false }, { status: 502 });
}
