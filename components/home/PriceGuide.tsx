"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import PlanButton from "@/components/plan/PlanButton";
import { aed, cabinetRates } from "@/lib/cabinet-rates";

const fmt = (n: number) => n.toFixed(1).replace(/\.0$/, "");

function Slider({ id, label, value, min, max, onChange }: { id: string; label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-[14px] font-semibold text-charcoal">{label}</label>
        <output htmlFor={id} className="tnum font-serif text-[28px] font-semibold tracking-tight text-charcoal">{fmt(value)} m</output>
      </div>
      <input id={id} type="range" className="range" min={min} max={max} step={0.1} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ ["--fill" as string]: ((value - min) / (max - min)) * 100 + "%" }} />
    </div>
  );
}

/** The one price the client has confirmed, turned into a ten-second answer: wardrobe wall size in, guide price out. */
export default function PriceGuide() {
  const [w, setW] = useState(3);
  const [h, setH] = useState(2.6);
  const [door, setDoor] = useState(cabinetRates[0].id);
  const sqm = Math.round(w * h * 10) / 10;
  const chosen = cabinetRates.find((r) => r.id === door) ?? cabinetRates[0];
  const note = "Wardrobe wall about " + fmt(w) + " m wide by " + fmt(h) + " m high (" + fmt(sqm) + " sqm), " + chosen.label.toLowerCase() + ". Website guide price " + aed(sqm * chosen.rate) + ".";

  return (
    <section id="prices" className="bg-beige-light py-12 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-4">Wardrobe price guide</p>
          <h2 className="font-serif text-display-lg text-charcoal">Know the price <span className="accent text-gold-text">before</span> you ask.</h2>
          <p className="mt-5 max-w-md text-[16px] text-taupe">
            Fitted wardrobes and walk-in closets are priced per square metre of cabinet front: the width of the wall times its height. The door type sets the rate.
          </p>
          <ul className="mt-6 flex flex-col gap-2">
            {cabinetRates.map((r) => (
              <li key={r.id} className="flex items-baseline justify-between gap-4 border-b border-charcoal/10 pb-2 text-[15px]">
                <span className="text-charcoal">{r.label}</span>
                <span className="tnum shrink-0 font-semibold text-charcoal">{aed(r.rate)} <span className="font-normal text-taupe">per sqm</span></span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] text-taupe">A guide for the cabinets only. Lighting, islands and accessories are quoted after the free measurement, and the exact quotation follows it.</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-[2rem] bg-beige p-5 shadow-[0_30px_70px_-40px_rgba(10,35,25,0.45)] ring-1 ring-charcoal/[0.06] sm:p-8 lg:rounded-[2.5rem]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
              <Slider id="pg-w" label="Wall width" value={w} min={1} max={8} onChange={setW} />
              <Slider id="pg-h" label="Height" value={h} min={2} max={3.6} onChange={setH} />
            </div>

            <p id="pg-door" className="mt-5 text-[14px] font-semibold text-charcoal">Doors</p>
            <div role="radiogroup" aria-labelledby="pg-door" className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {cabinetRates.map((r) => {
                const on = r.id === door;
                return (
                  <button key={r.id} type="button" role="radio" aria-checked={on} onClick={() => setDoor(r.id)} className={"rounded-3xl border p-4 text-left transition-colors [touch-action:manipulation] " + (on ? "border-pine bg-pine text-beige" : "border-charcoal/15 bg-white/60 text-charcoal hover:border-charcoal/50")}>
                    <span className="block text-[15px] font-semibold leading-tight">{r.label}</span>
                    <span className={"mt-1 block text-[13px] leading-snug " + (on ? "text-beige/75" : "text-taupe")}>{r.blurb}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-5 rounded-3xl bg-gold-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div aria-live="polite">
                <p className="text-[13px] font-semibold text-charcoal/70">{fmt(sqm)} sqm of front &times; {aed(chosen.rate)}</p>
                <p className="tnum mt-1 font-serif text-[40px] font-bold leading-none tracking-tighter text-ink sm:text-[52px]">{aed(sqm * chosen.rate)}</p>
                <p className="mt-1.5 text-[13px] text-charcoal/70">Guide price for the cabinets</p>
              </div>
              <PlanButton pieces={["fitted-wardrobes"]} note={note} className="btn-dark shrink-0">Get my exact quote <span aria-hidden="true">&rarr;</span></PlanButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
