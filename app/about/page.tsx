import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import Process from "@/components/home/Process";
import CtaBand from "@/components/home/CtaBand";
import { categories } from "@/lib/gallery";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Modern Furniture Collection is a Dubai workshop and showroom creating made-to-measure wall paneling, walk-in closets, fitted wardrobes and media walls for homes across the UAE.",
};

const values = [
  { title: "Made to measure", desc: "Every panel, door and shelf is produced for the room it will live in, so storage runs wall to wall and floor to ceiling with nothing wasted." },
  { title: "Lighting designed in", desc: "LED strips, illuminated niches and glass-front doors are part of the drawings from day one, not added once the furniture is built." },
  { title: "Finishes of your choosing", desc: "Walnut and oak veneers, painted lacquer in any shade, fluted panels, bronze or clear glass. Samples are reviewed in your home, under your own light." },
  { title: "One team throughout", desc: "The people who measure your room design it, build it in our workshop and install it. There are no subcontractors in between." },
];

export default function AboutPage() {
  const shots = [categories[0].images[1], categories[1].images[3], categories[3].images[1]];
  return (
    <>
      <PageHeader
        title="Furniture made for the room it lives in."
        intro={SITE.name + " is a Dubai workshop and showroom specialising in made-to-measure interiors. We design, build and install wall paneling, walk-in closets, fitted wardrobes, media walls and dressing tables for villas and apartments across the UAE."}
      />

      <section className="pb-section">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-3 px-6 lg:gap-6 lg:px-10">
          {shots.map((s) => (
            <div key={s.src} className="relative aspect-[3/4] bg-beige-dark">
              <Image src={s.src} alt={s.alt} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-beige-light py-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-display-md">What sets our work apart</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {values.map((v) => (
              <div key={v.title} className="border-t border-border pt-4">
                <h3 className="font-serif text-2xl">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-taupe">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section className="py-section-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-6 lg:px-10">
          <div>
            <h2 className="max-w-xl font-serif text-display-md">See our latest installations on Instagram</h2>
          </div>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-line">{SITE.instagramHandle}</a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
