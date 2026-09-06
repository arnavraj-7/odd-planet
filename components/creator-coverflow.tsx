"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/reveal";
import { creators } from "@/lib/content";

const N = creators.length;

const CARD_SIZE =
  "w-[clamp(200px,23vw,286px)] h-[clamp(280px,32vw,400px)]";

export function CreatorCoverflow() {
  const frameRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const pos = useRef(0);
  const target = useRef(0);
  const cardWidth = useRef(0);
  const drag = useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);
  const frame = useRef<number | null>(null);
  const selectedRef = useRef(0);

  const [selected, setSelected] = useState(0);

  /* ---- per-frame paint, written straight to the DOM ---- */
  const paint = useCallback(() => {
    const width = cardWidth.current;
    if (!width) return;

    const small = window.innerWidth < 700;
    const rot = small ? 34 : 44;
    const depth = small ? 0.5 : 0.6;
    const pitch = width * (small ? 1.12 : 1.05);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      let offset = i - pos.current;
      offset = ((offset % N) + N) % N;
      if (offset > N / 2) offset -= N;

      const dist = Math.abs(offset);
      const ramp = Math.pow(dist, 0.56);
      const tilt = Math.min(rot * ramp, 82) * Math.sign(offset);

      card.style.transform = `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${
        -depth * width * ramp
      }px) rotateY(${-tilt}deg)`;

      // Fades to zero exactly where the card teleports across the ring —
      // that is what makes looping invisible without cloned nodes.
      const edge = Math.min(1, Math.max(0, N / 2 - dist));
      card.style.opacity = String(Math.max(0, 1 - 0.14 * dist) * edge);
      card.style.zIndex = String(100 - Math.round(dist));
      card.style.borderColor = dist < 0.5 ? "#2D45F0" : "#191C26";

      // Screen readers and tab order stay on the centred card.
      const centred = dist < 0.5;
      card.setAttribute("aria-hidden", centred ? "false" : "true");
      if (centred) card.removeAttribute("inert");
      else card.setAttribute("inert", "");
    });

    const index = ((Math.round(pos.current) % N) + N) % N;
    if (index !== selectedRef.current) {
      selectedRef.current = index;
      setSelected(index);
    }
  }, []);

  const settle = useCallback(
    (to: number) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      target.current = to;

      const step = () => {
        const remaining = target.current - pos.current;
        if (Math.abs(remaining) < 0.0004) {
          pos.current = target.current;
          paint();
          frame.current = null;
          return;
        }
        pos.current += remaining * 0.16;
        paint();
        frame.current = requestAnimationFrame(step);
      };

      frame.current = requestAnimationFrame(step);
    },
    [paint],
  );

  const nudge = useCallback((by: number) => settle(Math.round(target.current) + by), [settle]);

  const goTo = useCallback(
    (index: number) => settle(index + Math.round((target.current - index) / N) * N),
    [settle],
  );

  /* ---- measure ---- */
  useEffect(() => {
    const measure = () => {
      cardWidth.current = cardsRef.current[0]?.offsetWidth ?? 0;
      paint();
    };

    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      window.removeEventListener("resize", measure);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [paint]);

  /* ---- drag ---- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    frameRef.current?.setPointerCapture(e.pointerId);
    target.current = pos.current;
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      pos: pos.current,
      v: 0,
      t: performance.now(),
    };
    if (frameRef.current) frameRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;

    const small = window.innerWidth < 700;
    const pitch = cardWidth.current * (small ? 1.12 : 1.05);
    if (!pitch) return;

    const now = performance.now();
    const before = pos.current;
    pos.current = d.pos - (e.clientX - d.x) / pitch;
    d.v = ((pos.current - before) / Math.max(now - d.t, 1)) * 1000;
    d.t = now;
    paint();
  };

  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (frameRef.current) frameRef.current.style.cursor = "grab";
    const carried = Math.max(-2, Math.min(2, d.v * 0.18));
    settle(Math.round(pos.current + carried));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      nudge(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nudge(1);
    }
  };

  const current = creators[selected];

  return (
    <section id="creators" className="overflow-hidden py-section">
      <Reveal className="mx-auto mb-[clamp(6px,1.4vw,18px)] flex max-w-[1400px] flex-wrap items-end justify-between gap-x-10 gap-y-4 px-gutter">
        <div className="max-w-[52ch]">
          <div className="op-eyebrow mb-5">Talent &amp; partnerships</div>
          <h2 className="m-0 text-ink-900">
            <span className="block font-grotesk text-[clamp(28px,4vw,56px)] leading-[0.98] font-extrabold tracking-[-0.03em]">
              100,000+ CREATORS.
            </span>
            <span className="block font-grotesk text-[clamp(28px,4vw,56px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-blue-400">
              ONE NETWORK.
            </span>
          </h2>
          <p className="mt-5 mb-0 max-w-[46ch] font-grotesk text-[15px] leading-[1.6] text-ink-600 [text-wrap:pretty]">
            From emerging voices to category leaders, we connect brands with
            creators who actually move attention.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous creator"
            className="size-11 cursor-pointer rounded-full border border-ink-400 bg-transparent text-base text-ink-900 transition-[border-color,background] duration-200 ease-out hover:border-blue-400 hover:bg-ink-150"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next creator"
            className="size-11 cursor-pointer rounded-full border border-ink-400 bg-transparent text-base text-ink-900 transition-[border-color,background] duration-200 ease-out hover:border-blue-400 hover:bg-ink-150"
          >
            →
          </button>
        </div>
      </Reveal>

      <div
        ref={frameRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Creator network"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onKeyDown={onKeyDown}
        className="cursor-grab touch-pan-y overflow-hidden pt-[clamp(24px,3.4vw,48px)] pb-[clamp(8px,1.4vw,18px)] [perspective:1400px]"
      >
        <div className="relative h-[clamp(280px,32vw,400px)] [transform-style:preserve-3d]">
          {creators.map((creator, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              role="group"
              aria-label={`${i + 1} of ${N}`}
              className={`absolute top-0 left-1/2 overflow-hidden rounded-[10px] border border-ink-300 bg-ink-100 will-change-transform ${CARD_SIZE}`}
            >
              {creator.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={creator.image}
                  alt={creator.name}
                  draggable={false}
                  className="block size-full object-cover object-top select-none"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex size-full items-center justify-center"
                >
                  <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink-500">
                    Portrait {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-[22px] px-gutter">
        <div key={selected} className="w-full animate-caption">
          <div className="text-center">
            <div className="font-serif text-creator-name leading-[1.1] font-normal tracking-[-0.02em] text-ink-900">
              {current.name}
            </div>
            <div className="mt-3 font-mono text-[11px] leading-none font-medium tracking-[0.14em] uppercase text-ink-600">
              {current.role}
            </div>
          </div>

          <div className="mx-auto mt-[22px] w-full max-w-[340px] font-mono text-[11px] leading-none font-medium tracking-[0.06em]">
            {current.city ? (
              <div className="op-metric-row py-[11px]">
                <span>BASED IN</span>
                <span>{current.city}</span>
              </div>
            ) : null}
            {current.brands ? (
              <div className="op-metric-row py-[11px]">
                <span>BRANDS</span>
                <span>{current.brands}</span>
              </div>
            ) : null}
            {/* Profiles, not follower counts — the platform shows the live
                figure, and nothing on the page goes stale. */}
            {current.socials.length ? (
              <div className="op-metric-row border-b border-ink-300 py-[11px]">
                <span>PROFILES</span>
                <span className="flex gap-3.5">
                  {current.socials.map((social) =>
                    social.href ? (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-200 hover:text-blue-100"
                      >
                        {social.label} →
                      </a>
                    ) : (
                      <span key={social.label} className="text-ink-500">
                        {social.label}
                      </span>
                    ),
                  )}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {creators.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to creator ${i + 1}`}
              aria-current={i === selected ? "true" : "false"}
              className="-mx-2 flex size-11 cursor-pointer items-center justify-center border-none bg-transparent p-0"
            >
              <span
                className={`block size-[7px] rounded-full bg-ink-900 transition-[opacity,transform] duration-[250ms] ease-out ${
                  i === selected ? "scale-[1.3] opacity-100" : "opacity-25"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
