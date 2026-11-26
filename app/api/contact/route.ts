import { clientIp, json, sameOrigin } from "@/lib/request-guard";
import { rateLimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { emailConfigured, sendLead, sendNewsletterSignup } from "@/lib/lead";

interface Payload {
  type?: "enquiry" | "newsletter";
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
  source?: string;
  consent?: boolean;
  turnstileToken?: string;
  company?: string; // honeypot
}

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json(403, { ok: false, error: "Forbidden" });
  const ip = clientIp(req);
  const limit = await rateLimit(ip, "lead");
  if (!limit.success) return json(429, { ok: false, error: "Too many requests. Please try again in a few minutes or use WhatsApp." });

  const body = (await req.json().catch(() => null)) as Payload | null;
  if (!body) return json(400, { ok: false, error: "Invalid body" });

  // Bots fill the hidden field; pretend success so they stop.
  if (clean(body.company)) return json(200, { ok: true });

  if (!(await verifyTurnstile(body.turnstileToken, ip))) return json(403, { ok: false, error: "Verification failed. Please reload and try again." });

  // No silent success: a lead that cannot be delivered is an error the visitor must see, so they use WhatsApp instead.
  if (!emailConfigured()) return json(503, { ok: false, code: "not_configured", error: "Email delivery is not set up yet. Please message us on WhatsApp." });

  if (body.type === "newsletter") {
    const email = clean(body.email, 160);
    if (!isEmail(email)) return json(422, { ok: false, error: "Invalid email" });
    const status = await sendNewsletterSignup(email);
    return status === "sent" ? json(200, { ok: true }) : json(502, { ok: false, error: "Email provider error" });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const interest = clean(body.interest, 80);
  const message = clean(body.message, 3000);
  const source = clean(body.source, 40) || "contact page";

  if (!name || !phone || (email && !isEmail(email))) return json(422, { ok: false, error: "Missing or invalid fields" });
  if (source === "estimator" && body.consent !== true) return json(422, { ok: false, error: "Consent is required" });

  const status = await sendLead({ name, phone, email: email || undefined, interest, message, source });
  return status === "sent" ? json(200, { ok: true }) : json(502, { ok: false, error: "Email provider error" });
}
