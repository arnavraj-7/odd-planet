"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MobileMenu } from "@/components/mobile-menu";
import { navItems, site } from "@/lib/content";
import { useActiveSection } from "@/hooks/use-active-section";

const NAV_IDS = navItems.map((item) => item.id);

export function SiteHeader() {
  const active = useActiveSection(NAV_IDS);
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the hero — a tinted bar there cuts a hard seam across the
  // gradient field. The frost only arrives once there is content behind it,
  // which also keeps a backdrop-filter off the compositor while idle.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 8);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-80 transition-[background-color] duration-300 ease-out ${
        scrolled
          ? "bg-[rgba(5,6,10,0.62)] backdrop-blur-[16px]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-5 px-gutter py-4">
        {/* Root-relative hashes so every link works from /privacy too, where a
            bare "#media" would only append a fragment that does not exist. */}
        <Link
          href="/"
          aria-label="Odd Planet — home"
          className="group flex shrink-0 items-center gap-3"
        >
          <Image
            data-logo-target
            src="/odd-planet-mark.png"
            alt="Odd Planet"
            width={48}
            height={32}
            priority
            className="block h-8 w-auto transition-opacity duration-200 ease-out group-hover:opacity-80"
          />
          {/* Hidden only in the band where the desktop nav and CTA crowd it —
              below 900px the hamburger frees the room again. */}
          <span
            aria-hidden="true"
            className="block h-4 w-px bg-ink-300 max-[1100px]:hidden max-[900px]:block"
          />
          <span className="block font-mono text-[10px] leading-none font-medium tracking-[0.16em] whitespace-nowrap text-ink-550 uppercase max-[1100px]:hidden max-[900px]:block">
            {site.tagline}
          </span>
        </Link>

        <nav
          aria-label="Sections"
          className="flex items-center gap-0.5 rounded-full border border-ink-300 p-[5px] max-[900px]:hidden"
        >
          {navItems.map((item) => {
            const on = active === item.id;
            return (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                aria-current={on ? "true" : undefined}
                className={`shrink-0 rounded-full px-[13px] py-[9px] font-mono text-xs leading-none tracking-[0.06em] whitespace-nowrap uppercase transition-[color,background] duration-200 ease-out ${
                  on
                    ? "bg-ink-250 text-ink-900"
                    : "text-ink-600 hover:bg-ink-250 hover:text-ink-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#contact"
          className="group inline-flex shrink-0 max-[900px]:hidden items-center gap-2 rounded-full bg-blue-500 py-2 pr-2 pl-[18px] font-grotesk text-[13px] leading-none font-semibold whitespace-nowrap text-white transition-[background,transform] duration-[240ms] ease-out hover:-translate-y-px hover:bg-blue-700"
        >
          Start a brief
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[13px] leading-none text-blue-500 transition-transform duration-[240ms] ease-out group-hover:translate-x-[3px]"
          >
            →
          </span>
        </Link>

        <MobileMenu />
      </div>
    </header>
  );
}
