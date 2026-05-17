import type { Metadata } from "next";
import Testimonials from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Client reviews and testimonials for Salah Uddin Kader (salahuddingfx) — Full Stack Developer from Cox's Bazar, Bangladesh.",
  openGraph: {
    title: "Reviews | Salah Uddin Kader",
    description: "Client testimonials for a Full Stack Developer from Cox's Bazar, Bangladesh.",
  },
};

export default function ReviewsPage() {
  return (
    <main style={{ paddingTop: 'var(--navbar-height, 120px)' }}>
      <Testimonials />
    </main>
  );
}
