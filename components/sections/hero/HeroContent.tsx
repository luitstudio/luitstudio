import { HeroCTA } from "@/components/sections/hero/HeroCTA";
import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";

export function HeroContent() {
  return (
    <header className="mx-auto flex max-w-6xl flex-col gap-8 text-center sm:gap-9 lg:gap-10">
      <AnimatedHeadline
        id="hero-heading"
        text="A design and build studio"
        secondLineText="from"
        italicText="Guwahati, Assam."
        delay={0.05}
        className="text-ink text-[clamp(2.75rem,11vw,8rem)] leading-[0.92] font-medium tracking-[-0.055em] text-balance"
        italicClassName="font-display font-normal tracking-[-0.02em]"
      />

      <Reveal delay={0.14} className="mx-auto max-w-2xl">
        <p className="text-body text-base leading-7 sm:text-lg sm:leading-8">
          Luit Studio helps businesses build websites, digital products,
          visual systems, and campaigns that are clear, useful, and ready to
          grow across Assam, India, and beyond.
        </p>
      </Reveal>

      <Reveal delay={0.23}>
        <HeroCTA />
      </Reveal>
    </header>
  );
}
