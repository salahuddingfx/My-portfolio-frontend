import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog — Salah Uddin Kader (Saka Chowdhury)",
  description:
    "Read technical articles, frontend design insights, and creative web engineering tutorials by Salah Uddin Kader (Saka Chowdhury / @salahuddingfx). Exploring Next.js, GSAP, and Three.js.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Salah Uddin Kader (Saka Chowdhury)",
    description: "Read technical articles on Next.js, React, GSAP, and web development by Saka Chowdhury (Salah Uddin Kader).",
  },
};

export default function BlogPage() {
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
                "name": "Blog",
                "item": "https://salahuddin.codes/blog"
              }
            ]
          })
        }}
      />
      <BlogContent />
    </>
  );
}
