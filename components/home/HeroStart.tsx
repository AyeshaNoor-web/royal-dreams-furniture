import Image from "next/image";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { photo } from "@/lib/photo";
import HeroPicker from "./HeroPicker";

const ticks = ["Free home visit", "3D design before anything is built", "Fitted by our own team"];

/** A ring of text that turns slowly: the offer, said once, where the eye lands. */
function Sticker({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={"flex items-center justify-center rounded-full bg-gold text-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] " + className}>
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full">
        <defs><path id="ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <text fontSize="11.5" fontWeight="700" letterSpacing="2.3" fill="currentColor" style={{ fontFamily: "var(--font-body)" }}>
          <textPath href="#ring">FREE HOME VISIT &#8226; FREE 3D DESIGN &#8226; NO OBLIGATION &#8226;</textPath>
        </text>
      </svg>
      <span className="font-serif text-[26px] font-bold leading-none tracking-tight">AED 0</span>
    </div>
  );
}

export default function HeroStart() {
  const a = photo("sofas", 2);
  const b = photo("walk-in-closets", 1);
  const c = photo("tv-units", 4);
  return (
    <section data-hero className="pine-stage on-dark relative -mt-[72px] overflow-hidden rounded-b-[2.25rem] pt-[72px] text-beige lg:-mt-[84px] lg:rounded-b-[3.5rem] lg:pt-[84px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-12 pt-8 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10 lg:pb-20 lg:pt-14">
        <div className="lg:col-span-6 xl:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-beige/20 bg-beige/[0.07] py-1.5 pl-2 pr-4 text-[13px] font-semibold text-beige">
            <span className="rounded-full bg-whatsapp px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ink">UAE</span>
            Made to measure, across all seven Emirates
          </p>
          <h1 className="mt-5 font-serif text-display-2xl font-semibold text-beige">
            Show us the room. <span className="accent text-gold">We build</span> what fits.
          </h1>
          <p className="lede mt-5 max-w-xl text-beige/80">
            Sofas, beds, wardrobes, walk-in closets and media walls, designed in 3D for your home, built in our Dubai workshop and fitted by our own team.
          </p>
          <div className="mt-7 max-w-2xl">
            <HeroPicker />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium text-beige/85">
            {ticks.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] text-gold" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-5">
          <div className="grid grid-cols-3 items-end gap-3 sm:gap-4">
            <div className="float-a relative mb-10 aspect-[3/5] overflow-hidden arch bg-pine-soft lg:aspect-[9/19]">
              <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 14vw, 30vw" className="object-cover" />
            </div>
            <div className="float-b relative aspect-[3/6] overflow-hidden arch bg-pine-soft lg:aspect-[9/22] ring-4 ring-gold/90 ring-offset-4 ring-offset-pine">
              <Image src={a.src} alt={a.alt} fill priority fetchPriority="high" sizes="(min-width: 1024px) 14vw, 30vw" className="object-cover" />
            </div>
            <div className="float-c relative mb-20 aspect-[3/5] overflow-hidden arch bg-pine-soft lg:aspect-[9/19]">
              <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 14vw, 30vw" className="object-cover" />
            </div>
          </div>
          <Sticker className="absolute -top-3 right-0 h-[104px] w-[104px] rotate-6 sm:h-[124px] sm:w-[124px] lg:-right-4 lg:-top-8" />
          <div className="absolute -bottom-2 left-0 flex max-w-[250px] items-center gap-3 rounded-3xl bg-beige p-3 pr-4 text-charcoal shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)] sm:-left-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-ink"><WhatsAppIcon className="h-6 w-6" /></span>
            <span className="text-[13px] font-semibold leading-snug">Send a photo, get first ideas within one working day</span>
          </div>
        </div>
      </div>
    </section>
  );
}
