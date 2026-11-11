import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { pick } from "@/lib/gallery";

const banners = [
  { image: pick("sofas", 29), title: "Majlis seating made for the way you host", href: "/collections/sofas?type=majlis", cta: "Explore majlis & sofas" },
  { image: pick("beds", 1), title: "Beds with the headboard wall built in", href: "/collections/beds", cta: "Explore beds" },
];

export default function PromoBanners() {
  return (
    <section className="pb-16 lg:pb-24 bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {banners.map((b, i) => (
          <Reveal key={b.href} delay={i * 0.1}>
            <Link href={b.href} className="group relative block aspect-[4/3] md:aspect-[5/4] overflow-hidden bg-beige-dark">
              <Image src={b.image.src} alt={b.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9 text-beige-light">
                <h3 className="font-serif text-2xl lg:text-3xl leading-tight max-w-md">{b.title}</h3>
                <span className="btn-glass-light mt-5">{b.cta}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
