'use client';

import { useEffect } from 'react';

// Tytuł karty ustawia już skrypt w NotFoundContent; tu tylko pilnujemy, żeby
// po uruchomieniu Reacta nie wrócił do polskiego na stronach /de i /en.
export default function NotFoundTitle({ titles }: { titles: Record<string, string> }) {
  useEffect(() => {
    const title = titles[window.location.pathname.split('/')[1]];
    if (title) document.title = title;
  }, [titles]);

  return null;
}
