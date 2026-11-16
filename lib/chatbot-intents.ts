// Everything the chat assistant can say. Each answer repeats a fact that is already on the site
// (lib/site.ts, lib/faq.ts, lib/quote.ts, lib/gallery.ts, the about and contact pages). No prices,
// no stock, no dates. Add Arabic or Hindi words to a keyword list and the matcher picks them up.
import { categories, groups } from "./gallery";
import { faqs } from "./faq";
import { SITE, areas, whatsappLink } from "./site";

export interface ChatLink {
  label: string;
  href: string;
  external?: boolean;
}

export type IntentKind = "product" | "room" | "faq" | "price" | "areas" | "small-talk" | "fallback";

export interface Intent {
  id: string;
  kind: IntentKind;
  /** Single words or short phrases. A phrase hit counts more than a word hit. */
  keywords: string[];
  answer: string;
  link?: ChatLink;
  /** Breaks ties between equal scores. Higher wins. */
  priority?: number;
}

const WA = (msg: string): ChatLink => ({ label: "Chat on WhatsApp", href: whatsappLink(msg), external: true });

export const WHATSAPP_CHAT: ChatLink = WA("Hello Modern Furniture Collection, I have a question about made-to-measure furniture.");
const CONTACT: ChatLink = { label: "Contact page", href: "/contact" };

// Extra words a visitor might use for each collection, beyond the words in its title.
const productWords: Record<string, string[]> = {
  sofas: ["sofa", "couch", "sectional", "l shape", "l shaped", "u shape", "sofa bed", "majlis", "seating", "lounge", "settee", "corner sofa", "curved sofa"],
  "coffee-tables": ["coffee table", "side table", "centre table", "center table", "nested table", "marble table"],
  "tv-units": ["tv", "tv unit", "tv wall", "media wall", "television", "media unit", "entertainment", "console", "backlit wall", "slat"],
  "wall-paneling": ["paneling", "panelling", "panel", "wainscoting", "wall panel", "moulding", "molding", "feature wall", "fluted wall"],
  "display-shelving": ["shelving", "shelf", "shelves", "bookcase", "bookshelf", "display unit", "display shelf", "library"],
  beds: ["bed", "headboard", "bedroom bed", "kids bed", "kid bed", "children bed", "child bed", "bunk", "toddler", "boy bed", "girl bed", "upholstered bed", "bed frame"],
  "walk-in-closets": ["walk in closet", "walk in", "closet", "dressing room", "walk in wardrobe", "island", "wardrobe room"],
  "fitted-wardrobes": ["wardrobe", "fitted wardrobe", "built in wardrobe", "cupboard", "almirah", "sliding wardrobe", "floor to ceiling wardrobe"],
  "dressing-tables": ["dressing table", "vanity", "dresser", "makeup table", "mirror table", "vanity unit"],
  "dining-tables": ["dining", "dining table", "dining chair", "chair", "round table", "oval table", "table for guest", "eating table"],
  curtains: ["curtain", "drape", "sheer", "blackout", "blind", "window", "wave curtain", "pelmet", "track", "motorised", "motorized"],
};

const productIntents: Intent[] = categories.map((c) => ({
  id: "product:" + c.slug,
  kind: "product",
  keywords: [c.title.toLowerCase(), ...(productWords[c.slug] ?? [])],
  answer: `${c.title}: ${c.short} ${c.description} Every piece is made to your room's measurements in our Dubai workshop, in the finish you choose.`,
  link: { label: "See " + c.title.toLowerCase(), href: "/collections/" + c.slug },
}));

const roomIntents: Intent[] = groups.map((g) => ({
  id: "room:" + g.slug,
  kind: "room",
  keywords: g.slug === "living" ? ["living room", "living", "lounge room", "majlis room", "sitting room"] : g.slug === "bedroom" ? ["bedroom", "master bedroom", "guest room", "kids room", "children room", "nursery"] : g.slug === "dining" ? ["dining room", "dining area"] : ["windows", "window treatment"],
  answer: `For the ${g.title.toLowerCase()} we make ${g.blurb.charAt(0).toLowerCase() + g.blurb.slice(1)} All of it is measured in your home and built to fit.`,
  link: { label: "Plan the " + g.title.toLowerCase(), href: "/collections#" + g.slug },
}));

