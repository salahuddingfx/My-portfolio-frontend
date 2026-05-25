import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the professional journey, technical expertise, and creative philosophy of Salah Uddin Kader (Saka Chowdhury / @salahuddingfx), an elite Full Stack AI Engineer, Creative Developer, and secure Database Designer based in Cox's Bazar, Bangladesh.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — Salah Uddin Kader (Saka Chowdhury)",
    description: "Learn about Saka Chowdhury (Salah Uddin Kader) — Full Stack AI Engineer, Creative Developer, and secure Database Designer based in Cox's Bazar, Bangladesh. Profile, experience, and tech stack.",
    images: [{ url: "/mine-photo.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
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
                "name": "About",
                "item": "https://salahuddin.codes/about"
              }
            ]
          })
        }}
      />
      <AboutContent />
    </>
  );
}
