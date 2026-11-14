import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import DrawIcon from "@/components/motion/DrawIcon";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { pick } from "@/lib/gallery";
import { APPOINTMENT_LINK } from "@/lib/site";

// Each step is shown with a real project photo and a line icon that draws itself in.
const steps = [
  {
    n: "01",
    title: "Tell us about the room",
    text: "Send a few photos or a floor plan on WhatsApp. Within a working day you will have first ideas, a rough budget and a time for us to visit.",
    you: "You send photos",
    where: "On WhatsApp",
    image: pick("curtains", 4),
    caption: "The room as it is",
    icon: "M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm3 15h4M9 8h6",
  },
  {
    n: "02",
    title: "We measure and design",
    text: "We measure every wall and opening, then show you the piece in 3D, in your own room. Change anything you like. Nothing is built until you approve.",
    you: "You approve the 3D design",
    where: "At your home",
    image: { src: "/video/walk-in-closets/walk-in-closets-01.jpg", w: 576, h: 1024, alt: "Our designer measuring a client's walk-in closet" },
    caption: "Measured on site",
    icon: "M3 17l4-4 4 4 5-5 5 5M3 21h18M4 9V5a1 1 0 011-1h3M20 9V5a1 1 0 00-1-1h-3",
  },
  {
    n: "03",
    title: "We build it",
    text: "Your furniture is made in our Dubai workshop in the veneer, lacquer, stone or fabric you chose, and we keep you informed while it is in production.",
    you: "You choose every finish",
    where: "In our Dubai workshop",
    image: { src: "/images/process/workshop.jpg", w: 626, h: 417, alt: "Woodworking workshop with a CNC machine and stacked timber panels" },
    caption: "Made in our workshop",
    icon: "M14 6l4 4-9 9H5v-4l9-9zM12 8l4 4M4 20h16",
  },
  {
    n: "04",
    title: "We fit it",
    text: "Our own team installs, aligns every door and light, and clears the packaging. You receive a finished room, not a delivery.",
    you: "You get a finished room",
    where: "At your home",
    image: pick("sofas", 0),
    caption: "Fitted and finished",
    icon: "M5 12l4 4L19 6",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-beige py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-12 max-w-2xl lg:mb-16">
          <h2 className="font-serif text-display-md text-charcoal">Four steps from first message to finished room</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-taupe">
            One team handles everything, so you never chase a supplier, a carpenter and a fitter separately.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.1}>
          {steps.map((s, i) => (
            <StaggerItem key={s.n} className="flex h-full flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-beige-dark">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/60 to-transparent px-4 pb-3 pt-10 text-[13px] text-beige-light">{s.caption}</span>
                <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-beige-light/90 text-charcoal shadow-[0_6px_16px_-8px_rgba(42,31,24,0.5)]">
                  <DrawIcon d={s.icon} delay={0.3 + i * 0.15} />
                </span>
              </div>
              <div className="flex flex-1 flex-col pt-6">
                <p className="flex items-baseline gap-3">
                  <span className="font-serif text-xl text-gold-dark">{s.n}</span>
                  <span className="text-[13px] text-taupe">{s.where}</span>
                </p>
                <h3 className="mt-1 font-serif text-2xl text-charcoal">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-taupe">{s.text}</p>
                <div className="mt-auto pt-5">
                  <p className="w-fit border border-border px-3 py-1.5 text-[13px] text-charcoal">{s.you}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-serif text-2xl text-charcoal">The first visit and the 3D design are free, and nothing is built until you approve it.</p>
          <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-dark shrink-0">
            <WhatsAppIcon className="h-[18px] w-[18px]" /> Book a free consultation
          </a>
        </Reveal>
      </div>
    </section>
  );
}
