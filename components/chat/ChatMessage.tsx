"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import type { ChatMessage as Message } from "./useChat";

interface Props {
  message: Message;
  onChip: (label: string) => void;
  onNavigate: () => void;
}

const linkClass =
  "mt-2 inline-flex min-h-[40px] items-center gap-2 border border-charcoal/35 px-4 font-dm text-[13px] font-medium text-charcoal transition-colors hover:border-charcoal hover:bg-beige";

export default function ChatMessage({ message, onChip, onNavigate }: Props) {
  const reduce = useReducedMotion();
  const bot = message.role === "bot";
  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={"flex flex-col " + (bot ? "items-start" : "items-end")}
    >
      <div
        className={
          "max-w-[88%] px-4 py-3 text-[14px] leading-relaxed " +
          (bot ? "rounded-2xl rounded-bl-md border border-border bg-beige-light text-charcoal" : "rounded-2xl rounded-br-md bg-charcoal text-beige-light")
        }
      >
        <p className="whitespace-pre-line">{message.text}</p>
        {message.link &&
          (message.link.external ? (
            <a href={message.link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {message.link.label}
              <span aria-hidden="true">&rarr;</span>
            </a>
          ) : (
            <Link href={message.link.href} onClick={onNavigate} className={linkClass}>
              {message.link.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ))}
      </div>
      {message.chips && message.chips.length > 0 && (
        <ul className="mt-2 flex max-w-[92%] flex-wrap gap-2" aria-label="Collections">
          {message.chips.map((c) => (
            <li key={c}>
              <button type="button" onClick={() => onChip(c)} className="rounded-full border border-border bg-beige-light px-3 py-1.5 font-dm text-[13px] text-charcoal transition-colors hover:border-charcoal">
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}
