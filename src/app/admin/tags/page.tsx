import { Trash2 } from "lucide-react";

import { deleteTagAction, saveTagAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTags } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";

type TagsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function AdminTagsPage({ searchParams }: TagsPageProps) {
  const { profile } = await requireAdminUser();
  const params = await searchParams;
  const query = params.q?.toLowerCase().trim() ?? "";
  const tags = (await getTags()).filter((tag) => !query || tag.name.toLowerCase().includes(query));

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Manajemen Tag</h1>
          <p className="mt-2 text-muted-foreground">Tambah, edit, hapus, dan cari tag konten.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <form action={saveTagAction} className="grid gap-4 rounded-lg border border-border bg-white p-5 md:grid-cols-[1fr_1fr_auto]">
            <div className="space-y-2">
              <Label htmlFor="name">Nama tag</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="otomatis" />
            </div>
            <Button type="submit" className="self-end">Tambah Tag</Button>
          </form>

          <form className="rounded-lg border border-border bg-white p-5">
            <Label htmlFor="q">Search tag</Label>
            <div className="mt-2 flex gap-2">
              <Input id="q" name="q" defaultValue={params.q ?? ""} placeholder="Cari nama tag..." />
              <Button type="submit" variant="outline">Cari</Button>
            </div>
          </form>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {tags.map((tag) => (
            <form key={tag.id} action={saveTagAction} className="grid gap-3 rounded-lg border border-border bg-white p-4 sm:grid-cols-[1fr_1fr_auto_auto]">
              <input type="hidden" name="id" value={tag.id} />
              <Input name="name" defaultValue={tag.name} aria-label="Nama tag" />
              <Input name="slug" defaultValue={tag.slug} aria-label="Slug tag" />
              <Button type="submit" variant="outline">Simpan</Button>
              <Button form={`delete-tag-${tag.id}`} type="submit" variant="outline" aria-label="Hapus tag">
                <Trash2 className="h-4 w-4" />
              </Button>
            </form>
          ))}
          {tags.map((tag) => (
            <form key={`delete-${tag.id}`} id={`delete-tag-${tag.id}`} action={deleteTagAction}>
              <input type="hidden" name="id" value={tag.id} />
            </form>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
