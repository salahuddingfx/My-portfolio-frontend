import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { notFound } from "next/navigation";

interface ProjectDetail {
  _id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  tags: string[];
  links: { live: string; source: string };
}

async function getProject(id: string): Promise<ProjectDetail | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return null;
    const res = await fetch(`${apiUrl}/admin/projects/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.desc,
    openGraph: {
      title: `${project.title} | Salah Uddin Kader`,
      description: project.desc,
      images: [{ url: project.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.desc,
      images: [project.image],
    },
    keywords: project.tags,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main
      className="min-h-screen bg-[var(--background)]"
      style={{ paddingTop: "var(--navbar-height, 120px)", paddingBottom: "5rem" }}
    >
      <div className="container">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--muted)] hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to projects
        </Link>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full border border-[var(--accent)]/20">
                {project.category}
              </span>
              <div className="flex gap-2">
                {project.tags?.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] bg-white/5 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h1
              className="text-4xl lg:text-6xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {project.title}
            </h1>
          </div>

          <div className="relative aspect-[16/9] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] shadow-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
          </div>

          <p className="text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.links?.live && project.links.live !== "#" && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={15} /> Live Preview
              </a>
            )}
            {project.links?.source && project.links.source !== "#" && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Code2 size={15} /> Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
