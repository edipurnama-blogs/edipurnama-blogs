import Link from "next/link";
import { BookOpen, FileText, FolderOpen, LineChart, Plus, Tags } from "lucide-react";

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
  const activity = buildWeeklyActivity(posts);
  const chart = buildLineChart(activity);

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

        <Card className="overflow-hidden rounded-lg">
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>Statistik Konten</CardTitle>
              <CardDescription>Grafik publikasi dan draft konten dalam 7 hari terakhir.</CardDescription>
            </div>
            <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
              <LineChart className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="h-full w-full" role="img" aria-label="Grafik statistik konten 7 hari terakhir">
                <defs>
                  <linearGradient id="contentLineGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#0f766e" />
                    <stop offset="50%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="contentAreaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {chart.gridLines.map((line) => (
                  <line key={line.y} x1={chart.padding} x2={chart.width - chart.padding} y1={line.y} y2={line.y} stroke="var(--border)" strokeDasharray="5 8" />
                ))}
                <path d={chart.areaPath} fill="url(#contentAreaGradient)" />
                <path d={chart.linePath} fill="none" stroke="url(#contentLineGradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
                {chart.points.map((point) => (
                  <g key={point.label}>
                    <circle cx={point.x} cy={point.y} r="5.5" fill="white" stroke="var(--primary)" strokeWidth="3" />
                    <text x={point.x} y={chart.height - 18} textAnchor="middle" className="fill-muted-foreground text-[12px] font-medium">
                      {point.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-background px-4 py-3">
                <p className="text-xs text-muted-foreground">Total 7 hari</p>
                <p className="mt-1 text-2xl font-semibold">{activity.reduce((total, item) => total + item.value, 0)}</p>
              </div>
              <div className="rounded-lg border border-border bg-background px-4 py-3">
                <p className="text-xs text-muted-foreground">Tertinggi</p>
                <p className="mt-1 text-2xl font-semibold">{Math.max(0, ...activity.map((item) => item.value))}</p>
              </div>
              <div className="rounded-lg border border-border bg-background px-4 py-3">
                <p className="text-xs text-muted-foreground">Published aktif</p>
                <p className="mt-1 text-2xl font-semibold">{posts.filter((post) => post.status === "published").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

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

function buildWeeklyActivity(posts: Awaited<ReturnType<typeof getPosts>>) {
  const formatter = new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short" });
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);

    return {
      key,
      label: formatter.format(date),
      value: 0,
    };
  });

  const counts = new Map(days.map((day) => [day.key, day.value]));
  posts.forEach((post) => {
    const key = new Date(post.created_at).toISOString().slice(0, 10);
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  });

  return days.map((day) => ({ ...day, value: counts.get(day.key) ?? 0 }));
}

function buildLineChart(activity: ReturnType<typeof buildWeeklyActivity>) {
  const width = 760;
  const height = 260;
  const padding = 36;
  const baseline = height - 48;
  const chartHeight = baseline - padding;
  const chartWidth = width - padding * 2;
  const maxValue = Math.max(1, ...activity.map((item) => item.value));
  const points = activity.map((item, index) => {
    const x = padding + (chartWidth / Math.max(1, activity.length - 1)) * index;
    const y = padding + ((maxValue - item.value) / maxValue) * chartHeight;
    return { ...item, x, y };
  });
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? padding} ${baseline} L ${points[0]?.x ?? padding} ${baseline} Z`;
  const gridLines = Array.from({ length: 4 }, (_, index) => ({
    y: padding + (chartHeight / 3) * index,
  }));

  return { width, height, padding, points, linePath, areaPath, gridLines };
}
