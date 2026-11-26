"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { QUOTE_LINK, SITE } from "@/lib/site";
import Mascot from "./Mascot";

interface Props {
  onOpenChat: () => void;
  minimised: boolean;
  ai: boolean;
}

/**
 * Phone-only bar pinned to the bottom: the WhatsApp quote button plus the assistant. The page body carries matching
 * bottom padding so the footer and the last form button scroll clear of it, and it hides while the chat card is open.
 */
export default function MobileCtaBar({ onOpenChat, minimised, ai }: Props) {
  const kind = ai ? "AI" : "Bot";
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-beige-light/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa min-h-[52px] flex-1 px-4 text-[15px] [touch-action:manipulation]">
          <WhatsAppIcon className="h-5 w-5" /> Get a free quote on WhatsApp
        </a>
        <button
          type="button"
          onClick={onOpenChat}
          aria-label={(minimised ? "Back to chat with " : "Chat with ") + (ai ? "our AI assistant" : "our automated assistant") + ", " + SITE.assistant.name}
          aria-haspopup="dialog"
          className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-charcoal text-beige-light [touch-action:manipulation]"
        >
          <Mascot className="h-11 w-11" />
          <span aria-hidden="true" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-sm bg-charcoal px-1 py-px font-dm text-[9px] font-semibold uppercase leading-none tracking-wider text-beige-light ring-1 ring-beige-light">{kind}</span>
          {minimised && <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-gold ring-2 ring-beige-light" />}
        </button>
      </div>
    </div>
  );
}
