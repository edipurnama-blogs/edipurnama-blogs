import { AdminShell } from "@/components/admin/admin-shell";
import { BookForm } from "@/components/admin/book-form";
import { requireAdminUser } from "@/lib/auth";

export default async function NewBookPage() {
  const { profile } = await requireAdminUser();

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tambah Karya Buku</h1>
          <p className="mt-2 text-muted-foreground">Simpan draft, coming soon, atau publish buku baru.</p>
        </div>
        <BookForm />
      </div>
    </AdminShell>
  );
}
