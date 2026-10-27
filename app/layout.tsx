import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Newsreader } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '@/lib/site';

// Nagłówki: szeryfowy Newsreader (zmienna grubość, prawdziwa kursywa),
// tekst: Inter. Oba mają latin-ext, więc polskie i niemieckie znaki są
// w komplecie. Fraunces odpadł: jego „j” prawie nie schodzi pod linię
// pisma i w polskich słowach wyglądało jak błąd.
const newsreader = Newsreader({
  subsets: ['latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  axes: ['opsz'],
});

const inter = Inter({
  subsets: ['latin-ext'],
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
    siteName: 'ZALKA BOOKS',
    title: 'ZALKA BOOKS — książki z łamigłówkami dla dzieci i dorosłych',
    description:
      'Wykreślanki, labirynty i zagadki logiczne, które naprawdę wciągają — bez ekranu.',
    images: [{ url: '/og/pl.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZALKA BOOKS — książki z łamigłówkami dla dzieci i dorosłych',
    description:
      'Wykreślanki, labirynty i zagadki logiczne, które naprawdę wciągają — bez ekranu.',
    images: ['/og/pl.jpg'],
  },
  verification: {
    other: { 'p:domain_verify': '85027722bfb34c18f439216efac6d570' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${newsreader.variable} ${inter.variable}`}>
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
