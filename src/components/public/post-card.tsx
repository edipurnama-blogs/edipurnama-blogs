import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { contentTypePath, formatDate, type Post } from "@/lib/dummy-content";

type PostCardProps = {
  post: Post;
  compact?: boolean;
};

export function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <Link href={`/${contentTypePath(post.contentType)}/${post.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden rounded-lg border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
        <div className={compact ? "relative aspect-[16/9] overflow-hidden" : "relative aspect-[4/3] overflow-hidden"}>
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt}
            fill
            sizes={compact ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{post.categoryName}</Badge>
            <span className="text-xs text-muted-foreground">{post.authorName}</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-sans text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
              {post.title}
            </h3>
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {post.readingTimeMinutes} menit
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
