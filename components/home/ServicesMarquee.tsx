import Marquee from "@/components/motion/Marquee";
import { services } from "@/lib/site";

export default function ServicesMarquee() {
  return (
    <section className="relative bg-charcoal py-6 border-y border-gold/20" aria-label="Our services">
      <Marquee duration={36}>
        {services.map((s) => (
          <span key={s} className="flex items-center gap-10">
            <span className="font-serif text-2xl lg:text-3xl text-beige-light/90 whitespace-nowrap">{s}</span>
            <span className="text-gold text-lg" aria-hidden="true">&#10022;</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
