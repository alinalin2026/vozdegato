import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const DISMISS_KEY = "peticion-banner-dismissed";

export default function PeticionBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-foreground text-white shadow-[0_-4px_16px_rgba(0,0,0,0.15)]">
      <div className="container flex items-center gap-4 py-3">
        <p className="flex-1 text-sm md:text-base font-medium leading-snug">
          España arde y nadie rescata a las colonias de gatos.{" "}
          <span className="hidden sm:inline">Pide un protocolo de emergencia.</span>
        </p>
        <Link
          href="/peticion"
          className="flex-shrink-0 bg-primary hover:bg-primary/90 transition-colors text-white font-semibold text-sm px-4 py-2 rounded-full"
        >
          Firmar
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Cerrar"
          className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
