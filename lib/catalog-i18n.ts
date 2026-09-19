import {
  AGE_GROUPS,
  type Book,
  CATEGORY_LABELS,
  type BookAudience,
  type BookCategory,
  type BookLang,
} from '@/data/books';

// Języki, w których istnieje wersja strony (a więc i tłumaczenia interfejsu
// katalogu). Książki mogą być w szerszym zbiorze języków — patrz BOOK_LANGS.
export type SiteLang = 'pl' | 'de' | 'en';

type AgeGroup = (typeof AGE_GROUPS)[number];

export type CatalogStrings = {
  audienceHeading: string;
  all: string;
  age: string;
  category: string;
  bookLanguage: string;
  empty: string;
  ageLabels: Record<AgeGroup, string>;
  categoryLabels: Record<BookCategory, string>;
  audienceLabels: Record<BookAudience, string>;
  langNames: Record<BookLang, string>;
  card: {
    coverAlt: (title: string) => string;
    comingSoon: string;
    details: string;
    buy: string;
  };
  detail: {
    language: string;
    format: string;
    formatNote: string;
    volume: string;
    pages: (count: number) => string;
    binding: string;
    comingSoon: string;
    lookInside: string;
    samplePage: (n: number, total: number) => string;
    sampleClose: string;
    samplePrev: string;
    sampleNext: string;
    backToCatalog: string;
    forWhom: string;
    easierLevel: string;
    harderLevel: string;
    foreignLanguageNote: (langName: string) => string;
  };
};

export const CATALOG_STRINGS: Record<SiteLang, CatalogStrings> = {
  pl: {
    audienceHeading: 'Dla kogo:',
    all: 'Wszystkie',
    age: 'Wiek:',
    category: 'Kategoria:',
    bookLanguage: 'Język książek:',
    empty: 'Nie znaleźliśmy jeszcze książek w tej kategorii — zajrzyj tu niedługo!',
    ageLabels: {
      '3–4 lata': '3–4 lata',
      '5–6 lat': '5–6 lat',
      '6–7 lat': '6–7 lat',
      '7–9 lat': '7–9 lat',
      '10+': '10+',
      '13+': '13+',
      'Dorośli': 'Dorośli',
    },
    categoryLabels: CATEGORY_LABELS,
    audienceLabels: {
      dzieci: 'Dla dzieci',
      dorosli: 'Dla dorosłych',
      'duzy-druk': 'Duży druk',
    },
    langNames: {
      pl: 'polski',
      de: 'niemiecki',
      en: 'angielski',
    },
    card: {
      coverAlt: (title) => `Okładka książki ${title}`,
      comingSoon: 'Wkrótce',
      details: 'Zobacz szczegóły',
      buy: 'Kup na Amazon',
    },
    detail: {
      language: 'Język',
      format: 'Format',
      formatNote: 'zbliżony do A4',
      volume: 'Objętość',
      pages: (count) => `${count} stron`,
      binding: 'Miękka oprawa',
      comingSoon: 'Ta książka wkrótce się pojawi',
      lookInside: 'Zajrzyj do środka',
      samplePage: (n, total) => `Strona ${n} z ${total}`,
      sampleClose: 'Zamknij',
      samplePrev: 'Poprzednia strona',
      sampleNext: 'Następna strona',
      backToCatalog: '← Wróć do katalogu',
      forWhom: 'Dla kogo jest ta książka?',
      easierLevel: 'Łatwiejszy poziom',
      harderLevel: 'Trudniejszy poziom',
      foreignLanguageNote: (langName) =>
        `Uwaga: ta książka jest w języku ${langName} — zagadki i instrukcje w środku nie są po polsku.`,
    },
  },
  de: {
    audienceHeading: 'Für wen:',
    all: 'Alle',
    age: 'Alter:',
    category: 'Kategorie:',
    bookLanguage: 'Sprache der Bücher:',
    empty: 'In dieser Kategorie haben wir noch keine Bücher — schau bald wieder vorbei!',
    ageLabels: {
      '3–4 lata': '3–4 Jahre',
      '5–6 lat': '5–6 Jahre',
      '6–7 lat': '6–7 Jahre',
      '7–9 lat': '7–9 Jahre',
      '10+': '10+',
      '13+': '13+',
      'Dorośli': 'Erwachsene',
    },
    categoryLabels: {
      wykreslanki: 'Wortsuchrätsel',
      sudoku: 'Sudoku',
      labirynty: 'Labyrinthe',
      kolorowanki: 'Malbücher',
      'laczenie-kropek': 'Punkte verbinden',
      inne: 'Sonstige',
    },
    audienceLabels: {
      dzieci: 'Für Kinder',
      dorosli: 'Für Erwachsene',
      'duzy-druk': 'Großdruck',
    },
    langNames: {
      pl: 'Polnisch',
      de: 'Deutsch',
      en: 'Englisch',
    },
    card: {
      coverAlt: (title) => `Buchcover ${title}`,
      comingSoon: 'Bald',
      details: 'Details ansehen',
      buy: 'Bei Amazon kaufen',
    },
    detail: {
      language: 'Sprache',
      format: 'Format',
      formatNote: 'ähnlich A4',
      volume: 'Umfang',
      pages: (count) => `${count} Seiten`,
      binding: 'Softcover',
      comingSoon: 'Dieses Buch erscheint bald',
      lookInside: 'Blick ins Buch',
      samplePage: (n, total) => `Seite ${n} von ${total}`,
      sampleClose: 'Schließen',
      samplePrev: 'Vorherige Seite',
      sampleNext: 'Nächste Seite',
      backToCatalog: '← Zurück zum Katalog',
      forWhom: 'Für wen ist dieses Buch?',
      easierLevel: 'Leichtere Stufe',
      harderLevel: 'Schwierigere Stufe',
      foreignLanguageNote: (langName) =>
        `Hinweis: Dieses Buch ist auf ${langName} — Rätsel und Anleitungen im Inneren sind nicht auf Deutsch.`,
    },
  },
  en: {
    audienceHeading: 'For whom:',
    all: 'All',
    age: 'Age:',
    category: 'Category:',
    bookLanguage: 'Book language:',
    empty: "We don't have any books in this category yet — check back soon!",
    ageLabels: {
      '3–4 lata': '3–4 years',
      '5–6 lat': '5–6 years',
      '6–7 lat': '6–7 years',
      '7–9 lat': '7–9 years',
      '10+': '10+',
      '13+': '13+',
      'Dorośli': 'Adults',
    },
    categoryLabels: {
      wykreslanki: 'Word search',
      sudoku: 'Sudoku',
      labirynty: 'Mazes',
      kolorowanki: 'Colouring books',
      'laczenie-kropek': 'Dot to dot',
      inne: 'Other',
    },
    audienceLabels: {
      dzieci: 'For kids',
      dorosli: 'For adults',
      'duzy-druk': 'Large print',
    },
    langNames: {
      pl: 'Polish',
      de: 'German',
      en: 'English',
    },
    card: {
      coverAlt: (title) => `Book cover: ${title}`,
      comingSoon: 'Soon',
      details: 'See details',
      buy: 'Buy on Amazon',
    },
    detail: {
      language: 'Language',
      format: 'Format',
      formatNote: 'US Letter, close to A4',
      volume: 'Length',
      pages: (count) => `${count} pages`,
      binding: 'Paperback',
      comingSoon: 'This book is coming soon',
      lookInside: 'Look inside',
      samplePage: (n, total) => `Page ${n} of ${total}`,
      sampleClose: 'Close',
      samplePrev: 'Previous page',
      sampleNext: 'Next page',
      backToCatalog: '← Back to all books',
      forWhom: 'Who is this book for?',
      easierLevel: 'Easier level',
      harderLevel: 'Harder level',
      foreignLanguageNote: (langName) =>
        `Note: this book is in ${langName} — the puzzles and instructions inside are not in English.`,
    },
  },
};

