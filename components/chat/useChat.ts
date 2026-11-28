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
  open?: boolean;
}

const KEY = "mfc-chat";
const MIN_DELAY = 450;
const welcome = (): ChatMessage => ({ id: 1, role: "bot", text: WELCOME });
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Asks the AI route. Returns null when it is not set up or did not answer, so the caller can fall back. */
async function askAi(history: ChatMessage[]): Promise<Reply | "off" | null> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-12).map((m) => ({ role: m.role, text: m.text })) }),
    });
    const data = (await res.json().catch(() => null)) as ({ ok?: boolean; configured?: boolean } & Partial<Reply>) | null;
    if (res.status === 503 && data?.configured === false) return "off";
    if (!res.ok || !data?.ok || typeof data.text !== "string" || !data.text) return null;
    return { text: data.text, link: data.link, lead: data.lead };
  } catch {
    return null;
  }
}

/** Conversation state for the chat widget. Kept in sessionStorage so moving between pages does not reset it. */
export function useChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcome()]);
  const [typing, setTyping] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const [ready, setReady] = useState(false);
  const next = useRef(2);
  const latest = useRef<ChatMessage[]>(messages);
  const busy = useRef(false);
  // Set once the server says the AI is not configured, so later questions skip the wasted request.
  const aiOff = useRef(false);

  useEffect(() => { latest.current = messages; }, [messages]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as Stored;
        // Only restore messages that look like ours; anything else (an older format, a corrupt value) starts fresh.
        const ok = Array.isArray(s.messages) && s.messages.length > 0 && s.messages.every((m) => m && typeof m.id === "number" && (m.role === "bot" || m.role === "user") && typeof m.text === "string");
        if (ok) {
          setMessages(s.messages);
          next.current = Math.max(...s.messages.map((m) => m.id)) + 1;
        }
        setLeadDone(Boolean(s.leadDone));
        if (s.open && !window.matchMedia("(max-width: 639px)").matches) setOpen(true);
      }
    } catch {
      // Private mode or blocked storage: the chat still works for this page view.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ messages, leadDone, open } satisfies Stored));
    } catch {
      // Ignore: storage is a convenience only.
    }
  }, [messages, leadDone, open, ready]);

  const push = useCallback((m: Omit<ChatMessage, "id">) => {
    setMessages((ms) => [...ms, { ...m, id: next.current++ }]);
  }, []);

  const send = useCallback(async (text: string) => {
    const t = text.trim();
    if (!t || busy.current) return;
    busy.current = true;
    const history = [...latest.current, { id: next.current++, role: "user" as const, text: t }];
    latest.current = history;
    setMessages(history);
    setTyping(true);

    // The collection the conversation was last about, for the built-in answers.
    const topic = [...history].reverse().find((m) => m.role === "bot" && m.topic)?.topic;
    const [ai] = await Promise.all([aiOff.current ? Promise.resolve(null) : askAi(history), wait(MIN_DELAY)]);
    if (ai === "off") aiOff.current = true;
    const local = answer(t, topic);
    const reply: Reply = ai && ai !== "off" ? { ...ai, topic: local.topic } : local;

    setMessages((ms) => [...ms, { id: next.current++, role: "bot", ...reply }]);
    setTyping(false);
    busy.current = false;
  }, []);

  return { open, setOpen, messages, typing, send, push, leadDone, setLeadDone };
}

export type Chat = ReturnType<typeof useChat>;
