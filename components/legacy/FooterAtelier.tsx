import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import NewsletterForm from "@/components/contact/NewsletterForm";
import { SITE, areas, whatsappLink, navLinks } from "@/lib/site";
import { groups, categoriesInGroup } from "@/lib/gallery";

const col = "eyebrow mb-3";
const link = "inline-flex min-h-[44px] min-w-[44px] items-center text-[15px] text-beige/65 transition-colors hover:text-gold";

export default function Footer() {
  const year = new Date().getFullYear();
  const emirates = [...areas.near.places, ...areas.far.places];
  return (
    <footer className="section-rule on-dark bg-ink text-beige/80">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-10 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-beige">
              Every piece, made to fit <em className="font-normal italic text-gold">your</em> home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {SITE.phones.map((p) => (
                <a key={p.intl} href={whatsappLink("Hello, I would like to enquire about your furniture.", p.intl)} target="_blank" rel="noopener noreferrer" className="btn-wa-light">
                  <WhatsAppIcon className="h-[18px] w-[18px]" /> {p.display}
                </a>
              ))}
              {SITE.instagramAccounts.map((ig) => (
                <a key={ig.handle} href={ig.url} target="_blank" rel="noopener noreferrer" aria-label={"Follow " + ig.handle + " on Instagram"} className="btn-line-light">
                  <InstagramIcon className="h-4 w-4" /> {ig.handle}
                </a>
              ))}
            </div>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-beige/60">
              Showroom in {SITE.showroom.display}, visits by appointment. Workshop in Dubai. Home visits across all seven Emirates.
            </p>
          </div>
          <div className="lg:col-span-5">
            <p className="font-serif text-2xl text-beige">New projects and finishes, once a month.</p>
            <div className="mt-4"><NewsletterForm /></div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-beige/10 pt-12 md:grid-cols-4">
          {groups.slice(0, 2).map((g) => (
            <div key={g.slug}>
              <p className={col}>{g.title}</p>
              <ul className="flex flex-col">{categoriesInGroup(g.slug).map((c) => <li key={c.slug}><Link href={"/collections/" + c.slug} className={link}>{c.title}</Link></li>)}</ul>
            </div>
          ))}
          <div>
            {groups.slice(2).map((g) => (
              <div key={g.slug} className="mb-6">
                <p className={col}>{g.title}</p>
                <ul className="flex flex-col">{categoriesInGroup(g.slug).map((c) => <li key={c.slug}><Link href={"/collections/" + c.slug} className={link}>{c.title}</Link></li>)}</ul>
              </div>
            ))}
            <p className={col}>Company</p>
            <ul className="flex flex-col">{navLinks.map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <p className={col}>Where we work</p>
            <ul className="flex flex-col">{emirates.map((e) => <li key={e} className="min-h-[36px] text-[15px] leading-[36px] text-beige/65">{e}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="border-t border-beige/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row lg:px-10">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-mark-gold.png" alt="" width={484} height={543} unoptimized className="h-7 w-auto" />
            <p className="text-xs text-beige/40">&copy; {year} {SITE.name}. All rights reserved.</p>
          </div>
          <p className="flex gap-2 text-xs text-beige/50">
            <Link href="/privacy-policy" className="inline-flex min-h-[44px] items-center px-2 hover:text-beige">Privacy policy</Link>
            <Link href="/terms" className="inline-flex min-h-[44px] items-center px-2 hover:text-beige">Terms of use</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
