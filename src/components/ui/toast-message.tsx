"use client";

import { useEffect } from "react";
import { toast } from "sonner";

type ToastMessageProps = {
  error?: string | null;
  success?: string | null;
};

export function ToastMessage({ error, success }: ToastMessageProps) {
  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success(success);
  }, [error, success]);

  return null;
}
