import { ClientLogo } from "@/components/sections/client-marquee/ClientLogo";
import { clientLogos } from "@/components/sections/client-marquee/logo-data";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

export function AboutWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-[#f0e2cf]/15 py-16 md:py-20 xl:py-24"
    >
      <Container className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="text-[#7a4a1e] text-xs font-bold tracking-widest uppercase">
          04 · The Clients
        </span>

        <AnimatedHeadline
          as="h2"
          id="work-heading"
          text="Real clients."
          italicText="Real industries."
          delay={0.05}
          animateOnView
          className="text-ink text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] tracking-[-0.03em] text-balance"
          italicClassName="font-display font-normal"
        />

        <Reveal delay={0.08}>
          <p className="text-body max-w-lg text-base leading-7 sm:text-lg">
            We&apos;ve had the opportunity to work with businesses across
            different industries — from local brands in Assam to clients
            outside the region. Every project teaches us something new,
            and we&apos;re grateful for the people who trust us.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="w-full">
          <ul className="bg-canvas border-border grid grid-cols-2 items-center justify-items-center gap-x-4 gap-y-8 rounded-2xl border p-8 sm:grid-cols-3">
            {clientLogos.map((logo) => (
              <ClientLogo key={logo.id} logo={logo} />
            ))}
          </ul>
          <p className="text-body/70 mt-4 text-sm">and more on the way…</p>
        </Reveal>
      </Container>
    </section>
  );
}
