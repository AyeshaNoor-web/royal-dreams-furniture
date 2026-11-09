"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const DURATION = 3600;

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
    <section className="border-y border-border bg-beige-light" aria-label="Why choose us">
      <ol
        className="relative mx-auto grid max-w-7xl grid-cols-2 px-6 lg:grid-cols-4 lg:px-10"
        onMouseLeave={() => setHeld(false)}
      >
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.title} className="relative">
              <button
                type="button"
                onMouseEnter={() => { setActive(i); setHeld(true); }}
                onFocus={() => { setActive(i); setHeld(true); }}
                onBlur={() => setHeld(false)}
                onClick={() => { setActive(i); setHeld(true); }}
                aria-pressed={on}
                className={
                  "group flex w-full items-start gap-4 py-6 pr-4 text-left transition-colors duration-500 lg:py-7 lg:pl-6 " +
                  (i === 0 ? "lg:pl-0 " : "") +
                  (on ? "text-charcoal" : "text-taupe hover:text-charcoal")
                }
              >
                <span
                  className={
                    "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 " +
                    (on ? "scale-105 border-gold bg-beige text-gold-dark shadow-[0_8px_20px_-12px_rgba(42,31,24,0.5)]" : "border-border bg-transparent text-taupe-light group-hover:border-gold")
                  }
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={it.icon} />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-dm text-[15px] font-medium leading-snug">{it.title}</span>
                  <span className={"mt-1 block text-[13px] leading-relaxed transition-opacity duration-500 " + (on ? "opacity-100" : "opacity-70")}>{it.text}</span>
                </span>
              </button>
              {/* Rail: a thin line under every item; the active one fills across its duration */}
              <span className="absolute inset-x-0 bottom-0 h-px bg-border" aria-hidden="true" />
              {on && (
                <span
                  key={active + (held ? "-held" : "")}
                  className={"usp-progress absolute inset-x-0 bottom-0 h-[2px] bg-gold-dark " + (held ? "!animate-none !scale-x-100" : "")}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
