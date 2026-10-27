import SocialLinks from './SocialLinks';

export default function FooterDe() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dark">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div>
          <div className="flex items-center">
            <p className="font-display leading-none text-navy">
              <span className="flex items-baseline gap-0.5 text-xl font-800 tracking-tight">
                ZALKA
                <span className="text-orange">.</span>
              </span>
              <span className="mt-1 block font-body text-[0.55rem] font-semibold uppercase tracking-[0.42em] text-ink/55">
                Books
              </span>
            </p>
          </div>
          <p className="mt-2 max-w-sm text-sm text-ink/70">
            Rätselbücher für Kinder und Erwachsene — Konzentrationstraining,
            eine ruhige Auszeit und jede Menge Spaß.
          </p>
          <SocialLinks lang="de" className="mt-4" />
        </div>
        <p className="mt-8 border-t border-ink/10 pt-6 text-xs text-ink/50">
          © {new Date().getFullYear()} ZALKA BOOKS. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
