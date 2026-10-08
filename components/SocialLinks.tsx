import type { SiteLang } from '@/lib/catalog-i18n';

type IconProps = { className?: string };

function IconPinterest({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C24.021 5.367 18.624 0 12.017 0z" />
    </svg>
  );
}

function IconInstagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Nowy profil = nowy wpis tutaj; ikonka pojawi się w stopkach i na „O nas”.
export const SOCIALS = [
  {
    name: 'Pinterest',
    href: 'https://www.pinterest.com/ZalkaBooks/',
    handle: 'pinterest.com/ZalkaBooks',
    // polski miejscownik: „Obserwuj nas na …”
    namePl: 'Pintereście',
    Icon: IconPinterest,
    // kolor marki — tło ikonki po najechaniu (stopka) i kolor ikonki na „O nas”
    hover: 'hover:bg-[#E60023]',
    text: 'text-[#E60023]',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/zalkabooks_com/',
    handle: 'instagram.com/zalkabooks_com',
    namePl: 'Instagramie',
    Icon: IconInstagram,
    hover: 'hover:bg-[#E1306C]',
    text: 'text-[#E1306C]',
  },
];

const FOLLOW: Record<SiteLang, { heading: string; on: (name: string, namePl: string) => string }> = {
  pl: { heading: 'Obserwuj nas', on: (_name, namePl) => `Obserwuj nas na ${namePl}` },
  de: { heading: 'Folge uns', on: (name) => `Folge uns auf ${name}` },
  en: { heading: 'Follow us', on: (name) => `Follow us on ${name}` },
};

export default function SocialLinks({ lang = 'pl', className = '' }: { lang?: SiteLang; className?: string }) {
  const t = FOLLOW[lang];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-semibold text-ink/70">{t.heading}</span>
      <ul className="flex items-center gap-2">
        {SOCIALS.map(({ name, namePl, href, Icon, hover }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.on(name, namePl)}
              title={t.on(name, namePl)}
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white transition hover:-translate-y-0.5 ${hover}`}
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
