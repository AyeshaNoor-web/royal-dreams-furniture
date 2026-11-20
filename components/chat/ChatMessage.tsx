"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import type { ChatLink } from "@/lib/chatbot-intents";
import type { ChatMessage as Message } from "./useChat";

interface Props {
  message: Message;
  onChip: (label: string) => void;
  onNavigate: () => void;
  /** True while the lead card below this message already offers WhatsApp. */
  hideLink?: boolean;
}

const linkClass = "mt-2 mr-2 inline-flex min-h-[44px] items-center gap-2 px-4 font-dm text-[13px] font-medium transition-colors [touch-action:manipulation] ";
const siteLink = linkClass + "border border-charcoal/35 text-charcoal hover:border-charcoal hover:bg-beige";
const waLink = linkClass + "bg-[#0E7566] text-white hover:bg-[#0B5F53]";

/** Links are rendered from structured data only; message text is always plain text. */
function LinkButton({ link, onNavigate }: { link: ChatLink; onNavigate: () => void }) {
  const wa = Boolean(link.external && link.href.startsWith("https://wa.me"));
  const safe = /^(https:\/\/|\/)/.test(link.href);
  if (!safe) return null;
  return (
    <a
      href={link.href}
      onClick={link.external ? undefined : onNavigate}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={wa ? waLink : siteLink}
    >
      {wa && <WhatsAppIcon className="h-4 w-4" />}
      {link.label}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}

export default function ChatMessage({ message, onChip, onNavigate, hideLink = false }: Props) {
  const reduce = useReducedMotion();
  const bot = message.role === "bot";
  const links: ChatLink[] = [...(message.link && !hideLink ? [message.link] : []), ...(message.links ?? [])];
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
        <p className="whitespace-pre-line">
          {message.text}
          {message.streaming && <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-charcoal align-text-bottom" />}
        </p>
        {links.length > 0 && <div className="flex flex-wrap">{links.map((l, i) => <LinkButton key={l.href + i} link={l} onNavigate={onNavigate} />)}</div>}
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
