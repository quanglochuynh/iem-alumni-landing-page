import { defineRouting } from 'next-intl/routing';
import { LocaleCode, LocaleList } from '@/constants';

export const routing = defineRouting({
  locales: LocaleList as string[],
  defaultLocale: LocaleCode.vi,
  localePrefix: 'always',
});
