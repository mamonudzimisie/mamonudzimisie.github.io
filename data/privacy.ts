// Polityka prywatności w trzech językach. Opisuje to, co strona NAPRAWDĘ robi —
// zmieniając analitykę, hosting albo baner zgody (public/consent.js), popraw też ten plik.
// W tekście `{email}` zamienia się w link mailto do adresu kontaktowego danej wersji.
//
// Celowo bez imienia, nazwiska i adresu: Kate prowadzi Zalka Books jako osoba prywatna
// i nie chce ich publikować (decyzja 2026-11-14). Dlatego nie ma też strony „Impressum”.

export type PrivacyLang = 'pl' | 'de' | 'en';

export type PrivacySection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type PrivacyPolicy = {
  lang: PrivacyLang;
  slug: string;
  title: string;
  description: string;
  updatedLabel: string;
  updated: string;
  email: string;
  intro: string;
  sections: PrivacySection[];
};

export const PRIVACY_UPDATED = '2026-11-14';

const pl: PrivacyPolicy = {
  lang: 'pl',
  slug: 'prywatnosc',
  title: 'Polityka prywatności',
  description:
    'Jakie dane zbiera strona zalkabooks.com, po co, jak długo je przechowujemy i jak wycofać zgodę na ciasteczka.',
  updatedLabel: 'Ostatnia aktualizacja',
  updated: '14 listopada 2026',
  email: 'kontakt@zalkabooks.com',
  intro:
    'Ta strona wyjaśnia, jakie dane przetwarzamy, gdy odwiedzasz zalkabooks.com i nasze podstrony (puzzles.zalkabooks.com, znajdzslowko.zalkabooks.com, learnspanish.zalkabooks.com). Nie mamy kont użytkowników, formularzy ani sklepu, a książki kupujesz bezpośrednio na Amazonie.',
  sections: [
    {
      heading: 'Kto odpowiada za Twoje dane',
      paragraphs: [
        'Administratorem danych jest Zalka Books. We wszystkich sprawach dotyczących prywatności napisz na {email}.',
      ],
    },
    {
      heading: 'Hosting',
      paragraphs: [
        'Strona jest udostępniana przez GitHub Pages (GitHub, Inc., USA). Przy każdym wejściu serwer automatycznie zapisuje dane techniczne, takie jak adres IP, data i godzina, adres podstrony oraz typ przeglądarki. GitHub wykorzystuje je do działania i ochrony usługi. Podstawą prawną jest nasz prawnie uzasadniony interes, czyli bezpieczne i sprawne udostępnianie strony (art. 6 ust. 1 lit. f RODO).',
      ],
    },
    {
      heading: 'Statystyki bez ciasteczek: Cloudflare Web Analytics',
      paragraphs: [
        'Liczymy odwiedziny narzędziem Cloudflare Web Analytics (Cloudflare, Inc., USA). Nie zapisuje ono ciasteczek ani nie rozpoznaje Cię między wizytami. Dostajemy tylko zbiorcze liczby, np. ile osób otworzyło daną podstronę i z jakiego kraju. Podstawa prawna: art. 6 ust. 1 lit. f RODO.',
      ],
    },
    {
      heading: 'Statystyki po Twojej zgodzie: Google Analytics i Statcounter',
      paragraphs: [
        'Jeśli w okienku o ciasteczkach klikniesz „Akceptuję”, wczytamy Google Analytics 4 (Google Ireland Ltd., Irlandia) i na zalkabooks.com także Statcounter (StatCounter Ltd., Irlandia). Pomagają nam zrozumieć, które strony i książki Cię interesują. Zapisują ciasteczka analityczne (np. _ga, _ga_*, sc_is_visitor_unique) i przetwarzają m.in. skrócony adres IP, odwiedzone podstrony, przybliżoną lokalizację i rodzaj urządzenia. Nie używamy ich do reklam ani do profilowania.',
        'Bez zgody te narzędzia w ogóle się nie wczytują. Podstawą prawną jest Twoja zgoda (art. 6 ust. 1 lit. a RODO). Możesz ją w każdej chwili wycofać przez link „Ustawienia cookies” w stopce strony. Wycofanie zgody nie wpływa na zgodność z prawem tego, co działo się wcześniej.',
        'Google może przetwarzać dane także w USA. Przekazanie odbywa się na podstawie EU-US Data Privacy Framework lub standardowych klauzul umownych Komisji Europejskiej. Dane w Google Analytics przechowujemy nie dłużej niż 14 miesięcy.',
      ],
    },
    {
      heading: 'Ciasteczka',
      paragraphs: ['Strona używa ciasteczek tylko w tym zakresie:'],
      list: [
        'zb_consent: zapamiętuje, czy zgodziłeś(-aś) się na statystyki. Jest niezbędne, żeby okienko nie pojawiało się przy każdym wejściu. Obowiązuje na wszystkich podstronach zalkabooks.com przez 180 dni.',
        'Ciasteczka Google Analytics i Statcountera: tylko po Twojej zgodzie, opisane wyżej.',
      ],
    },
    {
      heading: 'Czcionki, pliki do pobrania i linki',
      paragraphs: [
        'Czcionki leżą na naszym serwerze, więc ich wczytanie nie łączy Cię z Google Fonts. Darmowe pliki PDF pobierasz bez podawania jakichkolwiek danych.',
        'Strona linkuje do Amazona, Pinteresta i Instagrama, ale nie osadza ich skryptów ani pikseli. Gdy klikniesz taki link, przechodzisz do innego serwisu, który przetwarza dane według własnej polityki prywatności.',
      ],
    },
    {
      heading: 'E-mail',
      paragraphs: [
        'Jeśli do nas napiszesz, użyjemy Twojego adresu i treści wiadomości tylko po to, żeby odpowiedzieć. Korespondencję usuwamy, gdy sprawa jest zamknięta i nie jest już potrzebna (art. 6 ust. 1 lit. f RODO).',
      ],
    },
    {
      heading: 'Twoje prawa',
      paragraphs: [
        'Masz prawo do dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i przeniesienia, a także prawo sprzeciwu i wycofania zgody. Wystarczy napisać na {email}.',
        'Możesz też złożyć skargę do organu nadzorczego. W Polsce jest to Prezes Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl).',
        'Nie podejmujemy wobec Ciebie zautomatyzowanych decyzji ani nie profilujemy Cię.',
      ],
    },
  ],
};

