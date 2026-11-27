import Image from "next/image";
import Link from "next/link";
import InstagramIcon from "@/components/icons/InstagramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { categories } from "@/lib/gallery";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

const explore = [
  { label: "Home", href: "/" },
  { label: "All products", href: "/collections" },
  { label: "Budget calculator", href: "/pricing" },
  { label: "Our work", href: "/gallery" },
  { label: "Get a quote", href: "/quote" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink pb-24 text-white lg:pb-0">
      <div className="wrap grid grid-cols-2 gap-x-8 gap-y-12 py-14 lg:grid-cols-12 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" className="flex items-center gap-3" aria-label={SITE.name + " home"}>
            <Image src="/brand/logo-mark-gold.png" alt="" width={484} height={543} className="h-11 w-auto" />
            <span className="font-dm text-[14px] font-semibold uppercase leading-[1.25] tracking-[0.14em]">Modern Furniture<br />Collection</span>
          </Link>
          <p className="mt-6 max-w-sm font-dm text-sm leading-relaxed text-white/70">
            Made-to-measure sofas, beds, wardrobes, walk-in closets, media walls, paneling and curtains. Measured in your home, built in our own workshop and fitted by our own team across the UAE.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-white"><WhatsAppIcon className="h-4 w-4 text-[#128C4B]" /> WhatsApp us</a>
            {SITE.instagramAccounts.map((a) => (
              <a key={a.url} href={a.url} target="_blank" rel="noopener noreferrer" aria-label={"Instagram " + a.handle} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white">
                <InstagramIcon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 lg:col-start-6">
          <p className="mb-5 font-dm text-sm font-medium text-white">Explore</p>
          <ul className="flex flex-col gap-3">
            {explore.map((l) => (
              <li key={l.href}><Link href={l.href} className="font-dm text-sm text-white/70 hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="mb-5 font-dm text-sm font-medium text-white">Products</p>
          <ul className="flex flex-col gap-3">
            {categories.map((c) => (
              <li key={c.slug}><Link href={"/collections/" + c.slug} className="font-dm text-sm text-white/70 hover:text-white">{c.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <p className="mb-5 font-dm text-sm font-medium text-white">Contact</p>
          <ul className="flex flex-col gap-4 font-dm text-sm text-white/70">
            <li>
              <a href={"tel:+" + SITE.phones[0].intl} className="hover:text-white">{SITE.phones[0].display}</a>
              <span className="block text-[13px] text-white/50">Call or WhatsApp</span>
            </li>
            <li>
              <a href={SITE.showroom.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Showroom: {SITE.showroom.display}</a>
              <span className="block text-[13px] text-white/50">Visits by appointment</span>
            </li>
            <li>Home visits across all seven Emirates</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 font-dm text-[13px] text-white/50 sm:flex-row sm:items-center sm:gap-8 lg:pr-36">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Your quotation follows a free home measurement.</p>
        </div>
      </div>
    </footer>
  );
}
