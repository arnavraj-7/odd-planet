"use client";

import type { ElementType, HTMLAttributes } from "react";

import { useReveal } from "@/hooks/use-reveal";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  threshold?: number;
  rootMargin?: string;
};

/** Fades, rises and de-blurs its subtree once, when it enters the viewport. */
export function Reveal({
  as,
  threshold,
  rootMargin,
  children,
  ...rest
}: RevealProps) {
  const ref = useReveal<HTMLElement>({ threshold, rootMargin });
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag ref={ref} data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}

type RevealGroupProps = RevealProps & {
  /** ms between each direct child. */
  stagger?: number;
};

/** Same reveal, applied to the direct children at a fixed increment. */
export function RevealGroup({
  as,
  threshold,
  rootMargin,
  stagger = 90,
  children,
  ...rest
}: RevealGroupProps) {
  const ref = useReveal<HTMLElement>({ threshold, rootMargin, stagger });
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag ref={ref} data-reveal-group="" {...rest}>
      {children}
    </Tag>
  );
}
