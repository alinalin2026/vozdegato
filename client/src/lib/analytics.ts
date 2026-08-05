import { trackMetaEquivalent } from "@/lib/metaPixel";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 event, and mirrors it to the Meta Pixel when there is a standard
 * equivalent. Each destination no-ops on its own if it hasn't loaded (blocked,
 * offline, no pixel configured), so one being absent never silences the other.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  trackMetaEquivalent(name, params);
}
