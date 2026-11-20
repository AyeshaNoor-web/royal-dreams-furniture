"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";
import Mascot from "./Mascot";

export const TEASER_KEY = "mfc-chat-teaser";
const DELAY = 3500;

/** A small greeting from the assistant beside the bubble, shown once per session to visitors who have not opened the chat. */
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
          className="fixed bottom-[86px] right-6 z-[69] hidden w-[min(300px,calc(100vw-3rem))] sm:block rounded-2xl rounded-br-md border border-border bg-beige-light p-4 shadow-xl shadow-black/15"
        >
          <button type="button" onClick={dismiss} aria-label="Dismiss" className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center rounded-full text-taupe transition-colors hover:bg-beige hover:text-charcoal">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="flex items-start gap-3 pr-5">
            <Mascot className="h-12 w-12 shrink-0" wave />
            <div>
              <p className="font-serif text-[17px] leading-snug text-charcoal">Hi, I&apos;m {SITE.assistant.name}. Planning a room?</p>
              <p className="mt-1 text-[13px] leading-relaxed text-taupe">Tell me the piece and the room and I will point you to the right collection, or give you a budget range.</p>
            </div>
          </div>
          <button type="button" onClick={() => { dismiss(); onOpen(); }} className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-charcoal px-4 font-dm text-[13px] font-medium text-beige-light transition-colors hover:bg-charcoal-light">
            Ask {SITE.assistant.name} <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
