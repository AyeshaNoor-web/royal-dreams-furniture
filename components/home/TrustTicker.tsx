const facts = ["Free home visit", "3D design before production", "Built in our Dubai workshop", "Fitted by our own team", "All seven Emirates", "Samples brought to your home", "A reply within one working day"];

const Star = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gold" fill="currentColor" aria-hidden="true"><path d="M12 0C12.9 6.6 17.4 11.1 24 12 17.4 12.9 12.9 17.4 12 24 11.1 17.4 6.6 12.9 0 12 6.6 11.1 11.1 6.6 12 0z" /></svg>
);

/** The promises, running past once the hero ends. Read by screen readers as a plain list. */
export default function TrustTicker() {
  return (
    <section aria-label="What you get" className="marquee-wrap overflow-hidden py-6 lg:py-8">
      <ul className="sr-only">{facts.map((f) => <li key={f}>{f}</li>)}</ul>
      <div className="marquee" aria-hidden="true" style={{ ["--marquee" as string]: "46s" }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-6 pr-6 lg:gap-9 lg:pr-9">
            {facts.map((f) => (
              <span key={f} className="flex items-center gap-6 whitespace-nowrap font-serif text-[22px] font-semibold tracking-tight text-charcoal lg:gap-9 lg:text-[30px]">
                {f} <Star />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
