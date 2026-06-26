import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { PostForm } from "@/components/admin/post-form";
import { getCategories, getPost } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditPostPage({ params, searchParams }: EditPostPageProps) {
  const { profile } = await requireAdminUser();
  const { id } = await params;
  const query = await searchParams;
  const [post, categories] = await Promise.all([getPost(id), getCategories()]);

  if (!post) notFound();

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Edit Konten</h1>
          <p className="mt-2 text-muted-foreground">{post.title}</p>
        </div>
        <PostForm post={post} categories={categories} error={query.error} />
      </div>
    </AdminShell>
  );
}
