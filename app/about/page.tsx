import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import { Process, ReadyBand } from "@/components/site/Sections";
import { pick } from "@/lib/gallery";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Modern Furniture Collection is a Dubai workshop, with a showroom in Al Butina, Sharjah, creating made-to-measure sofas, beds, dining tables, curtains, wardrobes and media walls for homes across the UAE.",
};

const values = [
  { title: "Made to your measurements", desc: "We measure your rooms before anything is drawn, so wardrobes run floor to ceiling, sofas fit the wall they were made for and nothing is forced into place." },
  { title: "Designed in 3D first", desc: "You see the furniture in your own room before production begins, and you approve every dimension, finish and fabric." },
  { title: "Finishes you choose", desc: "Walnut and oak veneers, lacquer in any colour, marble and stone tops, boucle, velvet and leather. Samples come to your home so you can judge them in your own light." },
  { title: "One team, start to finish", desc: "The people who measure your room also design it, build it in our workshop and install it. No subcontractors, no hand-offs." },
];

export default function AboutPage() {
  const shots = [pick("sofas", 0), pick("beds", 0), pick("walk-in-closets", 3)];
  return (
    <>
      <PageHeader
        eyebrow="About us"
        crumbs={[{ label: "About" }]}
        title="A Dubai workshop that builds around your home."
        intro={SITE.name + " designs and makes furniture to order for villas and apartments across the UAE. Every sofa, bed, wardrobe and media wall begins with a visit to your home and a 3D design, and ends with our own team fitting it in place."}
      />

      <section className="py-section-sm">
        <div className="wrap grid grid-cols-3 gap-3 lg:gap-6">
          {shots.map((s) => (
            <div key={s.src} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-mist">
              <Image src={s.src} alt={s.alt} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-section-sm lg:py-section">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">How we work</p>
            <h2 className="h-lg">What sets our work apart</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {values.map((v) => (
              <div key={v.title} className="border-t border-border pt-4">
                <h3 className="font-accent text-2xl font-medium">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-taupe">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section className="py-section-sm">
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="h-md max-w-xl">Follow our latest installations</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {SITE.instagramAccounts.map((ig) => (
              <a key={ig.handle} href={ig.url} target="_blank" rel="noopener noreferrer" className="btn-line">{ig.handle}</a>
            ))}
          </div>
        </div>
      </section>

      <ReadyBand />
    </>
  );
}
