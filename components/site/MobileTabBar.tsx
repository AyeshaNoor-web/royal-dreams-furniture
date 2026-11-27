"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_LINK } from "@/lib/site";

const tabs = [
  { label: "Home", href: "/", icon: "M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-8z" },
  { label: "Products", href: "/collections", icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { label: "Budget", href: "/pricing", icon: "M12 3v18M16.5 7.5c-.8-1.2-2.4-2-4.5-2-2.5 0-4.5 1.2-4.5 3.2 0 4.6 9.5 2 9.5 6.6 0 2-2 3.2-5 3.2-2.3 0-4.2-.9-5-2.3" },
  { label: "Quote", href: "/quote", icon: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6" },
];

/** Phone only: the four places a visitor needs, plus WhatsApp, always one tap away. */
export default function MobileTabBar() {
  const path = usePathname();
  const on = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));
  return (
    <nav aria-label="Quick links" className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {tabs.map((t) => (
          <li key={t.href}>
            <Link href={t.href} aria-current={on(t.href) ? "page" : undefined} className={"flex h-[60px] flex-col items-center justify-center gap-1 font-dm text-[11px] font-semibold " + (on(t.href) ? "text-charcoal" : "text-taupe")}>
              <span className={"flex h-7 w-11 items-center justify-center rounded-full " + (on(t.href) ? "bg-sand" : "")}>
                <svg className="h-[19px] w-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon} /></svg>
              </span>
              {t.label}
            </Link>
          </li>
        ))}
        <li>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex h-[60px] flex-col items-center justify-center gap-1 font-dm text-[11px] font-semibold text-[#128C4B]">
            <span className="flex h-7 w-11 items-center justify-center"><WhatsAppIcon className="h-[19px] w-[19px]" /></span>
            WhatsApp
          </a>
        </li>
      </ul>
    </nav>
  );
}
