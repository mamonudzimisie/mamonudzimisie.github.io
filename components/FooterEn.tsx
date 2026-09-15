export default function FooterEn() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dark">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div>
          <div className="flex items-center">
            <p className="font-display leading-none text-navy">
              <span className="flex items-baseline gap-1 text-lg font-800 tracking-tight">
                ZALKA
                <span className="text-orange">.</span>
              </span>
              <span className="mt-0.5 block text-[0.55rem] font-700 uppercase tracking-[0.4em] text-orange">
                Books
              </span>
            </p>
          </div>
          <p className="mt-2 max-w-sm text-sm text-ink/70">
            Puzzle books for kids and adults — focus training, a calm break
            and plenty of fun.
          </p>
        </div>
        <p className="mt-8 border-t border-ink/10 pt-6 text-xs leading-relaxed text-ink/60">
          As an Amazon Associate we earn from qualifying purchases made through links on
          this site. The price you pay stays the same.
        </p>
        <p className="mt-3 text-xs text-ink/50">
          © {new Date().getFullYear()} ZALKA BOOKS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
