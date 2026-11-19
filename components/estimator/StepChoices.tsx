"use client";

import type { PublicCatalogue, PublicCollection } from "@/lib/pricing";
import StepNav from "./StepNav";

const card = (on: boolean) =>
  "flex w-full items-start gap-3 border px-4 py-4 text-left transition-colors [touch-action:manipulation] " +
  (on ? "border-charcoal bg-beige-light" : "border-border bg-beige-light/60 hover:border-charcoal/60");

const Mark = ({ on, round }: { on: boolean; round: boolean }) => (
  <span aria-hidden="true" className={"mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-charcoal/50 " + (round ? "rounded-full" : "") + (on ? " bg-charcoal" : "")}>
    {on && <span className={"block bg-beige-light " + (round ? "h-2 w-2 rounded-full" : "h-2.5 w-2.5")} />}
  </span>
);

interface TierProps { tiers: PublicCatalogue["tiers"]; value?: string; onChange: (t: PublicCatalogue["tiers"][number]["id"]) => void; onNext: () => void; onBack: () => void }

export function StepTier({ tiers, value, onChange, onNext, onBack }: TierProps) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">Which finish level?</h2>
      <p className="mt-2 text-[15px] text-taupe">Samples come to your home before anything is decided. This only sets the range.</p>
      <div role="radiogroup" aria-label="Finish level" className="mt-6 flex flex-col gap-3">
        {tiers.map((t) => {
          const on = value === t.id;
          return (
            <button key={t.id} type="button" role="radio" aria-checked={on} onClick={() => onChange(t.id)} className={card(on)}>
              <Mark on={on} round />
              <span>
                <span className="block font-serif text-[18px] text-charcoal">{t.label}</span>
                <span className="mt-0.5 block text-[14px] text-taupe">{t.blurb}</span>
              </span>
            </button>
          );
        })}
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextDisabled={!value} />
    </div>
  );
}

interface ExtrasProps { collection: PublicCollection; value: string[]; onToggle: (id: string) => void; onNext: () => void; onBack: () => void }

export function StepExtras({ collection, value, onToggle, onNext, onBack }: ExtrasProps) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">Any options?</h2>
      <p className="mt-2 text-[15px] text-taupe">Tick what you would like included. Skip if you are not sure.</p>
      <div className="mt-6 flex flex-col gap-3">
        {collection.extras.map((e) => {
          const on = value.includes(e.id);
          return (
            <button key={e.id} type="button" role="checkbox" aria-checked={on} onClick={() => onToggle(e.id)} className={card(on)}>
              <Mark on={on} round={false} />
              <span className="font-dm text-[16px] text-charcoal">{e.label}</span>
            </button>
          );
        })}
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextLabel={value.length ? "See my estimate" : "Skip, see my estimate"} />
    </div>
  );
}

interface EmirateProps { emirates: PublicCatalogue["emirates"]; value?: string; onChange: (id: string) => void; onNext: () => void; onBack: () => void }

export function StepEmirate({ emirates, value, onChange, onNext, onBack }: EmirateProps) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">Where is the home?</h2>
      <p className="mt-2 text-[15px] text-taupe">Travel for the visit and installation is priced by emirate.</p>
      <div role="radiogroup" aria-label="Emirate" className="mt-6 grid grid-cols-2 gap-3">
        {emirates.map((e) => {
          const on = value === e.id;
          return (
            <button key={e.id} type="button" role="radio" aria-checked={on} onClick={() => onChange(e.id)} className={card(on)}>
              <Mark on={on} round />
              <span className="font-dm text-[16px] text-charcoal">{e.label}</span>
            </button>
          );
        })}
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextLabel="See my estimate" nextDisabled={!value} />
    </div>
  );
}
