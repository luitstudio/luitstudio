import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { getPublishedPosts } from "@/lib/blog";
import { getPublishedOpenings, isIndexableOpening } from "@/lib/careers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, openings] = await Promise.all([
    getPublishedPosts(),
    getPublishedOpenings(),
  ]);

  return [
    {
      url: siteConfig.url,
    },
    {
      url: `${siteConfig.url}${ROUTES.services}`,
    },
    {
      url: `${siteConfig.url}${ROUTES.about}`,
    },
    {
      url: `${siteConfig.url}${ROUTES.career}`,
    },
    {
      url: `${siteConfig.url}${ROUTES.contact}`,
    },
    {
      url: `${siteConfig.url}${ROUTES.blog}`,
    },
    {
      url: `${siteConfig.url}/privacy`,
    },
    {
      url: `${siteConfig.url}/terms`,
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}${ROUTES.blog}/${post.slug}`,
      // Supabase returns timestamptz as a raw Postgres-formatted string
      // (e.g. 5-digit fractional seconds, "+00:00" offset) rather than
      // proper ISO 8601 -- normalize via Date so Next.js's sitemap
      // serializer emits a standard W3C datetime, not a raw DB string
      // some sitemap parsers may reject.
      lastModified: new Date(post.updatedAt),
    })),
    ...openings.filter(isIndexableOpening).map((opening) => ({
      url: `${siteConfig.url}${ROUTES.careerApply}/${opening.slug}`,
      lastModified: new Date(opening.updatedAt),
    })),
  ];
}
