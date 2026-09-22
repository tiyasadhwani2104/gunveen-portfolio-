"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

// Three.js cannot be server-rendered — this must stay `ssr: false`.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/** Static stand-in for phones and reduced-motion visitors: no WebGL cost. */
function StaticGlow({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none", className)} aria-hidden>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#CDE3E8_0%,#FFF8CA_28%,#6B0B0C_62%,transparent_78%)] opacity-25 blur-2xl" />
    </div>
  );
}

const MEDIA_QUERIES = ["(prefers-reduced-motion: reduce)", "(pointer: coarse)"];

/** Re-evaluates if the visitor flips reduced motion or docks a tablet mid-visit. */
function subscribe(onChange: () => void) {
  const lists = MEDIA_QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

function getSnapshot(): "webgl" | "static" {
  return prefersReducedMotion() || isTouchDevice() ? "static" : "webgl";
}

/** Server render: assume the cheap path, then correct after hydration. */
function getServerSnapshot(): "webgl" | "static" {
  return "static";
}

/**
 * Decorative hero object. Sits behind the hero copy — text legibility always
 * wins, so this is offset to the right and kept at a low opacity.
 */
export default function HeroVisual({ className }: { className?: string }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (mode === "static") {
    return <StaticGlow className={cn("absolute", className)} />;
  }

  return (
    <div className={cn("pointer-events-none absolute", className)} aria-hidden>
      <HeroCanvas />
    </div>
  );
}
