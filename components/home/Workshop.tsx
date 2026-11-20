import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { pick } from "@/lib/gallery";
import { APPOINTMENT_LINK } from "@/lib/site";

const points = [
  { title: "One team, start to finish", text: "The people who measure your room also design the piece, build it and fit it. Nothing is passed to a subcontractor." },
  { title: "A fixed quotation before production", text: "You approve the 3D design and the price before anything is cut." },
  { title: "Samples brought to your home", text: "Fabric, veneer and stone samples come to you, so you judge them in your own light." },
];

const samples = ["Walnut veneer", "Oak veneer", "Lacquer", "Marble", "Stone", "Boucle", "Velvet", "Leather", "Tinted glass"];

export default function Workshop() {
  const photo = pick("fitted-wardrobes", 0);
  return (
    <section className="section-rule section-rule-b bg-beige-light py-12 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-10">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden bg-beige-dark sm:aspect-[3/4]">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/60 to-transparent px-5 pb-4 pt-12 text-[13px] text-beige-light">Fitted wardrobe on installation day</span>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="ruled-heading font-serif text-display-md text-charcoal">Made in our own workshop</h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-taupe">
              Everything on this site was built in our workshop in Dubai, from the curtains to the walk-in closets. Working this way means the quotation is the maker&apos;s own price, and the person who measured your room is the one who makes sure the piece fits it.
            </p>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 sm:grid-cols-3">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={0.06 * i} className="border-t border-border pt-4">
                <h3 className="font-serif text-xl text-charcoal">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-taupe">{p.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-6 sm:mt-8">
            <p className="text-[14px] text-taupe">Samples we bring to your visit</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {samples.map((s) => (
                <li key={s} className="border border-border bg-beige px-3 py-1.5 text-[13px] text-charcoal">{s}</li>
              ))}
            </ul>
            <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-dark mt-8">
              <WhatsAppIcon className="h-[18px] w-[18px]" /> Book a visit
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