// The nine approved questions on the site, with the words people use to ask them.
const faqWords: string[][] = [
  ["free", "free visit", "home visit", "consultation", "site visit", "obligation", "charge for visit", "visit cost", "come to my home", "come to my house", "measure my room"],
  ["estimate", "rough budget", "budget", "price before", "ballpark", "idea of price", "quote before"],
  ["make yourselves", "yourself", "yourselves", "workshop", "factory", "manufacture", "made where", "where is it made", "subcontract", "own team", "who makes", "handmade", "local"],
  ["area", "cover", "located", "location", "where are you", "address", "showroom", "office", "map", "directions", "near me", "al butina", "butina", "dubai", "sharjah", "ajman", "abu dhabi", "al ain", "ras al khaimah", "rak", "umm al quwain", "fujairah", "emirate", "uae"],
  ["fabric", "finish", "material", "colour", "color", "veneer", "walnut", "oak", "lacquer", "marble", "stone", "boucle", "velvet", "leather", "linen", "sample", "swatch", "wood", "texture", "choose"],
  ["change", "changes", "revision", "edit the design", "modify", "after design", "alter", "adjust"],
  ["instagram", "insta", "picture i saw", "photo i saw", "reference", "pinterest", "copy this", "like this one", "inspiration", "saw online"],
  ["install", "installation", "fitter", "fitting", "assemble", "assembly", "who installs", "set up", "setup", "mount"],
  ["start", "how do i begin", "begin", "first step", "get started", "book", "appointment", "schedule", "arrange a visit", "how to order", "order", "process", "how it works", "steps"],
];

const faqLinks: (ChatLink | undefined)[] = [
  { label: "Book a free visit", href: "/contact" },
  WA("Hello, here is a photo of my room. Could you give me a rough budget?"),
  { label: "About the workshop", href: "/about" },
  { label: "Showroom on Google Maps", href: SITE.showroom.mapsUrl, external: true },
  { label: "About our finishes", href: "/about" },
  undefined,
  WA("Hello, I saw a piece I like and would like a version made for my room."),
  undefined,
  WA("Hello, I would like to start with a free home visit and 3D design."),
];

const faqIntents: Intent[] = faqs.map((f, i) => ({
  id: "faq:" + i,
  kind: i === 3 ? "areas" : "faq",
  keywords: faqWords[i] ?? [],
  answer: f.a,
  link: faqLinks[i],
}));

