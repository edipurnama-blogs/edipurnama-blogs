import type { Metadata } from "next";

import { BookCard } from "@/components/public/book-card";
import { PublicShell } from "@/components/public/site-shell";
import { Badge } from "@/components/ui/badge";
import { getPublicBooks } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Karya Buku",
  description: "Daftar buku dan karya tulis dai.",
};

export const dynamic = "force-dynamic";

export default async function KaryaBukuPage() {
  const publicBooks = await getPublicBooks();

  return (
    <PublicShell>
      <main className="bg-white">
        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-3xl space-y-4">
            <Badge className="w-fit">Karya Buku</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Buku dan Naskah Dakwah</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Karya buku yang menghimpun refleksi, materi dakwah, dan panduan praktis untuk keluarga,
              komunitas, dan pembaca muslim.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {publicBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
