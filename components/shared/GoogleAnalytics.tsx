"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

interface PageViewTrackerProps {
  enabled: boolean;
}

function PageViewTracker({ enabled }: PageViewTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastNavigationRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !pathname) return;

    // Observe query-only App Router navigations without sending query values to
    // GA4. Query strings can contain campaign data or, unexpectedly, user data.
    const navigationKey = `${pathname}?${searchParams.toString()}`;
    if (lastNavigationRef.current === navigationKey) return;

    lastNavigationRef.current = navigationKey;
    trackEvent("page_view", {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
    });
  }, [enabled, pathname, searchParams]);

  return null;
}

// afterInteractive (not beforeInteractive) so analytics never competes
// with the initial page render/LCP -- Next.js's recommended strategy for
// third-party analytics scripts. No-ops entirely if unconfigured.
export function GoogleAnalytics() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

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
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onReady={() => setIsInitialized(true)}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker enabled={isInitialized} />
      </Suspense>
    </>
  );
}
