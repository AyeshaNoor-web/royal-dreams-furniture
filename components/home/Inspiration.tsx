import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { pick, type GalleryImage } from "@/lib/gallery";

interface Edit {
  image: GalleryImage;
  title: string;
  text: string;
  href: string;
}

const edits: Edit[] = [
  { image: pick("dining-tables", 1), title: "The Dining Edit", text: "Marble and stone tables with upholstered chairs, sized for the guests you host.", href: "/gallery?c=dining-tables" },
  { image: pick("curtains", 0), title: "The Curtain Edit", text: "Wave curtains with sheer and blackout layers, measured and fitted on site.", href: "/gallery?c=curtains" },
  { image: pick("tv-units", 1), title: "The Light Edit", text: "Backlit niches, LED strips and glass doors, designed into the furniture from the first drawing.", href: "/gallery?c=tv-units" },
];

function EditTile({ e, sizes, lead = false }: { e: Edit; sizes: string; lead?: boolean }) {
  return (
    <Link href={e.href} className="group relative block h-full overflow-hidden bg-beige-dark">
      <Image src={e.image.src} alt={e.image.alt} fill sizes={sizes} className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-transparent px-6 pb-5 pt-16 text-beige-light">
        <span className={"block font-serif leading-tight " + (lead ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl")}>{e.title}</span>
        <span className={"mt-1 block text-beige/80 " + (lead ? "max-w-lg text-[14px]" : "text-[13px]")}>{e.text}</span>
      </span>
    </Link>
  );
}

export default function Inspiration() {
  const [lead, ...rest] = edits;
  return (
    <section className="section-rule section-rule-b bg-beige-light py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <h2 className="ruled-heading font-serif text-display-md text-charcoal">Ideas from recent projects</h2>
          <Link href="/gallery" className="hidden text-link hover:text-gold-text sm:inline-block">Browse the gallery</Link>
        </Reveal>

        {/* Lead and the two side tiles share one fixed height on desktop so the edges line up */}
        <div className="grid grid-cols-1 gap-4 lg:h-[560px] lg:grid-cols-12 lg:gap-6">
          <Reveal className="aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:h-full">
            <EditTile e={lead} lead sizes="(min-width: 1024px) 58vw, 100vw" />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:h-full lg:grid-cols-1 lg:grid-rows-2 lg:gap-6">
            {rest.map((e, i) => (
              <Reveal key={e.href} delay={0.1 + i * 0.08} className="aspect-[4/5] lg:aspect-auto lg:h-full">
                <EditTile e={e} sizes="(min-width: 1024px) 40vw, 50vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
