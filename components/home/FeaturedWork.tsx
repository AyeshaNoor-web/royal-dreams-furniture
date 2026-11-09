import Image from "next/image";
import Link from "next/link";
import { featured } from "@/lib/gallery";

export default function FeaturedWork() {
  const plates = featured.filter((i) => i.h > i.w);
  return (
    <section className="bg-beige-light py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-display-lg">Finished rooms</h2>
          <Link href="/gallery" className="text-link hover:text-gold-text">View the gallery</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-14">
          {plates.map((img) => (
            <Link key={img.src} href={"/collections/" + img.category} className="group block">
              <div className="relative aspect-[3/4] bg-beige-dark">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
              </div>
              <p className="mt-3 font-serif text-xl leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{img.categoryTitle}</p>
              <p className="mt-1 text-[15px] leading-snug text-taupe">{img.alt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
