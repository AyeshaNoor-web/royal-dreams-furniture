"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { categories } from "@/lib/gallery";
import { APPOINTMENT_LINK } from "@/lib/site";

const slides = [
  {
    image: categories[1].images[3],
    eyebrow: "Walk-in Closets",
    title: "Walk-in closets designed around you.",
    text: "Glass-front wardrobes, illuminated shelving and a central island, planned to the exact dimensions of your room.",
    href: "/collections/walk-in-closets",
    cta: "Explore Walk-in Closets",
  },
  {
    image: categories[3].images[0],
    eyebrow: "TV Units & Media Walls",
    title: "Media walls with the lighting built in.",
    text: "Floating consoles, timber slats and backlit niches, sized to your screen and finished to match your interior.",
    href: "/collections/tv-units",
    cta: "Explore Media Walls",
  },
  {
    image: categories[0].images[1],
    eyebrow: "Wall Paneling",
    title: "Timeless paneling for modern homes.",
    text: "Wainscoting and full-height panels, proportioned to your ceiling height and every opening in the room.",
    href: "/collections/wall-paneling",
    cta: "Explore Wall Paneling",
  },
];

const INTERVAL = 6500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(t);
  }, [paused, reduce, go]);

  const s = slides[index];

  return (
    <section
      className="relative h-[72svh] min-h-[520px] max-h-[820px] bg-charcoal overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={s.image.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <Image src={s.image.src} alt={s.image.alt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-charcoal/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent" aria-hidden="true" />

      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex items-end pb-14 lg:pb-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-beige-light"
          >
            <p className="font-dm text-[11px] uppercase tracking-[0.24em] text-gold mb-4">{s.eyebrow}</p>
            <h1 className="font-serif text-display-lg leading-[1.02]">{s.title}</h1>
            <p className="mt-5 max-w-lg font-dm text-sm sm:text-base text-beige/80 leading-relaxed">{s.text}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href={s.href} className="inline-flex items-center justify-center px-7 py-3.5 bg-beige-light text-charcoal font-dm text-[11px] uppercase tracking-[0.18em] hover:bg-lit transition-colors duration-300">
                {s.cta}
              </Link>
              <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-beige-light/60 text-beige-light font-dm text-[11px] uppercase tracking-[0.18em] hover:bg-beige-light hover:text-charcoal transition-colors duration-300">
                <WhatsAppIcon className="w-4 h-4" />
                Book a Free Consultation
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-6 lg:right-10 bottom-14 lg:bottom-20 hidden sm:flex items-center gap-5 text-beige-light">
        <span className="font-dm text-[11px] tracking-[0.3em]">{String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="w-10 h-10 border border-beige-light/40 hover:bg-beige-light hover:text-charcoal transition-colors">&larr;</button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className="w-10 h-10 border border-beige-light/40 hover:bg-beige-light hover:text-charcoal transition-colors">&rarr;</button>
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-5 flex gap-2" role="tablist" aria-label="Slides">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={"Go to slide " + (i + 1)}
            onClick={() => setIndex(i)}
            className={"h-[3px] transition-all duration-500 " + (i === index ? "w-10 bg-beige-light" : "w-5 bg-beige-light/40 hover:bg-beige-light/70")}
          />
        ))}
      </div>
    </section>
  );
}
