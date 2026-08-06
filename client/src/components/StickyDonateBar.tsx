import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

// Mobile-only quick-donate bar for Dona3. Deliberately NOT sharing state/logic
// with DonationButtons — that component backs the live /dona page and
// shouldn't be touched to ship this variant. Small duplication here is the
// safer trade-off.
const QUICK_AMOUNTS = [5, 10, 20];

export default function StickyDonateBar() {
  const [pending, setPending] = useState<number | null>(null);

  const handleDonate = async (amount: number) => {
    setPending(amount);
    trackEvent("begin_checkout", {
      currency: "EUR",
      value: amount,
      items: [
        { item_id: `tier_${amount}`, item_name: `${amount}€`, price: amount },
      ],
      location: "sticky_bar",
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
          location: "sticky_bar",
        });
        setPending(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      trackEvent("checkout_error", {
        amount,
        reason: "network_error",
        location: "sticky_bar",
      });
      setPending(null);
    }
  };

  const scrollToDonar = () => {
    trackEvent("cta_click", { location: "sticky_bar", label: "Donar" });
    document
      .getElementById("donar")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-4">
        {QUICK_AMOUNTS.map(amount => (
          <button
            key={amount}
            type="button"
            disabled={pending !== null}
            onClick={() => handleDonate(amount)}
            className="py-3 text-center font-poppins font-bold text-primary border-r border-border disabled:opacity-60"
          >
            {pending === amount ? "…" : `${amount}€`}
          </button>
        ))}
        <button
          type="button"
          onClick={scrollToDonar}
          className="py-3 text-center font-poppins font-bold bg-primary text-white"
        >
          Donar
        </button>
      </div>
    </div>
  );
}
