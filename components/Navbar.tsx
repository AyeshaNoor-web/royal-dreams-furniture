"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { QUOTE_LINK, VISIT_LINK, navLinks } from "@/lib/site";

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
      {/* Floating glass bar: translucent, blurred, slightly inset from the page edge */}
      <header className="sticky top-0 z-50 px-3 pt-3 lg:px-5 lg:pt-4">
        <nav className="nav-glass mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-7">
          <Logo />

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={"block py-2 text-[15px] transition-colors duration-200 hover:text-charcoal " + (active ? "text-charcoal" : "text-taupe")}
                  >
                    {link.label}
                  </Link>
                  {active && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-charcoal" />}
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <a href={VISIT_LINK} target="_blank" rel="noopener noreferrer" className="btn-line min-h-[44px] px-4 text-[14px]">
              Book a free visit
            </a>
            <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="btn-dark min-h-[44px] px-5 text-[14px]">
              <WhatsAppIcon className="h-[17px] w-[17px]" />
              Get a quote
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative z-[60] -mr-2 flex flex-col gap-1.5 p-2 text-charcoal md:hidden"
          >
            <span className={"block h-px w-6 bg-current transition-transform duration-300 " + (menuOpen ? "translate-y-[3.5px] rotate-45" : "")} />
            <span className={"block h-px w-6 bg-current transition-transform duration-300 " + (menuOpen ? "-translate-y-[3.5px] -rotate-45" : "")} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-beige-light/90 px-8 backdrop-blur-xl md:hidden"
          >
            <ul className="mb-12 flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-serif text-4xl text-charcoal">{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href={QUOTE_LINK} target="_blank" rel="noopener noreferrer" className="btn-dark">
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Get a quote
              </a>
              <a href={VISIT_LINK} target="_blank" rel="noopener noreferrer" className="btn-line">
                Book a free visit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
