"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// afterInteractive (not beforeInteractive) so analytics never competes
// with the initial page render/LCP -- Next.js's recommended strategy for
// third-party analytics scripts. No-ops entirely if unconfigured.
export function GoogleAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trackedElement = target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = trackedElement?.dataset.analyticsEvent;
      if (!eventName) return;

      window.gtag?.("event", eventName, {
        location: trackedElement.dataset.analyticsLocation,
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
