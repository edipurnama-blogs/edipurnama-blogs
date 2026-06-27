"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

type SubmitButtonProps = ButtonProps & {
  pendingChildren?: ReactNode;
};

export function SubmitButton({ children, pendingChildren, disabled, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button className={className} disabled={pending || disabled} aria-busy={pending} {...props}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          {pendingChildren ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
