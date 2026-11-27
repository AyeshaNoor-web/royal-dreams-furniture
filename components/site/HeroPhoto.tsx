"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

export interface HeroShot {
  /** Landscape photo for wide screens. */
  wide: { src: string; alt: string };
  /** Portrait photo for phones, so the room fills the screen instead of being cropped to a strip. */
  tall: { src: string; alt: string };
  /** Shown as a small caption: what the photo is, linking to the design. */
  label: string;
  href: string;
  /** Optional Tailwind object-position classes, for photos whose subject is not in the middle. */
  widePos?: string;
  tallPos?: string;
}

const HOLD = 6500;

/**
 * The home hero: the room itself is the background. Photos cross-fade slowly; a warm brown wash keeps the text
 * readable. Phones get portrait photos and the text sits at the bottom, wide screens get landscape photos and
 * the text sits on the left. The header is transparent over it (see Header.tsx).
 */
export default function HeroPhoto({ shots }: { shots: HeroShot[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % shots.length), HOLD);
    return () => clearTimeout(t);
  }, [i, shots.length]);

  const s = shots[i];

  return (
    <section data-hero className="relative isolate -mt-16 overflow-hidden bg-charcoal text-white lg:-mt-[4.5rem]">
      {/* Phones: the photo fills the top of the hero, so the whole room is seen above the text, and melts into brown below.
          Wide screens: the photo fills the hero and a brown wash from the left carries the text. */}
      {shots.map((sh, n) => (
        <div key={sh.wide.src} className={"absolute inset-x-0 top-0 -z-20 h-[60%] transition-opacity duration-[1400ms] ease-in-out md:inset-0 md:h-auto " + (n === i ? "opacity-100" : "opacity-0")} aria-hidden={n !== i}>
          <Image src={sh.tall.src} alt={n === i ? sh.tall.alt : ""} fill priority={n === 0} sizes="100vw" className={"object-cover md:hidden " + (sh.tallPos ?? "")} />
          <Image src={sh.wide.src} alt={n === i ? sh.wide.alt : ""} fill priority={n === 0} sizes="100vw" className={"hidden object-cover md:block " + (sh.widePos ?? "") + (n === i ? " hero-zoom" : "")} />
        </div>
      ))}
      <div className="absolute inset-x-0 top-0 -z-10 h-[60%] bg-[linear-gradient(to_bottom,rgba(46,33,26,0.6)_0%,rgba(46,33,26,0)_24%,rgba(46,33,26,0)_58%,rgba(46,33,26,0.75)_86%,#2E211A_100%)] md:hidden" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(46,33,26,0.92)_0%,rgba(46,33,26,0.78)_30%,rgba(46,33,26,0.22)_60%,rgba(46,33,26,0.05)_100%)] md:block" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 hidden h-40 bg-gradient-to-b from-charcoal/60 to-transparent md:block" aria-hidden="true" />

      <div className="wrap flex min-h-[calc(100svh-60px)] flex-col justify-end pb-8 pt-28 md:min-h-[640px] md:justify-center md:pb-24 md:pt-40 lg:min-h-[min(100svh,820px)]">
        <div className="max-w-xl">
          <h1 className="font-serif text-[clamp(2.3rem,9.5vw,3rem)] font-medium leading-[1.08] md:text-[clamp(3rem,4.8vw,4.25rem)]">Your dream interior starts here</h1>
          <p className="mt-4 max-w-md font-dm text-[17px] leading-relaxed text-white/90 md:mt-5 md:text-xl">Sofas, beds, wardrobes, closets, media walls and curtains, made to the measurements of your room and fitted by our own team across the UAE.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-8">
            <Link href="/quote" className="btn-white">Get a free quote</Link>
            <Link href="/collections" className="btn-glass">Browse our products</Link>
          </div>
          <p className="mt-5 font-dm text-base text-white/85">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp {SITE.phones[0].display}
            </a>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-6 md:absolute md:inset-x-0 md:bottom-8 md:mt-0">
          <div className="flex w-full items-center justify-between gap-6 md:wrap">
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero photos">
              {shots.map((sh, n) => (
                <button key={sh.wide.src} type="button" role="tab" aria-selected={n === i} aria-label={"Show " + sh.label} onClick={() => setI(n)} className="group flex h-8 items-center">
                  <span className={"block h-0.5 rounded transition-all duration-300 " + (n === i ? "w-10 bg-white" : "w-5 bg-white/45 group-hover:bg-white/80")} />
                </button>
              ))}
            </div>
            <Link href={s.href} className="hidden rounded-md border border-white/25 bg-white/10 px-3.5 py-2 font-dm text-sm text-white backdrop-blur-md hover:bg-white/20 md:block" aria-live="polite">{s.label}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
