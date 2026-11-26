import Image from "next/image";
import Link from "next/link";

export interface CardItem {
  href: string;
  title: string;
  /** Small line under the title: the collection name or the price label. */
  meta: string;
  src: string;
  alt: string;
  /** "4 photos", "2 photos + video" */
  media: string;
  hasVideo: boolean;
  type?: string;
  slug: string;
}

/** One product, one photo. The rest of its photos are on its own page; the last line says how many there are. */
export default function ProductCard({ item, priority = false, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" }: { item: CardItem; priority?: boolean; sizes?: string }) {
  return (
    <Link href={item.href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist">
        <Image src={item.src} alt={item.alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
      <h3 className="mt-3.5 font-serif text-lg leading-snug text-charcoal underline-offset-4 group-hover:underline sm:text-xl">{item.title}</h3>
      <p className="mt-1 font-dm text-[15px] text-taupe">{item.meta}</p>
      <p className="mt-0.5 font-dm text-[14px] text-taupe">{item.media === "1 photo" ? "View details" : "View all " + item.media}</p>
    </Link>
  );
}
