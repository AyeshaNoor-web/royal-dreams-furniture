import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import PlanButton from "@/components/plan/PlanButton";
import { photo } from "@/lib/photo";
import { QUOTE_LINK, SITE } from "@/lib/site";

/** The last ask: amber, loud, two ways in. */
export default function FinalStart() {
  const a = photo("sofas", 24);
  const b = photo("walk-in-closets", 13);
  return (
    <section className="px-3 pb-3 lg:px-5 lg:pb-5">
      <div className="relative mx-auto max-w-[92rem] overflow-hidden rounded-[2.25rem] bg-gold px-5 py-12 text-ink sm:px-8 lg:rounded-[3.5rem] lg:px-14 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 className="font-serif text-display-xl font-semibold text-ink">One photo of the room is <span className="accent">enough to start.</span></h2>
            <p className="lede mt-5 max-w-xl text-ink/80">Send it on WhatsApp or fill the planner. First ideas and a rough budget come back within one working day, and the home visit is free.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="btn bg-ink text-beige hover:bg-pine">
                <WhatsAppIcon className="h-5 w-5 text-whatsapp" /> WhatsApp {SITE.phones[0].display}
              </a>
              <PlanButton className="btn border-2 border-ink text-ink hover:bg-ink hover:text-beige">Use the quote planner</PlanButton>
            </div>
          </Reveal>
          <div className="hidden grid-cols-2 items-end gap-4 lg:col-span-4 lg:grid" aria-hidden="true">
            <div className="relative aspect-[3/5] rotate-[-4deg] overflow-hidden arch bg-ink/10 ring-4 ring-ink"><Image src={a.src} alt="" fill sizes="16vw" className="object-cover" /></div>
            <div className="relative mb-10 aspect-[3/5] rotate-[5deg] overflow-hidden arch bg-ink/10 ring-4 ring-ink"><Image src={b.src} alt="" fill sizes="16vw" className="object-cover" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
