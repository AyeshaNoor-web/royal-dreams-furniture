import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import ProductCard, { type CardItem } from "./ProductCard";
import type { CategoryCardItem } from "@/lib/cards";
import { pick, type GalleryImage } from "@/lib/gallery";
import { reviews } from "@/lib/reviews";
import { APPOINTMENT_LINK, SITE, WHATSAPP_LINK } from "@/lib/site";

/** Section heading used down the home page: a title and one plain line, left aligned, with an optional link on the right. */
function Head({ id, title, line, href, link }: { id: string; title: string; line?: string; href?: string; link?: string }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
      <div>
        <h2 id={id} className="h-lg">{title}</h2>
        {line && <p className="lede mt-2">{line}</p>}
      </div>
      {href && link && <Link href={href} className="text-link shrink-0">{link}</Link>}
    </div>
  );
}

/** Text on the left, the room on the right, a soft block of colour behind the photo. */
export function HomeHero({ main, small }: { main: GalleryImage; small: GalleryImage }) {
  return (
    <section className="overflow-hidden">
      <div className="wrap grid grid-cols-1 items-center gap-10 pb-14 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-5">
          <h1 className="font-serif text-[clamp(2.4rem,4.6vw,4rem)] font-medium leading-[1.08] text-charcoal">Your dream interior starts here</h1>
          <p className="lede mt-5 max-w-md">Sofas, beds, wardrobes, walk-in closets, media walls and curtains, made to the measurements of your room and fitted by our own team across the UAE.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="btn-dark">Get a free quote</Link>
            <Link href="/collections" className="btn-line">Browse our products</Link>
          </div>
          <p className="mt-6 font-dm text-base text-taupe">
            Prefer to talk? <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-medium text-charcoal underline underline-offset-4">WhatsApp {SITE.phones[0].display}</a>
          </p>
        </div>
        <div className="relative lg:col-span-7 lg:pl-10">
          <div className="absolute -right-10 -top-10 h-[70%] w-[78%] rounded-bl-[7rem] bg-beige-dark lg:-right-16 lg:-top-16" aria-hidden="true" />
          <div className="absolute -bottom-8 left-0 h-40 w-40 rounded-full bg-gold/60 lg:-bottom-10 lg:left-2 lg:h-56 lg:w-56" aria-hidden="true" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist lg:aspect-[5/4]">
            <Image src={main.src} alt={main.alt} fill priority sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 right-6 hidden aspect-[4/5] w-[32%] overflow-hidden rounded-lg border-4 border-beige bg-mist sm:block">
            <Image src={small.src} alt={small.alt} fill sizes="20vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  { title: "Made to your measurements", text: "We measure the room before anything is drawn, so every piece fits the wall it was made for.", image: pick("fitted-wardrobes", 7) },
  { title: "You see it in 3D first", text: "The design is shown in your own room. Nothing is built until you approve it.", image: pick("beds", 2) },
  { title: "One team, start to finish", text: "The people who measure also design, build and fit. No subcontractors.", image: pick("walk-in-closets", 3) },
];

/** Three reasons on a brown band, each with a photo, then two plain assurances. */
export function WhyBand() {
  return (
    <section aria-labelledby="why-h">
      <div className="bg-ink py-section-sm text-white lg:py-20">
        <div className="wrap">
          <h2 id="why-h" className="font-serif text-display-lg font-medium">Why choose us?</h2>
          <p className="mt-2 font-dm text-lg text-white/80">Because your home deserves furniture made for it.</p>
          <ul className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {reasons.map((r) => (
              <li key={r.title} className="rounded-lg bg-beige-light p-3 text-charcoal">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-mist">
                  <Image src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="px-2 pb-3 pt-4">
                  <h3 className="font-serif text-xl">{r.title}</h3>
                  <p className="mt-1.5 font-dm text-[16px] leading-relaxed text-taupe">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-b border-border bg-beige-light">
        <dl className="wrap grid grid-cols-1 gap-x-10 gap-y-4 py-6 sm:grid-cols-2">
          <div>
            <dt className="font-dm text-sm text-taupe">Before you decide</dt>
            <dd className="font-dm text-[17px] font-medium text-charcoal">Free home visit, measurement and 3D design</dd>
          </div>
          <div>
            <dt className="font-dm text-sm text-taupe">Where we work</dt>
            <dd className="font-dm text-[17px] font-medium text-charcoal">Measured and fitted in all seven Emirates</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/** Every collection as a small tile: photo, name, price line. */
export function BrowseByCategory({ items }: { items: CategoryCardItem[] }) {
  return (
    <section className="py-section-sm lg:py-section" aria-labelledby="browse-h">
      <div className="wrap">
        <Head id="browse-h" title="Browse by category" line="Open a collection to see its designs, one photo each." href="/collections" link="All products" />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((c) => (
            <li key={c.slug}>
              <Link href={c.href} className="group block text-center">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-mist">
                  <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                </div>
                <h3 className="mt-3 font-dm text-[17px] font-medium text-charcoal underline-offset-4 group-hover:underline">{c.title}</h3>
                <p className={"font-dm text-sm " + (c.priced ? "text-gold-dark" : "text-taupe")}>{c.priced ? c.price : ""}</p>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/quote?item=other" className="group block text-center">
              <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-beige-light p-4">
                <span className="font-serif text-xl leading-snug text-charcoal">Something else in mind?</span>
              </div>
              <h3 className="mt-3 font-dm text-[17px] font-medium text-charcoal underline-offset-4 group-hover:underline">Custom joinery</h3>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export interface RoomTile {
  href: string;
  title: string;
  line: string;
  src: string;
  alt: string;
}

/** Rooms as large photo tiles with the name on the photo. */
export function ShopByRoom({ rooms }: { rooms: RoomTile[] }) {
  return (
    <section className="bg-sand py-section-sm lg:py-section" aria-labelledby="rooms-h">
      <div className="wrap">
        <Head id="rooms-h" title="Plan by room" line="Find the pieces we usually make for each room of the home." />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-mist sm:aspect-[3/4]">
                <Image src={r.src} alt={r.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                <span className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/40" aria-hidden="true" />
                <span className="absolute left-5 right-5 top-5 text-white">
                  <span className="block font-serif text-2xl">{r.title}</span>
                  <span className="mt-1 block font-dm text-[15px] text-white/85">{r.line}</span>
                </span>
                <span className="absolute bottom-5 left-5 font-dm text-base font-medium text-white underline underline-offset-4">View the room</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A plain band inviting a showroom visit. */
export function ShowroomBand() {
  return (
    <section className="py-section-sm" aria-labelledby="showroom-h">
      <div className="wrap">
        <div className="flex flex-col gap-6 rounded-lg bg-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between lg:p-12">
          <div>
            <h2 id="showroom-h" className="font-serif text-display-md font-medium">Visit our showroom</h2>
            <p className="mt-2 font-dm text-lg text-white/80">{SITE.showroom.display}. Visits are by appointment, so someone is there to show you samples.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-white">Book a visit</a>
            <a href={SITE.showroom.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-glass">Open in Google Maps</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A row of designs that scrolls sideways, with a visible scroll line under it. */
export function DesignRow({ items }: { items: CardItem[] }) {
  return (
    <section className="pb-section-sm lg:pb-section" aria-labelledby="designs-h">
      <div className="wrap">
        <Head id="designs-h" title="Popular designs" line="Open any design for all its photos, its details and a quote." href="/gallery" link="See all our work" />
      </div>
      <div className="wrap">
        <ul className="row-scroll -mx-5 flex snap-x gap-4 overflow-x-auto scroll-pl-5 px-5 pb-6 sm:mx-0 sm:scroll-pl-0 sm:px-0 lg:gap-6" tabIndex={0} aria-label="Popular designs">
          {items.map((p) => (
            <li key={p.href} className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-[23.5%]">
              <ProductCard item={p} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 38vw, 62vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** One recent piece shown large: two photos and a short invitation. */
export function LatestProject({ title, line, href, a, b, quoteHref }: { title: string; line: string; href: string; a: GalleryImage; b: GalleryImage; quoteHref: string }) {
  return (
    <section className="bg-beige-dark" aria-labelledby="latest-h">
      <div className="wrap grid grid-cols-1 items-center gap-10 py-section-sm lg:grid-cols-12 lg:py-20">
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] w-[62%] overflow-hidden rounded-lg bg-mist">
            <Image src={a.src} alt={a.alt} fill sizes="(min-width: 1024px) 30vw, 62vw" className="object-cover" />
          </div>
          <div className="absolute bottom-[-8%] right-0 aspect-[4/5] w-[50%] overflow-hidden rounded-lg border-4 border-beige-dark bg-mist">
            <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
        </div>
        <div className="pt-6 lg:col-span-5 lg:col-start-8 lg:pt-0">
          <h2 id="latest-h" className="h-lg">Our latest project. Yours could be next.</h2>
          <p className="mt-5 font-serif text-xl text-charcoal">{title}</p>
          <p className="lede mt-2">{line} Every piece starts with a visit to your home and a 3D design you approve.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={href} className="btn-dark">See this design</Link>
            <Link href={quoteHref} className="btn-line">Get a quote like it</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const starts = [
  { title: "Start with a free home visit", text: "Best when you want us to see the room.", points: ["We measure every wall and opening", "You see fabric and finish samples in your own light", "You receive a 3D design and a written quotation"], href: "/quote", cta: "Request a visit" },
  { title: "Start with photos on WhatsApp", text: "Best when you want a rough figure first.", points: ["Send photos of the room and rough sizes", "We reply within a working day", "First ideas and a rough budget, then a visit if you wish"], href: WHATSAPP_LINK, cta: "Send photos", wa: true },
];

/** Two ways to begin, side by side. */
export function StartOptions() {
  return (
    <section className="py-section-sm lg:py-section" aria-labelledby="start-h">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="start-h" className="h-lg">Got inspired? Let us start your project</h2>
          <p className="lede mt-3">Choose how you would like to begin. Both are free.</p>
        </div>
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {starts.map((s) => (
            <li key={s.title} className="flex flex-col rounded-lg border border-border bg-beige-light p-7 lg:p-9">
              <h3 className="font-serif text-2xl text-charcoal">{s.title}</h3>
              <p className="mt-2 font-dm text-[17px] text-taupe">{s.text}</p>
              <ul className="mt-5 flex flex-1 flex-col">
                {s.points.map((p) => (
                  <li key={p} className="border-t border-border py-3 font-dm text-[16px] text-charcoal">{p}</li>
                ))}
              </ul>
              {s.wa ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn-wa mt-5 self-start"><WhatsAppIcon className="h-4 w-4" /> {s.cta}</a>
              ) : (
                <Link href={s.href} className="btn-dark mt-5 self-start">{s.cta}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** What clients said. Renders nothing until real reviews are added to lib/reviews.ts. */
export function HappyCustomers() {
  if (reviews.length === 0) return null;
  return (
    <section className="bg-sand py-section-sm lg:py-section" aria-labelledby="reviews-h">
      <div className="wrap">
        <Head id="reviews-h" title="Our happy customers" line="In their own words, after the piece was fitted." />
        <ul className="row-scroll -mx-5 flex snap-x gap-4 overflow-x-auto scroll-pl-5 px-5 pb-6 sm:mx-0 sm:scroll-pl-0 sm:px-0 lg:gap-5" tabIndex={0} aria-label="Customer reviews">
          {reviews.map((r) => (
            <li key={r.name + r.piece} className="flex w-[82%] shrink-0 snap-start flex-col rounded-lg bg-beige-light p-6 sm:w-[46%] lg:w-[31.5%] lg:p-7">
              <p className="font-dm text-[17px] font-medium text-charcoal">{r.name}</p>
              <blockquote className="mt-3 flex-1 font-dm text-[16px] leading-relaxed text-taupe">{r.quote}</blockquote>
              {r.stars ? <p className="mt-4 text-lg tracking-widest text-gold-dark" aria-label={r.stars + " out of 5 stars"}>{"★".repeat(r.stars)}</p> : null}
              <p className="mt-3 border-t border-border pt-3 font-dm text-sm text-taupe">{r.piece}, {r.area}. From {r.source}.</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const helps = [
  { title: "Contact us", text: "Questions about a design, a price or a visit? We reply on WhatsApp within a working day.", href: WHATSAPP_LINK, cta: "WhatsApp us", ext: true },
  { title: "Visit the showroom", text: "See finishes and fabrics up close in " + SITE.showroom.display + ". Visits are by appointment.", href: APPOINTMENT_LINK, cta: "Book a visit", ext: true },
  { title: "Browse products", text: "Look through every collection and open any design for its photos and details.", href: "/collections", cta: "See products", ext: false },
];

/** Three plain ways to get help. */
export function HaveQuestions() {
  return (
    <section className="bg-sand py-section-sm" aria-labelledby="help-h">
      <div className="wrap">
        <Head id="help-h" title="Have any questions?" line="Call or WhatsApp us, or come and see the work in person." />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {helps.map((h) => (
            <li key={h.title} className="flex flex-col rounded-lg bg-beige-light p-7">
              <h3 className="font-serif text-xl text-charcoal">{h.title}</h3>
              <p className="mt-2 flex-1 font-dm text-[16px] leading-relaxed text-taupe">{h.text}</p>
              {h.ext ? (
                <a href={h.href} target="_blank" rel="noopener noreferrer" className="text-link mt-5 self-start">{h.cta}</a>
              ) : (
                <Link href={h.href} className="text-link mt-5 self-start">{h.cta}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
