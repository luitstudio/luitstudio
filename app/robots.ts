import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// Explicit allow rules for known AI crawlers, in addition to the general
// wildcard below -- the wildcard already permits them, but naming them
// is a clearer, more deliberate signal for GEO (being cited by AI answer
// engines like ChatGPT, Claude, Perplexity, and Google's AI Overviews).
const AI_CRAWLER_USER_AGENTS = [
  "Googlebot",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/admin/", "/api/"],
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
