"use client";

import Image from "next/image";
import type { GalleryImage, GalleryVideo } from "@/lib/gallery";

interface Props {
  images: GalleryImage[];
  videos: GalleryVideo[];
  currentSrc: string;
  onImage: (img: GalleryImage) => void;
  onVideo: (video: GalleryVideo) => void;
}

/** The other photos and videos of the same project, as a row of thumbnails under the open picture. */
export default function LightboxStrip({ images, videos, currentSrc, onImage, onVideo }: Props) {
  if (images.length + videos.length < 2) return null;
  const thumb = (on: boolean) =>
    "relative h-16 w-12 shrink-0 overflow-hidden rounded-sm transition-opacity sm:h-20 sm:w-16 [touch-action:manipulation] " +
    (on ? "ring-2 ring-gold opacity-100" : "opacity-60 hover:opacity-100 focus-visible:opacity-100");
  return (
    <div className="absolute inset-x-0 bottom-14 flex justify-center px-4" onClick={(e) => e.stopPropagation()}>
      <ul className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Same project">
        {images.map((img) => (
          <li key={img.src}>
            <button type="button" onClick={() => onImage(img)} aria-label={img.alt} aria-current={img.src === currentSrc ? "true" : undefined} className={thumb(img.src === currentSrc)}>
              <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          </li>
        ))}
        {videos.map((v) => (
          <li key={v.src}>
            <button type="button" onClick={() => onVideo(v)} aria-label={"Play video: " + v.alt} aria-current={v.src === currentSrc ? "true" : undefined} className={thumb(v.src === currentSrc)}>
              <Image src={v.poster} alt="" fill sizes="80px" className="object-cover" />
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-beige/90 text-charcoal">
                  <svg className="ml-0.5 h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z" /></svg>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
