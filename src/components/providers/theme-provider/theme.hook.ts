import { useContext } from 'react';
import { ThemeProviderContext } from '@/components/providers/theme-provider/theme-provider';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext).theme;

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
