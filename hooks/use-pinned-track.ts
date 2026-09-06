"use client";

import { useCallback, useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/hooks/use-reduced-motion";

/** Below this width the section unpins and becomes a native snap rail. */
const PIN_MIN_WIDTH = 700;

/**
 * Scroll-pinned horizontal track.
 *
 * Section height = viewport + trackOverflow. The inner frame sticks at the top
 * and the vertical scroll distance is converted to horizontal travel, so the
 * section releases exactly when the last card lands.
 *
 * Progress is ref-held and written straight to the DOM — it never becomes React
 * state.
 */
export function usePinnedTrack(total: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const overflowRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const paintProgress = useCallback(
    (p: number) => {
      if (barRef.current) barRef.current.style.width = `${6 + p * 94}%`;
      if (countRef.current) {
        const i = Math.min(total, Math.round(p * (total - 1)) + 1);
        countRef.current.textContent = `${String(i).padStart(2, "0")} / ${String(
          total,
        ).padStart(2, "0")}`;
      }
    },
    [total],
  );

  const update = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const overflow = overflowRef.current;
    if (!overflow) {
      track.style.transform = "none";
      return;
    }

    const p = Math.max(
      0,
      Math.min(1, -section.getBoundingClientRect().top / overflow),
    );
    track.style.transform = `translate3d(${-p * overflow}px,0,0)`;
    paintProgress(p);
  }, [paintProgress]);

  const measure = useCallback(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!section || !inner || !scroller || !track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const unpinned =
      prefersReducedMotion() || window.innerWidth < PIN_MIN_WIDTH;

    if (unpinned) {
      section.style.height = "auto";
      inner.style.position = "static";
      inner.style.height = "auto";
      scroller.style.overflowX = "auto";
      scroller.style.scrollSnapType = "x mandatory";
      scroller.style.setProperty("-webkit-overflow-scrolling", "touch");
      scroller.classList.add("op-hide-scrollbar");
      cards.forEach((card) => {
        card.style.scrollSnapAlign = "start";
      });
      track.style.transform = "none";
      overflowRef.current = 0;

      // Keep the rail and NN / 07 counter live in the unpinned mode too.
      const max = scroller.scrollWidth - scroller.clientWidth;
      paintProgress(max > 0 ? scroller.scrollLeft / max : 0);
      return;
    }

    scroller.style.overflowX = "hidden";
    scroller.style.scrollSnapType = "";
    scroller.classList.remove("op-hide-scrollbar");
    cards.forEach((card) => {
      card.style.scrollSnapAlign = "";
    });

    inner.style.position = "sticky";
    inner.style.height =
      typeof CSS !== "undefined" && CSS.supports?.("height", "100dvh")
        ? "100dvh"
        : "100vh";

    overflowRef.current = Math.max(0, track.scrollWidth - scroller.clientWidth);
    section.style.height = `${window.innerHeight + overflowRef.current}px`;
  }, [paintProgress]);

  // Measure + paint, and re-measure whenever the track can change width.
  useEffect(() => {
    measure();
    update();

    // Re-measuring writes layout, so coalesce every trigger into one frame —
    // a ResizeObserver that measures synchronously will thrash.
    let pending = 0;
    const onResize = () => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        measure();
        update();
      });
    };

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Late web-font metrics and late-decoding images both change scrollWidth,
    // which the pin math depends on.
    const observer = new ResizeObserver(onResize);
    if (trackRef.current) observer.observe(trackRef.current);
    document.fonts?.ready.then(onResize).catch(() => {});

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (pending) cancelAnimationFrame(pending);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [measure, update]);

  // Unpinned mode: drive the rail from the scroller instead of the page.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onRailScroll = () => {
      if (overflowRef.current) return; // pinned mode owns the rail
      const max = scroller.scrollWidth - scroller.clientWidth;
      paintProgress(max > 0 ? scroller.scrollLeft / max : 0);
    };

    scroller.addEventListener("scroll", onRailScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onRailScroll);
  }, [paintProgress]);

  // Keyboard users: a card taking focus off-screen scrolls the page so the
  // transform brings it into view (scrollIntoView cannot help a transformed track).
  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const onFocusIn = (event: FocusEvent) => {
      const overflow = overflowRef.current;
      if (!overflow) return;

      const target = event.target as HTMLElement | null;
      const card = target?.closest("[data-work-card]") as HTMLElement | null;
      if (!card) return;

      const p = Math.max(0, Math.min(1, card.offsetLeft / overflow));
      const top = section.offsetTop + p * overflow;
      window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
    };

    track.addEventListener("focusin", onFocusIn);
    return () => track.removeEventListener("focusin", onFocusIn);
  }, []);

  return { sectionRef, innerRef, scrollerRef, trackRef, barRef, countRef };
}
