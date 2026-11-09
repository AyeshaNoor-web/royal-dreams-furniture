import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { categories } from "@/lib/gallery";

const edits = [
  { image: categories[0].images[2], title: "The Paneling Edit", text: "Wainscoting, mouldings and full-height panels for majlis, corridors and living rooms.", href: "/gallery?c=wall-paneling" },
  { image: categories[3].images[1], title: "The Light Edit", text: "Backlit niches, LED strips and glass doors, designed into the furniture from the first drawing.", href: "/gallery?c=tv-units" },
  { image: categories[2].images[1], title: "The Storage Edit", text: "Floor-to-ceiling wardrobes that become part of the architecture.", href: "/gallery?c=fitted-wardrobes" },
];

export default function Inspiration() {
  const [lead, ...rest] = edits;
  return (
    <section className="py-16 lg:py-24 bg-beige-light border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-serif text-display-md text-charcoal">Ideas from recent projects</h2>
          </div>
          <Link href="/gallery" className="hidden sm:inline-block text-link hover:text-gold-text">
            Browse the gallery
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <Reveal className="lg:col-span-7">
            <Link href={lead.href} className="group block">
              <div className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden bg-beige-dark">
                <Image src={lead.image.src} alt={lead.image.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-charcoal group-hover:text-gold-dark transition-colors">{lead.title}</h3>
              <p className="mt-1 font-dm text-sm text-taupe max-w-lg">{lead.text}</p>
            </Link>
          </Reveal>
          <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6">
            {rest.map((e, i) => (
              <Reveal key={e.href} delay={0.1 + i * 0.08}>
                <Link href={e.href} className="group grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-4 items-center">
                  <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden bg-beige-dark">
                    <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 1024px) 180px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-charcoal group-hover:text-gold-dark transition-colors">{e.title}</h3>
                    <p className="mt-1 font-dm text-sm text-taupe">{e.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
