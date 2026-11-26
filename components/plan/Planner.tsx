"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getCategory } from "@/lib/gallery";
import { PLAN_EVENT, planPieces, type PlanDetail } from "@/lib/plan";
import { SITE, whatsappLink } from "@/lib/site";
import PlannerSummary from "./PlannerSummary";

const emirates = ["Dubai", "Sharjah", "Ajman", "Abu Dhabi", "Al Ain", "Ras Al Khaimah", "Umm Al Quwain", "Fujairah"];
const timings = ["As soon as possible", "Within a month", "In two or three months", "Just exploring"];
const titles = ["What are we making?", "Where and when?", "Who should we reply to?"];

export interface PlanState {
  pieces: string[];
  emirate: string;
  timing: string;
  name: string;
  phone: string;
  note: string;
}

const empty: PlanState = { pieces: [], emirate: "", timing: "", name: "", phone: "", note: "" };
const labelOf = (id: string) => planPieces.find((p) => p.id === id)?.label ?? id;

/** The brief as the WhatsApp message the team receives. */
export const briefText = (s: PlanState) =>
  [
    "Hello Modern Furniture Collection, I would like a free quote.",
    "",
    s.pieces.length ? "I am planning: " + s.pieces.map(labelOf).join(", ") + "." : "",
    s.emirate ? "My home is in " + s.emirate + "." : "",
    s.timing ? "Timing: " + s.timing.toLowerCase() + "." : "",
    s.note ? "Notes: " + s.note : "",
    s.name ? "My name is " + s.name + "." : "",
    "",
    "I can send photos and sizes of the room.",
  ].filter((l, i, a) => l !== "" || (i > 0 && a[i - 1] !== "")).join("\n").trim();

const field = "w-full border border-beige/20 bg-beige/[0.07] px-4 py-3.5 text-[16px] text-beige placeholder:text-beige/40 transition-colors focus:border-gold focus:outline-none";

