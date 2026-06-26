"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function getSafeNextPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin/dashboard";
  }

  return value;
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const nextPath = getSafeNextPath(formData.get("next"));

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    redirect("/admin/login?error=Email%20dan%20password%20wajib%20diisi");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?error=Session%20tidak%20berhasil%20dibuat");
  }

  redirect(nextPath);
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
