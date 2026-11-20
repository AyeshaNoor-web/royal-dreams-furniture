import "server-only";
import { z } from "zod";
import { emiratePricing, emirates, estimatorNotes, presets, pricing, tiers, type CollectionPricing, type Range, type Tier } from "@/config/pricing.config";
import { categories } from "@/lib/gallery";
import { unitWords } from "@/lib/estimate-format";

// The only place prices are calculated. Used by /api/estimate and, in Phase 2, by the chat tool. The browser sends
// selections; it never receives a rate.

const slugs = pricing.map((p) => p.slug) as [string, ...string[]];
const tierIds = tiers.map((t) => t.id) as [Tier, ...Tier[]];
const emirateIds = emirates.map((e) => e.id) as [string, ...string[]];

export const estimateItemSchema = z.object({
  collection: z.enum(slugs),
  size: z.number().finite().positive(),
  tier: z.enum(tierIds),
  extras: z.array(z.string().max(40)).max(10).default([]),
  emirate: z.enum(emirateIds).optional(),
});

export const estimateRequestSchema = z.object({
  items: z.array(estimateItemSchema).min(1).max(10),
});

export type EstimateItemInput = z.infer<typeof estimateItemSchema>;
export type EstimateRequest = z.infer<typeof estimateRequestSchema>;

export interface EstimateLine {
  collection: string;
  title: string;
  tier: Tier;
  tierLabel: string;
  /** The size actually used, after clamping. */
  size: number;
  clamped: boolean;
  unitLabel: string;
  extras: { id: string; label: string }[];
  range: Range;
  /** Plain words: "3.5 metres of wall x AED 1,500 to 2,200 per metre, plus integrated lighting". */
  formula: string;
}

export interface EstimateResult {
  lines: EstimateLine[];
  total: Range;
  vatPercent: number;
  disclaimer: string;
}

export const DISCLAIMER = "Indicative estimate, excludes 5% VAT. Exact quotation follows the free site measurement and 3D design.";

export class EstimateError extends Error {
  constructor(public code: "unknown_extra" | "unknown_collection", message: string) {
    super(message);
  }
}

const round100 = (n: number) => Math.round(n / 100) * 100;
const aed = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");
const trim = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, ""));

const clampSize = (p: CollectionPricing, size: number) => {
  const snapped = Math.round(size / p.size.step) * p.size.step;
  const used = Math.min(p.size.max, Math.max(p.size.min, snapped));
  return { used: Number(used.toFixed(2)), clamped: used !== size };
};

export function estimateLine(input: EstimateItemInput): EstimateLine {
  const p = pricing.find((x) => x.slug === input.collection);
  if (!p) throw new EstimateError("unknown_collection", "Unknown collection: " + input.collection);
  const { used: size, clamped } = clampSize(p, input.size);
  const rate = p.rates[input.tier];
  let min = size * rate.min;
  let max = size * rate.max;
  const words = [`${trim(size)} ${unitWords(size, p.unitLabel)} x ${aed(rate.min)} to ${aed(rate.max)} ${p.perLabel}`];
  const extras: { id: string; label: string }[] = [];
  for (const id of input.extras ?? []) {
    const e = p.extras.find((x) => x.id === id);
    if (!e) throw new EstimateError("unknown_extra", `Unknown option "${id}" for ${p.slug}`);
    const mult = e.per === "unit" ? size : 1;
    min += e.rate.min * mult;
    max += e.rate.max * mult;
    extras.push({ id: e.id, label: e.label });
    words.push(e.per === "unit" ? `${e.label.toLowerCase()} ${aed(e.rate.min)} to ${aed(e.rate.max)} ${p.perLabel}` : `${e.label.toLowerCase()} ${aed(e.rate.min)} to ${aed(e.rate.max)}`);
  }
  if (emiratePricing.enabled && input.emirate) {
    const s = emiratePricing.surcharge[input.emirate as keyof typeof emiratePricing.surcharge];
    if (s && (s.min || s.max)) {
      min += s.min;
      max += s.max;
      words.push(`travel to ${emirates.find((e) => e.id === input.emirate)?.label ?? input.emirate} ${aed(s.min)} to ${aed(s.max)}`);
    }
  }
  const title = categories.find((c) => c.slug === p.slug)?.title ?? p.slug;
  const tierLabel = tiers.find((t) => t.id === input.tier)?.label ?? input.tier;
  return {
    collection: p.slug,
    title,
    tier: input.tier,
    tierLabel,
    size,
    clamped,
    unitLabel: p.unitLabel,
    extras,
    range: { min: round100(min), max: round100(max) },
    formula: words.length > 1 ? words[0] + ", plus " + words.slice(1).join(", ") : words[0],
  };
}

export function estimate(req: EstimateRequest): EstimateResult {
  const lines = req.items.map(estimateLine);
  const total = lines.reduce((t, l) => ({ min: t.min + l.range.min, max: t.max + l.range.max }), { min: 0, max: 0 });
  return { lines, total, vatPercent: estimatorNotes.vatPercent, disclaimer: DISCLAIMER };
}

/** What the browser is allowed to know: units, bounds, option names, tier names. No rates. */
export interface PublicCollection {
  slug: string;
  title: string;
  short: string;
  cover: { src: string; alt: string };
  unit: CollectionPricing["unit"];
  unitLabel: string;
  size: CollectionPricing["size"];
  hint: string;
  extras: { id: string; label: string }[];
}

export interface PublicCatalogue {
  collections: PublicCollection[];
  tiers: typeof tiers;
  emirates: typeof emirates;
  emirateStep: boolean;
  presets: typeof presets;
  vatPercent: number;
  included: string[];
  excluded: string[];
  disclaimer: string;
}

export function publicCatalogue(): PublicCatalogue {
  const collections = pricing.map((p) => {
    const c = categories.find((x) => x.slug === p.slug);
    return {
      slug: p.slug,
      title: c?.title ?? p.slug,
      short: c?.short ?? "",
      cover: { src: c?.cover.src ?? "", alt: c?.cover.alt ?? "" },
      unit: p.unit,
      unitLabel: p.unitLabel,
      size: p.size,
      hint: p.hint,
      extras: p.extras.map((e) => ({ id: e.id, label: e.label })),
    };
  });
  return {
    collections,
    tiers,
    emirates,
    emirateStep: emiratePricing.enabled,
    presets,
    vatPercent: estimatorNotes.vatPercent,
    included: estimatorNotes.included,
    excluded: estimatorNotes.excluded,
    disclaimer: DISCLAIMER,
  };
}
