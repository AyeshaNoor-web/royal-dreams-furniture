import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import ProductGrid from "@/components/site/ProductGrid";
import { ReadyBand } from "@/components/site/Sections";
import { allCards } from "@/lib/cards";
import { categories } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Our work",
  description: "Every piece we have made and fitted in homes across the UAE: sofas, beds, dining tables, curtains, wardrobes, closets, media walls and paneling. One photo per design; open any design for the rest.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const items = allCards();
  return (
    <>
      <PageHeader eyebrow="Our work" title="Pieces we have made and fitted" intro={"All " + items.length + " designs in one place. Each shows one photo; open a design to see every photo and video of it."} crumbs={[{ label: "Our work" }]} />
      <section className="py-section-sm">
        <div className="wrap">
          <ProductGrid items={items} by="slug" param="c" allLabel="Everything" filters={categories.map((c) => ({ id: c.slug, label: c.title }))} />
        </div>
      </section>
      <ReadyBand />
    </>
  );
}
