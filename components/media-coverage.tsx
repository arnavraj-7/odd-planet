import { Reveal, RevealGroup } from "@/components/reveal";
import { press, type PressItem } from "@/lib/content";

const CARD =
  "group flex h-full flex-col overflow-hidden rounded-lg border border-ink-300 transition-[border-color,transform] duration-[320ms] ease-out hover:border-blue-500";

function Media({ item }: { item: PressItem }) {
  return (
    <div className="relative h-[clamp(150px,13vw,190px)] shrink-0 overflow-hidden border-b border-ink-300 bg-ink-100">
      {item.preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.preview.src}
          alt=""
          loading="lazy"
          className="block size-full object-cover object-top transition-transform duration-[600ms] ease-brand group-hover:scale-[1.055]"
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <span className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase text-ink-500">
            {item.outlet}
          </span>
        </div>
      )}
      <span className="absolute top-3.5 left-3.5 rounded-full bg-[rgba(5,6,10,0.66)] px-2.5 py-[7px] font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-blue-100 backdrop-blur-[6px]">
        {item.year}
      </span>
    </div>
  );
}

function Body({ item }: { item: PressItem }) {
  return (
    <div className="flex flex-1 flex-col gap-3.5 p-[clamp(16px,1.6vw,22px)]">
      <div className="font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-blue-400">
        {item.outlet}
      </div>

      <h3 className="m-0 font-grotesk text-[clamp(15px,1.25vw,18px)] leading-[1.35] font-semibold tracking-[-0.01em] text-ink-900 [text-wrap:pretty]">
        {item.headline}
      </h3>

      {item.stats ? (
        <div className="mt-auto flex gap-5 pt-1">
          {item.stats.map((stat) => (
            <span key={stat.label}>
              <span className="block font-grotesk text-lg leading-none font-extrabold tracking-[-0.03em] text-ink-900">
                {stat.value}
              </span>
              <span className="mt-1.5 block font-mono text-[10px] leading-none font-medium tracking-[0.12em] uppercase text-ink-600">
                {stat.label}
              </span>
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-300 pt-3.5">
          <span className="font-mono text-[10px] leading-none font-medium tracking-[0.12em] uppercase text-ink-600">
            {item.context}
          </span>
          <span
            aria-hidden="true"
            className="font-grotesk text-base leading-none text-ink-550 transition-[transform,color] duration-[250ms] ease-out group-hover:translate-x-[5px] group-hover:text-blue-400"
          >
            →
          </span>
        </div>
      )}
    </div>
  );
}

export function MediaCoverage() {
  return (
    <section id="media" className="mx-auto max-w-[1400px] px-gutter py-section">
      <Reveal className="mb-[clamp(28px,4vw,52px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-[18px]">
        <div>
          <div className="op-eyebrow mb-5">Media coverage</div>
          <h2 className="op-h2">
            Recognised by <em>industry leaders</em>
          </h2>
        </div>
        <div className="max-w-[34ch] font-grotesk text-sm leading-[1.6] text-ink-600">
          Coverage across national press, industry publications and enterprise
          brand campaigns.
        </div>
      </Reveal>

      {/* Laid out across rather than stacked — four cards, each carrying its
          own artwork instead of a hover-up preview. */}
      <RevealGroup className="grid grid-cols-4 items-stretch gap-[clamp(12px,1.4vw,20px)] max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
        {press.map((item) =>
          item.href ? (
            <a
              key={item.headline}
              href={item.href}
              target="_blank"
              rel="noopener"
              className={`${CARD} text-ink-900 hover:text-ink-900`}
            >
              <Media item={item} />
              <Body item={item} />
            </a>
          ) : (
            <div key={item.headline} className={CARD}>
              <Media item={item} />
              <Body item={item} />
            </div>
          ),
        )}
      </RevealGroup>
    </section>
  );
}
