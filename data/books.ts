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

export const AGE_GROUPS = ['3–4 lata', '5–6 lat', '6–7 lat', '7–9 lat', '10+', '13+'] as const;

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
    coverImage: '/covers/znajdz-slowko-5-6.png',
    amazonUrl: 'https://amzn.eu/d/0coMqTkj',
    featured: true,
  },
  {
    slug: 'znajdz-slowko-poziom-latwy-6-7',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom łatwy',
    ageRange: '6–7 lat',
    category: 'wykreslanki',
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
  },
  {
    slug: 'znajdz-slowko-poziom-sredni-7-9',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom średni',
    ageRange: '7–9 lat',
    category: 'wykreslanki',
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
  },
  {
    slug: 'znajdz-slowko-poziom-trudny-10',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom trudny',
    ageRange: '10+',
    category: 'wykreslanki',
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
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getFeaturedBooks(): Book[] {
  return books.filter((book) => book.featured);
}
