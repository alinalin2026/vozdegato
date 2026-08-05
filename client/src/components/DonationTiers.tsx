import DonationTier from "@/components/DonationTier";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

const TIERS = [
  {
    amount: 5,
    shortLabel: "Taza exclusiva",
    description:
      "Tu apoyo ayuda a comprar comida y cubrir los cuidados básicos de los gatos que rescatamos.",
    rewards: [
      "Taza de café exclusiva Voz de Gato",
      "Certificado digital de agradecimiento",
      "Tu nombre en nuestra web",
    ],
    image: "/images/tier-5-mug.jpg",
    imageAlt: "Taza blanca con el logo de Voz de Gato sobre una mesa de madera",
  },
  {
    amount: 10,
    shortLabel: "Pack de bienvenida",
    description: "Un paso más. Nos ayudas a cuidar más colonias y te llevas el pack de bienvenida.",
    rewards: [
      "Bolsa de tela de algodón",
      "Taza de café exclusiva Voz de Gato",
      "Certificado digital de agradecimiento",
      "Pegatina exclusiva Voz de Gato",
    ],
    image: "/images/tier-10-bundle.jpg",
    imageAlt: "Bolsa de tela y taza con el logo de Voz de Gato",
    highlighted: true,
  },
  {
    amount: 20,
    shortLabel: "Pack completo",
    description:
      "El apoyo más completo. Ayudas a mantener una colonia entera y recibes el pack completo.",
    rewards: [
      "Camiseta premium Voz de Gato",
      "Bolsa de tela de algodón",
      "Taza de café exclusiva Voz de Gato",
      "Certificado VIP de agradecimiento",
      "Mención especial en redes sociales",
    ],
    image: "/images/tier-20-bundle.jpg",
    imageAlt: "Camiseta, bolsa de tela y taza con el logo de Voz de Gato",
  },
];

const BIG_TIERS = [
  {
    amount: 50,
    title: "Padrino de una colonia",
    description: "Cubres el mantenimiento de una colonia pequeña durante un mes.",
  },
  {
    amount: 100,
    title: "Guardián de las colonias",
    description: "Ayudas con esterilizaciones y urgencias veterinarias.",
  },
];

export default function DonationTiers() {
  // All collapsed to start, so the amounts land together on the first
  // screen rather than one open panel pushing the rest below the fold.
  const [openTier, setOpenTier] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleDonate = async (amount: number, label: string) => {
    setPending(amount);
    setError("");
    trackEvent("begin_checkout", {
      currency: "EUR",
      value: amount,
      items: [{ item_id: `tier_${amount}`, item_name: label, price: amount }],
    });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "No hemos podido abrir el pago. Inténtalo de nuevo.");
        trackEvent("checkout_error", { amount, reason: data.error || "api_error" });
        setPending(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("No hemos podido abrir el pago. Revisa tu conexión e inténtalo de nuevo.");
      trackEvent("checkout_error", { amount, reason: "network_error" });
      setPending(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6">
        {TIERS.map((tier) => (
          <DonationTier
            key={tier.amount}
            amount={tier.amount}
            shortLabel={tier.shortLabel}
            description={tier.description}
            rewards={tier.rewards}
            image={tier.image}
            imageAlt={tier.imageAlt}
            highlighted={tier.highlighted}
            open={openTier === tier.amount}
            pending={pending === tier.amount}
            onToggle={() => {
              const opening = openTier !== tier.amount;
              if (opening) {
                trackEvent("select_item", {
                  items: [{ item_id: `tier_${tier.amount}`, item_name: tier.shortLabel, price: tier.amount }],
                });
              }
              setOpenTier(opening ? tier.amount : null);
            }}
            onDonate={() => handleDonate(tier.amount, tier.shortLabel)}
          />
        ))}
      </div>

      {/* Larger amounts, no reward */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {BIG_TIERS.map((tier) => (
          <button
            key={tier.amount}
            type="button"
            disabled={pending !== null}
            onClick={() => handleDonate(tier.amount, tier.title)}
            className="rounded-xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-colors p-4 text-left disabled:opacity-60"
          >
            <span className="block text-2xl font-poppins font-bold text-primary">
              {pending === tier.amount ? "…" : `${tier.amount}€`}
            </span>
            <span className="block text-sm font-semibold text-foreground leading-tight mt-0.5">
              {tier.title}
            </span>
          </button>
        ))}
      </div>

      {error && (
        <p className="text-center text-destructive font-medium mb-5" role="alert">
          {error}
        </p>
      )}

      <p className="text-center text-sm text-foreground/60">
        Pago seguro con tarjeta o Bizum a través de Stripe. Si tu aportación lleva recompensa, te
        pedimos la dirección de envío durante el pago.
      </p>
    </div>
  );
}
