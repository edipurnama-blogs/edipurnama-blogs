"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

type ConfirmDeleteButtonProps = ButtonProps & {
  confirmMessage?: string;
};

export function ConfirmDeleteButton({
  children,
  confirmMessage = "Apakah yakin ingin menghapus data ini?",
  disabled,
  onClick,
  ...props
}: ConfirmDeleteButtonProps) {
  const [pending, setPending] = useState(false);

  return (
    <Button
      disabled={pending || disabled}
      aria-busy={pending}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
          return;
        }

        setPending(true);
      }}
      {...props}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : children}
    </Button>
  );
}
