import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import CategoryCard from "@/components/site/CategoryCard";
import { ReadyBand } from "@/components/site/Sections";
import { toCategoryCard } from "@/lib/cards";
import { categoriesInGroup, groups } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Products",
  description: "Sofas, beds, dining tables, curtains, wardrobes, walk-in closets, media walls and wall paneling, made to measure in the UAE. Browse by room and open any design for photos and a quote.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Everything we make, room by room"
        intro="Pick a collection to see its designs. Each design shows one photo; open it for the rest of its photos, its details and a quote."
        crumbs={[{ label: "Products" }]}
      >
        <nav aria-label="Jump to a room" className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <a key={g.slug} href={"#" + g.slug} className="chip">{g.title}</a>
          ))}
        </nav>
      </PageHeader>

      {groups.map((g, gi) => {
        const cats = categoriesInGroup(g.slug);
        return (
          <section key={g.slug} id={g.slug} className={"scroll-mt-24 py-section-sm " + (gi % 2 ? "bg-mist" : "")} aria-labelledby={"room-" + g.slug}>
            <div className="wrap">
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-dm text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">Room {gi + 1} of {groups.length}</p>
                  <h2 id={"room-" + g.slug} className="h-md mt-2">{g.title}</h2>
                </div>
                <p className="max-w-md font-dm text-[15px] text-taupe sm:text-right">{g.blurb}</p>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
                {cats.map((c) => (
                  <li key={c.slug}><CategoryCard item={toCategoryCard(c)} priority={gi === 0} /></li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="py-section-sm">
        <div className="wrap">
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-border bg-white p-7 sm:flex-row sm:items-center sm:p-9">
            <div>
              <h2 className="font-accent text-3xl font-medium text-charcoal">Kitchen cabinets, or something you cannot see here?</h2>
              <p className="mt-2 max-w-xl font-dm text-[15px] text-taupe">We build custom joinery to order. Tell us what you have in mind and we will say plainly whether we can make it.</p>
            </div>
            <Link href="/quote?item=other" className="btn-dark shrink-0">Ask for a quote <span aria-hidden="true">&#8599;</span></Link>
          </div>
        </div>
      </section>

      <ReadyBand />
    </>
  );
}
