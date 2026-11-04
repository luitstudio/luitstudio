import "./globals.css";

import Script from "next/script";

import { StructuredData } from "@/components/shared/StructuredData";
import { defaultMetadata, defaultViewport } from "@/config/metadata";

export const metadata = defaultMetadata;
export const viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StructuredData />
        <Script id="js-enabled" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js");`}
        </Script>
        <a
          href="#main-content"
          className="bg-ink fixed top-3 left-3 z-[100] -translate-y-24 rounded-full px-5 py-3 font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
