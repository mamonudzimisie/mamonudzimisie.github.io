export type BookCategory =
  | 'wykreslanki'
  | 'labirynty'
  | 'kolorowanki'
  | 'laczenie-kropek'
  | 'inne';

export type Book = {
  slug: string; // np. "znajdz-slowko-poziom-latwy"
  title: string; // "Znajdź słówko!"
  subtitle: string; // "Poziom najłatwiejszy"
  ageRange: string; // "5–6 lat"
  category: BookCategory;
  description: string;
  features: string[]; // np. ["100 wykreślanek", "Duża czcionka", ...]
  coverImage: string; // ścieżka w /public/covers/
  amazonUrl: string;
  featured: boolean;
  comingSoon?: boolean;
};

// Kategorie do filtrowania w katalogu — etykiety po polsku.
export const CATEGORY_LABELS: Record<BookCategory, string> = {
  wykreslanki: 'Wykreślanki',
  labirynty: 'Labirynty',
  kolorowanki: 'Kolorowanki',
  'laczenie-kropek': 'Łączenie kropek',
  inne: 'Inne',
};

export const AGE_GROUPS = ['3–4 lata', '5–6 lat', '7+'] as const;

export const books: Book[] = [
  {
    slug: 'znajdz-slowko-poziom-latwy',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom najłatwiejszy',
    ageRange: '5–6 lat',
    category: 'wykreslanki',
    description:
      'Pierwsza wykreślanka, która nie zniechęca. Duże litery, znajome słowa i tyle satysfakcji, ile potrzeba, żeby dziecko samo poprosiło o kolejną stronę. Świetny sposób, żeby oswoić literki, zanim zacznie się prawdziwa nauka czytania.',
    features: [
      '100 wykreślanek',
      'Nauka czytania przez zabawę',
      'Duże litery',
      'Tematy bliskie dzieciom (zwierzęta, rodzina, kolory)',
    ],
    // TODO: podmień na finalną okładkę — patrz README, sekcja "Jak podmienić okładkę"
    coverImage: '/covers/znajdz-slowko-poziom-latwy.jpg',
    // TODO: wstaw prawdziwy link do produktu na Amazon, gdy książka będzie opublikowana
    amazonUrl: 'https://www.amazon.pl/dp/XXXXXXXXXX',
    featured: true,
  },
  {
    slug: 'labirynt-dla-odkrywcow',
    title: 'Labirynt dla odkrywców',
    subtitle: 'Podróż przez krainę wyobraźni',
    ageRange: '5–6 lat',
    category: 'labirynty',
    description:
      'Labirynty, które rosną razem z dzieckiem — od prostych ścieżek po prawdziwe łamigłówki wymagające skupienia. Idealne na dłuższą chwilę ciszy przy stole.',
    features: [
      '60 labiryntów o rosnącej trudności',
      'Rozwija koncentrację i cierpliwość',
      'Kolorowe ilustracje do podpowiedzi',
    ],
    coverImage: '/covers/placeholder-coming-soon.jpg',
    amazonUrl: 'https://www.amazon.pl/dp/XXXXXXXXXX',
    featured: false,
    comingSoon: true,
  },
  {
    slug: 'kolorowanka-male-zwierzaki',
    title: 'Małe zwierzaki',
    subtitle: 'Kolorowanka dla najmłodszych',
    ageRange: '3–4 lata',
    category: 'kolorowanki',
    description:
      'Grube linie, proste kształty i sympatyczne zwierzaki — pierwsza kolorowanka, z którą poradzi sobie nawet trzylatek uzbrojony w kredkę i dobre chęci.',
    features: [
      'Proste, grube kontury',
      'Bezpieczne dla najmłodszych rączek',
      'Jedna ilustracja na stronę',
    ],
    coverImage: '/covers/placeholder-coming-soon.jpg',
    amazonUrl: 'https://www.amazon.pl/dp/XXXXXXXXXX',
    featured: false,
    comingSoon: true,
  },
  {
    slug: 'polacz-kropki-przygoda',
    title: 'Połącz kropki: Przygoda',
    subtitle: 'Od 1 do 100',
    ageRange: '7+',
    category: 'laczenie-kropek',
    description:
      'Łączenie kropek na poważnie — z liczeniem do stu i obrazkami, które warto odkryć do końca. Dla dzieci, które lubią wyzwania.',
    features: [
      'Liczenie do 100',
      'Ukryte obrazki do odkrycia',
      'Rozwija koordynację i logiczne myślenie',
    ],
    coverImage: '/covers/placeholder-coming-soon.jpg',
    amazonUrl: 'https://www.amazon.pl/dp/XXXXXXXXXX',
    featured: false,
    comingSoon: true,
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getFeaturedBooks(): Book[] {
  return books.filter((book) => book.featured);
}
