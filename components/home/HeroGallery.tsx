import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Magnetic from "@/components/motion/Magnetic";
import { pick } from "@/lib/gallery";
import { estimatorEnabled } from "@/lib/flags";
import { QUOTE_LINK } from "@/lib/site";
import { FadeUp, HeroBackdrop, LineReveal } from "./HeroGalleryMotion";

// Concept A, "the gallery wall": one finished room, full bleed, the site opens dark and turns to plaster below.
const image = pick("sofas", 0);

const trust = ["Free consultation", "3D design before production", "Fitted by our own team"];

export default function HeroGallery() {
  return (
    <section data-nav-dark className="on-dark relative -mt-[80px] flex min-h-[100svh] flex-col justify-end pt-[80px] text-beige lg:-mt-[84px] lg:justify-center lg:pt-[84px]" aria-label="Introduction">
      <HeroBackdrop image={image} />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-28 pt-16 sm:pb-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <FadeUp delay={0.05}>
            <p className="eyebrow">Made to measure &middot; Dubai workshop</p>
          </FadeUp>
          <h1 className="mt-5 font-serif text-display-xl text-beige">
            <LineReveal lines={["Every piece,", "made to fit", <><em className="font-normal italic text-gold">your</em> home.</>]} />
          </h1>
          <FadeUp delay={0.7}>
            <p className="lede mt-7 max-w-lg text-beige/75">
              Sofas, beds, wardrobes and media walls, designed in 3D around your rooms, built and fitted by one team.
            </p>
          </FadeUp>
          <FadeUp delay={0.85} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa-light w-full whitespace-nowrap sm:w-auto">
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Start on WhatsApp <span aria-hidden="true">&rarr;</span>
              </a>
            </Magnetic>
            <Magnetic className="hidden sm:inline-flex">
              <Link href="/gallery" className="btn-line-light whitespace-nowrap">See finished rooms</Link>
            </Magnetic>
            {estimatorEnabled && (
              <Link href="/estimator" className="text-link text-beige/80 hover:text-beige sm:ml-2">Instant budget range <span aria-hidden="true">&nbsp;&rarr;</span></Link>
            )}
          </FadeUp>
          <FadeUp delay={1.1}>
            <ul className="mt-10 flex gap-x-8 gap-y-2 overflow-x-auto border-t border-beige/20 pt-5 text-[12px] font-medium uppercase tracking-[0.14em] text-beige/70 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible" aria-label="What is included">
              {trust.map((t) => (
                <li key={t} className="flex shrink-0 items-center gap-3">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
