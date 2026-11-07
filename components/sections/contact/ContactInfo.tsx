import { Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { SocialLinks } from "@/components/sections/contact/SocialLinks";
import { BookCallButton } from "@/components/shared/BookCallButton";
import { ButtonLink } from "@/components/ui/button";
import { studioLocationLabel } from "@/config/studio";
import { getWhatsAppLink } from "@/config/whatsapp";
import type { ContactDetails } from "@/types/contact";
import { getExternalLinkAttributes } from "@/utils/external-link";

interface ContactInfoProps {
  details: ContactDetails;
}

export function ContactInfo({ details }: ContactInfoProps) {
  return (
    <aside
      aria-labelledby="contact-details-heading"
      className="bg-ink flex h-full flex-col rounded-2xl p-6 text-white sm:p-8 lg:p-10"
    >
      <h2 id="contact-details-heading" className="text-3xl text-white">
        Contact details
      </h2>
      <address className="mt-8 flex flex-col gap-6 not-italic">
        <a
          href={`mailto:${details.email}`}
          data-analytics-event="contact_email"
          data-analytics-location="contact_details"
          className="group flex items-center gap-3 text-white/75 transition-[transform,color] duration-200 hover:translate-x-1 hover:text-white focus-visible:translate-x-1 focus-visible:text-white motion-reduce:transform-none"
        >
          <Mail
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none"
            size={20}
          />
          <span className="break-all">{details.email}</span>
        </a>
        <span className="flex items-center gap-3 text-white/75">
          <MapPin aria-hidden="true" size={20} />
          {studioLocationLabel}
        </span>
      </address>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <BookCallButton variant="light" className="w-full sm:w-auto">
          Book a Call
        </BookCallButton>
        <ButtonLink
          href={getWhatsAppLink()}
          {...getExternalLinkAttributes("Chat on WhatsApp")}
          data-analytics-event="contact_whatsapp"
          data-analytics-location="contact_details"
          icon={FaWhatsapp}
          variant="outlineLight"
          className="w-full sm:w-auto"
        >
          Chat on WhatsApp
        </ButtonLink>
      </div>
      {details.socialLinks.length > 0 ? (
        <div className="mt-auto pt-10">
          <SocialLinks links={details.socialLinks} inverse />
        </div>
      ) : null}
    </aside>
  );
}
