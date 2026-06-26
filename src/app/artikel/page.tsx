import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Artikel Islam",
  description: "Artikel keislaman tematik tentang akidah, ibadah, akhlak, keluarga, dan dakwah.",
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

export default async function ArtikelPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <ListingPage
      basePath="/artikel"
      eyebrow="Artikel Islam"
      title="Artikel Keislaman Tematik"
      description="Pembahasan akidah, ibadah, akhlak, keluarga muslim, dan dakwah dengan bahasa yang rapi dan mudah dipahami."
      posts={await getPublicPostsByType("islamic_article")}
      searchParams={params}
    />
  );
}
