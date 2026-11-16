"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import ChatTeaser, { TEASER_KEY } from "./ChatTeaser";
import { useChat } from "./useChat";

// The panel, matcher and lead form only load the first time someone opens the chat.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

export default function ChatWidget() {
  const chat = useChat();
  const reduce = useReducedMotion();
  const bubble = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  // Visitors who have not chatted yet get a slow pulse and the greeting card.
  const fresh = !chat.open && chat.messages.length === 1;

  const openChat = () => {
    chat.setOpen(true);
    try { sessionStorage.setItem(TEASER_KEY, "1"); } catch { /* ignore */ }
  };

  // Return focus to the bubble after the panel closes.
  useEffect(() => {
    if (wasOpen.current && !chat.open) {
      const t = setTimeout(() => bubble.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    wasOpen.current = chat.open;
  }, [chat.open]);

  return (
    <>
      <ChatTeaser active={fresh} onOpen={openChat} />
      <AnimatePresence>
        {!chat.open && (
          <motion.div
            key="bubble"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-6 right-6 z-[70]"
          >
            {fresh && <span aria-hidden="true" className="chat-pulse absolute inset-0 rounded-full bg-charcoal/35" />}
            <motion.button
              ref={bubble}
              type="button"
              onClick={openChat}
              aria-label="Ask us a question"
              aria-haspopup="dialog"
              whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="relative flex items-center gap-3 rounded-full bg-charcoal py-3 pl-4 pr-4 text-beige-light shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-charcoal-light sm:pr-5"
            >
              <span className="relative">
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v8a2.5 2.5 0 01-2.5 2.5H10l-4.5 3.5V17H6.5A2.5 2.5 0 014 14.5v-8z" />
                  <path d="M8 9h8M8 12.5h5" />
                </svg>
                {fresh && <span aria-hidden="true" className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-charcoal" />}
              </span>
              <span className="hidden font-dm text-sm font-medium sm:block">Ask us</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{chat.open && <ChatPanel key="panel" chat={chat} />}</AnimatePresence>
    </>
  );
}
