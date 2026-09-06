"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/hooks/use-reduced-motion";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { site } from "@/lib/content";

/** Hold the mark at least this long, so the intro reads as intentional. */
const MIN_HOLD = 850;
/** ...and never longer than this, however slow the network is. */
const MAX_WAIT = 3000;
const FLY_MS = 760;
const FADE_MS = 520;

type Phase = "hold" | "fly" | "fade" | "done";

/**
 * Load intro: the mark holds centre while fonts and the hero's own assets
 * settle, then flies into its place in the header.
 *
 * There is deliberately no curtain. A curtain reveals the page *over* the
 * header, so the instant the flying mark handed over, the real one was still
 * behind an opaque panel — the logo blinked out and came back a beat later.
 * Fading the whole overlay instead lets the two marks cross in the same spot,
 * which reads as a single object settling into place.
 *
 * The overlay ships in the server HTML so the page never flashes underneath
 * it, CSS hides it outright when scripting is off, and it plays on every load.
 */
export function IntroCurtain() {
  const [phase, setPhase] = useState<Phase>("hold");
  const markRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    setPhase("done");
    document.documentElement.removeAttribute("data-intro");
    unlockScroll();
  }, []);

  // Skipped before first paint under reduced motion, so it never sees a frame
  // of the overlay.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      finish();
      return;
    }

    document.documentElement.setAttribute("data-intro", "running");
    lockScroll();
    window.scrollTo(0, 0);
  }, [finish]);

  // Deliberately runs once per mount. Depending on `phase` here would tear
  // down and clear the very timers that drive the next phase.
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-intro")) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Last resort. An overlay that never lifts leaves the site unusable, so
    // nothing in the sequence is allowed to be load-bearing for the reveal.
    timers.push(
      setTimeout(
        () => {
          if (!cancelled) finish();
        },
        MAX_WAIT + FLY_MS + FADE_MS + 600,
      ),
    );

    /** Fonts plus anything the hero paints first — capped, never open-ended. */
    const assetsReady = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      ...Array.from(
        document.querySelectorAll<HTMLImageElement>("img[data-hero-asset]"),
      ).map((img) => img.decode().catch(() => undefined)),
    ]);

    const held = new Promise((r) => timers.push(setTimeout(r, MIN_HOLD)));
    const capped = new Promise((r) => timers.push(setTimeout(r, MAX_WAIT)));

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
          // Uncover the real mark first — it is now directly underneath at the
          // same size, so the overlay fade crosses one into the other.
          document.documentElement.removeAttribute("data-intro");
          setPhase("fade");
          timers.push(setTimeout(finish, FADE_MS));
        }, FLY_MS),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [finish]);

  if (phase === "done") return null;

  return (
    <div
      data-intro-overlay
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[100] bg-ink-000 transition-opacity duration-[520ms] ease-out ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <div ref={markRef}>
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
