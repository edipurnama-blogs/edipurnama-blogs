import { createAdminClient } from "@/lib/supabase/server";
import {
  publicBooks as fallbackPublicBooks,
  publicPosts as fallbackPublicPosts,
  type Book,
  type ContentType,
  type Post,
} from "@/lib/dummy-content";
import type { Database } from "@/types/database";

type DbPost = Database["public"]["Tables"]["posts"]["Row"] & {
  categories?: { name: string | null; slug: string | null } | null;
  profiles?: { display_name: string | null; email: string | null } | null;
};

type DbBook = Database["public"]["Tables"]["books"]["Row"];

const fallbackImage =
  "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&w=1200&q=80";

function paragraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function mapPost(post: DbPost): Post {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    contentType: post.content_type,
    status: post.status,
    categoryName: post.categories?.name ?? "Tanpa Kategori",
    authorName: post.profiles?.display_name ?? post.profiles?.email ?? "Admin",
    publishedAt: post.published_at,
    readingTimeMinutes: post.reading_time_minutes,
    isFeatured: post.is_featured,
    coverImageUrl: post.cover_image_url ?? fallbackImage,
    coverImageAlt: post.cover_image_alt ?? post.title,
    tags: [],
    content: paragraphs(post.content),
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
    ogTitle: post.og_title,
    ogDescription: post.og_description,
    ogImageUrl: post.og_image_url,
    canonicalUrl: post.canonical_url,
  };
}

function mapBook(book: DbBook): Book {
  return {
    id: book.id,
    title: book.title,
    slug: book.slug,
    subtitle: book.subtitle ?? "",
    description: book.description ?? "",
    coverImageUrl: book.cover_image_url ?? fallbackImage,
    coverImageAlt: book.cover_image_alt ?? book.title,
    publisher: book.publisher ?? "",
    publishedYear: book.published_year ?? new Date(book.created_at).getFullYear(),
    status: book.status,
    purchaseUrl: book.purchase_url,
    sampleFileUrl: book.sample_file_url,
    seoTitle: book.seo_title,
    seoDescription: book.seo_description,
  };
}

function mergeBySlug<T extends { slug: string }>(primary: T[], fallback: T[]) {
  const seen = new Set(primary.map((item) => item.slug));
  return [...primary, ...fallback.filter((item) => !seen.has(item.slug))];
}

export async function getPublicPosts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(name, slug), profiles(display_name, email)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const databasePosts = !error && data ? (data as unknown as DbPost[]).map(mapPost) : [];

  return mergeBySlug(databasePosts, fallbackPublicPosts).sort(
    (a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime(),
  );
}

export async function getPublicPostsByType(contentType: ContentType) {
  return (await getPublicPosts()).filter((post) => post.contentType === contentType);
}

export async function getPublicFeaturedPosts(limit = 3) {
  return (await getPublicPosts()).filter((post) => post.isFeatured).slice(0, limit);
}

export async function getPublicPostBySlug(contentType: ContentType, slug: string) {
  const posts = await getPublicPosts();
  return posts.find((post) => post.contentType === contentType && post.slug === slug) ?? null;
}

export async function getPublicRelatedPosts(post: Post, limit = 3) {
  return (await getPublicPosts())
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

export async function getPublicBooks() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .in("status", ["published", "coming_soon"])
    .order("sort_order")
    .order("created_at", { ascending: false });

  const databaseBooks = !error && data ? (data as unknown as DbBook[]).map(mapBook) : [];

  return mergeBySlug(databaseBooks, fallbackPublicBooks);
}

export async function getPublicBookBySlug(slug: string) {
  return (await getPublicBooks()).find((book) => book.slug === slug) ?? null;
}
