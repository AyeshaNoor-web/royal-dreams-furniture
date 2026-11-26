import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { pick } from "@/lib/gallery";
import { APPOINTMENT_LINK, SITE, WHATSAPP_LINK, areas } from "@/lib/site";

/** How it works: the pinned timeline that moves with scrolling. */
export { default as Process } from "./ProcessScroll";

const reasons = [
  { title: "Made to your measurements", text: "We measure the room before anything is drawn, so wardrobes run floor to ceiling and sofas fit the wall they were made for." },
  { title: "You see it in 3D first", text: "The piece is shown in your own room. You approve every dimension, finish and fabric before production begins." },
  { title: "Finishes you choose", text: "Veneers, lacquer in any colour, marble and stone, boucle, velvet and leather. Samples come to your home." },
  { title: "One team, start to finish", text: "The people who measure your room also design it, build it and fit it. No subcontractors, no hand-offs." },
];

/** Why made to measure, beside one large photo. */
export function WhyUs() {
  const img = pick("tv-units", 3);
  return (
    <section className="py-section-sm lg:py-section" aria-labelledby="why-h">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist lg:col-span-6 lg:aspect-[5/4]">
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-6">
          <h2 id="why-h" className="h-lg">Furniture that fits the room, not the other way round</h2>
          <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="border-t border-border pt-4">
                <dt className="font-serif text-xl text-charcoal">{r.title}</dt>
                <dd className="mt-2 font-dm text-[16px] leading-relaxed text-taupe">{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function WhereWeWork() {
  return (
    <section className="bg-sand py-section-sm" aria-labelledby="where-h">
      <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="where-h" className="h-md">Where we work</h2>
          <p className="lede mt-3">From our workshop in Dubai we measure and install in all seven Emirates. Our showroom is in {SITE.showroom.display}, by appointment.</p>
        </div>
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {[areas.near, areas.far].map((a) => (
            <div key={a.title} className="border-t border-charcoal/20 pt-4">
              <dt className="font-dm text-[15px] text-taupe">{a.title}</dt>
              <dd className="mt-2 font-serif text-xl leading-relaxed text-charcoal">{a.places.join(", ")}</dd>
            </div>
          ))}
        </dl>
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
        <div className="lg:col-span-7">
          <h2 id="ready-h" className="h-xl">Ready when you are</h2>
          <p className="lede mt-5 max-w-lg">We visit your home anywhere in the UAE to measure the room, show you fabric and finish samples in your own light, and prepare a 3D design with a written quotation. The visit is free.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={item ? "/quote?item=" + item : "/quote"} className="btn-dark">Get a free quote</Link>
            <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> Book a visit on WhatsApp</a>
          </div>
          <p className="mt-5 font-dm text-base text-taupe">Call or WhatsApp <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-medium text-charcoal underline underline-offset-4">{SITE.phones[0].display}</a></p>
        </div>
        <div className="relative hidden aspect-[4/5] overflow-hidden rounded-lg bg-mist lg:col-span-4 lg:col-start-9 lg:block">
          <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
