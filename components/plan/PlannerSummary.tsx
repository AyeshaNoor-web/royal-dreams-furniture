import type { PlanState } from "./Planner";

const included = ["Home visit and measurement", "3D design of your room", "Written quotation", "Samples brought to you"];

/** The brief building up beside the questions, with what the visitor gets for free underneath. */
export default function PlannerSummary({ state: s, labelOf }: { state: PlanState; labelOf: (id: string) => string }) {
  const rows = [
    { k: "Making", v: s.pieces.length ? s.pieces.map(labelOf).join(", ") : "" },
    { k: "Where", v: s.emirate },
    { k: "When", v: s.timing },
    { k: "Notes", v: s.note },
  ];
  return (
    <aside aria-label="Your brief" className="rounded-4xl bg-beige p-6 text-charcoal shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] lg:sticky lg:top-28 lg:-rotate-1 lg:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-[24px] font-semibold">Your brief</h3>
        <span className="rounded-full bg-sage px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-pine">Draft</span>
      </div>
      <dl className="mt-4 flex flex-col">
        {rows.map((r) => (
          <div key={r.k} className="flex gap-4 border-t border-dashed border-charcoal/20 py-3">
            <dt className="w-16 shrink-0 text-[13px] font-semibold uppercase tracking-wide text-taupe">{r.k}</dt>
            <dd className={"min-w-0 break-words text-[15px] " + (r.v ? "font-semibold text-charcoal" : "text-taupe-light")}>{r.v || (r.k === "Notes" ? "Nothing added" : "Not chosen yet")}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-2 rounded-3xl bg-beige-light p-4">
        <p className="flex items-baseline justify-between text-[14px] font-semibold text-charcoal">
          Included with every quote <span className="font-serif text-[20px] font-bold tracking-tight">AED 0</span>
        </p>
        <ul className="mt-2 grid grid-cols-1 gap-1.5 text-[14px] text-charcoal/80 sm:grid-cols-2 lg:grid-cols-1">
          {included.map((x) => (
            <li key={x} className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[#128C4B]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
