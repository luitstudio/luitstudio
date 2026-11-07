import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplicationForm } from "@/components/sections/career/ApplicationForm";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants/routes";
import { getPublishedOpening, isIndexableOpening } from "@/lib/careers";

interface ApplyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ApplyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const opening = await getPublishedOpening(slug);

  if (!opening) return { title: "Role not found" };

  return {
    title: `Apply — ${opening.title}`,
    description: opening.summary,
    alternates: { canonical: `${ROUTES.careerApply}/${opening.slug}` },
    robots: { index: isIndexableOpening(opening), follow: true },
  };
}

export default async function ApplyToOpeningPage({ params }: ApplyPageProps) {
  const { slug } = await params;
  const opening = await getPublishedOpening(slug);

  if (!opening) notFound();

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

          <div className="mb-10 flex flex-col gap-4">
            <p className="text-body/65 text-xs font-semibold tracking-[0.18em] uppercase">
              {[opening.department, opening.employmentType, opening.location]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <h1 className="text-ink text-[clamp(2.25rem,5vw,3.2rem)] leading-[1.04] tracking-[-0.035em] text-balance">
              {opening.title}
            </h1>
            <p className="text-body max-w-lg text-base leading-7">
              {opening.description}
            </p>

            {opening.responsibilities.length > 0 ? (
              <div>
                <h2 className="text-ink text-sm font-semibold">
                  What you&apos;ll do
                </h2>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {opening.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="text-body flex items-start gap-2 text-sm leading-6"
                    >
                      <span className="bg-brand mt-2 size-1.5 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {opening.requirements.length > 0 ? (
              <div>
                <h2 className="text-ink text-sm font-semibold">
                  What we&apos;re looking for
                </h2>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {opening.requirements.map((item) => (
                    <li
                      key={item}
                      className="text-body flex items-start gap-2 text-sm leading-6"
                    >
                      <span className="bg-brand mt-2 size-1.5 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <ApplicationForm
            jobOpeningId={opening.id}
            roleLabel={opening.title}
          />
        </Container>
      </section>
    </main>
  );
}
