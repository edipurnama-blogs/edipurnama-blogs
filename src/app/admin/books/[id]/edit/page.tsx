import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { BookForm } from "@/components/admin/book-form";
import { getBook } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";

type EditBookPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditBookPage({ params, searchParams }: EditBookPageProps) {
  const { profile } = await requireAdminUser();
  const { id } = await params;
  const query = await searchParams;
  const book = await getBook(id);

  if (!book) notFound();

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Edit Karya Buku</h1>
          <p className="mt-2 text-muted-foreground">{book.title}</p>
        </div>
        <BookForm book={book} error={query.error} />
      </div>
    </AdminShell>
  );
}
