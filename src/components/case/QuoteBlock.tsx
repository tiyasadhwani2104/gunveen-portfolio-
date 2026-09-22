"use client";

import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/type/SplitHeading";

/** A verbatim line from a participant or a session. */
export default function QuoteBlock({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  // Some quotes already carry their own inner quotation marks (the REFUGE one
  // quotes two participant lines). Wrapping those again would nest the marks.
  const alreadyQuoted = /["“”]/.test(text);

  return (
    <Reveal>
      <figure className="border-l-2 border-accent/50 pl-5 sm:pl-8">
        <blockquote>
          <SplitHeading
            as="p"
            stagger={0.07}
            className="font-display text-xl leading-snug text-balance text-foreground sm:text-3xl sm:leading-tight"
          >
            {alreadyQuoted ? text : `“${text}”`}
          </SplitHeading>
        </blockquote>
        {attribution ? (
          <figcaption className="mt-4 text-sm text-muted">
            <span aria-hidden="true">&mdash; </span>
            {attribution}
          </figcaption>
        ) : null}
      </figure>
    </Reveal>
  );
}
