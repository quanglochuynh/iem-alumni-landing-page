import { useContext } from 'react';
import { ThemeProviderContext } from '@/components/providers/theme-provider/theme-provider';

export const useBreakpoint = () => {
  const { bp } = useContext(ThemeProviderContext);
  if (bp === undefined)
    throw new Error('useBreakpoint must be used within a ThemeProvider');

  return bp;
};

export const useIsMobile = () => {
  const bp = useBreakpoint();
  if (bp === null) return null;
  return bp < 4;
};
