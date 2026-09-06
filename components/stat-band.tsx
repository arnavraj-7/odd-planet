import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/content";

export function StatBand() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-gutter">
      {/*
        The band arrives as one solid object — frame, ground and the 1px gap
        that forms the dividers all together. The cells themselves are never
        transparent, so the divider colour behind them can never flash through;
        only the figures inside stagger in.
      */}
      <Reveal className="relative grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-px overflow-hidden rounded-lg border border-ink-300 bg-ink-300">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-ink-000 p-[clamp(22px,2.6vw,34px)]"
          >
            <Reveal delay={120 + i * 90}>
              <div className="font-grotesk text-stat leading-none font-extrabold tracking-[-0.04em] tabular-nums text-ink-900">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-3.5 font-mono text-[11px] leading-[1.4] font-medium tracking-[0.12em] uppercase text-ink-600">
                {stat.label}
              </div>
            </Reveal>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
