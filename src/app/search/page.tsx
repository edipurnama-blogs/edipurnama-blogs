import { PostCard } from "@/components/public/post-card";
import { PublicShell } from "@/components/public/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contentTypeLabel, type ContentType } from "@/lib/dummy-content";
import { getPublicPosts } from "@/lib/public-data";
import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata({
  title: "Pencarian",
  description: "Cari tulisan berdasarkan judul, excerpt, dan isi konten.",
  path: "/search",
});

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ q?: string; type?: string }>;
};

const contentTypes: ContentType[] = ["daily_blog", "islamic_article", "news", "tausiyah", "khutbah", "opinion", "story"];

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "", type = "all" } = await searchParams;
  const keyword = q.trim().toLowerCase();
  const selectedType = contentTypes.includes(type as ContentType) ? (type as ContentType) : "all";
  const publicPosts = await getPublicPosts();
  const results = publicPosts
    .filter((post) => selectedType === "all" || post.contentType === selectedType)
    .filter((post) => {
      if (!keyword) {
        return true;
      }

      return [post.title, post.excerpt, post.categoryName, post.tags.join(" "), post.content.join(" ")]
          .join(" ")
          .toLowerCase()
        .includes(keyword);
    });

  return (
    <PublicShell>
      <main className="bg-white">
        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-8 max-w-3xl space-y-4">
            <Badge className="w-fit">Search</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pencarian Konten</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Cari tulisan berdasarkan judul, ringkasan, kategori, tag, dan isi konten.
            </p>
          </div>

          <form className="mb-8 grid gap-3 rounded-lg border border-border bg-background p-4 md:grid-cols-[minmax(0,1fr)_220px_auto]" action="/search">
            <Input name="q" defaultValue={q} placeholder="Masukkan kata kunci, contoh: sabar, dakwah, remaja" />
            <select
              name="type"
              defaultValue={selectedType}
              className="h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              aria-label="Filter tipe konten"
            >
              <option value="all">Semua konten</option>
              {contentTypes.map((contentType) => (
                <option key={contentType} value={contentType}>
                  {contentTypeLabel(contentType)}
                </option>
              ))}
            </select>
            <Button type="submit">Cari</Button>
          </form>

          <div className="mb-5 text-sm text-muted-foreground">
            {keyword ? `${results.length} hasil untuk "${q}"` : `${results.length} konten tersedia`}
            {selectedType !== "all" ? ` dalam ${contentTypeLabel(selectedType)}` : ""}
          </div>

          {results.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-background p-8 text-center text-muted-foreground">
              Tidak ada konten yang cocok dengan pencarian ini.
            </div>
          )}
        </section>
      </main>
    </PublicShell>
  );
}
