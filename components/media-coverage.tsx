"use client";

import { usePinnedTrack } from "@/hooks/use-pinned-track";
import { press, type PressItem } from "@/lib/content";

function Card({ item }: { item: PressItem }) {
  const Tag = item.href ? "a" : "div";

  return (
    <Tag
      {...(item.href
        ? { href: item.href, target: "_blank", rel: "noopener" }
        : {})}
      data-work-card
      className="group flex w-[clamp(258px,23vw,336px)] shrink-0 flex-col overflow-hidden rounded-lg border border-ink-300 text-ink-900 transition-[border-color] duration-[320ms] ease-out hover:border-blue-500 hover:text-ink-900"
    >
      {/* Near-portrait and centred. Some of these are portrait posters, and a
          shallow landscape box cropped the subject clean off the bottom. */}
      <div className="relative aspect-[5/6] shrink-0 overflow-hidden border-b border-ink-300 bg-ink-100">
        {item.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.preview.src}
            alt=""
            loading="lazy"
            className="block size-full object-cover object-center transition-transform duration-[600ms] ease-brand group-hover:scale-[1.055]"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase text-ink-500">
              {item.outlet}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-[clamp(16px,1.6vw,22px)]">
        <div className="flex items-center gap-2.5 font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase">
          <span className="truncate text-blue-400">{item.outlet}</span>
          <span className="shrink-0 text-ink-550">{item.year}</span>
        </div>

        <h3 className="m-0 font-grotesk text-[clamp(14px,1.15vw,17px)] leading-[1.35] font-semibold tracking-[-0.01em] text-ink-900 [text-wrap:pretty]">
          {item.headline}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-300 pt-3.5">
          <span className="font-mono text-[10px] leading-none font-medium tracking-[0.12em] uppercase text-ink-600">
            {item.context}
          </span>
          <span
            aria-hidden="true"
            className="font-grotesk text-base leading-none text-ink-550 transition-[transform,color] duration-[250ms] ease-out group-hover:translate-x-[5px] group-hover:text-blue-400"
          >
            {item.href ? "→" : ""}
          </span>
        </div>
      </div>
    </Tag>
  );
}

/**
 * Scroll-driven horizontal rail, on the same mechanic as Our Work: vertical
 * scroll converts to horizontal travel while the frame is pinned, and it
 * unpins into a native snap rail below 700px.
 */
export function MediaCoverage() {
  const { sectionRef, innerRef, scrollerRef, trackRef, barRef, countRef } =
    usePinnedTrack(press.length);

  return (
    <section id="media" ref={sectionRef} className="relative">
      <div
        ref={innerRef}
        className="sticky top-0 flex h-screen min-h-[min(600px,100vh)] flex-col overflow-hidden pt-[clamp(26px,4vw,54px)] pb-[clamp(22px,3vw,38px)]"
      >
        <div className="mx-auto flex w-full max-w-[1400px] shrink-0 flex-wrap items-end justify-between gap-x-10 gap-y-3.5 px-gutter">
          <div>
            <div className="op-eyebrow mb-[18px]">Media coverage</div>
            <h2 className="op-h2 text-h2-work">
              Recognised by <em>industry leaders</em>
            </h2>
          </div>
          <div className="op-meta leading-[1.6]">Scroll to advance →</div>
        </div>

        <div className="mt-[clamp(18px,2.6vw,32px)] flex flex-1 items-center overflow-hidden">
          <div ref={scrollerRef} className="flex w-full items-center overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-stretch gap-[clamp(12px,1.4vw,20px)] px-gutter will-change-transform"
            >
              {press.map((item) => (
                <Card key={item.headline} item={item} />
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
              01 / {String(press.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
