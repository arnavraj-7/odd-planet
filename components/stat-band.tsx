import { CountUp } from "@/components/count-up";
import { RevealGroup } from "@/components/reveal";
import { stats } from "@/lib/content";

export function StatBand() {
  return (
    <section className="relative z-6 mx-auto -mt-gutter max-w-[1400px] px-gutter">
      {/* Continuation of the hero glow, behind the band's top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-140px] h-[200px] bg-[radial-gradient(72%_100%_at_50%_0%,rgba(45,69,240,0.14)_0%,rgba(45,69,240,0.04)_46%,rgba(5,6,10,0)_78%)]"
      />

      {/* The 1px gap is the divider. */}
      <RevealGroup className="relative grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-px overflow-hidden rounded-lg border border-ink-300 bg-ink-300">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-ink-000 p-[clamp(22px,2.6vw,34px)]"
          >
            <div className="font-grotesk text-stat leading-none font-extrabold tracking-[-0.04em] tabular-nums text-ink-900">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-3.5 font-mono text-[11px] leading-[1.4] font-medium tracking-[0.12em] uppercase text-ink-600">
              {stat.label}
            </div>
          </div>
        ))}
      </RevealGroup>
    </section>
  );
}
