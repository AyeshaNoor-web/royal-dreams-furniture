"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { whatsappLink } from "@/lib/site";
import type { ChatMessage } from "./useChat";

interface Props {
  /** The last thing the visitor asked. */
  question: string;
  /** The body of the WhatsApp message, already tailored to the reply (what to send for a quote, and so on). */
  waBase: string;
  onDone: (reply: Omit<ChatMessage, "id">) => void;
}

const field =
  "w-full rounded-md border border-border bg-white px-3.5 py-3 font-dm text-base text-charcoal placeholder:text-taupe-light transition-colors focus:border-ink focus:outline-none";

/** WhatsApp is the client's working channel, so the handoff opens WhatsApp with the visitor's name and question filled in.
 *  The same details are posted to /api/contact in the background as a record once email is configured. */
export default function ChatLeadForm({ question, waBase, onDone }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [error, setError] = useState(false);

  const text = `Hello, my name is ${name.trim() || "..."}. ${waBase}` + (phone.trim() ? ` You can also reach me on ${phone.trim()}.` : "");
  const href = whatsappLink(text);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!name.trim()) {
      e.preventDefault();
      setError(true);
      return;
    }
    if (phone.trim()) {
      fetch("/api/contact", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "enquiry", name: name.trim(), phone: phone.trim(), message: "Asked in the website chat, then continued on WhatsApp: " + question, source: "chatbot", company }),
      }).catch(() => undefined);
    }
    onDone({
      role: "bot",
      text: `Thank you, ${name.trim().split(" ")[0]}. Your message is ready in WhatsApp with your question filled in. If it did not open, tap below.`,
      link: { label: "Open WhatsApp", href, external: true },
    });
  };

  return (
    <div className="mt-3 w-full rounded-lg border border-border bg-beige-light p-4" role="group" aria-label="Send to the team on WhatsApp">
      <p className="font-serif text-lg leading-snug text-charcoal">Send this to the team on WhatsApp.</p>
      <p className="mt-1 font-dm text-sm text-taupe">Your question goes with it, already written. They reply within a working day.</p>
      <div className="mt-3 flex flex-col gap-2">
        <label className="sr-only" htmlFor="chat-name">Your name</label>
        <input id="chat-name" value={name} onChange={(e) => { setName(e.target.value); setError(false); }} className={field} placeholder="Your name" autoComplete="name" />
        <label className="sr-only" htmlFor="chat-phone">Phone number, optional</label>
        <input id="chat-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} placeholder="Phone, optional" autoComplete="tel" />
        <div className="hidden" aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>
      {error && (
        <p className="mt-2 text-[13px] text-taupe" role="alert">Please add your name so the team knows who is writing.</p>
      )}
      <a
        href={href}
        onClick={go}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 font-dm text-[15px] font-medium text-white transition-colors [touch-action:manipulation] hover:bg-[#1ebe5b]"
      >
        <WhatsAppIcon className="h-[18px] w-[18px]" /> Continue on WhatsApp
      </a>
    </div>
  );
}
