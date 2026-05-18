import type { Metadata } from "next";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development services by Salah Uddin Kader (salahuddingfx) — Full Stack Developer from Cox's Bazar, Bangladesh. Next.js, React, MERN stack, and more.",
  openGraph: {
    title: "Services | Salah Uddin Kader",
    description: "Web development services by a Full Stack Developer from Cox's Bazar, Bangladesh.",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <Services />
    </main>
  );
}
