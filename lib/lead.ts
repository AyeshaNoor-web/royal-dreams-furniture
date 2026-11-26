import "server-only";

export interface Lead {
  name: string;
  phone: string;
  email?: string;
  interest?: string;
  message?: string;
  source: string;
}

export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);

/** Emails a lead to the team through Resend. Shared by /api/contact and the assistant's submit_lead tool. */
export async function sendLead(lead: Lead): Promise<"sent" | "not_configured" | "failed"> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return "not_configured";
  const text = [
    `New enquiry from the website (${lead.source})`,
    ``,
    `Name:     ${lead.name}`,
    `Phone:    ${lead.phone}`,
    `Email:    ${lead.email || "-"}`,
    `Interest: ${lead.interest || "-"}`,
    ``,
    lead.message || "(no message)",
  ].join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Modern Furniture Collection <onboarding@resend.dev>",
        to: [to],
        ...(lead.email ? { reply_to: lead.email } : {}),
        subject: `Enquiry: ${lead.interest || "Custom furniture"} - ${lead.name}`,
        text,
      }),
    });
    return res.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

export async function sendNewsletterSignup(email: string): Promise<"sent" | "not_configured" | "failed"> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return "not_configured";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Modern Furniture Collection <onboarding@resend.dev>",
        to: [to],
        subject: "Newsletter signup: " + email,
        text: "New newsletter subscriber: " + email,
      }),
    });
    return res.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
