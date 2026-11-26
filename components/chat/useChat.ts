"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { answer, WELCOME, WELCOME_AI, type Reply } from "@/lib/chatbot";
import { WHATSAPP_CHAT, type ChatLink } from "@/lib/chatbot-intents";

export interface ChatMessage extends Partial<Reply> {
  id: number;
  role: "bot" | "user";
  text: string;
  links?: ChatLink[];
  /** True while the assistant is still streaming this reply. */
  streaming?: boolean;
}

interface Stored {
  messages: ChatMessage[];
  leadDone: boolean;
  open?: boolean;
  minimised?: boolean;
  aiDown?: boolean;
}

const KEY = "mfc-chat";
const REPLY_DELAY = 450;
const CLIENT_TIMEOUT_MS = 30_000;
const ERROR_TEXT = "I lost the connection for a moment. You can try again, or continue with a designer on WhatsApp.";
const welcome = (ai: boolean): ChatMessage => ({ id: 1, role: "bot", text: ai ? WELCOME_AI : WELCOME });

const isPhone = () => window.matchMedia("(max-width: 639px)").matches;

/**
 * Conversation state. `ai` says the server has the assistant switched on; the keyword matcher answers whenever the
 * assistant is off, rate limited or unreachable. Kept in sessionStorage so moving between pages does not reset it.
 */
export function useChat(ai: boolean) {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [welcome(ai)]);
  const [typing, setTyping] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const [mode, setMode] = useState<"ai" | "matcher">(ai ? "ai" : "matcher");
  const [ready, setReady] = useState(false);
  const next = useRef(2);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as Stored;
        const ok = Array.isArray(s.messages) && s.messages.length > 0 && s.messages.every((m) => m && typeof m.id === "number" && (m.role === "bot" || m.role === "user") && typeof m.text === "string");
        if (ok) {
          setMessages(s.messages.map((m) => ({ ...m, streaming: false })));
          next.current = Math.max(...s.messages.map((m) => m.id)) + 1;
        }
        setLeadDone(Boolean(s.leadDone));
        if (s.aiDown) setMode("matcher");
        if (s.open && s.minimised) { setOpen(true); setMinimised(true); }
        else if (s.open && !isPhone()) setOpen(true);
      }
    } catch { /* storage blocked: the chat still works for this page view */ }
    setReady(true);
    return () => { if (timer.current) clearTimeout(timer.current); abort.current?.abort(); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { sessionStorage.setItem(KEY, JSON.stringify({ messages, leadDone, open, minimised, aiDown: ai && mode === "matcher" } satisfies Stored)); } catch { /* ignore */ }
  }, [messages, leadDone, open, minimised, mode, ready, ai]);

  const push = useCallback((m: Omit<ChatMessage, "id">) => setMessages((ms) => [...ms, { ...m, id: next.current++ }]), []);

  const patch = (id: number, fn: (m: ChatMessage) => ChatMessage) => setMessages((ms) => ms.map((m) => (m.id === id ? fn(m) : m)));

  const answerLocally = useCallback((text: string) => {
    const reply = answer(text);
    setTyping(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { push({ role: "bot", ...reply }); setTyping(false); }, REPLY_DELAY);
  }, [push]);

  const askAssistant = useCallback(async (text: string, history: ChatMessage[]) => {
    const id = next.current++;
    setTyping(true);
    abort.current?.abort();
    const controller = new AbortController();
    abort.current = controller;
    const killer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
    const fail = () => { setTyping(false); setMessages((ms) => [...ms.filter((m) => m.id !== id), { id, role: "bot", text: ERROR_TEXT, links: [WHATSAPP_CHAT] }]); };
    try {
      const turns = history.filter((m) => m.id !== 1 && m.text !== ERROR_TEXT).map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text }));
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [...turns, { role: "user", content: text }] }), signal: controller.signal });
      if (res.status === 503) { setMode("matcher"); setTyping(false); answerLocally(text); return; }
      if (res.status === 429) { const d = (await res.json().catch(() => ({}))) as { error?: string; whatsapp?: string }; setTyping(false); push({ role: "bot", text: d.error ?? "Too many messages. Please wait a minute.", links: [WHATSAPP_CHAT] }); return; }
      if (!res.ok || !res.body) { fail(); return; }
      setMessages((ms) => [...ms, { id, role: "bot", text: "", streaming: true }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const e = JSON.parse(line) as { type: string; text?: string; label?: string; href?: string; external?: boolean; message?: string };
          if (e.type === "fallback") { setMode("matcher"); setTyping(false); setMessages((ms) => ms.filter((m) => m.id !== id)); answerLocally(text); return; }
          if (e.type === "text") { setTyping(false); patch(id, (m) => ({ ...m, text: m.text + e.text })); }
          else if (e.type === "link" && e.href) patch(id, (m) => ({ ...m, links: [...(m.links ?? []), { label: e.label ?? "Open", href: e.href!, external: e.external }] }));
          else if (e.type === "error") { setTyping(false); patch(id, (m) => ({ ...m, text: (m.text ? m.text + "\n" : "") + (e.message ?? ERROR_TEXT) })); }
        }
      }
      setTyping(false);
      patch(id, (m) => ({ ...m, streaming: false, text: m.text || ERROR_TEXT, links: m.text ? m.links : [WHATSAPP_CHAT] }));
    } catch {
      fail();
    } finally {
      clearTimeout(killer);
    }
  }, [answerLocally, push]);

  const send = useCallback((text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((ms) => {
      const history = ms;
      const withUser = [...ms, { id: next.current++, role: "user" as const, text: t }];
      if (mode === "ai") queueMicrotask(() => void askAssistant(t, history));
      else queueMicrotask(() => answerLocally(t));
      return withUser;
    });
  }, [mode, askAssistant, answerLocally]);

  const reset = useCallback(() => {
    abort.current?.abort();
    if (timer.current) clearTimeout(timer.current);
    setTyping(false);
    setLeadDone(false);
    next.current = 2;
    setMessages([welcome(mode === "ai")]);
  }, [mode]);

  return { ai: mode === "ai", open, setOpen, minimised, setMinimised, messages, typing, send, push, reset, leadDone, setLeadDone };
}

export type Chat = ReturnType<typeof useChat>;
