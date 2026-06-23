import type { MetadataRoute } from "next";

const BASE = "https://salahuddin.codes";
const REVALIDATE_SECONDS = 3600;

type BlogPostEntry = {
  slug?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdAt?: string;
};

type ProjectEntry = {
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
};

const getLastModified = (value?: string) => {
  if (!value) return new Date();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

const getStaticEntries = (): MetadataRoute.Sitemap => [
  { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/reviews`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const staticEntries = getStaticEntries();

  if (!apiUrl) {
    return staticEntries;
  }

  try {
    const [projectsRes, postsRes] = await Promise.all([
      fetch(`${apiUrl}/admin/projects`, { next: { revalidate: REVALIDATE_SECONDS } }),
      fetch(`${apiUrl}/admin/blog-posts`, { next: { revalidate: REVALIDATE_SECONDS } })
    ]);

    const projects: ProjectEntry[] = projectsRes.ok ? await projectsRes.json() : [];
    const posts: BlogPostEntry[] = postsRes.ok ? await postsRes.json() : [];

    const projectEntries: MetadataRoute.Sitemap = projects
      .filter((project) => Boolean(project?._id))
      .map((project) => ({
        url: `${BASE}/projects/${project._id}`,
        lastModified: getLastModified(project.updatedAt || project.createdAt),
        changeFrequency: "monthly",
        priority: 0.7,
      }));

    const blogEntries: MetadataRoute.Sitemap = posts
      .filter((post) => Boolean(post?.slug))
      .map((post) => ({
        url: `${BASE}/blog/${post.slug}`,
        lastModified: getLastModified(post.updatedAt || post.publishedAt || post.createdAt),
        changeFrequency: "monthly",
        priority: 0.6,
      }));

    return [...staticEntries, ...projectEntries, ...blogEntries];
  } catch {
    return staticEntries;
  }
}
