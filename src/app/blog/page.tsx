import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";
import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata({
  title: "Blog Harian",
  description: "Catatan harian dai, refleksi, perjalanan dakwah, dan pengalaman lapangan.",
  path: "/blog",
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

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <ListingPage
      basePath="/blog"
      eyebrow="Blog Harian"
      title="Catatan Dakwah dan Refleksi Harian"
      description="Tulisan ringan tentang perjalanan dakwah, pelajaran dari majelis, dan renungan kehidupan sehari-hari."
      posts={await getPublicPostsByType("daily_blog")}
      searchParams={params}
    />
  );
}
