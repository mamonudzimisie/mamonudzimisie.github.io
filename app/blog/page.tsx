import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Porady dla rodziców: pomysły na zabawy bez ekranu, rozwój dziecka i inspiracje na spokojne popołudnia.',
};

const posts = [
  {
    slug: 'zabawy-bez-ekranu-dla-5-latka',
    title: 'Zabawy bez ekranu dla 5-latka',
    excerpt: 'Kilka sprawdzonych pomysłów na chwilę spokoju bez sięgania po tablet.',
  },
];

export default function BlogPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">Blog</h1>
        <p className="mt-3 text-ink/70">
          Tu wkrótce pojawią się porady i pomysły dla rodziców. Na start jeden artykuł.
        </p>
        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-ink/10 bg-white/60 p-6 transition hover:-translate-y-1 hover:shadow-cover"
            >
              <h2 className="font-display text-xl font-700 text-navy">{post.title}</h2>
              <p className="mt-2 text-sm text-ink/70">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
