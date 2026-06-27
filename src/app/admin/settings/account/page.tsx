import Image from "next/image";

import { updateAccountAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { ToastMessage } from "@/components/ui/toast-message";
import { requireAdminUser } from "@/lib/auth";

type AdminAccountSettingsPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminAccountSettingsPage({ searchParams }: AdminAccountSettingsPageProps) {
  const { profile } = await requireAdminUser();
  const params = await searchParams;

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <ToastMessage error={params.error} success={params.success} />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Pengaturan Akun</h1>
          <p className="mt-2 text-muted-foreground">Ubah profil admin, avatar, username, bio, dan password.</p>
        </div>

        <form action={updateAccountAction} className="space-y-6">
          <input type="hidden" name="existing_avatar_path" value={profile.avatar_path ?? ""} />
          <input type="hidden" name="existing_avatar_url" value={profile.avatar_url ?? ""} />

          <section className="grid gap-6 rounded-lg border border-border bg-white p-5 lg:grid-cols-[240px_1fr]">
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.display_name ?? profile.username ?? "Admin"}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="space-y-1">
                <Label htmlFor="avatar">Avatar baru</Label>
                <Input id="avatar" name="avatar" type="file" accept="image/*" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="display_name">Nama tampilan</Label>
                <Input id="display_name" name="display_name" defaultValue={profile.display_name ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" defaultValue={profile.username ?? ""} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" defaultValue={profile.bio ?? ""} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="password">Password baru</Label>
                <Input id="password" name="password" type="password" placeholder="Kosongkan jika tidak diganti" />
              </div>
            </div>
          </section>

          <SubmitButton type="submit" className="gap-2" pendingChildren="Menyimpan...">Simpan Perubahan</SubmitButton>
        </form>
      </div>
    </AdminShell>
  );
}
