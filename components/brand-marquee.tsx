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
    // Sits directly under the hero, so it carries the tuck-up into the hero
    // fade and the continuation glow behind its top edge.
    <section className="relative z-6 -mt-gutter overflow-hidden pt-[clamp(30px,4.4vw,56px)] pb-[clamp(30px,4.4vw,58px)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-140px] h-[200px] bg-[radial-gradient(72%_100%_at_50%_0%,rgba(45,69,240,0.14)_0%,rgba(45,69,240,0.04)_46%,rgba(5,6,10,0)_78%)]"
      />
      <div className="relative mx-auto mb-[22px] max-w-[1400px] px-gutter font-mono text-[11px] leading-none font-medium tracking-[0.18em] uppercase text-ink-550">
        Selected brand partners
      </div>

      <MarqueeTrack>
        <LogoRow />
        <LogoRow hidden />
      </MarqueeTrack>
    </section>
  );
}
