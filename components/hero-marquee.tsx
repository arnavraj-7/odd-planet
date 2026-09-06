"use client";

import { useEffect, useRef } from "react";

import { heroTiles, type HeroTile } from "@/lib/content";

function Tile({ tile }: { tile: HeroTile }) {
  return (
    <div
      style={{ aspectRatio: tile.ratio }}
      className="w-full shrink-0 overflow-hidden rounded-lg border border-ink-300 bg-ink-100"
    >
      {tile.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tile.src}
          alt=""
          draggable={false}
          className="block size-full object-cover select-none"
        />
      ) : (
        <div className="flex size-full items-center justify-center px-3 text-center">
          <span className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-ink-500">
            {tile.label}
          </span>
        </div>
      )}
    </div>
  );
}

/** One column. The track is duplicated so the loop has no seam. */
function Column({
  tiles,
  direction,
  duration,
}: {
  tiles: HeroTile[];
  direction: "up" | "down";
  duration: number;
}) {
  return (
    <div className="relative h-full overflow-hidden">
      <div
        data-marquee
        style={{ animationDuration: `${duration}s` }}
        className={`flex flex-col gap-[clamp(10px,1.1vw,16px)] ${
          direction === "up" ? "animate-column-up" : "animate-column-down"
        }`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 flex-col gap-[clamp(10px,1.1vw,16px)]"
          >
            {tiles.map((tile) => (
              <Tile key={`${copy}-${tile.label}`} tile={tile} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Two vertical columns of campaign tiles beside the hero copy, travelling in
 * opposite directions. Proportions are deliberately mixed — a column of equal
 * rectangles reads as a table, not a reel.
 *
 * Edges are masked to the page ground so tiles dissolve rather than clip.
 */
export function HeroMarquee() {
  const ref = useRef<HTMLAnchorElement>(null);

  // A pair of infinite compositor animations is not worth running off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          el.querySelectorAll<HTMLElement>("[data-marquee]").forEach((track) => {
            track.style.animationPlayState = entry.isIntersecting ? "" : "paused";
          });
        }
      },
      { rootMargin: "200px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href="#work"
      aria-label="View our work"
      className="relative block cursor-pointer h-[clamp(320px,64svh,660px)] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_13%,#000_87%,transparent_100%)] max-[900px]:h-[38svh]"
    >
      <div className="grid h-full grid-cols-2 gap-[clamp(10px,1.1vw,16px)]">
        <Column tiles={heroTiles[0]} direction="up" duration={38} />
        <Column tiles={heroTiles[1]} direction="down" duration={46} />
      </div>
    </a>
  );
}