/** The funnel: three small questions, then the brief opens in WhatsApp already written. */
export default function Planner({ initial = [] }: { initial?: string[] }) {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<PlanState>({ ...empty, pieces: initial });
  const [sent, setSent] = useState(false);
  const [nameError, setNameError] = useState(false);
  const reduce = useReducedMotion();
  const top = useRef<HTMLDivElement>(null);

  // Buttons elsewhere on the page, and links from other pages (/?plan=sofas,beds&note=...), prefill the planner.
  useEffect(() => {
    const apply = (d: PlanDetail) => {
      const ids = (d.pieces ?? []).filter((id) => planPieces.some((p) => p.id === id));
      setSent(false);
      setS((prev) => ({ ...prev, pieces: Array.from(new Set([...prev.pieces, ...ids])), note: d.note ? d.note : prev.note }));
      setStep((cur) => (ids.length && cur === 0 ? 1 : cur));
    };
    const q = new URLSearchParams(window.location.search);
    if (q.get("plan") || q.get("note")) apply({ pieces: (q.get("plan") ?? "").split(",").filter(Boolean), note: q.get("note") ?? undefined });
    const on = (e: Event) => apply((e as CustomEvent<PlanDetail>).detail ?? {});
    window.addEventListener(PLAN_EVENT, on);
    return () => window.removeEventListener(PLAN_EVENT, on);
  }, []);

  const toggle = (id: string) => setS((p) => ({ ...p, pieces: p.pieces.includes(id) ? p.pieces.filter((x) => x !== id) : [...p.pieces, id] }));
  const go = (n: number) => {
    setStep(n);
    if (top.current && top.current.getBoundingClientRect().top < 0) top.current.scrollIntoView({ block: "start" });
  };
  const link = useMemo(() => whatsappLink(briefText(s)), [s]);

  const send = (e: React.MouseEvent) => {
    if (!s.name.trim()) { e.preventDefault(); setNameError(true); return; }
    setSent(true);
    // A background record for the team when a phone number was left. WhatsApp is the real channel, so failures are silent.
    if (s.phone.trim()) {
      fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: s.name, phone: s.phone, interest: s.pieces.map(labelOf).join(", ").slice(0, 80), message: briefText(s), source: "planner" }) }).catch(() => undefined);
    }
  };

  const canNext = step === 0 ? s.pieces.length > 0 : true;

  return (
    <section id="plan" className="scroll-mt-24 px-3 lg:px-5">
      <div ref={top} className="pine-stage on-dark mx-auto grid max-w-[92rem] scroll-mt-24 grid-cols-1 gap-8 rounded-[2.25rem] px-5 py-10 text-beige sm:px-8 lg:grid-cols-12 lg:gap-12 lg:rounded-[3.5rem] lg:px-14 lg:py-16">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">Free quote planner</p>
          <h2 className="font-serif text-display-lg text-beige">Your quote, in <span className="accent text-gold">three taps.</span></h2>

          {sent ? (
            <div role="status" className="mt-8 rounded-4xl bg-beige p-6 text-charcoal lg:p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink"><WhatsAppIcon className="h-7 w-7" /></span>
              <h3 className="mt-4 font-serif text-[28px] font-semibold">Your brief is waiting in WhatsApp{s.name ? ", " + s.name.split(" ")[0] : ""}.</h3>
              <p className="mt-2 text-[16px] text-taupe">Press send there, then add a photo of the room if you have one. We reply within one working day with first ideas and a time to visit.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={link} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-5 w-5" /> Open WhatsApp again</a>
                <button type="button" onClick={() => { setSent(false); setS({ ...empty, pieces: initial }); setStep(0); }} className="btn-line">Start another</button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-7 flex items-center gap-3" aria-hidden="true">
                {titles.map((t, i) => (
                  <span key={t} className={"h-2 flex-1 rounded-full transition-colors duration-300 " + (i <= step ? "bg-gold" : "bg-beige/15")} />
                ))}
              </div>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-beige/60">Step {step + 1} of 3</p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} initial={{ opacity: 0, x: reduce ? 0 : 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduce ? 0 : -24 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                  <h3 className="mt-2 font-serif text-[28px] font-semibold text-beige lg:text-[34px]">{titles[step]}</h3>

                  {step === 0 && (
                    <div role="group" aria-label="Pieces" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {planPieces.map((p) => {
                        const on = s.pieces.includes(p.id);
                        const img = p.slug ? getCategory(p.slug)?.cover : undefined;
                        return (
                          <button key={p.id} type="button" aria-pressed={on} onClick={() => toggle(p.id)} className={"flex min-h-[60px] items-center gap-3 rounded-full border p-1.5 pr-4 text-left text-[14px] font-semibold leading-tight transition-colors [touch-action:manipulation] " + (on ? "border-gold bg-gold text-ink" : "border-beige/20 bg-beige/[0.06] text-beige hover:border-beige/60")}>
                            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-beige/15">
                              {img ? <Image src={img.src} alt="" fill sizes="48px" className="object-cover" /> : <span aria-hidden="true" className="text-[20px]">+</span>}
                              {on && <span className="absolute inset-0 flex items-center justify-center bg-ink/55 text-gold"><svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg></span>}
                            </span>
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="mt-5 flex flex-col gap-6">
                      <div>
                        <p id="pl-em" className="text-[14px] font-semibold text-beige/80">Which Emirate is the home in?</p>
                        <div role="radiogroup" aria-labelledby="pl-em" className="mt-2 flex flex-wrap gap-2">
                          {emirates.map((x) => <button key={x} type="button" role="radio" aria-checked={s.emirate === x} onClick={() => setS((p) => ({ ...p, emirate: p.emirate === x ? "" : x }))} className="chip-dark">{x}</button>)}
                        </div>
                      </div>
                      <div>
                        <p id="pl-ti" className="text-[14px] font-semibold text-beige/80">When would you like it fitted?</p>
                        <div role="radiogroup" aria-labelledby="pl-ti" className="mt-2 flex flex-wrap gap-2">
                          {timings.map((x) => <button key={x} type="button" role="radio" aria-checked={s.timing === x} onClick={() => setS((p) => ({ ...p, timing: p.timing === x ? "" : x }))} className="chip-dark">{x}</button>)}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="pl-name" className="mb-1.5 block text-[14px] font-semibold text-beige/80">Your name</label>
                        <input id="pl-name" value={s.name} onChange={(e) => { setNameError(false); setS((p) => ({ ...p, name: e.target.value })); }} autoComplete="name" placeholder="First name is enough" aria-invalid={nameError} aria-describedby={nameError ? "pl-name-err" : undefined} className={field + (nameError ? " border-gold" : "")} />
                        {nameError && <p id="pl-name-err" role="alert" className="mt-1.5 text-[13px] font-semibold text-gold">Please add your name so we know who to reply to.</p>}
                      </div>
                      <div>
                        <label htmlFor="pl-phone" className="mb-1.5 block text-[14px] font-semibold text-beige/80">Phone, if you prefer a call <span className="font-normal text-beige/50">(optional)</span></label>
                        <input id="pl-phone" type="tel" value={s.phone} onChange={(e) => setS((p) => ({ ...p, phone: e.target.value }))} autoComplete="tel" placeholder="050 000 0000" className={field} />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="pl-note" className="mb-1.5 block text-[14px] font-semibold text-beige/80">Anything we should know? <span className="font-normal text-beige/50">(optional)</span></label>
                        <textarea id="pl-note" rows={3} value={s.note} onChange={(e) => setS((p) => ({ ...p, note: e.target.value }))} placeholder="Rough sizes, finishes you like, a picture you saw" className={field + " resize-y"} />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
                {step > 0 && <button type="button" onClick={() => go(step - 1)} className="btn-line-light">Back</button>}
                {step < 2 ? (
                  <button type="button" disabled={!canNext} onClick={() => go(step + 1)} className="btn-lit disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none">
                    {step === 0 && !s.pieces.length ? "Choose at least one" : "Continue"} <span aria-hidden="true">&rarr;</span>
                  </button>
                ) : (
                  <a href={link} target="_blank" rel="noopener noreferrer" onClick={send} className="btn-wa">
                    <WhatsAppIcon className="h-5 w-5" /> Send my brief on WhatsApp
                  </a>
                )}
                {step === 1 && <button type="button" onClick={() => go(2)} className="min-h-[44px] px-2 text-[14px] font-semibold text-beige/70 underline decoration-beige/30 underline-offset-4 hover:text-beige">Skip</button>}
              </div>
              {step === 2 && <p className="mt-3 text-[13px] text-beige/60">Opens WhatsApp with your brief already written to {SITE.phones[0].display}. Nothing is sent until you press send.</p>}
            </>
          )}
        </div>

        <div className="lg:col-span-5">
          <PlannerSummary state={s} labelOf={labelOf} />
        </div>
      </div>
    </section>
  );
}
