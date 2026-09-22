"use client";

import { useEffect, useRef } from "react";
import { gsap, PALETTE } from "@/lib/motion";
import { useCursorEnabled } from "./useCursorEnabled";

/**
 * Dot + lagging ring cursor.
 *
 * Driven entirely by `gsap.quickTo` — pointer movement never touches React
 * state, so nothing re-renders on mousemove.
 *
 * Opt elements into hover states with:
 *   data-cursor="view" | "link" | "drag" | "hidden"
 *   data-cursor-label="Custom text"   (optional, overrides the default label)
 */

type CursorMode = "default" | "view" | "link" | "drag" | "hidden";

const MODES: Record<
  CursorMode,
  { size: number; label: string; border: string; fill: string; dot: number }
> = {
  default: { size: 38, label: "", border: PALETTE.botticelli, fill: "rgba(205,227,232,0)", dot: 6 },
  view: { size: 96, label: "View", border: "rgba(205,227,232,0)", fill: PALETTE.botticelli, dot: 0 },
  link: { size: 60, label: "", border: PALETTE.lemonChiffon, fill: "rgba(255,248,202,0.12)", dot: 4 },
  drag: { size: 88, label: "Drag", border: PALETTE.lemonChiffon, fill: "rgba(255,248,202,0.1)", dot: 0 },
  hidden: { size: 0, label: "", border: "rgba(205,227,232,0)", fill: "rgba(205,227,232,0)", dot: 0 },
};

function readMode(el: Element | null): CursorMode {
  const host = el?.closest?.("[data-cursor]") as HTMLElement | null;
  const raw = host?.dataset.cursor;
  if (raw && raw in MODES) return raw as CursorMode;
  return "default";
}

function readLabel(el: Element | null, mode: CursorMode): string {
  const host = el?.closest?.("[data-cursor]") as HTMLElement | null;
  return host?.dataset.cursorLabel ?? MODES[mode].label;
}

export default function CustomCursor() {
  const enabled = useCursorEnabled();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!dotRef.current || !ringRef.current || !labelRef.current) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    const quick = {
      dotX: gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" }),
      dotY: gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" }),
      ringX: gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" }),
      ringY: gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" }),
    };

    let visible = false;
    let mode: CursorMode = "default";
    let pressed = false;

    function show() {
      if (visible) return;
      visible = true;
      // Hide the native cursor only once we are actually painting one, so
      // there is never a frame with no cursor at all (e.g. before the first
      // pointer move, or after the pointer leaves and re-enters the window).
      document.body.dataset.customCursor = "on";
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25, overwrite: "auto" });
    }

    function hide() {
      if (!visible) return;
      visible = false;
      // Give the native cursor back while ours is faded out.
      delete document.body.dataset.customCursor;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
    }

    function applyMode(next: CursorMode, text: string) {
      const spec = MODES[next];
      mode = next;
      gsap.to(ring, {
        width: spec.size,
        height: spec.size,
        borderColor: spec.border,
        backgroundColor: spec.fill,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        width: spec.dot,
        height: spec.dot,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
      if (label.textContent !== text) label.textContent = text;
      gsap.to(label, {
        autoAlpha: text ? 1 : 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    function onMove(e: PointerEvent) {
      quick.dotX(e.clientX);
      quick.dotY(e.clientY);
      quick.ringX(e.clientX);
      quick.ringY(e.clientY);
      show();
    }

    function onOver(e: PointerEvent) {
      const target = e.target as Element | null;
      const next = readMode(target);
      const text = readLabel(target, next);
      if (next !== mode || label.textContent !== text) applyMode(next, text);
    }

    function onDown() {
      pressed = true;
      gsap.to(ring, { scale: 0.78, duration: 0.25, ease: "power3.out", overwrite: "auto" });
    }

    function onUp() {
      if (!pressed) return;
      pressed = false;
      gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    }

    // Prime position so the first move doesn't fly in from 0,0.
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    applyMode("default", "");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      gsap.killTweensOf([dot, ring, label]);
      delete document.body.dataset.customCursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border will-change-transform"
        style={{ borderWidth: 1, opacity: 0 }}
      >
        <span
          ref={labelRef}
          className="font-display select-none text-[10px] uppercase tracking-[0.18em] text-[#2D120D]"
          style={{ opacity: 0 }}
        />
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full bg-[#FFF8CA] will-change-transform"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
