"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { BookOpen, ChevronsLeft, ChevronsRight, FolderOpen, Gauge, ImageIcon, LogOut, Menu, Newspaper, Settings, Tags, UserCircle, UserCog, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { cn } from "@/lib/utils";

type Profile = {
  avatar_url: string | null;
  display_name: string | null;
  username: string | null;
  role: string;
};

type AdminShellClientProps = {
  children: ReactNode;
  profile: Profile;
  logoutAction: () => Promise<void>;
};

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/admin/posts", label: "Posts", icon: Newspaper },
  { href: "/admin/books", label: "Karya Buku", icon: BookOpen },
  { href: "/admin/categories", label: "Kategori", icon: FolderOpen },
  { href: "/admin/tags", label: "Tag", icon: Tags },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings/site", label: "Site Settings", icon: Settings },
  { href: "/admin/settings/account", label: "Account", icon: UserCog },
];

export function AdminShellClient({ children, profile, logoutAction }: AdminShellClientProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const laptopQuery = window.matchMedia("(min-width: 1280px)");

    const syncDefaultState = () => {
      setExpanded(laptopQuery.matches);
      setMobileOpen(false);
    };

    syncDefaultState();
    laptopQuery.addEventListener("change", syncDefaultState);

    return () => laptopQuery.removeEventListener("change", syncDefaultState);
  }, []);

  const profileName = profile.display_name ?? profile.username ?? "Admin";
  const sidebarExpanded = expanded || mobileOpen;

  return (
    <div className="min-h-screen bg-background">
      <button
        type="button"
        className={cn(
          "fixed inset-0 z-30 bg-slate-950/35 transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-label="Tutup sidebar"
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex border-r border-border bg-white shadow-xl shadow-slate-950/5 transition-[transform,width] duration-200 md:translate-x-0",
          sidebarExpanded ? "w-64" : "w-20",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col px-3 py-5">
          <div className={cn("flex items-center gap-2", sidebarExpanded ? "justify-between" : "justify-center")}>
            <Link
              href="/admin/dashboard"
              className={cn(
                "flex min-w-0 items-center gap-3 rounded-lg px-2 py-2 text-foreground hover:bg-accent",
                !sidebarExpanded && "justify-center",
              )}
              aria-label="Admin Dashboard"
              onClick={() => setMobileOpen(false)}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                EP
              </span>
              <span className={cn("min-w-0", !sidebarExpanded && "sr-only")}>
                <span className="block text-sm font-medium text-primary">Admin Blog Dai</span>
                <span className="mt-0.5 block truncate text-lg font-semibold">Edi Purnama</span>
              </span>
            </Link>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="size-9 rounded-full px-0 md:hidden"
              aria-label="Tutup sidebar"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <nav className="mt-6 grid gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={!expanded ? item.label : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                    sidebarExpanded ? "justify-start" : "justify-center",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className={cn("truncate", !sidebarExpanded && "sr-only")}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <form action={logoutAction} className="mt-auto pt-6">
            <SubmitButton variant="outline" className={cn("w-full gap-2", !sidebarExpanded && "size-10 px-0")} type="submit" title={!sidebarExpanded ? "Keluar" : undefined}>
              <LogOut className="size-4 shrink-0" aria-hidden="true" />
              <span className={cn(!sidebarExpanded && "sr-only")}>Keluar</span>
            </SubmitButton>
          </form>
        </div>
      </aside>

      <div className={cn("min-w-0 transition-[padding] duration-200", expanded ? "xl:pl-64 md:pl-64" : "md:pl-20")}>
        <header className="sticky top-0 z-20 border-b border-border bg-white/90 px-4 py-3 backdrop-blur sm:px-5">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="size-10 rounded-full px-0 md:hidden"
                aria-label="Buka sidebar"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="size-4" aria-hidden="true" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="hidden size-10 rounded-full px-0 md:inline-flex"
                aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
                aria-expanded={expanded}
                onClick={() => setExpanded((value) => !value)}
              >
                {expanded ? <ChevronsLeft className="size-4" aria-hidden="true" /> : <ChevronsRight className="size-4" aria-hidden="true" />}
              </Button>
            </div>

            <Link
              href="/admin/settings/account"
              className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1.5 text-right text-sm transition-colors hover:bg-accent"
              aria-label="Buka profil admin"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">{profileName}</span>
                <span className="block text-muted-foreground">{profile.role}</span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-muted text-primary">
                {profile.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt={profileName} className="h-full w-full object-cover" />
                ) : (
                  <UserCircle className="size-6" aria-hidden="true" />
                )}
              </span>
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
