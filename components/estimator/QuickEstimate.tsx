"use client";

import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { aedRange, summaryText, trimNumber, unitWords } from "@/lib/estimate-format";
import type { PublicCatalogue } from "@/lib/pricing";
import { SITE, whatsappLink } from "@/lib/site";
import { useQuickEstimate } from "./useQuickEstimate";

const label = "block text-[13px] uppercase tracking-wider text-taupe";
const field = "mt-2 w-full border border-border bg-beige-light px-3 py-3 font-dm text-[16px] text-charcoal focus:border-gold-dark";

/** Three controls and a live range. Everything else (basket, extras, lead form) lives on /estimator. */
export default function QuickEstimate({ catalogue }: { catalogue: PublicCatalogue }) {
  const q = useQuickEstimate(catalogue);
  const { min, max, step } = q.collection.size;
  const line = q.result?.lines[0];
  const wa = q.result ? whatsappLink("Hello, I used the estimator on your website.\n\n" + summaryText(q.result, SITE.url) + "\n\nCould we arrange the free home visit?") : "";

  return (
    <div className="grid gap-6 border border-border bg-beige-light p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
        <div className="sm:col-span-2">
          <label htmlFor="qe-collection" className={label}>1. The piece</label>
          <select id="qe-collection" value={q.slug} onChange={(e) => q.choose(e.target.value)} className={field}>
            {catalogue.collections.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="qe-size" className={label}>2. Size, in {q.collection.unitLabel}</label>
          <div className="mt-2 flex items-center gap-4">
            <input id="qe-size" type="range" min={min} max={max} step={step} value={Number.isFinite(q.size) ? q.size : min} onChange={(e) => q.setSize(Number(e.target.value))} className="h-11 flex-1 cursor-pointer accent-charcoal" />
            <input aria-label={"Size in " + q.collection.unitLabel} type="number" inputMode="decimal" min={min} max={max} step={step} value={Number.isFinite(q.size) ? q.size : ""} onChange={(e) => q.setSize(e.target.value === "" ? NaN : Number(e.target.value))} onBlur={() => Number.isFinite(q.size) && q.setSize(Math.min(max, Math.max(min, q.size)))} className="w-24 border border-border bg-beige-light px-3 py-2.5 font-dm text-[16px] text-charcoal focus:border-gold-dark" />
          </div>
          <p className="mt-1 text-[13px] text-taupe">{q.collection.hint} {trimNumber(min)} to {trimNumber(max)} {q.collection.unitLabel}.</p>
        </div>
        <div className="sm:col-span-2">
          <p className={label}>3. Finish level</p>
          <div role="radiogroup" aria-label="Finish level" className="mt-2 grid grid-cols-3 gap-2">
            {catalogue.tiers.map((t) => (
              <button key={t.id} type="button" role="radio" aria-checked={q.tier === t.id} onClick={() => q.setTier(t.id)} className={"min-h-[44px] border px-3 py-2 font-dm text-[14px] transition-colors [touch-action:manipulation] " + (q.tier === t.id ? "border-charcoal bg-charcoal text-beige-light" : "border-border bg-beige text-charcoal hover:border-charcoal/60")}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between border-t border-border pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" aria-live="polite">
        <div>
          <p className="text-[13px] uppercase tracking-wider text-taupe">Indicative range</p>
          {q.error ? (
            <p role="alert" className="mt-3 text-[15px] text-charcoal">{q.error}</p>
          ) : (
            <p className={"tnum mt-2 font-serif text-[2rem] leading-none text-charcoal sm:text-[2.5rem] " + (q.loading ? "opacity-50" : "")}>
              {q.result ? aedRange(q.result.total.min, q.result.total.max) : "Calculating\u2026"}
            </p>
          )}
          {line && <p className="mt-3 text-[14px] text-taupe">{line.title}, {trimNumber(line.size)} {unitWords(line.size, line.unitLabel)}, {line.tierLabel.toLowerCase()}. {q.result?.disclaimer}</p>}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {q.result && <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa min-h-[48px]"><WhatsAppIcon className="h-[18px] w-[18px]" /> Discuss on WhatsApp</a>}
          <Link href={"/estimator?c=" + q.slug} className="btn-line min-h-[48px]">Plan a whole room <span aria-hidden="true">&rarr;</span></Link>
        </div>
      </div>
    </div>
  );
}
