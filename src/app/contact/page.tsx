import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import StaggerGroup from "@/components/type/StaggerGroup";
import { ImageTrail } from "@/components/cursor";
import { siteConfig } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Contact · ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <ImageTrail className="px-6 pt-36 pb-28" threshold={110}>
      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Contact</p>
          <h1 className="font-display mt-2 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Let&apos;s design something together.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            {siteConfig.availabilityDetail}
          </p>
        </Reveal>

        <StaggerGroup className="mt-14" stagger={0.1} y={26}>
          <a
            href={`mailto:${siteConfig.email}`}
            className="group flex items-center justify-between gap-4 border-t border-line py-8 transition-colors hover:text-accent"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Email</p>
              <p className="font-display mt-2 text-2xl font-semibold sm:text-3xl">{siteConfig.email}</p>
            </div>
            <ArrowUpRight size={28} className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="group flex items-center justify-between gap-4 border-t border-line py-8 transition-colors hover:text-accent"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Phone</p>
              <p className="font-display mt-2 text-2xl font-semibold sm:text-3xl">{siteConfig.phone}</p>
            </div>
            <ArrowUpRight size={28} className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <div className="border-t border-line py-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Based in</p>
            <p className="font-display mt-2 text-2xl font-semibold sm:text-3xl">{siteConfig.location}</p>
          </div>

          <div className="border-t border-b border-line py-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Find me elsewhere</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { label: "LinkedIn", href: siteConfig.social.linkedin },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
                >
                  <ArrowUpRight size={16} /> {social.label}
                </a>
              ))}
            </div>
          </div>
        </StaggerGroup>
      </div>
    </ImageTrail>
  );
}
