import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_LINK } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg shadow-black/20 hover:bg-[#1ebe5b] transition-colors duration-300"
    >
      <WhatsAppIcon className="w-5 h-5 shrink-0" />
      <span className="font-dm text-sm font-medium hidden sm:block">Get a quote</span>
    </a>
  );
}
