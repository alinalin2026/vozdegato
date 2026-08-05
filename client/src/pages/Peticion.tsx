import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link } from "wouter";

type Step = "hook" | "form" | "thanks";

const SOURCES = [
  {
    label: "Más de 20.600 firmas exigen un protocolo nacional para rescate animal en incendios",
    url: "https://www.cordobabn.com/articulo/buenas-noticias/mas-20600-personas-firman-iniciativa-pidiendo-protocolo-nacional-rescate-animal-catastrofes-como-fuegos/20260729210945263985.html",
  },
  {
    label: "Reclaman un protocolo nacional para proteger a los animales durante los incendios",
    url: "https://www.diarioveterinario.com/t/5968518/reclaman-mayor-protagonismo-veterinario-protocolo-nacional-proteger-animales-durante-incendios",
  },
  {
    label: "Incendios en España 2026: la peor campaña según Copernicus",
    url: "https://www.moncloa.com/2026/08/03/incendios-espana-2026-copernicus-hectareas-3410075/",
  },
];

export default function Peticion() {
  const [step, setStep] = useState<Step>("hook");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/signatures")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Nos falta tu nombre o tu email.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No hemos podido guardar tu firma. Inténtalo de nuevo en unos minutos.");
        return;
      }
      setCount(data.count);
      setStep("thanks");
    } catch {
      setError("No hemos podido guardar tu firma. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const donate = (amount: string) => {
    const subject = `Quiero donar ${amount}`;
    const body = `Hola,\n\nAcabo de firmar la petición sobre el rescate de colonias de gatos en incendios y quiero colaborar con ${amount}. Decidme cómo puedo hacerlo.\n\nGracias.`;
    window.location.href = `mailto:hola@vozdegato.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const firstName = name.trim().split(" ")[0] || "amigo de los gatos";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo-mark.png" alt="" className="h-9 w-9 object-contain" />
            <span className="font-poppins font-bold text-primary">Voz de Gato</span>
          </div>
          <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold text-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="py-12 md:py-20">
        <div className="container flex flex-col items-center">
          {/* Progress */}
          <div className="flex gap-2 mb-6">
            {(["hook", "form", "thanks"] as Step[]).map((s) => (
              <span
                key={s}
                className={`h-2 rounded-full transition-all ${
                  step === s ? "w-6 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>

          {/* Card */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
            {step === "hook" && (
              <div className="flex flex-col gap-5 p-7">
                <div className="relative -mx-7 -mt-7">
                  <img
                    src="/images/cuidadora-alimentando.jpg"
                    alt="Voluntaria de Voz de Gato cuidando a una colonia de gatos"
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute left-4 bottom-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    219.665 hectáreas quemadas en 2026
                  </span>
                </div>
                <p className="text-xs font-bold tracking-wide uppercase text-primary">Petición urgente</p>
                <h1 className="text-2xl font-poppins font-bold leading-snug text-balance">
                  España arde. A las colonias de gatos no las rescata nadie.
                </h1>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  El peor verano de incendios en años. Ni un protocolo que diga quién salva a los gatos de colonia.
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg h-auto py-4"
                  onClick={() => setStep("form")}
                >
                  Firmar la petición
                </Button>
              </div>
            )}

            {step === "form" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7">
                <div className="flex items-center gap-2">
                  <img src="/images/logo-mark.png" alt="" className="h-8 w-8 object-contain" />
                  <span className="font-poppins font-bold text-primary text-sm">Voz de Gato</span>
                </div>
                <h2 className="text-2xl font-poppins font-bold leading-snug text-balance">
                  Ya casi está. Solo tu nombre y tu email.
                </h2>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-base font-semibold">Nombre completo</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      autoComplete="name"
                      className="px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-lg"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-base font-semibold">Correo electrónico</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      autoComplete="email"
                      className="px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-lg"
                    />
                  </label>
                </div>
                {error && <p className="text-sm text-destructive font-medium">{error}</p>}
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Solo usamos tu email para confirmar tu firma y avisarte si entregamos la petición. Nunca lo compartimos.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg h-auto py-4"
                >
                  {submitting ? "Guardando..." : "Confirmar mi firma"}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("hook")}
                  className="flex items-center justify-center gap-1.5 text-sm font-semibold text-foreground/60 hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver
                </button>
              </form>
            )}

            {step === "thanks" && (
              <div className="flex flex-col gap-5 p-7">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-center text-balance">
                  ¡Gracias, {firstName}!
                </h2>
                <p className="text-lg text-foreground/70 text-center leading-relaxed">
                  Tu firma ya cuenta. En cuanto tengamos suficientes, la llevamos a la Generalitat.
                </p>
                <div className="bg-secondary/50 rounded-xl p-5 text-center">
                  <p className="text-3xl font-poppins font-bold text-primary">
                    {count !== null ? count.toLocaleString("es-ES") : "…"}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                    personas han firmado
                  </p>
                </div>

                <div className="border-t border-border pt-5 flex flex-col gap-3">
                  <p className="text-base text-foreground/80 leading-relaxed">
                    Firmar es gratis. Pero rescatar a un gato hoy cuesta dinero real: comida, agua, veterinario.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {["5€", "10€", "20€"].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => donate(amount)}
                        className="py-2.5 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold h-auto py-3.5"
                    onClick={() => donate("otra cantidad")}
                  >
                    Quiero colaborar económicamente
                  </Button>
                  <Link
                    href="/"
                    className="text-center text-sm font-semibold text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Ahora no, ya he firmado
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Context below the card */}
          <div className="w-full max-w-md mt-16 flex flex-col gap-8">
            <div>
              <h3 className="text-lg font-poppins font-bold mb-3">¿Por qué pedimos esto?</h3>
              <p className="text-base text-foreground/70 leading-relaxed">
                España tiene una Ley de Bienestar Animal desde 2023. Habla de proteger a los animales en catástrofes,
                pero todavía no existe un protocolo real que diga quién rescata a las colonias felinas, con qué equipo
                y con qué presupuesto. Ya hay más de 20.000 firmas pidiendo esto a nivel nacional y una propuesta en el
                Congreso. Mientras se decide, los incendios no esperan.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-poppins font-bold mb-3">Quiénes somos</h3>
              <p className="text-base text-foreground/70 leading-relaxed">
                Somos Voz de Gato, una protectora de gatos en Valencia. Cuidamos colonias todos los días.{" "}
                <Link href="/#nosotros" className="text-primary hover:underline font-semibold">
                  Conócenos aquí.
                </Link>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground/50 mb-3">Fuentes</h3>
              <ul className="space-y-2">
                {SOURCES.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline leading-relaxed"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-foreground/50">
          © 2024 Voz de Gato. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
