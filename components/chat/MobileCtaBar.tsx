"use client";

import { useEffect, useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import PlanButton from "@/components/plan/PlanButton";
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
  // The hero and the planner carry their own buttons, so the bar waits until the hero is gone and hides over the planner.
  const [show, setShow] = useState(false);
  useEffect(() => {
    const update = () => {
      const plan = document.getElementById("plan")?.getBoundingClientRect();
      const overPlan = plan ? plan.top < window.innerHeight * 0.6 && plan.bottom > window.innerHeight * 0.5 : false;
      const hasHero = Boolean(document.querySelector("[data-hero]"));
      setShow((!hasHero || window.scrollY > 520) && !overPlan);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div inert={!show} className={"fixed inset-x-0 bottom-0 z-[60] transition-transform duration-300 " + (show ? "translate-y-0 " : "translate-y-full ") + "border-t border-charcoal/10 bg-beige/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden"}>
      <div className="mx-auto flex max-w-md items-center gap-2">
        <PlanButton className="btn-lit min-h-[52px] flex-1 px-4 text-[15px]">
          Get my free quote
        </PlanButton>
        <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" aria-label={"WhatsApp " + SITE.phones[0].display} className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-whatsapp text-ink [touch-action:manipulation]">
          <WhatsAppIcon className="h-6 w-6" />
        </a>
        <button
          type="button"
          onClick={onOpenChat}
          aria-label={(minimised ? "Back to chat with " : "Chat with ") + (ai ? "our AI assistant" : "our automated assistant") + ", " + SITE.assistant.name}
          aria-haspopup="dialog"
          className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-pine [touch-action:manipulation]"
        >
          <Mascot className="h-11 w-11" />
          <span aria-hidden="true" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-sm bg-gold px-1 py-px font-dm text-[9px] font-bold uppercase leading-none tracking-wider text-ink">{kind}</span>
          {minimised && <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-gold ring-2 ring-beige" />}
        </button>
      </div>
    </div>
  );
}
