import DonationTiers from "@/components/DonationTiers";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export const SIGNER_NAME_KEY = "peticion-firmante";

export default function Gracias() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(sessionStorage.getItem(SIGNER_NAME_KEY) || "");
  }, []);

  const firstName = name.trim().split(" ")[0];

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
        <DonationTiers />

        {/* Context, now below the ask */}
        <div className="flex flex-col gap-8 text-center mt-14">
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
