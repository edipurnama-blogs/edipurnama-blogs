import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const reasonMap: Record<string, string> = {
  "profile-not-found": "Row profil admin tidak ditemukan untuk user yang sedang login.",
  "profile-inactive": "Akun ditemukan, tetapi status is_active bernilai false.",
  "role-not-admin": "Akun ditemukan, tetapi role bukan super_admin, admin, atau editor.",
};

type UnauthorizedPageProps = {
  searchParams: Promise<{
    reason?: string;
  }>;
};

export default async function UnauthorizedPage({ searchParams }: UnauthorizedPageProps) {
  const params = await searchParams;
  const reason = params.reason ? reasonMap[params.reason] : null;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Akses Admin Ditolak</CardTitle>
          <CardDescription>
            Akun berhasil terautentikasi, tetapi belum memiliki role admin aktif di tabel <code>profiles</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reason ? (
            <p className="mb-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {reason}
            </p>
          ) : null}

          <Button asChild>
            <Link href="/admin/login">Kembali ke Login</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
