// Input limits, sanitising and log redaction for the assistant. Pure functions, unit-tested.
import { z } from "zod";

export const MAX_INPUT_CHARS = 1000;
export const MAX_TURNS = 20;
export const MAX_TOOL_ROUNDS = 3;
export const MAX_TOKENS = 400;

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(MAX_INPUT_CHARS * 4),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(MAX_TURNS * 2 + 1),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

/** Strips control characters and invisible direction marks, collapses whitespace, caps the length. */
export const sanitize = (text: string) =>
  text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁦-⁩]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, MAX_INPUT_CHARS);

/**
 * Keeps the last MAX_TURNS exchanges, makes sure the history alternates and ends with a user turn, and sanitises
 * every user message. Assistant turns are our own earlier output and are kept as they are.
 */
export function prepareHistory(messages: ChatMessage[]): ChatMessage[] {
  const cleaned: ChatMessage[] = [];
  for (const m of messages) {
    const content = m.role === "user" ? sanitize(m.content) : m.content.trim().slice(0, 4000);
    if (!content) continue;
    const last = cleaned[cleaned.length - 1];
    if (last && last.role === m.role) last.content = (last.content + "\n" + content).slice(0, MAX_INPUT_CHARS * 4);
    else cleaned.push({ role: m.role, content });
  }
  while (cleaned.length && cleaned[0].role !== "user") cleaned.shift();
  while (cleaned.length && cleaned[cleaned.length - 1].role !== "user") cleaned.pop();
  const maxMessages = MAX_TURNS * 2;
  const trimmed = cleaned.length > maxMessages ? cleaned.slice(cleaned.length - maxMessages) : cleaned;
  while (trimmed.length && trimmed[0].role !== "user") trimmed.shift();
  return trimmed;
}

/** Phone numbers and emails never reach logs. */
export const redact = (text: string) =>
  text
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/(?:\+?\d[\s-]?){7,15}/g, "[phone]");

/** Lines in a tool result or user text that try to issue instructions are data, not commands. Wraps them clearly. */
export const asUntrusted = (label: string, text: string) =>
  `<${label}>\n${text.replace(/<\/?[a-z_]+>/gi, "")}\n</${label}>`;
