import { Search } from "lucide-react";

import { PostCard } from "@/components/public/post-card";
import { PublicShell } from "@/components/public/site-shell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Post } from "@/lib/dummy-content";

type ListingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  posts: Post[];
};

export function ListingPage({ eyebrow, title, description, posts }: ListingPageProps) {
  const categories = Array.from(new Set(posts.map((post) => post.categoryName)));
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return (
    <PublicShell>
      <main className="bg-white">
        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl space-y-4">
            <Badge className="w-fit">{eyebrow}</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
            <p className="text-lg leading-8 text-muted-foreground">{description}</p>
          </div>

          <form className="mt-8 grid gap-4 rounded-lg border border-border bg-background p-4 md:grid-cols-[1fr_0.8fr]" action="/search">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input name="q" className="pl-10" placeholder="Cari judul, tema, atau kata kunci" />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </form>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
            <div className="grid gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-border bg-background p-5">
              <h2 className="mb-4 font-sans text-lg font-semibold">Tag Tema</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
