"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useCallback } from "react";
import type { GalleryImage } from "@/lib/gallery";

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
}

export default function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const open = index !== null;
  const total = images.length;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + total) % total);
    },
    [index, total, onChange]
  );

  useEffect(() => {
    if (!open) return;
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

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          className="fixed inset-0 z-[80] bg-frame flex items-center justify-center p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={img.alt}
        >
          <motion.div
            key={img.src}
            className="relative w-full h-full max-w-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" priority />
          </motion.div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[15px] tabular-nums text-beige/70">
            {index! + 1} / {total}
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-beige/90 hover:text-lit border border-beige/25 hover:border-lit transition-colors"
          >
            <span aria-hidden="true" className="text-2xl leading-none">&times;</span>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-beige/90 hover:text-lit border border-beige/25 hover:border-lit transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-beige/90 hover:text-lit border border-beige/25 hover:border-lit transition-colors"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
