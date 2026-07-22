import type { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const siteUrl = 'https://mamonudzimisie.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Książeczki aktywnościowe dla dzieci',
    template: '%s | Książeczki aktywnościowe dla dzieci',
  },
  description:
    'Wykreślanki, labirynty i kolorowanki, które naprawdę zajmą dziecko. Książeczki aktywnościowe dopasowane do wieku, dostępne na Amazon.',
  keywords: [
    'książeczki aktywnościowe',
    'wykreślanki dla dzieci',
    'kolorowanki',
    'zabawy bez ekranu',
    'książeczki dla dzieci Amazon',
  ],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: siteUrl,
    siteName: 'Książeczki aktywnościowe dla dzieci',
    title: 'Książeczki aktywnościowe dla dzieci',
    description:
      'Wykreślanki, labirynty i kolorowanki, które naprawdę zajmą dziecko — bez ekranu.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Książeczki aktywnościowe dla dzieci',
    description:
      'Wykreślanki, labirynty i kolorowanki, które naprawdę zajmą dziecko — bez ekranu.',
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
