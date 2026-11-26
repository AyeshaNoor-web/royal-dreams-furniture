import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import PlanButton from "@/components/plan/PlanButton";
import { SITE, areas, whatsappLink, navLinks } from "@/lib/site";
import { groups, categoriesInGroup } from "@/lib/gallery";

const col = "mb-2 text-[12.5px] font-bold uppercase tracking-[0.1em] text-gold";
const link = "inline-flex min-h-[40px] items-center text-[15px] text-beige/70 transition-colors hover:text-beige";

export default function Footer() {
  const year = new Date().getFullYear();
  const emirates = [...areas.near.places, ...areas.far.places];
  return (
    <footer className="on-dark mt-3 overflow-hidden rounded-t-[2.25rem] bg-ink text-beige/80 lg:mt-5 lg:rounded-t-[3.5rem]">
      <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-6 lg:px-10 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Image src="/brand/logo-mark-gold.png" alt="" width={484} height={543} unoptimized className="h-14 w-auto" />
            <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-beige/75">
              Made-to-measure furniture and joinery. Showroom in {SITE.showroom.display}, visits by appointment. Workshop in Dubai. Home visits across all seven Emirates.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {SITE.phones.map((p) => (
                <a key={p.intl} href={whatsappLink("Hello, I would like to enquire about your furniture.", p.intl)} target="_blank" rel="noopener noreferrer" className="btn-wa min-h-[48px] px-5">
                  <WhatsAppIcon className="h-[18px] w-[18px]" /> {p.display}
                </a>
              ))}
              <PlanButton className="btn-lit min-h-[48px] px-5">Free quote</PlanButton>
            </div>
            {SITE.instagramAccounts.map((ig) => (
              <a key={ig.handle} href={ig.url} target="_blank" rel="noopener noreferrer" aria-label={"Follow " + ig.handle + " on Instagram"} className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-beige hover:text-gold">
                <InstagramIcon className="h-[18px] w-[18px]" /> {ig.handle}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-7">
            {groups.slice(0, 2).map((g) => (
              <div key={g.slug}>
                <p className={col}>{g.title}</p>
                <ul className="flex flex-col">{categoriesInGroup(g.slug).map((c) => <li key={c.slug}><Link href={"/collections/" + c.slug} className={link}>{c.title}</Link></li>)}</ul>
              </div>
            ))}
            <div>
              {groups.slice(2).map((g) => (
                <div key={g.slug} className="mb-5">
                  <p className={col}>{g.title}</p>
                  <ul className="flex flex-col">{categoriesInGroup(g.slug).map((c) => <li key={c.slug}><Link href={"/collections/" + c.slug} className={link}>{c.title}</Link></li>)}</ul>
                </div>
              ))}
              <p className={col}>Company</p>
              <ul className="flex flex-col">{navLinks.map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}</ul>
            </div>
            <div>
              <p className={col}>Where we work</p>
              <ul className="flex flex-col">{emirates.map((e) => <li key={e} className="min-h-[34px] text-[15px] leading-[34px] text-beige/70">{e}</li>)}</ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-beige/10 py-4 text-[13px] text-beige/55 sm:flex-row sm:items-center">
          <p>&copy; {year} {SITE.name}. All rights reserved.</p>
          <p className="flex gap-1">
            <Link href="/privacy-policy" className="inline-flex min-h-[44px] items-center pr-3 hover:text-beige">Privacy policy</Link>
            <Link href="/terms" className="inline-flex min-h-[44px] items-center px-3 hover:text-beige">Terms of use</Link>
          </p>
        </div>
      </div>
      <p aria-hidden="true" className="-mb-[0.14em] mt-2 select-none whitespace-nowrap text-center font-serif text-[15.5vw] font-bold leading-none tracking-[-0.06em] text-beige/[0.07]">Made to fit</p>
    </footer>
  );
}
