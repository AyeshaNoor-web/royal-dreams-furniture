"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Turnstile from "@/components/shared/Turnstile";
import { whatsappLink, services } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full bg-beige-light border border-border px-4 py-3.5 text-base text-charcoal placeholder:text-taupe focus:border-charcoal";
const label = "block text-[15px] text-charcoal mb-2";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", message: "", company: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const waText = "Hello! My name is " + (form.name || "\u2026") + ". I am interested in " + (form.interest || "custom furniture") + ". " + form.message;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, turnstileToken }) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "failed");
      setStatus("success");
    } catch (e) {
      setErrorText(e instanceof Error && e.message !== "failed" ? e.message : "");
      setStatus("error");
    }
  };

  return (
    <div>
        {status === "success" ? (
          <div className="border-t border-charcoal pt-8" role="status">
            <h3 className="font-serif text-3xl text-charcoal mb-3">Thank you, {form.name.split(" ")[0] || "friend"}.</h3>
            <p className="max-w-md text-[17px] text-taupe">Your enquiry has been sent. Our design team will reply within one working day.</p>
            <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn-dark mt-7">
              <WhatsAppIcon className="w-4 h-4" /> Continue on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
            <div>
              <label htmlFor="name" className={label}>Name</label>
              <input id="name" name="name" required value={form.name} onChange={update("name")} className={field} placeholder="Your full name" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="phone" className={label}>Phone / WhatsApp</label>
              <input id="phone" name="phone" required type="tel" value={form.phone} onChange={update("phone")} className={field} placeholder="050 000 0000" autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="email" className={label}>Email</label>
              <input id="email" name="email" required type="email" value={form.email} onChange={update("email")} className={field} placeholder="you@example.com" autoComplete="email" />
            </div>
            <div>
              <label htmlFor="interest" className={label}>Interest</label>
              <select id="interest" value={form.interest} onChange={update("interest")} className={field}>
                <option value="">Select a speciality</option>
                {services.map((s) => <option key={s}>{s}</option>)}
                <option>Full Villa Joinery</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className={label}>Message</label>
              <textarea id="message" required rows={5} value={form.message} onChange={update("message")} className={field + " resize-y"} placeholder="The room, roughly how big it is, finishes you like, and when you would like it done" />
            </div>
            <input type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={update("company")} className="hidden" aria-hidden="true" />

            {status === "error" && (
              <p role="alert" className="sm:col-span-2 text-[15px] text-danger">{errorText || "Something went wrong sending your message. Please try again or use WhatsApp below."}</p>
            )}

            <div className="sm:col-span-2"><Turnstile onToken={setTurnstileToken} /></div>
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 pt-2">
              <button type="submit" disabled={status === "submitting"} className="btn-dark disabled:opacity-60">
                {status === "submitting" ? "Sending\u2026" : "Send enquiry"}
              </button>
              <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn-line">
                <WhatsAppIcon className="w-4 h-4" /> Send via WhatsApp instead
              </a>
            </div>
          </form>
        )}
    </div>
  );
}
