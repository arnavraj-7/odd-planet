"use client";

import { WorkCard } from "@/components/work-card";
import { usePinnedTrack } from "@/hooks/use-pinned-track";
import { work } from "@/lib/content";

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
            <div className="op-eyebrow mb-[18px]">Our work</div>
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
                <WorkCard key={card.index} card={card} />
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
