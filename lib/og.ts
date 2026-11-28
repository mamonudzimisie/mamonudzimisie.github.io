import type { Metadata } from 'next';

// Open Graph i Twitter dla podstron, które nie mają własnych (wpisy, listy
// blogów, katalogi, „O nas”). Bez tego Next dziedziczy openGraph z layoutu
// i każda udostępniona podstrona wyglądała na Pintereście czy Facebooku jak
// strona główna. Next nie scala openGraph głęboko — ustawiony na stronie
// zastępuje cały obiekt z layoutu — więc siteName i locale podajemy tu
// jeszcze raz.

type Lang = 'pl' | 'de' | 'en';

const LOCALES: Record<Lang, string> = { pl: 'pl_PL', de: 'de_DE', en: 'en_US' };

type OgInput = {
  lang: Lang;
  title: string;
  description: string;
  url: string;
  // Bez obrazka: ogólny obrazek strony w danym języku (1200×630).
  image?: string;
  // Wpis na blogu: type „article” i data publikacji.
  publishedTime?: string;
};

export function socialMetadata({ lang, title, description, url, image, publishedTime }: OgInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  const img = image ?? `/og/${lang}.jpg`;
  // Wymiary znamy tylko dla naszych obrazków 1200×630.
  const images = img.startsWith('/og/') ? [{ url: img, width: 1200, height: 630 }] : [{ url: img }];
  return {
    openGraph: {
      ...(publishedTime ? { type: 'article', publishedTime } : { type: 'website' }),
      locale: LOCALES[lang],
      siteName: 'ZALKA BOOKS',
      url,
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [img],
    },
  };
}
