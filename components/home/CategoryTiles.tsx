import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { categories } from "@/lib/gallery";

export default function CategoryTiles() {
  return (
    <section className="py-16 lg:py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-serif text-display-md text-charcoal">Explore our collections</h2>
          </div>
          <Link href="/collections" className="hidden sm:inline-block text-link hover:text-gold-text">
            View all collections
          </Link>
        </Reveal>

        <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5" stagger={0.06}>
          {categories.map((c) => (
            <StaggerItem key={c.slug}>
              <Link href={"/collections/" + c.slug} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-beige-dark">
                  <Image src={c.cover.src} alt={c.cover.alt} fill sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-4 font-serif text-lg text-charcoal leading-tight group-hover:text-gold-dark transition-colors">{c.title}</p>
                <p className="mt-1 text-[14px] text-taupe">{c.short}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
