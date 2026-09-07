"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The marquee is a compositor animation that would otherwise keep running for
 * the whole page. Pausing it off-screen costs nothing and frees a layer.
 */
export function MarqueeTrack({
  children,
  reverse = false,
  duration,
}: {
  children: ReactNode;
  /** Runs the same keyframes backwards, so a row can travel right. */
  reverse?: boolean;
  /** Overrides the shared duration — a shorter track needs less time. */
  duration?: string;
}) {
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
      style={duration ? { animationDuration: duration } : undefined}
      className={`flex w-max animate-marquee hover:[animation-play-state:paused] ${
        reverse ? "[animation-direction:reverse]" : ""
      }`}
    >
      {children}
    </div>
  );
}
