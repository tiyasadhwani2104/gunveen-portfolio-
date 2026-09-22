"use client";

import SplitHeading from "@/components/type/SplitHeading";
import { cn } from "@/lib/utils";

/**
 * The one heading style every case-study block shares, so the page keeps a
 * single hierarchy: h1 (title) → h2 (block heading) → h3 (step title).
 */
export default function BlockHeading({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <SplitHeading
      as="h2"
      className={cn(
        "font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl",
        className
      )}
    >
      {children}
    </SplitHeading>
  );
}
