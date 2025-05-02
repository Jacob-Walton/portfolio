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

type TranslationKey = NestedKeyOf<typeof en> | string;

const translations = { en, ja };

export const useTranslation = () => {
  const router = useRouter();
  const locale = (router.locale || 'en') as keyof typeof translations;

  // Explicitly ensure string return type for text translations
  const t = <T = string>(key: TranslationKey): T => {
    try {
      // Handle nested keys like "about.title" or "projects.items"
      const keys = key.split('.');
      let value: any = translations[locale];

      for (const k of keys) {
        if (value === undefined) return key as unknown as T;
        value = value[k];
      }

      // If the value is not found, return the key
      if (value === undefined) return key as unknown as T;
      
      return value as T;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key as unknown as T;
    }
  };

  return { t, locale };
};
