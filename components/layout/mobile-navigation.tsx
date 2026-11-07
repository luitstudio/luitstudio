"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  CircleUserRound,
  Dribbble,
  Facebook,
  Github,
  Home,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Newspaper,
  Palette,
  Twitter,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import { Logo } from "@/components/shared/Logo";
import { ButtonLink } from "@/components/ui/button";
import { mobileNavigationItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { mobileSocialLinks } from "@/config/social";
import { getWhatsAppLink } from "@/config/whatsapp";
import { MOTION_DURATION, MOTION_EASING } from "@/constants/motion";
import { ROUTES } from "@/constants/routes";
import type { SocialPlatform } from "@/types/contact";
import type { MobileNavigationItem } from "@/types/navigation";
import { getExternalLinkAttributes } from "@/utils/external-link";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const navigationIcons = {
  about: CircleUserRound,
  blog: Newspaper,
  career: Briefcase,
  contact: Mail,
  home: Home,
  services: Layers3,
} satisfies Record<MobileNavigationItem["icon"], typeof Home>;

const socialIcons = {
  behance: Palette,
  dribbble: Dribbble,
  facebook: Facebook,
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
} satisfies Record<SocialPlatform, typeof Github>;

const featuredSocialPlatforms = [
  { platform: "instagram", label: "Instagram" },
  { platform: "x", label: "X" },
  { platform: "facebook", label: "Facebook" },
] as const satisfies readonly {
  platform: SocialPlatform;
  label: string;
}[];

export function MobileNavigation({
  isOpen,
  onClose,
  pathname,
  triggerRef,
}: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const featuredSocialLinks = featuredSocialPlatforms.map((featured) => ({
    ...featured,
    link: mobileSocialLinks.find((link) => link.platform === featured.platform),
  }));
  const additionalSocialLinks = mobileSocialLinks.filter(
    (link) =>
      !featuredSocialPlatforms.some(
        (featured) => featured.platform === link.platform,
      ),
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  const duration = shouldReduceMotion ? 0 : MOTION_DURATION.drawer;

  const isItemActive = (item: MobileNavigationItem) => {
    if (item.href === ROUTES.home) return pathname === ROUTES.home;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[#0B1220]/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : MOTION_DURATION.backdrop,
            }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="absolute inset-y-0 right-0 flex w-[min(100%,420px)] flex-col overflow-y-auto overscroll-contain bg-[#FEFAF6] px-5 py-5 text-[#0B1220] shadow-[-12px_0_40px_rgb(11_18_32_/_0.14)] sm:px-7"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : "100%" }}
            transition={{ duration, ease: MOTION_EASING.premium }}
          >
            <div className="flex items-start justify-between gap-5">
              <div className="pt-2">
                <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-[#0B1220]/65 uppercase">
                  Design &amp; Build Studio
                </p>
                <Logo className="mt-5 h-[clamp(4rem,18vw,5rem)] w-auto" />
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="group grid size-12 shrink-0 place-items-center rounded-2xl bg-[#0B1220]/8 transition-[transform,background-color,opacity] duration-200 hover:-translate-y-0.5 hover:bg-[#0B1220]/14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#155EEF] active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none"
                aria-label="Close navigation"
                onClick={onClose}
              >
                <X
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:rotate-6 group-focus-visible:rotate-6 motion-reduce:transform-none"
                  size={25}
                  strokeWidth={1.75}
                />
              </button>
            </div>

            <motion.div
              className="mt-10 grid gap-3"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration, delay: shouldReduceMotion ? 0 : 0.08 }}
            >
              <ButtonLink
                href={ROUTES.contact}
                variant="luit"
                className="w-full"
                onClick={onClose}
              >
                Start a Project
              </ButtonLink>
              <ButtonLink
                href={getWhatsAppLink()}
                {...getExternalLinkAttributes("Chat on WhatsApp")}
                data-analytics-event="contact_whatsapp"
                data-analytics-location="mobile_navigation"
                icon={FaWhatsapp}
                variant="luitOutline"
                className="w-full"
              >
                Chat on WhatsApp
              </ButtonLink>
            </motion.div>

            <nav aria-label="Mobile navigation" className="mt-9">
              <ul className="flex flex-col gap-1">
                {mobileNavigationItems.map((item, index) => {
                  const Icon = navigationIcons[item.icon];
                  const isActive = isItemActive(item);

                  return (
                    <motion.li
                      key={item.id}
                      initial={{
                        opacity: 0,
                        y: shouldReduceMotion ? 0 : 8,
                      }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.22,
                        delay: shouldReduceMotion ? 0 : 0.12 + index * 0.035,
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`group flex min-h-[52px] w-full items-center gap-4 rounded-xl px-3 font-medium transition-[transform,color,background-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#155EEF] active:scale-[0.99] motion-reduce:transform-none ${
                          isActive
                            ? "shadow-soft bg-[#155EEF] text-white"
                            : "hover:-translate-y-0.5 hover:bg-[#155EEF]/8 hover:text-[#155EEF] focus-visible:-translate-y-0.5 focus-visible:bg-[#155EEF]/8 focus-visible:text-[#155EEF]"
                        }`}
                        onClick={onClose}
                      >
                        <Icon
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none"
                          size={20}
                          strokeWidth={1.7}
                        />
                        <span>{item.label}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <section
              aria-labelledby="mobile-social-heading"
              className="mt-8 border-y border-[#0B1220]/12 py-7"
            >
              <p
                id="mobile-social-heading"
                className="text-[0.6875rem] font-semibold tracking-[0.16em] text-[#0B1220]/65 uppercase"
              >
                Connect
              </p>
              <ul
                aria-label="Social media"
                className="mt-4 flex flex-wrap gap-3"
              >
                {featuredSocialLinks.map(({ platform, label, link }, index) => {
                  const Icon = socialIcons[platform];

                  return (
                    <motion.li
                      key={platform}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.22,
                        delay: shouldReduceMotion ? 0 : 0.3 + index * 0.035,
                      }}
                    >
                      {link ? (
                        <a
                          href={link.href}
                          {...getExternalLinkAttributes(link.label)}
                          className="grid size-11 place-items-center rounded-full border border-[#0B1220]/15 bg-white/60 text-[#0B1220] transition-[transform,color,background-color,border-color] duration-200 hover:-translate-y-1 hover:border-[#155EEF] hover:bg-[#155EEF] hover:text-white focus-visible:-translate-y-1 focus-visible:border-[#155EEF] focus-visible:bg-[#155EEF] focus-visible:text-white motion-reduce:transform-none"
                        >
                          <Icon
                            aria-hidden="true"
                            size={19}
                            strokeWidth={1.7}
                          />
                          <span className="sr-only">{label}</span>
                        </a>
                      ) : (
                        <span
                          role="img"
                          aria-label={`${label} profile coming soon`}
                          title={`${label} profile coming soon`}
                          className="grid size-11 cursor-not-allowed place-items-center rounded-full border border-dashed border-[#0B1220]/20 text-[#0B1220]/45"
                        >
                          <Icon
                            aria-hidden="true"
                            size={19}
                            strokeWidth={1.7}
                          />
                        </span>
                      )}
                    </motion.li>
                  );
                })}

                {additionalSocialLinks.map((link, index) => {
                  const Icon = socialIcons[link.platform];

                  return (
                    <motion.li
                      key={link.platform}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.22,
                        delay: shouldReduceMotion ? 0 : 0.405 + index * 0.035,
                      }}
                    >
                      <a
                        href={link.href}
                        {...getExternalLinkAttributes(link.label)}
                        className="grid size-11 place-items-center rounded-full border border-[#0B1220]/15 bg-white/60 text-[#0B1220] transition-[transform,color,background-color,border-color] duration-200 hover:-translate-y-1 hover:border-[#155EEF] hover:bg-[#155EEF] hover:text-white focus-visible:-translate-y-1 focus-visible:border-[#155EEF] focus-visible:bg-[#155EEF] focus-visible:text-white motion-reduce:transform-none"
                      >
                        <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
                        <span className="sr-only">{link.label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </section>

            <div className="mt-8 pt-6 text-sm text-[#0B1220]/65">
              <p>Design &amp; build, from Guwahati.</p>
              <p className="mt-1">{siteConfig.copyrightShort}</p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
