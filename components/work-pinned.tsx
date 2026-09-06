"use client";

import { usePinnedTrack } from "@/hooks/use-pinned-track";
import { work } from "@/lib/content";

const MEDIA_HEIGHT = "h-[clamp(140px,19vh,208px)]";

export function WorkPinned() {
  const { sectionRef, innerRef, scrollerRef, trackRef, barRef, countRef } =
    usePinnedTrack(work.length);

  return (
    <section id="work" ref={sectionRef} className="relative">
      <div
        ref={innerRef}
        className="sticky top-0 flex h-screen min-h-[min(600px,100vh)] flex-col overflow-hidden pt-[clamp(26px,4vw,54px)] pb-[clamp(22px,3vw,38px)]"
      >
        <div className="mx-auto flex w-full max-w-[1400px] shrink-0 flex-wrap items-end justify-between gap-x-10 gap-y-3.5 px-gutter">
          <div>
            <div className="op-eyebrow mb-[18px]">Selected work</div>
            <h2 className="op-h2 text-h2-work">
              Campaigns that <em>travelled</em>
            </h2>
          </div>
          <div className="op-meta leading-[1.6]">Scroll to advance →</div>
        </div>

        <div className="mt-[clamp(18px,2.6vw,32px)] flex flex-1 items-center overflow-hidden">
          <div
            ref={scrollerRef}
            className="flex w-full items-center overflow-hidden"
          >
            <div
              ref={trackRef}
              className="flex gap-[clamp(12px,1.4vw,20px)] px-gutter will-change-transform"
            >
              {work.map((card) => (
                <article
                  key={card.index}
                  data-work-card
                  className="group flex shrink-0 basis-[clamp(258px,25vw,368px)] flex-col overflow-hidden rounded-lg border border-ink-300 transition-[border-color] duration-300 ease-out hover:border-blue-500"
                >
                  <div className="relative overflow-hidden">
                    {card.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.image.src}
                        alt={card.image.alt}
                        className={`block w-full ${MEDIA_HEIGHT} ${
                          card.variant === "logo"
                            ? "object-contain p-10 opacity-85 brightness-0 invert"
                            : "object-cover transition-transform duration-[600ms] ease-brand group-hover:scale-[1.055]"
                        }`}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className={`flex w-full items-center justify-center border-b border-ink-300 bg-ink-100 ${MEDIA_HEIGHT}`}
                      >
                        <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink-500">
                          Image {card.index}
                        </span>
                      </div>
                    )}

                    <span className="absolute top-3.5 left-3.5 rounded-full bg-[rgba(5,6,10,0.66)] px-2.5 py-[7px] font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-blue-100 backdrop-blur-[6px]">
                      {card.index} · {card.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-[clamp(18px,2vw,24px)]">
                    <div>
                      <h3 className="mt-0 mb-2 font-serif text-[26px] leading-[1.06] font-normal tracking-[-0.02em] text-ink-900">
                        {card.title}
                      </h3>
                      <p className="m-0 font-grotesk text-sm leading-[1.5] text-ink-600">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-auto font-mono text-[11px] leading-none font-medium tracking-[0.06em]">
                      {card.metrics.map((metric) =>
                        metric.href ? (
                          <a
                            key={metric.label}
                            href={metric.href}
                            target="_blank"
                            rel="noopener"
                            className="op-metric-row text-blue-200"
                          >
                            <span>{metric.label}</span>
                            <span className="!text-blue-200">
                              {metric.value} →
                            </span>
                          </a>
                        ) : (
                          <div key={metric.label} className="op-metric-row">
                            <span>{metric.label}</span>
                            <span>{metric.value}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1400px] shrink-0 items-center gap-[18px] px-gutter">
          <div className="h-px flex-1 overflow-hidden bg-ink-300">
            <div
              ref={barRef}
              className="h-full w-[6%] bg-[linear-gradient(90deg,#2D45F0,#A9B4FF)]"
            />
          </div>
          <div className="op-meta tracking-[0.12em]">
            <span ref={countRef}>
              01 / {String(work.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
