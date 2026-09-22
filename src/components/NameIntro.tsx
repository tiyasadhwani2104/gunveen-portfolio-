"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

const SESSION_KEY = "gv-intro-seen";
const NAME = siteConfig.name.toUpperCase();

export default function NameIntro() {
  const [phase, setPhase] = useState<"pending" | "visible" | "done">("pending");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || sessionStorage.getItem(SESSION_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only init, gated by sessionStorage so it never loops
      setPhase("done");
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("visible");

    // Hold the page still behind the overlay, otherwise a scroll during the
    // intro means it lifts to reveal the middle of the page.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const timer = setTimeout(() => {
      root.style.overflow = previousOverflow;
      setPhase("done");
    }, 2200);

    return () => {
      clearTimeout(timer);
      root.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "pending") return null;

  return (
    <AnimatePresence>
      {phase === "visible" && (
        <motion.div
          key="name-intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="flex">
            {NAME.split("").map((letter, i) => (
              <span key={i} className="overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display inline-block text-[16vw] font-semibold leading-none tracking-tight text-foreground sm:text-[9vw]"
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + NAME.length * 0.05 + 0.15 }}
            className="mt-5 text-xs font-medium uppercase tracking-[0.35em] text-accent"
          >
            {siteConfig.role}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
