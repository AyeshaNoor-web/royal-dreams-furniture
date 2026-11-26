import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { pick } from "@/lib/gallery";
import { estimatorEnabled } from "@/lib/flags";
import { QUOTE_LINK, VISIT_LINK } from "@/lib/site";
import HeroFrame from "./HeroFrame";

// The evening shot of the walnut-and-marble media wall: the strongest recent photograph, and portrait, which suits the frame.
const hero = pick("tv-units", 2);

export default function HeroCinematic() {
  return (
    <section className="relative overflow-hidden bg-beige" aria-label="Introduction">
      <span aria-hidden="true" className="hero-glow absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-14 pt-10 sm:pt-14 lg:min-h-[min(calc(100svh-7.5rem),880px)] lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-20">
        <div className="lg:col-span-6 xl:col-span-6">
          <h1 className="font-serif text-display-xl text-charcoal">
            Every piece,
            <br />
            made to fit <em className="font-normal italic text-gold-text">your</em> home.
          </h1>
          <p className="lede mt-7 max-w-lg text-taupe">
            Sofas, beds, dining tables, curtains, wardrobes and media walls, designed in 3D around your rooms, built in our Dubai workshop and fitted by our own team anywhere in the UAE.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="btn-dark whitespace-nowrap">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Get a free quote
            </a>
            <a href={VISIT_LINK} target="_blank" rel="noopener noreferrer" className="btn-line whitespace-nowrap">
              Book a free visit
            </a>
          </div>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/collections" className="text-link text-charcoal hover:text-gold-text">Explore collections <span aria-hidden="true">&nbsp;&rarr;</span></Link>
            {estimatorEnabled && (
              <Link href="/estimator" className="text-link text-charcoal hover:text-gold-text">Get an instant budget range <span aria-hidden="true">&nbsp;&rarr;</span></Link>
            )}
          </p>
          <ul className="mt-10 hidden flex-wrap gap-x-8 gap-y-2 border-t border-border pt-6 text-[14px] text-taupe sm:flex">
            <li>Free home consultation</li>
            <li>3D design before production</li>
            <li>Fitted by our own team</li>
          </ul>
        </div>
        <div className="lg:col-span-6 lg:pl-6">
          <HeroFrame image={hero} caption={hero.alt} />
        </div>
      </div>
    </section>
  );
}
