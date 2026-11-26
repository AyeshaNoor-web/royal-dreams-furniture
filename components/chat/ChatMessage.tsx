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

const linkClass = "mt-2 inline-flex min-h-[44px] items-center gap-2 px-4 font-dm text-[13px] font-medium transition-colors [touch-action:manipulation] ";
const siteLink = linkClass + "border border-charcoal/35 text-charcoal hover:border-charcoal hover:bg-beige";
const waLink = linkClass + "bg-[#25D366] text-white hover:bg-[#1ebe5b]";

export default function ChatMessage({ message, onChip, onNavigate, hideLink = false }: Props) {
  const reduce = useReducedMotion();
  const bot = message.role === "bot";
  const wa = Boolean(message.link?.external && message.link.href.startsWith("https://wa.me"));
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
        {message.link && !hideLink && (
          <a
            href={message.link.href}
            onClick={message.link.external ? undefined : onNavigate}
            target={message.link.external ? "_blank" : undefined}
            rel={message.link.external ? "noopener noreferrer" : undefined}
            className={wa ? waLink : siteLink}
          >
            {wa && <WhatsAppIcon className="h-4 w-4" />}
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
