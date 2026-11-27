"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

export interface MenuGroup {
  title: string;
  items: { title: string; href: string }[];
}

const links = [
  { label: "Budget calculator", href: "/pricing" },
  { label: "Our work", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={"h-3.5 w-3.5 transition-transform duration-200 " + (open ? "rotate-180" : "")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header({ menu }: { menu: MenuGroup[] }) {
  const path = usePathname();
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Any navigation closes both menus.
  useEffect(() => { setMega(false); setDrawer(false); }, [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); setDrawer(false); } };
    const onClick = (e: MouseEvent) => { if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMega(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("mousedown", onClick); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  // Over the home hero the bar is frosted glass; once the page scrolls, or on any other page, it is solid brown.
  const [top, setTop] = useState(true);
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY < 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const glass = path === "/" && top && !mega && !drawer;

  const hoverOpen = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMega(true); };
  const hoverClose = () => { closeTimer.current = setTimeout(() => setMega(false), 160); };
  const active = (href: string) => (path === href || path.startsWith(href + "/") ? "text-white" : "text-white/75");

  return (
    <header className={"sticky top-0 z-50 text-white transition-[background-color,border-color,backdrop-filter] duration-300 " + (glass ? "border-b border-white/15 bg-charcoal/25 backdrop-blur-md" : "border-b border-transparent bg-ink")}>
      <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={SITE.name + " home"}>
          <Image src="/brand/logo-mark-gold.png" alt="" width={484} height={543} priority className="h-9 w-auto lg:h-10" />
          <span className="font-dm text-[12px] font-semibold uppercase leading-[1.25] tracking-[0.13em] text-white sm:text-[13px] lg:text-[14px]">
            Modern Furniture
            <br />
            Collection
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <div ref={megaRef} onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
            <button type="button" aria-expanded={mega} aria-controls="mega-products" onClick={() => setMega((v) => !v)} className={"flex items-center gap-1.5 py-6 font-dm text-sm font-medium transition-colors hover:text-white " + (path.startsWith("/collections") ? "text-white" : "text-white/75")}>
              Products <Chevron open={mega} />
            </button>
            <div id="mega-products" hidden={!mega} className="absolute inset-x-0 top-full border-t border-white/10 bg-white text-charcoal shadow-2xl shadow-black/20">
              <div className="wrap grid grid-cols-12 gap-8 py-9">
                <div className="col-span-9 grid grid-cols-4 gap-8">
                  {menu.map((g) => (
                    <div key={g.title}>
                      <p className="mb-4 font-dm text-sm font-medium text-taupe">{g.title}</p>
                      <ul className="flex flex-col gap-3.5">
                        {g.items.map((it) => (
                          <li key={it.href}>
                            <Link href={it.href} className="group block">
                              <span className="block font-dm text-[15px] font-semibold text-charcoal group-hover:text-gold-dark">{it.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="col-span-3 flex flex-col justify-between rounded-lg bg-sand p-6">
                  <div>
                    <p className="font-serif text-xl font-medium leading-tight text-charcoal">Not sure where to start?</p>
                    <p className="mt-2 font-dm text-sm leading-relaxed text-taupe">Answer three short questions and send your brief on WhatsApp. The visit and the quote are free.</p>
                  </div>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <Link href="/quote" className="btn-dark">Start a free quote</Link>
                    <Link href="/collections" className="text-link self-start">See all products</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={"py-6 font-dm text-sm font-medium transition-colors hover:text-white " + active(l.href)}>{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={"tel:+" + SITE.phones[0].intl} className="hidden font-dm text-sm font-medium text-white/80 hover:text-white xl:block">{SITE.phones[0].display}</a>
          <Link href="/quote" aria-label="Get a quote" className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-md border border-white/40 px-3.5 py-2 font-dm text-[13px] font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-charcoal sm:px-5">
            <span className="sm:hidden">Quote</span><span className="hidden sm:inline">Get a quote</span>
          </Link>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden" aria-label={drawer ? "Close menu" : "Open menu"} aria-expanded={drawer} aria-controls="mobile-menu" onClick={() => setDrawer((v) => !v)}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              {drawer ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!drawer} className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-ink pb-28 lg:hidden">
        <div className="wrap py-6">
          {menu.map((g) => (
            <div key={g.title} className="border-b border-white/10 py-5 first:pt-0">
              <p className="mb-3 font-dm text-sm font-medium text-gold">{g.title}</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="block py-1">
                      <span className="block font-dm text-[15px] font-semibold text-white">{it.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="grid grid-cols-2 gap-x-4 py-5">
            <li><Link href="/collections" className="block py-2.5 font-dm text-base font-semibold text-white">All products</Link></li>
            {links.map((l) => (
              <li key={l.href}><Link href={l.href} className="block py-2.5 font-dm text-base font-semibold text-white">{l.label}</Link></li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link href="/quote" className="btn-white">Start a free quote</Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-wa"><WhatsAppIcon className="h-4 w-4" /> WhatsApp {SITE.phones[0].display}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
