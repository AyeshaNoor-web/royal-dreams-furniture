import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free consultation with Modern Furniture Collection. WhatsApp, Instagram or email enquiry for custom furniture across the UAE.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Let us talk about your home." intro="Send a photo or floor plan of the room and tell us what you have in mind. Our design team will reply within one working day with ideas, a time to measure and a quotation. WhatsApp is the quickest way to reach us." />
      <section className="pb-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
          <div className="lg:col-span-4">
            <ul className="border-b border-border">
              {SITE.phones.map((p) => (
                <li key={p.intl} className="border-t border-border">
                  <a href={whatsappLink("Hello! I would like a free consultation for custom furniture.", p.intl)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-5 hover:text-gold-text">
                    <span className="font-serif text-[1.75rem] tabular-nums">{p.display}</span>
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                </li>
              ))}
              <li className="border-t border-border">
                <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="block py-5 text-[17px] hover:text-gold-text">{SITE.instagramHandle}</a>
              </li>
              <li className="border-t border-border py-5 text-[17px]">
                All seven Emirates
                <span className="block text-[15px] text-taupe">Workshop and showroom in {SITE.location.split(",")[0]}. Home visits by appointment.</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="mb-8 font-serif text-3xl">Prefer email? Send the details here.</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
