"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

/** Wraps a card so the cursor acts as a warm light source (see .lit-card in globals.css). */
export default function LitCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={"lit-card relative " + className}>
      {children}
    </div>
  );
}
