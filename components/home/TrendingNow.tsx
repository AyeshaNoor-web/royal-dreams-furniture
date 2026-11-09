import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { categories } from "@/lib/gallery";
import { whatsappLink } from "@/lib/site";

const picks = [
  { cat: 0, i: 0, name: "Greige Paneled Stairwell", note: "Full-height panels beneath a cascading pendant" },
  { cat: 1, i: 0, name: "Walnut Walk-in Closet", note: "Glass doors, illuminated shelving and island" },
  { cat: 3, i: 0, name: "Backlit Media Wall", note: "Floating console with illuminated niches" },
  { cat: 2, i: 0, name: "Fluted Fitted Wardrobe", note: "Handleless doors in taupe lacquer" },
];

export default function TrendingNow() {
  return (
    <section className="py-16 lg:py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-serif text-display-md text-charcoal">Our most requested designs</h2>
          </div>
          <Link href="/gallery" className="hidden sm:inline-block text-link hover:text-gold-text">
            View full gallery
          </Link>
        </Reveal>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" stagger={0.07}>
          {picks.map((p) => {
            const c = categories[p.cat];
            const img = c.images[p.i];
            const ask = whatsappLink("Hello, I saw the " + p.name + " on your website and would like to discuss something similar for my home.");
            return (
              <StaggerItem key={p.name}>
                <article className="group">
                  <Link href={"/collections/" + c.slug} className="block relative aspect-[4/5] overflow-hidden bg-beige-dark">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </Link>
                  <div className="pt-4">
                    <h3 className="font-serif text-lg text-charcoal leading-snug">{p.name}</h3>
                    <p className="text-[14px] text-taupe mt-1">{c.title} · {p.note}</p>
                    <a href={ask} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-link hover:text-gold-text">
                      <WhatsAppIcon className="w-3.5 h-3.5" /> Enquire
                    </a>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
