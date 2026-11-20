"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Turnstile from "@/components/shared/Turnstile";
import { whatsappLink, services } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full bg-beige-light border border-border px-4 py-3 font-dm text-sm text-charcoal placeholder:text-taupe-light focus:border-gold-dark transition-colors";
const label = "block text-[14px] text-charcoal mb-1.5";

export default function QuickInquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", interest: "", message: "", company: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const waText = "Hello! My name is " + (form.name || "\u2026") + ". I am interested in " + (form.interest || "custom furniture") + ". " + form.message;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "homepage", turnstileToken }) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "failed");
      setStatus("success");
    } catch (e) {
      setErrorText(e instanceof Error && e.message !== "failed" ? e.message : "");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-beige-light border border-border p-8 text-center" role="status">
        <h3 className="font-serif text-2xl text-charcoal mb-3">Thank you, {form.name.split(" ")[0] || "friend"}.</h3>
        <p className="font-dm text-sm text-taupe">Our design team will call you within one working day.</p>
        <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn-dark mt-6">
          <WhatsAppIcon className="w-4 h-4" /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-beige-light border border-border p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate>
      <div className="sm:col-span-2">
        <h3 className="font-serif text-2xl text-charcoal">What are you planning?</h3>
      </div>
      <div>
        <label htmlFor="q-name" className={label}>Name</label>
        <input id="q-name" name="name" required value={form.name} onChange={update("name")} className={field} placeholder="Your name" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="q-phone" className={label}>Phone / WhatsApp</label>
        <input id="q-phone" name="phone" required type="tel" value={form.phone} onChange={update("phone")} className={field} placeholder="050 000 0000" autoComplete="tel" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="q-interest" className={label}>Interest</label>
        <select id="q-interest" value={form.interest} onChange={update("interest")} className={field}>
          <option value="">Select a speciality</option>
          {services.map((s) => <option key={s}>{s}</option>)}
          <option>Full Villa Joinery</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="q-message" className={label}>Message (optional)</label>
        <textarea id="q-message" rows={3} value={form.message} onChange={update("message")} className={field + " resize-y"} placeholder="Room size, finishes you like, timeline" />
      </div>
      <input type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={update("company")} className="hidden" aria-hidden="true" />
      {status === "error" && <p role="alert" className="sm:col-span-2 font-dm text-sm text-red-700">{errorText || "Something went wrong. Please try again or use WhatsApp."}</p>}
      <div className="sm:col-span-2"><Turnstile onToken={setTurnstileToken} /></div>
      <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-1">
        <button type="submit" disabled={status === "submitting"} className="btn-dark disabled:opacity-60">
          {status === "submitting" ? "Sending\u2026" : "Request callback"}
        </button>
        <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn-line">
          <WhatsAppIcon className="w-4 h-4" /> WhatsApp instead
        </a>
      </div>
    </form>
  );
}
