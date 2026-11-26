import Image from "next/image";
import Link from "next/link";
import type { CategoryCardItem } from "@/lib/cards";

/** A collection: one photo, its name, its starting price (or "quoted after a visit") and a peek at three designs. */
export default function CategoryCard({ item, priority = false }: { item: CategoryCardItem; priority?: boolean }) {
  return (
    <Link href={item.href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
        <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" priority={priority} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <h3 className="font-accent text-[1.45rem] font-medium leading-tight text-charcoal group-hover:text-gold-dark sm:text-[1.6rem]">{item.title}</h3>
          <p className={"mt-1.5 font-dm text-[13px] " + (item.priced ? "font-semibold text-gold-dark" : "text-taupe")}>{item.price}</p>
          <p className="mt-0.5 font-dm text-[12.5px] text-taupe">{item.count} {item.count === 1 ? "design" : "designs"}</p>
        </div>
        {item.thumbs.length > 0 && (
          <div className="hidden shrink-0 pt-1 sm:flex" aria-hidden="true">
            {item.thumbs.map((t, i) => (
              <span key={t} className={"relative h-8 w-8 overflow-hidden rounded-full border-2 border-beige bg-mist " + (i ? "-ml-2.5" : "")}>
                <Image src={t} alt="" fill sizes="32px" className="object-cover" />
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
