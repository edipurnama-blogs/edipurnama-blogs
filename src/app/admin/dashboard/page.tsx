import { logoutAction } from "@/app/actions/auth";
import { requireAdminUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const setupItems = [
  "Supabase SSR client/server siap dipakai di route dan server action.",
  "Middleware melindungi semua route admin selain login dan unauthorized.",
  "SQL schema lengkap tersedia di supabase/schema.sql.",
  "Role admin diverifikasi dari tabel profiles sebelum akses dashboard diberikan.",
];

export default async function AdminDashboardPage() {
  const { user, profile } = await requireAdminUser();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-primary/15 bg-white/80 p-8 shadow-lg shadow-primary/5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Badge>Protected Admin Route</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard Foundation</h1>
          <p className="text-muted-foreground">
            Login berhasil untuk <span className="font-medium text-foreground">{profile.display_name ?? user.email}</span>.
          </p>
        </div>

        <form action={logoutAction}>
          <Button variant="outline" type="submit">
            Keluar
          </Button>
        </form>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
            <CardDescription>Data admin yang dibaca dari Supabase Auth dan tabel profiles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">Email:</span> {user.email}
            </div>
            <div>
              <span className="text-muted-foreground">Username:</span> {profile.username ?? "-"}
            </div>
            <div>
              <span className="text-muted-foreground">Role:</span> {profile.role}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phase 1 Status</CardTitle>
            <CardDescription>Checklist fondasi yang sudah selesai di project ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {setupItems.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
