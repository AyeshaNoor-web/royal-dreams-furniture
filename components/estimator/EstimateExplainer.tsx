import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { quoteFactors } from "@/lib/quote";
import { APPOINTMENT_LINK } from "@/lib/site";

const steps = [
  { title: "How the range is worked out", text: "Your size times a rate band for the finish level you chose, plus any options, rounded to the nearest 100 dirhams. Both ends of the band are shown because the real figure depends on things only a visit can confirm." },
  { title: "What moves the budget", text: "Finish and material above all: lacquer sits at one end, marble, stone and leather at the other. Then size, lighting, internal fittings and anything curved or unusual. The list under each collection on this page spells it out." },
  { title: "What happens next", text: "A free home visit to measure every wall and opening, a 3D design of the piece in your room, then a fixed written quotation. Nothing is built until you approve both." },
];

/** Sets expectations under the flow: how the number is made and why it is a range. Server component. */
export default function EstimateExplainer() {
  const factors = quoteFactors.slice(0, 6);
  return (
    <section className="border-t border-border bg-beige-light py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-serif text-display-md text-charcoal">Why a range, and what changes it</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title}>
              <p className="text-[13px] text-taupe">0{i + 1}</p>
              <h3 className="mt-1 font-serif text-xl text-charcoal">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-taupe">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-4 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {factors.map((f) => (
            <div key={f.slug} className="text-[14px] text-taupe">
              <p className="text-charcoal">{f.slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}</p>
              <p className="mt-1">{f.depends.join(". ")}.</p>
            </div>
          ))}
        </div>
        <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-dark mt-10 min-h-[48px]">
          <WhatsAppIcon className="h-[18px] w-[18px]" /> Book the free visit
        </a>
      </div>
    </section>
  );
}
