// Estimator pricing. Read only on the server through lib/pricing.ts; the browser never receives rates.
//
// MOST NUMBERS BELOW ARE PLACEHOLDERS. Entries with a `confirmed` note carry the client's own rates; every other
// rate is a placeholder. Replace each rate, keep the structure, then set PLACEHOLDER_DATA to false. While it is true, `npm run build` fails on Vercel
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
  /** Per-collection names for the three tiers, when the client prices by something other than finish level (e.g. door type). */
  tierOptions?: Record<Tier, { label: string; blurb: string }>;
  /** Question shown above the tier choice when tierOptions is set. */
  tierPrompt?: { title: string; text: string };
  /** Present when the rates are the client's own figures: who gave them and when. */
  confirmed?: string;
}

/** Client rates for cabinets, 21 Nov 2026, AED per square metre of cabinet front, by door type. Exact, not a band. */
const CABINET_RATES: Record<Tier, Range> = {
  standard: { min: 700, max: 700 },
  premium: { min: 900, max: 900 },
  bespoke: { min: 1100, max: 1100 },
};
const cabinetDoors: Record<Tier, { label: string; blurb: string }> = {
  standard: { label: "Simple wood doors", blurb: "Plain wood or lacquered doors, flush or fluted." },
  premium: { label: "Wood-framed glass doors", blurb: "Wooden frames with clear, tinted or fluted glass." },
  bespoke: { label: "Aluminium-framed glass doors", blurb: "Slim aluminium frames with glass, the boutique look." },
};
const cabinetPrompt = { title: "Which doors?", text: "The door type sets the rate per square metre. Samples of each come to your home before anything is decided." };

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

/** Quick-start presets: a typical basket per home type. PLACEHOLDER sizes until the client confirms what they usually fit. */
export interface Preset {
  id: string;
  label: string;
  items: { collection: string; size: number; tier: Tier; extras?: string[] }[];
}

export const presets: Preset[] = [
  { id: "1-bed", label: "1-bed apartment", items: [{ collection: "curtains", size: 3, tier: "standard" }, { collection: "fitted-wardrobes", size: 6, tier: "standard" }, { collection: "tv-units", size: 3, tier: "standard" }] },
  { id: "2-bed", label: "2-bed apartment", items: [{ collection: "curtains", size: 5, tier: "standard" }, { collection: "fitted-wardrobes", size: 13, tier: "premium" }, { collection: "tv-units", size: 3.5, tier: "premium" }, { collection: "beds", size: 1, tier: "premium" }] },
  { id: "3-bed", label: "3-bed townhouse", items: [{ collection: "curtains", size: 8, tier: "premium" }, { collection: "fitted-wardrobes", size: 21, tier: "premium" }, { collection: "tv-units", size: 4, tier: "premium" }, { collection: "sofas", size: 6, tier: "premium" }, { collection: "dining-tables", size: 6, tier: "standard" }] },
  { id: "5-bed", label: "5-bed villa", items: [{ collection: "curtains", size: 14, tier: "premium" }, { collection: "walk-in-closets", size: 26, tier: "premium" }, { collection: "fitted-wardrobes", size: 26, tier: "premium" }, { collection: "tv-units", size: 5, tier: "bespoke", extras: ["lighting"] }, { collection: "sofas", size: 8, tier: "bespoke" }, { collection: "dining-tables", size: 10, tier: "bespoke" }, { collection: "wall-paneling", size: 30, tier: "premium" }] },
];

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
    // Client rates (21 Nov 2026). Extras below are still placeholders.
    slug: "walk-in-closets", unit: "sqm", unitLabel: "square metres of cabinet front", perLabel: "per square metre",
    size: { min: 4, max: 100, step: 0.5, default: 20 }, hint: "Add up the length of every wall that gets units and multiply by the height. A 2.6 m ceiling gives about 2.6 square metres per metre of wall.",
    rates: CABINET_RATES, tierOptions: cabinetDoors, tierPrompt: cabinetPrompt, confirmed: "Client, 21 Nov 2026: cabinet rates per square metre by door type",
    extras: [lighting({ min: 1200, max: 2500 }), { id: "island", label: "Central island", per: "item", rate: { min: 4000, max: 9000 } }],
  },
  {
    // Client rates (21 Nov 2026). Extras below are still placeholders.
    slug: "fitted-wardrobes", unit: "sqm", unitLabel: "square metres of cabinet front", perLabel: "per square metre",
    size: { min: 2, max: 60, step: 0.5, default: 8 }, hint: "Width of the wall times the height. A 3 m wall, floor to a 2.6 m ceiling, is about 8 square metres.",
    rates: CABINET_RATES, tierOptions: cabinetDoors, tierPrompt: cabinetPrompt, confirmed: "Client, 21 Nov 2026: cabinet rates per square metre by door type",
    extras: [lighting({ min: 600, max: 1200 })],
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
