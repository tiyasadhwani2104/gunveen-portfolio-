"use client";

import { useEffect, useRef } from "react";
import { PALETTE, prefersReducedMotion } from "@/lib/motion";

/**
 * Complexity → clarity.
 *
 * One fixed set of nodes and links. In the "tangled" state the nodes sit at
 * random positions, so the links cross chaotically; in the "resolved" state
 * they sit on a grid, so the same links read as clean orthogonal structure.
 * The visual argument is that nothing was added or removed — only ordered.
 *
 * Canvas 2D on purpose: this is lines and dots, so WebGL would cost bundle
 * size and device support for no visual gain.
 */

const COLS = 7;
const ROWS = 5;
const RESOLVE_MS = 2600;
const POINTER_RADIUS = 130;
const POINTER_PUSH = 34;

type Node = {
  /** Resolved (grid) position, normalized 0..1. */
  ox: number;
  oy: number;
  /** Tangled (scattered) position, normalized 0..1. */
  cx: number;
  cy: number;
  /** Per-node stagger so the grid assembles as a cascade. */
  delay: number;
  /** Live pointer displacement, in px, spring-damped back to zero. */
  dx: number;
  dy: number;
};

/** Deterministic PRNG so the tangle is identical on server and client. */
function makeRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function buildNodes(): Node[] {
  const random = makeRandom(20260923);
  const nodes: Node[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      nodes.push({
        ox: 0.12 + (col / (COLS - 1)) * 0.76,
        oy: 0.16 + (row / (ROWS - 1)) * 0.68,
        // Scattered around the centre, biased wide so links cross a lot.
        cx: 0.5 + (random() - 0.5) * 0.92,
        cy: 0.5 + (random() - 0.5) * 0.86,
        delay: random() * 0.45,
        dx: 0,
        dy: 0,
      });
    }
  }
  return nodes;
}

/** Grid-neighbour links: tangled when scattered, orthogonal when resolved. */
function buildLinks(): [number, number][] {
  const links: [number, number][] = [];
  const at = (col: number, row: number) => row * COLS + col;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (col < COLS - 1) links.push([at(col, row), at(col + 1, row)]);
      if (row < ROWS - 1) links.push([at(col, row), at(col, row + 1)]);
    }
  }
  return links;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export default function ClarityGraph({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = buildNodes();
    const links = buildLinks();
    const reduced = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let raf = 0;
    let start = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /** Position of a node at a given resolve progress, including pointer push. */
    function positionOf(node: Node, progress: number) {
      const local = clamp01((progress - node.delay) / (1 - node.delay || 1));
      const t = easeOutCubic(local);
      return {
        x: (node.cx + (node.ox - node.cx) * t) * width + node.dx,
        y: (node.cy + (node.oy - node.cy) * t) * height + node.dy,
      };
    }

    function draw(progress: number) {
      ctx!.clearRect(0, 0, width, height);

      const points = nodes.map((n) => positionOf(n, progress));

      // Links fade in as the structure resolves — chaos reads quieter.
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = PALETTE.botticelli;
      for (const [a, b] of links) {
        ctx!.globalAlpha = 0.1 + progress * 0.22;
        ctx!.beginPath();
        ctx!.moveTo(points[a].x, points[a].y);
        ctx!.lineTo(points[b].x, points[b].y);
        ctx!.stroke();
      }

      // Nodes brighten and tighten as things click into place.
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const r = 2.4 + (1 - progress) * 1.6;
        ctx!.globalAlpha = 0.45 + progress * 0.5;
        ctx!.fillStyle = i % 6 === 0 ? PALETTE.botticelli : PALETTE.lemonChiffon;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function frame(now: number) {
      if (!start) start = now;
      const progress = clamp01((now - start) / RESOLVE_MS);

      // Pointer disturbs the order; nodes spring back and re-clarify.
      if (pointer.active) {
        for (const node of nodes) {
          const p = positionOf(node, progress);
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS && dist > 0.001) {
            const force = (1 - dist / POINTER_RADIUS) * POINTER_PUSH;
            node.dx += (dx / dist) * force * 0.12;
            node.dy += (dy / dist) * force * 0.12;
          }
        }
      }
      for (const node of nodes) {
        node.dx *= 0.88;
        node.dy *= 0.88;
      }

      draw(progress);
      raf = requestAnimationFrame(frame);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }

    resize();

    if (reduced) {
      // Reduced motion: draw the resolved state once, no loop, no pointer.
      draw(1);
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) draw(1);
    });
    observer.observe(canvas);

    // Don't burn frames in a backgrounded tab.
    function onVisibility() {
      if (document.hidden) {
        visible = false;
        cancelAnimationFrame(raf);
      } else if (!visible && !reduced) {
        visible = true;
        raf = requestAnimationFrame(frame);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
