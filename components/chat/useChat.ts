"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { answer, WELCOME, type Reply } from "@/lib/chatbot";

export interface ChatMessage extends Partial<Reply> {
  id: number;
  role: "bot" | "user";
  text: string;
}

interface Stored {
  messages: ChatMessage[];
  leadDone: boolean;
}

const KEY = "mfc-chat";
const REPLY_DELAY = 450;
const welcome = (): ChatMessage => ({ id: 1, role: "bot", text: WELCOME });

/** Conversation state for the chat widget. Kept in sessionStorage so moving between pages does not reset it. */
export function useChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcome()]);
  const [typing, setTyping] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const [ready, setReady] = useState(false);
  const next = useRef(2);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as Stored;
        if (Array.isArray(s.messages) && s.messages.length > 0) {
          setMessages(s.messages);
          next.current = Math.max(...s.messages.map((m) => m.id)) + 1;
        }
        setLeadDone(Boolean(s.leadDone));
      }
    } catch {
      // Private mode or blocked storage: the chat still works for this page view.
    }
    setReady(true);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ messages, leadDone } satisfies Stored));
    } catch {
      // Ignore: storage is a convenience only.
    }
  }, [messages, leadDone, ready]);

  const push = useCallback((m: Omit<ChatMessage, "id">) => {
    setMessages((ms) => [...ms, { ...m, id: next.current++ }]);
  }, []);

  const send = useCallback((text: string) => {
    const t = text.trim();
    if (!t) return;
    const reply = answer(t);
    setMessages((ms) => [...ms, { id: next.current++, role: "user", text: t }]);
    setTyping(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setMessages((ms) => [...ms, { id: next.current++, role: "bot", ...reply }]);
      setTyping(false);
    }, REPLY_DELAY);
  }, []);

  return { open, setOpen, messages, typing, send, push, leadDone, setLeadDone };
}

export type Chat = ReturnType<typeof useChat>;
