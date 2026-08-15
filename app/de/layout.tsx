import type { Metadata } from 'next';
import HeaderDe from '@/components/HeaderDe';
import FooterDe from '@/components/FooterDe';
import { SITE_URL } from '@/lib/site';

const siteUrl = `${SITE_URL}/de`;

export const metadata: Metadata = {
  title: {
    default: 'Rätselbücher für Kinder und Erwachsene',
    template: '%s | Rätselbücher für Kinder und Erwachsene',
    absolute: 'Rätselbücher für Kinder und Erwachsene',
  },
  description:
    'Wortsuchrätsel, Labyrinthe und Logikrätsel für Kinder und Erwachsene. Konzentration trainieren und abschalten — ganz ohne Bildschirm, erhältlich bei Amazon.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteUrl,
    siteName: 'Rätselbücher für Kinder und Erwachsene',
    title: 'Rätselbücher für Kinder und Erwachsene',
    description:
      'Wortsuchrätsel, Labyrinthe und Logikrätsel, die wirklich fesseln — ganz ohne Bildschirm.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rätselbücher für Kinder und Erwachsene',
    description:
      'Wortsuchrätsel, Labyrinthe und Logikrätsel, die wirklich fesseln — ganz ohne Bildschirm.',
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderDe />
      <main className="flex-1">{children}</main>
      <FooterDe />
    </>
  );
}
