"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/hooks/use-reduced-motion";
import {
  drawRibbon,
  registerRibbon,
  setRibbonMotion,
  sizeRibbon,
} from "@/lib/ribbon";

type RibbonFieldProps = {
  className?: string;
  style?: React.CSSProperties;
  /** CSS mask. It must reach full transparency well inside the canvas box,
   *  otherwise the box edge shows as a hard seam. */
  mask: string;
};

export function RibbonField({ className, style, mask }: RibbonFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    setRibbonMotion(!prefersReducedMotion());
    sizeRibbon(canvas);
    const unregister = registerRibbon(canvas);

    const onResize = () => {
      if (sizeRibbon(canvas) && prefersReducedMotion()) drawRibbon(canvas, 0);
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      unregister();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        ...style,
      }}
    />
  );
}
