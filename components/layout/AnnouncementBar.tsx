import { SITE, APPOINTMENT_LINK } from "@/lib/site";

export default function AnnouncementBar() {
  const phone = SITE.phones[0];
  return (
    <div className="bg-charcoal text-beige/80">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-7 px-6 text-[13px] md:justify-end lg:px-10">
        <a href={"tel:+" + phone.intl} className="transition-colors hover:text-beige-light">+971 {phone.display.slice(1)}</a>
        <a href={APPOINTMENT_LINK} target="_blank" rel="noopener noreferrer" className="text-gold transition-colors hover:text-beige-light">
          Book on WhatsApp
        </a>
      </div>
    </div>
  );
}
