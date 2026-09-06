import { HeroMarquee } from "@/components/hero-marquee";
import { Reveal } from "@/components/reveal";
import { RibbonField } from "@/components/ribbon-field";
import { hero } from "@/lib/content";

const HERO_MASK =
  "radial-gradient(74% 56% at 50% 44%, #000 0%, rgba(0,0,0,0.42) 40%, rgba(0,0,0,0) 68%)";

export function Hero() {
  return (
    // Clipped horizontally only — the gradient field has to reach up behind the
    // transparent header, or the header cuts a hard seam across it.
    <section id="home" className="relative overflow-x-clip">
      {/* Animated ribbon gradient field, on a slow breathing cycle */}
      <RibbonField
        mask={HERO_MASK}
        className="absolute top-[-24%] left-[-14%] block h-[112%] w-[128%] animate-breathe mix-blend-screen"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-var(--op-header))] max-w-[1400px] grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] items-center gap-[clamp(28px,4vw,72px)] px-gutter py-[clamp(24px,4vh,56px)] max-[900px]:grid-cols-1 max-[900px]:gap-[clamp(24px,4vh,40px)]">
        <div>
          <Reveal as="p" className="op-eyebrow m-0 mb-[clamp(18px,2.4vw,28px)]">
            {hero.eyebrow}
          </Reveal>

          <Reveal as="h1" className="m-0 text-ink-900">
            {hero.lines.map((line) => (
              <span
                key={line}
                className="block font-grotesk text-hero-caps leading-[0.94] font-extrabold tracking-[-0.04em]"
              >
                {line}
              </span>
            ))}
            <span className="block font-grotesk text-hero-caps leading-[0.98] font-extrabold tracking-[-0.04em] text-blue-400">
              {hero.accentLine}
            </span>
          </Reveal>

          <Reveal
            as="p"
            className="mt-[clamp(18px,2.2vw,26px)] mb-0 font-grotesk text-[clamp(11px,0.95vw,13px)] leading-[1.5] tracking-[0.01em] text-ink-550 [text-wrap:pretty]"
          >
            {hero.disciplines}
          </Reveal>

          <Reveal
            as="p"
            className="mt-3 mb-0 max-w-[52ch] font-grotesk text-hero-body leading-[1.6] text-ink-600 [text-wrap:pretty]"
          >
            {hero.body}
          </Reveal>

          <Reveal className="mt-[clamp(26px,3.4vw,40px)] flex flex-wrap items-center gap-3 max-[520px]:gap-2.5 max-[520px]:[&_a]:px-5 max-[520px]:[&_a]:py-3.5 max-[520px]:[&_a]:text-[13px]">
            <a href={hero.primaryCta.href} className="op-btn group gap-2.5 text-white">
              {hero.primaryCta.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-[240ms] ease-out group-hover:translate-x-[3px]"
              >
                →
              </span>
            </a>
            <span className="op-rim">
              <a
                href={hero.secondaryCta.href}
                className="op-rim-inner group gap-2.5"
              >
                {hero.secondaryCta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-[240ms] ease-out group-hover:translate-x-[3px]"
                >
                  →
                </span>
              </a>
            </span>
          </Reveal>
        </div>

        <Reveal>
          <HeroMarquee />
        </Reveal>
      </div>

      {/* Bottom dissolve into the marquee band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-[22%] bg-[linear-gradient(to_bottom,rgba(5,6,10,0)_0%,rgba(5,6,10,0.28)_52%,rgba(5,6,10,0.72)_80%,#05060A_100%)]"
      />
    </section>
  );
}
