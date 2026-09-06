"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navItems } from "@/lib/content";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

/**
 * Phone / tablet navigation. Opens a full-height sheet over the page with the
 * four section links and the brief CTA.
 *
 * The entrance is staggered per item on the site's own reveal curve; under
 * reduced motion the sheet simply appears.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock the page behind the sheet, and close on Escape.
  useEffect(() => {
    if (!open) return;

    lockScroll();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="hidden max-[900px]:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="op-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-90 flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink-400 bg-transparent transition-[border-color,background] duration-200 ease-out hover:border-blue-400 hover:bg-ink-150"
      >
        <span className="relative block h-[11px] w-[18px]">
          <span
            className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-ink-900 transition-transform duration-[320ms] ease-brand ${
              open ? "top-[5px] rotate-45" : "top-0 rotate-0"
            }`}
          />
          <span
            className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-ink-900 transition-transform duration-[320ms] ease-brand ${
              open ? "top-[5px] -rotate-45" : "top-[10px] rotate-0"
            }`}
          />
        </span>
      </button>

      <div
        id="op-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open ? true : undefined}
        className={`fixed inset-0 z-80 flex flex-col justify-between bg-[rgba(5,6,10,0.94)] px-gutter pt-[calc(var(--op-header)+clamp(24px,6vh,56px))] pb-[clamp(28px,6vh,56px)] backdrop-blur-[18px] transition-[opacity,visibility] duration-[280ms] ease-out ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Sections">
          <ul className="m-0 flex list-none flex-col p-0">
            {navItems.map((item, i) => (
              <li
                key={item.id}
                style={{ transitionDelay: open ? `${90 + i * 65}ms` : "0ms" }}
                className={`border-t border-ink-300 transition-[opacity,transform,filter] duration-[520ms] ease-brand last:border-b ${
                  open
                    ? "translate-y-0 opacity-100 blur-0"
                    : "translate-y-3 opacity-0 blur-[6px]"
                }`}
              >
                <Link
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-[clamp(16px,2.6vh,24px)] text-ink-900 hover:text-ink-900"
                >
                  <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-ink-550">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-[clamp(30px,9vw,46px)] leading-[1.05] tracking-[-0.02em]">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          style={{ transitionDelay: open ? "360ms" : "0ms" }}
          className={`flex flex-col gap-5 transition-[opacity,transform] duration-[520ms] ease-brand ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="group flex items-center justify-center gap-2.5 rounded-full bg-blue-500 py-[18px] font-grotesk text-[15px] leading-none font-semibold text-white transition-[background] duration-200 ease-out hover:bg-blue-700"
          >
            Start a brief
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-full bg-white text-[13px] leading-none text-blue-500 transition-transform duration-[240ms] ease-out group-hover:translate-x-[3px]"
            >
              →
            </span>
          </Link>
          <p className="m-0 text-center font-mono text-[10px] leading-none font-medium tracking-[0.16em] uppercase text-ink-550">
            New Delhi, India
          </p>
        </div>
      </div>
    </div>
  );
}
