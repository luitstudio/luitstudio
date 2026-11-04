import {
  Code2,
  FileText,
  Lightbulb,
  Map,
  Megaphone,
  PenTool,
} from "lucide-react";

import { AnimatedHeadline } from "@/components/shared/AnimatedHeadline";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/ui/container";

// Recolored via a CSS mask instead of shipping a flat-color PNG — the
// doodle always matches whatever text color it's paired with, here and
// anywhere else it gets reused.
function ArrowDoodle({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`bg-violet-ink/80 inline-block ${className ?? ""}`}
      style={{
        maskImage: "url(/images/illustrations/process-arrow-end.png)",
        WebkitMaskImage: "url(/images/illustrations/process-arrow-end.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

// Percentage coordinates around a circle, computed once (top, then
// clockwise every 60°) rather than guessed — keeps the six nodes evenly
// spaced regardless of container size.
const RING_CENTER = 50;
const RING_RADIUS = 42;

function pointOnRing(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    top: RING_CENTER - RING_RADIUS * Math.cos(rad),
    left: RING_CENTER + RING_RADIUS * Math.sin(rad),
  };
}

const nodes = [
  { label: "Strategy", icon: Map, top: 8, left: 50, hex: "#1d4ed8" },
  { label: "Design", icon: PenTool, top: 29, left: 86.4, hex: "#dc2626" },
  { label: "Development", icon: Code2, top: 71, left: 86.4, hex: "#1d4ed8" },
  { label: "Content", icon: FileText, top: 92, left: 50, hex: "#15803d" },
  { label: "Marketing", icon: Megaphone, top: 71, left: 13.6, hex: "#7c3aed" },
  { label: "Ideas", icon: Lightbulb, top: 29, left: 13.6, hex: "#1d4ed8" },
] as const;

// Small dot markers on the ring itself, one between each pair of
// adjacent nodes (every 60°, offset by 30°) — sitting on the actual
// circle rather than a straight chord between them.
const edgeDots = [30, 90, 150, 210, 270, 330].map(pointOnRing);

function OrbitDiagram() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-lg"
    >
      {/* The orbit ring itself spins via
          CSS animation. The ring and its node glows remain unclipped so they
          can fade naturally into the page background at every breakpoint. */}
      <div className="absolute inset-0">
        <div className="orbit-ring absolute inset-0">
          <svg
            viewBox="0 0 100 100"
            className="text-border absolute inset-0 h-full w-full"
          >
            <circle
              cx={RING_CENTER}
              cy={RING_CENTER}
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          </svg>

          {edgeDots.map((dot, i) => (
            <span
              key={i}
              className="border-brand/30 bg-canvas absolute grid size-3.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border"
              style={{ top: `${dot.top}%`, left: `${dot.left}%` }}
            >
              <span className="bg-brand size-1.5 rounded-full" />
            </span>
          ))}

          {nodes.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${node.top}%`, left: `${node.left}%` }}
              >
                <div className="orbit-label relative grid place-items-center">
                  <span
                    className="absolute size-36 rounded-full blur-2xl"
                    style={{ backgroundColor: `${node.hex}33` }}
                  />
                  <div
                    className="border-canvas relative z-10 grid size-28 place-items-center gap-1.5 rounded-full border-[5px] shadow-lg"
                    style={{
                      background: `radial-gradient(circle at 32% 28%, ${node.hex}33, ${node.hex}12 65%)`,
                    }}
                  >
                    <Icon
                      aria-hidden="true"
                      size={30}
                      strokeWidth={2}
                      style={{ color: node.hex }}
                    />
                    <span className="text-ink text-sm font-bold whitespace-nowrap">
                      {node.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute top-[-4%] left-[102%] hidden -rotate-3 flex-col items-start gap-1 2xl:flex">
        <span className="font-handwriting text-violet-ink/80 text-lg leading-tight whitespace-nowrap">
          Different skills.
          <br />
          Same direction.
        </span>
        <ArrowDoodle className="h-24 w-19" />
      </div>
    </div>
  );
}

export function AboutApproach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="bg-[#ece0f7]/15 py-16 md:py-20 xl:py-24"
    >
      <Container className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="text-violet-ink text-xs font-bold tracking-widest uppercase">
            03 · Approach
          </span>

          <AnimatedHeadline
            as="h2"
            id="approach-heading"
            text="Keeping it together,"
            italicText="so nothing gets lost."
            delay={0.05}
            animateOnView
            className="text-ink text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] tracking-[-0.03em] text-balance"
            italicClassName="font-display font-normal"
          />

          <Reveal delay={0.08} className="flex flex-col gap-4">
            <p className="text-body text-base leading-7">
              A brand is not just a logo, a website is not just code, and
              marketing is not just posting online — they all work better
              when they move in the same direction.
            </p>
            <p className="text-body text-base leading-7">
              That&apos;s why we bring development, design, content, and
              marketing together under one roof. Different skills, same
              goal: digital products that actually work.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="relative">
          <OrbitDiagram />
        </Reveal>
      </Container>
    </section>
  );
}
