"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";
import type { ChatMessage } from "./useChat";

interface Props {
  /** The last thing the visitor asked, sent to the team with their number. */
  question: string;
  onDone: (reply: Omit<ChatMessage, "id">) => void;
}

const field =
  "w-full border border-border bg-beige-light px-3 py-2.5 font-dm text-[14px] text-charcoal placeholder:text-taupe-light transition-colors focus:border-gold-dark focus:outline-none";

export default function ChatLeadForm({ question, onDone }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const submit = async () => {
    if (!name.trim() || phone.trim().length < 7) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const waText = `Hello, my name is ${name.trim()}. I asked on your website: "${question}". Please call me on ${phone.trim()}.`;
    const whatsapp = { label: "Send on WhatsApp", href: whatsappLink(waText), external: true };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "enquiry", name: name.trim(), phone: phone.trim(), message: "Asked in the website chat: " + question, source: "chatbot", company }),
      });
      const data = (await res.json()) as { ok: boolean; delivered?: boolean };
      if (!res.ok || !data.ok) throw new Error("failed");
      onDone(
        data.delivered === false
          ? { role: "bot", text: `Thank you, ${name.trim().split(" ")[0]}. Your details were received, but email delivery is not switched on yet. Tap below to send them on WhatsApp so they reach the team now.`, link: whatsapp }
          : { role: "bot", text: `Thank you, ${name.trim().split(" ")[0]}. The team has your number and will reply within one working day. If you prefer, send the same details on WhatsApp.`, link: whatsapp }
      );
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-2 w-full max-w-[88%] border border-border bg-beige p-4" role="group" aria-label="Leave your details">
      <p className="font-serif text-[17px] leading-snug text-charcoal">Leave your number and the team will call you.</p>
      <div className="mt-3 flex flex-col gap-2">
        <label className="sr-only" htmlFor="chat-name">Your name</label>
        <input id="chat-name" value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Your name" autoComplete="name" />
        <label className="sr-only" htmlFor="chat-phone">Phone or WhatsApp number</label>
        <input id="chat-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} placeholder="050 000 0000" autoComplete="tel" />
        <div className="hidden" aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>
      {status === "error" && (
        <p className="mt-2 text-[13px] text-taupe" role="alert">
          Please add your name and a phone number, then try again. Or use WhatsApp below.
        </p>
      )}
      <button type="button" onClick={submit} disabled={status === "sending"} className="btn-dark mt-3 min-h-[44px] w-full px-4 text-[14px] disabled:opacity-60">
        {status === "sending" ? "Sending..." : "Request a call back"}
      </button>
    </div>
  );
}
