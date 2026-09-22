"use client";

import Reveal from "@/components/Reveal";
import PlaceholderMedia from "@/components/PlaceholderMedia";

/**
 * An image in the body of a case study.
 *
 * With `src` it renders the real picture; without one it falls back to a
 * labelled placeholder, and the caption still names exactly which image
 * belongs here. Diagrams and slides pass `fit="contain"` so nothing is
 * cropped; photographs use the default `cover`.
 */
export default function ImageBlock({
  label,
  caption,
  accent,
  wide = false,
  src,
  fit,
}: {
  label: string;
  caption?: string;
  accent?: string;
  wide?: boolean;
  src?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <Reveal>
      <figure>
        <div data-cursor="view">
          <PlaceholderMedia
            label={src ? label : "Image to add"}
            accent={accent}
            src={src}
            fit={fit}
            alt={caption ? `${label}. ${caption}` : label}
            aspect={wide ? "aspect-[16/9]" : "aspect-[4/3]"}
          />
        </div>
        <figcaption className="mt-4 max-w-[62ch] text-sm leading-relaxed">
          <span className="font-medium text-foreground">{label}</span>
          {caption ? <span className="block text-muted">{caption}</span> : null}
        </figcaption>
      </figure>
    </Reveal>
  );
}
