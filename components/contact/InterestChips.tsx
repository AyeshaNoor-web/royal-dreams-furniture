"use client";

const options = ["Sofa or majlis", "Bed", "Wardrobe or closet", "Media wall", "Curtains", "Dining", "Kitchen or joinery", "Something else"];

/** Large tappable chips instead of a dropdown: one tap on a phone, and the choice is visible at a glance. */
export default function InterestChips({ value, onChange, idPrefix = "interest" }: { value: string; onChange: (v: string) => void; idPrefix?: string }) {
  return (
    <div role="radiogroup" aria-labelledby={idPrefix + "-label"} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(on ? "" : o)}
            className={
              "min-h-[44px] rounded-full border px-4 font-dm text-[14px] transition-colors [touch-action:manipulation] " +
              (on ? "border-charcoal bg-charcoal text-beige" : "border-border bg-beige text-charcoal hover:border-charcoal/60")
            }
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
