import type { MetadataRoute } from "next";

import { contentTypePath } from "@/lib/dummy-content";
import { getPublicBooks, getPublicPosts } from "@/lib/public-data";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, books] = await Promise.all([getPublicPosts(), getPublicBooks()]);
  const staticRoutes = ["", "/profil", "/blog", "/artikel", "/berita", "/kajian", "/khutbah", "/opini", "/kisah", "/karya-buku", "/search"];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path || "/"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/${contentTypePath(post.contentType)}/${post.slug}`),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: post.isFeatured ? 0.9 : 0.8,
    })),
    ...books.map((book) => ({
      url: absoluteUrl(`/karya-buku/${book.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
