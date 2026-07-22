import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/data/books';

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/60 transition hover:-translate-y-1 hover:shadow-cover">
      <Link href={`/ksiazki/${book.slug}`} className="relative block bg-paper-dark p-6">
        <span className="absolute left-4 top-4 z-10 rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
          {book.ageRange}
        </span>
        {book.comingSoon && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white">
            Wkrótce
          </span>
        )}
        <div className="relative mx-auto aspect-[3/4] w-40 shadow-cover sm:w-44">
          <Image
            src={book.coverImage}
            alt={`Okładka książki ${book.title}`}
            fill
            unoptimized
            className="rounded-md object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl font-700 text-navy">{book.title}</h3>
        <p className="text-sm text-ink/70">{book.subtitle}</p>
        <div className="mt-auto flex items-center gap-3 pt-4">
          <Link
            href={`/ksiazki/${book.slug}`}
            className="text-sm font-semibold text-navy underline underline-offset-4 hover:text-orange"
          >
            Zobacz szczegóły
          </Link>
          {!book.comingSoon && (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="ml-auto rounded-full bg-orange px-4 py-2 text-sm font-bold text-white transition hover:bg-orange/90"
            >
              Zobacz na Amazon
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
