import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Blog Harian",
  description: "Catatan harian dai, refleksi, perjalanan dakwah, dan pengalaman lapangan.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  return (
    <ListingPage
      eyebrow="Blog Harian"
      title="Catatan Dakwah dan Refleksi Harian"
      description="Tulisan ringan tentang perjalanan dakwah, pelajaran dari majelis, dan renungan kehidupan sehari-hari."
      posts={await getPublicPostsByType("daily_blog")}
    />
  );
}
