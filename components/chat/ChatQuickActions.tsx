"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { quickActions, type QuickAction } from "@/lib/chatbot";
import { WHATSAPP_CHAT } from "@/lib/chatbot-intents";

interface Props {
  actions?: QuickAction[];
  onSend: (message: string) => void;
  onAsk: () => void;
}

/** The buttons under the welcome message. WhatsApp is green because it is the team's working channel. */
export default function ChatQuickActions({ actions = quickActions, onSend, onAsk }: Props) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Quick options">
      {actions.map((q) => (
        <li key={q.label}>
          {q.action === "whatsapp" ? (
            <a
              href={WHATSAPP_CHAT.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-charcoal px-4 font-dm text-[13px] font-medium text-beige transition-colors [touch-action:manipulation] hover:bg-charcoal-light [&_svg]:text-whatsapp"
            >
              <WhatsAppIcon className="h-4 w-4" /> {q.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => (q.action === "ask" ? onAsk() : onSend(q.message ?? q.label))}
              className="inline-flex min-h-[40px] items-center rounded-full border border-charcoal/35 bg-beige-light px-4 font-dm text-[13px] font-medium text-charcoal transition-colors [touch-action:manipulation] hover:border-charcoal hover:bg-beige"
            >
              {q.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
