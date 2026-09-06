import { Reveal, RevealGroup } from "@/components/reveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1400px] px-gutter py-section">
      <Reveal className="mb-[clamp(30px,4vw,56px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-[18px]">
        <div>
          <div className="op-eyebrow mb-5">What we do</div>
          <h2 className="op-h2">
            Four ways we <em>move</em> a brand
          </h2>
        </div>
        <p className="m-0 max-w-[34ch] font-grotesk text-[15px] leading-[1.65] text-ink-600 [text-wrap:pretty]">
          Delivered as standalone engagements or as one integrated programme
          under a single team.
        </p>
      </Reveal>

      {/*
        Four cards across. Hovering lifts a card, blurs its artwork back and
        opens the sub-services underneath the name — the list animates on
        grid-template-rows, which is the only way to transition to auto height.
      */}
      <RevealGroup className="grid grid-cols-4 gap-[clamp(12px,1.4vw,20px)] max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1">
        {services.map((service) => (
          <article
            key={service.index}
            tabIndex={0}
            className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-lg border border-ink-300 outline-none transition-[transform,border-color] duration-[420ms] ease-brand hover:z-10 hover:scale-[1.035] hover:border-blue-500 focus-visible:z-10 focus-visible:scale-[1.035] focus-visible:border-blue-500 max-[560px]:aspect-[4/3]"
          >
            {/* Artwork layer — blurs back on hover so the copy can sit on it */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-ink-100 transition-[filter,transform] duration-[560ms] ease-brand group-hover:scale-[1.08] group-hover:blur-[7px] group-focus-visible:scale-[1.08] group-focus-visible:blur-[7px]"
            >
              {service.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.image}
                  alt=""
                  className="block size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <span className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase text-ink-500">
                    Image {service.index}
                  </span>
                </div>
              )}
            </div>

            {/* Scrim, deepened on hover so the bullets stay readable */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(5,6,10,0.92)_0%,rgba(5,6,10,0.68)_38%,rgba(5,6,10,0.12)_78%)] transition-opacity duration-[420ms] ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
            />

            <div className="relative p-[clamp(16px,1.5vw,22px)]">
              <div className="mb-2.5 flex items-center gap-2.5">
                <span className="font-mono text-[11px] leading-none font-medium tracking-[0.14em] text-ink-550">
                  {service.index}
                </span>
                <span className="font-mono text-[10px] leading-none font-medium tracking-[0.12em] uppercase text-blue-400">
                  {service.model}
                </span>
              </div>

              <h3 className="m-0 font-serif text-[clamp(24px,2.1vw,32px)] leading-[1.05] font-normal tracking-[-0.02em] text-ink-900">
                {service.name}
              </h3>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[460ms] ease-brand group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <ul className="mt-3.5 mb-0 flex list-none flex-col gap-2 p-0">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-baseline gap-2.5 font-grotesk text-[13px] leading-[1.4] text-ink-600"
                      >
                        <span
                          aria-hidden="true"
                          className="text-[9px] text-blue-500"
                        >
                          ◆
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </RevealGroup>
    </section>
  );
}
