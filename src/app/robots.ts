import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/review/"],
      },
    ],
    host: "https://salahuddin.codes",
    sitemap: "https://salahuddin.codes/sitemap.xml",
  };
}
