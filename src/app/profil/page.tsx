import type { Metadata } from "next";
import Image from "next/image";

import { PublicShell } from "@/components/public/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { profile } from "@/lib/dummy-content";

export const metadata: Metadata = {
  title: "Profil",
  description: "Profil dai, fokus kajian, aktivitas dakwah, dan karya utama.",
};

export default function ProfilePage() {
  return (
    <PublicShell>
      <main className="bg-white">
        <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-border bg-secondary">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="w-fit">Profil Dai</Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
              <p className="text-lg leading-8 text-muted-foreground">{profile.longBio}</p>
            </div>
            <InfoGrid title="Fokus Dakwah" items={profile.focus} />
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            <InfoCard title="Pendidikan dan Pengembangan" items={profile.education} />
            <InfoCard title="Aktivitas Dakwah" items={profile.activities} />
            <InfoCard title="Karya Utama" items={profile.mainWorks} />
          </div>
        </section>
      </main>
    </PublicShell>
  );
}

function InfoGrid({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-3">
      <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-primary">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="outline">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="rounded-lg bg-white p-6">
      <h2 className="mb-5 font-sans text-xl font-semibold">{title}</h2>
      <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-primary/40 pl-3">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
