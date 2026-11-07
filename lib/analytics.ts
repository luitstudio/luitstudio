"use client";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
  }
}

// This safely no-ops when Google Analytics is not configured. Event names use
// GA4's recommended snake_case convention and can be marked as conversions in
// the GA interface after production verification.
export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", eventName, params);
    return;
  }

  // Queue an event if the GA script has not initialized yet.
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(["event", eventName, params]);
}
