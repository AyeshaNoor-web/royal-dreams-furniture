import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import QuickInquiryForm from "@/components/contact/QuickInquiryForm";
import { SITE, whatsappLink } from "@/lib/site";

const points = [
  "Complimentary consultation and site measurement",
  "3D design and fixed quotation before production",
  "Built in our workshop and installed by our own team",
];

export default function InquiryBand() {
  return (
    <section id="enquire" className="py-12 sm:py-16 lg:py-24 bg-ink text-charcoal on-dark scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        <Reveal className="lg:col-span-5">
          <h2 className="ruled-heading font-serif text-display-md text-charcoal mb-6">Tell us about your space</h2>
          <p className="font-dm text-sm text-charcoal/65 leading-relaxed max-w-md mb-7">
            Share a photo, a sketch or a floor plan. We will visit to measure, prepare a 3D design and provide a fixed quotation before any work begins.
          </p>
          <ul className="hidden flex-col gap-3 mb-9 sm:flex">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 font-dm text-sm text-charcoal/85">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            {SITE.phones.map((p) => (
              <a key={p.intl} href={whatsappLink("Hello! I would like a free consultation for custom furniture.", p.intl)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-3 font-serif text-2xl text-charcoal hover:text-gold transition-colors">
                <WhatsAppIcon className="w-5 h-5 text-[#128C7E]" />
                {p.display}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <QuickInquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
