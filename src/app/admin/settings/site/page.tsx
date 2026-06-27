import Image from "next/image";

import { saveSiteSettingsAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { PrimaryColorField } from "@/components/admin/primary-color-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { ToastMessage } from "@/components/ui/toast-message";
import { getSiteSettings } from "@/lib/admin-data";
import { requireAdminUser } from "@/lib/auth";

type AdminSiteSettingsPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminSiteSettingsPage({ searchParams }: AdminSiteSettingsPageProps) {
  const { profile } = await requireAdminUser();
  const params = await searchParams;
  const settings = await getSiteSettings();

  return (
    <AdminShell profile={profile}>
      <div className="space-y-6">
        <ToastMessage error={params.error} success={params.success} />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Pengaturan Situs</h1>
          <p className="mt-2 text-muted-foreground">Atur identitas website, kontak, sosial media, logo, dan favicon.</p>
        </div>

        <form action={saveSiteSettingsAction} className="space-y-6">
          <input type="hidden" name="id" value={settings.id} />
          <input type="hidden" name="existing_logo_path" value={settings.logo_path ?? ""} />
          <input type="hidden" name="existing_logo_url" value={settings.logo_url ?? ""} />
          <input type="hidden" name="existing_favicon_path" value={settings.favicon_path ?? ""} />
          <input type="hidden" name="existing_favicon_url" value={settings.favicon_url ?? ""} />
          <input type="hidden" name="primary_color_history" value={settings.primary_color_history.join(",")} />

          <section className="grid gap-6 rounded-lg border border-border bg-white p-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_name">Nama website</Label>
                <Input id="site_name" name="site_name" defaultValue={settings.site_name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site_tagline">Tagline</Label>
                <Input id="site_tagline" name="site_tagline" defaultValue={settings.site_tagline ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site_description">Deskripsi</Label>
                <Textarea id="site_description" name="site_description" defaultValue={settings.site_description ?? ""} />
              </div>
            </div>

            <div className="grid gap-4">
              <AssetField
                label="Logo"
                name="logo"
                previewUrl={settings.logo_url}
                previewAlt={settings.site_name}
                helperText="Gunakan gambar transparan jika memungkinkan."
              />
              <AssetField
                label="Favicon"
                name="favicon"
                previewUrl={settings.favicon_url}
                previewAlt={`${settings.site_name} favicon`}
                helperText="Ukuran kecil, format PNG atau WebP."
              />
            </div>
          </section>

          <section className="grid gap-4 rounded-lg border border-border bg-white p-5 md:grid-cols-2 xl:grid-cols-3">
            <PrimaryColorField defaultColor={settings.primary_color} history={settings.primary_color_history} />
            <div className="space-y-2">
              <Label htmlFor="contact_email">Email kontak</Label>
              <Input id="contact_email" name="contact_email" type="email" defaultValue={settings.contact_email ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Telepon</Label>
              <Input id="contact_phone" name="contact_phone" defaultValue={settings.contact_phone ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp_url">WhatsApp URL</Label>
              <Input id="whatsapp_url" name="whatsapp_url" defaultValue={settings.whatsapp_url ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input id="instagram_url" name="instagram_url" defaultValue={settings.instagram_url ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube URL</Label>
              <Input id="youtube_url" name="youtube_url" defaultValue={settings.youtube_url ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input id="facebook_url" name="facebook_url" defaultValue={settings.facebook_url ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktok_url">TikTok URL</Label>
              <Input id="tiktok_url" name="tiktok_url" defaultValue={settings.tiktok_url ?? ""} />
            </div>
            <div className="space-y-2 md:col-span-2 xl:col-span-3">
              <Label htmlFor="address">Alamat</Label>
              <Textarea id="address" name="address" defaultValue={settings.address ?? ""} />
            </div>
          </section>

          <SubmitButton type="submit" className="gap-2" pendingChildren="Menyimpan...">Simpan Pengaturan</SubmitButton>
        </form>
      </div>
    </AdminShell>
  );
}

function AssetField({
  label,
  name,
  previewUrl,
  previewAlt,
  helperText,
}: {
  label: string;
  name: string;
  previewUrl: string | null;
  previewAlt: string;
  helperText: string;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-4">
      <div className="space-y-1">
        <Label htmlFor={name}>{label}</Label>
        <p className="text-xs text-muted-foreground">{helperText}</p>
      </div>
      {previewUrl ? (
        <div className="relative aspect-[4/1] overflow-hidden rounded-md border border-border bg-muted">
          <Image src={previewUrl} alt={previewAlt} fill sizes="400px" className="object-contain p-3" />
        </div>
      ) : null}
      <Input id={name} name={name} type="file" accept="image/*" />
    </div>
  );
}
