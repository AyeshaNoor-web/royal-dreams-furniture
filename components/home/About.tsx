import Image from "next/image";
import Link from "next/link";
import { aboutImages } from "@/lib/gallery";

const points = [
  "Free consultation and site measurement",
  "3D visual before anything is cut",
  "Built in our own workshop, installed by our own team",
];

export default function About() {
  return (
    <section id="about" className="py-section scroll-mt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="relative aspect-[3/4] lg:col-span-5">
          <Image src={aboutImages.primary.src} alt={aboutImages.primary.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
          <h2 className="font-serif text-display-lg">We make<br />new furniture.</h2>
          <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-charcoal-light">
            From a single fitted wardrobe to the full joinery of a villa, we design, build and install pieces that fit your rooms exactly. Classical wall paneling, glass-front walk-in closets, backlit media walls and dressing tables, finished in walnut, oak, painted lacquer or any colour you can show us.
          </p>
          <ul className="mt-10 border-b border-border">
            {points.map((p) => (
              <li key={p} className="border-t border-border py-4 text-[17px]">{p}</li>
            ))}
          </ul>
          <Link href="/about" className="text-link mt-8 inline-block hover:text-gold-text">Our story</Link>
        </div>
      </div>
    </section>
  );
}
