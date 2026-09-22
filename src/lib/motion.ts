"use client";

// ─────────────────────────────────────────────────────────────
// Shared motion foundation. Every animated component imports
// GSAP from here so plugins are registered exactly once.
// ─────────────────────────────────────────────────────────────

import { useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, Observer, SplitText, Flip);
}

export { gsap, ScrollTrigger, Draggable, InertiaPlugin, Observer, SplitText, Flip };

/** Shared easing curves so motion feels like one system. */
export const EASE = {
  /** Default: fast out, slow settle. Use for most reveals. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Curtain / panel transitions. */
  inOut: [0.76, 0, 0.24, 1] as const,
  /** GSAP string equivalents. */
  gsapOut: "power3.out",
  gsapInOut: "power4.inOut",
};

/** Brand palette in hex — for canvas/WebGL, which can't read Tailwind classes. */
export const PALETTE = {
  rosewood: "#6B0B0C",
  lemonChiffon: "#FFF8CA",
  coffeeBean: "#2D120D",
  botticelli: "#CDE3E8",
} as const;

/** True when the visitor asked for reduced motion. Always check before heavy animation. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on coarse-pointer devices (phones/tablets) — skip cursor-driven effects there. */
export function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

const MOTION_QUERIES = ["(prefers-reduced-motion: reduce)", "(pointer: coarse)"];

function subscribeMotionCapability(onChange: () => void) {
  const lists = MOTION_QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

function readMotionCapability(): "full" | "static" {
  return prefersReducedMotion() || isTouchDevice() ? "static" : "full";
}

/**
 * Hydration-safe capability check for decorative motion: "full" once mounted
 * on a fine-pointer device with no reduced-motion preference, "static"
 * everywhere else (including the server render, so there's no mismatch).
 * Re-evaluates live if the visitor flips the OS setting or docks a tablet.
 */
export function useMotionCapability(): "full" | "static" {
  return useSyncExternalStore(subscribeMotionCapability, readMotionCapability, () => "static");
}
