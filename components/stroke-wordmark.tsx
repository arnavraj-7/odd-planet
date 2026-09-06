"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/hooks/use-reduced-motion";

const TEXT_STYLE = {
  fontFamily: "var(--font-grotesk)",
  fontWeight: 900,
  fontSize: 152,
  letterSpacing: "-0.04em",
} as const;

/**
 * Oversized footer wordmark: the outline draws on left to right, a gradient
 * fill wipes in behind it, then the outline hands the letters over to the fill.
 *
 * Both passes are revealed by a clip rect rather than a stroke dash. A dash
 * long enough to cover ten glyphs' worth of contours cannot be known ahead of
 * time, and a short one (the prototype used 2600) repeats along the path —
 * which drew disconnected fragments: a floating bar across the A, a detached
 * diagonal on the N. A clip wipe reveals whole letters in reading order.
 *
 * `textLength` fits the word to the container at any width — do not replace it
 * with a viewport-unit font-size, and note that per-letter stagger is not
 * possible while it is in use.
 */
export function StrokeWordmark({ text = "ODD PLANET" }: { text?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const strokeRef = useRef<SVGTextElement>(null);
  const strokeWipeRef = useRef<SVGRectElement>(null);
  const fillWipeRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const stroke = strokeRef.current;
    const strokeWipe = strokeWipeRef.current;
    const fillWipe = fillWipeRef.current;
    if (!svg || !stroke || !strokeWipe || !fillWipe) return;

    if (prefersReducedMotion()) {
      for (const el of [stroke, strokeWipe, fillWipe]) el.style.transition = "none";
      strokeWipe.style.transform = "scaleX(1)";
      fillWipe.style.transform = "scaleX(1)";
      stroke.style.opacity = "0";
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();

          strokeWipe.style.transform = "scaleX(1)";
          timers.push(
            setTimeout(() => {
              fillWipe.style.transform = "scaleX(1)";
            }, 1000),
          );
          timers.push(
            setTimeout(() => {
              stroke.style.opacity = "0";
            }, 1300),
          );
        }
      },
      { threshold: 0.3 },
    );

    io.observe(svg);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
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
        <linearGradient id="opWordStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2D45F0" />
          <stop offset="0.5" stopColor="#A9B4FF" />
          <stop offset="1" stopColor="#2D45F0" />
        </linearGradient>

        <clipPath id="opStrokeWipe">
          <rect
            ref={strokeWipeRef}
            x="0"
            y="-40"
            width="1000"
            height="200"
            style={{
              transform: "scaleX(0)",
              transformOrigin: "0 0",
              transition: "transform 1.6s cubic-bezier(.33,1,.68,1)",
            }}
          />
        </clipPath>

        <clipPath id="opWipe">
          <rect
            ref={fillWipeRef}
            x="0"
            y="-40"
            width="1000"
            height="200"
            style={{
              transform: "scaleX(0)",
              transformOrigin: "0 0",
              transition: "transform 1.15s cubic-bezier(.16,.84,.44,1)",
            }}
          />
        </clipPath>
      </defs>

      <text
        ref={strokeRef}
        x="0"
        y="112"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        clipPath="url(#opStrokeWipe)"
        style={{
          ...TEXT_STYLE,
          fill: "none",
          stroke: "url(#opWordStroke)",
          strokeWidth: 1.4,
          transition: "opacity .9s ease",
        }}
      >
        {text}
      </text>

      <text
        x="0"
        y="112"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        clipPath="url(#opWipe)"
        style={{ ...TEXT_STYLE, fill: "url(#opWord)" }}
      >
        {text}
      </text>
    </svg>
  );
}
