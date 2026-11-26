// Every "get a quote" button on the site leads to /quote, carrying what the visitor was looking at.
// /quote?item=sofas            a collection is pre-selected
// /quote?item=sofas&design=id  a product is attached as "the design I liked"
// /quote?note=...              a line from the estimator is added to the brief

export interface QuoteStart {
  item?: string;
  design?: string;
  note?: string;
}

export const quoteHref = ({ item, design, note }: QuoteStart = {}) => {
  const q = new URLSearchParams();
  if (item) q.set("item", item);
  if (design) q.set("design", design);
  if (note) q.set("note", note);
  const s = q.toString();
  return "/quote" + (s ? "?" + s : "");
};

/** What a visitor can ask a quote for. Collections first, then the two things nobody photographs. */
export const quoteItems: { id: string; label: string }[] = [
  { id: "sofas", label: "Sofa or majlis" },
  { id: "beds", label: "Bed" },
  { id: "fitted-wardrobes", label: "Fitted wardrobe" },
  { id: "walk-in-closets", label: "Walk-in closet" },
  { id: "tv-units", label: "TV or media wall" },
  { id: "wall-paneling", label: "Wall paneling" },
  { id: "dining-tables", label: "Dining table" },
  { id: "curtains", label: "Curtains" },
  { id: "dressing-tables", label: "Dressing table" },
  { id: "coffee-tables", label: "Coffee table" },
  { id: "display-shelving", label: "Display shelving" },
  { id: "kitchen", label: "Kitchen cabinets" },
  { id: "other", label: "Something else" },
];
