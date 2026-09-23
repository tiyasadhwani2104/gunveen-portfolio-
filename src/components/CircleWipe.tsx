"use client";

import { useEffect, useRef } from "react";
import { gsap, useMotionCapability } from "@/lib/motion";

/**
 * A section-transition moment: a solid circle grows from a point to fully
 * cover the viewport as you scroll through it, then recedes again — an iris
 * wipe rather than a permanent colour change, so the page stays on-brand
 * (Rosewood) before and after. Pinned to the scroll position with GSAP
 * ScrollTrigger, so the growth is driven by scroll distance, not time.
 *
 * Ported from a reference site's expanding-circle scroll transition —
 * rebuilt from scratch with this site's own palette and mechanics, not
 * copied markup.
 */
export default function CircleWipe({
  color = "var(--color-accent)",
  label,
}: {
  color?: string;
  label?: string;
}) {
  const capability = useMotionCapability();
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (capability !== "full") return;
    const section = sectionRef.current;
    const circle = circleRef.current;
    if (!section || !circle) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 0.5,
          pin: true,
        },
      });

      tl.fromTo(circle, { scale: 0 }, { scale: 3.2, ease: "power1.in", duration: 1 })
        .to(circle, { scale: 0, ease: "power1.out", duration: 1 }, ">-0.05");
    }, section);

    return () => ctx.revert();
  }, [capability]);

  if (capability !== "full") return null;

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={circleRef}
          className="h-40 w-40 rounded-full sm:h-56 sm:w-56"
          style={{ backgroundColor: color }}
        />
      </div>
      {label ? (
        <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-2xl font-semibold tracking-tight text-background sm:text-4xl">
          {label}
        </p>
      ) : null}
    </div>
  );
}
