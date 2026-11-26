// The quote planner is the site's funnel: every "get a quote" button on any page feeds it.
// Client-side only. A button either talks to the planner on the same page (event) or sends the visitor to the
// home page with the choice in the URL (/?plan=sofas,beds#plan).

export interface PlanPiece {
  id: string;
  label: string;
  /** Collection slug for the thumbnail, when there is one. */
  slug?: string;
}

export const planPieces: PlanPiece[] = [
  { id: "sofas", label: "Sofa or majlis", slug: "sofas" },
  { id: "beds", label: "Bed", slug: "beds" },
  { id: "fitted-wardrobes", label: "Fitted wardrobe", slug: "fitted-wardrobes" },
  { id: "walk-in-closets", label: "Walk-in closet", slug: "walk-in-closets" },
  { id: "tv-units", label: "TV or media wall", slug: "tv-units" },
  { id: "wall-paneling", label: "Wall paneling", slug: "wall-paneling" },
  { id: "dining-tables", label: "Dining table", slug: "dining-tables" },
  { id: "curtains", label: "Curtains", slug: "curtains" },
  { id: "dressing-tables", label: "Dressing table", slug: "dressing-tables" },
  { id: "coffee-tables", label: "Coffee table", slug: "coffee-tables" },
  { id: "display-shelving", label: "Display shelving", slug: "display-shelving" },
  { id: "kitchen", label: "Kitchen cabinets" },
  { id: "other", label: "Something else" },
];

export const PLAN_EVENT = "mfc:plan";

export interface PlanDetail {
  pieces?: string[];
  note?: string;
}

/** Start (or continue) a quote with these pieces chosen. Works from any page. */
export const startPlan = (detail: PlanDetail = {}) => {
  if (typeof window === "undefined") return;
  const el = document.getElementById("plan");
  if (el) {
    window.dispatchEvent(new CustomEvent<PlanDetail>(PLAN_EVENT, { detail }));
    el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    return;
  }
  const q = new URLSearchParams();
  if (detail.pieces?.length) q.set("plan", detail.pieces.join(","));
  if (detail.note) q.set("note", detail.note);
  const qs = q.toString();
  window.location.href = "/" + (qs ? "?" + qs : "") + "#plan";
};

/** The planner's link form, for server components and plain anchors. */
export const planHref = (pieces: string[] = []) => "/" + (pieces.length ? "?plan=" + pieces.join(",") : "") + "#plan";
