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
    "Portfolio of Salah Uddin Kader (salahuddingfx) — Full Stack Developer from Cox's Bazar, Chittagong, Bangladesh. Specializing in Next.js, React, TypeScript, and modern web experiences.",
  openGraph: {
    title: "Salah Uddin Kader — Full Stack Developer from Cox's Bazar",
    description:
      "Full Stack Developer from Cox's Bazar, Bangladesh. Specializing in Next.js, React, TypeScript.",
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
