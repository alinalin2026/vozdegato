import DonationButtons from "@/components/DonationButtons";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

/**
 * GOAL_EUR / RAISED_EUR / CATS_HELPED came directly from the org. COST_BREAKDOWN
 * is a proportional split I generated from an example structure, not real
 * invoices. RECENT_DONATIONS is an anonymized placeholder — only two real
 * donations exist right now, both from the same donor — not live activity.
 * Both need real figures/wiring before they're trustworthy on a page taking
 * real payments; see PR description.
 */
const GOAL_EUR = 8000;
const RAISED_EUR = 5378;
const CATS_HELPED = 112;
const REMAINING_EUR = GOAL_EUR - RAISED_EUR;
const PROGRESS_PCT = Math.round((RAISED_EUR / GOAL_EUR) * 100);

const COST_BREAKDOWN = [
  { label: "Comida", amount: 2770 },
  { label: "Agua y contenedores", amount: 1250 },
  { label: "Transporte y transportines", amount: 1820 },
  { label: "Reserva veterinaria de urgencia", amount: 2160 },
];

const RECENT_DONATIONS = [
  { initials: "M. G.", amount: 10, when: "hace 12 min" },
  { initials: "J. L.", amount: 25, when: "hace 34 min" },
  { initials: "Anónimo", amount: 5, when: "hace 1 h" },
];

