/** Formatting helpers. */

export function formatPrice(amount: number, currency = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ageLabel(age: number | null): string {
  return age ? `${age} Years Old` : "No Age Statement";
}