const extraIntents: Intent[] = [
  {
    id: "price",
    kind: "price",
    priority: 2,
    keywords: ["price", "pricing", "cost", "how much", "aed", "dirham", "dhs", "expensive", "cheap", "rate", "quotation", "quote", "afford", "payment", "pay", "instalment", "installment", "discount", "offer", "deal"],
    answer: "We do not list prices, because every piece is made to your room's size and your choice of finish. Send a photo of the room and rough sizes on WhatsApp and the team replies within a working day with first ideas and a rough budget. A fixed quotation follows the free site measurement, and nothing is built until you approve it.",
    link: WA("Hello, I would like a quotation. Here is a photo of my room and the rough sizes."),
  },
  {
    id: "stock",
    kind: "price",
    priority: 2,
    keywords: ["stock", "in stock", "ready made", "readymade", "available now", "buy now", "off the shelf", "showroom piece", "ready to deliver", "immediately", "same day"],
    answer: "Everything is made to order for your room, so there is nothing ready on a shelf. The team can tell you what is possible for your space after a free home visit, and you see the piece in 3D before it is built.",
    link: WA("Hello, I would like to know what you can make for my room."),
  },
  {
    id: "timing",
    kind: "price",
    priority: 2,
    keywords: ["delivery", "deliver", "how long", "lead time", "when will", "weeks", "days", "months", "timeline", "duration", "turnaround", "fast", "urgent", "deadline", "ready by", "eid", "ramadan", "move in", "moving"],
    answer: "Production and installation dates are agreed with you after the site measurement and your approval of the 3D design, so I cannot promise a date here. Tell the team when you would like the work finished and they will say what is possible. We keep you informed while your piece is in production.",
    link: WA("Hello, I would like to know the timeline for a made-to-measure piece. I would like it finished by ..."),
  },
  {
    id: "contact",
    kind: "faq",
    keywords: ["contact", "phone", "number", "call", "whatsapp", "email", "mail", "reach you", "talk to someone", "speak to", "human", "person", "agent", "team", "hours", "timing", "timings", "open", "opening", "closed", "working hours", "sunday", "friday", "weekend"],
    answer: `The quickest reply is on WhatsApp, ${SITE.phones[0].display}. You can also send the contact form and the design team replies within one working day. Our showroom is in ${SITE.showroom.display}, visits by appointment, and home measurement is available across all seven Emirates.`,
    link: WHATSAPP_CHAT,
  },
  {
    id: "process",
    kind: "faq",
    keywords: ["3d", "3d design", "design", "render", "drawing", "approve", "approval", "preview", "see before", "visualise", "visualize", "production"],
    answer: "Four steps. You send a few photos or a floor plan. We visit, measure every wall and opening, and show you the piece in 3D in your own room. You approve the design and the fixed quotation. Your furniture is then made in our Dubai workshop and installed by our own team. The visit and the 3D design are free, and nothing is built until you approve it.",
    link: { label: "How it works", href: "/#how-it-works" },
  },
  {
    id: "collections",
    kind: "faq",
    keywords: ["collection", "collections", "what do you make", "what do you sell", "products", "catalogue", "catalog", "range", "furniture", "browse", "everything", "list", "options"],
    answer: "We make sofas and majlis, beds and kids beds, dining tables, coffee tables, curtains, TV units and media walls, wall paneling, walk-in closets, fitted wardrobes, dressing tables, display shelving, kitchen cabinets and custom joinery, all made to measure. Tap a collection below or type the piece you have in mind.",
    link: { label: "All collections", href: "/collections" },
    priority: -1,
  },
  {
    id: "joinery",
    kind: "product",
    keywords: ["kitchen", "kitchen cabinet", "cabinet", "joinery", "custom joinery", "villa", "full villa", "carpentry", "woodwork", "bespoke", "custom piece", "something else", "door", "vanity unit bathroom", "bathroom", "office furniture", "desk", "study"],
    answer: "Yes. Beyond the collections on the site, our workshop takes on kitchen cabinets, full villa joinery and one-off custom pieces. Send a photo of the space and what you have in mind, and the team will tell you what they can make.",
    link: WA("Hello, I would like to ask about custom joinery for my home."),
  },
  {
    id: "gallery",
    kind: "faq",
    keywords: ["gallery", "photo", "photos", "pictures", "images", "video", "videos", "portfolio", "work", "examples", "previous", "projects", "recent", "see your work", "show me"],
    answer: "The gallery has photos and short videos of recent installations across every collection, and the newest projects go up on Instagram at " + SITE.instagramHandle + ".",
    link: { label: "Open the gallery", href: "/gallery" },
    priority: -1,
  },
  {
    id: "about",
    kind: "faq",
    keywords: ["about", "who are you", "company", "modern furniture collection", "mfc", "how long in business", "experience", "trust", "reviews", "review", "rating", "testimonial"],
    answer: "Modern Furniture Collection is a Dubai workshop, with a showroom in Al Butina, Sharjah, making made-to-measure sofas, beds, dining tables, curtains, wardrobes and media walls for homes across the UAE. The people who measure your room also design it, build it and install it.",
    link: { label: "About us", href: "/about" },
    priority: -1,
  },
  {
    id: "newsletter",
    kind: "faq",
    keywords: ["newsletter", "subscribe", "updates", "mailing list"],
    answer: "The newsletter goes out once a month with new projects and finishes. The sign-up box is at the bottom of every page.",
    priority: -1,
  },
  {
    id: "greeting",
    kind: "small-talk",
    priority: -2,
    keywords: ["hi", "hello", "hey", "salam", "salaam", "assalam", "marhaba", "good morning", "good evening", "good afternoon", "greetings"],
    answer: "Hello. Ask me about any collection, the free home visit, finishes, where we work, or how to start. If you would rather talk to a person, tap Chat on WhatsApp.",
  },
  {
    id: "thanks",
    kind: "small-talk",
    priority: -2,
    keywords: ["thanks", "thank you", "shukran", "great", "perfect", "ok", "okay", "bye", "goodbye", "cheers"],
    answer: "You are welcome. Whenever you are ready, send a photo of your room on WhatsApp and the team will take it from there.",
    link: WHATSAPP_CHAT,
  },
];

export const intents: Intent[] = [...extraIntents, ...faqIntents, ...productIntents, ...roomIntents];

export const FALLBACK_ANSWER =
  "I do not have an answer for that yet. I can only answer from what is on this site. Send your question to the team on WhatsApp below and they will reply within a working day.";

export const areaPlaces = areas;
export const whatsappFor = WA;
export const contactLink = CONTACT;
