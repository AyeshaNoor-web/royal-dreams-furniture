"use client";

import type { PublicCollection } from "@/lib/pricing";
import { trimNumber } from "@/lib/estimate-format";
import StepNav from "./StepNav";

interface Props {
  collection: PublicCollection;
  value: number;
  onChange: (n: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const field = "w-28 border border-border bg-beige-light px-3 py-2.5 font-dm text-[16px] text-charcoal focus:border-gold-dark focus:outline-none";

export default function StepSize({ collection, value, onChange, onNext, onBack }: Props) {
  const { min, max, step } = collection.size;
  const valid = Number.isFinite(value) && value >= min && value <= max;
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">How big is it?</h2>
      <p className="mt-2 text-[15px] text-taupe">{collection.title}: enter the number of {collection.unitLabel}. {collection.hint}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <label htmlFor="est-size" className="sr-only">Number of {collection.unitLabel}</label>
        <input
          id="est-size"
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
          onBlur={() => Number.isFinite(value) && onChange(clamp(value))}
          className={field}
          aria-describedby="est-size-range"
        />
        <span className="text-[15px] text-charcoal">{collection.unitLabel}</span>
      </div>

      <label htmlFor="est-size-slider" className="sr-only">Adjust the size</label>
      <input
        id="est-size-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={Number.isFinite(value) ? clamp(value) : min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-6 h-11 w-full cursor-pointer accent-charcoal"
      />
      <div id="est-size-range" className="mt-1 flex justify-between text-[13px] text-taupe">
        <span>{trimNumber(min)}</span>
        <span>{trimNumber(max)} {collection.unitLabel}</span>
      </div>
      {!valid && (
        <p role="alert" className="mt-3 text-[14px] text-taupe">Enter a number between {trimNumber(min)} and {trimNumber(max)}. Larger projects are quoted after the site visit.</p>
      )}

      <StepNav onBack={onBack} onNext={onNext} nextDisabled={!valid} />
    </div>
  );
}
