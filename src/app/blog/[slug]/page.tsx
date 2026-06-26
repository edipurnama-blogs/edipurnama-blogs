import type { Metadata } from "next";

import { ContentDetailPage } from "@/components/public/content-detail-page";
import { getPostBySlug } from "@/lib/dummy-content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("daily_blog", slug);
  return { title: post?.title ?? "Blog Harian", description: post?.excerpt };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ContentDetailPage contentType="daily_blog" slug={slug} />;
}
