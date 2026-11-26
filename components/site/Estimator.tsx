"use client";

import Link from "next/link";
import { useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { aed, type Priced } from "@/lib/pricing";
import { quoteHref } from "@/lib/quote-link";
import { whatsappLink } from "@/lib/site";

export interface EstimatorItem {
  slug: string;
  title: string;
  priced: Priced | null;
  depends: string[];
  send: string;
}

const fmt = (n: number) => n.toFixed(1).replace(/\.0$/, "");

function Slider({ id, label, value, min, max, onChange }: { id: string; label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="font-dm text-sm font-semibold text-charcoal">{label}</label>
        <output htmlFor={id} className="font-accent text-2xl font-medium text-charcoal">{fmt(value)} m</output>
      </div>
      <input id={id} type="range" className="range mt-3" min={min} max={max} step={0.1} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

function PricedPanel({ item }: { item: EstimatorItem & { priced: Priced } }) {
  const [w, setW] = useState(3);
  const [h, setH] = useState(2.6);
  const [rateId, setRateId] = useState(item.priced.rates[0].id);
  const rate = item.priced.rates.find((r) => r.id === rateId) ?? item.priced.rates[0];
  const sqm = Math.round(w * h * 10) / 10;
  const total = sqm * rate.rate;
  const note = item.title + ": about " + fmt(w) + " m wide by " + fmt(h) + " m high (" + fmt(sqm) + " sq m), " + rate.label.toLowerCase() + ". Website guide price " + aed(total) + ".";

  return (
    <div>
      <h3 className="font-accent text-[2rem] font-medium leading-tight text-charcoal sm:text-[2.4rem]">{item.title}</h3>
      <p className="mt-2 font-dm text-sm text-taupe">From</p>
      <p className="font-accent text-3xl font-medium text-gold-dark">{aed(item.priced.from)} <span className="text-2xl">per {item.priced.unit}</span></p>

      <p id={"door-" + item.slug} className="mt-6 font-dm text-sm font-semibold text-charcoal">Choose the doors</p>
      <div role="radiogroup" aria-labelledby={"door-" + item.slug} className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {item.priced.rates.map((r) => {
          const on = r.id === rateId;
          return (
            <button key={r.id} type="button" role="radio" aria-checked={on} onClick={() => setRateId(r.id)} className={"rounded-xl border p-3.5 text-left transition-colors " + (on ? "border-charcoal bg-charcoal text-white" : "border-border bg-white text-charcoal hover:border-charcoal/50")}>
              <span className="block font-dm text-[14px] font-semibold leading-tight">{r.label}</span>
              <span className={"mt-1 block font-dm text-[13px] " + (on ? "text-white/75" : "text-taupe")}>{aed(r.rate)} per {item.priced.unit}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl bg-sand p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Slider id={"w-" + item.slug} label="Width of the wall" value={w} min={1} max={8} onChange={setW} />
          <Slider id={"h-" + item.slug} label="Height" value={h} min={2} max={3.6} onChange={setH} />
        </div>
        <div className="mt-6 border-t border-charcoal/10 pt-5" aria-live="polite">
          <p className="font-dm text-[13px] text-taupe">{fmt(sqm)} sq m of cabinet front &times; {aed(rate.rate)}</p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
            <span className="font-dm text-sm text-taupe">Starting budget</span>
            <span className="font-accent text-[2.5rem] font-medium leading-none text-charcoal sm:text-5xl">{aed(total)}</span>
          </p>
          <p className="mt-2.5 font-dm text-[12.5px] leading-relaxed text-taupe">A guide for the cabinets only, in AED. {item.priced.covers.split(". ")[1]} Your exact quotation follows the free home visit.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        <Link href={quoteHref({ item: item.slug, note })} className="btn-accent">Request a quote for this <span aria-hidden="true">&#8599;</span></Link>
        <a href={whatsappLink("Hello, I used the price guide on your website. " + note + " Could you send me an exact quotation?")} target="_blank" rel="noopener noreferrer" className="btn-line"><WhatsAppIcon className="h-4 w-4 text-[#128C4B]" /> Ask on WhatsApp</a>
      </div>
    </div>
  );
}

function VisitPanel({ item }: { item: EstimatorItem }) {
  return (
    <div>
      <h3 className="font-accent text-[2rem] font-medium leading-tight text-charcoal sm:text-[2.4rem]">{item.title}</h3>
      <p className="mt-2 font-accent text-2xl font-medium text-gold-dark sm:text-3xl">Quoted after a free visit</p>
      <p className="mt-3 max-w-xl font-dm text-[15px] leading-relaxed text-taupe">
        Every piece is made to the size of your room, so there is no shelf price. We measure for free and give you a written quotation before you decide anything.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl bg-sand p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <p className="font-dm text-sm font-semibold text-charcoal">The price depends on</p>
          <ul className="mt-2.5 flex flex-col gap-2">
            {item.depends.map((d) => (
              <li key={d} className="flex gap-2.5 font-dm text-[14px] leading-snug text-charcoal">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" aria-hidden="true" />{d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-dm text-sm font-semibold text-charcoal">For a first rough figure, send us</p>
          <p className="mt-2.5 font-dm text-[14px] leading-relaxed text-charcoal">{item.send}</p>
          <p className="mt-3 font-dm text-[13px] leading-relaxed text-taupe">We reply on WhatsApp within a working day.</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        <Link href={quoteHref({ item: item.slug })} className="btn-accent">Request a quote for this <span aria-hidden="true">&#8599;</span></Link>
        <a href={whatsappLink("Hello, I would like a quotation for " + item.title.toLowerCase() + ". I can send photos and sizes of the room.")} target="_blank" rel="noopener noreferrer" className="btn-line"><WhatsAppIcon className="h-4 w-4 text-[#128C4B]" /> Ask on WhatsApp</a>
      </div>
    </div>
  );
}

/** Pick what you need on the left; see its price, or how its price is worked out, on the right. */
export default function Estimator({ items, initial }: { items: EstimatorItem[]; initial?: string }) {
  const [slug, setSlug] = useState(initial && items.some((i) => i.slug === initial) ? initial : items[0].slug);
  const item = items.find((i) => i.slug === slug) ?? items[0];

  // A single item (a collection page) needs no list: just its panel.
  if (items.length === 1) {
    return (
      <div className="rounded-3xl border border-border bg-white p-5 shadow-card sm:p-8">
        {item.priced ? <PricedPanel item={{ ...item, priced: item.priced }} /> : <VisitPanel item={item} />}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-white p-3 shadow-card sm:p-5 lg:p-7">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-9">
        <div className="lg:col-span-4">
          <label htmlFor="est-item" className="field-label lg:hidden">What do you need?</label>
          <select id="est-item" className="field lg:hidden" value={slug} onChange={(e) => setSlug(e.target.value)}>
            {items.map((i) => (
              <option key={i.slug} value={i.slug}>{i.title + (i.priced ? " · from " + aed(i.priced.from) : "")}</option>
            ))}
          </select>
          <ul className="hidden flex-col gap-1 lg:flex" role="tablist" aria-label="What do you need?">
            {items.map((i) => {
              const on = i.slug === slug;
              return (
                <li key={i.slug}>
                  <button type="button" role="tab" aria-selected={on} onClick={() => setSlug(i.slug)} className={"flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left font-dm text-[14.5px] transition-colors " + (on ? "bg-charcoal font-semibold text-white" : "text-charcoal hover:bg-sand")}>
                    <span>{i.title}</span>
                    <span className={"shrink-0 text-right text-[13px] " + (on ? "text-white/85" : i.priced ? "font-semibold text-gold-dark" : "text-taupe")}>{i.priced ? "from " + i.priced.from.toLocaleString("en-US") : "After visit"}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-2 sm:p-3 lg:col-span-8 lg:p-0" role="tabpanel">
          {item.priced ? <PricedPanel key={item.slug} item={{ ...item, priced: item.priced }} /> : <VisitPanel key={item.slug} item={item} />}
        </div>
      </div>
    </div>
  );
}
