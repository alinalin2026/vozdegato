import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { MONTHLY_AMOUNTS } from "@shared/donaciones";
import { Check, Facebook, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const PETITION_URL = "https://vozdegato.com/peticion";
const SHARE_TEXT = "España arde y a las colonias de gatos no las rescata nadie. Firma con nosotros:";

type Status =
  | { state: "loading" }
  | { state: "ok"; amount: number | null; monthly: boolean; label: string | null }
  | { state: "unknown" };

export default function DonacionCompletada() {
  const [status, setStatus] = useState<Status>({ state: "loading" });
  const [pending, setPending] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("session_id");
    if (!id) {
      setStatus({ state: "unknown" });
      return;
    }
    fetch(`/api/checkout?session_id=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.paid) {
          const monthly = data.mode === "subscription";
          setStatus({
            state: "ok",
            amount: data.amount ?? null,
            monthly,
            label: data.label ?? null,
          });
          trackEvent("purchase", {
            transaction_id: id,
            currency: "EUR",
            value: data.amount ?? undefined,
            items: [
              {
                item_id: monthly ? "socio_mensual" : `tier_${data.amount ?? "custom"}`,
                item_name: data.label ?? (monthly ? "Socio/a mensual" : "Donación"),
                price: data.amount ?? undefined,
              },
            ],
          });
        } else {
          setStatus({ state: "unknown" });
        }
      })
      .catch(() => setStatus({ state: "unknown" }));
  }, []);

  const subscribe = async (amount: number) => {
    setPending(amount);
    setError("");
    trackEvent("begin_checkout", {
      currency: "EUR",
      value: amount,
      items: [{ item_id: "socio_mensual", item_name: `Socio/a — ${amount}€/mes`, price: amount }],
    });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, mode: "subscription" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "No hemos podido abrir el pago. Inténtalo de nuevo.");
        trackEvent("checkout_error", { amount, mode: "subscription", reason: data.error || "api_error" });
        setPending(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("No hemos podido abrir el pago. Revisa tu conexión e inténtalo de nuevo.");
      trackEvent("checkout_error", { amount, mode: "subscription", reason: "network_error" });
      setPending(null);
    }
  };

  const alreadyMonthly = status.state === "ok" && status.monthly;

  const handleShare = () => {
    trackEvent("share", { method: "facebook", content_type: "petition", item_id: "peticion_incendios" });
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      PETITION_URL
    )}&quote=${encodeURIComponent(SHARE_TEXT)}`;
    window.open(url, "compartir-facebook", "width=600,height=520");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-white border-b border-border">
        <div className="container flex items-center py-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo-mark.png" alt="" className="h-8 w-8 object-contain" />
            <span className="font-poppins font-bold text-primary">Voz de Gato</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-xl mx-auto py-10 md:py-16">
        <div className="text-center mb-10">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
          </div>

          {status.state === "loading" && (
            <p className="text-lg text-foreground/60">Confirmando tu donación…</p>
          )}

          {status.state === "ok" && (
            <>
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold mb-3 text-balance">
                {alreadyMonthly ? "¡Ya eres socio/a!" : "¡Donación recibida!"}
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                {alreadyMonthly ? (
                  <>
                    Desde hoy nos ayudas cada mes
                    {status.amount ? ` con ${status.amount}€` : ""}. Te hemos enviado el recibo por
                    correo.
                  </>
                ) : (
                  <>
                    Gracias de verdad
                    {status.amount ? ` por tus ${status.amount}€` : ""}. Te hemos enviado el recibo
                    por correo
                    {status.label ? `, y tu ${status.label.toLowerCase()} va de camino` : ""}.
                  </>
                )}
              </p>
            </>
          )}

          {status.state === "unknown" && (
            <>
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold mb-3 text-balance">
                Gracias por tu apoyo
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Si acabas de completar una donación, recibirás el recibo por correo en unos minutos.
                ¿Algún problema? Escríbenos a{" "}
                <a
                  href="mailto:hola@vozdegato.com"
                  className="text-primary hover:underline font-semibold"
                >
                  hola@vozdegato.com
                </a>
                .
              </p>
            </>
          )}
        </div>

        {/* Monthly upsell — only once they've actually given, and not if they already subscribed */}
        {status.state === "ok" && !alreadyMonthly && (
          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-poppins font-bold mb-2 text-balance">
              ¿Nos echas una mano cada mes?
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-5">
              Las colonias comen todos los días, no solo cuando hay campaña. Con una cuota mensual
              podemos planificar de verdad: comida, vacunas y esterilizaciones. Puedes cancelarla
              cuando quieras.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {MONTHLY_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  disabled={pending !== null}
                  onClick={() => subscribe(amount)}
                  className="rounded-xl border-2 border-primary/40 hover:border-primary hover:bg-primary/5 transition-colors py-4 disabled:opacity-60"
                >
                  <span className="block text-2xl font-poppins font-bold text-primary">
                    {pending === amount ? "…" : `${amount}€`}
                  </span>
                  <span className="block text-xs font-semibold text-foreground/60">al mes</span>
                </button>
              ))}
            </div>

            {error && (
              <p className="text-destructive font-medium mb-3" role="alert">
                {error}
              </p>
            )}

            <p className="text-sm text-foreground/60 flex items-start gap-2">
              <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" strokeWidth={3} />
              Sin permanencia. Cancelas cuando quieras desde el correo del recibo.
            </p>
          </div>
        )}

        {/* Last step: turn a donor into a megaphone */}
        {status.state === "ok" && (
          <div className="text-center mt-10 bg-white rounded-2xl border border-border p-6 sm:p-8">
            <img src="/images/logo-mark.png" alt="" className="h-12 w-12 object-contain mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-poppins font-bold mb-2 text-balance">
              Sé la voz de los gatos en redes
            </h2>
            <p className="text-foreground/70 leading-relaxed max-w-sm mx-auto mb-6">
              Ayúdanos a llegar a más gente. Cuantas más firmas, más fuerza para exigir el protocolo
              de rescate.
            </p>
            <Button
              onClick={handleShare}
              size="lg"
              className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-semibold h-auto py-4 px-8"
            >
              <Facebook className="w-5 h-5" fill="currentColor" />
              Compartir la petición
            </Button>
          </div>
        )}

        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
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
