/**
 * Ribbon gradient field — the ambient depth behind the hero and contact
 * sections, and the thing that visually blends them into the page ground.
 *
 * One rAF loop drives every registered canvas. Nothing is rounded per frame
 * (rounding is what makes the motion visibly step) and every modulation is
 * exactly 0 at t = 0, so motion never snaps on start.
 */

const STOPS = [
  { p: 0.0, c: "#05060A" },
  { p: 0.2, c: "#0E1330" },
  { p: 0.46, c: "#14169A" },
  { p: 0.68, c: "#2D45F0" },
  { p: 0.86, c: "#5A6DFF" },
  { p: 1.0, c: "#A9B4FF" },
] as const;

const SEGMENTS = 26;
const ANGLE = (32 * Math.PI) / 180;
const WAVE = 0.14 * 0.35;

export function drawRibbon(canvas: HTMLCanvasElement, t: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !canvas.width) return;

  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.filter = `blur(${Math.round(Math.min(W, H) * 0.045)}px)`;
  ctx.translate(W / 2, H / 2);
  ctx.rotate(ANGLE);

  const L = Math.hypot(W, H);
  const clock = 20.75 + t * 1.2;

  const bendAt = (y: number) => {
    const cross = (y + L / 2) / L;
    return WAVE * Math.sin(cross * 2.4 * Math.PI * 2 + clock) * L * 0.5;
  };

  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    const x0 = -L / 2 + a.p * L;
    const x1 = -L / 2 + b.p * L;

    const gradient = ctx.createLinearGradient(x0, 0, x1, 0);
    gradient.addColorStop(0, a.c);
    gradient.addColorStop(1, b.c);
    ctx.fillStyle = gradient;

    ctx.beginPath();
    for (let s = 0; s <= SEGMENTS; s++) {
      const y = -L / 2 + (s / SEGMENTS) * L;
      const px = x0 + bendAt(y);
      if (s === 0) ctx.moveTo(px, y);
      else ctx.lineTo(px, y);
    }
    for (let s = SEGMENTS; s >= 0; s--) {
      const y = -L / 2 + (s / SEGMENTS) * L;
      ctx.lineTo(x1 + bendAt(y), y);
    }
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

/**
 * The field is drawn into a deliberately small backing store and scaled up by
 * CSS. Everything about it is blurred by `min(W,H) * 0.045`, so the blur scales
 * with the buffer and the result is indistinguishable — while the per-frame
 * fill and blur cost drops by an order of magnitude. Canvas2D `filter: blur()`
 * over a full-size hero surface is what makes this effect expensive.
 */
const MAX_EDGE_DESKTOP = 640;
const MAX_EDGE_MOBILE = 420;

export function sizeRibbon(canvas: HTMLCanvasElement) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return false;

  const small = window.innerWidth < 700;
  const dpr = Math.min(small ? 1.4 : 2, window.devicePixelRatio || 1);
  const maxEdge = small ? MAX_EDGE_MOBILE : MAX_EDGE_DESKTOP;

  const scale = Math.min(1, maxEdge / (Math.max(w, h) * dpr));
  const width = Math.max(1, Math.round(w * dpr * scale));
  const height = Math.max(1, Math.round(h * dpr * scale));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

/* ------------------------------------------------------------------ *
 * Shared loop
 * ------------------------------------------------------------------ */

const canvases = new Set<HTMLCanvasElement>();
const painted = new WeakSet<HTMLCanvasElement>();

let frame: number | null = null;
let startedAt = 0;
let lastDraw = 0;
let animating = true;

/** The field drifts at 1.2 units/s — 30fps is imperceptible and halves the cost. */
const FRAME_MS = 1000 / 30;

function tick(now: number) {
  if (animating && now - lastDraw < FRAME_MS) {
    frame = requestAnimationFrame(tick);
    return;
  }
  lastDraw = now;

  const t = (now - startedAt) / 1000;

  for (const canvas of canvases) {
    const rect = canvas.getBoundingClientRect();
    const onScreen =
      rect.bottom > -200 && rect.top < window.innerHeight + 200;
    if (!onScreen) continue;

    // Under reduced motion exactly one static frame is drawn, ever.
    if (!animating && painted.has(canvas)) continue;
    if (!animating) painted.add(canvas);

    drawRibbon(canvas, animating ? t : 0);
  }

  frame = requestAnimationFrame(tick);
}

export function registerRibbon(canvas: HTMLCanvasElement) {
  canvases.add(canvas);
  if (frame === null) {
    startedAt = performance.now();
    frame = requestAnimationFrame(tick);
  }
  return () => {
    canvases.delete(canvas);
    if (canvases.size === 0 && frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  };
}

export function setRibbonMotion(next: boolean) {
  animating = next;
}
