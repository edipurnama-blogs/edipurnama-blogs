import { AdminShell } from "@/components/admin/admin-shell";
import { PostForm } from "@/components/admin/post-form";
import { getCategories } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";

type NewPostPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewPostPage({ searchParams }: NewPostPageProps) {
  const { profile } = await requireAdminUser();
  const params = await searchParams;
  const categories = await getCategories();

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tambah Konten</h1>
          <p className="mt-2 text-muted-foreground">Buat draft atau publish tulisan baru.</p>
        </div>
        <PostForm categories={categories} error={params.error} />
      </div>
    </AdminShell>
  );
}
