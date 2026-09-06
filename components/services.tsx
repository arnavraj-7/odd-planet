import { Reveal, RevealGroup } from "@/components/reveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1400px] px-gutter py-section">
      <div className="grid grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] items-start gap-[clamp(28px,5vw,80px)] max-[880px]:grid-cols-[minmax(0,1fr)] max-[880px]:gap-[clamp(26px,4vw,40px)]">
        <Reveal className="sticky top-30 max-[1024px]:top-24 max-[880px]:static">
          <div className="op-eyebrow mb-6">What we do</div>
          <h2 className="op-h2 text-h2-services leading-[0.96]">Services</h2>
          <div className="mt-4 font-mono text-[15px] leading-none text-ink-550">
            ({services.length})
          </div>
          <p className="mt-[clamp(24px,3vw,40px)] max-w-[34ch] font-grotesk text-[15px] leading-[1.65] text-ink-600 [text-wrap:pretty]">
            Four pillars, delivered as standalone engagements or as one
            integrated programme under a single team.
          </p>
          <a
            href="#contact"
            className="mt-[clamp(22px,3vw,34px)] inline-flex items-center gap-2.5 font-grotesk text-[13px] leading-none font-semibold text-blue-200"
          >
            Request capabilities deck →
          </a>
        </Reveal>

        <RevealGroup>
          {services.map((service, i) => (
            <div
              key={service.index}
              className={`group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-[clamp(16px,3vw,44px)] border-t border-ink-300 px-[clamp(6px,1vw,14px)] py-[clamp(24px,3vw,40px)] transition-[background] duration-[250ms] ease-out hover:bg-ink-100 max-[760px]:grid-cols-[minmax(0,1fr)] max-[760px]:gap-y-4 ${
                i === services.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="grid grid-cols-[46px_minmax(0,1fr)] gap-[clamp(12px,2vw,26px)] max-[640px]:grid-cols-[32px_minmax(0,1fr)]">
                <span className="pt-2.5 font-mono text-xs leading-[1.5] font-medium text-ink-550">
                  {service.index}
                </span>
                <div>
                  <h3 className="mt-0 mb-3.5 font-serif text-service leading-[1.02] font-normal tracking-[-0.02em] text-ink-900">
                    {service.name}
                  </h3>
                  <p className="mt-0 mb-[18px] max-w-[46ch] font-grotesk text-[15px] leading-[1.6] text-ink-600 [text-wrap:pretty]">
                    {service.description}
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-[9px] p-0">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-baseline gap-[11px] font-grotesk text-sm leading-[1.45] text-ink-600"
                      >
                        <span
                          aria-hidden="true"
                          className="text-[11px] leading-[1.6] text-blue-500"
                        >
                          ◆
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 font-mono text-[11px] leading-none font-medium tracking-[0.12em] whitespace-nowrap uppercase text-ink-600 max-[760px]:pt-0 max-[760px]:pl-[58px] max-[640px]:pl-[44px]">
                {service.model}
                <span
                  aria-hidden="true"
                  className="text-ink-550 transition-[transform,color] duration-[250ms] ease-out group-hover:translate-x-[7px] group-hover:text-blue-400"
                >
                  →
                </span>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
