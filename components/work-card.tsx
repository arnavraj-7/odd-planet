import {
  Clapperboard,
  Lightbulb,
  Laugh,
  Megaphone,
  PartyPopper,
  ShoppingBag,
  TrendingUp,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import {
  disciplineLabels,
  type WorkCard as WorkCardData,
  type WorkDiscipline,
} from "@/lib/content";

const ICONS: Record<WorkDiscipline, LucideIcon> = {
  content: Clapperboard,
  influencer: Users,
  creator: Megaphone,
  amplification: TrendingUp,
  events: PartyPopper,
  meme: Laugh,
  ugc: Video,
  strategy: Lightbulb,
  onground: Users,
  buzz: Megaphone,
  commerce: ShoppingBag,
};

export function WorkCard({ card }: { card: WorkCardData }) {
  return (
    <article
      data-work-card
      className="group flex w-[clamp(292px,29vw,404px)] shrink-0 flex-col overflow-hidden rounded-xl border border-ink-300 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-blue-500"
    >
      {/*
        The artwork fills the box outright — no blurred backdrop behind it. The
        crop is anchored to the top so a poster keeps its masthead, which is the
        part that identifies the campaign.
      */}
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-ink-100">
        {card.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image.src}
            alt={card.image.alt}
            loading="lazy"
            className="block size-full object-cover object-top transition-transform duration-[600ms] ease-brand group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink-500">
              Image {card.index}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-[clamp(16px,1.7vw,22px)]">
        <div className="font-mono text-[10px] leading-none font-medium tracking-[0.16em] uppercase text-ink-550">
          {card.index} · {card.category}
        </div>

        <h3 className="mt-2 mb-0 font-serif text-[clamp(23px,2.1vw,29px)] leading-[1.05] font-normal tracking-[-0.02em] text-ink-900">
          {card.title}
        </h3>

        <p className="mt-1.5 mb-0 font-grotesk text-[clamp(14px,1.2vw,17px)] leading-[1.3] text-ink-600">
          {card.tagline}
        </p>

        <p className="mt-3 mb-0 line-clamp-2 font-grotesk text-[12.5px] leading-[1.5] text-ink-600 [text-wrap:pretty]">
          {card.description}
        </p>

        {card.did.length ? (
          <>
            <div className="mt-[clamp(14px,1.6vw,20px)] font-mono text-[10px] leading-none font-medium tracking-[0.16em] uppercase text-ink-550">
              What we did
            </div>
            <ul className="mt-3 mb-0 grid list-none grid-cols-4 gap-x-1.5 p-0">
              {card.did.slice(0, 4).map((key) => {
                const Icon = ICONS[key];
                return (
                  <li key={key} className="flex flex-col items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-ink-100 text-ink-900">
                      <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="text-center font-grotesk text-[10.5px] leading-[1.25] text-ink-600">
                      {disciplineLabels[key]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}

        {card.metrics.length ? (
          <>
            <div className="mt-auto border-t border-ink-300 pt-[clamp(13px,1.5vw,18px)] font-mono text-[10px] leading-none font-medium tracking-[0.16em] uppercase text-ink-550">
              {card.resultsLabel ?? "Results"}
            </div>

            <div
              className={`mt-3 ${
                card.metrics.length > 2
                  ? "grid grid-cols-2 gap-x-3 gap-y-3.5"
                  : "flex items-stretch gap-3"
              }`}
            >
              {card.metrics.map((metric, i) => {
                const body = (
                  <>
                    <span className="block font-grotesk text-[clamp(17px,1.6vw,23px)] leading-[1.05] font-medium tracking-[-0.02em] text-ink-900">
                      {metric.value}
                    </span>
                    <span className="mt-1.5 block font-grotesk text-[10.5px] leading-[1.3] text-ink-900">
                      {metric.label}
                    </span>
                    {metric.note ? (
                      <span className="mt-1 block font-grotesk text-[10px] leading-[1.3] text-ink-550">
                        {metric.note}
                      </span>
                    ) : null}
                  </>
                );

                return (
                  <div
                    key={metric.label}
                    className={`min-w-0 ${
                      card.metrics.length > 2
                        ? i % 2 === 1
                          ? "border-l border-ink-300 pl-3"
                          : ""
                        : `flex-1 ${i > 0 ? "border-l border-ink-300 pl-3" : ""}`
                    }`}
                  >
                    {metric.href ? (
                      <a
                        href={metric.href}
                        target="_blank"
                        rel="noopener"
                        className="block text-ink-900 hover:text-ink-900"
                      >
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
