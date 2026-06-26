import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const foundations = [
  "Next.js App Router + TypeScript",
  "Tailwind CSS v4",
  "Supabase SSR client/server",
  "Supabase Auth login admin",
  "Protected admin route",
  "Database schema SQL sesuai PRD",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16 sm:px-10">
      <Badge className="mb-6 w-fit">Phase 1 Foundation</Badge>

      <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
            Website Blog Dai Islami
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Fondasi aplikasi sudah disiapkan untuk area publik dan admin.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Proyek ini sekarang memakai Next.js App Router, Tailwind CSS, pola komponen ala
              shadcn/ui, Supabase SSR, serta proteksi route admin sesuai PRD.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/admin/login">Masuk Admin</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/dashboard">Cek Protected Route</Link>
            </Button>
          </div>
        </div>

        <Card className="border-primary/20 bg-card/80 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle>Foundation Checklist</CardTitle>
            <CardDescription>Hasil setup awal yang langsung siap dipakai pada Phase 2 dan 3.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {foundations.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
