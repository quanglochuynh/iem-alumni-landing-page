import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export const useErrorTranslation = () => {
  const t = useTranslations('Error');
  return t;
};

export const getErrorTranslation = (locale: string) => {
  return getTranslations({ locale, namespace: 'Error' });
};
