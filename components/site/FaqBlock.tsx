"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import type { Faq } from "@/lib/faq";
import { WHATSAPP_LINK } from "@/lib/site";

/** Questions on the right as soft cards; the heading and an "ask us" card on the left. */
export default function FaqBlock({ faqs, title = "Frequently asked questions", lede = "Straight answers to what we are asked most before a first visit." }: { faqs: Faq[]; title?: string; lede?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-section-sm lg:py-section" aria-labelledby="faq-h">
      <div className="wrap grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5">Got questions?</p>
          <h2 id="faq-h" className="font-accent text-[2.25rem] font-medium leading-[1.05] text-charcoal sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-md font-dm text-[15px] leading-relaxed text-charcoal">{lede}</p>
          <div className="mt-7 max-w-md rounded-2xl border border-border bg-white p-6">
            <p className="font-accent text-xl font-medium text-charcoal">Something else?</p>
            <p className="mt-1.5 font-dm text-sm leading-relaxed text-taupe">Ask on WhatsApp, or use the chat button in the corner of the page. We reply within a working day.</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-line mt-4"><WhatsAppIcon className="h-4 w-4 text-[#128C4B]" /> Ask a question</a>
          </div>
        </div>
        <ul className="flex flex-col gap-3 lg:col-span-7">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className="rounded-2xl bg-mist">
                <h3>
                  <button type="button" aria-expanded={on} aria-controls={"faq-" + i} onClick={() => setOpen(on ? null : i)} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-dm text-[16px] font-medium leading-snug text-charcoal sm:px-7 sm:text-[17px]">
                    {f.q}
                    <span className={"flex h-7 w-7 shrink-0 items-center justify-center text-xl text-charcoal transition-transform duration-200 " + (on ? "rotate-45" : "")} aria-hidden="true">+</span>
                  </button>
                </h3>
                <div id={"faq-" + i} hidden={!on} className="px-5 pb-6 sm:px-7">
                  <p className="max-w-2xl font-dm text-[14.5px] leading-relaxed text-taupe">{f.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
