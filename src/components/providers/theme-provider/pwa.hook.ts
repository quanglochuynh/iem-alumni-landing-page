import { ThemeProviderContext } from '@/components/providers/theme-provider/theme-provider';
import { useContext } from 'react';

export function isPwa() {
  const displayModes = ['fullscreen', 'standalone', 'minimal-ui'];
  return displayModes.some(
    (displayMode) =>
      window.matchMedia(`(display-mode: ${displayMode})`).matches,
  );
}

export const usePWA = () => {
  const context = useContext(ThemeProviderContext).isPWA;

  if (context === undefined)
    throw new Error('usePWA must be used within a ThemeProvider');

  return context;
};
