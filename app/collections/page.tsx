import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import { CollectionCard } from "@/components/home/Collections";
import CtaBand from "@/components/home/CtaBand";
import Image from "next/image";
import Link from "next/link";
import { groups, categoriesInGroup, roomTiles } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Collections",
  description: "Sofas, beds, dining tables, curtains, wardrobes, walk-in closets, media walls and wall paneling, made to measure in the UAE.",
};

// Rooms with three or more collections take a full row; smaller rooms sit side by side.
const rows: (typeof groups)[] = [];
for (const g of groups) {
  const n = categoriesInGroup(g.slug).length;
  const last = rows[rows.length - 1];
  if (n < 3 && last && last.every((x) => categoriesInGroup(x.slug).length < 3)) last.push(g);
  else rows.push([g]);
}

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        title="Every room, made to measure."
        intro="Each collection is designed, built and installed by our own team. Browse by room, open a collection to view completed projects, then request a quotation for your space."
      />
      {rows.map((row, ri) => (
        <section key={ri} className={(ri % 2 ? "bg-beige-light " : "") + "border-b border-border py-section-sm"}>
          <div className={"mx-auto max-w-7xl px-6 lg:px-10 " + (row.length > 1 ? "grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-10" : "")}>
            {row.map((g) => (
              <div key={g.slug} id={g.slug} className="scroll-mt-24">
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
                  <h2 className="font-serif text-display-md text-charcoal">{g.title}</h2>
                  <p className="text-[15px] text-taupe">{g.blurb}</p>
                </div>
                {row.length > 1 ? (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                    {roomTiles(g.slug).map((t) => (
                      <Link key={t.key} href={t.href} className="group block">
                        <div className="relative aspect-[3/4] overflow-hidden bg-beige-dark">
                          <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 1024px) 16vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <p className="mt-2 font-serif text-base leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 sm:mt-3 sm:text-xl">{t.title}</p>
                        <p className="mt-0.5 text-[13px] text-taupe sm:text-[15px]">{t.short}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
                    {categoriesInGroup(g.slug).map((c, i) => <CollectionCard key={c.slug} item={c} priority={ri === 0 && i < 3} />)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
