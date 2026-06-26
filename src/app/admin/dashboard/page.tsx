import Link from "next/link";
import { BookOpen, FileText, FolderOpen, Plus, Tags } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBooks, getCategories, getPosts, getTags } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";
import { formatDate } from "@/lib/dummy-content";

export default async function AdminDashboardPage() {
  const { profile } = await requireAdminUser();
  const [posts, categories, tags, books] = await Promise.all([getPosts(), getCategories(), getTags(), getBooks()]);

  const stats = [
    { label: "Total Konten", value: posts.length, icon: FileText },
    { label: "Published", value: posts.filter((post) => post.status === "published").length, icon: FileText },
    { label: "Draft", value: posts.filter((post) => post.status === "draft").length, icon: FileText },
    { label: "Archived", value: posts.filter((post) => post.status === "archived").length, icon: FileText },
    { label: "Kategori", value: categories.length, icon: FolderOpen },
    { label: "Tag", value: tags.length, icon: Tags },
    { label: "Karya Buku", value: books.length, icon: BookOpen },
  ];

  return (
    <AdminShell profile={profile}>
      <div className="space-y-8">
        <section className="flex flex-col gap-4 rounded-lg border border-primary/15 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <Badge>Phase 3</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Statistik konten, shortcut editorial, dan ringkasan aktivitas terbaru.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/admin/posts/new" className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Konten
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/books/new" className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Buku
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="rounded-lg">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{stat.label}</CardDescription>
                  <Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Konten Terbaru</CardTitle>
              <CardDescription>Data dari Supabase, atau dummy jika database belum tersedia.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {posts.slice(0, 6).map((post) => (
                <div key={post.id} className="flex flex-col gap-2 rounded-lg border border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{post.categories?.name ?? "Tanpa kategori"} · {formatDate(post.published_at)}</p>
                  </div>
                  <Badge variant="outline">{post.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Shortcut</CardTitle>
              <CardDescription>Aksi cepat sesuai PRD Phase 3.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button asChild variant="outline"><Link href="/admin/posts/new">Tambah blog/artikel/berita</Link></Button>
              <Button asChild variant="outline"><Link href="/admin/categories">Kelola kategori</Link></Button>
              <Button asChild variant="outline"><Link href="/admin/tags">Kelola tag</Link></Button>
              <Button asChild variant="outline"><Link href="/admin/books/new">Tambah buku</Link></Button>
              <Button asChild variant="outline"><Link href="/admin/media">Upload gambar</Link></Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </AdminShell>
  );
}
