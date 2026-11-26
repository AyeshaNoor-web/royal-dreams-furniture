import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { readyMadeNotes } from "@/lib/collection-notes";
import { VISIT_LINK } from "@/lib/site";
import { showDraftCopy } from "@/lib/flags";

/** Honest comparison for the collections where visitors weigh shop-bought against made-to-measure. Copy is a placeholder for the client. */
export default function CustomOrReadyMade({ slug }: { slug: string }) {
  const note = readyMadeNotes.find((n) => n.slug === slug);
  if (!showDraftCopy || !note) return null;
  return (
    <section className="section-rule bg-beige py-12 sm:py-16 lg:py-20" data-placeholder-copy="client to rewrite">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <Reveal className="lg:col-span-4">
          <h2 className="ruled-heading font-serif text-display-md text-charcoal">{note.heading}</h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-taupe">{note.verdict}</p>
          <a href={VISIT_LINK} target="_blank" rel="noopener noreferrer" className="btn-line mt-6 min-h-[48px]">
            <WhatsAppIcon className="h-[18px] w-[18px]" /> Book a free visit
          </a>
        </Reveal>
        <Reveal delay={0.08} className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          <div className="rounded-4xl bg-beige-light p-6 lg:p-8">
            <p className="text-[13px] uppercase tracking-wider text-taupe">Ready-made</p>
            <p className="mt-3 text-[16px] leading-relaxed text-charcoal">{note.readyMade}</p>
          </div>
          <div className="rounded-4xl bg-sage p-6 lg:p-8">
            <p className="text-[13px] uppercase tracking-wider text-taupe">Made to measure</p>
            <p className="mt-3 text-[16px] leading-relaxed text-charcoal">{note.madeToMeasure}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
