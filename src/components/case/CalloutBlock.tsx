"use client";

import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/type/SplitHeading";

/** A framed aside — the question, the principle, the thing to remember. */
export default function CalloutBlock({
  heading,
  body,
}: {
  heading?: string;
  body: string;
}) {
  return (
    <Reveal>
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
        {heading ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{heading}</p>
        ) : null}
        <SplitHeading
          as="p"
          stagger={0.07}
          className={`font-display text-xl leading-snug text-balance sm:text-2xl ${
            heading ? "mt-3" : ""
          }`}
        >
          {body}
        </SplitHeading>
      </div>
    </Reveal>
  );
}
