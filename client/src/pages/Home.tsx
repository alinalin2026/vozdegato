import { Button } from "@/components/ui/button";
import DonationBanner from "@/components/DonationBanner";
import DonationButtons from "@/components/DonationButtons";
import { trackEvent } from "@/lib/analytics";
import { Mail, MapPin, Phone, Shield, Utensils, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

/**
 * Voz de Gato - Home Page
 *
 * Design Philosophy: Warm Advocacy
 * - Large, bold typography for accessibility (55+ readers)
 * - High contrast colors (warm orange + deep brown)
 * - Real cat photos creating emotional connection
 * - Simple, direct language without corporate jargon
 * - Generous whitespace and breathing room
 */

const TEAM_LEADERSHIP = [
  { name: "Lucía Fernández García", role: "Fundadora y Directora de Rescate" },
  { name: "Javier Morales Sanz", role: "Coordinador de Logística y Colonias" },
];

const TEAM_MEMBERS = ["Elena", "Sofía", "Mateo", "Martina", "Valeria"];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Nos falta algún dato: revisa el formulario, por favor");
      return;
    }
    toast.success(
      "¡Gracias! Ya tenemos tu mensaje y te contestamos en cuanto podamos."
    );
    trackEvent("contact_form_submit");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-mark.png"
              alt="Voz de Gato"
              className="h-12 w-12 object-contain flex-shrink-0"
            />
            <div>
              <h1 className="text-xl font-poppins font-bold text-primary">
                Voz de Gato
              </h1>
              <p className="text-xs text-muted-foreground">
                Hablamos por ellos
              </p>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <a
              href="#mision"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Misión
            </a>
            <a
              href="#nosotros"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Sobre Nosotros
            </a>
            <a
              href="#equipo"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Equipo
            </a>
            <a
              href="#contacto"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contacto
            </a>
            <Link
              href="/peticion"
              onClick={() =>
                trackEvent("cta_click", {
                  location: "header_nav",
                  label: "Firma la petición",
                })
              }
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-semibold px-3.5 py-1.5 rounded-full whitespace-nowrap"
            >
              Firma la petición
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold leading-tight text-foreground">
              Los gatos no pueden hablar. Nosotros hablamos por ellos.
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Desde 2024 rescatamos gatos en peligro, los esterilizamos, los
              curamos y no paramos hasta encontrarles un hogar de verdad. Voz de
              Gato existe para que ningún gato se quede solo.
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={() => {
                  trackEvent("cta_click", {
                    location: "hero_primary",
                    label: "Únete a Nuestra Misión",
                  });
                  document
                    .getElementById("contacto")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Únete a Nuestra Misión
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => {
                  trackEvent("cta_click", {
                    location: "hero_secondary",
                    label: "Conócenos",
                  });
                  document
                    .getElementById("nosotros")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Conócenos
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src="/images/gatos-refugio.jpg"
              alt="Gatos rescatados y sanos descansando en nuestro refugio, con el logo de Voz de Gato en la pared"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mision" className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-12 text-foreground">
            Nuestra Misión
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Mission Pillar 1 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Shield className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-foreground">
                Protección
              </h3>
              <p className="text-lg text-foreground/70">
                Sacamos a los gatos de la calle y del peligro, y no los soltamos
                de la mano hasta que están a salvo.
              </p>
            </div>

            {/* Mission Pillar 2 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Utensils className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-foreground">
                Alimentación
              </h3>
              <p className="text-lg text-foreground/70">
                Cada colonia que cuidamos tiene comida fresca y agua limpia
                todos los días, llueva o haga sol.
              </p>
            </div>

            {/* Mission Pillar 3 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Heart className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-foreground">
                Amor
              </h3>
              <p className="text-lg text-foreground/70">
                Un gato que lo ha pasado mal necesita algo más que comida:
                necesita volver a confiar en alguien.
              </p>
            </div>
          </div>

          <div className="bg-primary/10 border-l-4 border-primary p-8 rounded-lg">
            <p className="text-xl text-foreground leading-relaxed">
              Empezamos en 2024 siendo cuatro personas con muchas ganas y pocos
              recursos. Hoy seguimos haciendo lo mismo de entonces: estar ahí,
              cada día, para los gatos que nadie más ve.
            </p>
          </div>
        </div>
      </section>

      {/* Daily Care Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-16 text-foreground">
            Así Cuidamos Cada Día
          </h2>

          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/cuidadora-alimentando.jpg"
              alt="Voluntaria de Voz de Gato dando de comer a una colonia de gatos"
              className="w-full h-auto max-h-[520px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <p className="text-lg text-foreground/70 mt-12 max-w-2xl mx-auto">
            Comida, agua limpia y una visita diaria, haga frío o calor. Así es
            el trabajo real, todos los días del año.
          </p>
        </div>
      </section>

      {/* Reach Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-secondary/40 rounded-lg overflow-hidden">
            <img
              src="/images/mapa-35-ubicaciones.jpg"
              alt="Mapa de España con las 35 ubicaciones donde Voz de Gato cuida colonias de gatos"
              className="w-full h-auto object-cover"
            />
            <div className="p-8">
              <p className="text-3xl font-poppins font-bold text-primary mb-2">
                35 ubicaciones
              </p>
              <p className="text-lg text-foreground/70">
                Ahora mismo cuidamos colonias en 35 puntos repartidos por toda
                España. Detrás de cada punto del mapa hay gatos con nombre y
                personas que van a verlos cada semana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 md:py-28 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-12 text-foreground">
            Sobre Nosotros
          </h2>

          <div className="space-y-8 text-lg text-foreground/80 leading-relaxed">
            <p>
              Voz de Gato es una protectora de gatos. Nada de despachos ni de
              grandes discursos: somos un grupo de voluntarios y profesionales
              que un día decidimos que no podíamos mirar para otro lado.
            </p>

            <p>
              Rescatamos gatos en situación de riesgo, los esterilizamos, los
              llevamos al veterinario cuando lo necesitan y buscamos familias
              responsables dispuestas a adoptarlos. Ninguno de los que pasa por
              nuestras manos se queda sin nombre ni sin alguien que le pregunte
              cómo está.
            </p>

            <p>
              Para nosotros un gato no es un objeto ni un capricho: es un ser
              que siente y que sufre. Por eso somos su voz, la de quienes no
              pueden hablar por sí mismos.
            </p>

            <div className="bg-primary/5 p-8 rounded-lg border border-primary/20">
              <h3 className="text-2xl font-poppins font-bold text-foreground mb-4">
                Nuestros Valores
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Compasión:</strong> cada gato que llega ha pasado
                    por algo difícil, y lo tratamos con la paciencia que
                    necesita, sin prisa.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Transparencia:</strong> contamos lo que hacemos bien
                    y también lo que nos cuesta. No prometemos milagros,
                    prometemos esfuerzo.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Constancia:</strong> no nos conformamos con un
                    rescate puntual, trabajamos para que el cambio dure, colonia
                    a colonia.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipo" className="py-20 md:py-28 bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center text-foreground">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-primary text-center font-semibold mt-3 mb-12">
            Ellos son la voz de los que no la tienen
          </p>

          <div className="relative overflow-hidden rounded-lg shadow-lg mb-10">
            <img
              src="/images/equipo.jpg"
              alt="El equipo de Voz de Gato junto a varios de los gatos que cuidan"
              className="w-full h-auto object-cover"
            />
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed text-center max-w-2xl mx-auto mb-12">
            Detrás de cada rescate, de cada colonia cuidada y de cada ronroneo
            recuperado hay un equipo humano entregado. Ellos son las manos que
            alimentan y los corazones que escuchan.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-primary/5 p-8 rounded-lg border border-primary/20">
              <h3 className="text-xl font-poppins font-bold text-foreground mb-5">
                Dirección
              </h3>
              <ul className="space-y-4">
                {TEAM_LEADERSHIP.map(person => (
                  <li key={person.name}>
                    <p className="text-lg font-semibold text-foreground">
                      {person.name}
                    </p>
                    <p className="text-foreground/70">{person.role}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/5 p-8 rounded-lg border border-primary/20">
              <h3 className="text-xl font-poppins font-bold text-foreground mb-5">
                Equipo de cuidado diario
              </h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {TEAM_MEMBERS.map(name => (
                  <li
                    key={name}
                    className="text-lg font-semibold text-foreground"
                  >
                    {name}
                  </li>
                ))}
              </ul>
              <p className="text-foreground/70 mt-4">
                Se ocupan cada día de las 35 colonias: comida, agua limpia,
                revisiones y mucho cariño.
              </p>
            </div>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
            Siete personas, una misma misión: ser, día tras día, la Voz de Gato.
            Porque ellos no pueden hablar, pero nosotros hablamos por ellos.
          </p>
        </div>
      </section>

      {/* Donate — lets someone who left /dona to check the team come back
          without navigating away again */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center text-foreground mb-3">
            ¿Les ayudamos?
          </h2>
          <p className="text-lg text-foreground/70 text-center mb-10">
            Ya conoces al equipo. Esto es lo que tu ayuda hace posible.
          </p>
          <DonationButtons />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 md:py-28 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 text-foreground">
            Contacto
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <Mail className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-poppins font-bold text-foreground mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:hola@vozdegato.com"
                    className="text-lg text-primary hover:underline"
                  >
                    hola@vozdegato.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-poppins font-bold text-foreground mb-2">
                    Teléfono
                  </h3>
                  <a
                    href="tel:+34670351397"
                    className="text-lg text-primary hover:underline"
                  >
                    +34 670 35 13 97
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-poppins font-bold text-foreground mb-2">
                    Dirección
                  </h3>
                  <p className="text-lg text-foreground/80">
                    Av. Olímpica, 34, B<br />
                    46900 Torrent, Valencia
                    <br />
                    España
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <p className="text-foreground font-semibold">
                  🐱 Horario de Atención:
                  <br />
                  <span className="text-foreground/70">
                    Lunes a Viernes: 10:00 - 18:00
                  </span>
                  <br />
                  <span className="text-foreground/70">
                    Sábados: 11:00 - 15:00
                  </span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-semibold text-foreground mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-foreground text-lg"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-semibold text-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-foreground text-lg"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg font-semibold text-foreground mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-foreground text-lg resize-none"
                    placeholder="Tu mensaje aquí..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg"
                >
                  Enviar Mensaje
                </Button>
              </form>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg text-center">
                <p className="text-foreground/70 text-sm">
                  🐱 Te contestamos lo antes posible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo-mark.png"
                  alt="Voz de Gato"
                  className="h-10 w-10 object-contain flex-shrink-0"
                />
                <h3 className="text-xl font-poppins font-bold">Voz de Gato</h3>
              </div>
              <p className="text-white/70">
                Hablamos por los gatos. Protección, alimentación y amor.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-poppins font-bold text-lg mb-4">Enlaces</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#mision"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Misión
                  </a>
                </li>
                <li>
                  <a
                    href="#nosotros"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#equipo"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Equipo
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Contacto
                  </a>
                </li>
                <li>
                  <Link
                    href="/peticion"
                    onClick={() =>
                      trackEvent("cta_click", {
                        location: "footer_nav",
                        label: "Firma la petición",
                      })
                    }
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Firma la petición
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-poppins font-bold text-lg mb-4">Contacto</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="mailto:hola@vozdegato.com"
                    className="hover:text-white transition-colors"
                  >
                    hola@vozdegato.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+34670351397"
                    className="hover:text-white transition-colors"
                  >
                    +34 670 35 13 97
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-poppins font-bold text-lg mb-4">Ubicación</h4>
              <p className="text-white/70 text-sm">
                Av. Olímpica, 34, B<br />
                46900 Torrent
                <br />
                Valencia, España
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="grid md:grid-cols-2 gap-4 text-white/60 text-sm">
              <p>© 2024 Voz de Gato. Todos los derechos reservados.</p>
              <div className="flex gap-4 md:justify-end">
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidad
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Términos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <DonationBanner />
    </div>
  );
}
