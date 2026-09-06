import { MarqueeTrack } from "@/components/marquee-track";
import { brands } from "@/lib/content";

/* Logos render silhouetted, so they only need to be single-colour art.
   They come from a placeholder host and have no known intrinsic size —
   a fixed height with auto width keeps them CLS-free until the client
   supplies SVGs. */
function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-center gap-[clamp(38px,5.4vw,84px)] pr-[clamp(38px,5.4vw,84px)]"
    >
      {brands.map((brand) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${brand.name}-${hidden ? "b" : "a"}`}
          src={brand.src}
          alt={hidden ? "" : brand.name}
          height={brand.height}
          style={{ height: brand.height }}
          className="w-auto opacity-[0.42] brightness-0 invert"
        />
      ))}
    </div>
  );
}

export function BrandMarquee() {
  return (
    <section className="overflow-hidden py-[clamp(34px,5vw,62px)]">
      <div className="mx-auto mb-[22px] max-w-[1400px] px-gutter font-mono text-[11px] leading-none font-medium tracking-[0.18em] uppercase text-ink-550">
        Selected brand partners
      </div>

      <MarqueeTrack>
        <LogoRow />
        <LogoRow hidden />
      </MarqueeTrack>
    </section>
  );
}
