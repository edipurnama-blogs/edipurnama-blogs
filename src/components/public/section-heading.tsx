import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  actionLabel?: string;
};

export function SectionHeading({ eyebrow, title, description, href, actionLabel = "Lihat semua" }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        {description ? <p className="leading-7 text-muted-foreground">{description}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-slate-700">
          {actionLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
