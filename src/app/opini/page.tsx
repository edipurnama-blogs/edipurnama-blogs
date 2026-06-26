import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Opini",
  description: "Opini keumatan, sosial, dakwah, dan refleksi aktual.",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    tag?: string;
    page?: string;
  }>;
};

export default async function OpiniPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <ListingPage
      basePath="/opini"
      eyebrow="Opini"
      title="Opini Keumatan dan Sosial"
      description="Tulisan opini tentang isu umat, sosial, dakwah, pendidikan, dan kehidupan muslim masa kini."
      posts={await getPublicPostsByType("opinion")}
      searchParams={params}
    />
  );
}
