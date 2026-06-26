import type { Metadata } from "next";

import { ListingPage } from "@/components/public/listing-page";
import { getPublicPostsByType } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Kisah Inspiratif",
  description: "Kisah hikmah, sirah, pengalaman dakwah, dan cerita inspiratif Islami.",
};

export const dynamic = "force-dynamic";

export default async function KisahPage() {
  return (
    <ListingPage
      eyebrow="Kisah"
      title="Kisah Inspiratif dan Hikmah"
      description="Kumpulan kisah Islami, sirah, pengalaman dakwah, dan hikmah kehidupan yang menguatkan iman."
      posts={await getPublicPostsByType("story")}
    />
  );
}
