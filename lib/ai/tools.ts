import "server-only";
import { z } from "zod";
import type { Tool } from "@anthropic-ai/sdk/resources/messages/messages";
import { categories } from "@/lib/gallery";
import { match } from "@/lib/chatbot";
import { estimate, estimateRequestSchema, EstimateError } from "@/lib/pricing";
import { aedRange } from "@/lib/estimate-format";
import { sendLead } from "@/lib/lead";
import { SITE, whatsappLink } from "@/lib/site";
import { asUntrusted, sanitize } from "./guard";

/** What a tool hands back: text for the model, and optional links or chips for the visitor's screen. */
export interface ToolOutcome {
  text: string;
  links?: { label: string; href: string; external?: boolean }[];
}

const slugs = categories.map((c) => c.slug) as [string, ...string[]];

const recommendSchema = z.object({
  needs: z.string().max(300),
  room: z.string().max(60).optional(),
});

const leadSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().email().max(160).optional().or(z.literal("")),
  summary: z.string().max(1500),
  consent: z.literal(true),
});

const handoffSchema = z.object({ summary: z.string().max(600) });

export const toolDefinitions: Tool[] = [
  {
    name: "estimate",
    description: "Indicative AED price range for one or more made-to-measure pieces, computed by the company's pricing engine. Use it instead of ever estimating yourself. Sizes: seats for sofas and dining tables, pieces for coffee tables, beds and dressing tables, metres for tv-units and display-shelving, square metres of cabinet front (width times height) for walk-in-closets and fitted-wardrobes, square metres for wall-paneling, windows for curtains. For walk-in-closets and fitted-wardrobes the tier means the door type: standard = simple wood doors, premium = wood-framed glass doors, bespoke = aluminium-framed glass doors.",
    input_schema: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              collection: { type: "string", enum: slugs },
              size: { type: "number" },
              tier: { type: "string", enum: ["standard", "premium", "bespoke"] },
              extras: { type: "array", items: { type: "string" } },
            },
            required: ["collection", "size", "tier"],
          },
        },
      },
      required: ["items"],
    },
  },
  {
    name: "recommend_collections",
    description: "Finds which of the company's collections fit what the visitor describes. Returns real collection names, slugs and page links. Only recommend collections this returns.",
    input_schema: { type: "object", properties: { needs: { type: "string" }, room: { type: "string" } }, required: ["needs"] },
  },
  {
    name: "submit_lead",
    description: "Sends the visitor's name and phone to the team by email. Call only after the visitor has given both and explicitly agreed to be contacted. consent must be true.",
    input_schema: {
      type: "object",
      properties: { name: { type: "string" }, phone: { type: "string" }, email: { type: "string" }, summary: { type: "string" }, consent: { type: "boolean" } },
      required: ["name", "phone", "summary", "consent"],
    },
  },
  {
    name: "whatsapp_handoff",
    description: "Builds a WhatsApp link to the team with a short summary of the conversation pre-filled, so the visitor can continue with a designer. Use when the visitor is ready to talk, or when you cannot answer.",
    input_schema: { type: "object", properties: { summary: { type: "string" } }, required: ["summary"] },
  },
];

export async function runTool(name: string, input: unknown, opts: { estimatorEnabled: boolean }): Promise<ToolOutcome> {
  switch (name) {
    case "estimate": {
      if (!opts.estimatorEnabled) return { text: "The estimator is not available yet. Offer the free home visit and WhatsApp instead." };
      const parsed = estimateRequestSchema.safeParse(input);
      if (!parsed.success) return { text: "Invalid estimate request: " + parsed.error.issues.map((i) => i.path.join(".") + " " + i.message).join("; ") };
      try {
        const r = estimate(parsed.data);
        const lines = r.lines.map((l) => `${l.title}, ${l.size} ${l.unitLabel}, ${l.tierLabel}: ${aedRange(l.range.min, l.range.max)} (${l.formula})`);
        return {
          text: `Indicative estimate, excludes ${r.vatPercent}% VAT. ${lines.join(". ")}. Total ${aedRange(r.total.min, r.total.max)}. ${r.disclaimer}`,
          links: [{ label: "Open the estimator", href: "/estimator?c=" + r.lines[0].collection }],
        };
      } catch (e) {
        return { text: e instanceof EstimateError ? e.message : "The estimate could not be calculated." };
      }
    }
    case "recommend_collections": {
      const parsed = recommendSchema.safeParse(input);
      if (!parsed.success) return { text: "Invalid request." };
      const text = sanitize(parsed.data.needs + " " + (parsed.data.room ?? ""));
      const hits = match(text).filter((m) => m.intent.id.startsWith("product:")).slice(0, 3);
      const picks = hits.length ? hits.map((m) => categories.find((c) => c.slug === m.intent.id.replace("product:", ""))!) : [];
      if (!picks.length) return { text: "No direct match. Ask one clarifying question about the room or the piece." };
      return {
        text: picks.map((c) => `${c.title} (slug ${c.slug}, page /collections/${c.slug}): ${c.short}`).join("\n"),
        links: picks.map((c) => ({ label: "See " + c.title.toLowerCase(), href: "/collections/" + c.slug })),
      };
    }
    case "submit_lead": {
      const parsed = leadSchema.safeParse(input);
      if (!parsed.success) return { text: "Lead not sent: name, phone and explicit consent are required. Ask the visitor for what is missing." };
      const d = parsed.data;
      const status = await sendLead({ name: sanitize(d.name), phone: sanitize(d.phone), email: d.email || undefined, interest: "AI assistant conversation", message: asUntrusted("conversation_summary", sanitize(d.summary)), source: "ai-assistant" });
      const wa = whatsappLink(`Hello, my name is ${sanitize(d.name)}. ${sanitize(d.summary).slice(0, 300)}`);
      if (status === "sent") return { text: "Lead sent to the team by email. Tell the visitor the team replies within one working day.", links: [{ label: "Also send on WhatsApp", href: wa, external: true }] };
      return { text: "Email delivery is not available right now. Tell the visitor to tap the WhatsApp button so the team receives their details.", links: [{ label: "Send on WhatsApp", href: wa, external: true }] };
    }
    case "whatsapp_handoff": {
      const parsed = handoffSchema.safeParse(input);
      const summary = parsed.success ? sanitize(parsed.data.summary) : "";
      const href = whatsappLink(`Hello ${SITE.name}, I was chatting on your website. ${summary}`.trim());
      return { text: "WhatsApp link created. Tell the visitor to tap the button to continue with a designer.", links: [{ label: "Talk to a designer on WhatsApp", href, external: true }] };
    }
    default:
      return { text: `Unknown tool "${name}". Do not retry it.` };
  }
}
