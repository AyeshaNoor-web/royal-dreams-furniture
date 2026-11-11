import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { groups, categoriesInGroup, roomTiles } from "@/lib/gallery";

// Rooms with three or more collections take a full row; smaller rooms sit side by side.
const rows: (typeof groups)[] = [];
for (const g of groups) {
  const n = categoriesInGroup(g.slug).length;
  const last = rows[rows.length - 1];
  if (n < 3 && last && last.every((x) => categoriesInGroup(x.slug).length < 3)) last.push(g);
  else rows.push([g]);
}

export default function CategoryTiles() {
  return (
    <section className="py-16 lg:py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-display-md text-charcoal">Explore by room</h2>
            <p className="mt-3 max-w-lg text-[15px] text-taupe">Every piece below is made to measure. Choose a room, then a collection, to see completed projects.</p>
          </div>
          <Link href="/collections" className="hidden sm:inline-block text-link hover:text-gold-text">
            View all collections
          </Link>
        </Reveal>

        <div className="flex flex-col gap-14">
          {rows.map((row, ri) => (
            <div key={ri} className={row.length > 1 ? "grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-8" : ""}>
              {row.map((g) => {
                const tiles = roomTiles(g.slug);
                const wide = row.length === 1;
                return (
                  <div key={g.slug}>
                    <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-border pb-3">
                      <h3 className="font-serif text-2xl text-charcoal">{g.title}</h3>
                      <p className="hidden text-[14px] text-taupe sm:block">{g.blurb}</p>
                    </div>
                    <Stagger className={"grid gap-4 lg:gap-5 " + (wide ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5" : "grid-cols-2 sm:grid-cols-3")} stagger={0.06}>
                      {tiles.map((t) => (
                        <StaggerItem key={t.key}>
                          <Link href={t.href} className="group block">
                            <div className="relative aspect-[4/5] overflow-hidden bg-beige-dark">
                              <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <p className="mt-4 font-serif text-lg text-charcoal leading-tight group-hover:text-gold-dark transition-colors">{t.title}</p>
                            <p className="mt-1 text-[14px] text-taupe">{t.short}</p>
                          </Link>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
