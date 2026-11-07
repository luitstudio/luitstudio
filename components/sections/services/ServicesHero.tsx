import { ArrowDownRight } from "lucide-react";

import { HeroSystem } from "@/components/sections/services/HeroSystem";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-10 md:pb-12">
      <Container className="grid min-h-0 items-center gap-8 lg:min-h-[620px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <span className="text-body/65 text-xs font-semibold tracking-[0.18em] uppercase">
            Services by Luit Studio
          </span>

          <AnimatedHeadline
            as="h1"
            id="services-hero-heading"
            text="We build the things"
            secondLineText="businesses need"
            italicText="next."
            delay={0.05}
            className="text-ink max-w-4xl text-[clamp(2.75rem,5.6vw,5rem)] leading-[0.96] tracking-[-0.04em] text-balance"
            italicClassName="font-display pb-1 font-normal leading-[1.12]"
          />

          <Reveal delay={0.18}>
            <p className="text-body max-w-lg text-base leading-7 sm:text-lg sm:leading-8">
              Web and app development, AI automation, design, marketing, and
              motion for businesses in Guwahati, Assam, and beyond.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <ButtonLink href="#map" variant="brand" icon={ArrowDownRight}>
              See the map
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <HeroSystem />
        </Reveal>
      </Container>
    </section>
  );
}
