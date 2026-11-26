import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { groups, roomTiles, type RoomTile } from "@/lib/gallery";

export type Group = (typeof groups)[number];

interface TileProps {
  t: RoomTile;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** "lg": the caption is overlaid only from the desktop breakpoint; on phones, where the tile is small, it sits under the photo. */
  overlay?: "always" | "lg";
}

export function Tile({ t, sizes, className = "", priority = false, overlay = "always" }: TileProps) {
  const below = overlay === "lg";
  return (
    <Link href={t.href} className="group block lg:h-full">
      <span className={"relative block overflow-hidden bg-beige-dark " + className}>
        <Image src={t.image.src} alt={t.image.alt} fill priority={priority} sizes={sizes} className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
        <span className={"absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent px-5 pb-4 pt-14 text-beige-light " + (below ? "hidden lg:block" : "")}>
          <span className="block font-serif text-xl leading-tight lg:text-2xl">{t.title}</span>
          <span className="mt-1 block text-[13px] text-beige/75">{t.short}</span>
        </span>
      </span>
      {below && (
        <span className="mt-3 block lg:hidden">
          <span className="block font-serif text-lg leading-tight text-charcoal">{t.title}</span>
          <span className="mt-1 block text-[13px] leading-snug text-taupe">{t.short}</span>
        </span>
      )}
    </Link>
  );
}

/**
 * Full-width spread: a lead photo on one side and a cluster of smaller tiles on the other.
 * Works for three to five tiles. With two tiles in the cluster they stack; with three the first runs wide.
 */
export default function Spread({ g, flip = false, first = false, heading = true }: { g: Group; flip?: boolean; first?: boolean; heading?: boolean }) {
  const [lead, ...rest] = roomTiles(g.slug);
  const stacked = rest.length === 2;
  return (
    <div>
      {heading && (
        <Reveal className="mb-6">
          <h3 className="font-serif text-display-md text-charcoal">{g.title}</h3>
          <p className="mt-2 max-w-sm text-[15px] text-taupe">{g.blurb}</p>
        </Reveal>
      )}
      <div className="grid grid-cols-1 gap-4 lg:h-[640px] lg:grid-cols-12 lg:gap-6">
        <Reveal delay={0.08} className={"lg:col-span-5 lg:h-full " + (flip ? "lg:order-2" : "")}>
          <Tile t={lead} priority={first} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-full" />
        </Reveal>
        <div className={"-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-1 scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-7 lg:h-full lg:grid-rows-2 lg:gap-6 " + (flip ? "lg:order-1" : "")}>
          {rest.map((t, i) => {
            const wide = (rest.length === 3 && i === 0) || stacked;
            return (
              <Reveal key={t.key} delay={0.12 + i * 0.06} className={"w-[60vw] shrink-0 snap-start sm:w-auto lg:h-full " + (wide ? "lg:col-span-2" : "")}>
                <Tile t={t} overlay="lg" sizes="(min-width: 1024px) 30vw, 50vw" className={"lg:aspect-auto lg:h-full " + (wide && !stacked ? "aspect-[16/9]" : "aspect-[4/3]")} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
