import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { pick, type GalleryImage } from "@/lib/gallery";
import { estimatorEnabled } from "@/lib/flags";
import { QUOTE_LINK, VISIT_LINK } from "@/lib/site";

// Two streams of project cards. Each list is rendered twice so the CSS loop is seamless.
const streamA: GalleryImage[] = [
  pick("sofas", 0),
  pick("walk-in-closets", 0),
  pick("beds", 0),
  pick("tv-units", 0),
  pick("dining-tables", 0),
  pick("wall-paneling", 0),
];

const streamB: GalleryImage[] = [
  pick("curtains", 0),
  pick("fitted-wardrobes", 0),
  pick("sofas", 22),
  pick("display-shelving", 0),
  pick("beds", 1),
  pick("dressing-tables", 0),
];

// The first two cards of each stream are on screen at load. `preload` marks stream A's as high priority; stream B's
// are fetched eagerly but not preloaded, so the preload list stays short.
function Stream({ cards, down = false, preload = false, className = "" }: { cards: GalleryImage[]; down?: boolean; preload?: boolean; className?: string }) {
  const list = [...cards, ...cards];
  return (
    <div className={"hero-stream " + (down ? "hero-stream-down " : "") + className} aria-hidden="true">
      {list.map((img, i) => (
        <figure key={i} className="hero-card">
          <div className="relative aspect-[4/5] overflow-hidden bg-beige-dark">
            <Image
              src={img.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 18vw, 44vw"
              className="object-cover"
              priority={preload && i < 2}
              loading={i < 2 ? "eager" : undefined}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}

export default function HeroEditorial() {
  return (
    <section className="hero-bg relative overflow-hidden" aria-label="Introduction">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 sm:py-14 lg:min-h-[min(calc(100svh-7.5rem),860px)] lg:grid-cols-12 lg:gap-8 lg:py-0 lg:px-10">
        <div className="lg:col-span-6 lg:py-16">
          <h1 className="font-serif text-display-xl text-charcoal">
            Every piece, made to fit <em className="italic text-gold-text">your</em> home.
          </h1>
          <p className="lede mt-7 max-w-lg text-taupe">
            Sofas, beds, dining tables, curtains, wardrobes and media walls, designed in 3D around your
            rooms, built in our Dubai workshop and fitted by our own team anywhere in the UAE.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="btn-dark whitespace-nowrap">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Get a free quote
            </a>
            <a href={VISIT_LINK} target="_blank" rel="noopener noreferrer" className="btn-glass whitespace-nowrap">
              Book a free visit
            </a>
          </div>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/collections" className="inline-flex min-h-[44px] items-center text-link text-charcoal hover:text-gold-text">Explore collections <span aria-hidden="true">&nbsp;&rarr;</span></Link>
            {estimatorEnabled && (
              <Link href="/estimator" className="inline-flex min-h-[44px] items-center text-link text-charcoal hover:text-gold-text">Get an instant budget range <span aria-hidden="true">&nbsp;&rarr;</span></Link>
            )}
          </p>
          <ul className="mt-10 hidden flex-wrap gap-x-8 gap-y-2 border-t border-border pt-6 text-[14px] text-taupe sm:flex">
            <li>Free home consultation</li>
            <li>3D design before production</li>
            <li>Fitted by our own team</li>
          </ul>
        </div>

        {/* Magazine stream: two columns of project cards drifting in opposite directions */}
        <div className="hero-stage lg:col-span-6">
          <div className="hero-mask grid grid-cols-2 gap-4 lg:gap-5">
            <Stream cards={streamA} preload />
            <Stream cards={streamB} down />
          </div>
        </div>
      </div>
    </section>
  );
}
