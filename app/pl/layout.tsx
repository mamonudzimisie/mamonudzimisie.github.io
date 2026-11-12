import HtmlLang from '@/components/HtmlLang';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PlLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLang lang="pl" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
