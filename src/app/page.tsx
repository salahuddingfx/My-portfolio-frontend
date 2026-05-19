import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Salah Uddin Kader — Full Stack Developer from Cox's Bazar",
  description:
    "Portfolio of Salah Uddin Kader (salahuddingfx) — Full Stack Developer from Cox's Bazar, Chittagong, Bangladesh. Specializing in MERN, Next.js, React, TypeScript, Node.js, Python, Django, PHP, Laravel, and MySQL for local, nationwide, and global clients.",
  keywords: [
    "Salah Uddin Kader",
    "salahuddingfx",
    "Full Stack Developer Bangladesh",
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
    title: "Salah Uddin Kader — Full Stack Developer from Cox's Bazar",
    description:
      "Full Stack Developer from Cox's Bazar, Bangladesh. Specializing in MERN, Next.js, React, TypeScript, Node.js, Python, Django, PHP, Laravel, and MySQL for local, nationwide, and global clients.",
    url: "https://salahuddin.codes",
    siteName: "Salah Uddin Kader",
    images: [{ url: "/mine-photo.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
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
