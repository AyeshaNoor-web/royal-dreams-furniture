"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import type { ChatMessage as Message } from "./useChat";

interface Props {
  message: Message;
  onChip: (label: string) => void;
  onNavigate: () => void;
}

const linkClass =
  "mt-2 inline-flex min-h-[44px] items-center gap-2 border border-charcoal/35 px-4 font-dm text-[13px] font-medium text-charcoal transition-colors [touch-action:manipulation] hover:border-charcoal hover:bg-beige";

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
        {message.link && (
          <a
            href={message.link.href}
            onClick={message.link.external ? undefined : onNavigate}
            target={message.link.external ? "_blank" : undefined}
            rel={message.link.external ? "noopener noreferrer" : undefined}
            className={linkClass}
          >
            {message.link.label}
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </div>
      {message.chips && message.chips.length > 0 && (
        <ul className="mt-2 flex max-w-[92%] flex-wrap gap-2" aria-label="Collections">
          {message.chips.map((c) => (
            <li key={c}>
              <button type="button" onClick={() => onChip(c)} className="min-h-[36px] rounded-full border border-border bg-beige-light px-3 py-1.5 font-dm text-[13px] text-charcoal transition-colors [touch-action:manipulation] hover:border-charcoal">
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}
