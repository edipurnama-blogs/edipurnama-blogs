import publicContent from "@/data/public-content.json";

export type ContentType =
  | "daily_blog"
  | "islamic_article"
  | "news"
  | "tausiyah"
  | "khutbah"
  | "opinion"
  | "story";

export type PublicationStatus = "draft" | "published" | "archived";
export type BookStatus = "draft" | "published" | "coming_soon" | "archived";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentType: ContentType;
  status: PublicationStatus;
  categoryName: string;
  authorName: string;
  publishedAt: string | null;
  readingTimeMinutes: number;
  isFeatured: boolean;
  coverImageUrl: string;
  coverImageAlt: string;
  tags: string[];
  content: string[];
};

export type Book = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  coverImageUrl: string;
  coverImageAlt: string;
  publisher: string;
  publishedYear: number;
  status: BookStatus;
  purchaseUrl: string | null;
  sampleFileUrl: string | null;
};

export const site = publicContent.site;
export const profile = publicContent.profile;
export const quote = publicContent.quote;

export const posts = publicContent.posts as Post[];
export const books = publicContent.books as Book[];

export const publicPosts = posts
  .filter((post) => post.status === "published")
  .sort((a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime());

export const publicBooks = books
  .filter((book) => book.status === "published" || book.status === "coming_soon")
  .sort((a, b) => b.publishedYear - a.publishedYear);

export function getPostsByType(contentType: ContentType) {
  return publicPosts.filter((post) => post.contentType === contentType);
}

export function getFeaturedPosts(limit = 3) {
  return publicPosts.filter((post) => post.isFeatured).slice(0, limit);
}

export function getLatestPosts(limit = 6) {
  return publicPosts.slice(0, limit);
}

export function getPostBySlug(contentType: ContentType, slug: string) {
  return publicPosts.find((post) => post.contentType === contentType && post.slug === slug);
}

export function getRelatedPosts(post: Post, limit = 3) {
  return publicPosts
    .filter((item) => item.id !== post.id)
    .map((item) => ({
      post: item,
      score:
        (item.contentType === post.contentType ? 2 : 0) +
        item.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function getBookBySlug(slug: string) {
  return publicBooks.find((book) => book.slug === slug);
}

export function contentTypePath(contentType: ContentType) {
  const paths: Record<ContentType, string> = {
    daily_blog: "blog",
    islamic_article: "artikel",
    news: "berita",
    tausiyah: "kajian",
    khutbah: "khutbah",
    opinion: "opini",
    story: "kisah",
  };

  return paths[contentType];
}

export function contentTypeLabel(contentType: ContentType) {
  const labels: Record<ContentType, string> = {
    daily_blog: "Blog Harian",
    islamic_article: "Artikel Islam",
    news: "Berita Umat",
    tausiyah: "Kajian",
    khutbah: "Khutbah",
    opinion: "Opini",
    story: "Kisah",
  };

  return labels[contentType];
}

export function formatDate(date: string | null) {
  if (!date) return "Belum dipublikasikan";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
