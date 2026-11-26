"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { planPieces, startPlan } from "@/lib/plan";
import { QUOTE_LINK } from "@/lib/site";

const first = planPieces.filter((p) => ["sofas", "beds", "fitted-wardrobes", "walk-in-closets", "tv-units", "wall-paneling", "dining-tables", "curtains"].includes(p.id));

/** Step one of the quote, asked in the hero: tap what you need, then carry on in the planner with it already chosen. */
export default function HeroPicker() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="rounded-4xl border border-beige/15 bg-ink/40 p-4 backdrop-blur-sm sm:p-6">
      <p id="hero-pick" className="flex items-center gap-2 text-[14px] font-semibold text-beige">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[12px] font-bold text-ink">1</span>
        What are you planning? Tap all that apply.
      </p>
      <div role="group" aria-labelledby="hero-pick" className="mt-3 flex flex-wrap gap-2">
        {first.map((p) => (
          <button key={p.id} type="button" aria-pressed={picked.includes(p.id)} onClick={() => toggle(p.id)} className="chip-dark">
            {p.label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={() => startPlan({ pieces: picked })} className="btn-lit w-full sm:w-auto">
          {picked.length ? "Continue with " + picked.length + " selected" : "Get my free quote"} <span aria-hidden="true">&rarr;</span>
        </button>
        <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center justify-center gap-2 text-[14px] font-semibold text-beige/85 underline decoration-beige/30 underline-offset-4 hover:text-beige hover:decoration-beige">
          <WhatsAppIcon className="h-[18px] w-[18px] text-whatsapp" /> or just send a photo on WhatsApp
        </a>
      </div>
    </div>
  );
}
