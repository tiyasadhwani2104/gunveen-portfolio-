"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { gsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PlaceholderMediaProps = {
  label?: string;
  accent?: string; // tailwind gradient "from-x via-y to-z"
  className?: string;
  aspect?: string; // e.g. "aspect-[4/3]"
  parallax?: boolean;
  /** Real image path. When set, this renders instead of the gradient. */
  src?: string;
  /** Describe the image for screen readers; falls back to `label`. */
  alt?: string;
  /** True for above-the-fold images, so Next preloads rather than lazy-loads. */
  priority?: boolean;
  /** `contain` suits diagrams and slides; `cover` suits photographs. */
  fit?: "cover" | "contain";
};

export default function PlaceholderMedia({
  label = "Add image",
  accent = "from-[#FFF8CA] via-[#F3E7B0] to-[#CDE3E8]",
  className,
  aspect = "aspect-[4/3]",
  parallax = true,
  src,
  alt,
  priority = false,
  fit = "cover",
}: PlaceholderMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  // A `contain` image is letterboxed to fit, so shifting it would expose the
  // edges — only parallax the layer when it actually fills the frame.
  const parallaxEnabled = parallax && !(src && fit === "contain");

  useEffect(() => {
    if (!parallaxEnabled || !containerRef.current || !layerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layerRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [parallaxEnabled]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-2xl", aspect, className)}
    >
      {src ? (
        <div
          ref={layerRef}
          className={cn("absolute", parallaxEnabled ? "inset-[-12%]" : "inset-0")}
        >
          <Image
            src={src}
            alt={alt ?? label}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1100px"
            className={fit === "contain" ? "object-contain" : "object-cover"}
          />
        </div>
      ) : (
        <>
          <div ref={layerRef} className={cn("absolute inset-[-12%] bg-gradient-to-br", accent)}>
            <motion.div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.08), transparent 45%)",
              }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#2D120D]/50">
            <ImageIcon size={22} strokeWidth={1.5} />
            <span className="text-xs font-medium tracking-wide uppercase">{label}</span>
          </div>
        </>
      )}
    </div>
  );
}
