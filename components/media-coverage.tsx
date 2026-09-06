import { Reveal, RevealGroup } from "@/components/reveal";
import { press, type PressItem } from "@/lib/content";

const years = press.map((p) => Number(p.year)).filter(Boolean);
const RANGE = `${Math.min(...years)}–${Math.max(...years)}`;

/**
 * One lead story, then the rest as a hairline list.
 *
 * The flat four-up grid forced every image through the same landscape box,
 * which sliced the heads off the two portrait posters. The lead runs at the
 * artwork's own 16:9 and the rest use square thumbnails, where a top crop of a
 * poster still keeps the masthead — the part a reader recognises.
 */
export function MediaCoverage() {
  const [lead, ...rest] = press;

  return (
    <section id="media" className="mx-auto max-w-[1400px] px-gutter py-section">
      <Reveal className="mb-[clamp(28px,4vw,52px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-[18px]">
        <div>
          <div className="op-eyebrow mb-5">Media coverage</div>
          <h2 className="op-h2">
            Recognised by <em>industry leaders</em>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="max-w-[34ch] font-grotesk text-sm leading-[1.6] text-ink-600">
            Coverage across national press, industry publications and enterprise
            brand campaigns.
          </div>
          <div className="op-meta">
            {String(press.length).padStart(2, "0")} features · {RANGE}
          </div>
        </div>
      </Reveal>

      <RevealGroup className="grid grid-cols-[1.08fr_1fr] items-start gap-[clamp(14px,1.8vw,28px)] max-[1000px]:grid-cols-1">
        <LeadStory item={lead} />

        <div className="flex flex-col">
          {rest.map((item, i) => (
            <Row key={item.headline} item={item} last={i === rest.length - 1} />
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}

function LeadStory({ item }: { item: PressItem }) {
  const Tag = item.href ? "a" : "div";

  return (
    <Tag
      {...(item.href
        ? { href: item.href, target: "_blank", rel: "noopener" }
        : {})}
      className="group flex flex-col overflow-hidden rounded-lg border border-ink-300 text-ink-900 transition-[border-color] duration-[320ms] ease-out hover:border-blue-500 hover:text-ink-900"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-ink-100">
        {item.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.preview.src}
            alt=""
            className="block size-full object-cover transition-transform duration-[600ms] ease-brand group-hover:scale-[1.055]"
          />
        ) : null}
        <span className="absolute top-4 left-4 rounded-full bg-[rgba(5,6,10,0.72)] px-3 py-2 font-mono text-[10px] leading-none font-medium tracking-[0.16em] uppercase text-blue-100 backdrop-blur-[6px]">
          Latest feature
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-[clamp(20px,2.2vw,32px)]">
        <div className="flex items-center gap-3 font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase">
          <span className="text-blue-400">{item.outlet}</span>
          <span className="text-ink-550">{item.year}</span>
        </div>

        <h3 className="m-0 font-serif text-[clamp(24px,2.5vw,36px)] leading-[1.12] font-normal tracking-[-0.02em] text-ink-900 [text-wrap:pretty]">
          {item.headline}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink-300 pt-4">
          <span className="font-mono text-[10px] leading-none font-medium tracking-[0.12em] uppercase text-ink-600">
            {item.context}
          </span>
          <span className="flex items-center gap-2.5 font-grotesk text-[13px] leading-none font-semibold text-blue-200">
            Read the piece
            <span
              aria-hidden="true"
              className="transition-transform duration-[250ms] ease-out group-hover:translate-x-[5px]"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Tag>
  );
}

function Row({ item, last }: { item: PressItem; last: boolean }) {
  const Tag = item.href ? "a" : "div";

  return (
    <Tag
      {...(item.href
        ? { href: item.href, target: "_blank", rel: "noopener" }
        : {})}
      className={`group flex flex-1 items-center gap-[clamp(14px,1.6vw,22px)] border-t border-ink-300 px-2 py-[clamp(16px,1.8vw,24px)] text-ink-900 transition-[background] duration-[250ms] ease-out hover:bg-ink-100 hover:text-ink-900 ${
        last ? "border-b" : ""
      }`}
    >
      <div className="size-[clamp(64px,6vw,86px)] shrink-0 overflow-hidden rounded-md border border-ink-300 bg-ink-100">
        {item.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.preview.src}
            alt=""
            loading="lazy"
            className="block size-full object-cover object-top transition-transform duration-[600ms] ease-brand group-hover:scale-[1.08]"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="font-mono text-[9px] leading-none font-medium tracking-[0.14em] text-ink-500">
              {item.year}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2.5 font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase">
          <span className="truncate text-blue-400">{item.outlet}</span>
          <span className="shrink-0 text-ink-550">{item.year}</span>
        </div>

        <h3 className="m-0 font-grotesk text-[clamp(14px,1.15vw,17px)] leading-[1.35] font-semibold tracking-[-0.01em] text-ink-900 [text-wrap:pretty]">
          {item.headline}
        </h3>

        {item.stats ? (
          <div className="mt-2.5 flex gap-4">
            {item.stats.map((stat) => (
              <span
                key={stat.label}
                className="font-mono text-[10px] leading-none font-medium tracking-[0.1em] uppercase text-ink-600"
              >
                <span className="text-ink-900">{stat.value}</span> {stat.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <span
        aria-hidden="true"
        className="shrink-0 self-center font-grotesk text-lg leading-none text-ink-550 transition-[transform,color] duration-[250ms] ease-out group-hover:translate-x-[5px] group-hover:text-blue-400"
      >
        {item.href ? "→" : ""}
      </span>
    </Tag>
  );
}
