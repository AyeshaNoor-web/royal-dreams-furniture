import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Estimator from "@/components/site/Estimator";
import FaqBlock from "@/components/site/FaqBlock";
import SectionHead from "@/components/site/SectionHead";
import { ReadyBand } from "@/components/site/Sections";
import { estimatorItems } from "@/lib/estimator-items";
import { faqs } from "@/lib/faq";
import { categories } from "@/lib/gallery";
import { aed, cabinetRates, factorsOf, priceOf } from "@/lib/pricing";
import { quoteHref } from "@/lib/quote-link";
import { WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Starting prices for fitted wardrobes and walk-in closets per square metre, and what the price of every other made-to-measure piece depends on. Free home visit and written quotation across the UAE.",
  alternates: { canonical: "/pricing" },
};

const priceFaqs = faqs.filter((f) => /price|free|visit|changes/i.test(f.q));

export default function PricingPage() {
  const priced = categories.filter((c) => priceOf(c.slug));
  const unpriced = categories.filter((c) => !priceOf(c.slug));
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Know what to budget before you ask" intro="Published starting rates where we have them, and a plain account of what moves the price everywhere else. Every project is measured for free and quoted in writing." crumbs={[{ label: "Pricing" }]}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#estimate" className="btn-dark">Estimate my budget <span aria-hidden="true">&darr;</span></a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-line"><WhatsAppIcon className="h-4 w-4 text-[#128C4B]" /> Discuss on WhatsApp</a>
        </div>
      </PageHeader>

      <section className="py-section-sm lg:py-section" aria-labelledby="rates-h">
        <div className="wrap">
          <SectionHead align="left" eyebrow="Published rates" title={<span id="rates-h">Wardrobes and walk-in closets</span>} lede="Priced per square metre of cabinet front: the width of the wall times its height. The door type sets the rate." />
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {cabinetRates.map((r, n) => (
              <div key={r.id} className={"flex flex-col rounded-3xl border p-7 " + (n === 0 ? "border-charcoal bg-charcoal text-white" : "border-border bg-white text-charcoal")}>
                <p className={"font-dm text-[11px] font-semibold uppercase tracking-[0.18em] " + (n === 0 ? "text-gold" : "text-taupe")}>{n === 0 ? "Starting from" : "Door option " + (n + 1)}</p>
                <p className="mt-3 font-accent text-5xl font-medium leading-none">{aed(r.rate)}</p>
                <p className={"mt-1.5 font-dm text-sm " + (n === 0 ? "text-white/70" : "text-taupe")}>per square metre of cabinet front</p>
                <h3 className="mt-6 font-accent text-2xl font-medium leading-tight">{r.label}</h3>
                <p className={"mt-1.5 flex-1 font-dm text-[14.5px] leading-relaxed " + (n === 0 ? "text-white/75" : "text-taupe")}>{r.blurb}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-sand p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="max-w-2xl font-dm text-[14px] leading-relaxed text-charcoal">These rates are a guide for the cabinets. Lighting, islands, drawers and accessories are quoted after the free measurement, and your written quotation is the price you pay.</p>
            <div className="flex shrink-0 flex-wrap gap-2.5">
              {priced.map((c) => (
                <Link key={c.slug} href={"/collections/" + c.slug} className="chip">{c.title} &rarr;</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="estimate" className="scroll-mt-24 bg-mist py-section-sm lg:py-section" aria-labelledby="est-h">
        <div className="wrap">
          <SectionHead eyebrow="Budget planner" title={<span id="est-h">Work out a starting budget</span>} lede="Choose what you need. Set the size where a rate is published, or see what the price depends on." />
          <div className="mt-10"><Estimator items={estimatorItems} /></div>
        </div>
      </section>

      <section className="py-section-sm lg:py-section" aria-labelledby="all-h">
        <div className="wrap">
          <SectionHead align="left" eyebrow="Everything else" title={<span id="all-h">Quoted after a free visit</span>} lede="These are made to your sizes, fabrics and finishes, so the figure follows the measurement. Send a photo and rough sizes for a first number within a working day." />
          <ul className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {unpriced.map((c) => {
              const f = factorsOf(c.slug);
              return (
                <li key={c.slug} className="flex flex-col rounded-2xl border border-border bg-white p-5">
                  <div className="flex items-center gap-4">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist"><Image src={c.cover.src} alt="" fill sizes="64px" className="object-cover" /></span>
                    <div>
                      <h3 className="font-accent text-2xl font-medium leading-tight text-charcoal">{c.title}</h3>
                      <p className="font-dm text-[13px] text-taupe">Quoted after a free visit</p>
                    </div>
                  </div>
                  <p className="mt-4 font-dm text-[13px] font-semibold text-charcoal">The price depends on</p>
                  <ul className="mt-2 flex flex-1 flex-col gap-1.5">
                    {(f?.depends ?? []).map((d) => (
                      <li key={d} className="flex gap-2.5 font-dm text-[14px] leading-snug text-taupe"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" aria-hidden="true" />{d}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <Link href={quoteHref({ item: c.slug })} className="text-link">Request a quote</Link>
                    <Link href={"/collections/" + c.slug} className="font-dm text-[13px] text-taupe underline-offset-4 hover:text-charcoal hover:underline">See designs &rarr;</Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FaqBlock faqs={priceFaqs.length ? priceFaqs : faqs} title="Questions about price" lede="What is free, what is not, and when you commit." />
      <ReadyBand />
    </>
  );
}
