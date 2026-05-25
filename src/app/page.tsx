import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Salah Uddin Kader (Saka Chowdhury) — Creative Developer & Frontend Engineer",
  description:
    "Portfolio of Salah Uddin Kader (Saka Chowdhury / @salahuddingfx), a Creative Developer and Frontend Engineer based in Cox's Bazar, Bangladesh. Immersive web apps using Next.js, React, GSAP, and Three.js.",
  keywords: [
    "Salah Uddin Kader",
    "Saka Chowdhury",
    "salahuddingfx",
    "Frontend Developer Bangladesh",
    "Creative Developer Bangladesh",
    "Next.js Developer",
    "GSAP Developer",
    "Three.js Portfolio",
    "Interactive Web Developer",
    "Modern Web Designer",
    "Full Stack Developer Bangladesh",
    "Creative Frontend Engineer",
    "Cox's Bazar developer",
    "Cox's Bazar MERN developer",
    "Cox's Bazar backend developer",
    "Chittagong web developer",
    "Chittagong MERN developer",
    "Chittagong backend developer",
    "Bangladesh MERN developer",
    "Bangladesh backend developer",
    "MERN stack developer",
    "MERN developer from Cox's Bazar",
    "MERN developer from Bangladesh",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "Node.js developer",
    "Python developer",
    "Django developer",
    "PHP developer",
    "Laravel developer",
    "MySQL developer",
    "Backend developer",
    "UI/UX developer",
    "Web app developer",
    "Remote web developer",
    "Worldwide web developer",
    "International web developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Salah Uddin Kader (Saka Chowdhury) — Creative Developer & Frontend Engineer",
    description:
      "Portfolio of Salah Uddin Kader (Saka Chowdhury / @salahuddingfx), a Creative Developer and Frontend Engineer based in Cox's Bazar, Bangladesh. Immersive web apps using Next.js, React, GSAP, and Three.js.",
    url: "https://salahuddin.codes",
    siteName: "Salah Uddin Kader (Saka Chowdhury)",
    images: [{ url: "/mine-photo.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
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
              }
            ]
          })
        }}
      />
      <Hero />
      <About />
      <TechStack />
      <Services />
      <Projects layout="horizontal" />
      <Testimonials />
      <ContactCTA />
    </main>
  );
}
