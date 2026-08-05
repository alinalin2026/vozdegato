import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DonationTierProps {
  amount: number;
  currency: string;
  title: string;
  description: string;
  rewards: string[];
  image: string;
  imageAlt: string;
  onDonate: () => void;
  highlighted?: boolean;
}

export default function DonationTier({
  amount,
  currency,
  title,
  description,
  rewards,
  image,
  imageAlt,
  onDonate,
  highlighted = false,
}: DonationTierProps) {
  return (
    <div
      className={`flex flex-col rounded-2xl overflow-hidden bg-white transition-shadow duration-300 ${
        highlighted
          ? "ring-2 ring-primary shadow-lg md:scale-105"
          : "border border-border shadow-md hover:shadow-xl"
      }`}
    >
      {/* Reward photo */}
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
        {highlighted && (
          <div className="absolute top-4 right-4 bg-foreground text-white px-3 py-1 rounded-full text-sm font-semibold">
            Más popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-4xl font-poppins font-bold text-primary">{amount}</span>
          <span className="text-xl text-foreground">{currency}</span>
        </div>

        <h3 className="text-2xl font-poppins font-bold text-foreground mb-2">{title}</h3>

        <p className="text-foreground/70 mb-5 leading-relaxed">{description}</p>

        <div className="mb-6 flex-grow">
          <p className="text-xs font-bold text-foreground/50 uppercase tracking-wide mb-3">
            Tu recompensa
          </p>
          <ul className="space-y-2">
            {rewards.map((reward) => (
              <li key={reward} className="flex items-start gap-2 text-foreground">
                <span className="text-primary mt-0.5 font-bold" aria-hidden="true">
                  ✓
                </span>
                <span>{reward}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          onClick={onDonate}
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg h-auto py-4"
        >
          <Heart className="w-5 h-5" />
          Donar {amount}€
        </Button>
      </div>
    </div>
  );
}
