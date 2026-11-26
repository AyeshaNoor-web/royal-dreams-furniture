import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { reviews } from "@/lib/reviews";

/** What clients said after installation. Renders nothing until real reviews are added to lib/reviews.ts. */
export default function Reviews() {
  if (reviews.length === 0) return null;
  return (
    <section className="border-y border-border bg-beige-light py-12 sm:py-16 lg:py-24" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-10 max-w-2xl lg:mb-12">
          <h2 id="reviews-heading" className="font-serif text-display-md text-charcoal">What clients say</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-taupe">In their own words, after the piece was fitted.</p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {reviews.map((r) => (
            <StaggerItem key={r.name + r.piece} className="flex h-full flex-col border border-border bg-beige p-7">
              <blockquote className="flex-1">
                <p className="font-serif text-xl leading-snug text-charcoal">&ldquo;{r.quote}&rdquo;</p>
              </blockquote>
              <footer className="mt-6 border-t border-border pt-4 text-[14px]">
                <p className="text-charcoal">{r.name}, {r.area}</p>
                <p className="mt-0.5 text-taupe">{r.piece}. Sent on {r.source}.</p>
              </footer>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
