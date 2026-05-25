import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects — Salah Uddin Kader (Saka Chowdhury)",
  description:
    "Explore the creative work and digital systems portfolio of Salah Uddin Kader (Saka Chowdhury / @salahuddingfx). Featuring Next.js applications, GSAP web animations, and Three.js 3D web experiences.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Salah Uddin Kader (Saka Chowdhury)",
    description: "Explore portfolio works by Saka Chowdhury (Salah Uddin Kader) — Creative Developer and Frontend Engineer based in Cox's Bazar, Bangladesh.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://salahuddin.codes"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Projects",
                "item": "https://salahuddin.codes/projects"
              }
            ]
          })
        }}
      />
      <ProjectsPageClient />
    </>
  );
}
