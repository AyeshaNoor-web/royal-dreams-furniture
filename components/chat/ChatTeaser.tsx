"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";

export const TEASER_KEY = "mfc-chat-teaser";
const DELAY = 3500;

/** A small greeting card beside the bubble, shown once per session to visitors who have not opened the chat. */
export default function ChatTeaser({ active, onOpen }: { active: boolean; onOpen: () => void }) {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) { setShow(false); return; }
    try { if (sessionStorage.getItem(TEASER_KEY)) return; } catch { /* storage blocked: show it anyway */ }
    const t = setTimeout(() => setShow(true), DELAY);
    return () => clearTimeout(t);
  }, [active]);

  const dismiss = () => {
    setShow(false);
    try { sessionStorage.setItem(TEASER_KEY, "1"); } catch { /* ignore */ }
  };

  // The card sits over page content, so it leaves by itself after a few seconds and does not come back this visit.
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem(TEASER_KEY, "1"); } catch { /* ignore */ }
    }, 9000);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="teaser"
          role="status"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed bottom-[86px] right-6 z-[69] hidden w-[280px] lg:block rounded-2xl rounded-br-md border border-border bg-beige-light p-4 shadow-xl shadow-black/15"
        >
          <button type="button" onClick={dismiss} aria-label="Dismiss" className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-taupe transition-colors hover:bg-beige hover:text-charcoal">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <p className="pr-6 font-serif text-[17px] leading-snug text-charcoal">Need a sofa, wardrobe or curtains made to measure?</p>
          <p className="mt-1 text-[13px] leading-relaxed text-taupe">Ask here and get an instant answer, or message the team on WhatsApp.</p>
          <button type="button" onClick={() => { dismiss(); onOpen(); }} className="mt-3 inline-flex min-h-[40px] items-center gap-2 rounded-full bg-charcoal px-4 font-dm text-[13px] font-medium text-beige-light transition-colors hover:bg-charcoal-light">
            Ask a question <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
