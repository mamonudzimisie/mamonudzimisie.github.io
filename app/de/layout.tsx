import type { Metadata } from 'next';
import HeaderDe from '@/components/HeaderDe';
import FooterDe from '@/components/FooterDe';

export const metadata: Metadata = {
  title: {
    default: 'ZALKA BOOKS — Rätselbücher für Kinder und Erwachsene',
    template: '%s | ZALKA BOOKS',
    absolute: 'ZALKA BOOKS — Rätselbücher für Kinder und Erwachsene',
  },
  description:
    'Wortsuchrätsel, Labyrinthe und Logikrätsel für Kinder und Erwachsene. Konzentration trainieren und abschalten — ganz ohne Bildschirm, erhältlich bei Amazon.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'ZALKA BOOKS',
    title: 'ZALKA BOOKS — Rätselbücher für Kinder und Erwachsene',
    description:
      'Wortsuchrätsel, Labyrinthe und Logikrätsel, die wirklich fesseln — ganz ohne Bildschirm.',
    images: [{ url: '/og/de.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZALKA BOOKS — Rätselbücher für Kinder und Erwachsene',
    description:
      'Wortsuchrätsel, Labyrinthe und Logikrätsel, die wirklich fesseln — ganz ohne Bildschirm.',
    images: ['/og/de.jpg'],
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
