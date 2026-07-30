import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export const useCommonTranslation = () => {
  const t = useTranslations('Common');
  return t;
};

export const getCommonTranslation = (locale: string) => {
  return getTranslations({ locale, namespace: 'Common' });
};
