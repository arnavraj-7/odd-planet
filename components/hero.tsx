import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { RibbonField } from "@/components/ribbon-field";
import { hero } from "@/lib/content";

const HERO_MASK =
  "radial-gradient(74% 56% at 50% 44%, #000 0%, rgba(0,0,0,0.42) 40%, rgba(0,0,0,0) 68%)";

export function Hero() {
  return (
    // Fills exactly the rest of the first screen, so the planet limb always
    // lands in view. Clipped horizontally only — the gradient field has to
    // reach up behind the transparent header, or the header cuts a hard seam
    // across it.
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-var(--op-header))] flex-col overflow-x-clip"
    >
      {/* Layer A — animated ribbon gradient field */}
      <RibbonField
        mask={HERO_MASK}
        className="absolute top-[-24%] left-[-14%] block h-[112%] w-[128%] opacity-40 mix-blend-screen"
      />

      <div className="relative mx-auto flex w-full max-w-[1120px] flex-1 flex-col justify-center px-gutter pt-[clamp(24px,4vw,64px)] pb-[clamp(12px,2vw,28px)] text-center">
        <Reveal as="h1" className="m-0 text-ink-900">
          <span className="block font-grotesk text-hero-caps leading-[0.94] font-extrabold tracking-[-0.04em]">
            {hero.line1}
          </span>
          <span className="block font-serif text-hero-serif leading-[0.92] font-normal tracking-[-0.02em] text-blue-100 italic">
            {hero.line2}
          </span>
          <span className="block font-grotesk text-hero-caps leading-[0.98] font-extrabold tracking-[-0.04em]">
            {hero.line3Lead} <span className="text-blue-400">{hero.line3Accent}</span>
          </span>
        </Reveal>

        <Reveal className="mt-[clamp(26px,3.4vw,40px)] flex flex-wrap items-center justify-center gap-3 max-[440px]:flex-col max-[440px]:items-stretch max-[440px]:[&>*]:w-full max-[440px]:[&>*]:text-center">
          <a href={hero.primaryCta.href} className="op-btn text-white">
            {hero.primaryCta.label}
          </a>
          <span className="op-rim">
            <a href={hero.secondaryCta.href} className="op-rim-inner">
              {hero.secondaryCta.label}
            </a>
          </span>
        </Reveal>
      </div>

      <div className="relative mx-auto h-[min(clamp(200px,27vw,340px),34svh)] w-full max-w-[1120px] shrink-0 px-gutter">
        {/* Logo lockup — above the dissolve, so the fade cannot grey it out */}
        <Reveal className="absolute top-0 left-1/2 z-20 h-[clamp(54px,7.4vw,96px)] w-[clamp(180px,26vw,320px)] -translate-x-1/2">
          <Image
            src="/odd-planet-lockup.png"
            alt="Odd Planet"
            fill
            priority
            sizes="(max-width: 1230px) 26vw, 320px"
            className="object-contain"
          />
        </Reveal>

        {/* Layer B — planet limb */}
        <svg
          viewBox="0 0 1200 420"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 z-2 block h-[92%] w-[150%] -translate-x-1/2 max-[700px]:w-[220%]"
        >
          <defs>
            <linearGradient id="opLimb" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#2D45F0" stopOpacity="0" />
              <stop offset="0.24" stopColor="#5A6DFF" stopOpacity="0.65" />
              <stop offset="0.5" stopColor="#F2F4FF" stopOpacity="1" />
              <stop offset="0.76" stopColor="#5A6DFF" stopOpacity="0.65" />
              <stop offset="1" stopColor="#2D45F0" stopOpacity="0" />
            </linearGradient>
            <filter id="opBloom" x="-20%" y="-320%" width="140%" height="740%">
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </defs>
          <circle
            cx="600"
            cy="980"
            r="820"
            fill="none"
            stroke="url(#opLimb)"
            strokeWidth="46"
            filter="url(#opBloom)"
            opacity="0.62"
          />
          <circle
            cx="600"
            cy="980"
            r="820"
            fill="none"
            stroke="url(#opLimb)"
            strokeWidth="4.5"
          />
        </svg>
      </div>

      {/* Layer C — bottom dissolve into the stat band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-[34%] bg-[linear-gradient(to_bottom,rgba(5,6,10,0)_0%,rgba(5,6,10,0.18)_44%,rgba(5,6,10,0.62)_78%,#05060A_100%)]"
      />
    </section>
  );
}
