"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { faqs } from "@/lib/faq";
import { areas, whatsappLink } from "@/lib/site";

/** Last objections before the final ask: where we travel, and the questions people send most. */
export default function Answers() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const places = [...areas.near.places, ...areas.far.places];
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="font-serif text-display-lg text-charcoal">Asked <span className="accent text-gold-text">before</span> every first visit.</h2>

          <div className="mt-8 rounded-4xl bg-sage p-6 lg:p-7">
            <h3 className="font-serif text-[22px] font-semibold text-charcoal">We measure and fit in all seven Emirates</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {places.map((p) => (
                <li key={p}>
                  <a href={whatsappLink("Hello, I would like to book a free home visit. I am in " + p + ".")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center rounded-full bg-beige px-4 text-[14px] font-semibold text-charcoal transition-colors hover:bg-pine hover:text-beige">{p}</a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-charcoal/70">Tap your Emirate to ask about a visit. Dubai, Sharjah and Ajman are nearest the workshop and have the most visit slots.</p>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <ul className="flex flex-col gap-2.5">
            {faqs.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q} className={"rounded-3xl transition-colors duration-300 " + (on ? "bg-white/80 ring-1 ring-charcoal/[0.08]" : "bg-beige-light")}>
                  <h3 className="font-dm tracking-normal">
                    <button type="button" aria-expanded={on} aria-controls={"faq-" + i} onClick={() => setOpen(on ? null : i)} className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-semibold text-charcoal lg:px-6 lg:text-[18px]">
                      {f.q}
                      <span aria-hidden="true" className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 " + (on ? "rotate-45 bg-gold text-ink" : "bg-charcoal/[0.07] text-charcoal")}>
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div id={"faq-" + i} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }} className="overflow-hidden">
                        <p className="px-5 pb-5 text-[16px] leading-relaxed text-taupe lg:px-6 lg:pb-6">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
          <a href={whatsappLink("Hello, I have a question about made-to-measure furniture: ")} target="_blank" rel="noopener noreferrer" className="btn-line mt-6">
            <WhatsAppIcon className="h-5 w-5 text-[#128C4B]" /> Ask something else
          </a>
        </div>
      </div>
    </section>
  );
}
