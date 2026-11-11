import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { groups, categoriesInGroup, roomTiles, type RoomTile } from "@/lib/gallery";

type Group = (typeof groups)[number];

// Rooms with three or more collections take a full spread; smaller rooms share a row.
const rows: Group[][] = [];
for (const g of groups) {
  const n = categoriesInGroup(g.slug).length;
  const last = rows[rows.length - 1];
  if (n < 3 && last && last.every((x) => categoriesInGroup(x.slug).length < 3)) last.push(g);
  else rows.push([g]);
}

function Tile({ t, sizes, className = "", priority = false }: { t: RoomTile; sizes: string; className?: string; priority?: boolean }) {
  return (
    <Link href={t.href} className={"group relative block overflow-hidden bg-beige-dark " + className}>
      <Image src={t.image.src} alt={t.image.alt} fill priority={priority} sizes={sizes} className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent px-5 pb-4 pt-14 text-beige-light">
        <span className="block font-serif text-xl leading-tight lg:text-2xl">{t.title}</span>
        <span className="mt-1 block text-[13px] text-beige/75">{t.short}</span>
      </span>
    </Link>
  );
}

/** Full-width spread: heading and lead photo on one side, a cluster of smaller tiles on the other. */
function Spread({ g, flip, first }: { g: Group; flip: boolean; first: boolean }) {
  const [lead, ...rest] = roomTiles(g.slug);
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      <div className={"flex flex-col lg:col-span-5 " + (flip ? "lg:order-2" : "")}>
        <Reveal>
          <h3 className="font-serif text-display-md text-charcoal">{g.title}</h3>
          <p className="mt-2 max-w-sm text-[15px] text-taupe">{g.blurb}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-6 flex-1">
          <Tile t={lead} priority={first} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] lg:h-full lg:min-h-[520px]" />
        </Reveal>
      </div>
      <div className={"lg:col-span-7 " + (flip ? "lg:order-1" : "")}>
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {rest.map((t, i) => {
            const wide = rest.length === 3 && i === 0;
            return (
              <Reveal key={t.key} delay={0.12 + i * 0.06} className={wide ? "col-span-2" : ""}>
                <Tile t={t} sizes="(min-width: 1024px) 30vw, 50vw" className={wide ? "aspect-[16/9]" : "aspect-[4/3]"} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Compact spread for rooms with a single collection: lead photo with its sub-types stacked beside it. */
function MiniSpread({ g }: { g: Group }) {
  const [lead, ...rest] = roomTiles(g.slug);
  return (
    <div>
      <Reveal>
        <h3 className="font-serif text-display-md text-charcoal">{g.title}</h3>
        <p className="mt-2 max-w-sm text-[15px] text-taupe">{g.blurb}</p>
      </Reveal>
      <div className="mt-6 grid grid-cols-12 gap-4 lg:gap-5">
        <Reveal delay={0.08} className="col-span-7">
          <Tile t={lead} sizes="(min-width: 1024px) 28vw, 58vw" className="aspect-[4/5]" />
        </Reveal>
        <div className="col-span-5 grid grid-rows-2 gap-4 lg:gap-5">
          {rest.map((t, i) => (
            <Reveal key={t.key} delay={0.14 + i * 0.06} className="relative min-h-0">
              <Tile t={t} sizes="(min-width: 1024px) 20vw, 42vw" className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryTiles() {
  return (
    <section className="bg-beige py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-14 flex items-end justify-between gap-6 lg:mb-20">
          <div>
            <h2 className="font-serif text-display-lg text-charcoal">Explore by room</h2>
            <p className="mt-3 max-w-lg text-[15px] text-taupe">Every piece below is made to measure. Choose a room, then a collection, to see completed projects.</p>
          </div>
          <Link href="/collections" className="hidden text-link hover:text-gold-text sm:inline-block">View all collections</Link>
        </Reveal>

        <div className="flex flex-col gap-20 lg:gap-28">
          {rows.map((row, ri) =>
            row.length === 1 ? (
              <Spread key={row[0].slug} g={row[0]} flip={ri % 2 === 1} first={ri === 0} />
            ) : (
              <div key={ri} className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-10">
                {row.map((g) => <MiniSpread key={g.slug} g={g} />)}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
