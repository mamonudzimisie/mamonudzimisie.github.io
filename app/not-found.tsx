import type { Metadata } from 'next';
import NotFoundContent from '@/components/NotFoundContent';

export const metadata: Metadata = {
  title: 'Nie znaleziono strony',
};

export default function NotFound() {
  return <NotFoundContent />;
}
