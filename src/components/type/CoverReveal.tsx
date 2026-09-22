"use client";

import { useEffect, useRef } from "react";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CoverRevealProps = {
  label: string;
  accent?: string;
  src?: string;
  fit?: "cover" | "contain";
  aspect?: string;
  className?: string;
};

/**
 * Scrubbed cover sequence for a case study: the frame un-insets as the image
 * enters, the media de-zooms to 1:1, then drifts as the frame leaves. Driven
 * by one scrubbed ScrollTrigger plus a short clip reveal, both scoped to a
 * `gsap.context()`. `PlaceholderMedia` gets `parallax={false}` so its own
 * ScrollTrigger doesn't fight this one.
 */
export default function CoverReveal({
  label,
  accent,
  src,
  fit,
  aspect = "aspect-[16/9]",
  className,
}: CoverRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { clipPath: "inset(10% 8% 10% 8% round 16px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top 92%",
            end: "top 38%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          inner,
          { scale: 1.18, yPercent: -6 },
          { scale: 1, yPercent: 0, ease: "none", duration: 0.55 }
        )
        .to(inner, { yPercent: 8, ease: "none", duration: 0.45 });
    }, frame);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={frameRef}
      data-cursor="view"
      className={cn("overflow-hidden rounded-2xl", className)}
    >
      <div ref={innerRef} className="will-change-transform">
        <PlaceholderMedia
          label={label}
          accent={accent}
          src={src}
          fit={fit}
          alt={label}
          priority
          aspect={aspect}
          parallax={false}
        />
      </div>
    </div>
  );
}
