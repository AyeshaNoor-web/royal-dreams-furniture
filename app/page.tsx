import ContactBand from "@/components/site/ContactBand";
import Estimator from "@/components/site/Estimator";
import FaqBlock from "@/components/site/FaqBlock";
import HeroPhoto, { type HeroShot } from "@/components/site/HeroPhoto";
import { BrowseByCategory, DesignRow, HappyCustomers, HaveQuestions, LatestProject, ShopByRoom, ShowroomBand, StartOptions, WhyBand, type RoomTile } from "@/components/site/HomeSections";
import SectionHead from "@/components/site/SectionHead";
import { Process } from "@/components/site/Sections";
import { categoryCards, toCard } from "@/lib/cards";
import { estimatorItems } from "@/lib/estimator-items";
import { faqs } from "@/lib/faq";
import { categoriesInGroup, groups } from "@/lib/gallery";
import { getProduct } from "@/lib/products";
import { quoteHref } from "@/lib/quote-link";

// Hero photos are the client's sharpest originals (up to 1600px tall), kept at full size in public/images/hero.
const shots: HeroShot[] = [
  { src: "/images/hero/hero-01.jpg", alt: "White boucle bed in a panelled bedroom", label: "Beds", href: "/collections/beds" },
  { src: "/images/hero/hero-02.jpg", alt: "Modular sofa with a curved armchair and a city view", label: "Sofas & Majlis", href: "/collections/sofas", pos: "md:object-[center_70%]" },
  { src: "/images/hero/hero-03.jpg", alt: "Floating display shelves with warm lighting over base cabinets", label: "Display Shelving", href: "/collections/display-shelving" },
  { src: "/images/hero/hero-04.jpg", alt: "Backlit TV panel beside a lit oak shelf tower", label: "TV Units & Media Walls", href: "/collections/tv-units", pos: "md:object-[center_60%]" },
];

const latest = getProduct("tv-units", "fireplace-media-wall")!;

// A short, mixed row of designs so the home page shows the range without showing everything.
const picks = [
  ["beds", "walnut-and-marble-headboard-wall"],
  ["tv-units", "fireplace-media-wall"],
  ["fitted-wardrobes", "glass-display-wardrobe"],
  ["dining-tables", "oval-table-with-boucle-chairs"],
  ["sofas", "beige-velvet-corner-sofa"],
  ["walk-in-closets", "black-framed-glass-closet"],
  ["curtains", "grey-wave-curtains"],
  ["tv-units", "white-media-wall-with-side-shelves"],
  ["wall-paneling", "greige-stairwell-paneling"],
  ["dressing-tables", "backlit-mirror-vanity"],
].map(([s, id]) => toCard(getProduct(s, id)!));

const roomPhoto: Record<string, [string, string]> = {
  living: ["sofas", "grey-tufted-l-shape"],
  bedroom: ["beds", "channel-headboard-with-slat-panels"],
  dining: ["dining-tables", "oval-table-with-boucle-chairs"],
  windows: ["curtains", "beige-curtains-with-sheers"],
};

const rooms: RoomTile[] = groups.map((g) => {
  const p = getProduct(...roomPhoto[g.slug])!;
  const cats = categoriesInGroup(g.slug);
  return { href: "/collections#" + g.slug, title: g.title, line: cats.map((c) => c.title).slice(0, 3).join(", ") + (cats.length > 3 ? " and more" : ""), src: p.cover.src, alt: p.cover.alt };
});

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <HeroPhoto shots={shots} />
      <WhyBand />
      <BrowseByCategory items={categoryCards()} />
      <ShopByRoom rooms={rooms} />
      <ShowroomBand />
      <DesignRow items={picks} />
      <LatestProject title={latest.title} line={latest.line} href={latest.href} a={latest.photos[0]} b={latest.photos[3] ?? latest.cover} quoteHref={quoteHref({ item: latest.slug, design: latest.id })} />

      <section id="estimate" className="scroll-mt-24 py-section-sm lg:py-section" aria-labelledby="est-h">
        <div className="wrap">
          <SectionHead title={<span id="est-h">Estimate your budget</span>} lede="Choose what you need. Where we have a published rate you get a starting figure straight away; for everything else you see exactly what the price depends on." />
          <div className="mt-10"><Estimator items={estimatorItems} initial="fitted-wardrobes" /></div>
          <p className="mt-5 text-center font-dm text-base text-taupe">Your exact quotation follows a free home visit.</p>
        </div>
      </section>

      <Process />
      <HappyCustomers />
      <StartOptions />
      <HaveQuestions />
      <FaqBlock faqs={faqs} />
      <ContactBand />
    </>
  );
}
