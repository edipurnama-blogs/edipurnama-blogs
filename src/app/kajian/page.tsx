import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Kajian dan Tausiyah",
  description: "Ringkasan kajian, tausiyah, catatan ceramah, dan materi dakwah.",
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

export default async function KajianPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <ListingPage
      basePath="/kajian"
      eyebrow="Kajian"
      title="Kajian dan Tausiyah Pilihan"
      description="Ringkasan nasihat, materi kajian, dan catatan ceramah untuk dibaca ulang dengan nyaman."
      posts={await getPublicPostsByType("tausiyah")}
      searchParams={params}
    />
  );
}
