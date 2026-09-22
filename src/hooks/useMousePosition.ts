"use client";

import { useEffect, useRef } from "react";

export type MousePos = { x: number; y: number; nx: number; ny: number };

/**
 * Tracks the pointer without re-rendering: read `ref.current` inside a rAF
 * or GSAP ticker. `x/y` are pixels, `nx/ny` are normalized -1..1 from center.
 */
export function useMousePosition() {
  const pos = useRef<MousePos>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    function onMove(e: PointerEvent) {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      pos.current.nx = (e.clientX / window.innerWidth) * 2 - 1;
      pos.current.ny = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pos;
}
