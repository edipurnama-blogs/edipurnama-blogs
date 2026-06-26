import { Copy, Trash2, Upload } from "lucide-react";

import { deleteMediaAction, uploadMediaAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMediaAssets } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";
import { formatDate } from "@/lib/dummy-content";

export default async function AdminMediaPage() {
  const { profile } = await requireAdminUser();
  const mediaAssets = await getMediaAssets();

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Upload Gambar</h1>
          <p className="mt-2 text-muted-foreground">Upload ke bucket blog-images, book-covers, atau avatars dan simpan metadata media.</p>
        </div>

        <form action={uploadMediaAction} className="grid gap-4 rounded-lg border border-border bg-white p-5 md:grid-cols-[220px_1fr_1fr_auto]">
          <div className="space-y-2">
            <Label htmlFor="bucket_name">Bucket</Label>
            <Select name="bucket_name" defaultValue="blog-images">
              <SelectTrigger id="bucket_name">
                <SelectValue placeholder="Pilih bucket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blog-images">blog-images</SelectItem>
                <SelectItem value="book-covers">book-covers</SelectItem>
                <SelectItem value="avatars">avatars</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">File gambar</Label>
            <Input id="file" name="file" type="file" accept="image/*" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alt_text">Alt text</Label>
            <Input id="alt_text" name="alt_text" />
          </div>
          <Button type="submit" className="self-end gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </form>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mediaAssets.map((asset) => (
            <article key={asset.id} className="overflow-hidden rounded-lg border border-border bg-white">
              <div className="aspect-video bg-muted">
                {asset.public_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset.public_url} alt={asset.alt_text ?? ""} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <p className="font-medium">{asset.file_name ?? asset.file_path}</p>
                  <p className="text-xs text-muted-foreground">{asset.bucket_name} · {formatDate(asset.created_at)}</p>
                </div>
                <p className="break-all rounded-lg bg-muted px-3 py-2 text-xs">{asset.public_url ?? asset.file_path}</p>
                <div className="flex justify-between gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={asset.public_url ?? "#"} target="_blank" rel="noreferrer" className="gap-2">
                      <Copy className="h-4 w-4" />
                      Buka URL
                    </a>
                  </Button>
                  <form action={deleteMediaAction}>
                    <input type="hidden" name="id" value={asset.id} />
                    <input type="hidden" name="bucket_name" value={asset.bucket_name} />
                    <input type="hidden" name="file_path" value={asset.file_path} />
                    <Button type="submit" variant="outline" size="sm" aria-label="Hapus media">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
