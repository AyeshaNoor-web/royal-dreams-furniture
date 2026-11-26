"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { quoteItems } from "@/lib/quote-link";
import { SITE, whatsappLink } from "@/lib/site";

export interface DesignRef {
  slug: string;
  id: string;
  title: string;
  category: string;
  src: string;
  href: string;
}

const emirates = ["Dubai", "Sharjah", "Ajman", "Abu Dhabi", "Al Ain", "Ras Al Khaimah", "Umm Al Quwain", "Fujairah"];
const timings = ["As soon as possible", "Within a month", "In a few months", "Just planning"];
const starts = [
  { id: "visit", title: "Free home visit", text: "We come to you, measure the room and bring samples." },
  { id: "photos", title: "Photos first", text: "You send photos and sizes on WhatsApp for a first rough figure." },
];
const steps = ["What you need", "Your room", "Your details"];

interface State {
  items: string[];
  emirate: string;
  size: string;
  timing: string;
  start: string;
  name: string;
  phone: string;
  note: string;
}

const label = (id: string) => quoteItems.find((q) => q.id === id)?.label ?? id;

function brief(s: State, design: DesignRef | null, extra: string) {
  const lines = ["Hello Modern Furniture Collection, I would like a free quotation.", ""];
  if (s.name) lines.push("Name: " + s.name);
  if (s.items.length) lines.push("I need: " + s.items.map(label).join(", "));
  if (design) lines.push("Design I liked: " + design.title + " (" + SITE.url + design.href + ")");
  if (extra) lines.push(extra);
  if (s.size) lines.push("Rough size: " + s.size);
  if (s.emirate) lines.push("Location: " + s.emirate);
  if (s.timing) lines.push("Timing: " + s.timing);
  lines.push("How to start: " + (s.start === "visit" ? "a free home visit and measurement" : "I will send photos and sizes here first"));
  if (s.note) lines.push("Notes: " + s.note);
  return lines.join("\n");
}

