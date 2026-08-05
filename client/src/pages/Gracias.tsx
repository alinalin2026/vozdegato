import DonationTier from "@/components/DonationTier";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export const SIGNER_NAME_KEY = "peticion-firmante";

const TIERS = [
  {
    amount: 5,
    title: "Amigo de los Gatos",
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
    title: "Defensor de los Gatos",
    description:
      "Un paso más. Nos ayudas a cuidar más colonias y te llevas nuestro pack de bienvenida.",
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
    title: "Héroe de los Gatos",
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

export default function Gracias() {
  const [name, setName] = useState("");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setName(sessionStorage.getItem(SIGNER_NAME_KEY) || "");
    fetch("/api/signatures")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
  }, []);

  const firstName = name.trim().split(" ")[0];

  const handleDonate = (amount: number, tierName: string) => {
    const subject = `Quiero donar ${amount}€ — ${tierName}`;
    const body = `Hola,\n\nAcabo de firmar la petición y quiero colaborar con ${amount}€ (${tierName}). Decidme cómo hacer la donación y a qué dirección enviarme la recompensa.\n\nGracias.`;
    window.location.href = `mailto:hola@vozdegato.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo-mark.png" alt="" className="h-10 w-10 object-contain" />
            <div>
              <p className="font-poppins font-bold text-primary leading-tight">Voz de Gato</p>
              <p className="text-xs text-muted-foreground">Hablamos por ellos</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto py-14 md:py-20">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-balance">
            {firstName ? `¡Gracias, ${firstName}!` : "¡Gracias por tu firma!"}
          </h1>
          <p className="text-xl text-foreground/80 leading-relaxed mb-3">
            Tu firma ya está registrada. Cuando reunamos las suficientes, la llevamos donde tiene que
            llegar.
          </p>
          {count !== null && (
            <p className="text-lg text-foreground/70">
              Ya sois{" "}
              <strong className="text-primary font-poppins">{count.toLocaleString("es-ES")}</strong>{" "}
              {count === 1 ? "persona firmante" : "personas firmantes"}.
            </p>
          )}
        </div>

        {/* Donation bridge */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-3 text-balance">
            Firmar es gratis. Cuidar de ellos, no.
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Cada donación se convierte en comida, agua limpia y veterinario para los gatos de
            nuestras colonias. Si quieres dar un paso más, elige una cantidad y te enviamos algo
            nuestro para agradecértelo.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start mb-16">
          {TIERS.map((tier) => (
            <DonationTier
              key={tier.amount}
              amount={tier.amount}
              currency="€"
              title={tier.title}
              description={tier.description}
              rewards={tier.rewards}
              image={tier.image}
              imageAlt={tier.imageAlt}
              highlighted={tier.highlighted}
              onDonate={() => handleDonate(tier.amount, tier.title)}
            />
          ))}
        </div>

        <p className="text-center text-sm text-foreground/60 max-w-xl mx-auto mb-16">
          Al elegir una cantidad se abrirá tu correo con un mensaje ya escrito. Te contestamos con
          las instrucciones de pago y te pedimos la dirección de envío de tu recompensa.
        </p>

        {/* Trust */}
        <div className="bg-white rounded-2xl border border-border p-8 sm:p-10">
          <h2 className="text-2xl font-poppins font-bold text-center mb-8">
            ¿Por qué apoyar a Voz de Gato?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-poppins font-bold text-lg mb-2">Trabajo diario, no promesas</h3>
              <p className="text-foreground/70 leading-relaxed">
                Cuidamos colonias en 35 puntos de España. Comida y agua cada día, llueva o haga sol.
              </p>
            </div>
            <div>
              <h3 className="font-poppins font-bold text-lg mb-2">Gente que da la cara</h3>
              <p className="text-foreground/70 leading-relaxed">
                Somos siete personas con nombre y apellidos.{" "}
                <Link href="/#equipo" className="text-primary hover:underline font-semibold">
                  Conoce al equipo
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="font-poppins font-bold text-lg mb-2">Te contamos en qué se usa</h3>
              <p className="text-foreground/70 leading-relaxed">
                Si donas, te escribimos para contarte a dónde ha ido tu aportación.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-14">
          <p className="text-foreground/70 mb-2">
            ¿Dudas? Escríbenos a{" "}
            <a
              href="mailto:hola@vozdegato.com"
              className="text-primary hover:underline font-semibold"
            >
              hola@vozdegato.com
            </a>
          </p>
          <Link href="/" className="text-sm font-semibold text-foreground/60 hover:text-foreground">
            Volver al inicio
          </Link>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-foreground/50">
          © 2026 Voz de Gato. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
