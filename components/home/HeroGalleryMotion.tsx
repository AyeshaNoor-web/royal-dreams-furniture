"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { GalleryImage } from "@/lib/gallery";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-bleed photograph with a slow drift and a 10% parallax on scroll, under an umber scrim from the left. */
export function HeroBackdrop({ image }: { image: GalleryImage }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-[-6%]">
        <Image src={image.src} alt="" fill priority fetchPriority="high" sizes="100vw" className={"object-cover object-center " + (reduce ? "" : "hero-kenburns")} />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
      <span className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      <span className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
    </div>
  );
}

/** Each child is one line of the headline; lines rise in one after another on load. */
export function LineReveal({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.14, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Fades a block in after the headline, with an optional delay. */
export function FadeUp({ children, delay = 0.6, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}
