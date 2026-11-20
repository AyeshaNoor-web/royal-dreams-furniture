import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import NewsletterForm from "@/components/contact/NewsletterForm";
import { SITE, whatsappLink, navLinks } from "@/lib/site";
import { groups, categoriesInGroup } from "@/lib/gallery";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-beige/80 on-dark">
      {/* Newsletter band */}
      <div className="border-b border-beige/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl text-beige-light">New projects and finishes, once a month.</h2>
          </div>
          <div className="lg:col-span-6">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 lg:gap-8">
          <div className="col-span-2 md:col-span-4">
            <Image src="/brand/logo-lockup-gold.png" alt={SITE.name} width={845} height={814} className="h-32 w-auto mb-5" />
            <p className="text-sm text-beige/55 leading-relaxed max-w-sm mb-6">
              Made-to-measure sofas, beds, dining tables, curtains, wardrobes and media walls, designed, built and installed for homes across the UAE.
            </p>
            <ul className="flex flex-col gap-3">
              {SITE.instagramAccounts.map((ig) => (
                <li key={ig.handle}>
                  <a href={ig.url} target="_blank" rel="noopener noreferrer" aria-label={"Follow " + ig.handle + " on Instagram"} className="inline-flex items-center gap-3 text-beige/60 hover:text-gold transition-colors">
                    <span className="w-9 h-9 border border-beige/20 flex items-center justify-center"><InstagramIcon className="w-4 h-4" /></span>
                    <span className="text-[14px]">{ig.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-5 grid grid-cols-2 gap-8">
            {groups.map((g) => (
              <div key={g.slug}>
                <p className="text-[13px] text-beige/45 mb-4">{g.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {categoriesInGroup(g.slug).map((c) => (
                    <li key={c.slug}><Link href={"/collections/" + c.slug} className="text-sm text-beige/60 hover:text-gold transition-colors">{c.title}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-3">
            <p className="text-[13px] text-beige/45 mb-4">Company</p>
            <ul className="flex flex-col gap-2.5 mb-8">
              {navLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-beige/60 hover:text-gold transition-colors">{l.label}</Link></li>
              ))}
            </ul>
            <p className="text-[13px] text-beige/45 mb-4">Talk to us</p>
            <ul className="flex flex-col gap-2.5">
              {SITE.phones.map((p) => (
                <li key={p.intl}>
                  <a href={whatsappLink("Hello, I would like to enquire about your furniture.", p.intl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-beige-light hover:text-gold transition-colors">
                    <WhatsAppIcon className="w-4 h-4 text-[#128C7E]" />
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-xs text-beige/40 mt-5">Showroom: {SITE.showroom.display}</p>
            <p className="text-xs text-beige/40">Visits by appointment</p>
          </div>
        </div>
      </div>

      <div className="border-t border-beige/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-beige/30">&copy; {year} {SITE.name}. All rights reserved.</p>
          <p className="flex gap-4 text-xs text-beige/40">
            <Link href="/privacy-policy" className="hover:text-beige-light">Privacy policy</Link>
            <Link href="/terms" className="hover:text-beige-light">Terms of use</Link>
          </p>
          <p className="text-xs text-beige/25">Made to measure in Dubai</p>
        </div>
      </div>
    </footer>
  );
}
