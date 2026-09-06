import {
  Clapperboard,
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
  commerce: ShoppingBag,
};

export function WorkCard({ card }: { card: WorkCardData }) {
  return (
    <article
      data-work-card
      className="group flex w-[clamp(292px,29vw,404px)] shrink-0 flex-col overflow-hidden rounded-xl border border-ink-300 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-blue-500"
    >
      {/*
        These creatives mix 16:9 stills with 9:16 reel frames, so the artwork is
        contained whole over a blurred copy of itself — one shared landscape box
        would cut the posters apart.
      */}
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-ink-100">
        {card.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full scale-110 object-cover opacity-40 blur-[18px]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[rgba(5,6,10,0.3)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              alt={card.image.alt}
              loading="lazy"
              className="relative block size-full object-contain transition-transform duration-[600ms] ease-brand group-hover:scale-[1.04]"
            />
          </>
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink-500">
              Image {card.index}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-[clamp(18px,1.9vw,26px)]">
        <div className="font-mono text-[10px] leading-none font-medium tracking-[0.16em] uppercase text-ink-550">
          {card.index} · {card.category}
        </div>

        <h3 className="mt-3 mb-0 font-serif text-[clamp(26px,2.4vw,34px)] leading-[1.05] font-normal tracking-[-0.02em] text-ink-900">
          {card.title}
        </h3>

        <p className="mt-1.5 mb-0 font-grotesk text-[clamp(15px,1.35vw,19px)] leading-[1.3] text-ink-600">
          {card.tagline}
        </p>

        <p className="mt-3.5 mb-0 font-grotesk text-[13px] leading-[1.55] text-ink-600 [text-wrap:pretty]">
          {card.description}
        </p>

        {card.did.length ? (
          <>
            <div className="mt-[clamp(18px,2vw,26px)] font-mono text-[10px] leading-none font-medium tracking-[0.16em] uppercase text-ink-550">
              What we did
            </div>
            <ul className="mt-3.5 mb-0 flex list-none flex-wrap gap-x-5 gap-y-4 p-0">
              {card.did.map((key) => {
                const Icon = ICONS[key];
                return (
                  <li key={key} className="flex w-[74px] flex-col items-center gap-2">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-ink-100 text-ink-900">
                      <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="text-center font-grotesk text-[11px] leading-[1.25] text-ink-600">
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
            <div className="mt-[clamp(18px,2vw,26px)] border-t border-ink-300 pt-[clamp(16px,1.8vw,22px)] font-mono text-[10px] leading-none font-medium tracking-[0.16em] uppercase text-ink-550">
              {card.resultsLabel ?? "Results"}
            </div>

            <div className="mt-4 flex items-stretch gap-4">
              {card.metrics.map((metric, i) => {
                const body = (
                  <>
                    <span className="block font-grotesk text-[clamp(19px,1.9vw,26px)] leading-none font-medium tracking-[-0.02em] text-ink-900">
                      {metric.value}
                    </span>
                    <span className="mt-2 block font-grotesk text-[11px] leading-[1.35] text-ink-600">
                      {metric.label}
                    </span>
                  </>
                );

                return (
                  <div
                    key={metric.label}
                    className={`min-w-0 flex-1 ${i > 0 ? "border-l border-ink-300 pl-4" : ""}`}
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
