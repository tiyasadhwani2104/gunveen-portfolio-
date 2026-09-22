"use client";

import { useSyncExternalStore } from "react";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/** Subscribes to the reduced-motion media query; server/first render is `false`. */
function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

type PhotoSlotProps = {
  /** What Gunveen should drop in here — shown on the placeholder. */
  label: string;
  /** Tailwind gradient string, e.g. "from-x via-y to-z". */
  accent?: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]". */
  aspect?: string;
  className?: string;
  /** Real photo path — renders instead of the placeholder when set. */
  src?: string;
};

/**
 * One photo slot in the "Beyond the brief" grid.
 *
 * No real imagery exists yet, so every slot renders a `PlaceholderMedia`
 * labelled with the item's `photoLabel`. To swap in a real photo later,
 * replace the single `<PlaceholderMedia />` below with:
 *
 *   <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 40vw"
 *          className="rounded-2xl object-cover" />
 *
 * and keep the wrapper (it carries the aspect ratio, the hover lift and the
 * `data-cursor` hook).
 */
export default function PhotoSlot({ label, accent, aspect, className, src }: PhotoSlotProps) {
  // Parallax is decorative: drop it for visitors who asked for reduced motion.
  // Resolved after hydration, so server and first client render agree.
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => prefersReducedMotion(),
    () => false
  );

  return (
    <figure
      data-cursor="view"
      className={cn(
        "relative transition-transform duration-500 ease-out will-change-transform",
        "hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <PlaceholderMedia
        label={label}
        accent={accent}
        aspect={aspect}
        src={src}
        alt={src ? label : undefined}
        parallax={!reduced}
        className="h-full w-full"
      />
    </figure>
  );
}
