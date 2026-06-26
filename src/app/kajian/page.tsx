import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPostsByType } from "@/lib/dummy-content";

export const metadata: Metadata = {
  title: "Kajian dan Tausiyah",
  description: "Ringkasan kajian, tausiyah, catatan ceramah, dan materi dakwah.",
};

export default function KajianPage() {
  return (
    <ListingPage
      eyebrow="Kajian"
      title="Kajian dan Tausiyah Pilihan"
      description="Ringkasan nasihat, materi kajian, dan catatan ceramah untuk dibaca ulang dengan nyaman."
      posts={getPostsByType("tausiyah")}
    />
  );
}
