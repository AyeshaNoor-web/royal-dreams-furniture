"use client";

import Image from "next/image";
import type { PublicCatalogue } from "@/lib/pricing";

interface Props {
  catalogue: PublicCatalogue;
  onChoose: (slug: string) => void;
  onPreset: (id: string) => void;
}

export default function StepCollection({ catalogue, onChoose, onPreset }: Props) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">What do you need made?</h2>
      <p className="mt-2 text-[15px] text-taupe">Pick one piece to start. You can add more to the same room afterwards.</p>
      {catalogue.presets.length > 0 && (
        <div className="mt-5">
          <p className="text-[13px] uppercase tracking-wider text-taupe">Quick start, a typical home</p>
          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Quick start presets">
            {catalogue.presets.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => onPreset(p.id)} className="inline-flex min-h-[44px] items-center rounded-full border border-charcoal/35 bg-beige-light px-4 font-dm text-[14px] text-charcoal transition-colors [touch-action:manipulation] hover:border-charcoal hover:bg-beige">
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[13px] text-taupe">Loads a typical set of pieces you can then edit or remove.</p>
        </div>
      )}
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" aria-label="Collections">
        {catalogue.collections.map((c) => (
          <li key={c.slug}>
            <button type="button" onClick={() => onChoose(c.slug)} className="group block w-full text-left [touch-action:manipulation]">
              <span className="relative block aspect-[4/3] overflow-hidden bg-beige-dark">
                {c.cover.src && <Image src={c.cover.src} alt="" fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />}
              </span>
              <span className="mt-2 block font-serif text-[17px] leading-tight text-charcoal group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{c.title}</span>
              <span className="mt-0.5 block text-[13px] text-taupe">{c.short}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
