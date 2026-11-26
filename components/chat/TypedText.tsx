"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const KEY = "mfc-chat-typed";

/** Types the text out once per session at reading pace; instant on later opens and under reduced motion. */
export default function TypedText({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(() => {
    try { return sessionStorage.getItem(KEY) ? text.length : 0; } catch { return 0; }
  });

  useEffect(() => {
    if (reduce || shown >= text.length) { setShown(text.length); try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ } return; }
    const t = setInterval(() => setShown((n) => {
      if (n + 2 >= text.length) { clearInterval(t); try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ } return text.length; }
      return n + 2;
    }), 24);
    return () => clearInterval(t);
  }, [text, reduce, shown]);

  return (
    <>
      {text.slice(0, shown)}
      {shown < text.length && <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-gold align-text-bottom" />}
      <span className="sr-only">{text.slice(shown)}</span>
    </>
  );
}
