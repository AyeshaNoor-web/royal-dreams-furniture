"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { GalleryImage } from "@/lib/gallery";

/**
 * One large photograph in a gold hairline frame. On a pointer device the picture leans a few degrees toward the
 * cursor and drifts slowly; both stop under reduced motion. No WebGL: a transform on one element is all it costs.
 */
export default function HeroFrame({ image, caption }: { image: GalleryImage; caption: string }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [3, -3]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !box.current) return;
    const r = box.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <figure className="relative mx-auto w-full max-w-[520px] lg:max-w-none" style={{ perspective: 1400 }}>
      <motion.div
        ref={box}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <span aria-hidden="true" className="absolute -right-3 -bottom-3 left-3 top-3 border border-gold/45 sm:-right-4 sm:-bottom-4 sm:left-4 sm:top-4" />
        <div className="relative aspect-[4/5] overflow-hidden bg-beige-dark lg:max-h-[min(72svh,760px)]">
          <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 42vw, (min-width: 640px) 70vw, 100vw" className={"object-cover " + (reduce ? "" : "hero-kenburns")} />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>
      </motion.div>
      <figcaption className="mt-4 flex items-center gap-3 text-[13px] text-taupe">
        <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
        {caption}
      </figcaption>
    </figure>
  );
}
