import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { photo } from "@/lib/photo";
import { SITE } from "@/lib/site";

const samples = ["Walnut veneer", "Oak veneer", "Lacquer", "Marble", "Stone", "Boucle", "Velvet", "Leather", "Tinted glass"];

/** The reasons to trust us, as a bento: each box answers one worry a buyer has before the first message. */
export default function WhyUs() {
  const a = photo("fitted-wardrobes", 1);
  const b = photo("beds", 3);
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow mb-4">Why people choose us</p>
          <h2 className="max-w-3xl font-serif text-display-lg text-charcoal">One team, from the tape measure to the <span className="accent text-gold-text">last hinge.</span></h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6 lg:mt-12 lg:gap-5">
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-4xl bg-beige-dark md:col-span-3 md:row-span-2 lg:min-h-[520px]">
            <Image src={a.src} alt={a.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-6 pt-24 text-beige lg:p-8">
              <h3 className="font-serif text-[26px] font-semibold lg:text-[34px]">Made in our own workshop</h3>
              <p className="mt-2 max-w-md text-[15px] text-beige/85">Everything is built in our workshop in Dubai. The people who measure your room also design the piece, build it and fit it. Nothing is passed to a subcontractor.</p>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="relative overflow-hidden rounded-4xl bg-gold p-6 text-ink md:col-span-3 lg:p-8">
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-2 hidden select-none font-serif text-[190px] font-bold leading-none tracking-tighter text-ink/[0.09] lg:block">3D</span>
            <h3 className="font-serif text-[26px] font-semibold lg:text-[32px]">You see it in 3D first</h3>
            <p className="mt-2 max-w-md text-[15px] text-ink/80">Your piece is drawn in your own room before anything is cut. Change the size, the finish, the lighting or the layout as often as you like.</p>
          </Reveal>

          <Reveal delay={0.1} className="rounded-4xl bg-sage p-6 md:col-span-3 lg:col-span-2 lg:p-7">
            <h3 className="font-serif text-[22px] font-semibold text-charcoal lg:text-[24px]">The price is fixed before we build</h3>
            <p className="mt-2 text-[15px] text-charcoal/75">You approve the design and the quotation together. It is the maker&apos;s own price, with no middleman in between.</p>
          </Reveal>

          <Reveal delay={0.14} className="relative hidden min-h-[200px] overflow-hidden rounded-4xl bg-beige-dark lg:col-span-1 lg:block">
            <Image src={b.src} alt={b.alt} fill sizes="16vw" className="object-cover" />
          </Reveal>

          <Reveal delay={0.08} className="rounded-4xl bg-white/70 p-6 ring-1 ring-charcoal/[0.07] md:col-span-3 lg:col-span-4 lg:p-8">
            <h3 className="font-serif text-[22px] font-semibold text-charcoal lg:text-[26px]">Samples come to your home</h3>
            <p className="mt-2 max-w-lg text-[15px] text-taupe">Judge the fabric, the veneer and the stone in your own light, next to your own floor.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {samples.map((s) => <li key={s} className="rounded-full bg-beige-light px-3.5 py-1.5 text-[13px] font-medium text-charcoal">{s}</li>)}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="pine-stage on-dark rounded-4xl p-6 text-beige md:col-span-3 lg:col-span-2 lg:p-8">
            <h3 className="font-serif text-[22px] font-semibold lg:text-[26px]">Come and see us</h3>
            <p className="mt-2 text-[15px] text-beige/80">Our showroom is in {SITE.showroom.display}. Visits are by appointment, so someone is there for you.</p>
            <a href={SITE.showroom.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">Open in Google Maps <span aria-hidden="true">&rarr;</span></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
