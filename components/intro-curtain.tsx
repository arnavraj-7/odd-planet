"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/hooks/use-reduced-motion";
import { site } from "@/lib/content";

/** Hold the mark at least this long, so the intro reads as intentional. */
const MIN_HOLD = 850;
/** ...and never longer than this, however slow the network is. */
const MAX_WAIT = 3000;
const FLY_MS = 760;
const OPEN_MS = 900;

const SEEN_KEY = "op-intro-seen";

type Phase = "hold" | "fly" | "open" | "done";

/**
 * Load intro: the mark holds centre while fonts and the hero's own assets
 * settle, flies into its place in the header, then the curtain parts.
 *
 * The overlay ships in the server HTML so there is no flash of the page
 * underneath it, and CSS hides it outright when scripting is off. It runs once
 * per session, and reduced motion skips straight past it.
 */
export function IntroCurtain() {
  const [phase, setPhase] = useState<Phase>("hold");
  const markRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    setPhase("done");
    document.documentElement.removeAttribute("data-intro");
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode — the intro simply runs again */
    }
  }, []);

  // Skip before first paint for a repeat visit or reduced motion, so neither
  // ever sees a frame of the overlay.
  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }

    if (seen || prefersReducedMotion()) {
      finish();
      return;
    }

    document.documentElement.setAttribute("data-intro", "running");
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  }, [finish]);

  // Deliberately runs once per mount. Depending on `phase` here would tear
  // down and clear the very timers that drive the next phase.
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-intro")) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Last resort. A curtain that never lifts leaves the site unusable, so
    // nothing in the sequence is allowed to be load-bearing for the reveal.
    const failsafe = setTimeout(() => {
      if (!cancelled) finish();
    }, MAX_WAIT + FLY_MS + OPEN_MS + 600);
    timers.push(failsafe);

    /** Fonts plus anything the hero paints first — capped, never open-ended. */
    const assetsReady = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      ...Array.from(
        document.querySelectorAll<HTMLImageElement>("[data-hero-asset] img, img[data-hero-asset]"),
      ).map((img) => img.decode().catch(() => undefined)),
    ]);

    const held = new Promise((resolve) => timers.push(setTimeout(resolve, MIN_HOLD)));
    const capped = new Promise((resolve) => timers.push(setTimeout(resolve, MAX_WAIT)));

    Promise.race([Promise.all([assetsReady, held]), capped]).then(() => {
      if (cancelled) return;

      const el = markRef.current;
      const target = document.querySelector<HTMLElement>("[data-logo-target]");

      if (el && target) {
        const from = el.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        const scale = to.height / from.height;
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);

        el.style.transition = `transform ${FLY_MS}ms cubic-bezier(.65,0,.35,1)`;
        el.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }

      setPhase("fly");

      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          // Hand the mark over to the real one in the header — same size, same
          // place, so the swap is invisible.
          document.documentElement.removeAttribute("data-intro");
          if (markRef.current) markRef.current.style.opacity = "0";
          setPhase("open");
          timers.push(setTimeout(finish, OPEN_MS));
        }, FLY_MS),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [finish]);

  if (phase === "done") return null;

  const opening = phase === "open";

  return (
    <div
      data-intro-overlay
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    >
      <div
        className={`absolute inset-x-0 top-0 h-1/2 border-b border-ink-300 bg-ink-000 transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] ${
          opening ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-ink-000 transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] ${
          opening ? "translate-y-full" : "translate-y-0"
        }`}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div
          ref={markRef}
          className={`transition-opacity duration-150 ${opening ? "opacity-0" : "opacity-100"}`}
        >
          <Image
            src="/odd-planet-mark.png"
            alt=""
            width={180}
            height={122}
            priority
            className="block h-[clamp(64px,11vw,116px)] w-auto"
          />
        </div>

        <div
          className={`flex flex-col items-center gap-3 transition-[opacity,transform] duration-[420ms] ease-out ${
            phase === "hold"
              ? "translate-y-0 opacity-100"
              : "-translate-y-1 opacity-0"
          }`}
        >
          <span className="font-grotesk text-[clamp(15px,1.6vw,19px)] leading-none font-extrabold tracking-[0.22em] text-ink-900">
            {site.wordmark}
          </span>
          <span className="font-mono text-[10px] leading-none font-medium tracking-[0.22em] text-ink-550 uppercase">
            {site.tagline}
          </span>
        </div>
      </div>
    </div>
  );
}
