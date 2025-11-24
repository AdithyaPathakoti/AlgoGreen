import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format credits as a compact number string (e.g. 1,200 -> "1,200").
 */
export function formatCredits(amount: number | null | undefined): string {
  if (amount == null) return "0";
  return Number(amount).toLocaleString();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clamp(value: number, min = 0, max = 1e9) {
  return Math.max(min, Math.min(max, value));
}

export function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
