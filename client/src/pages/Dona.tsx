import DonationTiers from "@/components/DonationTiers";
import { Link } from "wouter";

export default function Dona() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo-mark.png" alt="" className="h-9 w-9 object-contain" />
            <span className="font-poppins font-bold text-primary">Voz de Gato</span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative">
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <img
              src="/images/incendio-muro.jpg"
              alt="Una colonia de gatos observa el humo de un incendio forestal desde un muro de piedra"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute right-3 top-3 text-white/60 text-[10px] font-medium tracking-wide uppercase">
              Ilustración
            </span>
          </div>

          <div className="container">
            <div className="max-w-xl mx-auto -mt-16 relative bg-white rounded-2xl shadow-lg border border-border p-6 sm:p-8 text-center">
              <p className="text-xs font-bold tracking-wide uppercase text-primary mb-2">
                Incendios 2026
              </p>
              <h1 className="text-2xl sm:text-3xl font-poppins font-bold leading-snug text-balance mb-3">
                España vive su peor verano de incendios en años
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                219.665 hectáreas quemadas hasta ahora. Cada colonia que cuidamos necesita comida,
                agua limpia y atención veterinaria urgente mientras dure la ola de calor.
              </p>
            </div>
          </div>
        </section>

        {/* Donation ask */}
        <section className="py-12 md:py-16">
          <div className="container max-w-xl mx-auto">
            <h2 className="text-2xl font-poppins font-bold text-center mb-2 text-balance">
              Ayúdanos a cuidar de ellos
            </h2>
            <p className="text-center text-foreground/70 mb-8">
              Elige una cantidad y te enviamos un detalle nuestro para agradecértelo.
            </p>

            <DonationTiers />
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
                  src="/images/mision-guadalajara-equipo.jpg"
                  alt="El equipo de Voz de Gato posa con los gatos rescatados durante la misión de emergencia en la sierra de Guadalajara, con el humo del incendio al fondo"
                  className="w-full h-56 sm:h-72 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/mision-guadalajara-alimentando.jpg"
                  alt="Voluntaria de Voz de Gato dando de comer a un gato junto a los transportines, con otro gato observando entre la ceniza"
                  className="w-full h-36 sm:h-44 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/mision-guadalajara-manta.jpg"
                  alt="Voluntaria sujetando a un gato rescatado envuelto en una manta, con dos gatos más cerca en la ladera quemada"
                  className="w-full h-36 sm:h-44 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/mision-guadalajara-transporte.jpg"
                  alt="Voluntario caminando con un transportín y una manta entre los gatos de la colonia, en la zona afectada por el incendio"
                  className="w-full h-36 sm:h-44 object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/mision-guadalajara-colonia.jpg"
                  alt="Voluntaria dando de comer y de beber a varios gatos de la colonia en la ladera quemada de la sierra de Guadalajara"
                  className="w-full h-36 sm:h-44 object-cover"
                />
              </div>
              <div className="col-span-2 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/mision-guadalajara-dos-gatos.jpg"
                  alt="Dos gatos de la colonia observan la cámara con el incendio activo de fondo en la sierra de Guadalajara"
                  className="w-full h-48 sm:h-60 object-cover"
                />
              </div>
            </div>

            <p className="text-center text-xs text-foreground/60 leading-relaxed max-w-md mx-auto mt-5">
              En pleno incendio en la sierra de Guadalajara, nuestro equipo se desplazó para
              rescatar, alimentar y poner a salvo a los gatos de una colonia atrapada entre el
              humo. Así fue la misión, día a día.
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
              <span className="absolute right-3 top-3 text-white/70 text-[10px] font-medium tracking-wide uppercase">
                Ilustración
              </span>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-poppins font-bold mb-6">¿Por qué apoyar a Voz de Gato?</h2>
              <div className="flex flex-col gap-5 text-left">
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
          © 2026 Voz de Gato. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
