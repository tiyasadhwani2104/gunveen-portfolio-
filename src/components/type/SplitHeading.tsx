"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode, RefObject } from "react";
import { gsap, SplitText, EASE, prefersReducedMotion } from "@/lib/motion";

type SplitHeadingProps = {
  children: ReactNode;
  /** Rendered tag — keep the semantic heading level of the original markup. */
  as?: ElementType;
  className?: string;
  /** Seconds before the first line moves. */
  delay?: number;
  /** Seconds between lines. */
  stagger?: number;
  duration?: number;
  /** Play on mount instead of waiting for the element to scroll in. */
  immediate?: boolean;
  /** ScrollTrigger start, ignored when `immediate`. */
  start?: string;
};

/**
 * Masked, line-by-line heading reveal built on GSAP SplitText.
 *
 * Every line is wrapped in an `overflow:hidden` mask and slides up into place
 * with a stagger. `autoSplit` re-splits on resize / font swap, `aria: "auto"`
 * keeps the original string on the element for screen readers, and everything
 * is created inside a `gsap.context()` so a single `revert()` cleans up the
 * tween, the ScrollTrigger and the injected DOM on unmount.
 *
 * Reduced motion, or a failure to load fonts, leaves the text plainly visible.
 */
export default function SplitHeading({
  children,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.09,
  duration = 0.9,
  immediate = false,
  start = "top 88%",
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let cancelled = false;
    let ctx: gsap.Context | undefined;

    // Splitting before webfonts settle measures the wrong line boxes.
    const ready =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : Promise.resolve();

    ready
      .then(() => {
        if (cancelled || !ref.current) return;

        ctx = gsap.context(() => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            aria: "auto",
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 120,
                opacity: 0,
                duration,
                delay,
                stagger,
                ease: EASE.gsapOut,
                // NOTE: `from` renders immediately, so the lines sit hidden
                // until this trigger fires. If layout shifts after the trigger
                // is measured the text can stay invisible — SmoothScroll
                // re-runs ScrollTrigger.refresh() once fonts and late content
                // settle. Don't remove that refresh.
                scrollTrigger: immediate
                  ? undefined
                  : {
                      trigger: el,
                      start,
                      once: true,
                      invalidateOnRefresh: true,
                    },
              });
            },
          });
        }, el);
      })
      .catch(() => {
        /* fonts API rejected — leave the static text in place */
      });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [delay, stagger, duration, immediate, start]);

  const Tag = as as "h2";
  return (
    <Tag ref={ref as RefObject<HTMLHeadingElement | null>} className={className}>
      {children}
    </Tag>
  );
}
