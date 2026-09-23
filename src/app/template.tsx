"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useMotionCapability } from "@/lib/motion";

// Persists across client-side navigations (a fresh module in the browser's
// tab lifetime, reset only on a hard reload) but NOT across server renders —
// nothing here ever mutates during SSR, so there's no cross-request leakage.
// Lets the curtain skip the very first page load (NameIntro already owns
// that moment) and only play on actual in-app navigation.
let hasNavigatedBefore = false;

/**
 * Runs fresh on every route change (unlike layout.tsx, which persists).
 * Next's App Router doesn't wait for an exit animation before swapping
 * content, so true old-page-fades-out-first isn't reliable here — instead
 * the curtain covers the new page the instant it mounts (already rendered
 * underneath) and wipes away, reading as a deliberate reveal rather than a
 * hard cut. Skipped entirely under reduced motion or on first load.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const capability = useMotionCapability();
  const showCurtain = capability === "full" && hasNavigatedBefore;

  useEffect(() => {
    hasNavigatedBefore = true;
  }, []);

  return (
    <>
      {showCurtain ? (
        <motion.div
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "top" }}
          className="pointer-events-none fixed inset-0 z-[90] bg-background"
        />
      ) : null}
      <motion.div
        initial={showCurtain ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: showCurtain ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
