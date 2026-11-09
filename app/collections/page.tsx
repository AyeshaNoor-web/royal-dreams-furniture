import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import { CollectionCard } from "@/components/home/Collections";
import CtaBand from "@/components/home/CtaBand";
import { categories } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Collections",
  description: "Wall paneling, walk-in closets, fitted wardrobes, TV units, dressing tables and display shelving, made to measure in the UAE.",
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader title="Six specialities, one workshop." intro="Each collection is designed, built and installed by our own team. Select a collection to view completed projects, then request a quotation for your room." />
      <section className="pb-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-14 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {categories.map((c, i) => <CollectionCard key={c.slug} item={c} priority={i < 3} />)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
