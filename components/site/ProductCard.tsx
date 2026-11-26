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

/** One product, one photo. The rest of its photos are on its own page. */
export default function ProductCard({ item, priority = false, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" }: { item: CardItem; priority?: boolean; sizes?: string }) {
  return (
    <Link href={item.href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
        <Image src={item.src} alt={item.alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 font-dm text-[11px] font-semibold text-charcoal shadow-sm backdrop-blur">
          {item.hasVideo ? (
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          ) : (
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 16l-5-5-7 8" /></svg>
          )}
          {item.media}
        </span>
        <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between rounded-full bg-charcoal/90 py-2 pl-4 pr-2 font-dm text-[13px] font-semibold text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          View details
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-charcoal" aria-hidden="true">&rarr;</span>
        </span>
      </div>
      <div className="mt-3.5 px-0.5">
        <h3 className="font-accent text-[1.3rem] font-medium leading-snug text-charcoal group-hover:text-gold-dark sm:text-[1.4rem]">{item.title}</h3>
        <p className="mt-1 font-dm text-[13px] text-taupe">{item.meta}</p>
      </div>
    </Link>
  );
}