const de: PrivacyPolicy = {
  lang: 'de',
  slug: 'datenschutz',
  title: 'Datenschutzerklärung',
  description:
    'Welche Daten zalkabooks.com verarbeitet, wozu, wie lange und wie Sie Ihre Cookie-Einwilligung widerrufen.',
  updatedLabel: 'Stand',
  updated: '14. November 2026',
  email: 'contact@zalkabooks.com',
  intro:
    'Diese Seite erklärt, welche Daten wir verarbeiten, wenn Sie zalkabooks.com und unsere Unterseiten (puzzles.zalkabooks.com, znajdzslowko.zalkabooks.com, learnspanish.zalkabooks.com) besuchen. Es gibt keine Benutzerkonten, keine Formulare und keinen Shop. Unsere Bücher kaufen Sie direkt bei Amazon.',
  sections: [
    {
      heading: 'Verantwortlicher',
      paragraphs: [
        'Verantwortlich für die Datenverarbeitung ist Zalka Books. Bei allen Fragen zum Datenschutz schreiben Sie uns an {email}.',
      ],
    },
    {
      heading: 'Hosting',
      paragraphs: [
        'Die Website wird über GitHub Pages (GitHub, Inc., USA) bereitgestellt. Bei jedem Aufruf speichert der Server automatisch technische Daten wie IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite und den Browsertyp. GitHub nutzt sie für den Betrieb und die Sicherheit des Dienstes. Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und funktionierenden Website (Art. 6 Abs. 1 lit. f DSGVO).',
      ],
    },
    {
      heading: 'Statistik ohne Cookies: Cloudflare Web Analytics',
      paragraphs: [
        'Wir zählen Besuche mit Cloudflare Web Analytics (Cloudflare, Inc., USA). Das Tool setzt keine Cookies und erkennt Sie nicht über mehrere Besuche hinweg wieder. Wir sehen nur zusammengefasste Zahlen, etwa wie viele Personen eine Seite aufgerufen haben und aus welchem Land. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
      ],
    },
    {
      heading: 'Statistik mit Ihrer Einwilligung: Google Analytics und Statcounter',
      paragraphs: [
        'Wenn Sie im Cookie-Hinweis auf „Akzeptieren“ klicken, laden wir Google Analytics 4 (Google Ireland Ltd., Irland) und auf zalkabooks.com zusätzlich Statcounter (StatCounter Ltd., Irland). Damit sehen wir, welche Seiten und Bücher Sie interessieren. Dabei werden Analyse-Cookies gesetzt (z. B. _ga, _ga_*, sc_is_visitor_unique) und unter anderem eine gekürzte IP-Adresse, die aufgerufenen Seiten, der ungefähre Standort und der Gerätetyp verarbeitet. Wir nutzen diese Daten weder für Werbung noch für Profiling.',
        'Ohne Einwilligung werden diese Dienste gar nicht geladen. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie können sie jederzeit über den Link „Cookie-Einstellungen“ im Seitenfuß widerrufen. Der Widerruf berührt nicht die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung.',
        'Google kann Daten auch in den USA verarbeiten. Die Übermittlung erfolgt auf Grundlage des EU-US Data Privacy Framework oder der Standardvertragsklauseln der EU-Kommission. Daten in Google Analytics speichern wir höchstens 14 Monate.',
      ],
    },
    {
      heading: 'Cookies',
      paragraphs: ['Die Website verwendet Cookies nur in diesem Umfang:'],
      list: [
        'zb_consent: speichert, ob Sie der Statistik zugestimmt haben. Das Cookie ist technisch notwendig, damit der Hinweis nicht bei jedem Besuch erscheint. Es gilt für alle Seiten unter zalkabooks.com und läuft nach 180 Tagen ab.',
        'Cookies von Google Analytics und Statcounter: nur mit Ihrer Einwilligung, wie oben beschrieben.',
      ],
    },
    {
      heading: 'Schriftarten, Downloads und Links',
      paragraphs: [
        'Die Schriftarten liegen auf unserem eigenen Server. Beim Laden entsteht also keine Verbindung zu Google Fonts. Kostenlose PDF-Dateien laden Sie herunter, ohne irgendwelche Daten anzugeben.',
        'Die Website verlinkt auf Amazon, Pinterest und Instagram, bindet aber keine Skripte oder Pixel dieser Dienste ein. Wenn Sie einen solchen Link anklicken, wechseln Sie zu einem anderen Anbieter, der Daten nach seiner eigenen Datenschutzerklärung verarbeitet.',
      ],
    },
    {
      heading: 'E-Mail',
      paragraphs: [
        'Wenn Sie uns schreiben, verwenden wir Ihre Adresse und Ihre Nachricht nur, um Ihnen zu antworten. Die Korrespondenz löschen wir, sobald die Anfrage erledigt ist und sie nicht mehr benötigt wird (Art. 6 Abs. 1 lit. f DSGVO).',
      ],
    },
    {
      heading: 'Ihre Rechte',
      paragraphs: [
        'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit, das Recht auf Widerspruch sowie das Recht, eine Einwilligung zu widerrufen. Schreiben Sie dazu einfach an {email}.',
        'Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, etwa bei der Behörde Ihres Wohnorts.',
        'Eine automatisierte Entscheidungsfindung oder ein Profiling findet nicht statt.',
      ],
    },
  ],
};

