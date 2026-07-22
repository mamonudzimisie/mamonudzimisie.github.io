import Link from 'next/link';

const groups = [
  {
    age: '3–4 lata',
    label: 'Pierwsze kredki',
    description: 'Proste kształty, grube linie, chwile spokoju dla najmłodszych.',
    color: 'bg-green-light text-green',
  },
  {
    age: '5–6 lat',
    label: 'Przedszkolne wyzwania',
    description: 'Litery, labirynty i pierwsze łamigłówki, które uczą przez zabawę.',
    color: 'bg-orange-light text-orange',
  },
  {
    age: '7+',
    label: 'Prawdziwe zadania',
    description: 'Więcej liczb, więcej logiki — dla dzieci, które lubią się mierzyć z wyzwaniem.',
    color: 'bg-navy-light text-navy',
  },
];

export default function AgeGroupLinks() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {groups.map((group) => (
        <Link
          key={group.age}
          href={`/ksiazki?wiek=${encodeURIComponent(group.age)}`}
          className="group flex flex-col rounded-2xl border border-ink/10 bg-white/60 p-6 transition hover:-translate-y-1 hover:shadow-cover"
        >
          <span
            className={`mb-4 inline-block w-fit rounded-full px-3 py-1 text-sm font-bold ${group.color}`}
          >
            {group.age}
          </span>
          <h3 className="font-display text-lg font-700">{group.label}</h3>
          <p className="mt-2 text-sm text-ink/70">{group.description}</p>
          <span className="mt-4 text-sm font-semibold text-navy group-hover:text-orange">
            Zobacz książki →
          </span>
        </Link>
      ))}
    </div>
  );
}
