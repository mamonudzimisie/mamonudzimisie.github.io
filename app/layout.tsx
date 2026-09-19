import type { Metadata } from 'next';
import Script from 'next/script';
import { Baloo_2, Nunito } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '@/lib/site';

const baloo = Baloo_2({
  subsets: ['latin-ext'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
});

const nunito = Nunito({
  subsets: ['latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ZALKA BOOKS — książki z łamigłówkami dla dzieci i dorosłych',
    template: '%s | ZALKA BOOKS',
  },
  description:
    'Wykreślanki, labirynty i zagadki logiczne dla dzieci i dorosłych. Trening koncentracji i chwila wyciszenia bez ekranu — dostępne na Amazon.',
  keywords: [
    'książki z łamigłówkami',
    'łamigłówki dla dorosłych',
    'wykreślanki dla dzieci',
    'zagadki logiczne',
    'łamigłówki duży druk',
    'zabawy bez ekranu',
  ],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: SITE_URL,
    siteName: 'ZALKA BOOKS',
    title: 'ZALKA BOOKS — książki z łamigłówkami dla dzieci i dorosłych',
    description:
      'Wykreślanki, labirynty i zagadki logiczne, które naprawdę wciągają — bez ekranu.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZALKA BOOKS — książki z łamigłówkami dla dzieci i dorosłych',
    description:
      'Wykreślanki, labirynty i zagadki logiczne, które naprawdę wciągają — bez ekranu.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="font-body flex min-h-screen flex-col bg-paper text-ink">
        {children}
        {/* Cloudflare Web Analytics — bez ciasteczek, więc bez zgody na cookies. */}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "c3d8096a90a94d9a99ae3e0dc9ce1429"}'
        />
      </body>
    </html>
  );
}
