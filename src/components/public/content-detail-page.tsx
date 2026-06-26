import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Share2 } from "lucide-react";

import { PostCard } from "@/components/public/post-card";
import { PublicShell } from "@/components/public/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  contentTypeLabel,
  contentTypePath,
  formatDate,
  getPostBySlug,
  getRelatedPosts,
  type ContentType,
} from "@/lib/dummy-content";

type ContentDetailPageProps = {
  contentType: ContentType;
  slug: string;
};

export function ContentDetailPage({ contentType, slug }: ContentDetailPageProps) {
  const post = getPostBySlug(contentType, slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const backHref = `/${contentTypePath(post.contentType)}`;

  return (
    <PublicShell>
      <main className="bg-white">
        <article>
          <header className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <Link href={backHref} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Kembali ke {contentTypeLabel(post.contentType)}
            </Link>
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <Badge>{post.categoryName}</Badge>
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
              <p className="text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span>{post.authorName}</span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden="true" />
                  {post.readingTimeMinutes} menit baca
                </span>
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-secondary">
              <Image
                src={post.coverImageUrl}
                alt={post.coverImageAlt}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_220px] lg:px-8">
            <div className="prose-content">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <aside className="space-y-5">
              <div className="rounded-lg border border-border bg-background p-5">
                <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-primary">Bagikan</h2>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 size-4" aria-hidden="true" />
                  Share Artikel
                </Button>
              </div>
            </aside>
          </div>
        </article>

        {relatedPosts.length > 0 ? (
          <section className="bg-background py-16">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-3xl font-semibold tracking-tight">Artikel Terkait</h2>
              <div className="grid gap-5 md:grid-cols-3">
                {relatedPosts.map((item) => (
                  <PostCard key={item.id} post={item} compact />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </PublicShell>
  );
}
