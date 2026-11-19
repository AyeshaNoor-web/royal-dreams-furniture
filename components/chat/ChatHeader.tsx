"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_CHAT } from "@/lib/chatbot-intents";
import { SITE } from "@/lib/site";

interface Props {
  ai: boolean;
  onReset: () => void;
  onClose: () => void;
  canReset: boolean;
}

const iconBtn = "flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-beige [touch-action:manipulation]";

export default function ChatHeader({ ai, onReset, onClose, canReset }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border bg-beige-light px-4 py-3">
      <div className="min-w-0">
        <p className="font-serif text-[16px] leading-tight text-charcoal sm:text-[17px]">{SITE.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[12px] leading-none text-taupe">
          {ai && <span className="shrink-0 whitespace-nowrap rounded-sm border border-border px-1 py-0.5 text-[10px] uppercase tracking-wider text-taupe">AI assistant</span>}
          <span className="truncate">{ai ? "Answers from our website" : "Instant answers from our website"}</span>
        </p>
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