const en: PrivacyPolicy = {
  lang: 'en',
  slug: 'privacy',
  title: 'Privacy policy',
  description:
    'What data zalkabooks.com processes, why, for how long, and how to withdraw your cookie consent.',
  updatedLabel: 'Last updated',
  updated: 'November 14, 2026',
  email: 'contact@zalkabooks.com',
  intro:
    'This page explains what data we process when you visit zalkabooks.com and our sub-sites (puzzles.zalkabooks.com, znajdzslowko.zalkabooks.com, learnspanish.zalkabooks.com). There are no user accounts, forms or shop. You buy our books directly on Amazon.',
  sections: [
    {
      heading: 'Who is responsible',
      paragraphs: [
        'The controller of your data is Zalka Books. For any privacy question, write to {email}.',
      ],
    },
    {
      heading: 'Hosting',
      paragraphs: [
        'The site is served by GitHub Pages (GitHub, Inc., USA). On every visit the server automatically logs technical data such as your IP address, date and time, the page requested and your browser type. GitHub uses it to run and protect the service. The legal basis is our legitimate interest in a secure, working website (Art. 6(1)(f) GDPR).',
      ],
    },
    {
      heading: 'Cookie-free statistics: Cloudflare Web Analytics',
      paragraphs: [
        'We count visits with Cloudflare Web Analytics (Cloudflare, Inc., USA). It sets no cookies and does not recognise you between visits. We only see aggregate numbers, such as how many people opened a page and from which country. Legal basis: Art. 6(1)(f) GDPR.',
      ],
    },
    {
      heading: 'Statistics with your consent: Google Analytics and Statcounter',
      paragraphs: [
        'If you click “Accept” in the cookie notice, we load Google Analytics 4 (Google Ireland Ltd., Ireland) and, on zalkabooks.com, Statcounter (StatCounter Ltd., Ireland). They help us see which pages and books you find useful. They set analytics cookies (e.g. _ga, _ga_*, sc_is_visitor_unique) and process, among other things, a shortened IP address, the pages you visit, your approximate location and device type. We do not use them for advertising or profiling.',
        'Without your consent these tools are not loaded at all. The legal basis is your consent (Art. 6(1)(a) GDPR). You can withdraw it at any time via the “Cookie settings” link in the footer. Withdrawal does not affect anything processed before it.',
        'Google may also process data in the USA. Such transfers rely on the EU-US Data Privacy Framework or the European Commission’s standard contractual clauses. We keep Google Analytics data for no longer than 14 months.',
      ],
    },
    {
      heading: 'Cookies',
      paragraphs: ['The site uses cookies only as follows:'],
      list: [
        'zb_consent: remembers whether you agreed to statistics. It is strictly necessary so the notice doesn’t appear on every visit. It applies to all of zalkabooks.com and expires after 180 days.',
        'Google Analytics and Statcounter cookies: only with your consent, as described above.',
      ],
    },
    {
      heading: 'Fonts, downloads and links',
      paragraphs: [
        'Our fonts are hosted on our own server, so loading them doesn’t connect you to Google Fonts. You can download the free PDFs without giving us any data.',
        'The site links to Amazon, Pinterest and Instagram but does not embed their scripts or pixels. When you follow such a link, you move to another service, which processes data under its own privacy policy.',
      ],
    },
    {
      heading: 'Email',
      paragraphs: [
        'If you write to us, we use your address and message only to reply. We delete the correspondence once the matter is closed and it is no longer needed (Art. 6(1)(f) GDPR).',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'You have the right to access, rectify, erase, restrict and port your data, to object, and to withdraw consent. Just write to {email}.',
        'You may also lodge a complaint with a data protection supervisory authority, for example the one where you live.',
        'We make no automated decisions about you and do no profiling.',
      ],
    },
  ],
};

export const privacyPolicies: Record<PrivacyLang, PrivacyPolicy> = { pl, de, en };

export function privacyHref(lang: PrivacyLang): string {
  return `/${lang}/${privacyPolicies[lang].slug}`;
}
