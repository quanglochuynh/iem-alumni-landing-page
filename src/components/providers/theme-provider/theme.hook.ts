import { ThemeProviderContext } from '@/components/providers/theme-provider/theme-provider';
import { useContext } from 'react';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext).theme;

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
