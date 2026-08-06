/** Donation options, shared by the checkout API and the pages that render them. */

export interface Tier {
  amount: number;
  label: string;
}

export const TIERS: Tier[] = [
  { amount: 5, label: "Colaboración puntual" },
  { amount: 10, label: "Apoyo a las colonias" },
  { amount: 20, label: "Apoyo completo" },
  { amount: 50, label: "Padrino de una colonia" },
  { amount: 100, label: "Guardián de las colonias" },
];

export const MONTHLY_AMOUNTS = [3, 5, 10];

export function findTier(amount: number): Tier | undefined {
  return TIERS.find(t => t.amount === amount);
}
