"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal, { EASE } from "@/components/motion/Reveal";
import Spread from "@/components/home/RoomSpread";
import { groups, categoriesInGroup, type GroupSlug } from "@/lib/gallery";

/** Pick a room, see the collections we usually make for it. One magazine spread at a time. */
export default function PlanByRoom() {
  const [active, setActive] = useState<GroupSlug>(groups[0].slug);
  const reduce = useReducedMotion();
  const g = groups.find((x) => x.slug === active) ?? groups[0];
  const count = categoriesInGroup(g.slug).length;

  return (
    <section className="section-rule section-rule-b bg-beige-light py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-8 lg:mb-10">
          <p className="eyebrow mb-4">By room</p>
          <h2 className="font-serif text-display-lg text-charcoal">Plan by room</h2>
          <p className="mt-3 max-w-lg text-[15px] text-taupe">Choose a room to see what we usually make for it.</p>
        </Reveal>

        {/* Room tabs. On phones they scroll sideways in a single row. */}
        <div role="tablist" aria-label="Rooms" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.map((r) => {
            const on = r.slug === active;
            return (
              <button
                key={r.slug}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(r.slug)}
                className={"relative shrink-0 rounded-full px-5 py-2.5 text-[15px] transition-colors duration-300 " + (on ? "text-beige-light" : "text-charcoal hover:bg-beige")}
              >
                {on && (
                  <motion.span layoutId="room-tab" transition={{ duration: 0.45, ease: EASE }} className="absolute inset-0 rounded-full bg-charcoal" aria-hidden="true" />
                )}
                <span className="relative">{r.title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={g.slug}
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="max-w-md text-[15px] text-taupe"
            >
              {g.blurb} {count === 1 ? "One collection" : count + " collections"}, every piece made to your measurements.
            </motion.p>
          </AnimatePresence>
          <Link href={"/collections#" + g.slug} className="shrink-0 text-link hover:text-gold-text">Everything for this room</Link>
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={g.slug}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Spread g={g} first={g.slug === groups[0].slug} heading={false} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
