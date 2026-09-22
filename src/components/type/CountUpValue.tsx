"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const NUMBER_RE = /[\d,]*\d(?:\.\d+)?/g;

type Parsed = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  grouped: boolean;
};

/**
 * Pull a single number out of a metric string, keeping everything around it.
 *
 *   "-32%"    → { prefix: "-", target: 32,   suffix: "%"    }
 *   "+21 pts" → { prefix: "+", target: 21,   suffix: " pts" }
 *   "1,200+"  → { prefix: "",  target: 1200, suffix: "+"    }
 *
 * Returns null when there is no number, or more than one ("6 → 3"), so those
 * values are simply revealed instead of counted.
 */
export function parseMetric(value: string): Parsed | null {
  const matches = value.match(NUMBER_RE);
  if (!matches || matches.length !== 1) return null;

  const raw = matches[0];
  const index = value.indexOf(raw);
  const numeric = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return null;

  const dot = raw.indexOf(".");
  return {
    prefix: value.slice(0, index),
    suffix: value.slice(index + raw.length),
    target: numeric,
    decimals: dot === -1 ? 0 : raw.length - dot - 1,
    grouped: raw.includes(","),
  };
}

type CountUpValueProps = {
  value: string;
  className?: string;
  delay?: number;
  duration?: number;
};

/**
 * Counts a metric value up when it scrolls into view, preserving the exact
 * prefix/suffix of the source string. The rendered markup always contains the
 * real value, so SSR, reduced motion and a JS failure all show the truth.
 */
export default function CountUpValue({
  value,
  className,
  delay = 0,
  duration = 1.6,
}: CountUpValueProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const parsed = parseMetric(value);
    if (!parsed) return;

    const format = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: parsed.decimals,
      maximumFractionDigits: parsed.decimals,
      useGrouping: parsed.grouped,
    });

    const ctx = gsap.context(() => {
      const counter = { n: 0 };

      gsap.to(counter, {
        n: parsed.target,
        duration,
        delay,
        ease: "power2.out",
        // Reset to zero only once the tween actually starts, so a trigger that
        // never fires leaves the authored value on screen.
        onStart() {
          el.textContent = `${parsed.prefix}${format.format(0)}${parsed.suffix}`;
        },
        onUpdate() {
          el.textContent = `${parsed.prefix}${format.format(counter.n)}${parsed.suffix}`;
        },
        onComplete() {
          // Restore the authored string byte-for-byte.
          el.textContent = value;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      el.textContent = value;
    };
  }, [value, delay, duration]);

  return (
    <p ref={ref} className={className}>
      {value}
    </p>
  );
}
