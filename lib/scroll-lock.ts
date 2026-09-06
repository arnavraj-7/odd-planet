/**
 * Locks page scroll without letting the layout jump sideways.
 *
 * html owns the viewport scrollbar here (overflow-x and scrollbar-gutter both
 * sit on it), so the lock and the width compensation belong on html too.
 */
export function lockScroll() {
  const el = document.documentElement;
  const gap = window.innerWidth - el.clientWidth;
  el.style.overflow = "hidden";
  if (gap > 0) el.style.paddingRight = `${gap}px`;
}

export function unlockScroll() {
  const el = document.documentElement;
  el.style.overflow = "";
  el.style.paddingRight = "";
}
