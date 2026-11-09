import { NextResponse } from "next/server";

interface Payload {
  type?: "enquiry" | "newsletter";
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
  source?: string;
  company?: string; // honeypot
}

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

async function send(apiKey: string, to: string, subject: string, text: string, replyTo?: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Modern Furniture Collection <onboarding@resend.dev>",
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
    }),
  });
  return res.ok;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Payload | null;
  if (!body) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });

  // Bots fill the hidden field; pretend success so they stop.
  if (clean(body.company)) return NextResponse.json({ ok: true, delivered: false });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const configured = Boolean(apiKey && to);

  // Newsletter: email only
  if (body.type === "newsletter") {
    const email = clean(body.email, 160);
    if (!isEmail(email)) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 422 });
    if (!configured) return NextResponse.json({ ok: true, delivered: false });
    const ok = await send(apiKey!, to!, "Newsletter signup: " + email, "New newsletter subscriber: " + email);
    return ok ? NextResponse.json({ ok: true, delivered: true }) : NextResponse.json({ ok: false, error: "Email provider error" }, { status: 502 });
  }

  // Enquiry: name and phone required; email and message optional (homepage quick form omits them)
  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const interest = clean(body.interest, 80);
  const message = clean(body.message, 3000);
  const source = clean(body.source, 40) || "contact page";

  if (!name || !phone || (email && !isEmail(email))) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 422 });
  }
  if (!configured) return NextResponse.json({ ok: true, delivered: false });

  const text = [
    `New enquiry from the website (${source})`,
    ``,
    `Name:     ${name}`,
    `Phone:    ${phone}`,
    `Email:    ${email || "-"}`,
    `Interest: ${interest || "-"}`,
    ``,
    message || "(no message)",
  ].join("\n");

  const ok = await send(apiKey!, to!, `Enquiry: ${interest || "Custom furniture"} - ${name}`, text, email || undefined);
  return ok ? NextResponse.json({ ok: true, delivered: true }) : NextResponse.json({ ok: false, error: "Email provider error" }, { status: 502 });
}
