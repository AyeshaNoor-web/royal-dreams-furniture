"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import type { PublicCatalogue } from "@/lib/pricing";
import BasketSummary from "./BasketSummary";
import EstimateResult from "./EstimateResult";
import StepCollection from "./StepCollection";
import { StepEmirate, StepExtras, StepTier } from "./StepChoices";
import StepSize from "./StepSize";
import { useEstimator, type Step } from "./useEstimator";

const labels: Record<Step, string> = { collection: "Piece", size: "Size", tier: "Finish", extras: "Options", emirate: "Emirate", result: "Estimate" };

export default function EstimatorFlow({ catalogue }: { catalogue: PublicCatalogue }) {
  const e = useEstimator(catalogue);
  const reduce = useReducedMotion();
  const top = useRef<HTMLDivElement>(null);

  const steps: Step[] = ["collection", "size", "tier", ...(e.collection?.extras.length ? ["extras" as const] : []), ...(catalogue.emirateStep ? ["emirate" as const] : []), "result"];
  const index = steps.indexOf(e.step);
  const go = (s: Step) => { e.setStep(s); top.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); };

  return (
    <div ref={top} className="mx-auto grid max-w-7xl scroll-mt-24 grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-16">
      <div className="order-first lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2">
        <BasketSummary result={e.result} count={e.items.length} loading={e.loading} viewing={e.step === "result"} onView={() => go("result")} onReset={e.reset} />
      </div>

      <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
        <ol className="flex flex-wrap gap-x-4 gap-y-1 text-[13px]" aria-label="Steps">
          {steps.map((s, i) => (
            <li key={s} className={"flex items-center gap-1.5 " + (i === index ? "text-charcoal" : "text-taupe")} aria-current={i === index ? "step" : undefined}>
              <span className={"flex h-5 w-5 items-center justify-center rounded-full border text-[11px] " + (i <= index ? "border-charcoal bg-charcoal text-beige-light" : "border-border")}>{i + 1}</span>
              {labels[s]}
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={e.step}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-8"
          >
            {e.step === "collection" && <StepCollection catalogue={catalogue} onChoose={e.choose} onPreset={(id) => { e.applyPreset(id); go("result"); }} />}
            {e.step === "size" && e.collection && <StepSize collection={e.collection} value={e.draft.size ?? NaN} onChange={e.setSize} onNext={e.next} onBack={e.back} />}
            {e.step === "tier" && <StepTier tiers={catalogue.tiers} value={e.draft.tier} onChange={e.setTier} onNext={() => (steps[index + 1] === "result" ? e.finish() : e.next())} onBack={e.back} />}
            {e.step === "extras" && e.collection && <StepExtras collection={e.collection} value={e.draft.extras} onToggle={e.toggleExtra} onNext={() => (steps[index + 1] === "result" ? e.finish() : e.next())} onBack={e.back} />}
            {e.step === "emirate" && <StepEmirate emirates={catalogue.emirates} value={e.draft.emirate} onChange={e.setEmirate} onNext={e.finish} onBack={e.back} />}
            {e.step === "result" && (
              e.items.length === 0
                ? <div><p className="text-[16px] text-taupe">Your room is empty.</p><button type="button" onClick={e.addAnother} className="btn-dark mt-6 min-h-[48px]">Choose a piece</button></div>
                : <EstimateResult result={e.result} loading={e.loading} error={e.error} catalogue={catalogue} onAddAnother={() => go("collection")} onRemove={e.remove} onRetry={e.retry} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
