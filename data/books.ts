export type BookCategory =
  | 'wykreslanki'
  | 'labirynty'
  | 'kolorowanki'
  | 'laczenie-kropek'
  | 'inne';

export type BookAudience = 'dzieci' | 'dorosli' | 'duzy-druk';

// Język, w którym napisana jest książka (treść zagadek, nie strona sklepu).
export type BookLang = 'pl' | 'de' | 'en';

export type Book = {
  slug: string; // np. "znajdz-slowko-poziom-latwy"
  title: string; // "Znajdź słówko!"
  subtitle: string; // "Poziom najłatwiejszy"
  ageRange: string; // "5–6 lat"
  category: BookCategory;
  audience: BookAudience;
  lang: BookLang; // język treści książki
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

// Kolejność języków w subtelnym filtrze katalogu.
export const BOOK_LANGS: BookLang[] = ['pl', 'de', 'en'];

export const LANG_LABELS: Record<BookLang, string> = {
  pl: 'PL',
  de: 'DE',
  en: 'EN',
};

export const AGE_GROUPS = [
  '3–4 lata',
  '5–6 lat',
  '6–7 lat',
  '7–9 lat',
  '10+',
  '13+',
  'Dorośli',
] as const;

export const books: Book[] = [
  {
    slug: 'znajdz-slowko-poziom-latwy',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom najłatwiejszy',
    ageRange: '5–6 lat',
    category: 'wykreslanki',
    audience: 'dzieci',
    lang: 'pl',
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
    lang: 'pl',
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
    lang: 'pl',
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
    lang: 'pl',
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
  {
    slug: 'znajdz-slowko-poziom-ekspert-13',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom ekspert',
    ageRange: '13+',
    category: 'wykreslanki',
    audience: 'dzieci',
    lang: 'pl',
    description:
      'Najtrudniejszy poziom w serii — gęste plansze, długie słowa i zadania, przy których trzeba się naprawdę skupić. Dla nastolatków i wszystkich, którzy szukają wykreślanki stawiającej prawdziwy opór.',
    features: [
      '100 wykreślanek',
      'Najwyższy poziom trudności w serii',
      'Gęste plansze i długie słowa',
      'Trening koncentracji i cierpliwości',
    ],
    coverImage: '/covers/znajdz-slowko-13.png',
    amazonUrl: 'https://amzn.eu/d/07es8Itl',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
  {
    slug: 'zdobywca-szczytow',
    title: 'Zdobywca Szczytów',
    subtitle: '75 wykreślanek z nazwami szczytów odznak turystycznych Polski i okolic',
    ageRange: 'Dorośli',
    category: 'wykreslanki',
    audience: 'dorosli',
    lang: 'pl',
    description:
      'Korona Gór Polski, Diadem Polskich Gór, Korona Beskidu Żywieckiego, Korona Gór Stołowych — w Polsce nie brakuje górskich wyzwań. A co, gdyby tym razem zdobywać szczyty z ołówkiem w dłoni? To 75 wykreślanek pełnych nazw szczytów związanych z polskimi odznakami turystycznymi, a w każdej czeka nowy zestaw nazw do odnalezienia. Dla tych, którzy kochają góry, zdobywają odznaki i planują kolejne wyprawy — i świetny prezent dla każdego miłośnika gór.',
    features: [
      '75 wykreślanek z nazwami szczytów górskich odznak',
      'Ponad 1500 nazw do znalezienia',
      'Rozwiązania na końcu książki',
      'Dla miłośników gór i zdobywców odznak turystycznych',
    ],
    coverImage: '/covers/zdobywca-szczytow.png',
    amazonUrl: 'https://amzn.eu/d/03CTNBDE',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 100,
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

// Sekcja „Wyróżnione książki” na stronie głównej mieści dwa rzędy po trzy kafelki.
export const FEATURED_LIMIT = 6;

export function getFeaturedBooks(): Book[] {
  return books.filter((book) => book.featured).slice(0, FEATURED_LIMIT);
}
