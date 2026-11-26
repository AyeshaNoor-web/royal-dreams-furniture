"use client";

import { useState } from "react";
import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Turnstile from "@/components/shared/Turnstile";

const field = "w-full border border-border bg-beige-light px-4 py-3 font-dm text-[16px] text-charcoal placeholder:text-taupe-light focus:border-gold-dark";
const label = "block text-[14px] text-charcoal mb-1.5";

/** Emails the estimate to the team with the visitor's details. The result is never gated behind this. */
export default function EstimateLeadForm({ summary, whatsapp }: { summary: string; whatsapp: string }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", consent: false, company: "" });
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = async () => {
    if (!form.name.trim() || form.phone.trim().length < 7 || !form.consent) {
      setErrorText("Please add your name, a phone number and tick the consent box.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "enquiry", name: form.name, phone: form.phone, email: form.email, interest: "Budget estimate", message: summary, source: "estimator", consent: form.consent, turnstileToken: token, company: form.company }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again or use WhatsApp.");
      setStatus("done");
    } catch (e) {
      setErrorText(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div role="status" className="mt-6 border border-border bg-beige-light p-6">
        <p className="font-serif text-xl text-charcoal">Sent. The team will reply within one working day.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 border border-border bg-beige-light p-5 sm:grid-cols-2 sm:p-6" aria-label="Send me this estimate">
      <div className="sm:col-span-2">
        <p className="font-serif text-xl text-charcoal">Send me this estimate</p>
        <p className="mt-1 text-[14px] text-taupe">We email it to the team with your details and come back to arrange the free visit.</p>
      </div>
      <div>
        <label htmlFor="est-name" className={label}>Name</label>
        <input id="est-name" name="name" value={form.name} onChange={set("name")} className={field} autoComplete="name" required />
      </div>
      <div>
        <label htmlFor="est-phone" className={label}>Phone or WhatsApp</label>
        <input id="est-phone" name="phone" type="tel" value={form.phone} onChange={set("phone")} className={field} autoComplete="tel" placeholder="050 000 0000" required />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="est-email" className={label}>Email, optional</label>
        <input id="est-email" name="email" type="email" value={form.email} onChange={set("email")} className={field} autoComplete="email" />
      </div>
      <div className="hidden" aria-hidden="true"><input tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} /></div>
      <label className="flex items-start gap-3 text-[14px] text-taupe sm:col-span-2">
        <input type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-1 h-5 w-5 accent-charcoal" required />
        <span>I agree that Modern Furniture Collection may contact me about this estimate, as described in the <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-charcoal">privacy policy</Link>.</span>
      </label>
      <div className="sm:col-span-2"><Turnstile onToken={setToken} /></div>
      {status === "error" && <p role="alert" className="text-[14px] text-danger sm:col-span-2">{errorText}</p>}
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button type="button" onClick={submit} disabled={status === "sending"} className="btn-dark min-h-[48px] disabled:opacity-60">{status === "sending" ? "Sending\u2026" : "Send estimate"}</button>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-line min-h-[48px]"><WhatsAppIcon className="h-4 w-4" /> WhatsApp instead</a>
      </div>
    </div>
  );
}
