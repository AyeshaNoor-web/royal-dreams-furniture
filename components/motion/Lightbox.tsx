"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import type { GalleryImage, GalleryVideo } from "@/lib/gallery";
import LightboxStrip from "./LightboxStrip";

interface LightboxProps {
  images: GalleryImage[];
  /** Videos that may belong to the same project as an image (matched on `set`). */
  videos?: GalleryVideo[];
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
}

const ctrl = "absolute flex h-11 w-11 items-center justify-center border border-charcoal/25 text-charcoal/90 transition-colors hover:border-lit hover:text-lit [touch-action:manipulation]";

export default function Lightbox({ images, videos = [], index, onClose, onChange }: LightboxProps) {
  const open = index !== null;
  const total = images.length;
  const [video, setVideo] = useState<GalleryVideo | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      setVideo(null);
      onChange((index + dir + total) % total);
    },
    [index, total, onChange]
  );

  useEffect(() => {
    if (!open) { setVideo(null); return; }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  const img = index !== null ? images[index] : null;
  // Everything from the same project: the client's "open one picture and the others show with it".
  const setImages = img?.set ? images.filter((i) => i.set === img.set) : [];
  const setVideos = img?.set ? videos.filter((v) => v.set === img.set) : [];

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-frame p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={video ? video.alt : img.alt}
        >
          <motion.div
            key={video ? video.src : img.src}
            className={"relative h-full w-full max-w-6xl " + (setImages.length + setVideos.length > 1 ? "pb-24 sm:pb-28" : "")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {video ? (
              <video key={video.src} src={video.src} poster={video.poster} controls autoPlay playsInline className="h-full w-full object-contain" aria-label={video.alt} />
            ) : (
              <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" priority />
            )}
          </motion.div>

          <LightboxStrip
            images={setImages}
            videos={setVideos}
            currentSrc={video ? video.src : img.src}
            onImage={(i) => { setVideo(null); onChange(images.indexOf(i)); }}
            onVideo={setVideo}
          />

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[15px] tabular-nums text-charcoal/70">
            {video ? "Video" : `${index! + 1} / ${total}`}
          </p>

          <button type="button" onClick={onClose} aria-label="Close" className={ctrl + " right-4 top-4"}>
            <span aria-hidden="true" className="text-2xl leading-none">&times;</span>
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image" className={ctrl + " left-2 top-1/2 -translate-y-1/2 sm:left-6"}>
            <span aria-hidden="true">&larr;</span>
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image" className={ctrl + " right-2 top-1/2 -translate-y-1/2 sm:right-6"}>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
