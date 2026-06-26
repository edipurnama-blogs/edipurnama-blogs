export const contentTypes = [
  ["daily_blog", "Blog Harian"],
  ["islamic_article", "Artikel Islam"],
  ["news", "Berita Umat"],
  ["tausiyah", "Tausiyah/Kajian"],
  ["khutbah", "Khutbah"],
  ["opinion", "Opini"],
  ["story", "Kisah"],
] as const;

export const publicationStatuses = [
  ["draft", "Draft"],
  ["published", "Published"],
  ["archived", "Archived"],
] as const;

export const bookStatuses = [
  ["draft", "Draft"],
  ["published", "Published"],
  ["coming_soon", "Coming Soon"],
  ["archived", "Archived"],
] as const;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function metaDescriptionFrom(value: string | null | undefined) {
  return (value ?? "").trim().slice(0, 180);
}
