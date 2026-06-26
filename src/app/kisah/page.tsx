import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Kisah Inspiratif",
  description: "Kisah hikmah, sirah, pengalaman dakwah, dan cerita inspiratif Islami.",
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

export default async function KisahPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <ListingPage
      basePath="/kisah"
      eyebrow="Kisah"
      title="Kisah Inspiratif dan Hikmah"
      description="Kumpulan kisah Islami, sirah, pengalaman dakwah, dan hikmah kehidupan yang menguatkan iman."
      posts={await getPublicPostsByType("story")}
      searchParams={params}
    />
  );
}
