import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { pick } from "@/lib/gallery";
import { SITE } from "@/lib/site";

const shots = [
  pick("sofas", 23),
  pick("beds", 4),
  pick("dining-tables", 3),
  pick("curtains", 3),
  pick("walk-in-closets", 1),
  pick("coffee-tables", 1),
];

export default function InstagramStrip() {
  return (
    <section className="border-t border-border bg-beige-light py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-display-md text-charcoal">{SITE.instagramHandle}</h2>
          </div>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-link hover:text-gold-text w-fit">
            <InstagramIcon className="w-4 h-4" /> Follow on Instagram
          </a>
        </Reveal>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
          {shots.map((s) => (
            <a key={s.src} href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden bg-beige-dark" aria-label="Open our Instagram">
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 16vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
