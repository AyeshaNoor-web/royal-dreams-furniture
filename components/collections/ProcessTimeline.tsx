import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { processSteps } from "@/lib/collection-notes";
import { showDraftCopy } from "@/lib/flags";

/** Four stages from first message to finished room, as a compact timeline under each collection. */
export default function ProcessTimeline() {
  if (!showDraftCopy) return null;
  return (
    <section className="section-rule bg-beige-light py-12 sm:py-16 lg:py-20" aria-labelledby="process-timeline" data-placeholder-copy="client to confirm">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 id="process-timeline" className="ruled-heading font-serif text-display-md text-charcoal">How it goes</h2>
        <p className="mt-3 max-w-xl text-[15px] text-taupe">The first visit and the 3D design are free, and nothing is built until you approve it.</p>
        <Stagger className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <StaggerItem key={s.title} className="relative border-l border-border py-5 pl-6 sm:pr-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-6">
              <span aria-hidden="true" className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-gold lg:-top-[5px] lg:left-0" />
              <p className="font-serif text-2xl text-charcoal">0{i + 1}</p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">{s.title}</h3>
              <p className="mt-1 text-[12px] uppercase tracking-wider text-taupe">{s.where}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-taupe">{s.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
