import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";

let cached: string | null = null;

/** The only facts the assistant may use. Edited by hand in content/knowledge.md; read once per server instance. */
export function knowledge(): string {
  if (cached) return cached;
  try {
    cached = readFileSync(join(process.cwd(), "content", "knowledge.md"), "utf8");
  } catch {
    cached = "# Knowledge file missing. Answer only that the team can help on WhatsApp.";
  }
  return cached;
}

/** Lines the client has not confirmed yet. The assistant is told not to state them. */
export const placeholderLines = (text: string) => text.split("\n").filter((l) => /PLACEHOLDER/.test(l)).length;
