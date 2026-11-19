"use client";

import { useEffect, type RefObject } from "react";

/**
 * Keeps the floating card inside the visible part of the screen on phones. When the on-screen keyboard opens,
 * iOS and Android shrink `visualViewport` but not the layout viewport, so a `position: fixed` card would sit
 * partly behind the keyboard with its input hidden. This sets the card's bottom offset and height from the
 * visual viewport instead, and clears them when the keyboard goes away.
 */
export function useViewportFit(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const vv = window.visualViewport;
    const el = ref.current;
    if (!vv || !el) return;
    const phone = window.matchMedia("(max-width: 639px)");
    const apply = () => {
      if (!phone.matches) { el.style.bottom = ""; el.style.height = ""; return; }
      const keyboard = window.innerHeight - vv.height - vv.offsetTop;
      if (keyboard > 80) {
        el.style.bottom = keyboard + 8 + "px";
        el.style.height = Math.min(vv.height - 16, 540) + "px";
        // iOS scrolls the page to show the focused input; put it back so the fixed card stays aligned.
        window.scrollTo({ top: window.scrollY, behavior: "auto" });
      } else {
        el.style.bottom = "";
        el.style.height = "";
      }
    };
    apply();
    vv.addEventListener("resize", apply);
    vv.addEventListener("scroll", apply);
    return () => {
      vv.removeEventListener("resize", apply);
      vv.removeEventListener("scroll", apply);
      el.style.bottom = "";
      el.style.height = "";
    };
  }, [ref]);
}
