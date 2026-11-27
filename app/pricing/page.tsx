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
import { factorsOf, priceOf } from "@/lib/pricing";
import { quoteHref } from "@/lib/quote-link";
import { WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Budget calculator",
  description: "Starting prices for fitted wardrobes and walk-in closets per square metre, and what the price of every other made-to-measure piece depends on. Free home visit and written quotation across the UAE.",
  alternates: { canonical: "/pricing" },
};

const priceFaqs = faqs.filter((f) => /price|free|visit|changes/i.test(f.q));

export default function PricingPage() {
  const unpriced = categories.filter((c) => !priceOf(c.slug));
  return (
    <>
      <PageHeader title="Calculate your budget" intro="Enter the size of your wardrobe or closet wall and choose the doors to see a starting budget. Everything else we make is measured for free and quoted in writing." crumbs={[{ label: "Budget calculator" }]}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#estimate" className="btn-dark">Open the calculator</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-line"><WhatsAppIcon className="h-4 w-4 text-[#128C4B]" /> Discuss on WhatsApp</a>
        </div>
      </PageHeader>

      <section id="estimate" className="scroll-mt-24 py-section-sm lg:py-section" aria-labelledby="est-h">
        <div className="wrap">
          <SectionHead title={<span id="est-h">Budget calculator</span>} lede="Choose what you need. For wardrobes and walk-in closets, set the wall size and the doors." />
          <div className="mt-10"><Estimator items={estimatorItems} /></div>
        </div>
      </section>

      <section className="py-section-sm lg:py-section" aria-labelledby="all-h">
        <div className="wrap">
          <SectionHead align="left" eyebrow="Everything else" title={<span id="all-h">Quoted after a free visit</span>} lede="These pieces are made to your sizes, fabrics and finishes, so the figure follows the measurement. Send a photo and rough sizes for a first number within a working day." />
          <ul className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {unpriced.map((c) => {
              const f = factorsOf(c.slug);
              return (
                <li key={c.slug} className="flex flex-col rounded-lg border border-border bg-white p-5">
                  <div className="flex items-center gap-4">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-mist"><Image src={c.cover.src} alt="" fill sizes="64px" className="object-cover" /></span>
                    <div>
                      <h3 className="font-serif text-xl font-medium leading-tight text-charcoal">{c.title}</h3>
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
