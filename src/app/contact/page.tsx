import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — Salah Uddin Kader (Saka Chowdhury)",
  description:
    "Get in touch with Salah Uddin Kader (Saka Chowdhury / @salahuddingfx), an interactive Creative Developer and Frontend Engineer based in Cox's Bazar, Bangladesh. Open for contracts and collaborations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Salah Uddin Kader (Saka Chowdhury)",
    description: "Connect with Saka Chowdhury (Salah Uddin Kader) — Creative Developer and Frontend Engineer based in Cox's Bazar, Bangladesh.",
  },
};

export default function ContactPage() {
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
                "name": "Contact",
                "item": "https://salahuddin.codes/contact"
              }
            ]
          })
        }}
      />
      <Contact />
    </main>
  );
}
