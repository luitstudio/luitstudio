import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

import { FooterCopyright } from "@/components/sections/footer/FooterCopyright";
import { FooterNavigation } from "@/components/sections/footer/FooterNavigation";
import { FooterPlayground } from "@/components/sections/footer/FooterPlayground";
import { FooterSocial } from "@/components/sections/footer/FooterSocial";
import { BookCallButton } from "@/components/shared/BookCallButton";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { studioLocationLabel } from "@/config/studio";
import { getWhatsAppLink } from "@/config/whatsapp";
import { ROUTES } from "@/constants/routes";
import { footerContent } from "@/data/footer";
import type { FooterContent } from "@/types/footer";
import { getExternalLinkAttributes } from "@/utils/external-link";

interface FooterProps {
  content?: FooterContent;
}

export function Footer({ content = footerContent }: FooterProps) {
  return (
    <footer className="bg-brand text-white">
      <Container className="pt-5 sm:pt-7 lg:pt-9">
        <div className="text-ink overflow-hidden rounded-[1.75rem] bg-[#f8f2e8] shadow-[0_24px_80px_rgb(16_10_60/24%)] sm:rounded-[2rem]">
          <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-16">
            <div className="border-ink/10 flex flex-col items-start gap-12 border-b pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-16">
              <div className="max-w-4xl">
                <p className="text-brand text-xs font-semibold tracking-[0.22em] uppercase">
                  {content.cta.eyebrow}
                </p>
                <h2 className="mt-5 text-[clamp(3rem,7vw,6.75rem)] leading-[0.9] font-medium tracking-[-0.06em] text-balance">
                  {content.cta.title}{" "}
                  <em className="font-display font-normal tracking-[-0.03em]">
                    {content.cta.emphasis}
                  </em>
                </h2>
              </div>

              <div className="flex max-w-md shrink-0 flex-col items-start gap-6 lg:pb-1">
                <p className="text-ink/70 text-base leading-7 sm:text-lg sm:leading-8">
                  {content.cta.description}
                </p>
                <BookCallButton variant="brand" className="pr-2">
                  {content.cta.label}
                </BookCallButton>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-12 lg:pt-14">
              <section
                aria-labelledby="footer-studio-heading"
                className="sm:col-span-2 lg:col-span-4 lg:pr-8"
              >
                <Link
                  href={ROUTES.home}
                  aria-label={`${siteConfig.name} home`}
                  className="inline-flex w-fit transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0 motion-reduce:transform-none"
                >
                  <Logo className="h-12 w-auto" />
                </Link>

                <h2 id="footer-studio-heading" className="sr-only">
                  Studio details
                </h2>
                <address className="mt-8 flex flex-col gap-3 not-italic">
                  <a
                    href={`mailto:${content.contact.email}`}
                    data-analytics-event="contact_email"
                    data-analytics-location="footer"
                    className="group text-ink/70 hover:text-brand focus-visible:text-brand flex items-start gap-3 text-sm transition-colors"
                  >
                    <Mail
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      size={17}
                    />
                    <span className="break-all">{content.contact.email}</span>
                  </a>
                  <a
                    href={getWhatsAppLink()}
                    {...getExternalLinkAttributes("Chat on WhatsApp")}
                    data-analytics-event="contact_whatsapp"
                    data-analytics-location="footer"
                    className="group text-ink/70 hover:text-brand focus-visible:text-brand flex items-start gap-3 text-sm transition-colors"
                  >
                    <FaWhatsapp
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      size={17}
                    />
                    Chat on WhatsApp
                  </a>
                  <span className="text-ink/70 flex items-start gap-3 text-sm">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      size={17}
                    />
                    {studioLocationLabel}
                  </span>
                </address>
              </section>

              <div className="lg:col-span-3">
                <FooterNavigation groups={content.navigationGroups} />
              </div>

              <section
                aria-labelledby="footer-services-heading"
                className="lg:col-span-3"
              >
                <h2
                  id="footer-services-heading"
                  className="text-ink/70 text-xs font-semibold tracking-[0.2em] uppercase"
                >
                  Services
                </h2>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {content.services.map((service) => (
                    <li key={service.label}>
                      <Link
                        href={service.href}
                        className="text-ink hover:text-brand focus-visible:text-brand inline-flex text-sm transition-[transform,color] duration-200 hover:translate-x-1 focus-visible:translate-x-1 motion-reduce:transform-none"
                      >
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="lg:col-span-2">
                <FooterSocial links={content.socialLinks} />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <FooterPlayground />

      <Container>
        <FooterCopyright
          text={content.copyright}
          editorialCopy={content.editorialCopy}
        />
      </Container>
    </footer>
  );
}
