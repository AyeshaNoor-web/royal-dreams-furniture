import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import PlanButton from "@/components/plan/PlanButton";
import { categories } from "@/lib/gallery";

/** Every collection as a doorway: look at the work, or put it straight into a quote. */
export default function PieceGrid() {
  return (
    <section className="py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-4">Eleven collections</p>
            <h2 className="max-w-2xl font-serif text-display-lg text-charcoal">What shall we <span className="accent text-gold-text">make</span> for you?</h2>
          </div>
          <p className="max-w-sm text-[16px] text-taupe">Open a collection to see finished homes, or tap the plus to add it to your free quote.</p>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 lg:gap-y-10">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={0.04 * (i % 4)} className="group">
                <div className="relative">
                  <Link href={"/collections/" + c.slug} aria-label={c.title + ": see finished homes"} className={"relative block aspect-[4/5] overflow-hidden bg-beige-dark " + (i % 2 === 0 ? "arch" : "rounded-4xl")}>
                    <Image src={c.cover.src} alt={c.cover.alt} fill sizes="(min-width: 1024px) 23vw, (min-width: 768px) 31vw, 47vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                  </Link>
                  <PlanButton pieces={[c.slug]} ariaLabel={"Add " + c.title + " to my free quote"} className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink shadow-[0_10px_24px_-8px_rgba(0,0,0,0.55)] transition-transform duration-200 hover:scale-110">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                  </PlanButton>
                </div>
                <Link href={"/collections/" + c.slug} className="mt-3 block">
                  <h3 className="font-serif text-[19px] font-semibold text-charcoal lg:text-[22px]">{c.title}</h3>
                  <p className="mt-1 hidden text-[14px] leading-snug text-taupe sm:block">{c.short}</p>
                </Link>
              </Reveal>
            </li>
          ))}
          <li>
            <Reveal delay={0.12} className="flex aspect-[4/5] flex-col justify-between rounded-4xl bg-pine p-5 text-beige lg:p-7">
              <p className="font-serif text-[22px] font-semibold leading-tight tracking-tight lg:text-[28px]">Kitchen cabinets, or something <span className="accent text-gold">nobody sells?</span></p>
              <div>
                <p className="hidden text-[14px] text-beige/75 sm:block">If it is joinery and it has to fit a wall, we probably make it.</p>
                <PlanButton pieces={["other"]} className="btn-lit mt-4 min-h-[46px] w-full px-4 text-[14px]">Ask us</PlanButton>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
