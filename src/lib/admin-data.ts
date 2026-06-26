import { createAdminClient } from "@/lib/supabase/server";
import { books as dummyBooks, posts as dummyPosts } from "@/lib/dummy-content";
import { bookStatuses, contentTypes, publicationStatuses, readingTime, slugify } from "@/lib/content-options";
import type { Database } from "@/types/database";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
  categories?: Pick<Category, "name" | "slug"> | null;
  profiles?: { display_name: string | null; email: string | null } | null;
};
export type Book = Database["public"]["Tables"]["books"]["Row"];
export type MediaAsset = Database["public"]["Tables"]["media_assets"]["Row"];

export { bookStatuses, contentTypes, publicationStatuses, readingTime, slugify };

function isMissingRelationError(message: string | undefined) {
  return Boolean(message?.toLowerCase().includes("does not exist") || message?.toLowerCase().includes("schema cache"));
}

export async function getCategories() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("categories").select("*").order("sort_order").order("name");

  if (!error && data) return data;

  return [
    {
      id: "dummy-category-blog",
      name: "Blog Harian",
      slug: "blog-harian",
      description: "Catatan harian dan refleksi dakwah.",
      color: "#14B8A6",
      sort_order: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "dummy-category-kajian",
      name: "Kajian",
      slug: "kajian",
      description: "Ringkasan kajian dan tausiyah pilihan.",
      color: "#0F766E",
      sort_order: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ] satisfies Category[];
}

export async function getTags() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("tags").select("*").order("name");

  if (!error && data) return data;

  return ["Dakwah", "Akhlak", "Remaja Muslim", "Motivasi Islam"].map((name) => ({
    id: `dummy-tag-${slugify(name)}`,
    name,
    slug: slugify(name),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })) satisfies Tag[];
}

export async function getPosts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(name, slug), profiles(display_name, email)")
    .order("updated_at", { ascending: false });

  if (!error && data) return data as Post[];
  if (!isMissingRelationError(error?.message)) return [] as Post[];

  return dummyPosts.map((post) => ({
    id: post.id,
    author_id: "dummy-author",
    category_id: "dummy-category",
    content_type: post.contentType,
    status: post.status,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content.join("\n\n"),
    cover_image_path: null,
    cover_image_url: post.coverImageUrl,
    cover_image_alt: post.coverImageAlt,
    is_featured: post.isFeatured,
    reading_time_minutes: post.readingTimeMinutes,
    view_count: 0,
    seo_title: post.title,
    seo_description: post.excerpt.slice(0, 160),
    og_title: null,
    og_description: null,
    og_image_path: null,
    og_image_url: null,
    canonical_url: null,
    published_at: post.publishedAt,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: { name: post.categoryName, slug: slugify(post.categoryName) },
    profiles: { display_name: post.authorName, email: null },
  })) satisfies Post[];
}

export async function getPost(id: string) {
  const supabase = createAdminClient();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  return data as Post | null;
}

export async function getBooks() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("books").select("*").order("sort_order").order("updated_at", { ascending: false });

  if (!error && data) return data;

  return dummyBooks.map((book, index) => ({
    id: book.id,
    author_id: "dummy-author",
    title: book.title,
    slug: book.slug,
    subtitle: book.subtitle,
    description: book.description,
    cover_image_path: null,
    cover_image_url: book.coverImageUrl,
    cover_image_alt: book.coverImageAlt,
    publisher: book.publisher,
    published_year: book.publishedYear,
    isbn: null,
    purchase_url: book.purchaseUrl,
    sample_file_path: null,
    sample_file_url: book.sampleFileUrl,
    status: book.status,
    sort_order: index + 1,
    seo_title: book.title,
    seo_description: book.description.slice(0, 160),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })) satisfies Book[];
}

export async function getBook(id: string) {
  const supabase = createAdminClient();
  const { data } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
  return data as Book | null;
}

export async function getMediaAssets() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });

  if (!error && data) return data;

  return [] as MediaAsset[];
}
