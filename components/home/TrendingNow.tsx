import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getCategory, pick } from "@/lib/gallery";
import { whatsappLink } from "@/lib/site";

const picks = [
  { slug: "sofas", i: 0, name: "Cream U-shaped Sectional", note: "Marble coffee table, made to the room" },
  { slug: "beds", i: 0, name: "Bed with Lit Headboard Wall", note: "Channel-tufted headboard, bedside sconces" },
  { slug: "dining-tables", i: 0, name: "Oval Marble Dining Table", note: "Fluted base, boucle chairs" },
  { slug: "walk-in-closets", i: 0, name: "Walnut Walk-in Closet", note: "Glass doors, illuminated shelving and island" },
];

export default function TrendingNow() {
  return (
    <section className="bg-beige py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-serif text-display-md text-charcoal">Our most requested designs</h2>
          <Link href="/gallery" className="hidden text-link hover:text-gold-text sm:inline-block">View full gallery</Link>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" stagger={0.07}>
          {picks.map((p) => {
            const c = getCategory(p.slug)!;
            const img = pick(p.slug, p.i);
            const ask = whatsappLink("Hello, I saw the " + p.name + " on your website and would like to discuss something similar for my home.");
            return (
              <StaggerItem key={p.name} className="h-full">
                {/* Flex column so the Enquire link sits on the same baseline in every card */}
                <article className="group flex h-full flex-col">
                  <Link href={"/collections/" + c.slug} className="relative block aspect-[4/5] overflow-hidden bg-beige-dark">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </Link>
                  <div className="flex flex-1 flex-col pt-4">
                    <h3 className="font-serif text-lg leading-snug text-charcoal">{p.name}</h3>
                    <p className="mt-1 text-[14px] text-taupe">{c.title} · {p.note}</p>
                    <a href={ask} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex w-fit items-center gap-2 pt-4 text-link hover:text-gold-text">
                      <WhatsAppIcon className="h-3.5 w-3.5" /> Enquire
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
