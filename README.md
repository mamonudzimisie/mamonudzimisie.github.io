# Mamo, nudzi mi się!

Strona internetowa marki „Mamo, nudzi mi się!” — promuje serię książeczek
aktywnościowych dla dzieci (wykreślanki, labirynty, kolorowanki) i linkuje do
nich na Amazon.

Ten README jest napisany z myślą o osobie **bez doświadczenia technicznego** —
krok po kroku, bez skrótów myślowych.

## Spis treści

1. [Jak dodać nową książkę](#1-jak-dodać-nową-książkę)
2. [Jak podmienić okładkę](#2-jak-podmienić-okładkę)
3. [Jak włączyć GitHub Pages](#3-jak-włączyć-github-pages)
4. [Jak podpiąć własną domenę](#4-jak-podpiąć-własną-domenę)
5. [Gdzie zmienić teksty na stronie](#5-gdzie-zmienić-teksty-na-stronie)
6. [Jak uruchomić stronę na własnym komputerze](#6-jak-uruchomić-stronę-na-własnym-komputerze)

---

## 1. Jak dodać nową książkę

Wszystkie książki znajdują się w jednym pliku: **`data/books.ts`**.

Żeby dodać nową książkę:

1. Otwórz plik `data/books.ts`.
2. Skopiuj jeden z istniejących obiektów w tablicy `books` (blok w klamrach `{ ... }`).
3. Wklej go na końcu tablicy (przed zamykającym `];`).
4. Zmień wartości pól:

   - `slug` — unikalny adres w URL, tylko małe litery, myślniki zamiast spacji i
     bez polskich znaków, np. `"wykreslanki-zwierzeta"`.
   - `title` — tytuł widoczny na stronie, np. `"Zwierzątka z lasu"`.
   - `subtitle` — podtytuł, np. `"Wykreślanki tematyczne"`.
   - `ageRange` — jedna z wartości: `"3–4 lata"`, `"5–6 lat"` lub `"7+"`.
   - `category` — jedna z wartości: `"wykreslanki"`, `"labirynty"`,
     `"kolorowanki"`, `"laczenie-kropek"` lub `"inne"`.
   - `description` — dłuższy opis, 2–4 zdania.
   - `features` — lista cech w formie `["cecha 1", "cecha 2", ...]`.
   - `coverImage` — ścieżka do pliku okładki, np. `"/covers/wykreslanki-zwierzeta.jpg"`
     (jak wgrać sam plik — patrz punkt 2 poniżej).
   - `amazonUrl` — link do produktu na Amazon.
   - `featured` — wpisz `true`, jeśli książka ma się pojawić w sekcji
     „Wyróżnione książki” na stronie głównej, w przeciwnym razie `false`.
   - `comingSoon` — dodaj `comingSoon: true`, jeśli książka jeszcze nie jest
     dostępna (pokaże się plakietka „Wkrótce” i nie będzie linku do Amazona).
     Jeśli książka jest już dostępna, po prostu pomiń to pole.

5. Zapisz plik.

**To wszystko.** Nie trzeba nic zmieniać w żadnym innym pliku — nowa książka
sama pojawi się w katalogu `/ksiazki`, dostanie własną podstronę
(`/ksiazki/twoj-slug`) i (jeśli `featured: true`) trafi na stronę główną.

Po zapisaniu zmian trzeba je jeszcze **wysłać do GitHuba** (patrz punkt 6, jeśli
nie wiesz jak), a strona sama się przebuduje i zaktualizuje w ciągu kilku minut.

## 2. Jak podmienić okładkę

Wszystkie okładki trzymane są w folderze **`public/covers/`**.

1. Przygotuj plik graficzny okładki (najlepiej `.jpg`, w miarę możliwości
   proporcje pionowe, np. 600×800 pikseli).
2. Nazwij go tak samo jak w polu `coverImage` książki, np.
   `wykreslanki-zwierzeta.jpg`.
3. Wgraj plik do folderu `public/covers/` w repozytorium (przez przeglądarkę:
   wejdź do folderu na GitHubie → „Add file” → „Upload files”).
4. Upewnij się, że w `data/books.ts` pole `coverImage` wskazuje dokładnie na
   ten plik, np. `"/covers/wykreslanki-zwierzeta.jpg"`.

Obecnie w projekcie są dwa pliki tymczasowe (placeholdery):
`public/covers/znajdz-slowko-poziom-latwy.jpg` oraz
`public/covers/placeholder-coming-soon.jpg` — podmień je na docelowe okładki,
gdy tylko będą gotowe.

## 3. Jak włączyć GitHub Pages

1. Wejdź w ustawienia repozytorium na GitHubie: zakładka **Settings**.
2. W menu po lewej stronie znajdź **Pages**.
3. W sekcji „Build and deployment” → „Source” wybierz **GitHub Actions**
   (nie „Deploy from a branch”).
4. To wszystko — od teraz każdy `push` na branch `main` automatycznie zbuduje
   stronę i opublikuje ją (dzięki plikowi
   `.github/workflows/deploy.yml`, który już jest w repozytorium).
5. Postęp publikacji możesz podejrzeć w zakładce **Actions** w repozytorium.

## 4. Jak podpiąć własną domenę

Domena docelowa to **mamonudzimisie.com**. W repozytorium już jest plik
`public/CNAME` z jej nazwą — dzięki temu domena przetrwa każdy kolejny deploy.

Trzeba jeszcze skonfigurować DNS u rejestratora domeny (czyli firmy, u której
kupiono `mamonudzimisie.com`):

1. Zaloguj się w panelu rejestratora domeny.
2. Znajdź sekcję zarządzania rekordami DNS (czasem nazywaną „DNS management”
   lub „Zarządzanie DNS”).
3. Dla domeny głównej (`mamonudzimisie.com`) dodaj **4 rekordy A** wskazujące
   na adresy IP GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. Dla `www` (czyli `www.mamonudzimisie.com`) dodaj **rekord CNAME** wskazujący
   na `<nazwa-użytkownika-lub-organizacji>.github.io`.
5. W ustawieniach repozytorium (**Settings → Pages**) w polu „Custom domain”
   wpisz `mamonudzimisie.com` i zapisz.
6. Propagacja DNS może potrwać od kilku minut do 24 godzin. GitHub sam
   spróbuje wystawić certyfikat SSL (HTTPS) — poczekaj, aż w ustawieniach
   Pages pojawi się zielony znaczek przy „Enforce HTTPS”.

## 5. Gdzie zmienić teksty na stronie

- **Strona główna** (nagłówek, sekcja „dlaczego”, itd.) — plik `app/page.tsx`.
- **Strona „O nas”** — plik `app/o-nas/page.tsx`.
- **Stopka** (w tym informacja o programie partnerskim Amazon) — plik
  `components/Footer.tsx`.
- **Menu górne** — plik `components/Header.tsx`.
- **Blog** — lista artykułów w `app/blog/page.tsx`, treść pojedynczego
  artykułu w folderach `app/blog/nazwa-artykulu/page.tsx`.
- **Tytuły stron i opisy SEO** (to, co widać w Google) — na górze każdego
  pliku strony, w obiekcie `export const metadata = { ... }`.

Wystarczy zmienić tekst w cudzysłowie, zapisać plik i wysłać zmiany do
GitHuba — strona sama się zaktualizuje.

## 6. Jak uruchomić stronę na własnym komputerze

Potrzebna jest zainstalowana wcześniej aplikacja **Node.js**
(https://nodejs.org, wersja LTS).

W terminalu, w folderze projektu:

```bash
npm install       # jednorazowo, instaluje potrzebne biblioteki
npm run dev       # uruchamia stronę lokalnie pod adresem http://localhost:3000
```

Żeby zbudować finalną, statyczną wersję strony (tak jak robi to GitHub
Actions):

```bash
npm run build     # tworzy folder `out/` z gotowymi plikami HTML/CSS/JS
```

---

## Informacje techniczne (dla programisty przejmującego projekt)

- Next.js 14 (App Router) + TypeScript + Tailwind CSS.
- `next.config.js` ma ustawione `output: 'export'` — strona jest w pełni
  statyczna, bez API routes, bez Server Actions, bez route handlerów.
  `next/image` używany jest wyłącznie z `unoptimized`.
- Dane książek: `data/books.ts` (pojedyncze źródło prawdy, typ `Book`).
- Filtrowanie w `/ksiazki` jest w pełni client-side (`components/BookCatalog.tsx`),
  dane trafiają tam jako propsy z `data/books.ts`.
- Strony książek generowane statycznie przez `generateStaticParams` w
  `app/ksiazki/[slug]/page.tsx`, wraz z danymi strukturalnymi schema.org
  (`Product`) w JSON-LD.
- `app/sitemap.ts` i `app/robots.ts` generują `sitemap.xml` i `robots.txt`
  statycznie w czasie builda.
- Deploy: `.github/workflows/deploy.yml` — build (`npm run build`) i
  publikacja folderu `out/` na GitHub Pages przez `actions/configure-pages`,
  `actions/upload-pages-artifact`, `actions/deploy-pages`.
