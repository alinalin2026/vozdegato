import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

const AMOUNTS = [5, 10, 20, 50, 100];

// Illustrative equivalences, not a real per-kg/per-service cost calculation.
// Kept roughly proportional to a 10€ = 15kg anchor so they don't look
// inconsistent next to each other.
const IMPACT: Record<number, string> = {
  5: "7 kg de comida para las colonias",
  10: "15 kg de comida para las colonias",
  20: "Agua limpia y contenedores para una colonia",
  50: "Transporte y transportines para un rescate",
  100: "Una revisión veterinaria de urgencia",
};

export default function DonationButtons() {
  const [pending, setPending] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleDonate = async (amount: number) => {
    setPending(amount);
    setError("");
    trackEvent("begin_checkout", {
      currency: "EUR",
      value: amount,
      items: [
        { item_id: `tier_${amount}`, item_name: `${amount}€`, price: amount },
      ],
    });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(
          data.error || "No hemos podido abrir el pago. Inténtalo de nuevo."
        );
        trackEvent("checkout_error", {
          amount,
          reason: data.error || "api_error",
        });
        setPending(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(
        "No hemos podido abrir el pago. Revisa tu conexión e inténtalo de nuevo."
      );
      trackEvent("checkout_error", { amount, reason: "network_error" });
      setPending(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-5">
        {AMOUNTS.map(amount => (
          <button
            key={amount}
            type="button"
            disabled={pending !== null}
            onClick={() => handleDonate(amount)}
            className="rounded-xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-colors py-4 px-2 text-center disabled:opacity-60"
          >
            <span className="block text-xl sm:text-2xl font-poppins font-bold text-primary">
              {pending === amount ? "…" : `${amount}€`}
            </span>
            <span className="block text-xs text-foreground/60 leading-snug mt-1">
              {IMPACT[amount]}
            </span>
          </button>
        ))}
      </div>

      {error && (
        <p
          className="text-center text-destructive font-medium mb-5"
          role="alert"
        >
          {error}
        </p>
      )}

      <p className="text-center text-sm text-foreground/60">
        Pago seguro con tarjeta o Bizum a través de Stripe. Gracias de verdad
        por tu ayuda.
      </p>
    </div>
  );
}
