import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read articles and insights by Salah Uddin Kader (salahuddingfx) — Full Stack Developer from Cox's Bazar, Bangladesh. Web development, engineering, and design.",
  openGraph: {
    title: "Blog | Salah Uddin Kader",
    description: "Web development articles by a Full Stack Developer from Cox's Bazar, Bangladesh.",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
