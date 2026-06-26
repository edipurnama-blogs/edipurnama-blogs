import { site as fallbackSite } from "@/lib/dummy-content";

export type SiteSettings = {
  id: string;
  site_name: string;
  site_tagline: string | null;
  site_description: string | null;
  logo_path: string | null;
  logo_url: string | null;
  favicon_path: string | null;
  favicon_url: string | null;
  primary_color: string;
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  tiktok_url: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
};

export function fallbackSiteSettings(): SiteSettings {
  return {
    id: "",
    site_name: fallbackSite.name,
    site_tagline: fallbackSite.tagline,
    site_description: fallbackSite.description,
    logo_path: null,
    logo_url: null,
    favicon_path: null,
    favicon_url: null,
    primary_color: "#14B8A6",
    contact_email: fallbackSite.email,
    contact_phone: fallbackSite.phone,
    whatsapp_url: fallbackSite.socials.find((item) => item.label === "WhatsApp")?.url ?? null,
    instagram_url: fallbackSite.socials.find((item) => item.label === "Instagram")?.url ?? null,
    facebook_url: fallbackSite.socials.find((item) => item.label === "Facebook")?.url ?? null,
    youtube_url: fallbackSite.socials.find((item) => item.label === "YouTube")?.url ?? null,
    tiktok_url: fallbackSite.socials.find((item) => item.label === "TikTok")?.url ?? null,
    address: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
