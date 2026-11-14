import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { categories } from "@/lib/gallery";

/** Every collection at a glance. The first card runs wide so the eleven cards fill a four-column grid. */
export default function WhatWeMake() {
  return (
    <section className="bg-beige py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-10 flex items-end justify-between gap-6 lg:mb-12">
          <div>
            <h2 className="font-serif text-display-lg text-charcoal">What we make</h2>
            <p className="mt-3 max-w-lg text-[15px] text-taupe">Eleven collections, all made to measure in our Dubai workshop and fitted by our own team.</p>
          </div>
          <Link href="/collections" className="hidden text-link hover:text-gold-text sm:inline-block">View all collections</Link>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5" stagger={0.05}>
          {categories.map((c, i) => {
            const wide = i === 0;
            return (
              <StaggerItem key={c.slug} className={wide ? "col-span-2" : ""}>
                <Link href={"/collections/" + c.slug} className="group block h-full">
                  <div className={"relative overflow-hidden bg-beige-dark " + (wide ? "aspect-[2/1] sm:aspect-[16/10] lg:aspect-[2/1]" : "aspect-square")}>
                    <Image
                      src={c.cover.src}
                      alt={c.cover.alt}
                      fill
                      sizes={wide ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"}
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="font-serif text-xl leading-tight text-charcoal lg:text-2xl">{c.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-taupe">{c.short}</p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Link href="/collections" className="mt-8 inline-block text-link hover:text-gold-text sm:hidden">View all collections</Link>
      </div>
    </section>
  );
}
