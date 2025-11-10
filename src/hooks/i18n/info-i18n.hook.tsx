import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export type TInfoTranslation = (value: any, options?: any) => any;

export const useInfoTranslation = () => {
  const t = useTranslations('Info');
  return t;
};

export const getInfoTranslation = (locale: string) => {
  return getTranslations({ locale, namespace: 'Info' });
};
