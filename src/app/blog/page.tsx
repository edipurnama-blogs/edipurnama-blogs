import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPostsByType } from "@/lib/dummy-content";

export const metadata: Metadata = {
  title: "Blog Harian",
  description: "Catatan harian dai, refleksi, perjalanan dakwah, dan pengalaman lapangan.",
};

export default function BlogPage() {
  return (
    <ListingPage
      eyebrow="Blog Harian"
      title="Catatan Dakwah dan Refleksi Harian"
      description="Tulisan ringan tentang perjalanan dakwah, pelajaran dari majelis, dan renungan kehidupan sehari-hari."
      posts={getPostsByType("daily_blog")}
    />
  );
}
