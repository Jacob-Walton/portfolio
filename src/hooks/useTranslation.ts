import { useRouter } from 'next/router';
import en from '../locales/en.json';
import ja from '../locales/ja.json';

type Translations = typeof en;

export const useTranslation = () => {
  const router = useRouter();
  const { locale } = router;

  const translations: Record<string, Translations> = {
    en,
    ja,
  };

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[locale || 'en'];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t, locale };
};