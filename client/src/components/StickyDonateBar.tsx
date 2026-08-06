import { trackEvent } from "@/lib/analytics";
import { useQuickCheckout } from "@/hooks/useQuickCheckout";

// Mobile-only quick-donate bar for /dona.
const QUICK_AMOUNTS = [5, 10, 20];

export default function StickyDonateBar() {
  const { pending, donate } = useQuickCheckout("sticky_bar");

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
            onClick={() => donate(amount)}
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
