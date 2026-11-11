import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { APPOINTMENT_LINK } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Tell us about the room",
    text: "Send a few photos or a floor plan on WhatsApp. Within a working day you will have first ideas, a rough budget and a time for us to visit.",
    you: "You send photos",
  },
  {
    n: "02",
    title: "We measure and design",
    text: "We measure every wall and opening, then show you the piece in 3D, in your own room. Change anything you like. Nothing is built until you approve.",
    you: "You approve the 3D design",
  },
  {
    n: "03",
    title: "We build it",
    text: "Your furniture is made in our Dubai workshop in the veneer, lacquer, stone or fabric you chose, and we keep you informed while it is in production.",
    you: "You choose every finish",
  },
  {
    n: "04",
    title: "We fit it",
    text: "Our own team installs, aligns every door and light, and clears the packaging. You receive a finished room, not a delivery.",
    you: "You get a finished room",
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

        {/* Timeline: a rule runs across the top with a numbered marker at each step */}
        <Stagger className="relative grid grid-cols-1 gap-10 border-t border-border sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" stagger={0.1}>
          {steps.map((s) => (
            <StaggerItem key={s.n} className="relative pt-8">
              <span className="absolute -top-px left-0 h-[2px] w-12 bg-gold-dark" aria-hidden="true" />
              <p className="font-serif text-3xl text-gold-dark">{s.n}</p>
              <h3 className="mt-3 font-serif text-2xl text-charcoal">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-taupe">{s.text}</p>
              <p className="mt-5 inline-block border border-border px-3 py-1.5 text-[13px] text-charcoal">{s.you}</p>
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
