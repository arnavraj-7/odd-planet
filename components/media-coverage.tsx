import { LinkPreview } from "@/components/link-preview";
import { Reveal, RevealGroup } from "@/components/reveal";
import { press, type PressItem } from "@/lib/content";

const ROW =
  "group grid grid-cols-[76px_minmax(0,1fr)_auto_34px] items-center gap-[clamp(14px,2.4vw,34px)] border-t border-ink-300 px-[clamp(10px,1.4vw,18px)] py-[clamp(22px,2.8vw,34px)] transition-[background] duration-[250ms] ease-out max-[760px]:grid-cols-[52px_minmax(0,1fr)] max-[760px]:items-start max-[760px]:gap-y-2.5";

function RowBody({ item }: { item: PressItem }) {
  return (
    <>
      <span className="font-mono text-[11px] leading-none font-medium tracking-[0.1em] text-ink-550">
        {item.year}
      </span>

      <span>
        <span className="mb-3 block font-mono text-[11px] leading-none font-medium tracking-[0.14em] uppercase text-blue-400">
          {item.outlet}
        </span>
        <span className="block font-grotesk text-press leading-[1.3] font-semibold tracking-[-0.02em] text-ink-900 [text-wrap:pretty]">
          {item.headline}
        </span>
      </span>

      {item.stats ? (
        <span className="flex gap-[22px] font-grotesk whitespace-nowrap max-[760px]:col-start-2">
          {item.stats.map((stat) => (
            <span key={stat.label}>
              <span className="block text-xl leading-none font-extrabold tracking-[-0.03em] text-ink-900">
                {stat.value}
              </span>
              <span className="mt-2 block font-mono text-[10px] leading-none font-medium tracking-[0.12em] uppercase text-ink-600">
                {stat.label}
              </span>
            </span>
          ))}
        </span>
      ) : (
        <span className="font-mono text-[11px] leading-none font-medium tracking-[0.1em] whitespace-nowrap uppercase text-ink-600 max-[760px]:col-start-2">
          {item.context}
        </span>
      )}

      {item.href ? (
        <span
          aria-hidden="true"
          className="justify-self-end font-grotesk text-xl leading-none text-ink-550 transition-[transform,color] duration-[250ms] ease-out group-hover:translate-x-[7px] group-hover:text-blue-400 max-[760px]:hidden"
        >
          →
        </span>
      ) : (
        <span className="max-[760px]:hidden" />
      )}
    </>
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

      <LinkPreview>
        <RevealGroup>
          {press.map((item, i) =>
          item.href ? (
            <a
              key={item.headline}
              href={item.href}
              target="_blank"
              rel="noopener"
              data-preview-label={item.outlet}
              data-preview-src={item.preview?.src}
              className={`${ROW} text-ink-900 hover:bg-ink-100 hover:text-ink-900 ${
                i === press.length - 1 ? "border-b" : ""
              }`}
            >
              <RowBody item={item} />
            </a>
          ) : (
            <div
              key={item.headline}
              className={`${ROW} ${i === press.length - 1 ? "border-b" : ""}`}
            >
              <RowBody item={item} />
            </div>
            ),
          )}
        </RevealGroup>
      </LinkPreview>
    </section>
  );
}
