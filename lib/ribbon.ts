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

/** DPR is capped hard on small screens — it is a blurred field, nobody can tell. */
export function sizeRibbon(canvas: HTMLCanvasElement) {
  const cap = window.innerWidth < 700 ? 1.4 : 2;
  const dpr = Math.min(cap, window.devicePixelRatio || 1);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return false;

  const width = Math.round(w * dpr);
  const height = Math.round(h * dpr);
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
let animating = true;

function tick(now: number) {
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
