import Link from "next/link";
import Image from "next/image";
import type React from "react";
import { ArrowRight, BookOpen, CalendarDays, Feather, Sparkles } from "lucide-react";

import { BookCard } from "@/components/public/book-card";
import { PostCard } from "@/components/public/post-card";
import { PublicShell } from "@/components/public/site-shell";
import { SectionHeading } from "@/components/public/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getFeaturedPosts,
  getLatestPosts,
  getPostsByType,
  profile,
  publicBooks,
  quote,
  site,
} from "@/lib/dummy-content";

export default function Home() {
  const latestPosts = getLatestPosts(6);
  const featuredPosts = getFeaturedPosts(3);
  const dailyBlogs = getPostsByType("daily_blog").slice(0, 3);
  const articles = getPostsByType("islamic_article").slice(0, 3);
  const news = getPostsByType("news").slice(0, 3);
  const books = publicBooks.slice(0, 3);

  return (
    <PublicShell>
      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
            <div className="space-y-8">
              <Badge className="w-fit">Website Blog Dai Islami</Badge>
              <div className="max-w-3xl space-y-5">
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                  {site.name}
                </h1>
                <p className="text-xl leading-9 text-muted-foreground">{site.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="#tulisan-terbaru">
                    Baca Tulisan Terbaru
                    <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/karya-buku">Lihat Karya Buku</Link>
                </Button>
              </div>
              <div className="grid max-w-xl grid-cols-3 gap-3">
                {[
                  ["28+", "Tulisan"],
                  ["4", "Buku"],
                  ["12", "Kajian"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-border bg-secondary/60 p-4">
                    <div className="text-2xl font-semibold text-foreground">{value}</div>
                    <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-secondary shadow-xl shadow-teal-950/5">
                <Image
                  src={profile.heroImageUrl}
                  alt="Ilustrasi suasana masjid dan dakwah"
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <Card className="absolute bottom-5 left-5 right-5 rounded-lg border-white/80 bg-white/92 p-5 shadow-lg backdrop-blur">
                <div className="flex items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-6 text-foreground">{quote.text}</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-secondary">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <Badge className="w-fit">Profil Dai</Badge>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}</h2>
                <p className="text-lg leading-8 text-muted-foreground">{profile.shortBio}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.focus.slice(0, 5).map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
              <Button asChild className="w-fit">
                <Link href="/profil">Baca Profil Lengkap</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="tulisan-terbaru" className="bg-white py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Publikasi"
              title="Tulisan Terbaru"
              description="Konten published dari blog harian, artikel Islam, berita umat, dan kajian pilihan."
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto w-full max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
            <ContentPreview title="Blog Harian" eyebrow="Refleksi" href="/blog" posts={dailyBlogs} icon={<Feather className="size-5" />} />
            <ContentPreview title="Artikel Islam" eyebrow="Keilmuan" href="/artikel" posts={articles} icon={<BookOpen className="size-5" />} />
            <ContentPreview title="Berita dan Seputar Umat" eyebrow="Aktual" href="/berita" posts={news} icon={<CalendarDays className="size-5" />} />
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Pilihan"
              title="Kajian dan Tausiyah"
              description="Ringkasan materi kajian dan nasihat singkat yang mudah dibaca ulang."
              href={`/kajian/${featuredPosts[0]?.slug ?? ""}`}
              actionLabel="Buka kajian"
            />
            <div className="grid gap-5 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} compact />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Karya"
              title="Karya Buku"
              description="Buku dan naskah yang mendokumentasikan pemikiran, materi dakwah, dan refleksi keislaman."
              href="/karya-buku"
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}

function ContentPreview({
  eyebrow,
  title,
  href,
  posts,
  icon,
}: {
  eyebrow: string;
  title: string;
  href: string;
  posts: ReturnType<typeof getPostsByType>;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">{icon}</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
            <h2 className="font-sans text-2xl font-semibold">{title}</h2>
          </div>
        </div>
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Lihat semua
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} compact />
        ))}
      </div>
    </div>
  );
}
