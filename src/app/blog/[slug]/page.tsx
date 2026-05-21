import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";

interface BlogDetail {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  category: string;
  readTime: string;
  publishedAt: string;
}

async function getPost(slug: string): Promise<BlogDetail | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return null;
    const res = await fetch(`${apiUrl}/admin/blog-posts/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Salah Uddin Kader`,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 630 }],
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    keywords: post.tags,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main
      className="min-h-screen bg-[var(--background)]"
      style={{
        paddingTop: "calc(var(--navbar-height) + var(--space-8))",
        paddingBottom: "var(--space-20)",
      }}
    >
      <div className="container">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to articles
        </Link>

        <article className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full border border-[var(--accent)]/20">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-[11px] text-[var(--muted-soft)] font-mono">
                {post.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} /> {post.publishedAt}
                  </span>
                )}
                {post.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} /> {post.readTime} min read
                  </span>
                )}
              </div>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)] leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {post.title}
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="relative aspect-[16/9] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] bg-[var(--surface-2)] px-3 py-1 rounded-full border border-[var(--border)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none text-[var(--muted)] leading-relaxed whitespace-pre-wrap text-base">
            {post.content}
          </div>
        </article>
      </div>
    </main>
  );
}
