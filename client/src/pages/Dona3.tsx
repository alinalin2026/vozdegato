import DonationButtons from "@/components/DonationButtons";
import StickyDonateBar from "@/components/StickyDonateBar";
import ThankYouPacks from "@/components/ThankYouPacks";
import { Progress } from "@/components/ui/progress";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

/**
 * Dona3 — experiment variant of /dona. Changes vs. the original, based on a
 * cold-traffic conversion review:
 *  - Removed the placeholder "Últimas aportaciones" list (was fake social
 *    proof — see the old file-level comment on Dona.tsx).
 *  - Cost breakdown is now explicitly labeled as a planned-allocation
 *    estimate, not invoiced figures.
 *  - Added an above-the-fold CTA in the hero, plus a mobile sticky quick-
 *    donate bar (5€/10€/20€/Donar).
 *  - Moved the real mission photos above the donation ask, so evidence
 *    appears before the payment form instead of after it.
 *  - Added a line explaining the Valencia HQ vs. Guadalajara field mission.
 *  - Footer has a transparency block with clearly-marked placeholders for
 *    the org's real legal/registration details — fill these in before this
 *    variant takes real traffic, they are NOT real numbers.
 *
 * GOAL_EUR / RAISED_EUR / CATS_HELPED came directly from the org — unchanged
 * from Dona.tsx.
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

export default function Dona3() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-16 md:pb-0">
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
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                Estamos abasteciendo varias colonias en la sierra mientras
                continúan las consecuencias del fuego. Necesitamos{" "}
                {GOAL_EUR.toLocaleString("es-ES")} € para cubrir comida, agua,
                transporte y atención veterinaria urgente.
              </p>

              {/* Above-the-fold CTA — the donation form starts several
                  screens down, this gets an impulsive click a way in now */}
              <a
                href="#donar"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "hero",
                    label: "Donar 10€ ahora",
                  })
                }
                className="inline-block w-full sm:w-auto bg-primary hover:bg-primary/90 transition-colors text-white font-poppins font-bold rounded-xl px-8 py-4 text-lg"
              >
                Donar 10 € ahora
              </a>
            </div>
          </div>
        </section>

        {/* Amount raised, target, and next action */}
        <section className="pt-8 pb-4">
          <div className="container max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl sm:text-3xl font-poppins font-bold text-primary">
                  {REMAINING_EUR.toLocaleString("es-ES")} €
                </span>
                <span className="text-foreground/60">
                  nos faltan de {GOAL_EUR.toLocaleString("es-ES")} €
                </span>
              </div>
              <Progress value={PROGRESS_PCT} className="mb-3" />
              <p className="text-foreground/70">
                Ya llevamos{" "}
                <strong className="text-foreground">
                  {RAISED_EUR.toLocaleString("es-ES")} €
                </strong>{" "}
                recaudados para la próxima entrega a las colonias de
                Guadalajara.
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

        {/* Real mission photos — moved ABOVE the donation ask so evidence
            comes before the payment form, not after it */}
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

            {/* Valencia HQ vs. Guadalajara field mission — closes the
                location gap a suspicious visitor would otherwise notice */}
            <p className="text-center text-xs text-foreground/50 leading-relaxed max-w-md mx-auto mt-3">
              Nuestra sede administrativa está en Valencia. El equipo se
              desplazó a Guadalajara al conocer la emergencia, como hace en
              cada una de las 35 colonias que atendemos por España.
            </p>
          </div>
        </section>

        {/* Donation ask */}
        <section id="donar" className="pb-12 md:pb-16 scroll-mt-20">
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

        {/* Cost breakdown — explicitly labeled as a planned estimate, not
            invoiced figures (was previously presented as if exact) */}
        <section className="pb-12 md:pb-16 bg-white">
          <div className="container max-w-xl mx-auto">
            <h2 className="text-xl font-poppins font-bold text-center mb-1">
              ¿En qué se va a usar?
            </h2>
            <p className="text-center text-xs text-foreground/50 mb-6">
              Estimación orientativa del reparto del presupuesto, sujeta a las
              necesidades reales de cada entrega.
            </p>
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
          </div>
        </section>

        {/* Reward packs — reuses the 5/10/20 checkout tiers, see component
            comment for why there's no separate merch backend */}
        <section className="pb-12 md:pb-16">
          <div className="container max-w-xl mx-auto">
            <ThankYouPacks />
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="container max-w-xl mx-auto text-center">
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

      <StickyDonateBar />
    </div>
  );
}
