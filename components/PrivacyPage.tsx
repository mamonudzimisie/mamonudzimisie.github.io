import type { Metadata } from 'next';
import { Fragment } from 'react';
import { PRIVACY_UPDATED, privacyHref, privacyPolicies, type PrivacyLang } from '@/data/privacy';
import { SITE_URL } from '@/lib/site';

export function privacyMetadata(lang: PrivacyLang): Metadata {
  const policy = privacyPolicies[lang];
  const url = `${SITE_URL}${privacyHref(lang)}`;
  return {
    title: policy.title,
    description: policy.description,
    alternates: {
      canonical: url,
      languages: {
        pl: `${SITE_URL}${privacyHref('pl')}`,
        de: `${SITE_URL}${privacyHref('de')}`,
        en: `${SITE_URL}${privacyHref('en')}`,
      },
    },
    openGraph: { type: 'website', url, title: policy.title, description: policy.description },
  };
}

// `{email}` w tekście → link mailto.
function withEmail(text: string, email: string) {
  const parts = text.split('{email}');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a
          href={`mailto:${email}`}
          className="font-semibold text-navy underline underline-offset-4 hover:text-orange-ink"
        >
          {email}
        </a>
      )}
    </Fragment>
  ));
}

export default function PrivacyPage({ lang }: { lang: PrivacyLang }) {
  const policy = privacyPolicies[lang];
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-800 text-navy sm:text-5xl">{policy.title}</h1>
        <p className="mt-3 text-sm text-ink/70">
          {policy.updatedLabel}: <time dateTime={PRIVACY_UPDATED}>{policy.updated}</time>
        </p>
        <p className="mt-6 leading-relaxed text-ink/80">{policy.intro}</p>
        {policy.sections.map((section) => (
          <div key={section.heading} className="mt-10">
            <h2 className="font-display text-2xl font-700 text-navy">{section.heading}</h2>
            <div className="mt-3 space-y-4 leading-relaxed text-ink/80">
              {section.paragraphs.map((p) => (
                <p key={p}>{withEmail(p, policy.email)}</p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-5">
                  {section.list.map((item) => (
                    <li key={item}>{withEmail(item, policy.email)}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
