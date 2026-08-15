import Link from 'next/link';
import type { BookAudience } from '@/data/books';

function IconKid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 6.2c.3-2 2-3 3.4-2" />
      <circle cx="12" cy="13" r="6.5" />
      <path d="M9.6 12.3h.01M14.4 12.3h.01" strokeWidth="2.4" />
      <path d="M9 15.6c1.2 1.2 4.8 1.2 6 0" />
    </svg>
  );
}

function IconAdult({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1.5 5.6A3 3 0 007 17a3 3 0 003 3V4z" />
      <path d="M15 4a3 3 0 013 3 3 3 0 011.5 5.6A3 3 0 0117 17a3 3 0 01-3 3V4z" />
    </svg>
  );
}

function IconLargePrint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.35-4.35" />
      <path d="M8 12.5l2.5-5 2.5 5M8.9 10.7h3.2" />
    </svg>
  );
}

const groups: {
  audience: BookAudience;
  label: string;
  description: string;
  Icon: (props: { className?: string }) => JSX.Element;
  color: string;
}[] = [
  {
    audience: 'dzieci',
    label: 'Für Kinder',
    description: 'Rätsel altersgerecht für Kinder ausgewählt.',
    Icon: IconKid,
    color: 'bg-green-light text-green',
  },
  {
    audience: 'dorosli',
    label: 'Für Erwachsene',
    description: 'Rätsel und Aufgaben zum Entspannen — eine Pause vom Bildschirm.',
    Icon: IconAdult,
    color: 'bg-orange-light text-orange',
  },
  {
    audience: 'duzy-druk',
    label: 'Großdruck',
    description: 'Angenehme, gut lesbare Schrift — schont die Augen.',
    Icon: IconLargePrint,
    color: 'bg-navy-light text-navy',
  },
];

export default function AudienceLinksDe() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {groups.map((group) => (
        <Link
          key={group.audience}
          href={`/de/books?gruppe=${encodeURIComponent(group.audience)}`}
          className="group flex flex-col items-center rounded-2xl border border-ink/10 bg-white/60 p-6 text-center transition hover:-translate-y-1 hover:shadow-cover"
        >
          <span
            className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${group.color}`}
            aria-hidden="true"
          >
            <group.Icon className="h-7 w-7" />
          </span>
          <h3 className="font-display text-lg font-700 text-navy">{group.label}</h3>
          <p className="mt-2 text-sm text-ink/70">{group.description}</p>
          <span className="mt-4 text-sm font-semibold text-navy group-hover:text-orange">
            Bücher ansehen →
          </span>
        </Link>
      ))}
    </div>
  );
}
