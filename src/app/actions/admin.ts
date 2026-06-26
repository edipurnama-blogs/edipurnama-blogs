"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminUser } from "@/lib/auth";
import { metaDescriptionFrom, readingTime, slugify } from "@/lib/content-options";
import { contentTypePath } from "@/lib/dummy-content";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type ContentType = Database["public"]["Enums"]["content_type"];
type PublicationStatus = Database["public"]["Enums"]["publication_status"];
type BookStatus = Database["public"]["Enums"]["book_status"];

function mutableTable(supabase: ReturnType<typeof createAdminClient>, table: string) {
  return supabase.from(table as never) as unknown as {
    insert: (payload: unknown) => PromiseLike<{ error: { message: string } | null }>;
    update: (payload: unknown) => { eq: (column: string, value: string) => PromiseLike<{ error: { message: string } | null }> };
    delete: () => { eq: (column: string, value: string) => PromiseLike<{ error: { message: string } | null }> };
  };
}

function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/artikel");
  revalidatePath("/berita");
  revalidatePath("/kajian");
  revalidatePath("/khutbah");
  revalidatePath("/opini");
  revalidatePath("/kisah");
  revalidatePath("/search");
}

function revalidatePublicBooks() {
  revalidatePath("/");
  revalidatePath("/karya-buku");
}

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function numberValue(formData: FormData, key: string) {
  const value = stringValue(formData, key);
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function boolValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function nullableSelectValue(formData: FormData, key: string, emptyValue = "none") {
  const value = stringValue(formData, key);
  return !value || value === emptyValue ? null : value;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan data.";
}

function redirectWithError(path: string, error: unknown): never {
  redirect(`${path}?error=${encodeURIComponent(errorMessage(error))}`);
}

async function uploadImageFromForm(formData: FormData, key: string, bucket: string, folder: string, uploaderId: string) {
  const file = formData.get(key);

  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  const supabase = createAdminClient();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  await mutableTable(supabase, "media_assets").insert({
    uploader_id: uploaderId,
    bucket_name: bucket,
    file_path: path,
    public_url: data.publicUrl,
    file_name: file.name,
    mime_type: file.type,
    size_bytes: file.size,
    alt_text: stringValue(formData, "cover_image_alt") ?? stringValue(formData, "alt_text"),
  });

  return {
    path,
    publicUrl: data.publicUrl,
  };
}

export async function savePostAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const supabase = createAdminClient();
  const id = stringValue(formData, "id");
  const formPath = id ? `/admin/posts/${id}/edit` : "/admin/posts/new";
  const title = stringValue(formData, "title");
  const slug = slugify(title ?? "");

  if (!title || !slug) {
    redirectWithError(formPath, new Error("Judul dan slug wajib diisi."));
  }

  const content = stringValue(formData, "content") ?? "";
  const excerpt = stringValue(formData, "excerpt");
  let upload: Awaited<ReturnType<typeof uploadImageFromForm>>;
  try {
    upload = await uploadImageFromForm(formData, "cover_image", "blog-images", "posts", user.id);
  } catch (error) {
    redirectWithError(formPath, error);
  }

  const status = (stringValue(formData, "status") ?? "draft") as PublicationStatus;

  const payload = {
    author_id: user.id,
    category_id: nullableSelectValue(formData, "category_id"),
    content_type: (stringValue(formData, "content_type") ?? "daily_blog") as ContentType,
    status,
    title,
    slug,
    excerpt,
    content,
    cover_image_path: upload?.path ?? stringValue(formData, "existing_cover_image_path"),
    cover_image_url: upload?.publicUrl ?? stringValue(formData, "existing_cover_image_url"),
    cover_image_alt: stringValue(formData, "cover_image_alt"),
    is_featured: boolValue(formData, "is_featured"),
    reading_time_minutes: readingTime(content),
    seo_title: title,
    seo_description: metaDescriptionFrom(excerpt),
    canonical_url: stringValue(formData, "canonical_url"),
  };

  const { error } = id
    ? await mutableTable(supabase, "posts").update(payload).eq("id", id)
    : await mutableTable(supabase, "posts").insert(payload);

  if (error) redirectWithError(formPath, error);

  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  revalidatePublicContent();
  revalidatePath(`/${contentTypePath(payload.content_type)}/${payload.slug}`);
  redirect("/admin/posts");
}

export async function updatePostStatusAction(formData: FormData) {
  await requireAdminUser();
  const id = stringValue(formData, "id");
  const status = stringValue(formData, "status") as PublicationStatus | null;
  if (!id || !status) throw new Error("Post dan status wajib diisi.");

  const supabase = createAdminClient();
  const { error } = await mutableTable(supabase, "posts").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  revalidatePublicContent();
}

