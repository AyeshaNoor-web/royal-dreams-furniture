import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/gallery";

export function CollectionCard({ item, priority = false }: { item: Category; priority?: boolean }) {
  return (
    <Link href={"/collections/" + item.slug} className="group block">
      <div className="relative aspect-[3/4] bg-beige-dark">
        <Image src={item.cover.src} alt={item.cover.alt} fill priority={priority} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-[1.75rem] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{item.title}</h2>
      </div>
      <p className="mt-1 text-[15px] text-taupe">{item.short}</p>
    </Link>
  );
}
