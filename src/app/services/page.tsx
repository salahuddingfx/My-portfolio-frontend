import type { Metadata } from "next";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services — Salah Uddin Kader (Saka Chowdhury)",
  description:
    "Premium web development services by Salah Uddin Kader (Saka Chowdhury / @salahuddingfx), a Creative Developer based in Cox's Bazar, Bangladesh. Specializing in Next.js development, React applications, and interactive web experiences.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Salah Uddin Kader (Saka Chowdhury)",
    description: "Creative web services offered by Saka Chowdhury (Salah Uddin Kader) — Creative Developer and Frontend Engineer based in Cox's Bazar, Bangladesh.",
  },
};

export default function ServicesPage() {
  return (
    <main>
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
                "name": "Services",
                "item": "https://salahuddin.codes/services"
              }
            ]
          })
        }}
      />
      <Services />
    </main>
  );
}
