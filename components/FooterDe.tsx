import Image from 'next/image';

export default function FooterDe() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dark">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
            <p className="font-display text-lg font-700 text-navy">Beschäftigungsbücher</p>
          </div>
          <p className="mt-2 max-w-sm text-sm text-ink/70">
            Beschäftigungsbücher, die Kinder wirklich fesseln — ganz ohne Bildschirm,
            dafür mit Stift in der Hand.
          </p>
        </div>
        <p className="mt-8 border-t border-ink/10 pt-6 text-xs leading-relaxed text-ink/60">
          Als Amazon-Partner verdienen wir an qualifizierten Käufen, die über Links auf
          dieser Seite getätigt werden. Der Preis, den du zahlst, ändert sich dadurch nicht.
        </p>
        <p className="mt-3 text-xs text-ink/50">
          © {new Date().getFullYear()} Beschäftigungsbücher. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
