import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import Steps from "@/components/home/Steps";
import Planner from "@/components/plan/Planner";
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
        title="A Dubai workshop that builds around your home."
        intro={SITE.name + " designs and makes furniture to order for villas and apartments across the UAE. Every sofa, bed, wardrobe and media wall begins with a visit to your home and a 3D design, and ends with our own team fitting it in place."}
      />

      <section className="pb-section-sm pt-8 lg:pt-12">
        <div className="mx-auto grid max-w-5xl grid-cols-3 items-end gap-3 px-5 sm:px-6 lg:gap-6 lg:px-10">
          {shots.map((s) => (
            <div key={s.src} className="relative aspect-[3/5] overflow-hidden arch bg-beige-dark even:mb-8 lg:even:mb-14">
              <Image src={s.src} alt={s.alt} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige-light py-section-sm lg:py-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-display-md">What sets our work apart</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {values.map((v) => (
              <div key={v.title} className="rounded-4xl bg-beige p-6">
                <h3 className="font-serif text-2xl">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-taupe">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-section-sm"><Steps /></div>

      <section className="pb-section-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-6 lg:px-10">
          <div>
            <h2 className="ruled-heading max-w-xl font-serif text-display-md">Follow our latest installations</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {SITE.instagramAccounts.map((ig) => (
              <a key={ig.handle} href={ig.url} target="_blank" rel="noopener noreferrer" className="btn-line">{ig.handle}</a>
            ))}
          </div>
        </div>
      </section>

      <Planner />
    </>
  );
}
