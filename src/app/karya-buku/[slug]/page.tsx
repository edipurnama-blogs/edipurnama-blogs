import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

import { PublicShell } from "@/components/public/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBookBySlug } from "@/lib/dummy-content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  return { title: book?.title ?? "Karya Buku", description: book?.description };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <PublicShell>
      <main className="bg-white">
        <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-20">
          <div>
            <Link href="/karya-buku" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Kembali ke Karya Buku
            </Link>
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-secondary">
              <Image
                src={book.coverImageUrl}
                alt={book.coverImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant={book.status === "coming_soon" ? "outline" : "default"}>
                {book.status === "coming_soon" ? "Segera Terbit" : "Terbit"}
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{book.title}</h1>
              <p className="text-xl leading-8 text-muted-foreground">{book.subtitle}</p>
            </div>

            <Card className="rounded-lg bg-background p-6">
              <p className="text-base leading-8 text-muted-foreground">{book.description}</p>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3">
              <Meta label="Tahun" value={String(book.publishedYear)} />
              <Meta label="Penerbit" value={book.publisher} />
              <Meta label="Status" value={book.status === "coming_soon" ? "Segera Terbit" : "Published"} />
            </div>

            <div className="flex flex-wrap gap-3">
              {book.purchaseUrl ? (
                <Button asChild>
                  <a href={book.purchaseUrl}>
                    Beli Buku
                    <ExternalLink className="ml-2 size-4" aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
              {book.sampleFileUrl ? (
                <Button asChild variant="outline">
                  <a href={book.sampleFileUrl}>
                    <BookOpen className="mr-2 size-4" aria-hidden="true" />
                    Baca Sample
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="mt-2 font-medium text-foreground">{value}</div>
    </div>
  );
}
