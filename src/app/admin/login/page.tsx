import type { Metadata } from "next";

import { loginAction } from "@/app/actions/auth";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { ToastMessage } from "@/components/ui/toast-message";

export const metadata: Metadata = {
  title: "Login Admin",
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <Card className="w-full max-w-md border-primary/15 shadow-xl shadow-primary/5">
        <CardHeader>
          <h1 className="text-xl font-semibold leading-none tracking-tight">Login Admin</h1>
          <CardDescription>Masuk menggunakan email dan password Supabase Auth.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-5">
            <ToastMessage error={params.error} />
            <input type="hidden" name="next" value={params.next ?? "/admin/dashboard"} />

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Masukkan password" required />
            </div>

            {params.error ? (
              <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {params.error}
              </p>
            ) : null}

            <SubmitButton className="w-full gap-2" type="submit" pendingChildren="Memproses login...">
              Masuk ke Dashboard
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
