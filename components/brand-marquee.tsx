import { MarqueeTrack } from "@/components/marquee-track";
import { brands } from "@/lib/content";

/* The client supplied these in colour, so each sits on a light plate: on the
   #05060A ground the black marks — MG, Converse, Michael Kors, Bevzilla,
   Allen Solly — would otherwise be invisible. The plate is the one place the
   brand kit's single-background rule gives way, and it is what the client's
   own reference site does. */
function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-center gap-[clamp(12px,1.3vw,20px)] pr-[clamp(12px,1.3vw,20px)]"
    >
      {brands.map((brand) => (
        <span
          key={`${brand.name}-${hidden ? "b" : "a"}`}
          className="flex h-[clamp(58px,5.6vw,76px)] w-[clamp(132px,12vw,168px)] shrink-0 items-center justify-center rounded-lg bg-ink-900 px-5 transition-transform duration-300 ease-out hover:scale-[1.04]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.src}
            alt={hidden ? "" : brand.name}
            loading="lazy"
            className="max-h-[clamp(26px,2.6vw,34px)] w-auto max-w-full object-contain"
          />
        </span>
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
