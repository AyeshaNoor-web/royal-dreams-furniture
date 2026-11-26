"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { APPOINTMENT_LINK, WHATSAPP_LINK } from "@/lib/site";

export interface HeroSlide {
  src: string;
  alt: string;
  /** Bold lead and the sentence after it, shown bottom right. */
  lead: string;
  text: string;
  href: string;
}

const DURATION = 6000;
const ticks = ["Free home visit and measurement", "3D design before anything is built", "Built in our own workshop"];

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, slides.length]);

  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length);
  const s = slides[i];

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white" aria-roledescription="carousel" aria-label="Made-to-measure furniture by Modern Furniture Collection">
      {slides.map((sl, n) => (
        <div key={sl.src} className={"absolute inset-0 -z-10 transition-opacity duration-1000 " + (n === i ? "opacity-100" : "opacity-0")} aria-hidden={n !== i}>
          <Image src={sl.src} alt={n === i ? sl.alt : ""} fill priority={n === 0} sizes="100vw" className={"object-cover " + (n === i ? "hero-zoom" : "")} />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/75" aria-hidden="true" />

      <div className="wrap flex min-h-[calc(100svh-4rem-60px)] flex-col justify-center pb-28 pt-14 text-center sm:min-h-[600px] lg:min-h-[min(calc(100svh-4.5rem),780px)] lg:pb-36">
        <h1 className="mx-auto max-w-4xl font-serif text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.1]">
          Made-to-measure furniture, built for your room
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-dm text-lg leading-relaxed text-white/90 sm:text-xl">
          Sofas, beds, wardrobes, walk-in closets, media walls and curtains. One team measures, designs, builds and fits.
        </p>
        <div className="mx-auto mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
          <Link href="/quote" className="btn-white">
            Get a free quote
          </Link>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-glass"><WhatsAppIcon className="h-4 w-4" /> Discuss on WhatsApp</a>
        </div>
        <p className="mt-5 font-dm text-base text-white/85">
          Want us to measure first?{" "}
          <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline underline-offset-4">Book a free home visit</a>
        </p>
        <p className="mx-auto mt-6 max-w-2xl font-dm text-[15px] text-white/80">{ticks.join(". ")}.</p>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="wrap flex flex-col gap-3 pb-6 lg:pb-8">
          <p className="hidden max-w-md font-dm text-[13px] leading-relaxed text-white/85 md:block" aria-live="polite">
            <Link href={s.href} className="font-semibold text-white underline-offset-4 hover:underline">{s.lead}</Link> {s.text}
          </p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play slides" : "Pause slides"} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white hover:bg-white/15">
              {paused ? (
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
              )}
            </button>
            <span className="font-dm text-xs font-semibold tabular-nums">0{i + 1}</span>
            <span className="relative h-px w-20 overflow-hidden bg-white/30 sm:w-28">
              <span key={i + (paused ? "p" : "r")} className={"absolute inset-0 bg-white " + (paused ? "" : "hero-bar")} />
            </span>
            <span className="font-dm text-xs font-semibold tabular-nums text-white/70">0{slides.length}</span>
            <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="ml-2 flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/15">&larr;</button>
            <button type="button" onClick={() => go(1)} aria-label="Next slide" className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/15">&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
