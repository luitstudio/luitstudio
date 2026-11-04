import Image from "next/image";

import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

// Reuses the world-map illustration already generated for the Home
// hero (Guwahati marked, lines to other continents) instead of asking
// for a new asset — same real artwork, same claim: based here, working
// with people everywhere.
export function AboutGlobal() {
  return (
    <section
      id="global"
      aria-labelledby="global-heading"
      className="bg-[#dcedf7]/25 py-16 md:py-20 xl:py-24"
    >
      <Container className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="text-sky-ink text-xs font-bold tracking-widest uppercase">
            05 · Beyond
          </span>

          <AnimatedHeadline
            as="h2"
            id="global-heading"
            text="The river doesn't stop at Assam's border."
            italicText="Neither do we."
            delay={0.05}
            animateOnView
            className="text-ink text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] tracking-[-0.03em] text-balance"
            italicClassName="font-display font-normal"
          />

          <Reveal delay={0.08} className="flex flex-col gap-4">
            <p className="text-body text-base leading-7">
              We&apos;re based in Guwahati, but our work isn&apos;t
              limited by location. We collaborate with businesses,
              startups, and creators wherever they are — in India or
              anywhere in the world.
            </p>
            <p className="text-body text-base leading-7">
              Same roots, a much bigger horizon.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="relative">
          <Image
            src="/images/illustrations/hero-world-map-desktop.png"
            alt="A world map with connecting lines from Guwahati"
            width={1781}
            height={883}
            className="w-full"
          />
          <span className="font-handwriting text-sky-ink/80 absolute -top-6 right-4 hidden -rotate-3 text-lg leading-tight lg:block">
            From here,
            <br />
            to anywhere.
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
