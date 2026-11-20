"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";
import { CHAT_EVENT, type ChatOpenDetail } from "@/lib/chat-events";
import { SITE } from "@/lib/site";
import ChatBoundary from "./ChatBoundary";
import ChatTeaser, { TEASER_KEY } from "./ChatTeaser";
import Mascot from "./Mascot";
import MobileCtaBar from "./MobileCtaBar";
import { useChat } from "./useChat";

// The panel, matcher and lead form only load the first time someone opens the chat.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

function Widget({ ai }: { ai: boolean }) {
  const chat = useChat(ai);
  const reduce = useReducedMotion();
  const bubble = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const sendRef = useRef(chat.send);
  sendRef.current = chat.send;
  const showPanel = chat.open && !chat.minimised;
  // Visitors who have not chatted yet get a slow pulse and the greeting card.
  const fresh = !chat.open && chat.messages.length === 1;

  const openChat = () => {
    chat.setMinimised(false);
    chat.setOpen(true);
    try { sessionStorage.setItem(TEASER_KEY, "1"); } catch { /* ignore */ }
  };
  const openRef = useRef(openChat);
  openRef.current = openChat;

  // Any section of the site can open the assistant with a first message (see lib/chat-events.ts).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<ChatOpenDetail>).detail;
      openRef.current();
      if (detail?.message) setTimeout(() => sendRef.current(detail.message!), 450);
    };
    window.addEventListener(CHAT_EVENT, onOpen);
    return () => window.removeEventListener(CHAT_EVENT, onOpen);
  }, []);

  // Return focus to the bubble after the panel closes.
  useEffect(() => {
    if (wasOpen.current && !showPanel) {
      const t = setTimeout(() => bubble.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    wasOpen.current = showPanel;
  }, [showPanel]);

  const name = SITE.assistant.name;
  return (
    <>
      <ChatTeaser active={fresh} onOpen={openChat} />
      <AnimatePresence>
        {!showPanel && (
          <motion.div
            key="bubble"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-6 right-6 z-[70] hidden sm:block"
          >
            {fresh && <span aria-hidden="true" className="chat-pulse absolute inset-0 rounded-full bg-charcoal/35" />}
            <motion.button
              ref={bubble}
              type="button"
              onClick={openChat}
              aria-label={chat.minimised ? "Back to chat with " + name : ai ? `Ask ${name}, our AI assistant` : `Ask ${name}`}
              aria-haspopup="dialog"
              aria-expanded={showPanel}
              whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="relative flex items-center gap-2.5 rounded-full bg-charcoal py-1.5 pl-1.5 pr-1.5 text-beige-light shadow-lg shadow-black/25 transition-colors duration-300 hover:bg-charcoal-light sm:pr-5"
            >
              <span className="relative">
                <Mascot className="h-11 w-11" />
                {fresh && <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-gold ring-2 ring-charcoal" />}
              </span>
              <span className={"font-dm text-sm font-medium " + (chat.minimised ? "block pr-3 sm:pr-0" : "hidden sm:block")}>{chat.minimised ? "Back to chat" : "Ask " + name}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {!showPanel && <MobileCtaBar onOpenChat={openChat} minimised={chat.minimised} />}
      <AnimatePresence>{showPanel && <ChatPanel key="panel" chat={chat} />}</AnimatePresence>
    </>
  );
}

/** `ai` is decided on the server: AI_CHAT_ENABLED and an API key. Off means the keyword matcher answers. */
export default function ChatWidget({ ai = false }: { ai?: boolean }) {
  return (
    <ChatBoundary>
      <Widget ai={ai} />
    </ChatBoundary>
  );
}
