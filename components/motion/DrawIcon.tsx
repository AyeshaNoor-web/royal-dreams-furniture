"use client";

import { motion, useReducedMotion } from "framer-motion";

/** A line icon whose stroke draws itself in when it scrolls into view. */
export default function DrawIcon({ d, className = "h-6 w-6", delay = 0 }: { d: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <motion.path
        d={d}
        initial={reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0.3 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, delay, ease: "easeInOut" }}
      />
    </svg>
  );
}
