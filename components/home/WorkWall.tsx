import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { photo } from "@/lib/photo";

const rowA: [string, number][] = [["sofas", 3], ["walk-in-closets", 5], ["beds", 2], ["tv-units", 2], ["dining-tables", 1], ["curtains", 14], ["sofas", 24], ["walk-in-closets", 15], ["wall-paneling", 3]];
const rowB: [string, number][] = [["tv-units", 16], ["beds", 6], ["sofas", 26], ["fitted-wardrobes", 1], ["dining-tables", 8], ["walk-in-closets", 13], ["beds", 21], ["sofas", 14], ["tv-units", 11]];

function Row({ items, reverse, tall }: { items: [string, number][]; reverse?: boolean; tall?: boolean }) {
  const h = tall ? "h-[260px] sm:h-[340px] lg:h-[400px]" : "h-[200px] sm:h-[260px] lg:h-[300px]";
  return (
    <div className="marquee-wrap overflow-hidden">
      <div className={"marquee " + (reverse ? "marquee-rev" : "")} style={{ ["--marquee" as string]: tall ? "90s" : "75s" }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4" aria-hidden={k === 1}>
            {items.map(([slug, n], i) => {
              const p = photo(slug, n);
              return (
                <Link key={slug + n} href={"/collections/" + slug} tabIndex={k === 1 ? -1 : 0} className={"relative block shrink-0 overflow-hidden bg-beige-dark " + h + " " + (i % 3 === 1 ? "arch" : "rounded-4xl")} style={{ aspectRatio: String(Math.min(1.5, Math.max(0.7, p.w / p.h))) }}>
                  <Image src={p.src} alt={k === 0 ? p.alt : ""} fill sizes="(min-width: 1024px) 420px, 300px" className="object-cover" />
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Proof: nothing but finished rooms, moving past. */
export default function WorkWall() {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <Reveal className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <p className="eyebrow mb-4">Finished homes</p>
          <h2 className="max-w-3xl font-serif text-display-lg text-charcoal">Real homes. <span className="accent text-gold-text">No showroom sets,</span> no stock photos.</h2>
        </div>
        <Link href="/gallery" className="text-link shrink-0">See the whole gallery</Link>
      </Reveal>
      <div className="mt-8 flex flex-col gap-3 sm:gap-4 lg:mt-12">
        <Row items={rowA} tall />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
