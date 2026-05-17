import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Salah Uddin Kader (salahuddingfx) — Full Stack Developer from Cox's Bazar, Chittagong, Bangladesh. Experience, skills, certificates, and philosophy.",
  openGraph: {
    title: "About | Salah Uddin Kader",
    description: "Full Stack Developer from Cox's Bazar, Bangladesh — experience, skills, and more.",
    images: [{ url: "/mine-photo.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
