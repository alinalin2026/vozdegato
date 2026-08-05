/** Donation options, shared by the checkout API and the pages that render them. */

export interface Tier {
  amount: number;
  label: string;
  /** Whether this tier ships something, and so needs a delivery address. */
  physical: boolean;
}

export const TIERS: Tier[] = [
  { amount: 5, label: "Taza exclusiva", physical: true },
  { amount: 10, label: "Pack de bienvenida", physical: true },
  { amount: 20, label: "Pack completo", physical: true },
  { amount: 50, label: "Padrino de una colonia", physical: false },
  { amount: 100, label: "Guardián de las colonias", physical: false },
];

export const MONTHLY_AMOUNTS = [3, 5, 10];

export function findTier(amount: number): Tier | undefined {
  return TIERS.find((t) => t.amount === amount);
}
