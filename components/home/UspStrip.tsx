"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const DURATION = 4000;
const EASE = [0.22, 1, 0.36, 1] as const;

const items = [
  { title: "Made to measure", text: "Every piece produced for your room, floor to ceiling.", icon: "M4 20h16M6 20V8l6-4 6 4v12M10 20v-6h4v6" },
  { title: "3D design approval", text: "You approve the design before production begins.", icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v18M4 7.5l8 4.5 8-4.5" },
  { title: "In-house workshop & fitters", text: "One team measures, builds and installs.", icon: "M14 6l4 4-9 9H5v-4l9-9zM12 8l4 4" },
  { title: "Installation across the UAE", text: "Dubai, Abu Dhabi, Sharjah and all Emirates.", icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM6 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" },
];

export default function UspStrip() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const reduce = useReducedMotion();

  // Step through the four promises; pause while the visitor is pointing at one.
  useEffect(() => {
    if (held || reduce) return;
    const t = setInterval(() => setActive((i) => (i + 1) % items.length), DURATION);
    return () => clearInterval(t);
  }, [held, reduce]);

  return (
    <section className="section-rule section-rule-b bg-beige-light" aria-label="Why choose us">
      <ol
        className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-3 lg:grid-cols-4 lg:gap-3 lg:px-8"
        onMouseLeave={() => setHeld(false)}
      >
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.title} className="relative">
              {/* Sliding highlight shared between items */}
              {on && (
                <motion.span
                  layoutId="usp-highlight"
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0 rounded-xl bg-beige/70 shadow-[inset_0_0_0_1px_rgba(212,184,168,0.6)]"
                  aria-hidden="true"
                />
              )}

              <button
                type="button"
                onMouseEnter={() => { setActive(i); setHeld(true); }}
                onFocus={() => { setActive(i); setHeld(true); }}
                onBlur={() => setHeld(false)}
                onClick={() => { setActive(i); setHeld(true); }}
                aria-pressed={on}
                className={"relative flex w-full flex-col items-start gap-3 rounded-xl px-4 py-5 text-left transition-colors duration-500 sm:flex-row sm:gap-4 lg:px-5 lg:py-6 " + (on ? "text-charcoal" : "text-taupe hover:text-charcoal")}
              >
                <motion.span
                  animate={on ? { scale: 1.08, rotate: 0 } : { scale: 1, rotate: 0 }}
                  whileHover={{ rotate: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 sm:mt-0.5 sm:h-11 sm:w-11 " + (on ? "border-gold-dark bg-gold/40 text-charcoal" : "border-border text-taupe-light")}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {/* The active icon draws itself in */}
                    <motion.path
                      key={on ? "on" : "off"}
                      d={it.icon}
                      initial={on && !reduce ? { pathLength: 0, opacity: 0.4 } : { pathLength: 1, opacity: 1 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                    />
                  </svg>
                </motion.span>

                <span className="min-w-0">
                  <motion.span
                    animate={{ y: on ? 0 : 2 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="block text-[14px] font-medium leading-snug sm:text-[15px]"
                  >
                    {it.title}
                  </motion.span>
                  <motion.span
                    animate={{ opacity: on ? 1 : 0.65, y: on ? 0 : 2 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mt-1 block text-[13px] leading-relaxed"
                  >
                    {it.text}
                  </motion.span>
                </span>
              </button>

              {/* Progress rail: fills across the item's time on screen, stays full while held */}
              <span className="absolute inset-x-4 bottom-0 h-px bg-border lg:inset-x-5" aria-hidden="true" />
              <AnimatePresence>
                {on && (
                  <motion.span
                    key={held ? "held" : "run-" + active}
                    initial={{ scaleX: held ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ opacity: 0 }}
                    transition={held || reduce ? { duration: 0.3 } : { duration: DURATION / 1000, ease: "linear" }}
                    className="absolute inset-x-4 bottom-0 h-[2px] origin-left bg-gold-dark lg:inset-x-5"
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
