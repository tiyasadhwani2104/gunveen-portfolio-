"use client";

import StaggerGroup from "@/components/type/StaggerGroup";
import { certifications } from "@/lib/data";

/**
 * Two small cards, side by side: title, one line, a date.
 * The date line is omitted entirely when a certificate has no issue date,
 * rather than leaving an empty row.
 */
export default function Certifications() {
  return (
    <div className="mt-20 max-w-3xl">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">Certifications</h3>

      <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2" stagger={0.08}>
        {certifications.map((cert) => (
          <div key={cert.id} className="rounded-2xl bg-foreground p-6 shadow-xl shadow-black/25">
            <p className="font-mono text-[11px] uppercase tracking-wide text-background/55">
              {cert.issuer}
            </p>
            <p className="mt-2 font-display text-base font-semibold tracking-tight text-background">
              {cert.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-background/80">{cert.description}</p>
            {cert.date ? <p className="mt-4 text-xs text-background/55">{cert.date}</p> : null}
          </div>
        ))}
      </StaggerGroup>
    </div>
  );
}
