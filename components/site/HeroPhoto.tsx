"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

export interface HeroShot {
  /** A full-resolution portrait photo from public/images/hero. */
  src: string;
  alt: string;
  /** Shown as a small caption on wide screens, linking to the collection. */
  label: string;
  href: string;
  /** Optional Tailwind object-position classes when the subject is not in the middle. */
  pos?: string;
}

const HOLD = 6500;

/**
 * The home hero. The client's sharpest photos are portrait, so each one is shown in a tall panel at or below its
 * real size, which keeps it crisp: on the right half on wide screens, across the top on phones. A blurred, darkened
 * copy of the same photo fills the rest of the hero, so the background carries the room's own colours instead of a
 * flat block. The header is transparent over it (see Header.tsx).
 */
export default function HeroPhoto({ shots }: { shots: HeroShot[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % shots.length), HOLD);
    return () => clearTimeout(t);
  }, [i, shots.length]);

  const s = shots[i];
  const fade = (n: number) => "transition-opacity duration-[1400ms] ease-in-out " + (n === i ? "opacity-100" : "opacity-0");

  return (
    <section data-hero className="relative isolate -mt-16 overflow-hidden bg-charcoal text-white lg:-mt-[4.5rem]">
      {/* Soft backdrop: the same photo, blurred and darkened. */}
      {shots.map((sh, n) => (
        <div key={"bg" + sh.src} className={"absolute inset-0 -z-30 " + fade(n)} aria-hidden="true">
          <Image src={sh.src} alt="" fill sizes="480px" className="scale-125 object-cover blur-3xl" />
        </div>
      ))}
      <div className="absolute inset-0 -z-30 bg-charcoal/70" aria-hidden="true" />

      {/* The sharp photo: top of the hero on phones, right-hand panel on wide screens. */}
      {shots.map((sh, n) => (
        <div key={sh.src} className={"absolute inset-x-0 top-0 -z-20 h-[60%] [mask-image:linear-gradient(to_bottom,black_58%,transparent_100%)] md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[58%] md:[mask-image:linear-gradient(to_right,transparent_0%,black_34%)] " + fade(n)} aria-hidden={n !== i}>
          <Image src={sh.src} alt={n === i ? sh.alt : ""} fill priority={n === 0} quality={90} sizes="(min-width: 768px) 58vw, 100vw" className={"object-cover " + (sh.pos ?? "")} />
        </div>
      ))}
      {/* The photo's own edge fades out (the mask above), so there is no seam. Only a little shade is added at the top for the header. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-charcoal/55 to-transparent md:hidden" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 hidden h-36 bg-gradient-to-b from-charcoal/55 to-transparent md:block" aria-hidden="true" />

      <div className="wrap flex min-h-[calc(100svh-60px)] flex-col justify-end pb-8 pt-28 md:min-h-[660px] md:justify-center md:pb-24 md:pt-40 lg:min-h-[min(100svh,840px)]">
        <div className="max-w-xl md:max-w-[44%]">
          <h1 className="font-serif text-[clamp(2.3rem,9.5vw,3rem)] font-medium leading-[1.08] md:text-[clamp(2.75rem,4.6vw,4.25rem)]">Your dream interior starts here</h1>
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

        <div className="mt-8 md:absolute md:inset-x-0 md:bottom-8 md:mt-0">
          <div className="flex w-full items-center justify-between gap-6 md:wrap">
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero photos">
              {shots.map((sh, n) => (
                <button key={sh.src} type="button" role="tab" aria-selected={n === i} aria-label={"Show " + sh.label} onClick={() => setI(n)} className="group flex h-8 items-center">
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