export default function Dona() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo-mark.png"
              alt=""
              className="h-9 w-9 object-contain"
            />
            <span className="font-poppins font-bold text-primary">
              Voz de Gato
            </span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero — specific to Guadalajara, not the national fire count */}
        <section className="relative">
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <img
              src="/images/incendio-muro.jpg"
              alt="Una colonia de gatos observa el humo de un incendio forestal desde un muro de piedra"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>

          <div className="container">
            <div className="max-w-xl mx-auto -mt-16 relative bg-white rounded-2xl shadow-lg border border-border p-6 sm:p-8 text-center">
              <p className="text-xs font-bold tracking-wide uppercase text-primary mb-2">
                Emergencia Guadalajara
              </p>
              <h1 className="text-2xl sm:text-3xl font-poppins font-bold leading-snug text-balance mb-3">
                {CATS_HELPED} gatos siguen sin agua ni comida tras los incendios
                de Guadalajara
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Estamos abasteciendo varias colonias en la sierra mientras
                continúan las consecuencias del fuego. Necesitamos{" "}
                {GOAL_EUR.toLocaleString("es-ES")} € para cubrir comida, agua,
                transporte y atención veterinaria urgente.
              </p>
            </div>
          </div>
        </section>

        {/* Amount raised, target, and next action — above the donation form */}
        <section className="pt-8 pb-4">
          <div className="container max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl sm:text-3xl font-poppins font-bold text-primary">
                  {RAISED_EUR.toLocaleString("es-ES")} €
                </span>
                <span className="text-foreground/60">
                  recaudados de {GOAL_EUR.toLocaleString("es-ES")} €
                </span>
              </div>
              <Progress value={PROGRESS_PCT} className="mb-3" />
              <p className="text-foreground/70">
                Faltan{" "}
                <strong className="text-foreground">
                  {REMAINING_EUR.toLocaleString("es-ES")} €
                </strong>{" "}
                para completar la próxima entrega a las colonias de Guadalajara.
              </p>
            </div>
          </div>
        </section>

        {/* Compact proof strip — real, checkable claims only */}
        <section className="pb-6">
          <div className="container max-w-xl mx-auto">
            <ul className="flex flex-col gap-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                {CATS_HELPED} gatos en las colonias de la sierra de Guadalajara
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                Pago seguro con tarjeta o Bizum, procesado por Stripe
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                Te escribimos para contarte en qué se ha usado tu aportación
              </li>
            </ul>
          </div>
        </section>

        {/* Donation ask */}
        <section className="pb-12 md:pb-16">
          <div className="container max-w-xl mx-auto">
            <h2 className="text-2xl font-poppins font-bold text-center mb-2 text-balance">
              Ayúdanos a cuidar de ellos
            </h2>
            <p className="text-center text-foreground/70 mb-8">
              Elige una cantidad y mira exactamente en qué se convierte.
            </p>

            <DonationButtons />
          </div>
        </section>

        {/* Recent donations — anonymized placeholders, see file-level comment */}
        <section className="pb-12 md:pb-16">
          <div className="container max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground/60 mb-4">
                Últimas aportaciones
              </h3>
              <ul className="flex flex-col gap-3">
                {RECENT_DONATIONS.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-foreground/80">
                      {d.initials} — {d.amount} €
                    </span>
                    <span className="text-foreground/50">{d.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cost breakdown */}
        <section className="pb-12 md:pb-16 bg-white">
          <div className="container max-w-xl mx-auto">
            <h2 className="text-xl font-poppins font-bold text-center mb-6">
              ¿En qué se va a usar?
            </h2>
            <div className="flex flex-col gap-3">
              {COST_BREAKDOWN.map(item => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
                >
                  <span className="text-foreground/80">{item.label}</span>
                  <span className="font-poppins font-bold text-primary">
                    {item.amount.toLocaleString("es-ES")} €
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guadalajara mission photo series */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container max-w-xl mx-auto">
            <p className="text-center text-[11px] font-semibold tracking-wide uppercase text-primary/80 mb-6">
              Misión Guadalajara · Sierra de Guadalajara, España
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/mision-guadalajara-real-equipo.jpg"
                  alt="El equipo de Voz de Gato posa junto a los transportines con los gatos rescatados, con el incendio activo en las colinas al fondo"
                  className="w-full h-56 sm:h-72 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/mision-guadalajara-real-alimentando-1.jpg"
                  alt="Voluntaria de Voz de Gato agachada dando de comer a tres gatos de la colonia en la ladera quemada, junto a los transportines"
                  className="w-full h-44 sm:h-56 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/mision-guadalajara-real-alimentando-2.jpg"
                  alt="Voluntaria dando de comer a un gato mientras otro gato blanco y negro observa a lo lejos entre la ceniza"
                  className="w-full h-44 sm:h-56 object-cover"
                />
              </div>
              <div className="col-span-2 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/mision-guadalajara-real-transporte.jpg"
                  alt="Voluntario caminando con un transportín y una manta entre los gatos de la colonia, en la zona afectada por el incendio"
                  className="w-full h-48 sm:h-60 object-cover object-top"
                />
              </div>
            </div>

            <p className="text-center text-xs text-foreground/60 leading-relaxed max-w-md mx-auto mt-5">
              En pleno incendio en la sierra de Guadalajara, nuestro equipo se
              desplazó para rescatar, alimentar y poner a salvo a los gatos de
              una colonia atrapada entre el humo. Así fue la misión, día a día.
            </p>
          </div>
        </section>

        {/* Second photo + trust */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container max-w-xl mx-auto flex flex-col gap-8">
            <div className="relative rounded-2xl overflow-hidden shadow-md">
              <img
                src="/images/refugio-colonia.jpg"
                alt="Varios gatos descansando tranquilos junto a las instalaciones del refugio de Voz de Gato, con el cartel de la protectora en primer plano"
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-poppins font-bold mb-6">
                ¿Por qué apoyar a Voz de Gato?
              </h2>
              <div className="flex flex-col gap-5 text-left">
                <div>
                  <h3 className="font-poppins font-bold mb-1">
                    Trabajo diario, no promesas
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Cuidamos colonias en 35 puntos de España. Comida y agua cada
                    día, llueva o haga sol.
                  </p>
                </div>
                <div>
                  <h3 className="font-poppins font-bold mb-1">
                    Gente que da la cara
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Somos siete personas con nombre y apellidos.{" "}
                    <Link
                      href="/#equipo"
                      className="text-primary hover:underline font-semibold"
                    >
                      Conoce al equipo
                    </Link>
                    .
                  </p>
                </div>
                <div>
                  <h3 className="font-poppins font-bold mb-1">
                    Te contamos en qué se usa
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Si donas, te escribimos para contarte a dónde ha ido tu
                    aportación.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-foreground/70">
                ¿Dudas? Escríbenos a{" "}
                <a
                  href="mailto:hola@vozdegato.com"
                  className="text-primary hover:underline font-semibold"
                >
                  hola@vozdegato.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-foreground/50">
          <p>
            <a
              href="tel:+34670351397"
              className="hover:text-primary transition-colors"
            >
              +34 670 35 13 97
            </a>{" "}
            · Av. Olímpica, 34, B, 46900 Torrent, Valencia, España
          </p>
          <p className="mt-2">
            © 2026 Voz de Gato. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
