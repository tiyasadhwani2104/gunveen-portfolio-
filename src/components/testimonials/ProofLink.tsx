"use client";

import { ArrowUpRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type ProofLinkProps = {
  label: string;
  /** Undefined until the letter / certificate is supplied. */
  url?: string;
  className?: string;
  /** True when the parent surface is the light (Lemon Chiffon) card, not the dark page. */
  onLight?: boolean;
};

/**
 * The "Read the letter / certificate" affordance.
 *
 * Renders a real link only when a document exists. While `url` is missing it
 * degrades to a quiet, non-interactive marker — never a dead link or a 404.
 */
export default function ProofLink({ label, url, className, onLight = false }: ProofLinkProps) {
  if (!url) {
    return (
      <span
        title="Document available on request"
        className={cn(
          "inline-flex select-none items-center gap-1.5 text-xs",
          onLight ? "text-background/50" : "text-muted/55",
          className,
        )}
      >
        <Lock size={12} aria-hidden />
        <span>{label}</span>
        <span className={onLight ? "text-background/35" : "text-muted/40"}>— on request</span>
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      className={cn(
        "group inline-flex items-center gap-1.5 text-xs underline underline-offset-4 transition-colors",
        onLight
          ? "text-background decoration-background/30 hover:decoration-background"
          : "text-accent decoration-accent/30 hover:decoration-accent",
        className,
      )}
    >
      {label}
      <ArrowUpRight
        size={12}
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
