import type { Metadata } from "next";

import { PostCard } from "@/components/public/post-card";
import { PublicShell } from "@/components/public/site-shell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { publicPosts } from "@/lib/dummy-content";

export const metadata: Metadata = {
  title: "Pencarian",
  description: "Cari tulisan berdasarkan judul, excerpt, dan isi konten.",
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const keyword = q.trim().toLowerCase();
  const results = keyword
    ? publicPosts.filter((post) =>
        [post.title, post.excerpt, post.categoryName, post.tags.join(" "), post.content.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      )
    : publicPosts;

  return (
    <PublicShell>
      <main className="bg-white">
        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-8 max-w-3xl space-y-4">
            <Badge className="w-fit">Search</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pencarian Konten</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Cari tulisan berdasarkan judul, ringkasan, kategori, tag, dan isi konten dummy.
            </p>
          </div>

          <form className="mb-8 rounded-lg border border-border bg-background p-4">
            <Input name="q" defaultValue={q} placeholder="Masukkan kata kunci, contoh: sabar, dakwah, remaja" />
          </form>

          <div className="mb-5 text-sm text-muted-foreground">
            {keyword ? `${results.length} hasil untuk "${q}"` : `${results.length} konten tersedia`}
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
