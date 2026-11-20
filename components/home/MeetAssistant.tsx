"use client";

import Reveal from "@/components/motion/Reveal";
import Mascot from "@/components/chat/Mascot";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { openAssistant } from "@/lib/chat-events";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

const openers = [
  "What would suit a small living room?",
  "Which finishes do you offer?",
  "How does the free home visit work?",
  "Can you make something I saw on Instagram?",
];

/** Introduces the assistant by name and sends the visitor straight into a conversation. */
export default function MeetAssistant() {
  const { name, role } = SITE.assistant;
  return (
    <section className="border-y border-border bg-beige-light py-12 sm:py-16 lg:py-20" aria-labelledby="meet-assistant">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <Reveal className="flex items-center gap-5 lg:col-span-4 lg:flex-col lg:items-start">
          <Mascot className="h-24 w-24 shrink-0 sm:h-28 sm:w-28 lg:h-40 lg:w-40" />
          <div>
            <h2 id="meet-assistant" className="font-serif text-display-md text-charcoal">Meet {name}.</h2>
            <p className="mt-2 text-[15px] text-taupe">{role.charAt(0).toUpperCase() + role.slice(1)} at {SITE.shortName}, here around the clock.</p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-8">
          <p className="max-w-xl text-[16px] leading-relaxed text-taupe">
            Ask about a room, a finish or a budget and {name} answers in seconds from what we actually do, points you to the right collection, and hands you to a designer on WhatsApp whenever you want a person.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={"Questions to ask " + name}>
            {openers.map((q) => (
              <li key={q}>
                <button type="button" onClick={() => openAssistant(q)} className="inline-flex min-h-[44px] items-center rounded-full border border-charcoal/35 bg-beige px-4 font-dm text-[14px] text-charcoal transition-colors [touch-action:manipulation] hover:border-charcoal hover:bg-beige-dark/40">
                  {q}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => openAssistant()} className="btn-dark min-h-[48px]">Ask {name} <span aria-hidden="true">&rarr;</span></button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-line min-h-[48px]"><WhatsAppIcon className="h-[18px] w-[18px]" /> Talk to a designer</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
