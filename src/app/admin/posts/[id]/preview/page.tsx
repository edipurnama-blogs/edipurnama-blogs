import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Edit, ExternalLink } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPost } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";
import { contentTypeLabel, contentTypePath, formatDate } from "@/lib/dummy-content";

type PreviewPostPageProps = {
  params: Promise<{ id: string }>;
};

function paragraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function PreviewPostPage({ params }: PreviewPostPageProps) {
  const { profile } = await requireAdminUser();
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  const publicHref = `/${contentTypePath(post.content_type)}/${post.slug}`;

  return (
    <AdminShell profile={profile}>
      <article className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/admin/posts" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke daftar konten
            </Link>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">{post.title}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{contentTypeLabel(post.content_type)}</Badge>
              <Badge variant="outline">{post.status}</Badge>
              {post.is_featured ? <Badge variant="outline">Featured</Badge> : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.status === "published" ? (
              <Button asChild variant="outline">
                <Link href={publicHref} className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Lihat Public
                </Link>
              </Button>
            ) : null}
            <Button asChild>
              <Link href={`/admin/posts/${post.id}/edit`} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden rounded-lg">
          {post.cover_image_url ? (
            <div className="relative aspect-[16/7] bg-muted">
              <Image
                src={post.cover_image_url}
                alt={post.cover_image_alt ?? post.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="space-y-8 p-6 lg:p-8">
            <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="font-medium text-foreground">Slug</p>
                <p className="mt-1 break-all">{publicHref}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="font-medium text-foreground">Published</p>
                <p className="mt-1 inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="font-medium text-foreground">Reading Time</p>
                <p className="mt-1 inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.reading_time_minutes} menit baca
                </p>
              </div>
            </div>

            {post.excerpt ? <p className="text-lg leading-8 text-muted-foreground">{post.excerpt}</p> : null}

            <div className="prose-content max-w-none">
              {paragraphs(post.content).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section className="grid gap-4 border-t border-border pt-6 md:grid-cols-2">
              <Meta label="SEO Title" value={post.seo_title ?? "-"} />
              <Meta label="Meta Description" value={post.seo_description ?? "-"} />
              <Meta label="Canonical URL" value={post.canonical_url ?? "-"} />
              <Meta label="Cover Alt" value={post.cover_image_alt ?? "-"} />
            </section>
          </div>
        </Card>
      </article>
    </AdminShell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{label}</p>
      <p className="mt-2 break-words text-sm text-muted-foreground">{value}</p>
    </div>
  );
}
