import { MarqueeTrack } from "@/components/marquee-track";
import { Reveal } from "@/components/reveal";
import { press, type PressItem } from "@/lib/content";

const years = press.map((p) => Number(p.year)).filter(Boolean);
const RANGE = `${Math.min(...years)}–${Math.max(...years)}`;

/**
 * A looping track needs enough cards to outrun the viewport; below that the
 * duplicate copy is on screen at the same time as the original and the whole
 * thing reads as repeated. With fewer, the rail simply sits still — and
 * becomes a marquee again on its own once the client adds more coverage.
 */
const LOOPS = press.length >= 5;

function Card({ item, hidden }: { item: PressItem; hidden?: boolean }) {
  const Tag = item.href ? "a" : "div";

  return (
    <Tag
      {...(item.href
        ? { href: item.href, target: "_blank", rel: "noopener" }
        : {})}
      {...(hidden ? { tabIndex: -1, "aria-hidden": true } : {})}
      className="group flex w-[clamp(272px,24vw,352px)] shrink-0 flex-col overflow-hidden rounded-lg border border-ink-300 text-ink-900 transition-[border-color] duration-[320ms] ease-out hover:border-blue-500 hover:text-ink-900"
    >
      {/* Near-portrait and centred. Two of these three are portrait posters —
          a shallow landscape box cropped the subject clean off the bottom,
          whatever the object-position. At 5:6 they lose only a sliver of width
          and keep their full height. */}
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
        <span className="absolute top-3.5 left-3.5 rounded-full bg-[rgba(5,6,10,0.7)] px-2.5 py-[7px] font-mono text-[10px] leading-none font-medium tracking-[0.14em] text-blue-100 backdrop-blur-[6px]">
          {item.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-[clamp(16px,1.6vw,22px)]">
        <div className="font-mono text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-blue-400">
          {item.outlet}
        </div>

        <h3 className="m-0 font-grotesk text-[clamp(15px,1.2vw,18px)] leading-[1.35] font-semibold tracking-[-0.01em] text-ink-900 [text-wrap:pretty]">
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

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-stretch gap-[clamp(12px,1.4vw,20px)] pr-[clamp(12px,1.4vw,20px)]"
    >
      {press.map((item) => (
        <Card key={`${item.headline}-${hidden ? "b" : "a"}`} item={item} hidden={hidden} />
      ))}
    </div>
  );
}

export function MediaCoverage() {
  return (
    <section id="media" className="overflow-hidden py-section">
      <Reveal className="mx-auto mb-[clamp(28px,4vw,52px)] flex max-w-[1400px] flex-wrap items-end justify-between gap-x-10 gap-y-[18px] px-gutter">
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

      {LOOPS ? (
        <div className="[mask-image:linear-gradient(to_right,transparent_0%,#000_6%,#000_94%,transparent_100%)]">
          <MarqueeTrack>
            <Row />
            <Row hidden />
          </MarqueeTrack>
        </div>
      ) : (
        // Swipeable where it does not fit, centred where it does.
        <div className="op-hide-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
          <div className="mx-auto flex w-max max-w-[1400px] items-stretch gap-[clamp(12px,1.4vw,20px)] px-gutter [&>*]:snap-start">
            {press.map((item) => (
              <Card key={item.headline} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
