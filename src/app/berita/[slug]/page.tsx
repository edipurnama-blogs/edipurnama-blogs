import type { Metadata } from "next";

import { ContentDetailPage } from "@/components/public/content-detail-page";
import { getPostBySlug } from "@/lib/dummy-content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("news", slug);
  return { title: post?.title ?? "Berita Umat", description: post?.excerpt };
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ContentDetailPage contentType="news" slug={slug} />;
}
