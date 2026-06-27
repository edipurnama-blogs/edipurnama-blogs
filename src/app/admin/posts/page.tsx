import Link from "next/link";
import { Archive, Edit, Eye, Plus, Trash2 } from "lucide-react";

import { deletePostAction, updatePostStatusAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { ToastMessage } from "@/components/ui/toast-message";
import { contentTypes, getPosts, publicationStatuses } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";
import { contentTypeLabel, contentTypePath, formatDate } from "@/lib/dummy-content";

type PostsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    type?: string;
    error?: string;
    success?: string;
  }>;
};

export default async function AdminPostsPage({ searchParams }: PostsPageProps) {
  const { profile } = await requireAdminUser();
  const params = await searchParams;
  const posts = await getPosts();
  const query = params.q?.toLowerCase().trim() ?? "";

  const filteredPosts = posts.filter((post) => {
    const matchQuery = !query || post.title.toLowerCase().includes(query);
    const matchStatus = !params.status || params.status === "all" || post.status === params.status;
    const matchType = !params.type || params.type === "all" || post.content_type === params.type;
    return matchQuery && matchStatus && matchType;
  });

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <ToastMessage error={params.error} success={params.success} />
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Manajemen Konten</h1>
            <p className="mt-2 text-muted-foreground">CRUD blog harian, artikel Islam, berita, tausiyah, khutbah, opini, dan kisah.</p>
          </div>
          <Button asChild>
            <Link href="/admin/posts/new" className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Konten
            </Link>
          </Button>
        </header>

        <form className="grid gap-3 rounded-lg border border-border bg-white p-4 md:grid-cols-[1fr_220px_220px_auto]">
          <Input name="q" placeholder="Search judul..." defaultValue={params.q ?? ""} />
          <Select name="status" defaultValue={params.status ?? "all"}>
            <SelectTrigger>
              <SelectValue placeholder="Semua status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua status</SelectItem>
            {publicationStatuses.map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
            </SelectContent>
          </Select>
          <Select name="type" defaultValue={params.type ?? "all"}>
            <SelectTrigger>
              <SelectValue placeholder="Semua tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua tipe</SelectItem>
            {contentTypes.map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
            </SelectContent>
          </Select>
          <SubmitButton type="submit" variant="outline" className="gap-2" pendingChildren="Memfilter...">Filter</SubmitButton>
        </form>

        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-muted text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Gambar</th>
                  <th className="px-4 py-3">Judul</th>
                  <th className="px-4 py-3">Tipe</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Publish</th>
                  <th className="px-4 py-3">Penulis</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-4 py-3">
                      <div className="h-12 w-16 overflow-hidden rounded-md bg-muted">
                        {post.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={post.cover_image_url} alt={post.cover_image_alt ?? ""} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{post.title}</p>
                      <p className="text-xs text-muted-foreground">/{contentTypePath(post.content_type)}/{post.slug}</p>
                    </td>
                    <td className="px-4 py-3">{contentTypeLabel(post.content_type)}</td>
                    <td className="px-4 py-3">{post.categories?.name ?? "-"}</td>
                    <td className="px-4 py-3"><Badge variant="outline">{post.status}</Badge></td>
                    <td className="px-4 py-3">{formatDate(post.published_at)}</td>
                    <td className="px-4 py-3">{post.profiles?.display_name ?? post.profiles?.email ?? "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/posts/${post.id}/preview`} aria-label="View">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/posts/${post.id}/edit`} aria-label="Edit">
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <form action={updatePostStatusAction}>
                          <input type="hidden" name="id" value={post.id} />
                          <input type="hidden" name="status" value={post.status === "published" ? "draft" : "published"} />
                          <SubmitButton size="sm" variant="outline" type="submit" aria-label="Publish atau draft">
                            <Archive className="h-4 w-4" />
                          </SubmitButton>
                        </form>
                        <form action={deletePostAction}>
                          <input type="hidden" name="id" value={post.id} />
                          <ConfirmDeleteButton size="sm" variant="outline" type="submit" aria-label="Delete" confirmMessage={`Apakah yakin ingin menghapus konten "${post.title}"?`}>
                            <Trash2 className="h-4 w-4" />
                          </ConfirmDeleteButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
