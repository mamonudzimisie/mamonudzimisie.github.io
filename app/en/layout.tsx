import type { Metadata } from 'next';
import HeaderEn from '@/components/HeaderEn';
import FooterEn from '@/components/FooterEn';
import { SITE_URL } from '@/lib/site';

const siteUrl = `${SITE_URL}/en`;

export const metadata: Metadata = {
  title: {
    default: 'ZALKA BOOKS — puzzle books for kids and adults',
    template: '%s | ZALKA BOOKS',
    absolute: 'ZALKA BOOKS — puzzle books for kids and adults',
  },
  description:
    'Word searches, sudoku and logic puzzles for kids and adults. Train your focus and unwind — screen-free, available on Amazon.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'ZALKA BOOKS',
    title: 'ZALKA BOOKS — puzzle books for kids and adults',
    description: 'Word searches, sudoku and logic puzzles that really draw you in — screen-free.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZALKA BOOKS — puzzle books for kids and adults',
    description: 'Word searches, sudoku and logic puzzles that really draw you in — screen-free.',
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderEn />
      <main className="flex-1">{children}</main>
      <FooterEn />
    </>
  );
}
