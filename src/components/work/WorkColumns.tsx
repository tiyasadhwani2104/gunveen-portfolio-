"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import { gsap, ScrollTrigger, prefersReducedMotion, isTouchDevice } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/data";

type Mode = "pending" | "off" | "accordion" | "strip";

/** flex-grow values for the accordion state. */
const GROW_ACTIVE = 2.9;
const GROW_IDLE = 1;
const GROW_SQUEEZED = 0.72;

const MEDIA_QUERIES = ["(prefers-reduced-motion: reduce)", "(pointer: coarse)"];

/** Re-read the mode whenever motion preference or pointer type changes. */
function subscribeToEnvironment(onChange: () => void) {
  const lists = MEDIA_QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
}

function readMode(): Mode {
  if (prefersReducedMotion()) return "off";
  if (isTouchDevice()) return "strip";
  return "accordion";
}

/** During SSR and hydration we render nothing; the static grid carries the page. */
const serverMode = (): Mode => "pending";

/**
 * Kargo-style column accordion: the viewport is a row of tall vertical
 * panels; hovering (or focusing) one expands it and squeezes its siblings.
 *
 *  - `prefers-reduced-motion`  → renders nothing (page falls back to the grid)
 *  - coarse pointer            → renders a native horizontal scroll-snap strip,
 *                                so vertical page scrolling is never trapped
 */
export default function WorkColumns({ projects }: { projects: CaseStudy[] }) {
  const mode = useSyncExternalStore(subscribeToEnvironment, readMode, serverMode);
  const [active, setActive] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<Array<HTMLAnchorElement | null>>([]);

  // This block is client-only, so it lands in the page *after* the cards below
  // it have already created their ScrollTriggers. Without a refresh those
  // triggers keep the pre-mount start/end positions and the parallax desyncs.
  useEffect(() => {
    if (mode === "pending") return;
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  // Drive the accordion widths with GSAP.
  useEffect(() => {
    if (mode !== "accordion" || !rowRef.current) return;

    const panels = panelsRef.current.filter(Boolean) as HTMLAnchorElement[];
    panels.forEach((panel, i) => {
      const grow =
        active === null ? GROW_IDLE : i === active ? GROW_ACTIVE : GROW_SQUEEZED;
      gsap.to(panel, {
        flexGrow: grow,
        duration: 0.75,
        ease: "power3.out",
        overwrite: "auto",
      });
    });

    // Kill in-flight tweens on change/unmount; panels keep their current width,
    // so the next tween picks up smoothly from where this one stopped.
    return () => {
      gsap.killTweensOf(panels);
    };
  }, [mode, active]);

  if (mode === "pending" || mode === "off") return null;

  const isStrip = mode === "strip";

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          Selected work
        </p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
          {isStrip ? "Swipe sideways" : "Hover to expand"}
        </p>
      </div>

      <div
        ref={rowRef}
        className={cn(
          "mt-6 flex gap-2 sm:gap-3",
          isStrip
            ? "hide-scrollbar snap-x snap-mandatory overflow-x-auto overflow-y-hidden pb-2"
            : "overflow-hidden"
        )}
        onMouseLeave={isStrip ? undefined : () => setActive(null)}
      >
        {projects.map((project, i) => {
          const isActive = active === i;
          return (
            <Link
              key={project.slug}
              ref={(el) => {
                panelsRef.current[i] = el;
              }}
              href={`/work/${project.slug}`}
              data-cursor="view"
              aria-label={`${project.title} — ${project.category}`}
              className={cn(
                "group relative block h-[58vh] min-h-[380px] overflow-hidden rounded-2xl",
                "outline-none ring-accent/70 focus-visible:ring-2",
                isStrip
                  ? "w-[76vw] shrink-0 snap-center sm:w-[52vw]"
                  : "min-w-0 flex-1 basis-0"
              )}
              onMouseEnter={isStrip ? undefined : () => setActive(i)}
              onFocus={isStrip ? undefined : () => setActive(i)}
              onBlur={isStrip ? undefined : () => setActive(null)}
            >
              <PlaceholderMedia
                label={project.title}
                accent={project.coverAccent}
                src={project.coverSrc}
                alt={project.title}
                aspect=""
                parallax={false}
                className="absolute inset-0 h-full w-full rounded-2xl"
              />

              {/* Legibility scrim, deepest at the foot of the column. */}
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-t from-[#2D120D] via-[#2D120D]/35 to-transparent transition-opacity duration-500",
                  isActive || isStrip ? "opacity-85" : "opacity-60"
                )}
              />

              <span
                aria-hidden
                className="absolute left-4 top-4 rounded-full border border-[#FFF8CA]/30 bg-[#2D120D]/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFF8CA]"
              >
                {project.year}
              </span>

              {/* Collapsed state: vertical spine label. */}
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#FFF8CA] transition-opacity duration-300 [writing-mode:vertical-rl] [text-orientation:mixed]",
                  isActive || isStrip ? "opacity-0" : "opacity-90"
                )}
              >
                {project.category}
              </span>

              {/* Expanded state: full detail. */}
              <div
                aria-hidden
                className={cn(
                  "absolute inset-x-0 bottom-0 p-6 transition-all duration-500",
                  isActive || isStrip
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                )}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#FFF8CA]">
                  {project.title}
                </h3>
                <p className="mt-1 max-w-sm text-sm text-[#FFF8CA]/75">{project.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  View case study
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
