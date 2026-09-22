"use client";

import Reveal from "@/components/Reveal";
import BlockHeading from "./BlockHeading";

/** Long-form paragraphs. The measure is capped for comfortable reading. */
export default function ProseBlock({
  heading,
  body,
}: {
  heading?: string;
  body: string[];
}) {
  return (
    <div>
      {heading ? <BlockHeading>{heading}</BlockHeading> : null}
      <div className={heading ? "mt-5 space-y-5" : "space-y-5"}>
        {body.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.05} y={18}>
            <p className="max-w-[64ch] text-base leading-[1.75] text-muted sm:text-lg sm:leading-[1.7]">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
