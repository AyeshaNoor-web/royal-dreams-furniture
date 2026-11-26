import Link from "next/link";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { APPOINTMENT_LINK } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="section-rule py-section-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-end lg:px-10">
        <div>
          <h2 className="font-serif text-display-md">Ready to begin?</h2>
          <p className="mt-3 max-w-md text-[17px] text-taupe">Share a photo or floor plan of your space. We will visit to measure, prepare a 3D design and provide a fixed quotation before any work begins.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="btn-dark">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Start on WhatsApp
          </a>
          <Link href="/contact" className="text-link hover:text-gold-text">Send an enquiry instead</Link>
        </div>
      </div>
    </section>
  );
}
