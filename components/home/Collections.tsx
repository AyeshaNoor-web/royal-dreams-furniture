import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/gallery";

export function CollectionCard({ item, priority = false }: { item: Category; priority?: boolean }) {
  return (
    <Link href={"/collections/" + item.slug} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-4xl bg-beige-dark">
        <Image src={item.cover.src} alt={item.cover.alt} fill priority={priority} sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4 sm:mt-4">
        <h2 className="font-serif text-xl leading-tight sm:text-[1.75rem] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{item.title}</h2>
      </div>
      <p className="mt-1 text-[13px] text-taupe sm:text-[15px]">{item.short}</p>
    </Link>
  );
}
