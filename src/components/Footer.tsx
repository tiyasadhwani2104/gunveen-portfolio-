import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              Let&apos;s work together
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted">
              {siteConfig.availabilityDetail}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group mt-6 inline-flex items-center gap-2 text-lg font-medium hover:text-accent"
            >
              {siteConfig.email}
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="mt-2 block text-sm text-muted hover:text-accent"
            >
              {siteConfig.phone}
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/work" className="hover:text-accent">Work</Link></li>
              <li><Link href="/about" className="hover:text-accent">About</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
              <li><a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Resume</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p>{siteConfig.school.degree} {siteConfig.school.program}, {siteConfig.school.institution}, Class of {siteConfig.school.graduation}</p>
        </div>
      </div>
    </footer>
  );
}