function Summary({ s, design, extra }: { s: State; design: DesignRef | null; extra: string }) {
  const row = (k: string, v: string) => (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-0">
      <dt className="font-dm text-[13px] text-taupe">{k}</dt>
      <dd className={"text-right font-dm text-[14px] " + (v ? "font-semibold text-charcoal" : "text-taupe-light")}>{v || "Not chosen yet"}</dd>
    </div>
  );
  return (
    <aside className="rounded-lg border border-border bg-white p-5 sm:p-6" aria-label="Your brief so far">
      <p className="font-serif text-xl font-medium text-charcoal">Your brief</p>
      {design && (
        <Link href={design.href} className="mt-4 flex items-center gap-3 rounded-lg bg-sand p-2.5 hover:bg-beige-dark/60">
          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-mist"><Image src={design.src} alt="" fill sizes="64px" className="object-cover" /></span>
          <span className="min-w-0">
            <span className="block font-dm text-sm font-medium text-taupe">Design you liked</span>
            <span className="block truncate font-dm text-[14px] font-semibold text-charcoal">{design.title}</span>
          </span>
        </Link>
      )}
      <dl className="mt-3">
        {row("You need", s.items.map(label).join(", "))}
        {extra && row("From the price guide", extra)}
        {row("Location", s.emirate)}
        {row("Timing", s.timing)}
        {row("Start with", s.start === "visit" ? "Free home visit" : "Photos first")}
      </dl>
      <ul className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 font-dm text-[15px] text-taupe">
        {["Home visit and measurement: free", "3D design before anything is built", "Written quotation, no obligation"].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </aside>
  );
}

/** The quote funnel: three short steps, then the brief opens in WhatsApp ready to send. */
export default function QuoteWizard({ designs }: { designs: DesignRef[] }) {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [design, setDesign] = useState<DesignRef | null>(null);
  const [extra, setExtra] = useState("");
  const [s, setS] = useState<State>({ items: [], emirate: "", size: "", timing: "", start: "visit", name: "", phone: "", note: "" });
  const top = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  // Whatever the visitor was looking at arrives in the address: ?item=sofas&design=cream-sofa-bed&note=...
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const item = q.get("item");
    const d = q.get("design");
    const note = q.get("note");
    const found = item && d ? designs.find((x) => x.slug === item && x.id === d) ?? null : null;
    if (found) setDesign(found);
    if (note) setExtra(note.slice(0, 300));
    if (item && quoteItems.some((x) => x.id === item)) setS((p) => ({ ...p, items: [item] }));
  }, [designs]);

  const set = <K extends keyof State>(k: K, v: State[K]) => { setError(""); setS((p) => ({ ...p, [k]: v })); };
  const toggle = (id: string) => { setError(""); setS((p) => ({ ...p, items: p.items.includes(id) ? p.items.filter((x) => x !== id) : [...p.items, id] })); };

  const goto = (n: number) => {
    setError("");
    setStep(n);
    requestAnimationFrame(() => {
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      heading.current?.focus({ preventScroll: true });
    });
  };

  const next = () => {
    if (step === 0 && s.items.length === 0) return setError("Choose at least one thing you need, so we send the right person.");
    if (step === 1 && !s.emirate) return setError("Choose your emirate, so we can plan the visit.");
    goto(step + 1);
  };

  const send = () => {
    if (!s.name.trim()) return setError("Please add your name so we know who is writing.");
    setError("");
    const text = brief(s, design, extra);
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    // A background copy for the office. Email may not be set up yet, so a failure here is silent: WhatsApp is the lead.
    if (s.phone.trim()) {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: s.name, phone: s.phone, interest: s.items.map(label).join(", "), message: text, source: "quote" }),
      }).catch(() => undefined);
    }
    setSent(true);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  if (sent) {
    return (
      <div ref={top} className="mx-auto max-w-2xl scroll-mt-28 rounded-lg border border-border bg-white p-7 text-center sm:p-10">
        <h2 className="h-md">Your brief is ready in WhatsApp</h2>
        <p className="lede mx-auto mt-3 max-w-md">Press send in WhatsApp and it reaches our team. If WhatsApp did not open, use the button below.</p>
        <ol className="mx-auto mt-7 flex max-w-md flex-col gap-3 text-left">
          {["We reply on WhatsApp within a working day.", "We agree a time to visit and measure, free of charge.", "You receive a 3D design and a written quotation."].map((t, n) => (
            <li key={t} className="flex items-start gap-3 font-dm text-[15px] text-charcoal">
              <span className="font-serif text-xl text-gold-dark">{n + 1}.</span>{t}
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a href={whatsappLink(brief(s, design, extra))} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> Open WhatsApp again</a>
          <Link href="/collections" className="btn-line">Keep browsing</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={top} className="grid scroll-mt-28 grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <ol className="mb-6 grid grid-cols-3 gap-2" aria-label="Steps">
          {steps.map((t, n) => (
            <li key={t}>
              <button type="button" disabled={n >= step} onClick={() => goto(n)} aria-current={n === step ? "step" : undefined} className="block w-full text-left disabled:cursor-default">
                <span className={"block h-1 rounded-full " + (n <= step ? "bg-charcoal" : "bg-beige-dark")} />
                <span className={"mt-2.5 block font-dm text-sm font-medium " + (n === step ? "text-charcoal" : "text-taupe")}>Step {n + 1}</span>
                <span className={"block font-dm text-[13px] sm:text-sm " + (n === step ? "font-semibold text-charcoal" : "text-taupe")}>{t}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="rounded-lg border border-border bg-white p-5 sm:p-8">
          {step === 0 && (
            <div>
              <h2 ref={heading} tabIndex={-1} className="h-md outline-none">What would you like made?</h2>
              <p className="lede mt-2">Choose one or more. You can change this later.</p>
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3" role="group" aria-label="What you need">
                {quoteItems.map((q) => {
                  const on = s.items.includes(q.id);
                  return (
                    <button key={q.id} type="button" aria-pressed={on} onClick={() => toggle(q.id)} className={"flex min-h-[56px] items-center justify-between gap-2 rounded-md border px-4 py-3 text-left font-dm text-[14px] font-semibold transition-colors " + (on ? "border-charcoal bg-charcoal text-white" : "border-border bg-white text-charcoal hover:border-charcoal/50")}>
                      {q.label}
                      <span className={"flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] " + (on ? "border-white bg-white text-charcoal" : "border-charcoal/30 text-transparent")} aria-hidden="true">&#10003;</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 ref={heading} tabIndex={-1} className="h-md outline-none">Tell us about the room</h2>
              <p className="lede mt-2">Only the emirate is needed. The rest helps us prepare.</p>

              <p id="q-emirate" className="field-label mt-6">Where is it?</p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="q-emirate">
                {emirates.map((e) => (
                  <button key={e} type="button" role="radio" aria-checked={s.emirate === e} onClick={() => set("emirate", e)} className={"chip " + (s.emirate === e ? "chip-on" : "")}>{e}</button>
                ))}
              </div>

              <label htmlFor="q-size" className="field-label mt-6">Rough size <span className="font-normal text-taupe">(optional)</span></label>
              <input id="q-size" className="field" value={s.size} onChange={(e) => set("size", e.target.value)} placeholder="For example: wall 3.2 m wide, 2.7 m high" maxLength={120} />

              <p id="q-timing" className="field-label mt-6">When do you need it? <span className="font-normal text-taupe">(optional)</span></p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="q-timing">
                {timings.map((t) => (
                  <button key={t} type="button" role="radio" aria-checked={s.timing === t} onClick={() => set("timing", s.timing === t ? "" : t)} className={"chip " + (s.timing === t ? "chip-on" : "")}>{t}</button>
                ))}
              </div>

              <p id="q-start" className="field-label mt-6">How would you like to start?</p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" role="radiogroup" aria-labelledby="q-start">
                {starts.map((o) => {
                  const on = s.start === o.id;
                  return (
                    <button key={o.id} type="button" role="radio" aria-checked={on} onClick={() => set("start", o.id)} className={"rounded-md border p-4 text-left transition-colors " + (on ? "border-charcoal bg-charcoal text-white" : "border-border bg-white text-charcoal hover:border-charcoal/50")}>
                      <span className="block font-dm text-[15px] font-semibold">{o.title}</span>
                      <span className={"mt-1 block font-dm text-[13px] leading-snug " + (on ? "text-white/75" : "text-taupe")}>{o.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 ref={heading} tabIndex={-1} className="h-md outline-none">Who should we reply to?</h2>
              <p className="lede mt-2">Your brief opens in WhatsApp, ready to send. Nothing is sent until you press send there.</p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="q-name" className="field-label">Your name</label>
                  <input id="q-name" className="field" value={s.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" maxLength={60} aria-required="true" />
                </div>
                <div>
                  <label htmlFor="q-phone" className="field-label">Phone <span className="font-normal text-taupe">(optional)</span></label>
                  <input id="q-phone" className="field" value={s.phone} onChange={(e) => set("phone", e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="05x xxx xxxx" maxLength={20} />
                </div>
              </div>
              <label htmlFor="q-note" className="field-label mt-4">Anything else we should know? <span className="font-normal text-taupe">(optional)</span></label>
              <textarea id="q-note" className="field min-h-[110px]" value={s.note} onChange={(e) => set("note", e.target.value)} maxLength={500} placeholder="Colours, finishes, a picture you saw, or anything about the room" />
            </div>
          )}

          <p role="alert" className={"mt-4 font-dm text-sm font-semibold text-danger " + (error ? "" : "hidden")}>{error}</p>

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? <button type="button" onClick={() => goto(step - 1)} className="btn-line">&larr; Back</button> : <span />}
            {step < 2 ? (
              <button type="button" onClick={next} className="btn-dark">Continue <span aria-hidden="true">&rarr;</span></button>
            ) : (
              <button type="button" onClick={send} className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> Send my brief on WhatsApp</button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28"><Summary s={s} design={design} extra={extra} /></div>
      </div>
    </div>
  );
}
