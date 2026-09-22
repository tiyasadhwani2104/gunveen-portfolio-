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

    // Two separate things need re-measuring whenever the page's height
    // changes after load — late images, fonts, client-only sections (the
    // work columns, the carousel), anything that mounts or resizes after
    // first paint:
    //   1. GSAP ScrollTrigger — stale trigger positions leave `gsap.from`
    //      reveals stuck invisible (they render hidden until their trigger
    //      fires).
    //   2. Lenis itself — it caches the document's total scrollable height
    //      separately from the browser, to clamp and smooth scroll position.
    //      If that cache goes stale (too short), Lenis physically refuses to
    //      scroll past the old boundary, which is why the page can feel like
    //      it "stops halfway." `ScrollTrigger.refresh()` does NOT update
    //      this — Lenis needs its own `.resize()` call.
    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    // Covers everything the two one-off triggers above can miss: content
    // that mounts, grows, or shrinks at any point during the session.
    const resizeObserver = new ResizeObserver(() => refresh());
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
