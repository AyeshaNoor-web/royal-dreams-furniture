import type { Metadata } from "next";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import QuoteWizard, { type DesignRef } from "@/components/site/QuoteWizard";
import { products } from "@/lib/products";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a free quote",
  description: "Three short steps: what you need, where the room is, and who to reply to. Your brief opens in WhatsApp and we answer within a working day. Home visit and quotation are free.",
  alternates: { canonical: "/quote" },
};

const designs: DesignRef[] = products.map((p) => ({ slug: p.slug, id: p.id, title: p.title, category: p.category.title, src: p.cover.src, href: p.href }));

export default function QuotePage() {
  return (
    <section className="bg-sand pb-section-sm pt-6 lg:pb-section lg:pt-8">
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Get a quote" }]} />
        <div className="mb-9 mt-8 max-w-2xl">
          <h1 className="h-xl">Three short steps to your quote</h1>
          <p className="lede mt-4">It takes about a minute. Prefer to talk? <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-charcoal underline underline-offset-4">WhatsApp {SITE.phones[0].display}</a>.</p>
        </div>
        <QuoteWizard designs={designs} />
      </div>
    </section>
  );
}
