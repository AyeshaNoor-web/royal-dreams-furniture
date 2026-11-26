import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free home consultation with Modern Furniture Collection. WhatsApp, Instagram or email enquiry for made-to-measure furniture across the UAE.",
};

const checklist = [
  "A photo or two of the room, from the doorway if you can",
  "Rough dimensions, or a floor plan if you have one",
  "Finishes or pieces you like, even from Instagram",
  "When you would like the work finished",
];

export default function ContactPage() {
  const phone = SITE.phones[0];
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        crumbs={[{ label: "Contact" }]}
        title="Let us talk about your home."
        intro="Send a photo or floor plan of the room and tell us what you have in mind. Our design team will reply within one working day with ideas, a time to measure and a quotation."
      />

      <section className="py-section-sm">
        <div className="wrap grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: the fastest route first, then every other way to reach us, then what to send */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal>
              <div className="rounded-3xl bg-charcoal p-7 text-white lg:p-8">
                <h2 className="font-accent text-3xl font-medium">Quickest reply: WhatsApp</h2>
                <p className="mt-2 text-[15px] text-white/75">Message us with a photo of the room and we will come back to you the same working day.</p>
                <a href={whatsappLink("Hello, I would like a free consultation for made-to-measure furniture.")} target="_blank" rel="noopener noreferrer" className="btn-wa mt-6 w-full sm:w-auto">
                  <WhatsAppIcon className="h-[18px] w-[18px]" /> Chat on WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="divide-y divide-border border-y border-border">
                <div className="grid grid-cols-[110px_1fr] gap-4 py-5">
                  <dt className="text-[14px] text-taupe">Call</dt>
                  <dd><a href={"tel:+" + phone.intl} className="font-accent text-3xl font-medium text-charcoal hover:text-gold-text">{phone.display}</a></dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-4 py-5">
                  <dt className="text-[14px] text-taupe">Instagram</dt>
                  <dd className="flex flex-col gap-1.5">
                    {SITE.instagramAccounts.map((ig) => (
                      <a key={ig.handle} href={ig.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[16px] text-charcoal hover:text-gold-text">
                        <InstagramIcon className="h-4 w-4" /> {ig.handle}
                      </a>
                    ))}
                  </dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-4 py-5">
                  <dt className="text-[14px] text-taupe">Showroom</dt>
                  <dd className="text-[16px] text-charcoal">
                    {SITE.showroom.display}
                    <span className="mt-1 block text-[14px] text-taupe">Visits by appointment. Home measurement across all seven Emirates.</span>
                    <a href={SITE.showroom.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-link text-[14px] hover:text-gold-text">Open in Google Maps</a>
                  </dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-4 py-5">
                  <dt className="text-[14px] text-taupe">Reply time</dt>
                  <dd className="text-[16px] text-charcoal">Within one working day</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.14}>
              <h3 className="font-serif text-xl text-charcoal">Helpful to include</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {checklist.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[15px] text-taupe">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right: the email form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-10">
              <h2 className="font-accent text-3xl font-medium text-charcoal">Prefer email? Send the details here.</h2>
              <p className="mt-2 mb-8 text-[15px] text-taupe">Everything you type reaches our design team directly.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
