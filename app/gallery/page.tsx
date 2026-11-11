import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CtaBand from "@/components/home/CtaBand";
import { allImages, categories } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse every installation by Modern Furniture Collection: sofas, beds, dining tables, curtains, wardrobes, closets, media walls and paneling across the UAE.",
};

interface Props { searchParams: Promise<{ c?: string }> }

export default async function GalleryPage({ searchParams }: Props) {
  const { c } = await searchParams;
  const initial = c && categories.some((x) => x.slug === c) ? c : "all";
  return (
    <>
      <PageHeader title="Completed projects across the UAE." intro="Photographs from homes we have furnished across the UAE. Filter by collection or open any image to view it in full." />
      <section className="pb-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <GalleryGrid images={allImages} initial={initial} filters={categories.map((c) => ({ slug: c.slug, title: c.title }))} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
