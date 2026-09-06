"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The marquee is a compositor animation that would otherwise keep running for
 * the whole page. Pausing it off-screen costs nothing and frees a layer.
 */
export function MarqueeTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Clearing the inline value hands control back to the hover rule.
          el.style.animationPlayState = entry.isIntersecting ? "" : "paused";
        }
      },
      { rootMargin: "200px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-marquee
      className="flex w-max animate-marquee hover:[animation-play-state:paused]"
    >
      {children}
    </div>
  );
}
