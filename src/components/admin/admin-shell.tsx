import type { ReactNode } from "react";

import { logoutAction } from "@/app/actions/auth";
import { AdminShellClient } from "@/components/admin/admin-shell-client";
import type { Database } from "@/types/database";

type Profile = Pick<Database["public"]["Tables"]["profiles"]["Row"], "avatar_url" | "display_name" | "username" | "role">;

export function AdminShell({
  children,
  profile,
}: {
  children: ReactNode;
  profile: Profile;
}) {
  return (
    <AdminShellClient profile={profile} logoutAction={logoutAction}>
      {children}
    </AdminShellClient>
  );
}
