"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "newsletter", email }) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "failed");
      setStatus("success");
    } catch (e) {
      setErrorText(e instanceof Error && e.message !== "failed" ? e.message : "");
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p role="status" className="font-dm text-sm text-gold">Thank you. You are on the list.</p>;
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        autoComplete="email"
        className="flex-1 bg-transparent border border-beige/25 px-4 py-3 font-dm text-sm text-beige-light placeholder:text-beige/40 focus:border-gold transition-colors"
      />
      <button type="submit" disabled={status === "submitting"} className="min-h-[48px] bg-gold px-6 py-3 text-[14px] font-medium text-beige transition-colors hover:bg-gold-dark disabled:opacity-60">
        {status === "submitting" ? "Joining" : "Subscribe"}
      </button>
      {status === "error" && <p role="alert" className="sm:basis-full font-dm text-xs text-danger">{errorText || "Please check the address and try again."}</p>}
    </form>
  );
}
