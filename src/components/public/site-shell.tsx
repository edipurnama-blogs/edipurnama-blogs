import Link from "next/link";
import { BookOpen, Mail, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/dummy-content";

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

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/92 backdrop-blur">
      <nav className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-foreground">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
            <BookOpen className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm">{site.name}</span>
            <span className="block text-xs font-normal text-muted-foreground">Blog Dai Islami</span>
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

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="size-10 rounded-full px-0" aria-label="Cari konten">
            <Link href="/search">
              <Search className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </nav>
      <div className="border-t border-border/70 lg:hidden">
        <div className="mx-auto flex w-full max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer id="kontak" className="border-t border-border bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 font-semibold">
            <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <span>{site.name}</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">{site.description}</p>
          <a className="inline-flex items-center gap-2 text-sm font-medium text-primary" href={`mailto:${site.email}`}>
            <Mail className="size-4" aria-hidden="true" />
            {site.email}
          </a>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold text-foreground">Navigasi</h2>
          <div className="grid gap-3">
            {navItems.slice(0, 6).map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold text-foreground">Sosial Media</h2>
          <div className="grid gap-3">
            {site.socials.map((item) => (
              <a key={item.label} href={item.url} className="text-sm text-muted-foreground hover:text-primary">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 {site.name}. Semua hak cipta dilindungi.
      </div>
    </footer>
  );
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      {children}
      <PublicFooter />
    </div>
  );
}