// Sekcje, w których istnieją strony szczegółów książek. Każda książka ma
// stronę w obu sekcjach — interfejs nigdy nie „przeskakuje" na inny język niż
// ten, w którym użytkownik przegląda katalog. Za duplikaty w wyszukiwarce
// odpowiada canonicalSection() + noindex, patrz shouldIndexDetail().
const DETAIL_SECTIONS: SiteLang[] = ['pl', 'de', 'en'];
const FALLBACK_SECTION: SiteLang = 'pl';

// Link ze strony w danej sekcji prowadzi do szczegółów w tej samej sekcji.
export function bookHref(book: Book, siteLang: SiteLang): string {
  const section = DETAIL_SECTIONS.includes(siteLang) ? siteLang : FALLBACK_SECTION;
  return `/${section}/books/${book.slug}`;
}

// Wersja, którą chcemy widzieć w indeksie Google: ta zgodna z językiem samej
// książki. Polski tytuł jest kanoniczny na /pl, niemiecki na /de.
export function canonicalSection(book: Book): SiteLang {
  return DETAIL_SECTIONS.includes(book.lang as SiteLang)
    ? (book.lang as SiteLang)
    : FALLBACK_SECTION;
}

export function canonicalBookHref(book: Book): string {
  return `/${canonicalSection(book)}/books/${book.slug}`;
}

// Pozostałe sekcje istnieją dla użytkownika, ale nie dla robota — inaczej ten
// sam opis konkurowałby sam ze sobą pod dwoma adresami.
export function shouldIndexDetail(book: Book, siteLang: SiteLang): boolean {
  return canonicalSection(book) === siteLang;
}
