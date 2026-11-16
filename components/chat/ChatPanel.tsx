"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { quickActions } from "@/lib/chatbot";
import { WHATSAPP_CHAT } from "@/lib/chatbot-intents";
import { SITE } from "@/lib/site";
import ChatMessage from "./ChatMessage";
import ChatLeadForm from "./ChatLeadForm";
import type { Chat } from "./useChat";

const isPhone = () => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;

export default function ChatPanel({ chat }: { chat: Chat }) {
  const { messages, typing, send, push, leadDone, setLeadDone, setOpen } = chat;
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  // Focus the panel, close on Escape, and stop the page scrolling behind the sheet on phones.
  useEffect(() => {
    root.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const lock = isPhone();
    const prev = document.body.style.overflow;
    if (lock) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      if (lock) document.body.style.overflow = prev;
    };
  }, [setOpen]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);

  const submit = () => {
    send(draft);
    setDraft("");
  };

  const last = messages[messages.length - 1];
  const lastQuestion = [...messages].reverse().find((m) => m.role === "user")?.text ?? "";
  const showLead = Boolean(last?.lead) && !leadDone && !typing;
  // A reply link is a full page load. Save the closed state first on phones so the sheet does not cover the new page.
  const onNavigate = () => {
    if (!isPhone()) return;
    setOpen(false);
    try {
      const raw = sessionStorage.getItem("mfc-chat");
      if (raw) sessionStorage.setItem("mfc-chat", JSON.stringify({ ...(JSON.parse(raw) as object), open: false }));
    } catch {
      // Storage is a convenience only.
    }
  };

  return (
    <motion.div
      ref={root}
      tabIndex={-1}
      role="dialog"
      aria-label={"Chat with " + SITE.name}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-x-0 bottom-0 z-[70] flex h-[85svh] flex-col overflow-hidden rounded-t-2xl border border-border bg-beige shadow-2xl shadow-black/30 outline-none sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[calc(100svh-3rem)] sm:w-[380px] sm:rounded-2xl"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border bg-beige-light px-4 py-3">
        <div>
          <p className="font-serif text-[17px] leading-tight text-charcoal">{SITE.name}</p>
          <p className="mt-0.5 text-[12px] text-taupe">Instant answers from our website</p>
        </div>
        <div className="flex items-center gap-1">
          <a href={WHATSAPP_CHAT.href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full text-[#1ebe5b] transition-colors hover:bg-beige">
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-beige">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      </div>

      <div ref={list} className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="flex flex-col gap-3" aria-live="polite" aria-relevant="additions">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} onChip={send} onNavigate={onNavigate} />
          ))}
          {typing && (
            <li className="flex items-center gap-1 px-4 py-3 text-taupe" aria-label="Typing">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-taupe" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-taupe [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-taupe [animation-delay:300ms]" />
            </li>
          )}
        </ul>
        {messages.length === 1 && !typing && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Quick options">
            {quickActions.map((q) => (
              <li key={q.label}>
                {q.action === "whatsapp" ? (
                  <a href={WHATSAPP_CHAT.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-charcoal px-4 font-dm text-[13px] font-medium text-beige-light transition-colors hover:bg-charcoal-light">
                    <WhatsAppIcon className="h-4 w-4" /> {q.label}
                  </a>
                ) : (
                  <button type="button" onClick={() => (q.action === "ask" ? input.current?.focus() : send(q.message ?? q.label))} className="inline-flex min-h-[40px] items-center rounded-full border border-charcoal/35 bg-beige-light px-4 font-dm text-[13px] font-medium text-charcoal transition-colors hover:border-charcoal">
                    {q.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        {showLead && <ChatLeadForm question={lastQuestion} onDone={(r) => { setLeadDone(true); push(r); }} />}
      </div>

      <div className="flex items-center gap-2 border-t border-border bg-beige-light px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <label className="sr-only" htmlFor="chat-input">Type your question</label>
        <input
          id="chat-input"
          ref={input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
          placeholder="Type a question, e.g. sofa, curtains, areas"
          autoComplete="off"
          enterKeyHint="send"
          className="min-h-[44px] flex-1 border border-border bg-beige px-3 font-dm text-[14px] text-charcoal placeholder:text-taupe-light transition-colors focus:border-gold-dark focus:outline-none"
        />
        <button type="button" onClick={submit} aria-label="Send" disabled={!draft.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-beige-light transition-colors hover:bg-charcoal-light disabled:opacity-40">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </motion.div>
  );
}
