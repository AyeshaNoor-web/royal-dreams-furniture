"use client";

import Image from "next/image";
import type { PublicCatalogue } from "@/lib/pricing";

export default function StepCollection({ catalogue, onChoose }: { catalogue: PublicCatalogue; onChoose: (slug: string) => void }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">What do you need made?</h2>
      <p className="mt-2 text-[15px] text-taupe">Pick one piece to start. You can add more to the same room afterwards.</p>
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
