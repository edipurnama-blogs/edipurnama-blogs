"use client";

import { useMemo, useState } from "react";
import { Save } from "lucide-react";

import { savePostAction } from "@/app/actions/admin";
import type { Category, Post } from "@/lib/admin-data";
import { contentTypes, metaDescriptionFrom, publicationStatuses, slugify } from "@/lib/content-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PostForm({ post, categories, error }: { post?: Post | null; categories: Category[]; error?: string }) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const generatedSlug = useMemo(() => slugify(title), [title]);
  const generatedMetaDescription = useMemo(() => metaDescriptionFrom(excerpt), [excerpt]);

  return (
    <form action={savePostAction} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <input type="hidden" name="id" value={post?.id ?? ""} />
      <input type="hidden" name="existing_cover_image_path" value={post?.cover_image_path ?? ""} />
      <input type="hidden" name="existing_cover_image_url" value={post?.cover_image_url ?? ""} />

      <section className="space-y-5 rounded-lg border border-border bg-white p-5">
        {error ? (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Judul</Label>
            <Input id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug Otomatis</Label>
            <Input id="slug" name="slug" value={generatedSlug} readOnly className="bg-muted text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category_id">Kategori</Label>
            <Select name="category_id" defaultValue={post?.category_id ?? "none"}>
              <SelectTrigger id="category_id">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Tanpa kategori</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Isi Konten Markdown</Label>
          <textarea
            id="content"
            name="content"
            defaultValue={post?.content ?? ""}
            rows={18}
            required
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </section>

      <aside className="space-y-5">
        <section className="space-y-4 rounded-lg border border-border bg-white p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="space-y-2">
              <Label htmlFor="content_type">Tipe Konten</Label>
              <Select name="content_type" defaultValue={post?.content_type ?? "daily_blog"}>
                <SelectTrigger id="content_type">
                  <SelectValue placeholder="Pilih tipe konten" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={post?.status ?? "draft"}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {publicationStatuses.map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_featured" defaultChecked={post?.is_featured ?? false} className="h-4 w-4 accent-primary" />
            Featured content
          </label>

          <div className="space-y-2">
            <Label htmlFor="cover_image">Cover Image</Label>
            <Input id="cover_image" name="cover_image" type="file" accept="image/*" />
            {post?.cover_image_url ? <p className="break-all text-xs text-muted-foreground">{post.cover_image_url}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_image_alt">Alt Text Gambar</Label>
            <Input id="cover_image_alt" name="cover_image_alt" defaultValue={post?.cover_image_alt ?? ""} />
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
          <div className="space-y-2">
            <Label htmlFor="canonical_url">Canonical URL</Label>
            <Input id="canonical_url" name="canonical_url" defaultValue={post?.canonical_url ?? ""} />
          </div>
          <Button className="w-full gap-2" type="submit">
            <Save className="h-4 w-4" />
            Simpan Konten
          </Button>
        </section>
      </aside>
    </form>
  );
}
