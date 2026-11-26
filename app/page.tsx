import Link from "next/link";
import Reviews from "@/components/home/Reviews";
import CategoryCard from "@/components/site/CategoryCard";
import Estimator from "@/components/site/Estimator";
import FaqBlock from "@/components/site/FaqBlock";
import HeroSlider, { type HeroSlide } from "@/components/site/HeroSlider";
import ProductCard from "@/components/site/ProductCard";
import RoomTabs, { type Room } from "@/components/site/RoomTabs";
import SectionHead from "@/components/site/SectionHead";
import { Process, ReadyBand, WhereWeWork, WhyUs } from "@/components/site/Sections";
import { categoryCards, toCard } from "@/lib/cards";
import { estimatorItems } from "@/lib/estimator-items";
import { faqs } from "@/lib/faq";
import { categoriesInGroup, groups } from "@/lib/gallery";
import { getProduct } from "@/lib/products";
import { priceLabel, priceOf } from "@/lib/pricing";

const slide = (slug: string, id: string, lead: string, text: string): HeroSlide => {
  const p = getProduct(slug, id)!;
  return { src: p.cover.src, alt: p.cover.alt, lead, text, href: p.href };
};

const slides: HeroSlide[] = [
  slide("sofas", "cream-u-shaped-sectional", "Sofas and majlis.", "Made to the length of your wall, in the fabric and seat depth you choose."),
  slide("walk-in-closets", "oak-closet-with-island", "Walk-in closets.", "Glass doors, lit interiors and an island, planned around how you dress."),
  slide("tv-units", "walnut-and-marble-media-wall", "Media walls.", "Sized to your screen, with hidden cables and soft backlighting."),
];

// A short, mixed row of designs so the home page shows the range without showing everything.
const picks = [
  ["beds", "walnut-and-marble-headboard-wall"],
  ["tv-units", "backlit-media-wall-with-slats"],
  ["fitted-wardrobes", "glass-display-wardrobe"],
  ["dining-tables", "oval-table-with-boucle-chairs"],
  ["sofas", "beige-velvet-corner-sofa"],
  ["walk-in-closets", "black-framed-glass-closet"],
  ["curtains", "grey-wave-curtains"],
  ["wall-paneling", "greige-stairwell-paneling"],
].map(([s, id]) => toCard(getProduct(s, id)!));

const rooms: Room[] = groups.map((g) => ({
  slug: g.slug,
  title: g.title,
  blurb: g.blurb,
  tiles: categoriesInGroup(g.slug).map((c) => ({ href: "/collections/" + c.slug, title: c.title, price: priceLabel(c.slug), priced: !!priceOf(c.slug), src: c.cover.src, alt: c.cover.alt })),
}));

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function HomePage() {
  const cats = categoryCards();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <HeroSlider slides={slides} />

      <section className="py-section-sm lg:py-section" aria-labelledby="make-h">
        <div className="wrap">
          <SectionHead eyebrow="What we make" title={<span id="make-h">Everything for the room, under one roof</span>} lede="Choose a collection to see its designs. Each one opens to show a single photo per design, so you can compare them at a glance." />
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
            {cats.slice(0, 8).map((c, n) => (
              <li key={c.slug}><CategoryCard item={c} priority={n < 4} /></li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {cats.slice(8).map((c) => (
              <Link key={c.slug} href={c.href} className="text-link">{c.title}</Link>
            ))}
            <Link href="/collections" className="btn-line">View all products <span aria-hidden="true">&#8599;</span></Link>
          </div>
        </div>
      </section>

      <section className="bg-sand py-section-sm" aria-labelledby="rooms-h">
        <div className="wrap">
          <h2 id="rooms-h" className="font-accent text-[2rem] font-medium leading-tight text-charcoal sm:text-[2.5rem]">Plan by room</h2>
          <p className="lede mb-6 mt-2">Choose a room to see what we usually make for it.</p>
          <RoomTabs rooms={rooms} />
        </div>
      </section>

      <section className="py-section-sm lg:py-section" aria-labelledby="designs-h">
        <div className="wrap">
          <SectionHead align="left" eyebrow="Recent designs" title={<span id="designs-h">Open a design to see it in detail</span>} lede="One photo here. More photos, videos and a quote button on its own page." action={<Link href="/gallery" className="btn-line">See all our work <span aria-hidden="true">&#8599;</span></Link>} />
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 md:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
            {picks.map((p) => (
              <li key={p.href}><ProductCard item={p} /></li>
            ))}
          </ul>
        </div>
      </section>

      <WhyUs />

      <section id="estimate" className="scroll-mt-24 bg-mist py-section-sm lg:py-section" aria-labelledby="est-h">
        <div className="wrap">
          <SectionHead eyebrow="Price guide" title={<span id="est-h">Estimate your budget</span>} lede="Choose what you need. Where we have a published rate you get a starting figure straight away; for everything else you see exactly what the price depends on." />
          <div className="mt-10"><Estimator items={estimatorItems} initial="fitted-wardrobes" /></div>
          <p className="mt-5 text-center font-dm text-sm text-taupe">See every published rate on the <Link href="/pricing" className="font-semibold text-charcoal underline underline-offset-4">pricing page</Link>.</p>
        </div>
      </section>

      <Process />
      <Reviews />
      <WhereWeWork />
      <FaqBlock faqs={faqs} />
      <ReadyBand />
    </>
  );
}
