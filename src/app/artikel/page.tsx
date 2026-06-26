import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPostsByType } from "@/lib/dummy-content";

export const metadata: Metadata = {
  title: "Artikel Islam",
  description: "Artikel keislaman tematik tentang akidah, ibadah, akhlak, keluarga, dan dakwah.",
};

export default function ArtikelPage() {
  return (
    <ListingPage
      eyebrow="Artikel Islam"
      title="Artikel Keislaman Tematik"
      description="Pembahasan akidah, ibadah, akhlak, keluarga muslim, dan dakwah dengan bahasa yang rapi dan mudah dipahami."
      posts={getPostsByType("islamic_article")}
    />
  );
}
