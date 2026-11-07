const siteName = "Luit Studio";

export const siteConfig = {
  name: siteName,
  shortName: siteName,
  author: siteName,
  description: `${siteName} is a design and build studio in Guwahati, Assam, working with clients across India and abroad — web development, AI automation, UI/UX design, digital marketing, social media, video editing, and motion graphics.`,
  // Production canonical host; deployment environments may override it.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://luitstudio.com").replace(/\/$/, ""),
  copyright: `© 2026 ${siteName}. All rights reserved.`,
  copyrightShort: `© ${siteName} 2026`,
} as const;
