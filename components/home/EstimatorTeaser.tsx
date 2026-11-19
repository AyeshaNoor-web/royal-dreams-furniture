import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { estimatorEnabled } from "@/lib/flags";

/** Home page entry to the estimator. Renders nothing while ESTIMATOR_ENABLED is false. */
export default function EstimatorTeaser() {
  if (!estimatorEnabled) return null;
  return (
    <section className="bg-beige py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="grid gap-8 border border-border bg-beige-light p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-display-md text-charcoal">Want a budget range before the visit?</h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-taupe">
              Pick a piece, its size and finish level and see an indicative range in dirhams in under a minute. Add several pieces to plan a room. No contact details needed to see the number.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link href="/estimator" className="btn-dark min-h-[48px]">Try the estimator <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
