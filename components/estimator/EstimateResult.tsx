"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { aedRange, summaryText, trimNumber, unitWords } from "@/lib/estimate-format";
import type { EstimateResult as Result, PublicCatalogue } from "@/lib/pricing";
import { SITE, VISIT_LINK, whatsappLink } from "@/lib/site";
import EstimateLeadForm from "./EstimateLeadForm";

interface Props {
  result: Result | null;
  loading: boolean;
  error: string;
  catalogue: PublicCatalogue;
  onAddAnother: () => void;
  onRemove: (index: number) => void;
  onRetry: () => void;
}

const Skeleton = () => (
  <div className="animate-pulse" aria-hidden="true">
    <div className="h-4 w-40 bg-beige-dark" />
    <div className="mt-4 h-10 w-72 bg-beige-dark" />
    <div className="mt-6 h-4 w-full bg-beige-dark" />
    <div className="mt-2 h-4 w-5/6 bg-beige-dark" />
  </div>
);

export default function EstimateResult({ result, loading, error, catalogue, onAddAnother, onRemove, onRetry }: Props) {
  const [showForm, setShowForm] = useState(false);
  const summary = result ? summaryText(result, SITE.url) : "";
  const wa = whatsappLink("Hello, I used the estimator on your website.\n\n" + summary + "\n\nCould we arrange the free home visit?");

  return (
    <div aria-live="polite">
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">Your indicative estimate</h2>
      {loading && !result && <div className="mt-6"><Skeleton /></div>}
      {error && (
        <div role="alert" className="mt-6 border border-border bg-beige-light p-5">
          <p className="text-[15px] text-charcoal">{error}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={onRetry} className="btn-line min-h-[44px]">Try again</button>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-dark min-h-[44px]"><WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp</a>
          </div>
        </div>
      )}
      {result && (
        <>
          <p className="tnum mt-4 font-serif text-[2rem] leading-none text-charcoal sm:text-[2.5rem]">{aedRange(result.total.min, result.total.max)}</p>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-taupe">{result.disclaimer}</p>

          <ul className="mt-6 divide-y divide-border border-y border-border">
            {result.lines.map((l, i) => (
              <li key={i} className="flex items-start justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="font-serif text-[18px] text-charcoal">{l.title}, {l.tierLabel.toLowerCase()}</p>
                  <p className="mt-1 text-[14px] text-taupe">{trimNumber(l.size)} {unitWords(l.size, l.unitLabel)}{l.extras.length ? ", with " + l.extras.map((e) => e.label.toLowerCase()).join(", ") : ""}</p>
                  <p className="mt-1 text-[13px] text-taupe">How it is worked out: {l.formula}.</p>
                  {l.clamped && <p className="mt-1 text-[13px] text-taupe">Size adjusted to the range we can estimate online.</p>}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[15px] text-charcoal">{aedRange(l.range.min, l.range.max)}</p>
                  <button type="button" onClick={() => onRemove(i)} className="mt-1 min-h-[32px] text-[13px] text-taupe underline underline-offset-4 hover:text-charcoal" aria-label={"Remove " + l.title}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-4 text-[14px] text-taupe sm:grid-cols-2">
            <div>
              <p className="text-charcoal">Included</p>
              <ul className="mt-1 flex flex-col gap-1">{catalogue.included.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <p className="text-charcoal">Not included</p>
              <ul className="mt-1 flex flex-col gap-1">{catalogue.excluded.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa min-h-[48px]"><WhatsAppIcon className="h-[18px] w-[18px]" /> Get a quote on WhatsApp</a>
            <button type="button" onClick={() => setShowForm((s) => !s)} className="btn-line min-h-[48px]" aria-expanded={showForm}>Send me this estimate</button>
            <a href={VISIT_LINK} target="_blank" rel="noopener noreferrer" className="btn-line min-h-[48px]">Book a free visit</a>
            <button type="button" onClick={onAddAnother} className="btn-line min-h-[48px]">Add another item</button>
          </div>
          {showForm && <EstimateLeadForm summary={summary} whatsapp={wa} />}
        </>
      )}
    </div>
  );
}
