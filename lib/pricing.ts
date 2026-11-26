// Published prices. ONLY figures the client has confirmed go in this file.
//
// Confirmed so far (client WhatsApp, 21 Nov 2026): cabinets are priced per square metre of cabinet front, by door
// type. They apply to fitted wardrobes and walk-in closets. Every other collection has no confirmed price yet, so the
// site says "Quoted after a free visit" for it. To publish a new starting price, add the collection to `priced`.
import { quoteFactors } from "./quote";

export interface Rate {
  id: string;
  label: string;
  blurb: string;
  /** AED per unit */
  rate: number;
}

export interface Priced {
  /** Lowest published rate, AED */
  from: number;
  unit: string;
  unitLong: string;
  rates: Rate[];
  /** What the published figure covers. */
  covers: string;
}

export const cabinetRates: Rate[] = [
  { id: "wood", label: "Simple wood doors", blurb: "Plain wood or lacquered doors, flush or fluted.", rate: 700 },
  { id: "wood-glass", label: "Wood-framed glass doors", blurb: "Wooden frames with clear, tinted or fluted glass.", rate: 900 },
  { id: "aluminium-glass", label: "Aluminium-framed glass doors", blurb: "Slim aluminium frames with glass.", rate: 1100 },
];

const cabinets: Priced = {
  from: 700,
  unit: "sq m",
  unitLong: "per square metre of cabinet front",
  rates: cabinetRates,
  covers: "The cabinets, measured as the width of the wall times its height. Lighting, islands and accessories are quoted after the free measurement.",
};

const priced: Record<string, Priced> = {
  "fitted-wardrobes": cabinets,
  "walk-in-closets": cabinets,
};

export const UNPRICED_LABEL = "Quoted after a free visit";

export const aed = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");
export const priceOf = (slug: string): Priced | null => priced[slug] ?? null;
/** "From AED 700 / sq m" or "Quoted after a free visit". */
export const priceLabel = (slug: string) => {
  const p = priceOf(slug);
  return p ? "From " + aed(p.from) + " / " + p.unit : UNPRICED_LABEL;
};
export const factorsOf = (slug: string) => quoteFactors.find((f) => f.slug === slug);
