"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { quoteItems } from "@/lib/quote-link";
import { SITE, whatsappLink } from "@/lib/site";

/** The closing band: contact details on the left, a short form on the right that opens WhatsApp with the message written. */
export default function ContactBand() {
  const [name, setName] = useState("");
  const [need, setNeed] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const send = () => {
    if (!name.trim()) return setError("Please add your name so we know who is writing.");
    setError("");
    const lines = ["Hello Modern Furniture Collection.", "", "Name: " + name.trim()];
    if (need) lines.push("I am interested in: " + need);
    if (msg.trim()) lines.push("Message: " + msg.trim());
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const field = "w-full rounded-md border border-white/30 bg-white/10 px-4 py-3 font-dm text-base text-white placeholder:text-white/55 focus:border-white focus:outline-none";
  const label = "mb-2 block font-dm text-[15px] text-white/85";

  return (
    <section className="bg-ink text-white" aria-labelledby="contact-band-h">
      <div className="wrap grid grid-cols-1 gap-10 py-section-sm lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <h2 id="contact-band-h" className="font-serif text-display-lg font-medium">Still have something to discuss?</h2>
          <p className="mt-4 max-w-md font-dm text-lg leading-relaxed text-white/80">Tell us about the room. Your message opens in WhatsApp, and we reply within a working day.</p>
          <dl className="mt-8 flex flex-col gap-4 font-dm text-[17px]">
            <div>
              <dt className="text-sm text-white/60">Call or WhatsApp</dt>
              <dd><a href={"tel:+" + SITE.phones[0].intl} className="underline-offset-4 hover:underline">{SITE.phones[0].display}</a></dd>
            </div>
            <div>
              <dt className="text-sm text-white/60">Showroom</dt>
              <dd>{SITE.showroom.display}, by appointment</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cb-name" className={label}>Your name</label>
              <input id="cb-name" className={field} value={name} onChange={(e) => { setName(e.target.value); setError(""); }} autoComplete="name" maxLength={60} aria-required="true" />
            </div>
            <div>
              <label htmlFor="cb-need" className={label}>What you need</label>
              <select id="cb-need" className={field + " [&>option]:text-charcoal"} value={need} onChange={(e) => setNeed(e.target.value)}>
                <option value="">Choose one (optional)</option>
                {quoteItems.map((q) => (
                  <option key={q.id} value={q.label}>{q.label}</option>
                ))}
              </select>
            </div>
          </div>
          <label htmlFor="cb-msg" className={label + " mt-4"}>Message</label>
          <textarea id="cb-msg" className={field + " min-h-[120px]"} value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={500} placeholder="The room, rough sizes, or a design you liked" />
          <p role="alert" className={"mt-3 font-dm text-[15px] font-medium text-white " + (error ? "" : "hidden")}>{error}</p>
          <button type="button" onClick={send} className="btn-wa mt-5"><WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp</button>
        </div>
      </div>
    </section>
  );
}
