"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, DoorOpen, Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site as fallbackSite } from "@/lib/dummy-content";
import type { SiteSettings } from "@/lib/site-settings";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/profil", label: "Profil" },
  { href: "/blog", label: "Blog" },
  { href: "/artikel", label: "Artikel Islam" },
  { href: "/berita", label: "Berita Umat" },
  { href: "/kisah", label: "Kisah" },
  { href: "/karya-buku", label: "Karya Buku" },
  { href: "#kontak", label: "Kontak" },
];

function getSocialLabel(url: string) {
  if (url.includes("instagram")) return "Instagram";
  if (url.includes("youtube")) return "YouTube";
  if (url.includes("wa.me") || url.includes("whatsapp")) return "WhatsApp";
  if (url.includes("facebook")) return "Facebook";
  if (url.includes("tiktok")) return "TikTok";
  return "Sosial Media";
}

export function PublicNavbar({ site }: { site: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const socials = [
    site.instagram_url,
    site.youtube_url,
    site.whatsapp_url,
    site.facebook_url,
    site.tiktok_url,
  ].filter((url): url is string => Boolean(url));

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/92 backdrop-blur">
      <nav className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 font-semibold text-foreground">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <BookOpen className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="hidden truncate text-sm sm:block">{site.site_name}</span>
            <span className="hidden text-xs font-normal text-muted-foreground sm:block">
              {site.site_tagline ?? fallbackSite.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm" className="size-10 rounded-full px-0" aria-label="Cari konten">
            <Link href="/search">
              <Search className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="size-10 rounded-full px-0" aria-label="Login admin">
            <Link href="/admin/login">
              <DoorOpen className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="size-10 rounded-full px-0 lg:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
        </Button>
      </nav>

      <div
        className={cn(
          "border-t border-border/70 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 grid gap-2 rounded-xl border border-border bg-background p-3">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              <Search className="size-4" aria-hidden="true" />
              Cari Konten
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              <DoorOpen className="size-4" aria-hidden="true" />
              Login Admin
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {socials.length > 0
              ? socials.map((url) => (
                  <a
                    key={url}
                    href={url}
                    className="rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {getSocialLabel(url)}
                  </a>
                ))
              : fallbackSite.socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    className="rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                ))}
          </div>
        </div>
      </div>
    </header>
  );
}
