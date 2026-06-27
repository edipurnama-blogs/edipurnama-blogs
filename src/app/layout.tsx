import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";
import { getSiteSettings } from "@/lib/admin-data";
import { Toaster } from "@/components/ui/toaster";
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

function normalizeHexColor(color: string | null | undefined) {
  return /^#[0-9a-f]{6}$/i.test(color ?? "") ? color as string : "#14B8A6";
}

function readableForeground(hexColor: string) {
  const red = Number.parseInt(hexColor.slice(1, 3), 16);
  const green = Number.parseInt(hexColor.slice(3, 5), 16);
  const blue = Number.parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.62 ? "#0f172a" : "#f8fffe";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteSettings();
  const primaryColor = normalizeHexColor(site.primary_color);
  const themeVars = {
    "--primary": primaryColor,
    "--ring": primaryColor,
    "--primary-foreground": readableForeground(primaryColor),
  } as CSSProperties;

  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased" style={themeVars}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
