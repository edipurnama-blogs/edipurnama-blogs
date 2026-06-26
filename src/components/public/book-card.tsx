import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Book } from "@/lib/dummy-content";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/karya-buku/${book.slug}`} className="group block h-full">
      <Card className="grid h-full grid-cols-[110px_1fr] overflow-hidden rounded-lg border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:grid-cols-[140px_1fr]">
        <div className="relative h-full min-h-52 overflow-hidden bg-secondary">
          <Image
            src={book.coverImageUrl}
            alt={book.coverImageAlt}
            fill
            sizes="140px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between gap-5 p-5">
          <div className="space-y-3">
            <Badge variant={book.status === "coming_soon" ? "outline" : "default"}>
              {book.status === "coming_soon" ? "Segera Terbit" : "Terbit"}
            </Badge>
            <div className="space-y-1">
              <h3 className="font-sans text-lg font-semibold leading-snug group-hover:text-primary">{book.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{book.subtitle}</p>
            </div>
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{book.description}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{book.publishedYear}</span>
            <span className="inline-flex items-center gap-1 font-medium text-primary">
              Detail
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
