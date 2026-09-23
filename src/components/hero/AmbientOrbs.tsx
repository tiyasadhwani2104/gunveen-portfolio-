"use client";

import { useMotionCapability } from "@/lib/motion";

/**
 * Soft, slow-drifting blurred colour fields behind the hero text — ambient
 * texture, not a competing visual object.
 *
 * Pure CSS `@keyframes` (see globals.css), not Framer Motion's `animate`
 * loop — a JS-driven animation recomputes every frame on the main thread,
 * which was contributing to jank during page transitions. CSS keyframes on
 * `transform` run entirely on the compositor thread, so this now costs
 * nothing regardless of what else is happening (like a curtain transition
 * firing right as you navigate away).
 */
export default function AmbientOrbs() {
  const capability = useMotionCapability();
  if (capability !== "full") return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="animate-drift-a absolute -top-32 right-[-10%] h-[60vw] max-h-[520px] w-[60vw] max-w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #CDE3E8 0%, transparent 70%)" }}
      />
      <div
        className="animate-drift-b absolute bottom-[-15%] left-[-8%] h-[45vw] max-h-[420px] w-[45vw] max-w-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #FFF8CA 0%, transparent 70%)" }}
      />
    </div>
  );
}
