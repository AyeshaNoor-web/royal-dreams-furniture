// The only prices the client has confirmed (WhatsApp, 21 Nov 2026): cabinets per square metre of cabinet front,
// by door type. They are public on the home page price guide. Everything else in config/pricing.config.ts is still
// a placeholder and stays server-side. A test keeps these three figures in step with that config.
//
// Set SHOW_CABINET_RATES to false to hide the price guide from the site.
export const SHOW_CABINET_RATES = true;

export interface CabinetRate {
  id: "wood" | "wood-glass" | "aluminium-glass";
  label: string;
  blurb: string;
  /** AED per square metre of cabinet front */
  rate: number;
}

export const cabinetRates: CabinetRate[] = [
  { id: "wood", label: "Simple wood doors", blurb: "Plain wood or lacquered doors, flush or fluted.", rate: 700 },
  { id: "wood-glass", label: "Wood-framed glass doors", blurb: "Wooden frames with clear, tinted or fluted glass.", rate: 900 },
  { id: "aluminium-glass", label: "Aluminium-framed glass doors", blurb: "Slim aluminium frames with glass, the boutique look.", rate: 1100 },
];

export const aed = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");
