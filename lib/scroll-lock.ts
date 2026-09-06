/** Locks page scroll without letting the layout jump sideways. */
export function lockScroll() {
  const gap = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (gap > 0) document.body.style.paddingRight = `${gap}px`;
}

export function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}
