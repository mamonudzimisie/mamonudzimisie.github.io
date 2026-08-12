import Link from 'next/link';
import type { BookAudience } from '@/data/books';

const groups: {
  audience: BookAudience;
  label: string;
  description: string;
  emoji: string;
  color: string;
}[] = [
  {
    audience: 'dzieci',
    label: 'Für Kinder',
    description: 'Wortsuchrätsel, Labyrinthe und Malbücher, altersgerecht ausgewählt.',
    emoji: '🧒',
    color: 'bg-green-light text-green',
  },
  {
    audience: 'dorosli',
    label: 'Für Erwachsene',
    description: 'Rätsel und Aufgaben zum Entspannen — eine Pause vom Bildschirm.',
    emoji: '🧠',
    color: 'bg-orange-light text-orange',
  },
  {
    audience: 'duzy-druk',
    label: 'Großdruck',
    description: 'Angenehme, gut lesbare Schrift — schont die Augen.',
    emoji: '🔍',
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
            className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl ${group.color}`}
            aria-hidden="true"
          >
            {group.emoji}
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
