import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Berita Umat",
  description: "Berita kegiatan dakwah, seputar umat, kegiatan sosial, dan pendidikan Islam.",
};

export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  return (
    <ListingPage
      eyebrow="Berita Umat"
      title="Berita dan Seputar Umat"
      description="Kabar kegiatan dakwah, isu umat, program sosial, dan dokumentasi kegiatan komunitas muslim."
      posts={await getPublicPostsByType("news")}
    />
  );
}
