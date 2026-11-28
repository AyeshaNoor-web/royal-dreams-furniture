"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import type { ChatMessage as Message } from "./useChat";

interface Props {
  message: Message;
  onChip: (label: string) => void;
  onNavigate: () => void;
  /** True while the lead card below this message already offers WhatsApp. */
  hideLink?: boolean;
}

const linkClass = "mt-3.5 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-md px-4 text-center font-dm text-[15px] font-medium transition-colors [touch-action:manipulation] ";
const siteLink = linkClass + "bg-ink text-white hover:bg-charcoal";
const waLink = linkClass + "bg-[#25D366] text-white hover:bg-[#1ebe5b]";

export default function ChatMessage({ message, onChip, onNavigate, hideLink = false }: Props) {
  const reduce = useReducedMotion();
  const bot = message.role === "bot";
  const wa = Boolean(message.link?.external && message.link.href.startsWith("https://wa.me"));
  // Arabic and Urdu read right to left; let each message set its own direction.
  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={"flex flex-col " + (bot ? "items-start" : "items-end")}
    >
      <div
        className={
          "max-w-[86%] px-4 py-3 font-dm text-[15px] leading-relaxed " +
          (bot ? "rounded-lg rounded-tl-sm bg-beige-light text-charcoal" : "rounded-lg rounded-tr-sm bg-ink text-white")
        }
      >
        <p dir="auto" className="whitespace-pre-line break-words">{message.text}</p>
        {message.link && !hideLink && (
          <a
            href={message.link.href}
            onClick={message.link.external ? undefined : onNavigate}
            target={message.link.external ? "_blank" : undefined}
            rel={message.link.external ? "noopener noreferrer" : undefined}
            className={wa ? waLink : siteLink}
          >
            {wa && <WhatsAppIcon className="h-4 w-4 shrink-0" />}
            {message.link.label}
          </a>
        )}
      </div>
      {message.chips && message.chips.length > 0 && (
        <ul className="mt-2.5 flex max-w-full flex-wrap gap-2" aria-label="Collections">
          {message.chips.map((c) => (
            <li key={c}>
              <button type="button" onClick={() => onChip(c)} className="min-h-[40px] rounded-md border border-border bg-beige-light px-3 py-1.5 font-dm text-sm text-charcoal transition-colors [touch-action:manipulation] hover:border-ink">
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}
