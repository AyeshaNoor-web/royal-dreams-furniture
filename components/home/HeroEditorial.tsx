import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { categories, type GalleryImage } from "@/lib/gallery";
import { APPOINTMENT_LINK } from "@/lib/site";

interface Card {
  image: GalleryImage;
  label: string;
  note: string;
}

// Two streams of project cards. Each list is rendered twice so the CSS loop is seamless.
const streamA: Card[] = [
  { image: categories[1].images[0], label: "Walk-in Closet", note: "Walnut, glass doors, island" },
  { image: categories[0].images[0], label: "Wall Paneling", note: "Greige panels, stairwell" },
  { image: categories[3].images[0], label: "Media Wall", note: "Backlit niches, floating console" },
  { image: categories[4].images[0], label: "Dressing Unit", note: "Illuminated display cubes" },
  { image: categories[2].images[1], label: "Fitted Wardrobe", note: "White lacquer, glass doors" },
];

const streamB: Card[] = [
  { image: categories[1].images[2], label: "Walk-in Closet", note: "Black-framed glass, LED interiors" },
  { image: categories[2].images[0], label: "Fitted Wardrobe", note: "Fluted centre panel, taupe" },
  { image: categories[0].images[3], label: "Wall Paneling", note: "Wainscoting, brass consoles" },
  { image: categories[5].images[0], label: "Display Shelving", note: "Floating shelves, LED strips" },
  { image: categories[3].images[1], label: "Media Wall", note: "Timber slats, lit console" },
];

function Stream({ cards, down = false, className = "" }: { cards: Card[]; down?: boolean; className?: string }) {
  const list = [...cards, ...cards];
  return (
    <div className={"hero-stream " + (down ? "hero-stream-down " : "") + className} aria-hidden="true">
      {list.map((c, i) => (
        <figure key={i} className="hero-card">
          <div className="relative aspect-[4/5] overflow-hidden bg-beige-dark">
            <Image src={c.image.src} alt="" fill sizes="(min-width: 1024px) 18vw, 44vw" className="object-cover" />
          </div>
        </figure>
      ))}
    </div>
  );
}

export default function HeroEditorial() {
  return (
    <section className="hero-bg relative overflow-hidden" aria-label="Introduction">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-14 lg:min-h-[min(calc(100svh-7.5rem),860px)] lg:grid-cols-12 lg:gap-8 lg:py-0 lg:px-10">
        <div className="lg:col-span-6 lg:py-16">
          <h1 className="font-serif text-display-xl text-charcoal">
            Furniture designed for <em className="italic text-gold-text">your</em> room.
          </h1>
          <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-taupe">
            Wall paneling, walk-in closets, fitted wardrobes and media walls, designed in 3D, built in our
            Dubai workshop and installed by our own team in homes across the UAE.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/collections" className="btn-dark">Explore collections</Link>
            <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-glass">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Book a free consultation
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-6 text-[14px] text-taupe">
            <li>3D design approval</li>
            <li>In-house workshop</li>
            <li>Installation across the UAE</li>
          </ul>
        </div>

        {/* Magazine stream: two columns of project cards drifting in opposite directions */}
        <div className="hero-stage lg:col-span-6">
          <div className="hero-mask grid grid-cols-2 gap-4 lg:gap-5">
            <Stream cards={streamA} />
            <Stream cards={streamB} down className="hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
