"use client";

import { aedRange, trimNumber, unitWords } from "@/lib/estimate-format";
import type { EstimateResult } from "@/lib/pricing";

interface Props {
  result: EstimateResult | null;
  count: number;
  loading: boolean;
  onView: () => void;
  onReset: () => void;
  viewing: boolean;
}

/** Running total. A compact strip under the navbar on phones, a card beside the steps on desktop. */
export default function BasketSummary({ result, count, loading, onView, onReset, viewing }: Props) {
  if (count === 0) {
    return (
      <div className="hidden border border-border bg-beige-light p-6 lg:block">
        <p className="font-serif text-xl text-charcoal">Your room</p>
        <p className="mt-2 text-[14px] text-taupe">Items you estimate are added here with a running total. Nothing is saved on our side.</p>
      </div>
    );
  }
  return (
    <div className="sticky top-[84px] z-30 -mx-6 border-y border-border bg-beige-light px-6 py-3 lg:static lg:mx-0 lg:border lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13px] text-taupe">{count} {count === 1 ? "item" : "items"} in your room</p>
          <p className="truncate font-serif text-[20px] leading-tight text-charcoal lg:text-2xl" aria-live="polite">
            {loading && !result ? "Calculating..." : result ? aedRange(result.total.min, result.total.max) : ""}
          </p>
        </div>
        {!viewing && (
          <button type="button" onClick={onView} className="btn-line min-h-[44px] shrink-0 px-4 text-[14px]">View</button>
        )}
      </div>
      {result && (
        <ul className="mt-4 hidden flex-col gap-2 border-t border-border pt-4 text-[14px] text-taupe lg:flex">
          {result.lines.map((l, i) => (
            <li key={i} className="flex justify-between gap-3">
              <span className="truncate">{l.title}, {trimNumber(l.size)} {unitWords(l.size, l.unitLabel)}</span>
              <span className="shrink-0 text-charcoal">{aedRange(l.range.min, l.range.max)}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 hidden text-[13px] text-taupe lg:block">Excludes 5% VAT. <button type="button" onClick={onReset} className="underline underline-offset-4 hover:text-charcoal">Start over</button></p>
    </div>
  );
}
