export type BookCategory =
  | 'wykreslanki'
  | 'labirynty'
  | 'kolorowanki'
  | 'laczenie-kropek'
  | 'inne';

export type BookAudience = 'dzieci' | 'dorosli' | 'duzy-druk';

export type Book = {
  slug: string; // np. "znajdz-slowko-poziom-latwy"
  title: string; // "Znajdź słówko!"
  subtitle: string; // "Poziom najłatwiejszy"
  ageRange: string; // "5–6 lat"
  category: BookCategory;
  audience: BookAudience;
  description: string;
  features: string[]; // np. ["100 wykreślanek", "Duża czcionka", ...]
  coverImage: string; // ścieżka w /public/covers/
  amazonUrl: string;
  featured: boolean;
  comingSoon?: boolean;
  formatInches: string; // np. '8,5 × 11 cala'
  pageCount: number;
};

// Kategorie do filtrowania w katalogu — etykiety po polsku.
export const CATEGORY_LABELS: Record<BookCategory, string> = {
  wykreslanki: 'Wykreślanki',
  labirynty: 'Labirynty',
  kolorowanki: 'Kolorowanki',
  'laczenie-kropek': 'Łączenie kropek',
  inne: 'Inne',
};

// Grupy odbiorców do filtrowania w katalogu — etykiety po polsku.
export const AUDIENCE_LABELS: Record<BookAudience, string> = {
  dzieci: 'Dla dzieci',
  dorosli: 'Dla dorosłych',
  'duzy-druk': 'Duży druk',
};

export const AGE_GROUPS = ['3–4 lata', '5–6 lat', '6–7 lat', '7–9 lat', '10+', '13+'] as const;

export const books: Book[] = [
  {
    slug: 'znajdz-slowko-poziom-latwy',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom najłatwiejszy',
    ageRange: '5–6 lat',
    category: 'wykreslanki',
    audience: 'dzieci',
    description:
      'Pierwsza wykreślanka, która nie zniechęca. Duże litery, znajome słowa i tyle satysfakcji, ile potrzeba, żeby dziecko samo poprosiło o kolejną stronę. Świetny sposób, żeby oswoić literki, zanim zacznie się prawdziwa nauka czytania.',
    features: [
      '100 wykreślanek',
      'Nauka czytania przez zabawę',
      'Duże litery',
      'Tematy bliskie dzieciom (zwierzęta, rodzina, kolory)',
    ],
    coverImage: '/covers/znajdz-slowko-5-6.png',
    amazonUrl: 'https://amzn.eu/d/0coMqTkj',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
  {
    slug: 'znajdz-slowko-poziom-latwy-6-7',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom łatwy',
    ageRange: '6–7 lat',
    category: 'wykreslanki',
    audience: 'dzieci',
    description:
      'Kolejna dawka wykreślanek na dobry start — znajome słowa i przejrzysty układ, który nie zniechęca. Świetna, żeby utrwalić czytanie tuż przed startem szkoły.',
    features: [
      '100 wykreślanek',
      'Utrwala naukę czytania',
      'Przejrzysty, czytelny układ',
      'Tematy bliskie dzieciom (zwierzęta, rodzina, kolory)',
    ],
    coverImage: '/covers/znajdz-slowko-6-7.png',
    amazonUrl: 'https://amzn.eu/d/07BBUa1X',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
  {
    slug: 'znajdz-slowko-poziom-sredni-7-9',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom średni',
    ageRange: '7–9 lat',
    category: 'wykreslanki',
    audience: 'dzieci',
    description:
      'Dłuższe i trudniejsze słowa dla dziecka, które już czyta płynnie i szuka prawdziwego wyzwania. Więcej liter do przeszukania, więcej satysfakcji, gdy słówko w końcu się znajdzie.',
    features: [
      '100 wykreślanek',
      'Dłuższe i trudniejsze słowa',
      'Rozwija koncentrację i spostrzegawczość',
      'Tematy bliskie dzieciom (zwierzęta, rodzina, kolory)',
    ],
    coverImage: '/covers/znajdz-slowko-7-9.png',
    amazonUrl: 'https://amzn.eu/d/0dJNgtH1',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
  {
    slug: 'znajdz-slowko-poziom-trudny-10',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom trudny',
    ageRange: '10+',
    category: 'wykreslanki',
    audience: 'dzieci',
    description:
      'Prawdziwe wyzwanie dla wprawnych czytelników — długie słowa, gęsta plansza i satysfakcja, która przychodzi dopiero po chwili skupienia. Dla dzieci, które lubią się mierzyć z trudniejszym zadaniem.',
    features: [
      '100 wykreślanek',
      'Długie, wymagające słowa',
      'Rozwija koncentrację i cierpliwość',
      'Tematy bliskie dzieciom (zwierzęta, rodzina, kolory)',
    ],
    coverImage: '/covers/znajdz-slowko-10.png',
    amazonUrl: 'https://amzn.eu/d/07eXC8JG',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getFeaturedBooks(): Book[] {
  return books.filter((book) => book.featured);
}
