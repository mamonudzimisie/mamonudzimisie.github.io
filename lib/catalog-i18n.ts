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
export type SiteLang = 'pl' | 'de';

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
    backToCatalog: string;
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
      backToCatalog: '← Wróć do katalogu',
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
      backToCatalog: '← Zurück zum Katalog',
      foreignLanguageNote: (langName) =>
        `Hinweis: Dieses Buch ist auf ${langName} — Rätsel und Anleitungen im Inneren sind nicht auf Deutsch.`,
    },
  },
};

// Sekcje, w których istnieją strony szczegółów książek. Każda książka ma
// stronę w obu sekcjach — interfejs nigdy nie „przeskakuje" na inny język niż
// ten, w którym użytkownik przegląda katalog. Za duplikaty w wyszukiwarce
// odpowiada canonicalSection() + noindex, patrz shouldIndexDetail().
const DETAIL_SECTIONS: SiteLang[] = ['pl', 'de'];
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
