import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://app.cal.com https://www.googletagmanager.com${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // https: is broad, but blog cover/content images are arbitrary editor-pasted
  // URLs (no fixed set of hosts to allowlist), same tradeoff the old site made.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' https://app.cal.com https://cal.com https://api.cloudinary.com https://www.google-analytics.com https://region1.google-analytics.com${supabaseUrl ? ` ${supabaseUrl}` : ""}${isDevelopment ? " ws: http: https:" : ""}`,
  // res.cloudinary.com is here so the admin dashboard can embed uploaded
  // resumes (PDFs) inline instead of forcing a new tab or download.
  "frame-src 'self' https://app.cal.com https://cal.com https://res.cloudinary.com https://www.youtube.com https://www.youtube-nocookie.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  reactStrictMode: true,
  // Middleware owns trailing-slash redirects so /internship/ can redirect
  // directly to /career instead of first normalizing to /internship.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
