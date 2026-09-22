"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useMotionCapability } from "@/lib/motion";
import { caseStudies } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Hero visual: a rolodex of your real case-study covers, fanned out in 3D
 * and cycling continuously, with a mirrored reflection under the front card.
 *
 * Pure CSS 3D transforms driven by GSAP — no WebGL, so it's cheap on battery
 * and works everywhere `transform-style: preserve-3d` does (every modern
 * browser). Four fixed refs map 1:1 to the four case studies; each tick every
 * card advances one slot toward the front, and the card that was at the
 * front wraps around to the back.
 */

const INTERVAL_MS = 2800;
const TRANSITION_S = 1.15;

type Slot = {
  y: number;
  z: number;
  rotationX: number;
  scale: number;
  opacity: number;
  blur: number;
};

/** Front (index 0) to back (last). Front card is deliberately dominant — this
 * is the piece the whole visual exists to show. */
const SLOTS: Slot[] = [
  { y: 36, z: 60, rotationX: -4, scale: 1.1, opacity: 1, blur: 0 },
  { y: 2, z: -100, rotationX: 24, scale: 0.87, opacity: 0.72, blur: 1 },
  { y: -26, z: -210, rotationX: 46, scale: 0.72, opacity: 0.42, blur: 2 },
  { y: -50, z: -320, rotationX: 66, scale: 0.58, opacity: 0.18, blur: 3 },
];

/**
 * The card face. Images render with `object-contain` on a backdrop, never
 * `cover` — the source images (real screenshots and diagrams pulled from
 * Gunveen's PDF) don't share one aspect ratio, and cropping them clips real
 * content (titles, diagram edges). The backdrop keeps any letterboxing from
 * reading as a bug: it's tinted from the same gradient used everywhere else
 * this cover appears (project cards, case study pages), so it looks like a
 * deliberate mat, not empty space.
 */
function CoverFace({
  coverSrc,
  coverAccent,
  title,
  priority,
}: {
  coverSrc?: string;
  coverAccent: string;
  title: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("absolute inset-0 bg-gradient-to-br", coverAccent)} title={coverSrc ? undefined : title}>
      {coverSrc ? (
        <Image
          src={coverSrc}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 1024px) 46vw, 620px"
          className="object-contain"
        />
      ) : null}
    </div>
  );
}

/**
 * A thin browser-chrome bar above the cover — window dots + a fake address
 * bar reading the project slug. This is what actually sells "these are real
 * sites" the way the reference clip did; a bare screenshot doesn't read as a
 * browser window on its own.
 */
function BrowserChrome({ slug }: { slug: string }) {
  return (
    <div className="flex h-6 shrink-0 items-center gap-3 border-b border-foreground/10 bg-secondary px-3 sm:h-7">
      <div className="flex gap-1.5" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-background" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
      </div>
      <span className="truncate font-mono text-[9px] tracking-tight text-foreground/35 sm:text-[10px]">
        gunveenkaur.design/work/{slug}
      </span>
    </div>
  );
}

export default function CoverCarousel({ className }: { className?: string }) {
  const capability = useMotionCapability();
  const cards = caseStudies.slice(0, 4);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // slotOf.current[cardIndex] = which slot that card currently occupies.
  const slotOf = useRef<number[]>(cards.map((_, i) => i % SLOTS.length));
  const [frontIndex, setFrontIndex] = useState(0);

  useEffect(() => {
    if (capability !== "full" || cards.length === 0) return;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const slot = SLOTS[slotOf.current[i]];
      gsap.set(el, {
        y: slot.y,
        z: slot.z,
        rotationX: slot.rotationX,
        scale: slot.scale,
        opacity: slot.opacity,
        filter: `blur(${slot.blur}px)`,
        zIndex: SLOTS.length * 10 - slotOf.current[i] * 10,
      });
    });

    const id = setInterval(() => {
      cards.forEach((_, i) => {
        const nextSlot = (slotOf.current[i] - 1 + SLOTS.length) % SLOTS.length;
        slotOf.current[i] = nextSlot;
        const el = cardRefs.current[i];
        const slot = SLOTS[nextSlot];
        if (!el) return;
        gsap.to(el, {
          y: slot.y,
          z: slot.z,
          rotationX: slot.rotationX,
          scale: slot.scale,
          opacity: slot.opacity,
          filter: `blur(${slot.blur}px)`,
          zIndex: SLOTS.length * 10 - nextSlot * 10,
          duration: TRANSITION_S,
          ease: "power3.inOut",
        });
      });
      const newFront = slotOf.current.findIndex((s) => s === 0);
      if (newFront !== -1) setFrontIndex(newFront);
    }, INTERVAL_MS);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `cards` is a stable slice of module-level data
  }, [capability]);

  if (cards.length === 0) return null;

  const front = cards[frontIndex];

  // Reduced motion / touch: one static cover, no perspective, no cycling.
  if (capability !== "full") {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl", className)} aria-hidden>
        <CoverFace coverSrc={front.coverSrc} coverAccent={front.coverAccent} title={front.title} priority />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} aria-hidden style={{ perspective: 1600 }}>
      {/* Depth vignette behind the stack — near-black, matching the reference
          clip's staging. Scoped to this component only: the rest of the site
          stays on the Rosewood background, this is the one deliberate
          exception, contained to the area directly behind the cards. Two
          layers: a broad soft glow and a tighter, darker core, for real depth
          instead of a flat smudge. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full opacity-80 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.85) 0%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[12%] -z-10 rounded-full opacity-75 blur-2xl"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.95) 0%, transparent 65%)",
        }}
      />

      <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {cards.map((c, i) => (
          <div
            key={c.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-x-[6%] top-1/2 flex aspect-[16/10] -translate-y-1/2 flex-col overflow-hidden rounded-xl shadow-2xl shadow-black/50 ring-1 ring-foreground/10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <BrowserChrome slug={c.slug} />
            <div className="relative flex-1">
              <CoverFace coverSrc={c.coverSrc} coverAccent={c.coverAccent} title={c.title} priority={i === 0} />
            </div>
          </div>
        ))}
      </div>

      {/* Mirrored reflection of whichever cover currently sits at the front. */}
      <div
        className="absolute inset-x-[6%] top-[calc(50%+38px)] flex aspect-[16/10] flex-col overflow-hidden rounded-xl opacity-25"
        style={{
          transform: "scaleY(-1)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 65%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 65%)",
        }}
      >
        <BrowserChrome slug={front.slug} />
        <div className="relative flex-1">
          <CoverFace coverSrc={front.coverSrc} coverAccent={front.coverAccent} title="" />
        </div>
      </div>
    </div>
  );
}
