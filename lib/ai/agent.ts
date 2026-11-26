import "server-only";
import type Anthropic from "@anthropic-ai/sdk";
import type { MessageParam, ToolResultBlockParam } from "@anthropic-ai/sdk/resources/messages/messages";
import { MAX_TOKENS, MAX_TOOL_ROUNDS, asUntrusted, type ChatMessage } from "./guard";
import { systemPrompt } from "./prompt";
import { runTool, toolDefinitions } from "./tools";

/** Events streamed to the browser, one JSON object per line. */
export type ChatEvent =
  | { type: "text"; text: string }
  | { type: "link"; label: string; href: string; external?: boolean }
  | { type: "done" }
  | { type: "error"; message: string }
  /** The API refused us (no credits, bad key, no permission): the browser should answer with the keyword matcher instead. */
  | { type: "fallback"; reason: string };

/** The narrow slice of the SDK the agent needs, so tests can inject a fake. */
export interface ChatClient {
  messages: { stream: (params: Anthropic.MessageStreamParams) => AsyncIterable<Anthropic.MessageStreamEvent> & { finalMessage(): Promise<Anthropic.Message> } };
}

export interface AgentOptions {
  client: ChatClient;
  model: string;
  estimatorEnabled: boolean;
  signal?: AbortSignal;
}

/**
 * Runs the model with tools until it stops asking for them (at most MAX_TOOL_ROUNDS), streaming text as it
 * arrives. Tool inputs are validated inside runTool; tool outputs are wrapped as untrusted data.
 */
export async function* runAgent(history: ChatMessage[], opts: AgentOptions): AsyncGenerator<ChatEvent> {
  const system = systemPrompt({ estimatorEnabled: opts.estimatorEnabled });
  const messages: MessageParam[] = history.map((m) => ({ role: m.role, content: m.content }));

  for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
    const stream = opts.client.messages.stream({ model: opts.model, max_tokens: MAX_TOKENS, system, messages, tools: toolDefinitions, ...(opts.signal ? { signal: opts.signal } : {}) } as Anthropic.MessageStreamParams);
    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta" && event.delta.text) yield { type: "text", text: event.delta.text };
    }
    const final = await stream.finalMessage();
    const toolUses = final.content.filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
    if (final.stop_reason !== "tool_use" || toolUses.length === 0 || round === MAX_TOOL_ROUNDS) {
      if (final.stop_reason === "tool_use") yield { type: "text", text: "\nI could not finish that step. A designer can pick it up on WhatsApp." };
      return;
    }
    const results: ToolResultBlockParam[] = [];
    for (const use of toolUses) {
      const outcome = await runTool(use.name, use.input, { estimatorEnabled: opts.estimatorEnabled });
      for (const l of outcome.links ?? []) yield { type: "link", ...l };
      results.push({ type: "tool_result", tool_use_id: use.id, content: asUntrusted("tool_result", outcome.text) });
    }
    messages.push({ role: "assistant", content: final.content });
    messages.push({ role: "user", content: results });
  }
}
