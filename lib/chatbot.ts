// Keyword matcher for the chat assistant. Deterministic: the same question always gets the same
// answer, and every answer comes from lib/chatbot-intents.ts. No AI, no network call.
import { FALLBACK_ANSWER, WHATSAPP_CHAT, areaPlaces, intents, whatsappFor, type ChatLink, type Intent } from "./chatbot-intents";
import { quoteFactors } from "./quote";
import { categories } from "./gallery";
import { estimatorEnabled } from "./flags";

export interface Reply {
  text: string;
  link?: ChatLink;
  /** Collection titles to show as tappable chips. */
  chips?: string[];
  /** Offer the name-and-phone form under this reply. */
  lead?: boolean;
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

const hasPhrase = (t: string[], p: string[]) => {
  if (p.length > t.length) return false;
  for (let i = 0; i + p.length <= t.length; i++) {
    let ok = true;
    for (let j = 0; j < p.length; j++) if (t[i + j] !== p[j]) { ok = false; break; }
    if (ok) return true;
  }
  return false;
};

const scoreIntent = (t: string[], intent: Intent) => {
  let score = 0;
  for (const k of intent.keywords) {
    const p = tokens(k);
    if (p.length === 0) continue;
    if (p.length === 1) { if (t.includes(p[0])) score += 1; }
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

const priceFor = (slug: string): Reply | null => {
  const q = quoteFactors.find((f) => f.slug === slug);
  const c = categories.find((x) => x.slug === slug);
  if (!q || !c) return null;
  const title = c.title.toLowerCase();
  if (estimatorEnabled) {
    return {
      text: `We do not list fixed prices for ${title}, because each one is made to your sizes and finish. The price depends on: ${q.depends.join("; ").toLowerCase()}. The estimator gives you an indicative range now, and the team confirms a fixed quotation after the free site measurement.`,
      link: { label: "Estimate " + title, href: "/estimator?c=" + slug },
    };
  }
  return {
    text: `We do not list prices for ${title}, because each one is made to your sizes and finish. The price depends on: ${q.depends.join("; ").toLowerCase()}. For a first estimate send ${q.send.charAt(0).toLowerCase() + q.send.slice(1)} The team replies within a working day with a rough budget, and the fixed quotation follows the free site measurement.`,
    link: whatsappFor(`Hello, I would like a quotation for made-to-measure ${title}. I will send ${q.send.charAt(0).toLowerCase() + q.send.slice(1)}`),
    lead: true,
  };
};

const areaFor = (text: string): string | null => {
  const t = text.toLowerCase();
  for (const p of areaPlaces.near.places) if (t.includes(p.toLowerCase())) return `Yes, ${p} is among the nearest areas to the workshop, so it has the most visit slots. The home visit and measurement are free.` + (p === "Sharjah" ? " Our showroom is in Al Butina, Sharjah, if you would like to see finishes in person. Visits are by appointment." : "");
  for (const p of areaPlaces.far.places) if (t.includes(p.toLowerCase()) || (p === "Ras Al Khaimah" && /\brak\b/.test(t))) return `Yes, we measure and install in ${p}. It is further from the Dubai workshop, so visits there are arranged by appointment. The home visit is still free.`;
  return null;
};

const collectionChips = () => categories.map((c) => c.title);

export const answer = (text: string): Reply => {
  const ranked = match(text);
  if (ranked.length === 0) return { text: FALLBACK_ANSWER, link: WHATSAPP_CHAT, lead: true };
  const top = ranked[0].intent;

  if (top.id === "price" || top.id === "stock" || top.id === "timing") {
    const product = productOf(ranked);
    if (top.id === "price" && product) {
      const r = priceFor(product.intent.id.replace("product:", ""));
      if (r) return r;
    }
    // "Do you deliver to Ajman" is a coverage question, not a date question.
    const place = top.id === "timing" ? areaFor(text) : null;
    if (place) return { text: place + " Installation dates are agreed after the site measurement and your approval of the design.", link: top.link };
    return { text: top.answer, link: top.link, lead: true };
  }

  if (top.kind === "areas") {
    const specific = areaFor(text);
    return { text: specific ?? top.answer, link: top.link };
  }

  if (top.id === "collections") return { text: top.answer, link: top.link, chips: collectionChips() };

  return { text: top.answer, link: top.link };
};

export const WELCOME =
  "Welcome to Modern Furniture Collection. I can answer questions about our collections, the free home visit, finishes, where we work and how to start. Everything is made to measure in our Dubai workshop.";

export const quickActions: { label: string; message?: string; action?: "whatsapp" | "ask" }[] = [
  { label: "Browse collections", message: "What do you make?" },
  { label: "Where we work", message: "Where are you located and which areas do you cover?" },
  { label: "Ask a question", action: "ask" },
  { label: "Chat on WhatsApp", action: "whatsapp" },
];
