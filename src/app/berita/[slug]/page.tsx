import type { Metadata } from "next";

import { ContentDetailPage } from "@/components/public/content-detail-page";
import { getPublicPostBySlug } from "@/lib/public-data";
import { postMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicPostBySlug("news", slug);
  return postMetadata(post, "news");
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ContentDetailPage contentType="news" slug={slug} />;
}
