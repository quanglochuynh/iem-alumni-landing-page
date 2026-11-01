import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserLastName(name: string | null | undefined): string {
  const normalized = typeof name === 'string' ? name.trim() : '';

  if (!normalized) return '?';

  const parts = normalized.split(/\s+/);
  return parts.length > 1
    ? (parts[parts.length - 1] ?? normalized)
    : normalized;
}
