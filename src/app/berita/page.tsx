import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";
import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata({
  title: "Berita Umat",
  description: "Berita kegiatan dakwah, seputar umat, kegiatan sosial, dan pendidikan Islam.",
  path: "/berita",
});

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    tag?: string;
    page?: string;
  }>;
};

export default async function BeritaPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <ListingPage
      basePath="/berita"
      eyebrow="Berita Umat"
      title="Berita dan Seputar Umat"
      description="Kabar kegiatan dakwah, isu umat, program sosial, dan dokumentasi kegiatan komunitas muslim."
      posts={await getPublicPostsByType("news")}
      searchParams={params}
    />
  );
}
