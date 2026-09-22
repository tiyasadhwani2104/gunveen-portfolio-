"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode, RefObject } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  /** Wrapper tag — use `ul`/`ol` when the children are list items. */
  as?: ElementType;
  /** CSS selector for the items to stagger, relative to the wrapper. */
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
};

/**
 * Staggers a group of already-rendered children into view on scroll.
 *
 * NOTE: `gsap.from` renders immediately, so items sit hidden until the trigger
 * fires — a trigger measured against a stale layout leaves them invisible.
 * SmoothScroll re-runs ScrollTrigger.refresh() once fonts and late-mounting
 * content settle; don't remove it. Everything lives in a `gsap.context()` and
 * is reverted on unmount.
 */
export default function StaggerGroup({
  children,
  className,
  as = "div",
  selector = ":scope > *",
  y = 28,
  stagger = 0.07,
  duration = 0.8,
  delay = 0,
  start = "top 88%",
}: StaggerGroupProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.from(items, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: EASE.gsapOut,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [selector, y, stagger, duration, delay, start]);

  const Tag = as as "div";
  return (
    <Tag ref={ref as RefObject<HTMLDivElement | null>} className={className}>
      {children}
    </Tag>
  );
}
