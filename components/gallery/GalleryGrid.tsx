"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import Lightbox from "@/components/motion/Lightbox";
import type { GalleryImage, GalleryVideo } from "@/lib/gallery";

export interface GridImage extends GalleryImage {
  category: string;
  categoryTitle: string;
}

interface GalleryGridProps {
  images: GridImage[];
  /** Videos of the same projects, shown in the lightbox next to their photos. */
  videos?: GalleryVideo[];
  filters?: { slug: string; title: string }[];
  /** Query-string key that pre-selects a filter, e.g. /gallery?c=sofas. Read on the client so the page itself stays static. */
  paramKey?: string;
}

const PAGE = 24;

export default function GalleryGrid({ images, videos, filters, paramKey = "c" }: GalleryGridProps) {
  const [active, setActive] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get(paramKey);
    if (wanted && filters?.some((f) => f.slug === wanted)) setActive(wanted);
  }, [paramKey, filters]);
  const visible = useMemo(() => (active === "all" ? images : images.filter((i) => i.category === active)), [images, active]);
  // Sets just over the page size are shown whole rather than leaving two or three photos behind a button.
  const shown = visible.length > PAGE + 6 ? visible.slice(0, limit) : visible;
  const select = (slug: string) => { setActive(slug); setLimit(PAGE); };

  return (
    <div>
      {filters && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by collection">
          {[{ slug: "all", title: "All" }, ...filters].map((f) => {
            const on = active === f.slug;
            return (
              <button
                key={f.slug}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => select(f.slug)}
                className={"min-h-[44px] min-w-[44px] rounded-full border px-4 text-[14px] font-semibold transition-colors duration-200 " + (on ? "border-pine bg-pine text-beige" : "border-charcoal/15 bg-white/60 text-charcoal hover:border-charcoal/50")}
              >
                {f.title}
              </button>
            );
          })}
        </div>
      )}

      {visible.length <= 6 ? (
        // Small sets: an even grid that fills the width instead of a sparse masonry
        <div className={"grid gap-3 lg:gap-5 " + (visible.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-3")}>
          {visible.map((img, idx) => (
            <button key={img.src} type="button" onClick={() => setOpen(idx)} className="relative block aspect-[4/5] w-full overflow-hidden rounded-3xl bg-beige-dark" aria-label={"Open " + img.alt}>
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
            </button>
          ))}
        </div>
      ) : (
        <div className="columns-2 gap-3 md:columns-3 xl:columns-4 [&>*]:mb-3">
          {shown.map((img, idx) => (
            <button key={img.src} type="button" onClick={() => setOpen(idx)} className="block w-full break-inside-avoid overflow-hidden rounded-3xl bg-beige-dark" aria-label={"Open " + img.alt}>
              <Image src={img.src} alt={img.alt} width={img.w} height={img.h} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
            </button>
          ))}
        </div>
      )}

      {shown.length < visible.length && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-[14px] text-taupe">Showing {shown.length} of {visible.length} photos</p>
          <button type="button" onClick={() => setLimit((n) => n + PAGE)} className="btn-line">Show more</button>
        </div>
      )}

      <Lightbox images={visible} videos={videos} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  );
}
