import { useRouter } from 'next/router';
import en from '../i18n/en.json';
import ja from '../i18n/ja.json';

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : never;
    }[keyof T]
  : never;

const translations = { en, ja };

export const useTranslation = () => {
  const router = useRouter();
  const locale = (router.locale || 'en') as keyof typeof translations;

  const t = (key: NestedKeyOf<typeof en>) => {
    const keys = key.split('.');
    return keys.reduce((obj, k) => obj?.[k], translations[locale] as any) || key;
  };

  return { t, locale };
};
