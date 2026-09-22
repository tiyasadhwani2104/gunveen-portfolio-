"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import SplitHeading from "@/components/type/SplitHeading";
import Reveal from "@/components/Reveal";
import { testimonials } from "@/lib/data";
import CommentCard from "./CommentCard";
import Certifications from "./Certifications";

/**
 * References, structured as a comment feed rather than a quote carousel:
 * each organisation's words are a comment replying to the role Gunveen held.
 *
 * Animation is handled entirely by SplitHeading / StaggerGroup / Reveal, which
 * respect `prefersReducedMotion()` and revert their GSAP contexts on unmount;
 * every element's resting state is visible, so nothing can stick at opacity 0.
 *
 * The comment feed is the exception: each whole card (badge included) is
 * driven off one `useInView` on the feed as a unit, not GSAP's per-item
 * ScrollTrigger and not each card's own visibility. That makes the four
 * cards land as one deliberate cascade — 1, then 2, then 3, then 4 — the
 * moment the section scrolls into view, instead of each card and its badge
 * animating on two separate, loosely-synced triggers.
 */
export default function TestimonialsSection() {
  const feedRef = useRef<HTMLDivElement>(null);
  const feedRevealed = useInView(feedRef, { once: true, margin: "-15% 0px -15% 0px" });

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">References</p>
        </Reveal>

        <SplitHeading className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          What people say when I&apos;m not in the room
        </SplitHeading>

        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-muted">
            13+ months. 4 organisations. In their words, not mine.
          </p>
        </Reveal>

        {/* ── COMMENT FEED ─────────────────────────────────── */}
        <div ref={feedRef} className="relative mt-14 max-w-3xl">
          {/* The thread spine, sitting behind the indented comments. */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-2 top-2 bottom-2 hidden w-px bg-line/60 sm:block"
          />

          <ol className="space-y-6 sm:pl-10">
            {testimonials.map((testimonial, index) => (
              <li key={testimonial.id} className="relative">
                {/* Connector from the spine into this comment. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-8 top-8 hidden h-px w-8 bg-line/60 sm:block"
                />
                <CommentCard testimonial={testimonial} index={index} revealed={feedRevealed} />
              </li>
            ))}
          </ol>
        </div>

        {/* ── CERTIFICATIONS ───────────────────────────────── */}
        <Certifications />
      </div>
    </section>
  );
}
