"use client";

interface Props {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export default function StepNav({ onBack, onNext, nextLabel = "Continue", nextDisabled = false }: Props) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <button type="button" onClick={onNext} disabled={nextDisabled} className="btn-dark min-h-[48px] [touch-action:manipulation] disabled:opacity-50">
        {nextLabel} <span aria-hidden="true">&rarr;</span>
      </button>
      <button type="button" onClick={onBack} className="min-h-[44px] px-3 text-link text-charcoal [touch-action:manipulation] hover:text-gold-text">
        Back
      </button>
    </div>
  );
}
