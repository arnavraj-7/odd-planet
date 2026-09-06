"use client";

import { useCountUp } from "@/hooks/use-count-up";

/** Server-renders the final figure, then counts up to it on entry. */
export function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useCountUp<HTMLSpanElement>(value, suffix);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
