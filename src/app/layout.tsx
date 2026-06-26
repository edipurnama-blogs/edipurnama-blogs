import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Blog Dai Islami",
    template: "%s | Blog Dai Islami",
  },
  description: "Website blog dai Islami berisi profil, blog harian, artikel Islam, berita umat, kajian, dan karya buku.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Blog Dai Islami",
    description: "Website blog dai Islami berisi profil, blog harian, artikel Islam, berita umat, kajian, dan karya buku.",
    url: absoluteUrl("/"),
    siteName: "Blog Dai Islami",
    locale: "id_ID",
    type: "website",
    images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Blog Dai Islami" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Dai Islami",
    description: "Website blog dai Islami berisi profil, blog harian, artikel Islam, berita umat, kajian, dan karya buku.",
    images: [absoluteUrl("/opengraph-image")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
