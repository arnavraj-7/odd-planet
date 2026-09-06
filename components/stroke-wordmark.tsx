"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Oversized footer wordmark: the gradient fill wipes in left to right.
 *
 * There is deliberately no outline pass. Two earlier attempts at one both
 * looked broken around the A and N: a stroke dash short enough to specify
 * repeats along ten glyphs' worth of contours and draws disconnected
 * fragments, and even a correctly clipped outline reads as noise here —
 * `textLength` compresses the glyphs horizontally and `preserveAspectRatio
 * ="none"` scales them non-uniformly, so a 1.4px stroke lands unevenly on
 * stems versus diagonals, and the fill's leading edge slices the counters of
 * A and N into stray-looking quadrilaterals. The fill wipe alone is clean at
 * every frame and every width.
 *
 * `textLength` fits the word to the container at any width — do not replace it
 * with a viewport-unit font-size.
 */
export function StrokeWordmark({ text = "ODD PLANET" }: { text?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wipeRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const wipe = wipeRef.current;
    if (!svg || !wipe) return;

    if (prefersReducedMotion()) {
      wipe.style.transition = "none";
      wipe.style.transform = "scaleX(1)";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          wipe.style.transform = "scaleX(1)";
        }
      },
      { threshold: 0.3 },
    );

    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 116"
      preserveAspectRatio="none"
      role="img"
      aria-label="Odd Planet"
      className="block h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient id="opWord" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1B2030" />
          <stop offset="0.52" stopColor="#2D45F0" stopOpacity="0.72" />
          <stop offset="1" stopColor="#1B2030" />
        </linearGradient>

        <clipPath id="opWipe">
          <rect
            ref={wipeRef}
            x="0"
            y="-40"
            width="1000"
            height="200"
            style={{
              transform: "scaleX(0)",
              transformOrigin: "0 0",
              transition: "transform 1.5s cubic-bezier(.16,.84,.44,1)",
            }}
          />
        </clipPath>
      </defs>

      <text
        x="0"
        y="112"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        clipPath="url(#opWipe)"
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: 900,
          fontSize: 152,
          letterSpacing: "-0.04em",
          fill: "url(#opWord)",
        }}
      >
        {text}
      </text>
    </svg>
  );
}
