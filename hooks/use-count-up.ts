"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/hooks/use-reduced-motion";

const DURATION = 1600;

/**
 * Counts 0 → target on entry, 1600ms, ease-out cubic. Writes `textContent`
 * directly so the count never round-trips through React state.
 */
export function useCountUp<T extends HTMLElement>(target: number, suffix = "") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    let frame = 0;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();

          const start = performance.now();
          el.textContent = `0${suffix}`;

          const step = (now: number) => {
            const p = Math.min(1, (now - start) / DURATION);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (p < 1) frame = requestAnimationFrame(step);
          };

          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.35 },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, suffix]);

  return ref;
}
