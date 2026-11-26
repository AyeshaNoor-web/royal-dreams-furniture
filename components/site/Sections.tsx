import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import SectionHead from "./SectionHead";
import { pick } from "@/lib/gallery";
import { APPOINTMENT_LINK, SITE, WHATSAPP_LINK, areas } from "@/lib/site";

const steps = [
  { n: "01", title: "Tell us about the room", text: "Send a few photos or a floor plan on WhatsApp. Within a working day you have first ideas, a rough budget and a time for us to visit.", where: "On WhatsApp", free: true, image: pick("curtains", 4) },
  { n: "02", title: "We measure and design", text: "We measure every wall and opening, then show you the piece in 3D, in your own room. Nothing is built until you approve.", where: "At your home", free: true, image: { src: "/video/walk-in-closets/walk-in-closets-01.jpg", w: 576, h: 1024, alt: "Our designer measuring a walk-in closet on site" } },
  { n: "03", title: "We build it", text: "Your furniture is made in our Dubai workshop in the veneer, lacquer, stone or fabric you chose, and we keep you informed while it is in production.", where: "In our Dubai workshop", free: false, image: { src: "/images/process/workshop.jpg", w: 626, h: 417, alt: "Woodworking workshop with a CNC machine and stacked timber panels" } },
  { n: "04", title: "We fit it", text: "Our own team installs, aligns every door and light, and clears the packaging. You receive a finished room, not a delivery.", where: "At your home", free: false, image: pick("walk-in-closets", 3) },
];

function Pin() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

/** Four steps from first message to a fitted room. */
export function Process() {
  return (
    <section className="bg-mist py-section-sm lg:py-section" aria-labelledby="process-h">
      <div className="wrap">
        <SectionHead align="left" eyebrow="How it works" title={<span id="process-h">Four steps. One team from start to finish.</span>} lede="The first two steps cost nothing. You only decide once you have seen the design and the quotation." />
        <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white">
              <div className="relative aspect-[5/4] bg-mist">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                {s.free && <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 font-dm text-[11px] font-bold uppercase tracking-[0.12em] text-gold-dark">Free</span>}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-dm text-[11px] font-bold tracking-[0.18em] text-taupe">{s.n}</p>
                <h3 className="card-title mt-2">{s.title}</h3>
                <p className="mt-2 flex-1 font-dm text-[14px] leading-relaxed text-taupe">{s.text}</p>
                <p className="mt-4 flex items-center gap-2 border-t border-border pt-3 font-dm text-[13px] font-semibold text-charcoal"><Pin /> {s.where}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const reasons = [
  { title: "Made to your measurements", text: "We measure the room before anything is drawn, so wardrobes run floor to ceiling and sofas fit the wall they were made for.", icon: "M4 20h16M6 20V8l6-4 6 4v12M10 20v-6h4v6" },
  { title: "You see it in 3D first", text: "The piece is shown in your own room. You approve every dimension, finish and fabric before production begins.", icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v18M4 7.5l8 4.5 8-4.5" },
  { title: "Finishes you choose", text: "Veneers, lacquer in any colour, marble and stone, boucle, velvet and leather. Samples come to your home.", icon: "M4 6h7v12H4zM13 6h7v5h-7zM13 13h7v5h-7z" },
  { title: "One team, start to finish", text: "The people who measure your room also design it, build it and fit it. No subcontractors, no hand-offs.", icon: "M14 6l4 4-9 9H5v-4l9-9zM12 8l4 4" },
];

/** Why made to measure, beside one large photo. */
export function WhyUs() {
  const img = pick("tv-units", 3);
  return (
    <section className="py-section-sm lg:py-section" aria-labelledby="why-h">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-mist lg:col-span-6 lg:aspect-[5/4]">
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-6">
          <p className="eyebrow mb-5">Why made to measure</p>
          <h2 id="why-h" className="h-lg">Furniture that fits the room, not the other way round</h2>
          <ul className="mt-8 flex flex-col gap-6">
            {reasons.map((r) => (
              <li key={r.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand text-gold-dark">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={r.icon} /></svg>
                </span>
                <div>
                  <h3 className="font-accent text-[1.4rem] font-medium leading-tight text-charcoal">{r.title}</h3>
                  <p className="mt-1 font-dm text-[15px] leading-relaxed text-taupe">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WhereWeWork() {
  const row = (label: string, places: readonly string[]) => (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
      <p className="w-44 shrink-0 font-dm text-sm text-taupe">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {places.map((p) => (
          <li key={p} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-dm text-sm font-medium text-charcoal"><Pin /> {p}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="bg-sand py-section-sm" aria-labelledby="where-h">
      <div className="wrap">
        <h2 id="where-h" className="font-accent text-[2rem] font-medium leading-tight text-charcoal sm:text-[2.5rem]">Where we work</h2>
        <p className="lede mt-3 max-w-2xl">From our workshop in Dubai we measure and install in all seven Emirates. Our showroom is in {SITE.showroom.display}, by appointment.</p>
        <div className="mt-8 flex flex-col gap-5">
          {row(areas.near.title, areas.near.places)}
          {row(areas.far.title, areas.far.places)}
        </div>
      </div>
    </section>
  );
}

/** The closing band on every page: what the free visit includes and the two ways to start. */
export function ReadyBand({ item }: { item?: string }) {
  const img = pick("sofas", 0);
  return (
    <section className="bg-sand" aria-labelledby="ready-h">
      <div className="wrap grid grid-cols-1 items-center gap-10 py-section-sm lg:grid-cols-12 lg:py-section">
        <div className="lattice rounded-3xl lg:col-span-7">
          <p className="eyebrow mb-5">Free home visit</p>
          <h2 id="ready-h" className="font-accent text-[2.75rem] font-medium leading-[1.02] text-charcoal sm:text-6xl">Ready <em className="font-medium">when you are</em></h2>
          <p className="lede mt-5 max-w-lg">We visit your home anywhere in the UAE to measure the room, talk through finishes and prepare a clear quotation.</p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {["See fabric and finish samples in your own light", "Have the room measured on site", "Receive a 3D design and a written quotation"].map((t) => (
              <li key={t} className="flex items-center gap-3 font-dm text-[15px] text-charcoal">
                <svg className="h-5 w-5 shrink-0 text-gold-dark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 14.2l-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" /></svg>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={item ? "/quote?item=" + item : "/quote"} className="btn-dark">Get a free quote <span aria-hidden="true">&#8599;</span></Link>
            <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> Book a visit on WhatsApp</a>
          </div>
          <p className="mt-5 font-dm text-sm text-taupe">Call or WhatsApp <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-charcoal underline underline-offset-4">{SITE.phones[0].display}</a></p>
        </div>
        <div className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl bg-mist lg:col-span-4 lg:col-start-9 lg:block">
          <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
