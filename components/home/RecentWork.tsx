import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { pick } from "@/lib/gallery";

// Six finished rooms from six different collections. Captions come from the photo descriptions.
const work = [
  { slug: "tv-units", i: 1 },
  { slug: "wall-paneling", i: 1 },
  { slug: "walk-in-closets", i: 1 },
  { slug: "beds", i: 1 },
  { slug: "dining-tables", i: 1 },
  { slug: "curtains", i: 1 },
].map((w) => ({ ...w, image: pick(w.slug, w.i) }));

export default function RecentWork() {
  return (
    <section className="bg-beige py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
          <div>
            <p className="eyebrow mb-4">Gallery</p>
          <h2 className="font-serif text-display-md text-charcoal">Recent work</h2>
            <p className="mt-3 max-w-lg text-[15px] text-taupe">Rooms we have finished for clients across the UAE.</p>
          </div>
          <Link href="/gallery" className="hidden text-link hover:text-gold-text sm:inline-block">See the full gallery</Link>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6" stagger={0.06}>
          {work.map((w, i) => (
            <StaggerItem key={w.image.src} className={i >= 4 ? "hidden sm:block" : ""}>
              <Link href={"/gallery?c=" + w.slug} className="group block">
                <div className="mount relative aspect-[4/5] overflow-hidden bg-beige-dark">
                  <Image src={w.image.src} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 text-[14px] leading-snug text-charcoal">{w.image.alt}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Link href="/gallery" className="mt-8 inline-block text-link hover:text-gold-text sm:hidden">See the full gallery</Link>
      </div>
    </section>
  );
}
