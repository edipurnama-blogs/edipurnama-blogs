import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { PublicNavbar } from "@/components/public/public-navbar";
import { site as fallbackSite } from "@/lib/dummy-content";
import { getSiteSettings } from "@/lib/admin-data";

function getSocialLinks(site: Awaited<ReturnType<typeof getSiteSettings>>) {
  return [
    { label: "Instagram", url: site.instagram_url },
    { label: "YouTube", url: site.youtube_url },
    { label: "WhatsApp", url: site.whatsapp_url },
    { label: "Facebook", url: site.facebook_url },
    { label: "TikTok", url: site.tiktok_url },
  ].filter((item): item is { label: string; url: string } => Boolean(item.url));
}

export function PublicFooter({ site }: { site: Awaited<ReturnType<typeof getSiteSettings>> }) {
  const socials = getSocialLinks(site);

  return (
    <footer id="kontak" className="border-t border-border bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 font-semibold">
            <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <span>{site.site_name}</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">{site.site_description ?? fallbackSite.description}</p>
          <a className="inline-flex items-center gap-2 text-sm font-medium text-primary" href={`mailto:${site.contact_email ?? fallbackSite.email}`}>
            {site.contact_email ?? fallbackSite.email}
          </a>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold text-foreground">Navigasi</h2>
          <div className="grid gap-3">
            <Link href="/profil" className="text-sm text-muted-foreground hover:text-primary">Profil</Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link>
            <Link href="/artikel" className="text-sm text-muted-foreground hover:text-primary">Artikel Islam</Link>
            <Link href="/berita" className="text-sm text-muted-foreground hover:text-primary">Berita Umat</Link>
            <Link href="/karya-buku" className="text-sm text-muted-foreground hover:text-primary">Karya Buku</Link>
            <Link href="#kontak" className="text-sm text-muted-foreground hover:text-primary">Kontak</Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold text-foreground">Sosial Media</h2>
          <div className="grid gap-3">
            {(socials.length > 0 ? socials : fallbackSite.socials).map((item) => (
              <a key={item.label} href={item.url} className="text-sm text-muted-foreground hover:text-primary" target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 {site.site_name}. Semua hak cipta dilindungi.
      </div>
    </footer>
  );
}

export async function PublicShell({ children }: { children: ReactNode }) {
  const site = await getSiteSettings();

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar site={site} />
      {children}
      <PublicFooter site={site} />
    </div>
  );
}
