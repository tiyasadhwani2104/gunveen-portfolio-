"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Wraps any inline element (a button, a link) so it subtly pulls toward the
 * cursor as it approaches, then springs back on leave. A tasteful, common
 * "senior portfolio" touch — skipped on touch devices (no hover to react
 * to) and under reduced motion.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const disabled = typeof window !== "undefined" && (isTouchDevice() || prefersReducedMotion());

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={disabled ? undefined : { x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
