'use client';

import { useEffect } from 'react';
import type { SiteLang } from '@/lib/catalog-i18n';

// Root layout jest wspólny dla /pl, /de i /en, więc przy przejściu między
// wersjami przez <Link> (bez przeładowania) <html lang> zostaje z poprzedniej.
// Wtedy np. polska treść ma lang="en" i Chrome proponuje (albo sam robi)
// „tłumaczenie” na polski, psując teksty. Pliki HTML poprawia
// scripts/fix-de-lang.js; ten komponent pilnuje lang po nawigacji w przeglądarce.
export default function HtmlLang({ lang }: { lang: SiteLang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
