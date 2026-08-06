import { useQuickCheckout } from "@/hooks/useQuickCheckout";

// Real product photos exist in /public/images (tier-5-mug, tier-10-bundle,
// tier-20-bundle) but were unused until now. These reuse the same 5/10/20
// checkout tiers as the main donation buttons — no separate merch backend
// exists, so fulfillment (collecting a shipping address) happens by email
// after the donation, same as the org already does for the impact update.
const PACKS = [
  {
    amount: 5,
    image: "/images/tier-5-mug.jpg",
    title: "Taza Voz de Gato",
    description: "Una taza de cerámica con nuestro logo, como agradecimiento.",
  },
  {
    amount: 10,
    image: "/images/tier-10-bundle.jpg",
    title: "Taza + bolsa de tela",
    description: "Taza y bolsa de algodón con nuestro logo.",
  },
  {
    amount: 20,
    image: "/images/tier-20-bundle.jpg",
    title: "Pack completo",
    description: "Taza, bolsa de tela y camiseta con nuestro logo.",
  },
];

export default function ThankYouPacks() {
  const { pending, donate } = useQuickCheckout("reward_packs");

  return (
    <div>
      <h2 className="text-xl font-poppins font-bold text-center mb-2">
        Packs de agradecimiento
      </h2>
      <p className="text-center text-foreground/70 mb-8 max-w-sm mx-auto">
        Dona una de estas cantidades y te enviamos esto como agradecimiento.
        Te escribimos por email para pedirte la dirección de envío.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PACKS.map(pack => (
          <div
            key={pack.amount}
            className="rounded-2xl border border-border overflow-hidden bg-white flex flex-col"
          >
            <img
              src={pack.image}
              alt={pack.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-poppins font-bold mb-1">{pack.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4 flex-1">
                {pack.description}
              </p>
              <button
                type="button"
                disabled={pending !== null}
                onClick={() => donate(pack.amount)}
                className="w-full rounded-xl bg-primary hover:bg-primary/90 transition-colors text-white font-poppins font-bold py-3 disabled:opacity-60"
              >
                {pending === pack.amount ? "…" : `Donar ${pack.amount} €`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
