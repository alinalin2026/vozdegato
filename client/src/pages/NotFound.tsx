import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cat, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Cat className="h-10 w-10 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl font-poppins font-bold text-foreground mb-2">404</h1>

          <h2 className="text-xl font-poppins font-semibold text-foreground/80 mb-4">
            Esta página se ha perdido
          </h2>

          <p className="text-foreground/70 mb-8 leading-relaxed">
            Igual que buscamos a los gatos que se pierden, pero esta página no la encontramos.
            <br />
            Puede que el enlace esté mal escrito o que ya no exista.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
