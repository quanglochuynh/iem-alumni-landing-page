import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserLastName(name: string): string {
  if (!name) return '?';
  const parts = name.split(' ');
  return parts.length > 1 ? parts[parts.length - 1] : name;
}
