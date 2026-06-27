import type { Metadata } from "next";

import { contentTypeLabel, contentTypePath, profile, site, type Book, type Post } from "@/lib/dummy-content";

export const defaultOgImage = "/opengraph-image";

export function getSiteUrl() {
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const vercelSiteUrl = vercelUrl ? (/^https?:\/\//i.test(vercelUrl) ? vercelUrl : `https://${vercelUrl}`) : null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? vercelSiteUrl ?? "http://localhost:3000";

  return siteUrl.replace(/\/$/, "");
}

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${getSiteUrl()}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function cleanDescription(value: string | null | undefined, fallback = site.description) {
  return (value?.trim() || fallback).slice(0, 180);
}

export function publicPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "id_ID",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function postMetadata(post: Post | null, contentType: Post["contentType"]): Metadata {
  if (!post) {
    return publicPageMetadata({
      title: contentTypeLabel(contentType),
      description: site.description,
      path: `/${contentTypePath(contentType)}`,
    });
  }

  const title = post.seoTitle || post.ogTitle || post.title;
  const description = cleanDescription(post.seoDescription || post.ogDescription || post.excerpt);
  const path = `/${contentTypePath(post.contentType)}/${post.slug}`;
  const url = post.canonicalUrl || absoluteUrl(path);
  const imageUrl = absoluteUrl(post.ogImageUrl || post.coverImageUrl || defaultOgImage);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      url,
      siteName: site.name,
      locale: "id_ID",
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      authors: [post.authorName],
      tags: post.tags,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.coverImageAlt || post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function bookMetadata(book: Book | null): Metadata {
  if (!book) {
    return publicPageMetadata({
      title: "Karya Buku",
      description: "Daftar buku dan karya tulis dai.",
      path: "/karya-buku",
    });
  }

  const title = book.seoTitle || book.title;
  const description = cleanDescription(book.seoDescription || book.description);
  const url = absoluteUrl(`/karya-buku/${book.slug}`);
  const imageUrl = absoluteUrl(book.coverImageUrl || defaultOgImage);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "id_ID",
      type: "book",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: book.coverImageAlt || book.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function postJsonLd(post: Post) {
  const path = `/${contentTypePath(post.contentType)}/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || post.title,
    description: cleanDescription(post.seoDescription || post.excerpt),
    image: absoluteUrl(post.ogImageUrl || post.coverImageUrl || defaultOgImage),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName || profile.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(defaultOgImage),
      },
    },
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function bookJsonLd(book: Book) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: cleanDescription(book.seoDescription || book.description),
    image: absoluteUrl(book.coverImageUrl || defaultOgImage),
    author: {
      "@type": "Person",
      name: profile.name,
    },
    publisher: book.publisher || undefined,
    datePublished: book.publishedYear ? String(book.publishedYear) : undefined,
    url: absoluteUrl(`/karya-buku/${book.slug}`),
  };
}
