"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import { pick } from "@/lib/gallery";

const steps = [
  { n: "01", title: "Tell us about the room", where: "On WhatsApp", text: "Send a few photos or a floor plan. Within a working day you will have first ideas, a rough budget and a time for us to visit.", image: pick("curtains", 4) },
  { n: "02", title: "We measure and design", where: "At your home", text: "We measure every wall and opening, then show you the piece in 3D, in your own room. Change anything you like. Nothing is built until you approve.", image: { src: "/video/walk-in-closets/walk-in-closets-01.jpg", w: 576, h: 1024, alt: "Our designer measuring a walk-in closet on site" } },
  { n: "03", title: "We build it", where: "In our Dubai workshop", text: "Your furniture is made in our workshop in the veneer, lacquer, stone or fabric you chose, and we keep you informed while it is in production.", image: { src: "/images/process/workshop.jpg", w: 626, h: 417, alt: "Woodworking workshop with a CNC machine and stacked timber panels" } },
  { n: "04", title: "We fit it", where: "At your home", text: "Our own team installs, aligns every door and light, and clears the packaging. You receive a finished room, not a delivery.", image: pick("sofas", 0) },
];

/** How it works as a pinned timeline: the step number and title hold on the left while the steps scroll past on the right. */
export default function ProcessScroll() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  // The active step is the one nearest the middle of the screen.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let best = 0;
      let bestD = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  const s = steps[active];

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-mist py-section-sm lg:py-section" aria-labelledby="process-h">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 id="process-h" className="h-lg">How it works</h2>
          <p className="lede mt-4">Four steps from first message to finished room. One team handles all of them, so you never chase a supplier, a carpenter and a fitter separately.</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={s.n} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} aria-hidden="true">
                  <p className="font-serif text-[9rem] leading-none text-gold">{s.n}</p>
                  <p className="mt-4 font-serif text-3xl text-charcoal">{s.title}</p>
                  <p className="mt-2 font-dm text-base text-taupe">{s.where}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-10 flex gap-2" aria-hidden="true">
                {steps.map((x, i) => (
                  <span key={x.n} className={"h-0.5 w-12 transition-colors duration-300 " + (i === active ? "bg-gold-dark" : "bg-border")} />
                ))}
              </div>
            </div>
          </div>

          <ol className="flex flex-col gap-12 lg:col-span-7 lg:gap-28">
            {steps.map((x, i) => (
              <li key={x.n} ref={(el) => { refs.current[i] = el; }} className="grid gap-5 sm:grid-cols-12 sm:items-end">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-beige-dark sm:col-span-7">
                  <Image src={x.image.src} alt={x.image.alt} fill sizes="(min-width: 1024px) 34vw, (min-width: 640px) 55vw, 100vw" className="object-cover" />
                </div>
                <div className="sm:col-span-5">
                  <p className="font-serif text-4xl text-gold-dark lg:hidden">{x.n}</p>
                  <h3 className="mt-2 font-serif text-2xl text-charcoal lg:mt-0">{x.title}</h3>
                  <p className="mt-1 font-dm text-[15px] text-taupe">{x.where}</p>
                  <p className="mt-3 font-dm text-[16px] leading-relaxed text-taupe">{x.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-col items-start gap-5 border-t border-border pt-8 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-serif text-xl text-charcoal sm:text-2xl">The first visit and the 3D design are free, and nothing is built until you approve it.</p>
          <Link href="/quote" className="btn-dark shrink-0">Get a free quote</Link>
        </div>
      </div>
    </section>
  );
}
