import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import CategoryCard from "@/components/site/CategoryCard";
import Estimator from "@/components/site/Estimator";
import ProductGrid from "@/components/site/ProductGrid";
import SectionHead from "@/components/site/SectionHead";
import { Process, ReadyBand } from "@/components/site/Sections";
import { toCard, toCategoryCard } from "@/lib/cards";
import { estimatorItems } from "@/lib/estimator-items";
import { categories, categoriesInGroup, getCategory, groups } from "@/lib/gallery";
import { factorsOf, priceOf } from "@/lib/pricing";
import { productsOf } from "@/lib/products";
import { quoteHref } from "@/lib/quote-link";
import { whatsappLink } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return { title: cat.title, description: cat.description, alternates: { canonical: "/collections/" + cat.slug }, openGraph: { images: [{ url: cat.cover.src, alt: cat.cover.alt }] } };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const group = groups.find((g) => g.slug === cat.group)!;
  const list = productsOf(cat.slug);
  const price = priceOf(cat.slug);
  const factors = factorsOf(cat.slug);
  const others = [...categoriesInGroup(cat.group).filter((c) => c.slug !== cat.slug), ...categories.filter((c) => c.group !== cat.group)].slice(0, 4);
  const types = (cat.types ?? []).filter((t) => list.some((p) => p.type === t.slug)).map((t) => ({ id: t.slug, label: t.title }));
  const ask = whatsappLink("Hello, I am interested in your " + cat.title.toLowerCase() + ". Could we discuss my room?");

  return (
    <>
      <PageHeader eyebrow={group.title} title={cat.title} intro={cat.description} crumbs={[{ label: "Products", href: "/collections" }, { label: cat.title }]}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={quoteHref({ item: cat.slug })} className="btn-dark">Get a free quote</Link>
          <a href={ask} target="_blank" rel="noopener noreferrer" className="btn-line"><WhatsAppIcon className="h-4 w-4 text-[#128C4B]" /> Ask on WhatsApp</a>
          {price && <a href="#price" className="btn-line">Calculate a budget</a>}
        </div>
      </PageHeader>

      <section className="py-section-sm" aria-labelledby="designs-h">
        <div className="wrap">
          <div className="mb-7 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="designs-h" className="h-md">Designs</h2>
            <p className="font-dm text-base text-taupe">Open a design to see it in detail.</p>
          </div>
          <ProductGrid items={list.map((p) => toCard(p, "none"))} filters={types} allLabel={"All " + cat.title.toLowerCase()} />
        </div>
      </section>

      <section id="price" className="scroll-mt-24 bg-mist py-section-sm lg:py-section" aria-labelledby="price-h">
        <div className="wrap">
          <SectionHead eyebrow="Price guide" title={<span id="price-h">{price ? "Calculate your budget" : "How " + cat.title.toLowerCase() + " are priced"}</span>} lede={price ? "Set the size of your wall and the door type. The exact quotation follows a free measurement." : "No shelf price, because nothing comes off a shelf. Here is what moves the figure and how to get one quickly."} />
          <div className="mx-auto mt-10 max-w-4xl">
            <Estimator items={estimatorItems.filter((i) => i.slug === cat.slug)} />
          </div>
          {factors && (
            <dl className="mx-auto mt-5 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-white p-6">
                <dt className="font-serif text-lg font-medium text-charcoal">What we measure on the visit</dt>
                <dd className="mt-2 font-dm text-[14.5px] leading-relaxed text-taupe">{factors.measure}</dd>
              </div>
              <div className="rounded-lg border border-border bg-white p-6">
                <dt className="font-serif text-lg font-medium text-charcoal">What to send for a first figure</dt>
                <dd className="mt-2 font-dm text-[14.5px] leading-relaxed text-taupe">{factors.send}</dd>
              </div>
            </dl>
          )}
        </div>
      </section>

      <Process />

      <section className="py-section-sm" aria-labelledby="more-h">
        <div className="wrap">
          <SectionHead align="left" title={<span id="more-h">Often ordered with {cat.title.toLowerCase()}</span>} action={<Link href="/collections" className="btn-line">All products</Link>} />
          <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {others.map((c) => (
              <li key={c.slug}><CategoryCard item={toCategoryCard(c)} /></li>
            ))}
          </ul>
        </div>
      </section>

      <ReadyBand item={cat.slug} />
    </>
  );
}
