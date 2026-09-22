"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion";
import { useCursorEnabled } from "./useCursorEnabled";
import { galleryItems, type GalleryItem } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * k95.it-style image trail. Pointer movement inside the container spawns
 * tiles along the path, each fading / scaling / drifting out behind the
 * cursor. A fixed pool of DOM nodes is recycled — nothing is created or
 * destroyed at runtime, and spawning is throttled by distance travelled.
 */

type ImageTrailProps = {
  children?: ReactNode;
  className?: string;
  /** Tiles to keep in the recycled pool. */
  poolSize?: number;
  /** Pixels the pointer must travel before the next tile spawns. */
  threshold?: number;
  /** Tile footprint in px. */
  tileWidth?: number;
  tileHeight?: number;
  /** Override the tiles — defaults to `galleryItems`. */
  items?: GalleryItem[];
};

export default function ImageTrail({
  children,
  className,
  poolSize = 14,
  threshold = 90,
  tileWidth = 180,
  tileHeight = 220,
  items = galleryItems,
}: ImageTrailProps) {
  const enabled = useCursorEnabled();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Each pool slot owns a fixed gallery item, so gradient classes stay
  // static (Tailwind-safe) and the DOM never churns.
  const pool = useMemo(
    () =>
      Array.from({ length: poolSize }, (_, i) => ({
        key: `trail-${i}`,
        item: items[i % items.length],
      })),
    [poolSize, items],
  );

  useEffect(() => {
    if (!enabled) return;
    if (!containerRef.current) return;
    const container = containerRef.current;
    const tiles = tileRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!tiles.length) return;

    gsap.set(tiles, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.7 });

    let index = 0;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let zIndex = 1;

    function spawn(x: number, y: number, speed: number) {
      const tile = tiles[index % tiles.length];
      index += 1;
      zIndex += 1;

      gsap.killTweensOf(tile);
      tile.style.zIndex = String(zIndex);

      const drift = gsap.utils.clamp(-40, 40, speed * 0.35);
      const rotation = gsap.utils.random(-14, 14);

      gsap
        .timeline()
        .set(tile, { x, y, rotation: rotation * 0.4, scale: 0.72, autoAlpha: 0 })
        .to(tile, {
          autoAlpha: 1,
          scale: 1,
          rotation,
          duration: 0.38,
          ease: "power3.out",
        })
        .to(
          tile,
          {
            autoAlpha: 0,
            scale: 0.86,
            y: y + 36,
            x: x + drift,
            duration: 0.85,
            ease: "power2.inOut",
          },
          ">-0.1",
        );
    }

    function onMove(e: PointerEvent) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastX === null || lastY === null) {
        lastX = x;
        lastY = y;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.hypot(dx, dy);
      if (distance < threshold) return;

      lastX = x;
      lastY = y;
      spawn(x, y, dx);
    }

    function onLeave() {
      lastX = null;
      lastY = null;
    }

    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(tiles);
    };
  }, [enabled, threshold]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* `isolate` keeps the tiles' ever-incrementing z-index inside their own
          stacking context, so they can never climb over the page content. */}
      {enabled && (
        <div aria-hidden className="pointer-events-none absolute inset-0 isolate overflow-hidden">
          {pool.map(({ key, item }, i) => (
            <div
              key={key}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              className="absolute left-0 top-0 overflow-hidden rounded-[2px] will-change-transform"
              style={{ width: tileWidth, height: tileHeight, opacity: 0 }}
            >
              {item.src ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.src})` }}
                />
              ) : (
                <div
                  className={cn(
                    "flex h-full w-full items-end bg-gradient-to-br p-3",
                    item.accent,
                  )}
                >
                  <span className="font-display text-[10px] uppercase tracking-[0.16em] text-[#2D120D]">
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
