import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { categories } from "@/lib/gallery";
import { APPOINTMENT_LINK } from "@/lib/site";

const panes = [
  { slug: "display-shelving", area: "shelving", on: 500, sizes: "(min-width: 1024px) 30vw, 33vw" },
  { slug: "walk-in-closets", area: "closets", on: 150, sizes: "(min-width: 1024px) 30vw, 50vw" },
  { slug: "dressing-tables", area: "dressing", on: 850, sizes: "(min-width: 1024px) 18vw, 33vw" },
  { slug: "fitted-wardrobes", area: "fitted", on: 700, sizes: "(min-width: 1024px) 18vw, 25vw" },
  { slug: "tv-units", area: "tv", on: 1050, sizes: "(min-width: 1024px) 18vw, 33vw" },
  { slug: "wall-paneling", area: "paneling", on: 350, sizes: "(min-width: 1024px) 18vw, 25vw" },
];

const shortTitle: Record<string, string> = { "tv-units": "Media Walls" };

export default function Hero() {
  return (
    <section className="wall" aria-label="Our six collections">
      {panes.map((p) => {
        const cat = categories.find((c) => c.slug === p.slug)!;
        return (
          <Link
            key={p.slug}
            href={"/collections/" + p.slug}
            className="pane"
            style={{ gridArea: p.area, ["--on" as string]: p.on + "ms" }}
          >
            <span className="pane-glass block">
              <Image src={"/images/wall/" + p.slug + ".jpg"} alt={cat.cover.alt} fill priority sizes={p.sizes} className={"object-cover" + (p.area === "tv" ? " object-bottom" : "")} />
            </span>
            <span className="pane-caption flex min-h-[34px] items-center justify-between gap-2 pt-1.5 pb-1 font-dm text-[13px] leading-tight text-beige/85">
              <span>{shortTitle[p.slug] ?? cat.title}</span>
              <span className="wall-pane-caption-count tabular-nums text-beige/70">{cat.images.length}</span>
            </span>
          </Link>
        );
      })}

      <div className="relative flex flex-col justify-end bg-door px-6 pb-8 pt-8 sm:px-10 lg:px-[clamp(2rem,3.4vw,3.5rem)] lg:pb-[clamp(2rem,5vh,3.5rem)]" style={{ gridArea: "door" }}>
        <span className="absolute right-4 top-1/2 hidden h-48 w-1 -translate-y-1/2 bg-frame lg:block" aria-hidden="true" />
        <p className="mb-auto pb-10 text-[15px] text-beige/75">Based in Dubai. Fitting across all seven Emirates.</p>
        <h1 className="font-serif text-display-xl text-beige-light">Made for<br />one room.</h1>
        <p className="mt-6 max-w-[27rem] text-[17px] leading-relaxed text-beige/85">
          New wardrobes, walk-in closets, wall paneling and media walls. Drawn to your walls, built in our workshop and fitted by our own team across the UAE.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-lit">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Book a free site measure
          </a>
          <Link href="/gallery" className="text-link text-beige-light hover:text-lit">See 70 photographs</Link>
        </div>
      </div>
    </section>
  );
}
