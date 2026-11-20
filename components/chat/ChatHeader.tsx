"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_CHAT } from "@/lib/chatbot-intents";
import { SITE } from "@/lib/site";
import Mascot from "./Mascot";

interface Props {
  ai: boolean;
  onReset: () => void;
  onClose: () => void;
  canReset: boolean;
}

const iconBtn = "flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-beige [touch-action:manipulation]";

export default function ChatHeader({ ai, onReset, onClose, canReset }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border bg-beige-light px-3 py-2.5 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <Mascot className="h-10 w-10 shrink-0" />
        <div className="min-w-0">
          <p className="font-serif text-[17px] leading-tight text-charcoal">{SITE.assistant.name}</p>
          <p className="mt-0.5 truncate text-[12px] leading-none text-taupe">
            {ai ? "AI " + SITE.assistant.role : SITE.assistant.role} at {SITE.shortName}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center">
        {canReset && (
          <button type="button" onClick={onReset} aria-label="Start a new conversation" title="Start over" className={iconBtn + " text-taupe hover:text-charcoal"}>
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.3M3 4v5h5" /></svg>
          </button>
        )}
        <a href={WHATSAPP_CHAT.href} target="_blank" rel="noopener noreferrer" aria-label="Talk to a designer on WhatsApp" className={iconBtn + " text-[#1ebe5b]"}>
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <button type="button" onClick={onClose} aria-label="Close chat" className={iconBtn + " text-charcoal"}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </div>
  );
}
