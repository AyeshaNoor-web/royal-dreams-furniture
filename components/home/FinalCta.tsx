import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { pick } from "@/lib/gallery";
import { APPOINTMENT_LINK } from "@/lib/site";

const promises = ["Free home consultation and site measurement", "3D design and a fixed quotation before production", "Built in our workshop, fitted by our own team"];

export default function FinalCta() {
  const photo = pick("beds", 4); // white boucle bed in a panelled bedroom
  return (
    <section className="bg-beige py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 overflow-hidden bg-charcoal text-beige-light on-dark lg:grid-cols-12">
          <Reveal className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[480px]">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:p-14">
            <h2 className="ruled-heading font-serif text-display-md text-beige-light">Ready when you are</h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-beige/70">
              Send a photo of the room today and we will reply within one working day with ideas and a time to visit.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:gap-3">
              {promises.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-beige/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-9">
              <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-lit">
                <WhatsAppIcon className="h-[18px] w-[18px]" /> Book a free consultation
              </a>
              <Link href="/contact" className="text-link text-beige/80 hover:text-gold">Send an enquiry instead</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
