"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface Media {
  kind: "photo" | "video";
  src: string;
  /** Poster for a video; the photo itself otherwise. */
  thumb: string;
  w: number;
  h: number;
  alt: string;
}

/** All the photos and videos of one product: one large view, the rest as thumbnails. */
export default function ProductGallery({ media, title }: { media: Media[]; title: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const strip = useRef<HTMLDivElement>(null);
  const m = media[i];
  const many = media.length > 1;
  const go = (d: number) => setI((n) => (n + d + media.length) % media.length);

  useEffect(() => {
    const el = strip.current?.querySelector<HTMLElement>("[data-on=true]");
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [i]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") setI((n) => (n + 1) % media.length);
      if (e.key === "ArrowLeft") setI((n) => (n - 1 + media.length) % media.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [zoom, media.length]);

  const arrow = "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-charcoal shadow-md backdrop-blur transition-colors hover:bg-white";

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-mist">
        <div className="relative mx-auto aspect-[4/5] max-h-[78svh] w-full sm:aspect-[5/4] lg:aspect-[4/3]">
          {m.kind === "photo" ? (
            <button type="button" onClick={() => setZoom(true)} aria-label={"Enlarge photo " + (i + 1) + " of " + title} className="absolute inset-0 cursor-zoom-in">
              {/* The blurred copy fills the frame behind portrait photos, so nothing is cropped. */}
              <Image src={m.src} alt="" fill sizes="20vw" className="scale-110 object-cover opacity-50 blur-2xl" aria-hidden="true" />
              <Image key={m.src} src={m.src} alt={m.alt} fill priority={i === 0} sizes="(min-width: 1024px) 58vw, 100vw" className="object-contain" />
            </button>
          ) : (
            <video key={m.src} controls playsInline preload="metadata" poster={m.thumb} className="absolute inset-0 h-full w-full bg-black object-contain" aria-label={m.alt}>
              <source src={m.src} type="video/mp4" />
            </video>
          )}
        </div>
        {many && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous" className={arrow + " left-3"}>&larr;</button>
            <button type="button" onClick={() => go(1)} aria-label="Next" className={arrow + " right-3"}>&rarr;</button>
            <span className="absolute bottom-3 right-3 rounded-full bg-charcoal/80 px-3 py-1 font-dm text-xs font-semibold tabular-nums text-white backdrop-blur" aria-live="polite">{i + 1} / {media.length}</span>
          </>
        )}
      </div>

      {many && (
        <div ref={strip} className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1" role="tablist" aria-label={"Photos and videos of " + title}>
          {media.map((t, n) => (
            <button key={t.src} type="button" role="tab" aria-selected={n === i} data-on={n === i} onClick={() => setI(n)} aria-label={(t.kind === "video" ? "Video " : "Photo ") + (n + 1)} className={"relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-mist transition-opacity sm:h-24 sm:w-24 " + (n === i ? "ring-2 ring-charcoal ring-offset-2 ring-offset-beige" : "opacity-70 hover:opacity-100")}>
              <Image src={t.thumb} alt="" fill sizes="96px" className="object-cover" />
              {t.kind === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-charcoal">
                    <svg className="h-3.5 w-3.5 translate-x-px" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {zoom && m.kind === "photo" && (
        <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4" onClick={() => setZoom(false)}>
          <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
            <Image src={m.src} alt={m.alt} fill sizes="100vw" className="object-contain" onClick={() => setZoom(false)} />
          </div>
          <button type="button" autoFocus onClick={() => setZoom(false)} aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-charcoal">&times;</button>
          {many && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous" className={arrow + " left-4"}>&larr;</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next" className={arrow + " right-4"}>&rarr;</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
