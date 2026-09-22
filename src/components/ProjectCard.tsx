"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PlaceholderMedia from "./PlaceholderMedia";
import type { CaseStudy } from "@/lib/data";

export default function ProjectCard({ project, index = 0 }: { project: CaseStudy; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <PlaceholderMedia
              label={project.title}
              accent={project.coverAccent}
              src={project.coverSrc}
              alt={`${project.title} — ${project.subtitle}`}
              aspect="aspect-[4/3]"
            />
          </motion.div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">{project.category}</p>
            <h3 className="mt-1 font-display text-xl font-semibold tracking-tight group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
          </div>
          <ArrowUpRight
            size={20}
            className="mt-1 shrink-0 text-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </div>
      </Link>
    </motion.div>
  );
}
