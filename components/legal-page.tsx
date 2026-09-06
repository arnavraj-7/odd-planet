import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Shared shell for the legal pages — same ground, same type system. */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[820px] px-gutter pt-[clamp(40px,6vw,88px)] pb-section">
        <div className="op-eyebrow mb-5">Legal</div>
        <h1 className="op-h2 mb-4">{title}</h1>
        <div className="op-meta">Last updated: {updated}</div>

        {intro ? (
          <div className="mt-[clamp(26px,3.4vw,40px)] flex flex-col gap-4 border-t border-ink-300 pt-[clamp(24px,3vw,36px)] font-grotesk text-[15px] leading-[1.7] text-ink-600 [text-wrap:pretty]">
            {intro}
          </div>
        ) : null}

        <div className="mt-[clamp(30px,4vw,52px)] flex flex-col gap-[clamp(30px,4vw,48px)]">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function LegalSection({
  index,
  heading,
  children,
}: {
  index: number;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-ink-300 pt-[clamp(22px,2.6vw,32px)]">
      <div className="mb-4 flex items-baseline gap-4">
        <span className="font-mono text-[11px] leading-none font-medium tracking-[0.12em] text-ink-550">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="m-0 font-serif text-[clamp(22px,2.6vw,32px)] leading-[1.15] font-normal tracking-[-0.02em] text-ink-900">
          {heading}
        </h2>
      </div>
      <div className="flex flex-col gap-4 pl-[calc(11px+1rem)] font-grotesk text-[15px] leading-[1.7] text-ink-600 [text-wrap:pretty] max-[560px]:pl-0">
        {children}
      </div>
    </section>
  );
}

/** Bulleted list in the brand's diamond style. */
export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-baseline gap-[11px] text-[15px] leading-[1.6]"
        >
          <span aria-hidden="true" className="text-[10px] text-blue-500">
            ◆
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
