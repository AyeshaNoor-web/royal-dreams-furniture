import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import ProductCard from "@/components/site/ProductCard";
import ProductGallery, { type Media } from "@/components/site/ProductGallery";
import SectionHead from "@/components/site/SectionHead";
import { ReadyBand } from "@/components/site/Sections";
import { toCard } from "@/lib/cards";
import { aed, factorsOf, priceOf } from "@/lib/pricing";
import { getProduct, mediaLabel, products, productsOf } from "@/lib/products";
import { quoteHref } from "@/lib/quote-link";
import { SITE, whatsappLink } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string; product: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug, product: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, product } = await params;
  const p = getProduct(slug, product);
  if (!p) return {};
  return {
    title: p.title + " | " + p.category.title,
    description: p.line + " Made to measure by " + SITE.name + " and fitted across the UAE.",
    alternates: { canonical: p.href },
    openGraph: { images: [{ url: p.cover.src, alt: p.cover.alt }] },
  };
}

const steps = [
  ["Send this design", "Tell us you like it. We reply on WhatsApp within a working day."],
  ["Free visit", "We measure the room and bring fabric and finish samples."],
  ["3D design and quote", "You see it in your room and get a written quotation."],
  ["Built and fitted", "Made in our workshop, installed by our own team."],
];

export default async function ProductPage({ params }: Props) {
  const { slug, product } = await params;
  const p = getProduct(slug, product);
  if (!p) notFound();

  const cat = p.category;
  const price = priceOf(cat.slug);
  const factors = factorsOf(cat.slug);
  const list = productsOf(cat.slug);
  const at = list.findIndex((x) => x.id === p.id);
  const prev = list[(at - 1 + list.length) % list.length];
  const next = list[(at + 1) % list.length];
  const more = [...list.slice(at + 1), ...list.slice(0, at)].slice(0, 4);

  const media: Media[] = [
    ...p.photos.map((i): Media => ({ kind: "photo", src: i.src, thumb: i.src, w: i.w, h: i.h, alt: i.alt })),
    ...p.videos.map((v): Media => ({ kind: "video", src: v.src, thumb: v.poster, w: v.w, h: v.h, alt: v.alt })),
  ];
  const ask = whatsappLink("Hello, I like this design on your website: " + p.title + " (" + SITE.url + p.href + "). Could you make something like it for my room?");

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Products", item: SITE.url + "/collections" },
      { "@type": "ListItem", position: 3, name: cat.title, item: SITE.url + "/collections/" + cat.slug },
      { "@type": "ListItem", position: 4, name: p.title, item: SITE.url + p.href },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="pb-section-sm pt-6 lg:pt-8">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Products", href: "/collections" }, { label: cat.title, href: "/collections/" + cat.slug }, { label: p.title }]} />

          <div className="mt-6 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <ProductGallery media={media} title={p.title} />
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Link href={"/collections/" + cat.slug} className="font-dm text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark hover:underline">{cat.title}</Link>
                <h1 className="mt-3 font-accent text-[2.5rem] font-medium leading-[1.02] text-charcoal sm:text-5xl">{p.title}</h1>
                <p className="mt-4 font-dm text-[16px] leading-relaxed text-taupe">{p.line}</p>
                <p className="mt-2 font-dm text-[13px] text-taupe">{mediaLabel(p)} of this design</p>

                <div className="mt-6 rounded-2xl bg-sand p-5">
                  {price ? (
                    <>
                      <p className="font-dm text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">Starting price</p>
                      <p className="mt-1 font-accent text-3xl font-medium text-charcoal">From {aed(price.from)} <span className="text-xl text-taupe">/ {price.unit}</span></p>
                      <ul className="mt-3 flex flex-col gap-1.5 border-t border-charcoal/10 pt-3">
                        {price.rates.map((r) => (
                          <li key={r.id} className="flex items-baseline justify-between gap-4 font-dm text-[14px]">
                            <span className="text-charcoal">{r.label}</span>
                            <span className="shrink-0 font-semibold text-charcoal">{aed(r.rate)} <span className="font-normal text-taupe">/ {price.unit}</span></span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 font-dm text-[12.5px] leading-relaxed text-taupe">Measured as the width of the wall times its height. <Link href={"/collections/" + cat.slug + "#price"} className="font-semibold text-charcoal underline underline-offset-4">Work out your budget</Link></p>
                    </>
                  ) : (
                    <>
                      <p className="font-dm text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">Pricing</p>
                      <p className="mt-1 font-accent text-[1.75rem] font-medium leading-tight text-charcoal">Quoted after a free visit</p>
                      <p className="mt-2 font-dm text-[13.5px] leading-relaxed text-taupe">Made to your sizes, so the price follows the measurement. For a first rough figure, send: {factors ? factors.send.charAt(0).toLowerCase() + factors.send.slice(1) : "a photo of the room and rough sizes."}</p>
                    </>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  <Link href={quoteHref({ item: cat.slug, design: p.id })} className="btn-dark w-full">Get a quote for this design <span aria-hidden="true">&#8599;</span></Link>
                  <a href={ask} target="_blank" rel="noopener noreferrer" className="btn-wa w-full"><WhatsAppIcon className="h-4 w-4" /> Ask about it on WhatsApp</a>
                </div>

                {factors && (
                  <div className="mt-7 border-t border-border pt-6">
                    <h2 className="font-dm text-sm font-semibold text-charcoal">Made to order: you choose</h2>
                    <ul className="mt-3 grid grid-cols-1 gap-2">
                      {factors.depends.map((d) => (
                        <li key={d} className="flex gap-2.5 font-dm text-[14.5px] leading-snug text-charcoal">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-dm text-[13px] leading-relaxed text-taupe">The photos show a piece we made for another home. Yours is drawn to your room, in the size, colour and finish you pick.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-section-sm" aria-labelledby="order-h">
        <div className="wrap">
          <h2 id="order-h" className="h-md">How to order this design</h2>
          <ol className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], n) => (
              <li key={t} className="rounded-2xl border border-border bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal font-dm text-xs font-bold text-white">{n + 1}</span>
                <h3 className="mt-3 font-accent text-[1.35rem] font-medium leading-tight text-charcoal">{t}</h3>
                <p className="mt-1.5 font-dm text-[14px] leading-relaxed text-taupe">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {more.length > 0 && (
        <section className="py-section-sm" aria-labelledby="more-h">
          <div className="wrap">
            <SectionHead align="left" title={<span id="more-h">More {cat.title.toLowerCase()}</span>} action={<Link href={"/collections/" + cat.slug} className="btn-line">All {list.length} designs <span aria-hidden="true">&#8599;</span></Link>} />
            <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 md:grid-cols-4 lg:gap-x-6">
              {more.map((m) => (
                <li key={m.id}><ProductCard item={toCard(m, "price")} /></li>
              ))}
            </ul>
            {list.length > 1 && (
              <nav aria-label="Previous and next design" className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
                <Link href={prev.href} className="text-link">&larr; {prev.title}</Link>
                <Link href={next.href} className="text-link text-right">{next.title} &rarr;</Link>
              </nav>
            )}
          </div>
        </section>
      )}

      <ReadyBand item={cat.slug} />
    </>
  );
}
