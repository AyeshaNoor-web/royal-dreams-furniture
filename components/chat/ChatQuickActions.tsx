"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { quickActions } from "@/lib/chatbot";
import { WHATSAPP_CHAT } from "@/lib/chatbot-intents";

interface Props {
  onSend: (message: string) => void;
  onAsk: () => void;
}

const base = "flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md px-3 text-center font-dm text-[15px] font-medium transition-colors [touch-action:manipulation] ";

/** The four starting options under the welcome message. WhatsApp is green because it is the team's working channel. */
export default function ChatQuickActions({ onSend, onAsk }: Props) {
  return (
    <ul className="mt-4 grid grid-cols-2 gap-2" aria-label="Quick options">
      {quickActions.map((q) => (
        <li key={q.label}>
          {q.action === "whatsapp" ? (
            <a href={WHATSAPP_CHAT.href} target="_blank" rel="noopener noreferrer" className={base + "bg-[#25D366] text-white hover:bg-[#1ebe5b]"}>
              <WhatsAppIcon className="h-4 w-4 shrink-0" /> WhatsApp us
            </a>
          ) : (
            <button type="button" onClick={() => (q.action === "ask" ? onAsk() : onSend(q.message ?? q.label))} className={base + "border border-border bg-beige-light text-charcoal hover:border-ink"}>
              {q.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
