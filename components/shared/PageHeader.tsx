import Reveal from "@/components/motion/Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Kept for call-site compatibility; the title no longer animates word by word. */
  accent?: string[];
}

export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="bg-beige-light border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10 lg:pt-16 lg:pb-14">
        <Reveal y={12}>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="font-serif text-display-lg text-charcoal max-w-3xl">{title}</h1>
          {intro && <p className="mt-6 max-w-xl font-dm text-base text-taupe leading-relaxed">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}
