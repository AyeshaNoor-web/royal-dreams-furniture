"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { aiQuickActions, quickActions } from "@/lib/chatbot";
import { WHATSAPP_CHAT } from "@/lib/chatbot-intents";
import { QUOTE_LINK, SITE, VISIT_LINK } from "@/lib/site";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatLeadForm from "./ChatLeadForm";
import ChatQuickActions from "./ChatQuickActions";
import { useFocusTrap } from "./useFocusTrap";
import { useViewportFit } from "./useViewportFit";
import type { Chat } from "./useChat";

export default function ChatPanel({ chat }: { chat: Chat }) {
  const { ai, messages, typing, send, push, reset, leadDone, setLeadDone, setOpen, setMinimised } = chat;
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useFocusTrap(root);
  useViewportFit(root);

  // Focus the panel and close on Escape. The page behind stays scrollable: the chat is a card, not a sheet.
  useEffect(() => {
    root.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);

  const submit = () => {
    if (!draft.trim() || typing) return;
    send(draft);
    setDraft("");
  };

  const last = messages[messages.length - 1];
  const lastQuestion = [...messages].reverse().find((m) => m.role === "user")?.text ?? "";
  const showLead = !ai && Boolean(last?.lead) && !leadDone && !typing;
  // The WhatsApp message the lead card sends: the reply's own tailored text when it has one, otherwise the question.
  const waBase = (() => {
    const l = last?.link;
    if (l?.external && l.href.startsWith("https://wa.me") && l.href !== WHATSAPP_CHAT.href) {
      try {
        const t = new URL(l.href).searchParams.get("text") ?? "";
        if (t) return t.replace(/^hello[,!]?\s*/i, "");
      } catch { /* fall through */ }
    }
    return `I asked on your website: "${lastQuestion}".`;
  })();
  // A site link is a full page load. Minimise to a "Back to chat" pill so the new page is visible; state is saved first.
  const onNavigate = () => {
    setMinimised(true);
    try {
      const raw = sessionStorage.getItem("mfc-chat");
      if (raw) sessionStorage.setItem("mfc-chat", JSON.stringify({ ...(JSON.parse(raw) as object), open: true, minimised: true }));
    } catch { /* storage is a convenience only */ }
  };

  return (
    <motion.div
      ref={root}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-label={(ai ? "AI assistant, " : "Chat with ") + SITE.name}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed bottom-4 left-4 right-4 z-[70] flex h-[min(64svh,540px)] flex-col overflow-hidden rounded-2xl border border-border bg-beige shadow-2xl shadow-black/30 outline-none sm:bottom-6 sm:left-auto sm:right-6 sm:h-[600px] sm:max-h-[calc(100svh-3rem)] sm:w-[380px]"
    >
      <ChatHeader ai={ai} canReset={messages.length > 1} onReset={reset} onClose={() => setOpen(false)} />

      <div ref={list} className="flex-1 overflow-y-auto px-4 py-4 [overscroll-behavior:contain]">
        <ul className="flex flex-col gap-3" aria-live="polite" aria-relevant="additions text">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} onChip={send} onNavigate={onNavigate} hideLink={showLead && m.id === last.id} />
          ))}
          {typing && (
            <li className="flex items-center gap-1 px-4 py-3 text-taupe" aria-label="Typing">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-taupe" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-taupe [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-taupe [animation-delay:300ms]" />
            </li>
          )}
        </ul>
        {messages.length === 1 && !typing && <ChatQuickActions actions={ai ? aiQuickActions : quickActions} onSend={send} onAsk={() => input.current?.focus()} />}
        {showLead && <ChatLeadForm question={lastQuestion} waBase={waBase} onDone={(r) => { setLeadDone(true); push(r); }} />}
      </div>

      <div className="border-t border-border bg-beige-light px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-taupe">
          <a href={WHATSAPP_CHAT.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center gap-1.5 underline-offset-4 hover:text-charcoal hover:underline">
            <WhatsAppIcon className="h-3.5 w-3.5 text-[#128C7E]" /> Talk to a designer
          </a>
          <a href={VISIT_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center underline-offset-4 hover:text-charcoal hover:underline">Book a free visit</a>
          <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center underline-offset-4 hover:text-charcoal hover:underline">Get a free quote</a>
        </div>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="chat-input">Type your question</label>
          <input
            id="chat-input"
            name="message"
            ref={input}
            value={draft}
            maxLength={1000}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
            placeholder={ai ? "Tell me about your room" : "Type a question, e.g. sofa, curtains, areas"}
            autoComplete="off"
            enterKeyHint="send"
            className="min-h-[44px] flex-1 border border-border bg-beige px-3 font-dm text-[16px] text-charcoal placeholder:text-taupe-light transition-colors focus:border-gold-dark sm:text-[14px]"
          />
          <button type="button" onClick={submit} aria-label="Send" disabled={!draft.trim() || typing} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-beige-light transition-colors hover:bg-charcoal-light disabled:opacity-40">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
