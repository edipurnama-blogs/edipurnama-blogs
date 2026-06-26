"use client";

import { useMemo, useState } from "react";
import { Save } from "lucide-react";

import { saveBookAction } from "@/app/actions/admin";
import type { Book } from "@/lib/admin-data";
import { bookStatuses, metaDescriptionFrom, slugify } from "@/lib/content-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BookForm({ book }: { book?: Book | null }) {
  const [title, setTitle] = useState(book?.title ?? "");
  const [description, setDescription] = useState(book?.description ?? "");
  const generatedSlug = useMemo(() => slugify(title), [title]);
  const generatedMetaDescription = useMemo(() => metaDescriptionFrom(description), [description]);

  return (
    <form action={saveBookAction} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <input type="hidden" name="id" value={book?.id ?? ""} />
      <input type="hidden" name="existing_cover_image_path" value={book?.cover_image_path ?? ""} />
      <input type="hidden" name="existing_cover_image_url" value={book?.cover_image_url ?? ""} />

      <section className="space-y-5 rounded-lg border border-border bg-white p-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Judul Buku</Label>
            <Input id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug Otomatis</Label>
            <Input id="slug" name="slug" value={generatedSlug} readOnly className="bg-muted text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subjudul</Label>
            <Input id="subtitle" name="subtitle" defaultValue={book?.subtitle ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publisher">Penerbit</Label>
            <Input id="publisher" name="publisher" defaultValue={book?.publisher ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="published_year">Tahun Terbit</Label>
            <Input id="published_year" name="published_year" type="number" defaultValue={book?.published_year ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" name="isbn" defaultValue={book?.isbn ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchase_url">Link Pembelian</Label>
            <Input id="purchase_url" name="purchase_url" type="url" defaultValue={book?.purchase_url ?? ""} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </section>

      <aside className="space-y-5">
        <section className="space-y-4 rounded-lg border border-border bg-white p-5">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={book?.status ?? "draft"}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                {bookStatuses.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort_order">Urutan Tampil</Label>
            <Input id="sort_order" name="sort_order" type="number" defaultValue={book?.sort_order ?? 0} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_image">Cover Buku</Label>
            <Input id="cover_image" name="cover_image" type="file" accept="image/*" />
            {book?.cover_image_url ? <p className="break-all text-xs text-muted-foreground">{book.cover_image_url}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_image_alt">Alt Text Cover</Label>
            <Input id="cover_image_alt" name="cover_image_alt" defaultValue={book?.cover_image_alt ?? ""} />
          </div>
        </section>

        <section className="space-y-4 rounded-lg border border-border bg-white p-5">
          <h2 className="font-semibold">SEO</h2>
          <div className="space-y-2">
            <Label htmlFor="seo_title">SEO Title Otomatis</Label>
            <Input id="seo_title" name="seo_title" value={title} readOnly className="bg-muted text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seo_description">Meta Description Otomatis</Label>
            <textarea
              id="seo_description"
              name="seo_description"
              value={generatedMetaDescription}
              readOnly
              rows={3}
              maxLength={180}
              className="w-full rounded-2xl border border-input bg-muted px-4 py-3 text-sm text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button className="w-full gap-2" type="submit">
            <Save className="h-4 w-4" />
            Simpan Buku
          </Button>
        </section>
      </aside>
    </form>
  );
}
