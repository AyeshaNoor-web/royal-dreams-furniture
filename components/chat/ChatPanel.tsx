"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_CHAT } from "@/lib/chatbot-intents";
import { SITE } from "@/lib/site";
import ChatMessage from "./ChatMessage";
import ChatLeadForm from "./ChatLeadForm";
import ChatQuickActions from "./ChatQuickActions";
import type { Chat } from "./useChat";

const isPhone = () => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;

/** The chat window. A full-screen sheet on phones, a card in the corner on larger screens. */
export default function ChatPanel({ chat }: { chat: Chat }) {
  const { messages, typing, send, push, leadDone, setLeadDone, setOpen } = chat;
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  // Focus the panel and close on Escape.
  useEffect(() => {
    root.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setOpen]);

  // On phones the chat covers the screen: stop the page behind from scrolling, and keep the sheet exactly as tall as
  // the visible area so the input stays above the on-screen keyboard.
  useEffect(() => {
    if (!isPhone()) return;
    const el = root.current;
    const vv = window.visualViewport;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const fit = () => {
      if (!el || !vv) return;
      el.style.height = vv.height + "px";
      el.style.top = vv.offsetTop + "px";
    };
    fit();
    vv?.addEventListener("resize", fit);
    vv?.addEventListener("scroll", fit);
    return () => {
      document.body.style.overflow = prev;
      vv?.removeEventListener("resize", fit);
      vv?.removeEventListener("scroll", fit);
    };
  }, []);

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

  const headBtn = "flex h-11 w-10 items-center justify-center rounded-md text-white/85 transition-colors hover:bg-white/10 hover:text-white";

  return (
    <motion.div
      ref={root}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={"Chat with " + SITE.name}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-x-0 top-0 z-[80] flex h-[100dvh] flex-col overflow-hidden bg-beige outline-none sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[640px] sm:max-h-[calc(100dvh-3rem)] sm:w-[400px] sm:rounded-xl sm:border sm:border-border sm:shadow-[0_28px_70px_-24px_rgba(46,33,26,0.55)]"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 bg-ink pl-4 pr-2 pb-3.5 pt-[max(0.875rem,env(safe-area-inset-top))] text-white">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image src="/brand/logo-mark-gold.png" alt="" width={484} height={543} className="h-9 w-auto shrink-0" />
          <div className="min-w-0">
            <p className="truncate font-serif text-base leading-tight sm:text-[17px]">{SITE.name}</p>
            <p className="mt-0.5 font-dm text-[13px] text-white/75">Ask us anything about our furniture</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center">
          <a href={WHATSAPP_CHAT.href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={headBtn}>
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className={headBtn}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      </div>

      <div ref={list} className="chat-scroll flex-1 overflow-y-auto px-4 py-5">
        <ul className="flex flex-col gap-4" aria-live="polite" aria-relevant="additions">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} onChip={send} onNavigate={onNavigate} hideLink={showLead && m.id === last.id} />
          ))}
          {typing && (
            <li className="flex items-start" aria-label="Typing">
              <span className="flex items-center gap-1.5 rounded-lg rounded-tl-sm bg-beige-light px-4 py-4">
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-taupe" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-taupe [animation-delay:150ms]" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-taupe [animation-delay:300ms]" />
              </span>
            </li>
          )}
        </ul>
        {messages.length === 1 && !typing && <ChatQuickActions onSend={send} onAsk={() => input.current?.focus()} />}
        {showLead && <ChatLeadForm question={lastQuestion} waBase={waBase} onDone={(r) => { setLeadDone(true); push(r); }} />}
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-border bg-beige-light px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <label className="sr-only" htmlFor="chat-input">Type your question</label>
        <input
          id="chat-input"
          ref={input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }}
          placeholder="Ask anything about our furniture"
          autoComplete="off"
          enterKeyHint="send"
          className="min-h-[48px] min-w-0 flex-1 rounded-md border border-border bg-white px-3.5 font-dm text-base text-charcoal placeholder:text-taupe-light transition-colors focus:border-ink focus:outline-none"
        />
        <button type="button" onClick={submit} aria-label="Send" disabled={!draft.trim() || typing} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-ink text-white transition-colors hover:bg-charcoal disabled:bg-border disabled:text-taupe">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
        </button>
      </div>
    </motion.div>
  );
}
