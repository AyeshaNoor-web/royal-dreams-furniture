import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { APPOINTMENT_LINK } from "@/lib/site";

const steps = [
  { n: "01", title: "Consult", text: "Share photos or a floor plan on WhatsApp and we will discuss finishes, lighting and budget." },
  { n: "02", title: "Measure & design", text: "We visit your home, measure precisely and present a 3D design for your approval." },
  { n: "03", title: "Craft", text: "Your furniture is built in our own workshop in the veneer, lacquer or glass you selected." },
  { n: "04", title: "Install", text: "Our fitters install, align every door and light, and hand over a room that is ready to use." },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-serif text-display-md text-charcoal">From consultation to installation</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border" stagger={0.08}>
          {steps.map((s) => (
            <StaggerItem key={s.n} className="bg-beige-light p-7 lg:p-8">
              <p className="font-serif text-3xl text-gold-dark mb-4">{s.n}</p>
              <h3 className="font-serif text-2xl text-charcoal mb-2">{s.title}</h3>
              <p className="font-dm text-sm text-taupe leading-relaxed">{s.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-center">
          <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-dark">
            <WhatsAppIcon className="w-4 h-4" /> Book a free consultation
          </a>
        </Reveal>
      </div>
    </section>
  );
}
