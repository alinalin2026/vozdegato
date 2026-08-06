import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

/**
 * Shared by /dona's secondary donate CTAs (sticky bar, reward packs).
 * Deliberately not merged into DonationButtons' own fetch logic, to keep
 * that component's behavior simple to reason about on its own.
 */
export function useQuickCheckout(location: string) {
  const [pending, setPending] = useState<number | null>(null);

  const donate = async (amount: number) => {
    setPending(amount);
    trackEvent("begin_checkout", {
      currency: "EUR",
      value: amount,
      items: [
        { item_id: `tier_${amount}`, item_name: `${amount}€`, price: amount },
      ],
      location,
    });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        trackEvent("checkout_error", {
          amount,
          reason: data.error || "api_error",
          location,
        });
        setPending(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      trackEvent("checkout_error", {
        amount,
        reason: "network_error",
        location,
      });
      setPending(null);
    }
  };

  return { pending, donate };
}
