import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, siteConfig } from "@/lib/data";
import CaseStudyView from "@/components/CaseStudyView";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} · ${siteConfig.name}`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return <CaseStudyView project={project} next={next} />;
}
