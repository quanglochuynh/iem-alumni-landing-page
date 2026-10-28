import { MonitorCog, SunDimIcon, Sunset } from 'lucide-react';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { STORAGE_KEY } from '@/constants/storage.constant';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const themeOptions: { name: Theme; icon: any; label: string }[] = [
  { name: 'light', icon: SunDimIcon, label: 'Sáng' },
  { name: 'dark', icon: Sunset, label: 'Tối' },
  { name: 'system', icon: MonitorCog, label: 'Tự động' },
];

export const breakpoints = {
  '0': 0, // Default for mobile-first design
  '1': Number(defaultTheme.screens.sm.split('px')[0]),
  '2': Number(defaultTheme.screens.md.split('px')[0]),
  '3': Number(defaultTheme.screens.lg.split('px')[0]),
  '4': Number(defaultTheme.screens.xl.split('px')[0]),
  '5': Number(defaultTheme.screens['2xl'].split('px')[0]),
};

export const getBreakpoint = (width?: number | null): number => {
  if (!width) return 0;
  if (width >= breakpoints['5']) return 6;
  if (width >= breakpoints['4']) return 5;
  if (width >= breakpoints['3']) return 4;
  if (width >= breakpoints['2']) return 3;
  if (width >= breakpoints['1']) return 2;
  return 1;
};

export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: STORAGE_KEY;
};

export type ThemeProviderState = {
  bp: number | null;
  isPWA: boolean;
  theme: {
    theme: Theme;
    isDark: boolean;
    setTheme: (theme: Theme) => void;
  };
};

export const themeInitialState: ThemeProviderState = {
  bp: null,
  isPWA: false,
  theme: {
    theme: 'system',
    isDark: false,
    setTheme: () => null,
  },
};
