import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Khutbah",
  description: "Naskah khutbah Jumat, Idulfitri, Iduladha, dan materi mimbar.",
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

export default async function KhutbahPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <ListingPage
      basePath="/khutbah"
      eyebrow="Khutbah"
      title="Naskah Khutbah dan Materi Mimbar"
      description="Kumpulan naskah khutbah dan materi mimbar yang siap dibaca, dipelajari, dan dikembangkan."
      posts={await getPublicPostsByType("khutbah")}
      searchParams={params}
    />
  );
}
