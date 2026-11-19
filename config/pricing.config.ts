// Estimator pricing. Read only on the server through lib/pricing.ts; the browser never receives rates.
//
// EVERY NUMBER BELOW IS A PLACEHOLDER. The client has not supplied prices. Replace each rate, keep the
// structure, then set PLACEHOLDER_DATA to false. While it is true, `npm run build` fails on Vercel
// production when ESTIMATOR_ENABLED=true, and a banner shows in development and preview builds.
//
// How to edit: one entry per collection. `unit` is what the visitor enters; `rates` is AED per unit
// for each finish tier as a min-max pair; `extras` are optional add-ons, priced per item (flat) or per
// unit of size. Sizes are clamped to `size.min` / `size.max` on the server.

export const PLACEHOLDER_DATA = true;

export type Unit = "piece" | "metre" | "sqm" | "window" | "seat";
export type Tier = "standard" | "premium" | "bespoke";
export type Emirate = "dubai" | "sharjah" | "ajman" | "abu-dhabi" | "al-ain" | "ras-al-khaimah" | "umm-al-quwain" | "fujairah";

export interface Range {
  min: number;
  max: number;
}

export interface Extra {
  id: string;
  label: string;
  /** "item": added once per basket line. "unit": multiplied by the entered size. */
  per: "item" | "unit";
  rate: Range;
}

export interface CollectionPricing {
  slug: string;
  unit: Unit;
  /** Shown next to the input, e.g. "metres of wall". */
  unitLabel: string;
  /** Used in the formula sentence, e.g. "per metre". */
  perLabel: string;
  size: { min: number; max: number; step: number; default: number };
  /** Short help under the size input. */
  hint: string;
  rates: Record<Tier, Range>;
  extras: Extra[];
}

export const tiers: { id: Tier; label: string; blurb: string }[] = [
  { id: "standard", label: "Standard", blurb: "Lacquer or painted finishes, standard fabrics, no lighting." },
  { id: "premium", label: "Premium", blurb: "Walnut and oak veneers, boucle and velvet, integrated lighting." },
  { id: "bespoke", label: "Bespoke", blurb: "Marble and stone, leather, curved forms, fully custom detailing." },
];

export const emirates: { id: Emirate; label: string }[] = [
  { id: "dubai", label: "Dubai" },
  { id: "sharjah", label: "Sharjah" },
  { id: "ajman", label: "Ajman" },
  { id: "abu-dhabi", label: "Abu Dhabi" },
  { id: "al-ain", label: "Al Ain" },
  { id: "ras-al-khaimah", label: "Ras Al Khaimah" },
  { id: "umm-al-quwain", label: "Umm Al Quwain" },
  { id: "fujairah", label: "Fujairah" },
];

/** Off by default: nothing on the site says price changes by emirate. Switch on only if the client confirms a surcharge. */
export const emiratePricing: { enabled: boolean; surcharge: Partial<Record<Emirate, Range>> } = {
  enabled: false,
  surcharge: {
    // PLACEHOLDER flat AED added per basket line for distant emirates, if the client wants it.
    "abu-dhabi": { min: 0, max: 0 },
    "al-ain": { min: 0, max: 0 },
    "ras-al-khaimah": { min: 0, max: 0 },
    "umm-al-quwain": { min: 0, max: 0 },
    fujairah: { min: 0, max: 0 },
  },
};

export const estimatorNotes = {
  vatPercent: 5,
  included: ["Free home visit and site measurement", "3D design before production", "Delivery and installation by our own team across the UAE"],
  excluded: ["5% VAT", "Electrical work beyond connecting supplied lighting", "Removal of existing built-in furniture"],
};

const lighting = (rate: Range): Extra => ({ id: "lighting", label: "Integrated lighting", per: "item", rate });

