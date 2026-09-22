"use client";

import { useSyncExternalStore } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

const QUERIES = ["(pointer: coarse)", "(prefers-reduced-motion: reduce)"];

function subscribe(onChange: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

function getSnapshot() {
  return !isTouchDevice() && !prefersReducedMotion();
}

/**
 * True only on fine-pointer devices whose owner hasn't asked for reduced
 * motion. Always false during SSR, so cursor layers never reach the server.
 */
export function useCursorEnabled() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
