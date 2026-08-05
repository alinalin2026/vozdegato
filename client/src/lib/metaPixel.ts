/**
 * Meta Pixel loader and event bridge.
 *
 * Stays completely inert until VITE_META_PIXEL_ID is set at build time, so the
 * site behaves exactly as before until a pixel actually exists in Events
 * Manager.
 */

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

/** GA4 event name -> Meta standard event. Anything unmapped is GA-only. */
const META_EVENTS: Record<string, string> = {
  purchase: "Purchase",
  begin_checkout: "InitiateCheckout",
  generate_lead: "Lead",
};

export function initMetaPixel() {
  if (!PIXEL_ID || typeof window === "undefined" || window.fbq) return;

  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
    else fbq.queue!.push(args);
  } as Fbq;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", PIXEL_ID);
  fbq("track", "PageView");
}

/**
 * Mirrors a GA4 event to the Meta Pixel when there is a standard equivalent.
 * Meta only wants value/currency, so the GA item payload is left behind.
 */
export function trackMetaEquivalent(
  name: string,
  params: Record<string, unknown>
) {
  const eventName = META_EVENTS[name];
  if (
    !eventName ||
    typeof window === "undefined" ||
    typeof window.fbq !== "function"
  )
    return;

  const payload: Record<string, unknown> = {};
  if (typeof params.value === "number") payload.value = params.value;
  if (typeof params.currency === "string") payload.currency = params.currency;

  window.fbq("track", eventName, payload);
}
