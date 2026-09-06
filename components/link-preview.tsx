"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Preview = { label: string; src?: string };

/**
 * Cursor-following preview card for a list of linked rows.
 *
 * Children opt in with `data-preview-label` and, once artwork exists,
 * `data-preview-src`. Position is written straight to the card on rAF —
 * pointer moves never go through React state.
 *
 * Note this shows an image, not a live embed: news sites send
 * X-Frame-Options / frame-ancestors, so an <iframe> of them renders blank.
 */
export function LinkPreview({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Pointer-driven affordance: skip it on touch and narrow screens, where
    // there is no hover and the card would only get in the way.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || window.innerWidth < 900) return;

    const paint = () => {
      frame.current = null;
      const card = cardRef.current;
      if (!card) return;

      const { x, y } = pointer.current;
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      // Keep the card inside the viewport near the edges.
      const left = Math.min(x + 26, window.innerWidth - w - 16);
      const top = Math.min(Math.max(y - h / 2, 16), window.innerHeight - h - 16);
      card.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    };

    const schedule = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      const row = (event.target as HTMLElement | null)?.closest(
        "[data-preview-label]",
      ) as HTMLElement | null;

      if (!row) {
        setPreview(null);
        return;
      }

      pointer.current = { x: event.clientX, y: event.clientY };
      schedule();

      setPreview((current) => {
        const label = row.dataset.previewLabel ?? "";
        const src = row.dataset.previewSrc || undefined;
        if (current && current.label === label && current.src === src) {
          return current;
        }
        return { label, src };
      });
    };

    const onLeave = () => setPreview(null);

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true });

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      {children}

      <div
        ref={cardRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-70 h-[176px] w-[268px] overflow-hidden rounded-lg border border-ink-400 bg-ink-100 transition-[opacity,scale] duration-200 ease-out ${
          preview ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {preview?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview.src}
            alt=""
            className="block size-full object-cover object-top"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 px-5 text-center">
            <span className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase text-ink-500">
              Preview
            </span>
            <span className="font-grotesk text-[13px] leading-[1.4] text-ink-600">
              {preview?.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