// PLACEHOLDER rates throughout. Round numbers chosen only so the flow can be tested.
export const pricing: CollectionPricing[] = [
  {
    slug: "sofas", unit: "seat", unitLabel: "seats", perLabel: "per seat",
    size: { min: 2, max: 14, step: 1, default: 4 }, hint: "Count every seat, including a chaise as two.",
    rates: { standard: { min: 1000, max: 1500 }, premium: { min: 1500, max: 2200 }, bespoke: { min: 2200, max: 3500 } },
    extras: [{ id: "sofa-bed", label: "Pull-out sofa bed mechanism", per: "item", rate: { min: 1000, max: 2000 } }],
  },
  {
    slug: "coffee-tables", unit: "piece", unitLabel: "tables", perLabel: "per table",
    size: { min: 1, max: 4, step: 1, default: 1 }, hint: "Nested sets count as one.",
    rates: { standard: { min: 1500, max: 2500 }, premium: { min: 2500, max: 4000 }, bespoke: { min: 4000, max: 7000 } },
    extras: [],
  },
  {
    slug: "tv-units", unit: "metre", unitLabel: "metres of wall", perLabel: "per metre",
    size: { min: 1.5, max: 8, step: 0.1, default: 3.5 }, hint: "The width of the wall the unit will cover.",
    rates: { standard: { min: 1500, max: 2200 }, premium: { min: 2200, max: 3200 }, bespoke: { min: 3200, max: 5000 } },
    extras: [lighting({ min: 800, max: 1500 }), { id: "stone", label: "Marble or stone panel", per: "unit", rate: { min: 600, max: 1200 } }],
  },
  {
    slug: "wall-paneling", unit: "sqm", unitLabel: "square metres", perLabel: "per square metre",
    size: { min: 3, max: 150, step: 0.5, default: 20 }, hint: "Wall width times the height you want panelled.",
    rates: { standard: { min: 250, max: 400 }, premium: { min: 400, max: 650 }, bespoke: { min: 650, max: 1000 } },
    extras: [lighting({ min: 600, max: 1500 })],
  },
  {
    slug: "display-shelving", unit: "metre", unitLabel: "metres of wall", perLabel: "per metre",
    size: { min: 0.6, max: 8, step: 0.1, default: 2.4 }, hint: "The width of the shelving run.",
    rates: { standard: { min: 1200, max: 1800 }, premium: { min: 1800, max: 2600 }, bespoke: { min: 2600, max: 4000 } },
    extras: [lighting({ min: 500, max: 1200 }), { id: "base-cabinets", label: "Base cabinets below", per: "unit", rate: { min: 900, max: 1500 } }],
  },
  {
    slug: "beds", unit: "piece", unitLabel: "beds", perLabel: "per bed",
    size: { min: 1, max: 4, step: 1, default: 1 }, hint: "Mattress size is confirmed at the visit.",
    rates: { standard: { min: 3000, max: 4500 }, premium: { min: 4500, max: 7000 }, bespoke: { min: 7000, max: 12000 } },
    extras: [
      { id: "storage-base", label: "Storage base", per: "item", rate: { min: 1000, max: 1800 } },
      { id: "headboard-wall", label: "Lit headboard wall", per: "item", rate: { min: 2500, max: 5000 } },
      { id: "kids-rails", label: "Safety rails (kids bed)", per: "item", rate: { min: 300, max: 600 } },
    ],
  },
  {
    slug: "walk-in-closets", unit: "metre", unitLabel: "metres of wardrobe run", perLabel: "per metre",
    size: { min: 2, max: 24, step: 0.5, default: 8 }, hint: "Add up the length of every wall that gets units.",
    rates: { standard: { min: 1800, max: 2600 }, premium: { min: 2600, max: 3800 }, bespoke: { min: 3800, max: 6000 } },
    extras: [lighting({ min: 1200, max: 2500 }), { id: "island", label: "Central island", per: "item", rate: { min: 4000, max: 9000 } }],
  },
  {
    slug: "fitted-wardrobes", unit: "metre", unitLabel: "metres of wardrobe", perLabel: "per metre",
    size: { min: 1, max: 12, step: 0.1, default: 3 }, hint: "The width of the wall, floor to ceiling is assumed.",
    rates: { standard: { min: 1600, max: 2400 }, premium: { min: 2400, max: 3400 }, bespoke: { min: 3400, max: 5500 } },
    extras: [lighting({ min: 600, max: 1200 }), { id: "mirror-doors", label: "Mirrored doors", per: "unit", rate: { min: 300, max: 600 } }],
  },
  {
    slug: "dressing-tables", unit: "piece", unitLabel: "dressing tables", perLabel: "per table",
    size: { min: 1, max: 3, step: 1, default: 1 }, hint: "Mirror and drawers are included in the tier.",
    rates: { standard: { min: 2000, max: 3000 }, premium: { min: 3000, max: 4500 }, bespoke: { min: 4500, max: 8000 } },
    extras: [lighting({ min: 400, max: 900 })],
  },
  {
    slug: "dining-tables", unit: "seat", unitLabel: "seats", perLabel: "per seat",
    size: { min: 4, max: 16, step: 1, default: 6 }, hint: "Table and matching chairs are priced together.",
    rates: { standard: { min: 900, max: 1300 }, premium: { min: 1300, max: 1900 }, bespoke: { min: 1900, max: 3000 } },
    extras: [],
  },
  {
    slug: "curtains", unit: "window", unitLabel: "windows", perLabel: "per window",
    size: { min: 1, max: 24, step: 1, default: 3 }, hint: "A sliding door or a full-height glass wall counts as one window.",
    rates: { standard: { min: 800, max: 1300 }, premium: { min: 1300, max: 2000 }, bespoke: { min: 2000, max: 3500 } },
    extras: [
      { id: "blackout-layer", label: "Blackout layer behind sheers", per: "unit", rate: { min: 300, max: 600 } },
      { id: "motorised", label: "Motorised track", per: "unit", rate: { min: 700, max: 1400 } },
    ],
  },
];
