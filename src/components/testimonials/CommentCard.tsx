"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/data";
import ProofLink from "./ProofLink";

/**
 * One reference, framed as a comment in a thread.
 *
 * The comment is written by `author` and replies to the role Gunveen held —
 * so the "Replying to:" line is the thread's parent, not a person. Quotes are
 * verbatim and stay inside their own card, which keeps every attribution
 * locked to the organisation it belongs to.
 *
 * The card is deliberately light (Lemon Chiffon) against the page's dark
 * Rosewood background — the same "flipped panel" the site already uses for
 * the case-study insight callouts and the CTA banner — so it reads as a
 * distinct surface instead of blending into the page.
 */
export default function CommentCard({
  testimonial,
  index,
  revealed,
}: {
  testimonial: Testimonial;
  index: number;
  /**
   * Fires all four badges as one cascade, timed off the feed's own
   * visibility rather than each card's — see TestimonialsSection.
   */
  revealed: boolean;
}) {
  const { org, quotes, author, replyingTo, period, proofLabel, proofUrl } = testimonial;

  // One clock for the whole card: it lands first, its badge pops a beat
  // after — so card 1 arrives, then card 2, then card 3, then card 4, each
  // with its number confirming which one just landed.
  const cardDelay = index * 0.22;
  const badgeDelay = cardDelay + 0.22;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      animate={
        revealed
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 48, scale: 0.94 }
      }
      transition={{ type: "spring", stiffness: 140, damping: 20, mass: 0.9, delay: cardDelay }}
      className="relative rounded-2xl bg-foreground p-6 shadow-xl shadow-black/25 sm:p-8"
    >
      {/* Sequence badge — makes "4 organisations" countable at a glance. */}
      <motion.span
        aria-hidden
        initial={{ scale: 0, rotate: -16, opacity: 0 }}
        animate={
          revealed
            ? { scale: 1, rotate: 0, opacity: 1 }
            : { scale: 0, rotate: -16, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 320, damping: 20, delay: badgeDelay }}
        className="absolute -top-4 -left-4 flex h-9 w-9 items-center justify-center rounded-full bg-background text-xs font-semibold text-foreground shadow-md shadow-black/30 sm:-top-5 sm:-left-5 sm:h-10 sm:w-10"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Reply target — the role the comment is about. */}
      <p className="font-mono text-xs leading-relaxed text-background/70 sm:text-sm">
        <span className="text-background/55">Replying to:</span>{" "}
        <span className="font-semibold text-background">{replyingTo}</span>
      </p>

      <header className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-lg font-semibold tracking-tight text-background sm:text-xl">
          {org}
        </h3>
        <span className="text-xs text-background/60">{period}</span>
      </header>

      {/* The comment body. A connector rule ties multiple quotes to one voice. */}
      <div className="mt-5 space-y-4 border-l border-background/20 pl-5">
        {quotes.map((quote) => (
          <p
            key={quote.slice(0, 40)}
            className="text-pretty text-base leading-relaxed text-background sm:text-lg"
          >
            &ldquo;{quote}&rdquo;
          </p>
        ))}
      </div>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-background/15 pt-4">
        <p className="text-sm text-background/70">— {author}</p>
        <ProofLink label={proofLabel} url={proofUrl} onLight />
      </footer>
    </motion.article>
  );
}
