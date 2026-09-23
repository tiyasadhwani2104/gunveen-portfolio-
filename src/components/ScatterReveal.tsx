"use client";

import { useEffect, useRef, Children, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import { gsap, useMotionCapability } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Each child starts rotated and offset, as if dropped in a loose scattered
 * pile, then straightens into its normal grid position as it scrolls into
 * view. Offsets are index-seeded (not random), so server and client render
 * identically and there's no hydration mismatch.
 *
 * Ported from a reference site's scattered-card scroll reveal — rebuilt
 * from scratch with GSAP (already installed) rather than copied markup.
 */

const ROTATIONS = [-7, 5, -4, 8, -6, 3];
const OFFSETS = [
  { x: -18, y: 26 },
  { x: 22, y: -20 },
  { x: -14, y: -24 },
  { x: 20, y: 18 },
];

export default function ScatterReveal({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const capability = useMotionCapability();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];

  useEffect(() => {
    if (capability !== "full") return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const els = itemRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!els.length) return;

      els.forEach((el, i) => {
        gsap.set(el, {
          rotation: ROTATIONS[i % ROTATIONS.length],
          x: OFFSETS[i % OFFSETS.length].x,
          y: OFFSETS[i % OFFSETS.length].y,
        });
      });

      gsap.to(els, {
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.9,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 82%",
          once: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [capability, stagger, items.length]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {items.map((child, i) => (
        <div
          key={child.key ?? i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          style={capability === "full" ? { willChange: "transform" } : undefined}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
