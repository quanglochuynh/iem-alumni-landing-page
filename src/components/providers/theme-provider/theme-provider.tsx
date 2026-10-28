/* eslint-disable react-refresh/only-export-components */
import { isPwa } from '@/components/providers/theme-provider/pwa.hook';
import {
  getBreakpoint,
  Theme,
  themeInitialState,
  ThemeProviderProps,
  ThemeProviderState,
} from '@/components/providers/theme-provider/theme.helper';
import { STORAGE_KEY, ThemeColor } from '@/constants';
import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeProviderContext =
  createContext<ThemeProviderState>(themeInitialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = STORAGE_KEY.THEME,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );
  const [isDark, setIsDark] = useState(false);
  const [bp, setBp] = useState<number | null>(null);

  // Theme effects
  useEffect(() => {
    const root = window.document.documentElement;
    const themeColorMeta = document.querySelector(
      'meta#theme-color-meta',
    ) as HTMLMetaElement | null;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      if (themeColorMeta) {
        themeColorMeta.content =
          systemTheme === 'light' ? ThemeColor.Light : ThemeColor.Dark;
      }
      setIsDark(systemTheme === 'dark');
      return;
    }
    setIsDark(theme === 'dark');

    root.classList.add(theme);
    if (themeColorMeta)
      themeColorMeta.content =
        theme === 'light' ? ThemeColor.Light : ThemeColor.Dark;
  }, [theme]);

  // Breakpoint effects
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setBp(getBreakpoint(width));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPWA = useMemo(() => isPwa(), []);

  const value = {
    bp,
    theme: {
      theme,
      isDark,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    },
    isPWA,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
