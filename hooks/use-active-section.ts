"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy. Observes the given section ids through a ~5%-tall band across
 * the middle of the viewport and returns whichever one is crossing it.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
