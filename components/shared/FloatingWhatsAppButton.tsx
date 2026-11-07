import { FaWhatsapp } from "react-icons/fa6";

import { getWhatsAppLink } from "@/config/whatsapp";
import { getExternalLinkAttributes } from "@/utils/external-link";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      {...getExternalLinkAttributes("Chat on WhatsApp")}
      data-analytics-event="contact_whatsapp"
      data-analytics-location="floating_button"
      className="group bg-brand shadow-soft fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full text-white transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-1 hover:bg-ink hover:shadow-xl focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0 active:scale-[0.96] motion-reduce:transform-none"
    >
      <FaWhatsapp
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transform-none"
        size={28}
      />
    </a>
  );
}
