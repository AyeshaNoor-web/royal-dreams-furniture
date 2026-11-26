import Reveal from "@/components/motion/Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Kept for call-site compatibility. */
  accent?: string[];
}

/** Inner pages open on the same pine band as the home hero, tucked under the floating nav. */
export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="pine-stage on-dark relative -mt-[72px] overflow-hidden rounded-b-[2.25rem] pt-[72px] text-beige lg:-mt-[84px] lg:rounded-b-[3.5rem] lg:pt-[84px]">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-6 lg:px-10 lg:pb-16 lg:pt-16">
        <Reveal y={12}>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="max-w-4xl font-serif text-display-xl text-beige">{title}</h1>
          {intro && <p className="lede mt-5 max-w-2xl text-beige/80">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}
