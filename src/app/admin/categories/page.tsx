import { Trash2 } from "lucide-react";

import { deleteCategoryAction, saveCategoryAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { ToastMessage } from "@/components/ui/toast-message";
import { getCategories } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";

type AdminCategoriesPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminCategoriesPage({ searchParams }: AdminCategoriesPageProps) {
  const { profile } = await requireAdminUser();
  const params = await searchParams;
  const categories = await getCategories();

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <ToastMessage error={params.error} success={params.success} />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Manajemen Kategori</h1>
          <p className="mt-2 text-muted-foreground">Tambah, edit, hapus, dan aktif/nonaktifkan kategori konten.</p>
        </div>

        <form action={saveCategoryAction} className="grid gap-4 rounded-lg border border-border bg-white p-5 md:grid-cols-2 lg:grid-cols-6">
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="name">Nama kategori</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" placeholder="otomatis" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Warna</Label>
            <Input id="color" name="color" placeholder="#14B8A6" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort_order">Urutan</Label>
            <Input id="sort_order" name="sort_order" type="number" defaultValue={0} />
          </div>
          <label className="flex items-end gap-2 pb-3 text-sm">
            <input type="checkbox" name="is_active" defaultChecked className="h-4 w-4 accent-primary" />
            Aktif
          </label>
          <div className="space-y-2 md:col-span-2 lg:col-span-6">
            <Label htmlFor="description">Deskripsi</Label>
            <Input id="description" name="description" />
          </div>
          <SubmitButton type="submit" className="gap-2 md:col-span-2 lg:col-span-6" pendingChildren="Menambahkan...">Tambah Kategori</SubmitButton>
        </form>

        <div className="space-y-3">
          {categories.map((category) => (
            <form key={category.id} action={saveCategoryAction} className="grid gap-3 rounded-lg border border-border bg-white p-4 lg:grid-cols-[1.3fr_1fr_1.5fr_1fr_120px_100px_auto_auto]">
              <input type="hidden" name="id" value={category.id} />
              <Input name="name" defaultValue={category.name} aria-label="Nama kategori" />
              <Input name="slug" defaultValue={category.slug} aria-label="Slug" />
              <Input name="description" defaultValue={category.description ?? ""} aria-label="Deskripsi" />
              <Input name="color" defaultValue={category.color ?? ""} aria-label="Warna" />
              <Input name="sort_order" type="number" defaultValue={category.sort_order} aria-label="Urutan" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_active" defaultChecked={category.is_active} className="h-4 w-4 accent-primary" />
                Aktif
              </label>
              <SubmitButton type="submit" variant="outline" className="gap-2" pendingChildren="Menyimpan...">Simpan</SubmitButton>
              <ConfirmDeleteButton form={`delete-category-${category.id}`} type="submit" variant="outline" aria-label="Hapus kategori" confirmMessage={`Apakah yakin ingin menghapus kategori "${category.name}"?`}>
                <Trash2 className="h-4 w-4" />
              </ConfirmDeleteButton>
            </form>
          ))}
          {categories.map((category) => (
            <form key={`delete-${category.id}`} id={`delete-category-${category.id}`} action={deleteCategoryAction} className="hidden">
              <input type="hidden" name="id" value={category.id} />
            </form>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
