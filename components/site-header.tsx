"use client";

import { navItems, site } from "@/lib/content";
import { useActiveSection } from "@/hooks/use-active-section";

const NAV_IDS = navItems.map((item) => item.id);

export function SiteHeader() {
  const active = useActiveSection(NAV_IDS);

  return (
    <header className="sticky top-0 z-80 bg-[rgba(5,6,10,0.7)] backdrop-blur-[16px]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-5 px-gutter py-4 max-[640px]:flex-wrap max-[640px]:gap-y-3">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2.5 text-ink-900 hover:text-ink-900"
        >
          <span
            aria-hidden="true"
            className="block size-[9px] rounded-full bg-blue-500"
          />
          <span className="font-grotesk text-[15px] leading-none font-extrabold tracking-[0.02em]">
            {site.wordmark}
          </span>
        </a>

        <nav
          aria-label="Sections"
          className="op-hide-scrollbar flex items-center gap-0.5 rounded-full border border-ink-300 p-[5px] max-[900px]:min-w-0 max-[900px]:overflow-x-auto max-[640px]:order-3 max-[640px]:w-full max-[640px]:justify-start"
        >
          {navItems.map((item) => {
            const on = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={on ? "true" : undefined}
                className={`shrink-0 rounded-full px-[13px] py-[9px] font-mono text-xs leading-none tracking-[0.06em] whitespace-nowrap uppercase transition-[color,background] duration-200 ease-out ${
                  on
                    ? "bg-ink-250 text-ink-900"
                    : "text-ink-600 hover:bg-ink-250 hover:text-ink-900"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full bg-ink-900 py-3.5 pr-2 pl-5 font-grotesk text-[13px] leading-none font-semibold whitespace-nowrap text-ink-000 transition-[background,color] duration-[240ms] ease-out hover:bg-blue-500 hover:text-white"
        >
          <span className="relative">Start a brief</span>
          <span
            aria-hidden="true"
            className="relative flex size-[26px] shrink-0 items-center justify-center rounded-full bg-ink-000 text-xs leading-none text-ink-900 transition-[background,color,transform] duration-[240ms] ease-out group-hover:translate-x-[3px] group-hover:bg-white group-hover:text-blue-500"
          >
            →
          </span>
        </a>
      </div>
    </header>
  );
}
