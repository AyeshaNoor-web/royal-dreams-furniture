import Reveal from "@/components/motion/Reveal";
import QuickEstimate from "@/components/estimator/QuickEstimate";
import { estimatorEnabled } from "@/lib/flags";
import { publicCatalogue } from "@/lib/pricing";

/** Home page entry to the estimator: the first three steps inline, with a live range. Hidden while ESTIMATOR_ENABLED is false. */
export default function EstimatorTeaser() {
  if (!estimatorEnabled) return null;
  // Units, bounds and option names only. Rates never leave lib/pricing.ts.
  const catalogue = publicCatalogue();
  return (
    <section id="estimate" className="scroll-mt-24 bg-beige py-12 sm:py-16 lg:py-24" aria-labelledby="estimate-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-8 max-w-2xl sm:mb-10">
          <h2 id="estimate-heading" className="ruled-heading font-serif text-display-md text-charcoal">Instant budget range.</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-taupe">
            Pick a piece, slide to its size and choose a finish level. The range updates as you go, with no contact details asked. The exact quotation follows the free site measurement and 3D design.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <QuickEstimate catalogue={catalogue} />
        </Reveal>
      </div>
    </section>
  );
}
