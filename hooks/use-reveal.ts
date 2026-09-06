"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/hooks/use-reduced-motion";

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  /** When set, the element's direct children reveal at this many ms apart. */
  stagger?: number;
};

/**
 * One-shot reveal. The hidden start state lives in CSS (`[data-reveal]`);
 * this only flips `data-revealed` when the element enters the viewport, then
 * discards the observer.
 */
export function useReveal<T extends HTMLElement>({
  threshold,
  rootMargin,
  stagger,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      if (stagger) {
        Array.from(el.children).forEach((child, i) => {
          (child as HTMLElement).style.transitionDelay = `${i * stagger}ms`;
        });
      }
      el.setAttribute("data-revealed", "");
    };

    if (prefersReducedMotion()) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          reveal();
        }
      },
      {
        threshold: threshold ?? (stagger ? 0.1 : 0.15),
        rootMargin: rootMargin ?? (stagger ? "0px 0px -6% 0px" : "0px 0px -8% 0px"),
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, stagger]);

  return ref;
}
