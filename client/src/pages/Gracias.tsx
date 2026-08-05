import DonationTier from "@/components/DonationTier";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export const SIGNER_NAME_KEY = "peticion-firmante";

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

export default function Gracias() {
  const [name, setName] = useState("");
  // All collapsed to start, so the three amounts land together on the first
  // screen rather than one open panel pushing the others below the fold.
  const [openTier, setOpenTier] = useState<number | null>(null);

  useEffect(() => {
    setName(sessionStorage.getItem(SIGNER_NAME_KEY) || "");
  }, []);

  const firstName = name.trim().split(" ")[0];

  const handleDonate = (amount: number, label: string) => {
    const subject = `Quiero donar ${amount}€ — ${label}`;
    const body = `Hola,\n\nAcabo de firmar la petición y quiero colaborar con ${amount}€ (${label}). Decidme cómo hacer la donación y a qué dirección enviarme la recompensa.\n\nGracias.`;
    window.location.href = `mailto:hola@vozdegato.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container flex items-center py-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo-mark.png" alt="" className="h-8 w-8 object-contain" />
            <span className="font-poppins font-bold text-primary">Voz de Gato</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-xl mx-auto py-8 md:py-12">
        {/* Compact thank-you */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full mb-4">
            <Check className="w-4 h-4" strokeWidth={3} />
            Firma registrada
          </div>
          <h1 className="text-3xl sm:text-4xl font-poppins font-bold mb-2 text-balance">
            {firstName ? `¡Gracias, ${firstName}!` : "¡Gracias por tu firma!"}
          </h1>
          <p className="text-lg text-foreground/70 leading-snug text-balance">
            Firmar es gratis. Cuidar de ellos, no.
          </p>
        </div>

        {/* The ask, right here on the first screen */}
        <p className="text-center text-foreground/70 mb-4">
          Elige una cantidad y te enviamos un detalle nuestro para agradecértelo.
        </p>
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
              onToggle={() => setOpenTier(openTier === tier.amount ? null : tier.amount)}
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
              onClick={() => handleDonate(tier.amount, tier.title)}
              className="rounded-xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-colors p-4 text-left"
            >
              <span className="block text-2xl font-poppins font-bold text-primary">
                {tier.amount}€
              </span>
              <span className="block text-sm font-semibold text-foreground leading-tight mt-0.5">
                {tier.title}
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-foreground/60 mb-14">
          Al elegir una cantidad se abre tu correo con un mensaje ya escrito. Te contestamos con las
          instrucciones de pago y, si tu aportación lleva recompensa, te pedimos la dirección de
          envío.
        </p>

        {/* Context, now below the ask */}
        <div className="flex flex-col gap-8 text-center">
          <p className="text-foreground/70 leading-relaxed">
            En toda España ya hay{" "}
            <strong className="text-primary font-poppins">más de 20.000 firmas</strong> pidiendo un
            protocolo de rescate animal en catástrofes. La tuya suma. Cuando reunamos las
            suficientes, llevamos la petición donde tiene que llegar.
          </p>

          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 text-left">
            <h2 className="text-xl font-poppins font-bold text-center mb-6">
              ¿Por qué apoyar a Voz de Gato?
            </h2>
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="font-poppins font-bold mb-1">Trabajo diario, no promesas</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Cuidamos colonias en 35 puntos de España. Comida y agua cada día, llueva o haga
                  sol.
                </p>
              </div>
              <div>
                <h3 className="font-poppins font-bold mb-1">Gente que da la cara</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Somos siete personas con nombre y apellidos.{" "}
                  <Link href="/#equipo" className="text-primary hover:underline font-semibold">
                    Conoce al equipo
                  </Link>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-poppins font-bold mb-1">Te contamos en qué se usa</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Si donas, te escribimos para contarte a dónde ha ido tu aportación.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-foreground/70 mb-3">
              ¿Dudas? Escríbenos a{" "}
              <a
                href="mailto:hola@vozdegato.com"
                className="text-primary hover:underline font-semibold"
              >
                hola@vozdegato.com
              </a>
            </p>
            <Button variant="outline" asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8 mt-10">
        <div className="container text-center text-sm text-foreground/50">
          © 2026 Voz de Gato. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
