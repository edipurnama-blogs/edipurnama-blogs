"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    setFailed(false);

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFailed(true);
      window.setTimeout(() => setFailed(false), 1800);
    }
  }

  return (
    <Button variant="outline" className="w-full" type="button" onClick={handleShare}>
      {copied ? <Check className="mr-2 size-4" aria-hidden="true" /> : <Share2 className="mr-2 size-4" aria-hidden="true" />}
      {failed ? "Gagal Menyalin" : copied ? "Link Disalin" : "Share Artikel"}
    </Button>
  );
}
