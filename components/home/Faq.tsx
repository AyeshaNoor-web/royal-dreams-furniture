"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal, { EASE } from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { faqs } from "@/lib/faq";
import { WHATSAPP_LINK } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-border bg-beige-light py-12 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <Reveal className="lg:col-span-4">
          <h2 className="font-serif text-display-md text-charcoal">Common questions</h2>
          <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-taupe">Straight answers to what we are asked most. Anything else, ask us on WhatsApp.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-line mt-6">
            <WhatsAppIcon className="h-[18px] w-[18px]" /> Ask a question
          </a>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-8">
          <ul className="border-t border-border">
            {faqs.map((f, i) => {
              const on = open === i;
              const id = "faq-" + i;
              return (
                <li key={f.q} className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={id}
                      onClick={() => setOpen(on ? null : i)}
                      className="flex w-full items-center justify-between gap-5 py-4 text-left font-serif text-lg leading-snug text-charcoal transition-colors hover:text-gold-text sm:py-5 sm:text-xl lg:text-2xl"
                    >
                      {f.q}
                      <motion.span
                        animate={{ rotate: on ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-taupe"
                        aria-hidden="true"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={id}
                        key="body"
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-taupe sm:pb-6">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
