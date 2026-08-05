import DonationTier from "@/components/DonationTier";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart } from "lucide-react";
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
  const [showCue, setShowCue] = useState(true);

  useEffect(() => {
    setName(sessionStorage.getItem(SIGNER_NAME_KEY) || "");
  }, []);

  // Nudge the page down once after a beat, so the reward tiers are visible
  // without the visitor having to go looking for them. Backs off the moment
  // they scroll themselves, and never fires for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };
    const events = ["wheel", "touchstart", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, cancel, { passive: true }));

    const timer = window.setTimeout(() => {
      if (!cancelled && window.scrollY < 40) {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }
    }, 2000);

    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, cancel));
    };
  }, []);

  // Hide the scroll cue once they're past the hero
  useEffect(() => {
    const onScroll = () => setShowCue(window.scrollY < 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToDonations = () => {
    document.getElementById("donaciones")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
          <p className="text-lg text-foreground/70">
            En toda España ya hay{" "}
            <strong className="text-primary font-poppins">más de 20.000 firmas</strong> pidiendo un
            protocolo de rescate animal en catástrofes. La tuya suma.
          </p>

          {/* Scroll cue toward the donation tiers */}
          <button
            type="button"
            onClick={scrollToDonations}
            className={`mt-10 inline-flex flex-col items-center gap-1.5 text-primary font-semibold transition-opacity duration-300 hover:opacity-80 ${
              showCue ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            Ahora puedes ayudarnos un poco más
            <ChevronDown className="w-6 h-6 animate-bounce motion-reduce:animate-none" />
          </button>
        </div>

        {/* Donation bridge */}
        <div id="donaciones" className="text-center max-w-2xl mx-auto mb-10 scroll-mt-24">
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

        {/* Larger amounts, no reward photo */}
        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-center text-foreground/70 mb-5">¿Quieres aportar más?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BIG_TIERS.map((tier) => (
              <div
                key={tier.amount}
                className="flex items-center gap-5 bg-white border border-border rounded-xl p-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-poppins font-bold text-foreground">{tier.title}</p>
                  <p className="text-sm text-foreground/70 leading-snug">{tier.description}</p>
                </div>
                <Button
                  onClick={() => handleDonate(tier.amount, tier.title)}
                  variant="outline"
                  className="flex-shrink-0 border-2 border-primary text-primary hover:bg-primary/10 font-semibold h-auto py-2.5 px-5"
                >
                  {tier.amount}€
                </Button>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-foreground/60 max-w-xl mx-auto mb-16">
          Al elegir una cantidad se abrirá tu correo con un mensaje ya escrito. Te contestamos con
          las instrucciones de pago y, si tu aportación lleva recompensa, te pedimos la dirección de
          envío.
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
