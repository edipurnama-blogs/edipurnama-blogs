import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";

import { deleteBookAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { ToastMessage } from "@/components/ui/toast-message";
import { getBooks } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";

type AdminBooksPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminBooksPage({ searchParams }: AdminBooksPageProps) {
  const { profile } = await requireAdminUser();
  const params = await searchParams;
  const books = await getBooks();

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <ToastMessage error={params.error} success={params.success} />
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Manajemen Karya Buku</h1>
            <p className="mt-2 text-muted-foreground">Tambah, edit, hapus, dan atur status publikasi buku.</p>
          </div>
          <Button asChild>
            <Link href="/admin/books/new" className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Buku
            </Link>
          </Button>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <article key={book.id} className="overflow-hidden rounded-lg border border-border bg-white">
              <div className="aspect-[4/3] bg-muted">
                {book.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.cover_image_url} alt={book.cover_image_alt ?? ""} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <Badge variant="outline">{book.status}</Badge>
                  <h2 className="mt-3 text-xl font-semibold">{book.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{book.subtitle ?? book.publisher ?? "Karya buku"}</p>
                </div>
                <p className="line-clamp-3 text-sm text-muted-foreground">{book.description ?? "Belum ada deskripsi."}</p>
                <div className="flex justify-between gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/books/${book.id}/edit`} className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <form action={deleteBookAction}>
                    <input type="hidden" name="id" value={book.id} />
                    <ConfirmDeleteButton type="submit" variant="outline" size="sm" aria-label="Hapus buku" confirmMessage={`Apakah yakin ingin menghapus buku "${book.title}"?`}>
                      <Trash2 className="h-4 w-4" />
                    </ConfirmDeleteButton>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
