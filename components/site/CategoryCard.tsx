import Image from "next/image";
import Link from "next/link";
import type { CategoryCardItem } from "@/lib/cards";

/** A collection: one photo, and its name. */
export default function CategoryCard({ item, priority = false }: { item: CategoryCardItem; priority?: boolean }) {
  return (
    <Link href={item.href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist">
        <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" priority={priority} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
      <h3 className="mt-4 font-serif text-xl leading-snug text-charcoal underline-offset-4 group-hover:underline sm:text-[1.375rem]">{item.title}</h3>
    </Link>
  );
}
