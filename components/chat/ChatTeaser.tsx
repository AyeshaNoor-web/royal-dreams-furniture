"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";
import Mascot from "./Mascot";

export const TEASER_KEY = "mfc-chat-teaser";
const DELAY = 6000;
const LINGER = 10000;

/**
 * A one-line greeting that rises out of the chat bubble on large screens, once per session, and leaves by itself.
 * It never covers page content on phones or tablets, and it never appears again once the chat has been opened.
 */
export default function ChatTeaser({ active, onOpen }: { active: boolean; onOpen: () => void }) {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) { setShow(false); return; }
    try { if (sessionStorage.getItem(TEASER_KEY)) return; } catch { /* storage blocked: show it anyway */ }
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const on = setTimeout(() => setShow(true), DELAY);
    const off = setTimeout(() => setShow(false), DELAY + LINGER);
    return () => { clearTimeout(on); clearTimeout(off); };
  }, [active]);

  const dismiss = () => {
    setShow(false);
    try { sessionStorage.setItem(TEASER_KEY, "1"); } catch { /* ignore */ }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="teaser"
          role="status"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.8 }}
          style={{ transformOrigin: "100% 100%" }}
          className="fixed bottom-[92px] right-6 z-[69] hidden items-center gap-3 rounded-full border border-border bg-beige py-2 pl-2 pr-2 shadow-2xl shadow-charcoal/20 lg:flex"
        >
          <Mascot className="h-10 w-10 shrink-0" wave />
          <button type="button" onClick={() => { dismiss(); onOpen(); }} className="min-h-[44px] pr-2 text-left font-dm text-[14px] text-charcoal [touch-action:manipulation]">
            <span className="block leading-tight">Planning a room? Ask {SITE.assistant.name}.</span>
            <span className="block text-[12px] leading-tight text-taupe">Instant answers, or a designer on WhatsApp.</span>
          </button>
          <button type="button" onClick={dismiss} aria-label="Dismiss" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-taupe transition-colors hover:bg-beige hover:text-charcoal">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