export async function deletePostAction(formData: FormData) {
  await requireAdminUser();
  const id = stringValue(formData, "id");
  if (!id) throw new Error("Post wajib dipilih.");

  const supabase = createAdminClient();
  const { error } = await mutableTable(supabase, "posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
  revalidatePublicContent();
}

export async function saveCategoryAction(formData: FormData) {
  await requireAdminUser();
  const supabase = createAdminClient();
  const id = stringValue(formData, "id");
  const name = stringValue(formData, "name");
  const slug = slugify(stringValue(formData, "slug") ?? name ?? "");
  if (!name || !slug) throw new Error("Nama kategori dan slug wajib diisi.");

  const payload = {
    name,
    slug,
    description: stringValue(formData, "description"),
    color: stringValue(formData, "color"),
    sort_order: numberValue(formData, "sort_order") ?? 0,
    is_active: boolValue(formData, "is_active"),
  };

  const { error } = id
    ? await mutableTable(supabase, "categories").update(payload).eq("id", id)
    : await mutableTable(supabase, "categories").insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
  revalidatePath("/admin/posts");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdminUser();
  const id = stringValue(formData, "id");
  if (!id) throw new Error("Kategori wajib dipilih.");

  const supabase = createAdminClient();
  const { error } = await mutableTable(supabase, "categories").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/categories");
}

export async function saveTagAction(formData: FormData) {
  await requireAdminUser();
  const supabase = createAdminClient();
  const id = stringValue(formData, "id");
  const name = stringValue(formData, "name");
  const slug = slugify(stringValue(formData, "slug") ?? name ?? "");
  if (!name || !slug) throw new Error("Nama tag dan slug wajib diisi.");

  const payload = { name, slug };
  const { error } = id ? await mutableTable(supabase, "tags").update(payload).eq("id", id) : await mutableTable(supabase, "tags").insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/tags");
}

export async function deleteTagAction(formData: FormData) {
  await requireAdminUser();
  const id = stringValue(formData, "id");
  if (!id) throw new Error("Tag wajib dipilih.");

  const supabase = createAdminClient();
  const { error } = await mutableTable(supabase, "tags").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/tags");
}

export async function saveBookAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const supabase = createAdminClient();
  const id = stringValue(formData, "id");
  const title = stringValue(formData, "title");
  const slug = slugify(title ?? "");
  if (!title || !slug) throw new Error("Judul dan slug wajib diisi.");
  const upload = await uploadImageFromForm(formData, "cover_image", "book-covers", "books", user.id);
  const description = stringValue(formData, "description");

  const payload = {
    author_id: user.id,
    title,
    slug,
    subtitle: stringValue(formData, "subtitle"),
    description,
    cover_image_path: upload?.path ?? stringValue(formData, "existing_cover_image_path"),
    cover_image_url: upload?.publicUrl ?? stringValue(formData, "existing_cover_image_url"),
    cover_image_alt: stringValue(formData, "cover_image_alt"),
    publisher: stringValue(formData, "publisher"),
    published_year: numberValue(formData, "published_year"),
    isbn: stringValue(formData, "isbn"),
    purchase_url: stringValue(formData, "purchase_url"),
    status: (stringValue(formData, "status") ?? "draft") as BookStatus,
    sort_order: numberValue(formData, "sort_order") ?? 0,
    seo_title: title,
    seo_description: metaDescriptionFrom(description),
  };

  const { error } = id ? await mutableTable(supabase, "books").update(payload).eq("id", id) : await mutableTable(supabase, "books").insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/books");
  revalidatePath("/admin/dashboard");
  revalidatePublicBooks();
  revalidatePath(`/karya-buku/${payload.slug}`);
  redirect("/admin/books");
}

export async function deleteBookAction(formData: FormData) {
  await requireAdminUser();
  const id = stringValue(formData, "id");
  if (!id) throw new Error("Buku wajib dipilih.");

  const supabase = createAdminClient();
  const { error } = await mutableTable(supabase, "books").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/books");
  revalidatePath("/admin/dashboard");
  revalidatePublicBooks();
}

export async function uploadMediaAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const bucket = stringValue(formData, "bucket_name") ?? "blog-images";
  await uploadImageFromForm(formData, "file", bucket, "media", user.id);
  revalidatePath("/admin/media");
}

export async function deleteMediaAction(formData: FormData) {
  await requireAdminUser();
  const id = stringValue(formData, "id");
  const bucket = stringValue(formData, "bucket_name");
  const filePath = stringValue(formData, "file_path");
  if (!id || !bucket || !filePath) throw new Error("Media wajib dipilih.");

  const supabase = createAdminClient();
  await supabase.storage.from(bucket).remove([filePath]);
  const { error } = await mutableTable(supabase, "media_assets").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/media");
}

export async function updateAccountAction(formData: FormData) {
  const { user } = await requireAdminUser();
  const supabase = createAdminClient();
  const password = stringValue(formData, "password");

  const { error } = await mutableTable(supabase, "profiles")
    .update({
      username: stringValue(formData, "username"),
      display_name: stringValue(formData, "display_name"),
      bio: stringValue(formData, "bio"),
    })
    .eq("id", user.id);

  if (error) throw new Error(error.message);

  if (password) {
    const userSupabase = await createClient();
    const { error: passwordError } = await userSupabase.auth.updateUser({ password });
    if (passwordError) throw new Error(passwordError.message);
  }

  revalidatePath("/admin/settings/account");
}
