// Shared by client components and the lead message. No pricing data here.
import type { EstimateResult } from "@/lib/pricing";

export const aed = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");
export const aedRange = (min: number, max: number) => `${aed(min)} to ${aed(max).replace("AED ", "")}`;
export const trimNumber = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, ""));

/** "1 beds" reads badly: singularise the noun of a unit label when the count is exactly one. */
export const unitWords = (n: number, label: string) => {
  if (n !== 1) return label;
  const [head, ...rest] = label.split(" of ");
  const words = head.split(" ");
  const last = words[words.length - 1];
  words[words.length - 1] = /ss$/.test(last) ? last : last.replace(/s$/, "");
  return [words.join(" "), ...rest].join(" of ");
};

/** Plain-text summary for WhatsApp and the lead email. */
export function summaryText(result: EstimateResult, siteUrl: string) {
  const lines = result.lines.map(
    (l) => `- ${l.title}, ${trimNumber(l.size)} ${unitWords(l.size, l.unitLabel)}, ${l.tierLabel}${l.extras.length ? ", with " + l.extras.map((e) => e.label.toLowerCase()).join(", ") : ""}: ${aedRange(l.range.min, l.range.max)}`
  );
  return [
    `Indicative estimate from ${siteUrl.replace(/^https?:\/\//, "")}`,
    ...lines,
    `Total: ${aedRange(result.total.min, result.total.max)} (excludes ${result.vatPercent}% VAT).`,
    "Exact quotation follows the free site measurement and 3D design.",
  ].join("\n");
}
