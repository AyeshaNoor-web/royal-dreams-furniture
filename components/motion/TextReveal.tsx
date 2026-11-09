"use client";

import { motion } from "framer-motion";
import { EASE } from "./Reveal";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Words to render in italic gold */
  accent?: string[];
}

export default function TextReveal({ text, className, delay = 0, accent = [] }: TextRevealProps) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => {
        const isAccent = accent.includes(word.replace(/[.,]/g, ""));
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={"inline-block " + (isAccent ? "italic text-gold-dark" : "")}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: delay + i * 0.06, ease: EASE }}
              aria-hidden="true"
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
