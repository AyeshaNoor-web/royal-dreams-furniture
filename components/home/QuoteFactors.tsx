"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal, { EASE } from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getCategory } from "@/lib/gallery";
import { quoteFactors } from "@/lib/quote";
import { whatsappLink } from "@/lib/site";

/** Sets expectations before the visitor asks "how much": what moves the price, what we measure, what to send. */
export default function QuoteFactors() {
  const [slug, setSlug] = useState(quoteFactors[0].slug);
  const reduce = useReducedMotion();
  const f = quoteFactors.find((x) => x.slug === slug) ?? quoteFactors[0];
  const c = getCategory(f.slug)!;
  const ask = whatsappLink("Hello, I would like a quotation for a made-to-measure " + c.title.toLowerCase() + ". I can send photos and sizes.");

  return (
    <section className="border-y border-border bg-beige-light py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-10 max-w-2xl">
          <h2 className="font-serif text-display-md text-charcoal">What shapes your quotation</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-taupe">
            Every piece is priced on its own measurements and finishes, so there is no price list. Choose a collection to see what changes the price and what to send us for a first estimate.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Collection picker: a scrolling row on phones, a list on desktop */}
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {quoteFactors.map((q) => {
              const on = q.slug === slug;
              const title = getCategory(q.slug)!.title;
              return (
                <button
                  key={q.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSlug(q.slug)}
                  className={
                    "relative shrink-0 rounded-full px-4 py-2 text-left text-[15px] transition-colors duration-300 lg:w-full lg:rounded-none lg:border-b lg:border-border lg:px-0 lg:py-3.5 " +
                    (on ? "bg-charcoal text-beige-light lg:bg-transparent lg:text-charcoal" : "text-taupe hover:text-charcoal")
                  }
                >
                  {on && <motion.span layoutId="quote-marker" transition={{ duration: 0.4, ease: EASE }} className="absolute -left-4 top-0 hidden h-full w-[2px] bg-gold-dark lg:block" aria-hidden="true" />}
                  {title}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={f.slug}
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="border border-border bg-beige p-6 sm:p-8"
              >
                <h3 className="font-serif text-2xl text-charcoal lg:text-3xl">{c.title}</h3>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[14px] text-taupe">Price depends on</p>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {f.depends.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-[15px] text-charcoal">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div>
                      <p className="text-[14px] text-taupe">What we measure on the visit</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-charcoal">{f.measure}</p>
                    </div>
                    <div>
                      <p className="text-[14px] text-taupe">For a first estimate, send</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-charcoal">{f.send}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[13px] text-taupe">The exact quotation follows the site measurement and your finish choices.</p>
                  <a href={ask} target="_blank" rel="noopener noreferrer" className="btn-dark shrink-0">
                    <WhatsAppIcon className="h-[18px] w-[18px]" /> Ask for a quotation
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
