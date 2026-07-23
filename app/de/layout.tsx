import type { Metadata } from 'next';
import HeaderDe from '@/components/HeaderDe';
import FooterDe from '@/components/FooterDe';
import { SITE_URL } from '@/lib/site';

const siteUrl = `${SITE_URL}/de`;

export const metadata: Metadata = {
  title: {
    default: 'Beschäftigungsbücher für Kinder',
    template: '%s | Beschäftigungsbücher für Kinder',
    absolute: 'Beschäftigungsbücher für Kinder',
  },
  description:
    'Wortsuchrätsel, Labyrinthe und Malbücher, die Kinder wirklich beschäftigen. Altersgerechte Beschäftigungsbücher, erhältlich bei Amazon.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteUrl,
    siteName: 'Beschäftigungsbücher für Kinder',
    title: 'Beschäftigungsbücher für Kinder',
    description:
      'Wortsuchrätsel, Labyrinthe und Malbücher, die Kinder wirklich beschäftigen — ganz ohne Bildschirm.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beschäftigungsbücher für Kinder',
    description:
      'Wortsuchrätsel, Labyrinthe und Malbücher, die Kinder wirklich beschäftigen — ganz ohne Bildschirm.',
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
