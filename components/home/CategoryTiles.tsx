import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Spread, { Tile, type Group } from "@/components/home/RoomSpread";
import { groups, categoriesInGroup, roomTiles } from "@/lib/gallery";

// Rooms with three or more collections take a full spread; smaller rooms share a row.
const rows: Group[][] = [];
for (const g of groups) {
  const n = categoriesInGroup(g.slug).length;
  const last = rows[rows.length - 1];
  if (n < 3 && last && last.every((x) => categoriesInGroup(x.slug).length < 3)) last.push(g);
  else rows.push([g]);
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
      <div className="mt-6 grid h-[460px] grid-cols-12 gap-4 sm:h-[520px] lg:gap-5">
        <Reveal delay={0.08} className="col-span-7 h-full">
          <Tile t={lead} sizes="(min-width: 1024px) 28vw, 58vw" className="h-full" />
        </Reveal>
        <div className="col-span-5 grid h-full grid-rows-2 gap-4 lg:gap-5">
          {rest.map((t, i) => (
            <Reveal key={t.key} delay={0.14 + i * 0.06} className="h-full min-h-0">
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
