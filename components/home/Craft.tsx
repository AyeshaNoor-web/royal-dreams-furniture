import Image from "next/image";
import { categories } from "@/lib/gallery";

const chapters = [
  { title: "Measure", body: "We visit your home, laser-measure every wall, ceiling height and socket, and listen to how the room is used before anything is drawn.", image: categories[0].images[5] },
  { title: "Material", body: "Walnut or oak veneer, painted lacquer in any colour, fluted panels, bronze or clear glass. You see samples in the room, under your own light.", image: categories[1].images[0] },
  { title: "Light", body: "LED strips, lit niches and glass-front doors are planned into the drawings. Light is part of the furniture, never an afterthought.", image: categories[3].images[0] },
  { title: "Install", body: "Built in our workshop, fitted by our own team. We align every door and strip, then hand you the room ready to live in.", image: categories[2].images[1] },
];

export default function Craft() {
  return (
    <section id="process" className="bg-charcoal py-section text-beige-light">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="max-w-2xl font-serif text-display-lg">From your wall to our workshop and back.</h2>
        <ol className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {chapters.map((c, i) => (
            <li key={c.title} className="grid grid-cols-[38%_1fr] gap-5 sm:block">
              <div className="relative aspect-[3/4]">
                <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 38vw" className="object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-[1.75rem] sm:mt-5"><span className="tabular-nums text-gold">{i + 1}</span> {c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-beige/80">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
