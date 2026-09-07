import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatBand } from "@/components/stat-band";
import { founder } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Odd Planet",
  description:
    "Odd Planet is an influencer, content and amplification partner in New Delhi, working with brands and government organisations since 2023.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Opening statement */}
        <section className="mx-auto max-w-[1400px] px-gutter pt-[clamp(40px,6vw,88px)] pb-section">
          <Reveal as="p" className="op-eyebrow m-0 mb-[clamp(18px,2.4vw,28px)]">
            About us
          </Reveal>

          <Reveal as="h1" className="m-0 text-ink-900">
            <span className="block font-grotesk text-[clamp(32px,5vw,72px)] leading-[0.98] font-extrabold tracking-[-0.03em]">
              WE BUILD ATTENTION
            </span>
            <span className="block font-grotesk text-[clamp(32px,5vw,72px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-blue-400">
              THAT COMPOUNDS.
            </span>
          </Reveal>

          <div className="mt-[clamp(28px,4vw,52px)] grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[clamp(24px,4vw,72px)] max-[860px]:grid-cols-1">
            <Reveal
              as="p"
              className="m-0 font-grotesk text-[clamp(16px,1.5vw,20px)] leading-[1.55] text-ink-900 [text-wrap:pretty]"
            >
              Odd Planet is an influencer, content and amplification partner
              based in New Delhi, built for brands that want to be impossible
              to ignore.
            </Reveal>

            <Reveal className="flex flex-col gap-4 font-grotesk text-[15px] leading-[1.65] text-ink-600 [text-wrap:pretty]">
              <p className="m-0">
                From creators and celebrities to content, digital campaigns and
                culture-led ideas, we bring the right people, platforms and
                execution together under one team.
              </p>
              <p className="m-0">
                Because attention is only valuable when it moves people — and
                keeps moving.
              </p>
            </Reveal>
          </div>
        </section>

        {/* The numbers */}
        <section className="pb-section">
          <StatBand />
        </section>

        {/* Founder */}
        <section className="mx-auto max-w-[1400px] px-gutter pb-section">
          <Reveal className="rounded-lg border border-ink-300 p-[clamp(22px,3vw,44px)]">
            <div className="grid grid-cols-[minmax(0,0.24fr)_minmax(0,1fr)] items-center gap-[clamp(24px,4vw,52px)] max-[760px]:grid-cols-1">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-ink-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="block size-full object-cover object-top"
                />
              </div>

              <div>
                <div className="op-eyebrow mb-5">Founder</div>
                <h2 className="op-h2 mb-1">{founder.name}</h2>
                <div className="font-mono text-[10px] leading-[1.4] font-medium tracking-[0.14em] uppercase text-ink-600">
                  {founder.title}
                </div>
                <div className="mt-2 font-mono text-[10px] leading-[1.4] font-medium tracking-[0.14em] uppercase text-ink-550">
                  {founder.previously}
                </div>

                <div className="mt-6 flex items-center gap-2.5">
                  {founder.instagram ? (
                    <a
                      href={founder.instagram}
                      target="_blank"
                      rel="noopener"
                      className="rounded-full border border-ink-400 px-4 py-2.5 font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-ink-600 transition-[color,border-color] duration-200 ease-out hover:border-blue-500 hover:text-ink-900"
                    >
                      Instagram
                    </a>
                  ) : null}
                  {founder.linkedin ? (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener"
                      className="rounded-full border border-ink-400 px-4 py-2.5 font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-ink-600 transition-[color,border-color] duration-200 ease-out hover:border-blue-500 hover:text-ink-900"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {/* His own words, set under the portrait and running the full
                width of the card at every size. */}
            <p className="mt-[clamp(26px,3.4vw,44px)] mb-0 border-t border-ink-300 pt-[clamp(24px,3vw,38px)] font-grotesk text-[15px] leading-[1.65] text-ink-600 [text-wrap:pretty]">
              I started Odd Planet because I never liked doing marketing the
              usual way. Today, we build what people actually notice across
              creator marketing, entertainment, and brand strategy. We spend
              less time on rigid theory and more time navigating the messy,
              exciting reality between a great idea and its execution.
            </p>
          </Reveal>
        </section>

        {/* Close */}
        <section className="mx-auto max-w-[1400px] px-gutter pb-section">
          <Reveal className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-lg border border-ink-300 p-[clamp(24px,3.4vw,52px)]">
            <div>
              <h2 className="op-h2 mb-3">
                Got something <em>worth talking about</em>?
              </h2>
              <p className="m-0 max-w-[46ch] font-grotesk text-[15px] leading-[1.6] text-ink-600">
                Share the brief and we will come back with a plan, a creator
                roster and a cost.
              </p>
            </div>
            <Link href="/#contact" className="op-btn group gap-2.5 text-white">
              Start a brief
              <span
                aria-hidden="true"
                className="transition-transform duration-[240ms] ease-out group-hover:translate-x-[3px]"
              >
                →
              </span>
            </Link>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
