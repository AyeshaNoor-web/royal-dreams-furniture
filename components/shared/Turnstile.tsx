"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; remove: (id: string) => void };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Cloudflare Turnstile. Renders nothing until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so forms work without it. */
export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (!SITE_KEY || !box.current) return;
    let id: string | undefined;
    const render = () => {
      if (!box.current || !window.turnstile) return;
      id = window.turnstile.render(box.current, { sitekey: SITE_KEY, theme: "light", callback: (t: string) => cb.current(t), "expired-callback": () => cb.current("") });
    };
    if (window.turnstile) render();
    else {
      let s = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
      if (!s) {
        s = document.createElement("script");
        s.src = SRC;
        s.async = true;
        document.head.appendChild(s);
      }
      s.addEventListener("load", render);
    }
    return () => { if (id && window.turnstile) window.turnstile.remove(id); };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={box} className="min-h-[65px]" />;
}
