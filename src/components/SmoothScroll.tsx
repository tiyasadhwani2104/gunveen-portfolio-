"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    // Keep GSAP ScrollTrigger in sync with Lenis's smoothed scroll position,
    // and drive Lenis from GSAP's ticker instead of a separate rAF loop so
    // scroll-scrubbed animations (parallax, etc.) read the right value.
    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Reveal animations use `gsap.from`, which renders immediately — the target
    // sits hidden until its ScrollTrigger fires. So a trigger measured against a
    // stale layout leaves content permanently invisible. Late arrivals (fonts,
    // the WebGL canvas, the showreel, client-only sections) all change height
    // after triggers are created, so re-measure once each settles.
    const refresh = () => ScrollTrigger.refresh();

    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
