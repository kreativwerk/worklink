import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Build a wa.me deep link from a free-form phone number
 * ("+383 49 539 018" → "https://wa.me/38349539018"). Returns null if the
 * number has too few digits to be dialable.
 */
export function whatsappLink(phone: string, text?: string) {
  const digits = phone.replace(/[^\d]/g, "").replace(/^00/, "");
  if (digits.length < 8) return null;
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${query}`;
}
