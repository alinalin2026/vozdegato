import { Button } from "@/components/ui/button";
import { ChevronDown, Heart } from "lucide-react";

interface DonationTierProps {
  amount: number;
  shortLabel: string;
  description: string;
  rewards: string[];
  image: string;
  imageAlt: string;
  open: boolean;
  onToggle: () => void;
  onDonate: () => void;
  highlighted?: boolean;
}

export default function DonationTier({
  amount,
  shortLabel,
  description,
  rewards,
  image,
  imageAlt,
  open,
  onToggle,
  onDonate,
  highlighted = false,
}: DonationTierProps) {
  const panelId = `tier-${amount}-panel`;

  return (
    <div
      className={`rounded-2xl bg-white overflow-hidden transition-shadow ${
        highlighted ? "ring-2 ring-primary shadow-md" : "border border-border"
      }`}
    >
      {/* Collapsed row — always visible, always tappable */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left hover:bg-secondary/40 transition-colors"
      >
        <span className="text-3xl sm:text-4xl font-poppins font-bold text-primary tabular-nums">
          {amount}€
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-poppins font-bold text-foreground leading-tight">
            {shortLabel}
          </span>
          {highlighted && (
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              Más popular
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-foreground/40 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded detail */}
      {open && (
        <div id={panelId} className="px-4 sm:px-5 pb-5 flex flex-col gap-4">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-44 sm:h-52 object-cover rounded-xl"
            loading="lazy"
          />
          <p className="text-foreground/70 leading-relaxed">{description}</p>
          <ul className="flex flex-col gap-1.5">
            {rewards.map((reward) => (
              <li key={reward} className="flex items-start gap-2 text-foreground">
                <span className="text-primary font-bold mt-0.5" aria-hidden="true">
                  ✓
                </span>
                <span>{reward}</span>
              </li>
            ))}
          </ul>
          <Button
            onClick={onDonate}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg h-auto py-4"
          >
            <Heart className="w-5 h-5" />
            Donar {amount}€
          </Button>
        </div>
      )}
    </div>
  );
}
