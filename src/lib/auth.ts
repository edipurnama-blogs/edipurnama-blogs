import { redirect } from "next/navigation";

import type { User } from "@supabase/supabase-js";

import { createAdminClient, createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type AppRole = Database["public"]["Enums"]["app_role"];

const adminRoles: AppRole[] = ["super_admin", "admin", "editor"];

export function isAdminRole(role: AppRole | null | undefined) {
  return role ? adminRoles.includes(role) : false;
}

type AdminContext = {
  user: User | null;
  profile: Profile | null;
};

export async function getAdminContext(): Promise<AdminContext> {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const { data: profileData } = await adminSupabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return { user, profile: profileData as Profile | null };
}

export async function requireAdminUser() {
  const { user, profile } = await getAdminContext();

  if (!user) {
    redirect("/admin/login");
  }

  if (!profile) {
    redirect("/admin/unauthorized?reason=profile-not-found");
  }

  if (!profile.is_active) {
    redirect("/admin/unauthorized?reason=profile-inactive");
  }

  if (!isAdminRole(profile.role)) {
    redirect("/admin/unauthorized?reason=role-not-admin");
  }

  return {
    user: user as User,
    profile: profile as Profile,
  };
}
