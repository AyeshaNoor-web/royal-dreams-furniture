// Built-in matcher for the chat assistant. It is the fallback when the AI route (app/api/chat) has no
// key or does not answer: the same question always gets the same answer, every answer comes from
// lib/chatbot-intents.ts or the catalogue, and there is no network call. It forgives typos and
// remembers which collection the visitor was last talking about.
import { FALLBACK_ANSWER, WHATSAPP_CHAT, areaPlaces, intents, whatsappFor, type ChatLink, type Intent } from "./chatbot-intents";
import { quoteFactors } from "./quote";
import { categories } from "./gallery";
import { priceOf } from "./pricing";
import { products, type Product } from "./products";

export interface Reply {
  text: string;
  link?: ChatLink;
  /** Collection titles to show as tappable chips. */
  chips?: string[];
  /** Offer the name-and-phone form under this reply. */
  lead?: boolean;
  /** The collection this reply was about, carried into the next question. */
  topic?: string;
}

const singular = (w: string) => {
  if (w.length <= 3) return w;
  if (w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (/(sh|ch|ss|x)es$/.test(w)) return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
};

export const tokens = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(singular);

/** True when two words are the same or one typo apart (a wrong, missing, extra or swapped letter). */
const near = (a: string, b: string) => {
  if (a === b) return true;
  // The first letter has to match, so that "weather" is not read as "leather".
  if (a.length < 5 || b.length < 5 || a[0] !== b[0] || Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  let x = a.length - 1;
  let y = b.length - 1;
  while (x >= i && y >= i && a[x] === b[y]) { x--; y--; }
  const ra = a.slice(i, x + 1);
  const rb = b.slice(i, y + 1);
  if (ra.length <= 1 && rb.length <= 1) return true;
  return ra.length === 2 && rb.length === 2 && ra[0] === rb[1] && ra[1] === rb[0];
};

const hasWord = (t: string[], w: string) => t.some((x) => near(x, w));

const hasPhrase = (t: string[], p: string[]) => {
  if (p.length > t.length) return false;
  for (let i = 0; i + p.length <= t.length; i++) {
    let ok = true;
    for (let j = 0; j < p.length; j++) if (!near(t[i + j], p[j])) { ok = false; break; }
    if (ok) return true;
  }
  return false;
};

const scoreIntent = (t: string[], intent: Intent) => {
  let score = 0;
  for (const k of intent.keywords) {
    const p = tokens(k);
    if (p.length === 0) continue;
    if (p.length === 1) { if (hasWord(t, p[0])) score += 1; }
    else if (hasPhrase(t, p)) score += 2 + p.length;
  }
  return score;
};

export interface Match { intent: Intent; score: number }

export const match = (text: string): Match[] => {
  const t = tokens(text);
  if (t.length === 0) return [];
  return intents
    .map((intent, i) => ({ intent, score: scoreIntent(t, intent), i }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score || (b.intent.priority ?? 0) - (a.intent.priority ?? 0) || a.i - b.i)
    .map(({ intent, score }) => ({ intent, score }));
};

const productOf = (m: Match[]) => m.find((x) => x.intent.kind === "product" && x.intent.id.startsWith("product:"));
const slugOf = (m?: Match) => m?.intent.id.replace("product:", "");

// Words that appear in almost every design name and say nothing about which one is meant.
const COMMON = new Set(["with", "and", "the", "for", "wall", "unit", "table", "bed", "sofa", "set", "room", "in", "a", "of", "to"]);

/** A design whose name shares at least two telling words with the question, for example "fireplace media wall". */
const designFor = (t: string[]): Product | null => {
  let best: Product | null = null;
  let bestScore = 1;
  for (const p of products) {
    const words = tokens(p.title).filter((w) => !COMMON.has(w));
    const score = words.filter((w) => hasWord(t, w)).length;
    if (score > bestScore) { best = p; bestScore = score; }
  }
  return best;
};

/** The collections a piece of conversation is about, most likely first. Used to pick what the AI is told. */
export const topicsFor = (text: string, max = 2): string[] => {
  const found: string[] = [];
  const design = designFor(tokens(text));
  if (design) found.push(design.slug);
  for (const m of match(text)) {
    if (m.intent.kind !== "product" || !m.intent.id.startsWith("product:")) continue;
    const slug = m.intent.id.replace("product:", "");
    if (!found.includes(slug)) found.push(slug);
  }
  return found.slice(0, max);
};

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const describe = (p: Product) => (p.line ? `${p.title}: ${lower(p.line).replace(/\.$/, "")}.` : `${p.title}.`);

const priceFor = (slug: string): Reply | null => {
  const q = quoteFactors.find((f) => f.slug === slug);
  const c = categories.find((x) => x.slug === slug);
  if (!q || !c) return null;
  const title = c.title.toLowerCase();
  if (priceOf(slug)) {
    return {
      text: `For ${title} the budget calculator gives a starting figure: enter the width and height of the wall and choose a door type. The price also depends on: ${q.depends.join("; ").toLowerCase()}. The fixed quotation follows the free site measurement.`,
      link: { label: "Open the budget calculator", href: "/pricing" },
      topic: slug,
    };
  }
  return {
    text: `We do not list prices for ${title}, because each one is made to your sizes and finish. The price depends on: ${q.depends.join("; ").toLowerCase()}. For a first estimate send ${lower(q.send)} The team replies within a working day with a rough budget, and the fixed quotation follows the free site measurement.`,
    link: whatsappFor(`Hello, I would like a quotation for made-to-measure ${title}. I will send ${lower(q.send)}`),
    lead: true,
    topic: slug,
  };
};

const areaFor = (text: string): string | null => {
  const t = text.toLowerCase();
  for (const p of areaPlaces.near.places) if (t.includes(p.toLowerCase())) return `Yes, ${p} is among the nearest areas to the workshop, so it has the most visit slots. The home visit and measurement are free.` + (p === "Sharjah" ? " Our showroom is in Al Butina, Sharjah, if you would like to see finishes in person. Visits are by appointment." : "");
  for (const p of areaPlaces.far.places) if (t.includes(p.toLowerCase()) || (p === "Ras Al Khaimah" && /\brak\b/.test(t))) return `Yes, we measure and install in ${p}. It is further from the Dubai workshop, so visits there are arranged by appointment. The home visit is still free.`;
  return null;
};

const collectionChips = () => categories.map((c) => c.title);

/** Answers a question. `topic` is the collection the previous reply was about, so "how much is it" still makes sense. */
export const answer = (text: string, topic?: string): Reply => {
  const t = tokens(text);
  const ranked = match(text);
  const product = productOf(ranked);
  const slug = slugOf(product) ?? topic;
  const design = designFor(t);

  if (ranked.length === 0) {
    if (design) return { text: `${describe(design)} Its page has every photo and video of it, and a button to ask for a quote on that design.`, link: { label: "See " + design.title, href: design.href }, topic: design.slug };
    return { text: FALLBACK_ANSWER, link: WHATSAPP_CHAT, lead: true, topic };
  }
  const top = ranked[0].intent;

  if (top.id === "price" || top.id === "stock" || top.id === "timing") {
    if (top.id === "price" && slug) {
      const r = priceFor(slug);
      if (r) return r;
    }
    // "Do you deliver to Ajman" is a coverage question, not a date question.
    const place = top.id === "timing" ? areaFor(text) : null;
    if (place) return { text: place + " Installation dates are agreed after the site measurement and your approval of the design.", link: top.link, topic: slug };
    return { text: top.answer, link: top.link, lead: true, topic: slug };
  }

  if (top.kind === "areas") {
    const specific = areaFor(text);
    return { text: specific ?? top.answer, link: top.link, topic: slug };
  }

  if (top.id === "collections") return { text: top.answer, link: top.link, chips: collectionChips(), topic: slug };

  // A named design beats the general description of its collection.
  if (design && top.kind === "product" && (!product || design.slug === slugOf(product))) {
    return { text: `${describe(design)} Its page has every photo and video of it, and a button to ask for a quote on that design.`, link: { label: "See " + design.title, href: design.href }, topic: design.slug };
  }

  return { text: top.answer, link: top.link, topic: top.kind === "product" ? slugOf(product) ?? slug : slug };
};

export const WELCOME =
  "Welcome to Modern Furniture Collection. Ask me anything about our furniture, a design you have seen, budgets, the free home visit, finishes or where we work. Everything is made to measure in our Dubai workshop.";

export const quickActions: { label: string; message?: string; action?: "whatsapp" | "ask" }[] = [
  { label: "Browse collections", message: "What do you make?" },
  { label: "Where we work", message: "Where are you located and which areas do you cover?" },
  { label: "Ask a question", action: "ask" },
  { label: "Chat on WhatsApp", action: "whatsapp" },
];
