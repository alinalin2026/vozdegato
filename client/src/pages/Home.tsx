import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Heart, Shield, Utensils } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, completa todos los campos");
      return;
    }
    toast.success("Mensaje enviado. Nos pondremos en contacto pronto.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/logo_d5e1fe8c.png"
              alt="Voz de Gato"
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-poppins font-bold text-primary">Voz de Gato</h1>
              <p className="text-xs text-muted-foreground">Hablamos por ellos</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#mision" className="text-foreground hover:text-primary transition-colors font-medium">
              Misión
            </a>
            <a href="#nosotros" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre Nosotros
            </a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors font-medium">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold leading-tight text-foreground">
              Los gatos merecen protección
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Nosotros hablamos por ellos. Voz de Gato es una organización dedicada a garantizar que cada gato tenga un hogar seguro, comida suficiente y el amor que merece.
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
              >
                Únete a Nuestra Misión
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Más Información
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src="/manus-storage/hero_56a85f4d.jpg"
              alt="Gatos en refugio"
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
              <h3 className="text-2xl font-poppins font-bold text-foreground">Protección</h3>
              <p className="text-lg text-foreground/70">
                Garantizar que cada gato esté seguro, protegido de peligros y maltrato.
              </p>
            </div>

            {/* Mission Pillar 2 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Utensils className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-foreground">Alimentación</h3>
              <p className="text-lg text-foreground/70">
                Asegurar que todos los gatos tengan acceso a comida nutritiva y agua limpia.
              </p>
            </div>

            {/* Mission Pillar 3 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Heart className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-poppins font-bold text-foreground">Amor</h3>
              <p className="text-lg text-foreground/70">
                Proporcionar cuidado, atención y un hogar lleno de amor para cada felino.
              </p>
            </div>
          </div>

          <div className="bg-primary/10 border-l-4 border-primary p-8 rounded-lg">
            <p className="text-xl text-foreground leading-relaxed">
              Fundada en 2024, Voz de Gato trabaja cada día para mejorar la vida de los gatos en nuestras comunidades. Creemos que cada gato merece ser escuchado, protegido y amado.
            </p>
          </div>
        </div>
      </section>

      {/* Cat Photos Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 text-foreground">
            Gatos Saludables, Felices
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="/manus-storage/cat_shelter_1_c53999f0.jpg"
                alt="Gato en refugio"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="/manus-storage/cat_shelter_2_199f7bcd.jpg"
                alt="Gatos en refugio"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          <p className="text-center text-lg text-foreground/70 mt-12 max-w-2xl mx-auto">
            Nuestros refugios ofrecen un ambiente seguro y amoroso donde los gatos pueden recuperarse, jugar y encontrar sus familias para siempre.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-12 text-foreground">
            Sobre Nosotros
          </h2>

          <div className="space-y-8 text-lg text-foreground/80 leading-relaxed">
            <p>
              Voz de Gato es una organización no gubernamental (ONG) dedicada a la protección y los derechos de los gatos. Nuestro equipo está compuesto por voluntarios apasionados y profesionales comprometidos con mejorar la vida de los felinos.
            </p>

            <p>
              Trabajamos en varios frentes: rescate de gatos en situación de riesgo, operaciones de esterilización y castración, atención veterinaria, y programas de adopción responsable. Cada gato que llega a nuestros refugios recibe cuidado integral y atención personalizada.
            </p>

            <p>
              Creemos que los gatos no son objetos, sino seres vivos que merecen respeto, protección y amor. Nuestra misión es ser la voz de aquellos que no pueden hablar por sí solos.
            </p>

            <div className="bg-primary/5 p-8 rounded-lg border border-primary/20">
              <h3 className="text-2xl font-poppins font-bold text-foreground mb-4">Nuestros Valores</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Compasión:</strong> Tratamos a cada gato con amor y respeto.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Transparencia:</strong> Somos honestos sobre nuestro trabajo y nuestros desafíos.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Sostenibilidad:</strong> Trabajamos para crear cambios duraderos en nuestras comunidades.</span>
                </li>
              </ul>
            </div>
          </div>
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
                  <h3 className="text-xl font-poppins font-bold text-foreground mb-2">Email</h3>
                  <a href="mailto:hola@vozdegato.com" className="text-lg text-primary hover:underline">
                    hola@vozdegato.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-poppins font-bold text-foreground mb-2">Teléfono</h3>
                  <a href="tel:+34670351397" className="text-lg text-primary hover:underline">
                    +34 670 35 13 97
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-poppins font-bold text-foreground mb-2">Dirección</h3>
                  <p className="text-lg text-foreground/80">
                    Av. Olímpica, 34, B<br />
                    46900 Torrent, Valencia<br />
                    España
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <p className="text-foreground font-semibold">
                  🐱 Horario de Atención:<br />
                  <span className="text-foreground/70">Lunes a Viernes: 10:00 - 18:00</span><br />
                  <span className="text-foreground/70">Sábados: 11:00 - 15:00</span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-foreground mb-2">
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
                  <label htmlFor="email" className="block text-lg font-semibold text-foreground mb-2">
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
                  <label htmlFor="message" className="block text-lg font-semibold text-foreground mb-2">
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
                  🐱 Responderemos a tu mensaje en el menor tiempo posible.
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
                  src="/manus-storage/logo_d5e1fe8c.png"
                  alt="Voz de Gato"
                  className="h-10 w-10 object-contain"
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
                  <a href="#mision" className="text-white/70 hover:text-white transition-colors">
                    Misión
                  </a>
                </li>
                <li>
                  <a href="#nosotros" className="text-white/70 hover:text-white transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-white/70 hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-poppins font-bold text-lg mb-4">Contacto</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="mailto:hola@vozdegato.com" className="hover:text-white transition-colors">
                    hola@vozdegato.com
                  </a>
                </li>
                <li>
                  <a href="tel:+34670351397" className="hover:text-white transition-colors">
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
                46900 Torrent<br />
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
    </div>
  );
}
