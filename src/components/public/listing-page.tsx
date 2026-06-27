import Link from "next/link";
import { Search } from "lucide-react";

import { PostCard } from "@/components/public/post-card";
import { PublicShell } from "@/components/public/site-shell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Post } from "@/lib/dummy-content";
import { slugify } from "@/lib/content-options";

type ListingSearchParams = {
  q?: string;
  category?: string;
  tag?: string;
  page?: string;
};

type ListingPageProps = {
  basePath: string;
  eyebrow: string;
  title: string;
  description: string;
  posts: Post[];
  searchParams?: ListingSearchParams;
};

const pageSize = 6;

function normalized(value: string) {
  return slugify(value);
}

function pageHref(basePath: string, params: ListingSearchParams, page: number) {
  const query = new URLSearchParams();
  const q = params.q?.trim();
  if (q) query.set("q", q);
  if (params.category) query.set("category", params.category);
  if (params.tag) query.set("tag", params.tag);
  if (page > 1) query.set("page", String(page));

  const search = query.toString();
  return search ? `${basePath}?${search}` : basePath;
}

function pageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: Array<number | "ellipsis"> = [1];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  if (left > 2) items.push("ellipsis");
  for (let page = left; page <= right; page += 1) items.push(page);
  if (right < totalPages - 1) items.push("ellipsis");
  items.push(totalPages);

  return items;
}

export function ListingPage({ basePath, eyebrow, title, description, posts, searchParams = {} }: ListingPageProps) {
  const categories = Array.from(new Set(posts.map((post) => post.categoryName))).sort();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  const search = searchParams.q?.trim().toLowerCase() ?? "";
  const selectedCategory = searchParams.category ?? "all";
  const selectedTag = searchParams.tag ?? "all";
  const requestedPage = Number.parseInt(searchParams.page ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !search ||
      [post.title, post.excerpt, post.categoryName, post.authorName, post.tags.join(" "), post.content.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(search);
    const matchesCategory = selectedCategory === "all" || normalized(post.categoryName) === selectedCategory;
    const matchesTag = selectedTag === "all" || post.tags.some((tag) => normalized(tag) === selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const visiblePosts = filteredPosts.slice((safePage - 1) * pageSize, safePage * pageSize);
  const hasFilters = Boolean(search || selectedCategory !== "all" || selectedTag !== "all" || safePage > 1);

  return (
    <PublicShell>
      <main className="bg-white">
        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl space-y-4">
            <Badge className="w-fit">{eyebrow}</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
            <p className="text-lg leading-8 text-muted-foreground">{description}</p>
          </div>

          <form className="mt-8 grid gap-4 rounded-lg border border-border bg-background p-4 lg:grid-cols-[1fr_220px_220px_auto]" action={basePath}>
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input name="q" defaultValue={searchParams.q ?? ""} className="pl-10" placeholder="Cari judul, tema, atau kata kunci" />
            </label>
            <select
              name="category"
              defaultValue={selectedCategory}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              aria-label="Filter kategori"
            >
              <option value="all">Semua kategori</option>
              {categories.map((category) => (
                <option key={category} value={normalized(category)}>
                  {category}
                </option>
              ))}
            </select>
            <select
              name="tag"
              defaultValue={selectedTag}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              aria-label="Filter tag"
            >
              <option value="all">Semua tag</option>
              {tags.map((tag) => (
                <option key={tag} value={normalized(tag)}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-slate-200/60 hover:text-foreground"
              >
                Terapkan
              </button>
              {hasFilters ? (
                <Link
                  href={basePath}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground hover:bg-accent"
                >
                  Reset
                </Link>
              ) : null}
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <div>
              {search ? `${filteredPosts.length} hasil untuk "${searchParams.q}"` : `${filteredPosts.length} konten tersedia`}
              {selectedCategory !== "all" ? ` dalam kategori ${categories.find((category) => normalized(category) === selectedCategory) ?? ""}` : ""}
              {selectedTag !== "all" ? ` dengan tag ${tags.find((tag) => normalized(tag) === selectedTag) ?? ""}` : ""}
            </div>
            {totalPages > 1 ? <div>Halaman {safePage} dari {totalPages}</div> : null}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="rounded-lg border border-border bg-background p-8 text-muted-foreground md:col-span-2 lg:col-span-3">
                Tidak ada konten yang cocok dengan filter ini.
              </div>
            )}
          </div>

          {totalPages > 1 ? (
            <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
              <Link
                href={safePage > 1 ? pageHref(basePath, searchParams, safePage - 1) : basePath}
                aria-disabled={safePage <= 1}
                className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent aria-disabled:pointer-events-none aria-disabled:opacity-40"
              >
                Sebelumnya
              </Link>
              {pageItems(safePage, totalPages).map((item, index) =>
                item === "ellipsis" ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <Link
                    key={item}
                    href={pageHref(basePath, searchParams, item)}
                    aria-current={item === safePage ? "page" : undefined}
                    className={
                      item === safePage
                        ? "inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-primary px-3 text-sm font-medium text-primary-foreground"
                        : "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-accent"
                    }
                  >
                    {item}
                  </Link>
                ),
              )}
              <Link
                href={safePage < totalPages ? pageHref(basePath, searchParams, safePage + 1) : pageHref(basePath, searchParams, safePage)}
                aria-disabled={safePage >= totalPages}
                className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent aria-disabled:pointer-events-none aria-disabled:opacity-40"
              >
                Berikutnya
              </Link>
            </nav>
          ) : null}
        </section>
      </main>
    </PublicShell>
  );
}
