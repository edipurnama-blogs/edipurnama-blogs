import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPostsByType } from "@/lib/dummy-content";

export const metadata: Metadata = {
  title: "Berita Umat",
  description: "Berita kegiatan dakwah, seputar umat, kegiatan sosial, dan pendidikan Islam.",
};

export default function BeritaPage() {
  return (
    <ListingPage
      eyebrow="Berita Umat"
      title="Berita dan Seputar Umat"
      description="Kabar kegiatan dakwah, isu umat, program sosial, dan dokumentasi kegiatan komunitas muslim."
      posts={getPostsByType("news")}
    />
  );
}
