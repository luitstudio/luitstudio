import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ApplicationForm } from "@/components/sections/career/ApplicationForm";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Apply",
  description: "Tell Luit Studio about your work — no open role required.",
  alternates: { canonical: ROUTES.careerApply },
  robots: { index: false, follow: true },
};

interface GeneralApplicationPageProps {
  searchParams: Promise<{ role?: string }>;
}

export default async function GeneralApplicationPage({
  searchParams,
}: GeneralApplicationPageProps) {
  const { role } = await searchParams;

  return (
    <main id="main-content">
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 xl:pt-48 xl:pb-24">
        <Container className="mx-auto max-w-2xl">
          <Link
            href={ROUTES.career}
            className="text-body hover:text-ink group mb-10 inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
          >
            <ArrowLeft
              aria-hidden="true"
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Careers
          </Link>

          <p className="text-body/65 text-xs font-semibold tracking-[0.18em] uppercase">
            Open door
          </p>
          <h1 className="text-ink mt-3 text-[clamp(2.25rem,5vw,3.2rem)] leading-[1.04] tracking-[-0.035em] text-balance">
            Tell us about your work.
          </h1>
          <p className="text-body mt-4 mb-10 max-w-lg text-base leading-7">
            Don&apos;t see the right role listed? We read every message.
            Send us what you make and where you think you could help.
          </p>

          <ApplicationForm defaultRoleInterest={role} />
        </Container>
      </section>
    </main>
  );
}
