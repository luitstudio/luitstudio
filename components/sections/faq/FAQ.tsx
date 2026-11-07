import {
  Clock,
  Globe,
  Headphones,
  LayoutGrid,
  MessageCircleQuestion,
  Plus,
  Receipt,
} from "lucide-react";
import Image from "next/image";

import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { BookCallButton } from "@/components/shared/BookCallButton";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

// Answers are kept honest and general on purpose — no invented timelines
// or policies beyond what's already true elsewhere on the site (the
// retainer/project pricing split, dual-currency, India + international
// clients).
const faqs = [
  {
    question: "Which company provides website development in Guwahati?",
    answer:
      "Luit Studio is a Guwahati, Assam design and build studio offering web and app development alongside design, automation, marketing, and content services. Tell us what you need and we will confirm the right scope before proposing work.",
    icon: Globe,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    question: "What if I only need one service?",
    answer:
      "That's fine — most clients start with just one. Web development, a brand refresh, or ongoing social media handling all work as standalone engagements. We scope and price around what you actually need.",
    icon: LayoutGrid,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Ongoing content, updates, and management are exactly what our retainer track covers. We'll talk through what makes sense for you before the project wraps up.",
    icon: Headphones,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "It depends on scope — a landing page moves faster than a full product build. We'll give you a real timeline on the call, not a generic estimate.",
    icon: Clock,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes — we work with clients across India and internationally. Pricing is available in both ₹ and $, and calls are scheduled to fit your timezone.",
    icon: Globe,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    question: "How do you handle pricing?",
    answer:
      "It depends on the work — ongoing services like marketing or content run on a retainer, while builds like a website or app get a fixed project quote. Every price is confirmed in writing before we start, in ₹ or $.",
    icon: Receipt,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
] as const;

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden py-14 md:py-16 xl:py-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema()).replace(/</g, "\\u003c"),
        }}
      />

      <Container className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 1360 640"
          preserveAspectRatio="none"
          className="text-border pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          <path
            d="M-20,360 C160,360 220,230 420,230 C620,230 680,420 900,420 C1080,420 1140,260 1380,300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="118"
            y="352"
            width="12"
            height="12"
            className="fill-border"
            transform="rotate(45 124 358)"
          />
          <rect
            x="1198"
            y="292"
            width="12"
            height="12"
            className="fill-border"
            transform="rotate(45 1204 298)"
          />
        </svg>

        <div className="relative mx-auto flex max-w-3xl flex-col gap-8 sm:gap-10">
          <div className="pointer-events-none absolute -top-2 -left-4 hidden -rotate-3 flex-col items-start gap-1 sm:-left-10 lg:-left-20 lg:flex">
            <span className="font-handwriting text-brand/70 text-lg leading-tight">
              Have a
              <br />
              question?
            </span>
            <Image
              src="/images/illustrations/process-arrow-start.png"
              alt=""
              width={240}
              height={300}
              className="h-12 w-auto"
            />
          </div>

          <div className="pointer-events-none absolute top-2 -right-4 hidden rotate-3 flex-col items-end gap-1 text-right sm:-right-10 lg:-right-20 lg:flex">
            <span className="font-handwriting text-brand/70 text-lg leading-tight">
              We&apos;re
              <br />
              here to help.
            </span>
            <Image
              src="/images/illustrations/process-arrow-end.png"
              alt=""
              width={240}
              height={300}
              className="h-12 w-auto"
            />
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="bg-border h-px w-8" />
              <span className="text-body/60 text-xs font-semibold tracking-[0.18em] uppercase">
                FAQ
              </span>
              <span aria-hidden="true" className="bg-border h-px w-8" />
            </div>

            <AnimatedHeadline
              as="h2"
              id="faq-heading"
              text="Questions you might"
              italicText="already have"
              delay={0.05}
              animateOnView
              className="text-ink mx-auto max-w-lg text-center text-[clamp(2.25rem,5vw,3rem)] leading-[1.08] tracking-[-0.035em] text-balance"
              italicClassName="font-display font-normal"
            />

            <p className="text-body max-w-lg text-sm leading-6 sm:text-base">
              Quick answers to common questions. Can&apos;t find what
              you&apos;re looking for? Feel free to reach out — we&apos;re
              happy to help.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;

              return (
                <Reveal key={faq.question} delay={0.05 + index * 0.04}>
                  <details className="group border-border bg-canvas open:border-brand/20 rounded-2xl border px-4 py-3 shadow-sm transition-colors duration-200 sm:rounded-3xl sm:px-5 sm:py-3.5">
                    <summary className="text-ink marker:content-none flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-full ${faq.iconBg} ${faq.iconColor}`}
                      >
                        <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                      </span>
                      <span className="flex-1 text-base font-medium sm:text-lg">
                        {faq.question}
                      </span>
                      <span className="bg-brand/10 text-brand grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-200 group-open:rotate-45">
                        <Plus aria-hidden="true" size={18} />
                      </span>
                    </summary>
                    <p className="text-body mt-3 pl-14 text-sm leading-6 sm:text-base">
                      {faq.answer}
                    </p>
                  </details>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.05 + faqs.length * 0.04}>
            <div className="border-border bg-brand/5 flex flex-col items-center gap-3 rounded-3xl border px-6 py-8 text-center sm:px-10 sm:py-10">
              <span className="bg-brand/10 text-brand grid size-14 place-items-center rounded-full">
                <MessageCircleQuestion aria-hidden="true" size={26} />
              </span>
              <h3 className="text-ink text-2xl font-medium">
                Still have questions?
              </h3>
              <p className="text-body max-w-sm text-sm leading-6 sm:text-base">
                Book a call with us and we&apos;ll walk you through exactly
                how we&apos;d approach your project.
              </p>
              <BookCallButton variant="brand" className="mt-2">
                Book a Call
              </BookCallButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
