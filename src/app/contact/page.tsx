import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Salah Uddin Kader (salahuddingfx) — Full Stack Developer from Cox's Bazar, Bangladesh. Hire me for your next web development project.",
  openGraph: {
    title: "Contact | Salah Uddin Kader",
    description: "Hire a Full Stack Developer from Cox's Bazar, Bangladesh.",
  },
};

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}
