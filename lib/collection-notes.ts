// Extra sections for certain collection pages. PLACEHOLDER COPY: written in the site's voice from facts already on
// the site, for the client to rewrite in their own words before launch. Nothing here quotes another company.

export interface ReadyMadeNote {
  slug: string;
  /** Which collection pages show the section. */
  heading: string;
  readyMade: string;
  madeToMeasure: string;
  verdict: string;
}

export const readyMadeNotes: ReadyMadeNote[] = [
  {
    slug: "tv-units",
    heading: "Custom or ready-made?",
    readyMade: "A shop-bought TV unit is quick and costs less, and for a plain wall in a rented flat it can be enough.",
    madeToMeasure: "A made-to-measure media wall pays for itself when the wall is an odd width, when every cable and box must disappear, when you want backlighting and lit niches, or when the TV wall has to read as one design with the paneling, doors or ceiling around it.",
    verdict: "Our rule of thumb: if you will look at this wall every evening for years, measure it first and decide after the free visit.",
  },
  {
    slug: "fitted-wardrobes",
    heading: "Fitted or freestanding?",
    readyMade: "A freestanding wardrobe moves with you and arrives in days, which suits a short tenancy or a spare room.",
    madeToMeasure: "A fitted wardrobe uses the full height and width of the wall, hides the gap above and the skirting below, gives you the internal layout you actually need, and can take mirrored, fluted or flush doors to match the room.",
    verdict: "If storage is tight or the ceiling is high, fitted wins. If you expect to move within a year or two, freestanding may be the sensible choice.",
  },
  {
    slug: "walk-in-closets",
    heading: "Walk-in or fitted wardrobes?",
    readyMade: "A run of fitted wardrobes along one wall is the lower-cost option and works well in most bedrooms.",
    madeToMeasure: "A walk-in earns its space when you have a spare room or a deep alcove, want everything on show behind glass, or need an island for folded pieces and accessories with lighting throughout.",
    verdict: "We measure both options on the same visit and show them side by side in 3D, so the decision is made with the real sizes in front of you.",
  },
];

/** The four stages, in the words already used across the site. PLACEHOLDER for the client to confirm or rewrite. */
export const processSteps = [
  { title: "Free consultation", where: "At your home", text: "We bring fabric, veneer and stone samples so you judge them in your own light." },
  { title: "Measuring and 3D design", where: "At your home", text: "Every wall and opening is measured, then you see the piece in 3D in your room and approve a fixed quotation." },
  { title: "Made in our workshop", where: "Dubai workshop", text: "Built by the same team that measured your room. We keep you informed while it is in production." },
  { title: "Installation", where: "At your home", text: "Our own fitters install, align every door and light, and clear the packaging." },
];
