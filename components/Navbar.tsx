"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import PlanButton from "@/components/plan/PlanButton";
import { QUOTE_LINK, SITE, navLinks } from "@/lib/site";

/** One ivory pill that floats over every page. Left: logo. Middle: pages. Right: the two ways to start, quote first. */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 lg:px-5 lg:pt-4">
        <nav className="nav-glass mx-auto flex h-[60px] max-w-7xl items-center justify-between pl-3 pr-2 sm:pl-4 lg:h-[68px] lg:pl-6 lg:pr-2.5">
          <Logo variant="dark" />

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const on = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <li key={l.href}>
                  <Link href={l.href} aria-current={on ? "page" : undefined} className={"inline-flex min-h-[44px] items-center rounded-full px-4 text-[15px] font-medium transition-colors " + (on ? "bg-charcoal/[0.07] text-charcoal" : "text-taupe hover:text-charcoal")}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" aria-label={"WhatsApp " + SITE.phones[0].display} className="hidden h-12 items-center gap-2 rounded-full border border-charcoal/15 px-4 text-[14px] font-semibold text-charcoal transition-colors hover:border-charcoal/50 lg:inline-flex">
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#128C4B]" /> {SITE.phones[0].display}
            </a>
            <PlanButton className="btn-lit min-h-[44px] whitespace-nowrap px-4 text-[13.5px] sm:px-5 lg:min-h-[48px] lg:px-6 lg:text-[15px]">
              Free quote
            </PlanButton>
            <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal/[0.06] md:hidden">
              <span className="relative block h-3 w-5">
                <span className={"absolute left-0 h-[2px] w-5 rounded bg-charcoal transition-transform duration-300 " + (menuOpen ? "top-[5px] rotate-45" : "top-0")} />
                <span className={"absolute left-0 h-[2px] w-5 rounded bg-charcoal transition-transform duration-300 " + (menuOpen ? "top-[5px] -rotate-45" : "top-[10px]")} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pine-stage on-dark fixed inset-0 z-40 flex flex-col px-6 pb-8 pt-28 md:hidden"
          >
            <ul className="flex flex-col">
              {[{ label: "Home", href: "/" }, ...navLinks].map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i + 0.05, duration: 0.35 }} className="border-b border-beige/10">
                  <Link href={l.href} className="flex min-h-[64px] items-center justify-between font-serif text-[32px] font-semibold tracking-tight text-beige">
                    {l.label}
                    <span aria-hidden="true" className="text-gold">&rarr;</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <span onClick={() => setMenuOpen(false)} className="contents">
                <PlanButton className="btn-lit w-full">Start my free quote</PlanButton>
              </span>
              <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa w-full">
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp {SITE.phones[0].display}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
