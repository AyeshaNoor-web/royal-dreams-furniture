"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import Lightbox from "@/components/motion/Lightbox";
import type { GalleryImage } from "@/lib/gallery";

export interface GridImage extends GalleryImage {
  category: string;
  categoryTitle: string;
}

interface GalleryGridProps {
  images: GridImage[];
  filters?: { slug: string; title: string }[];
  /** Query-string key that pre-selects a filter, e.g. /gallery?c=sofas. Read on the client so the page itself stays static. */
  paramKey?: string;
}

export default function GalleryGrid({ images, filters, paramKey = "c" }: GalleryGridProps) {
  const [active, setActive] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get(paramKey);
    if (wanted && filters?.some((f) => f.slug === wanted)) setActive(wanted);
  }, [paramKey, filters]);
  const visible = useMemo(() => (active === "all" ? images : images.filter((i) => i.category === active)), [images, active]);

  return (
    <div>
      {filters && (
        <div className="mb-10 flex flex-wrap gap-x-7 gap-y-1 border-b border-border" role="tablist" aria-label="Filter by collection">
          {[{ slug: "all", title: "All" }, ...filters].map((f) => {
            const on = active === f.slug;
            return (
              <button
                key={f.slug}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(f.slug)}
                className={"-mb-px min-h-[44px] border-b text-[15px] transition-colors duration-200 " + (on ? "border-charcoal text-charcoal" : "border-transparent text-taupe hover:text-charcoal")}
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
            <button key={img.src} type="button" onClick={() => setOpen(idx)} className="relative block aspect-[4/5] w-full overflow-hidden bg-beige-dark" aria-label={"Open " + img.alt}>
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
            </button>
          ))}
        </div>
      ) : (
        <div className="columns-2 gap-3 md:columns-3 xl:columns-4 [&>*]:mb-3">
          {visible.map((img, idx) => (
            <button key={img.src} type="button" onClick={() => setOpen(idx)} className="block w-full break-inside-avoid bg-beige-dark" aria-label={"Open " + img.alt}>
              <Image src={img.src} alt={img.alt} width={img.w} height={img.h} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
            </button>
          ))}
        </div>
      )}

      <Lightbox images={visible} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  );
}
