"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Oversized footer wordmark: the letters draw on as a stroke, a gradient fill
 * wipes in left to right, then the stroke fades out.
 *
 * `textLength` fits the word to the container at any width — do not replace it
 * with a viewport-unit font-size, and note that per-letter stagger is not
 * possible while it is in use. It draws as one continuous pass by design.
 */
export function StrokeWordmark({ text = "ODD PLANET" }: { text?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const strokeRef = useRef<SVGTextElement>(null);
  const wipeRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const stroke = strokeRef.current;
    const wipe = wipeRef.current;
    if (!svg || !stroke || !wipe) return;

    if (prefersReducedMotion()) {
      stroke.style.transition = "none";
      stroke.style.strokeDashoffset = "0";
      stroke.style.opacity = "0";
      wipe.style.transition = "none";
      wipe.style.transform = "scaleX(1)";
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          stroke.style.strokeDashoffset = "0";
          timers.push(
            setTimeout(() => {
              wipe.style.transform = "scaleX(1)";
            }, 1000),
          );
          timers.push(
            setTimeout(() => {
              stroke.style.opacity = "0";
            }, 1700),
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
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: 900,
          fontSize: 152,
          letterSpacing: "-0.04em",
          fill: "none",
          stroke: "url(#opWordStroke)",
          strokeWidth: 1.4,
          strokeDasharray: 2600,
          strokeDashoffset: 2600,
          transition:
            "stroke-dashoffset 1.6s cubic-bezier(.33,1,.68,1), opacity .6s ease .9s",
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
