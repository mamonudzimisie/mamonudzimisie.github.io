// Makieta otwartej książki z dwóch stron przykładowych — zamiast zdjęcia
// produktowego. Widok z góry: dwie kartki, cień w grzbiecie, krawędzie
// kolejnych kartek pod spodem i ołówek obok.
export default function OpenBook({ left, right }: { left: string; right: string }) {
  return (
    <div className="tilt-smooth relative mx-auto w-full max-w-[38rem] rotate-[-2deg] px-2 pb-10 pt-2" aria-hidden="true">
      {/* cień całej książki na blacie */}
      <div className="absolute inset-x-[4%] bottom-6 top-6 rounded-[10px] bg-ink/25 blur-2xl" />
      {/* krawędzie kartek pod spodem */}
      <div className="absolute inset-x-[1.2%] bottom-[34px] top-[10px] rounded-[6px] bg-[#EDE7DC]" />
      <div className="absolute inset-x-[0.6%] bottom-[37px] top-[6px] rounded-[5px] bg-[#F5F1EA]" />
      <div className="relative flex overflow-hidden rounded-[4px] bg-white">
        {[left, right].map((src, i) => (
          <div key={src} className="relative w-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" className="block h-auto w-full" />
            {/* zaginanie kartki ku grzbietowi */}
            <span
              className={`pointer-events-none absolute inset-y-0 w-[22%] ${
                i === 0
                  ? 'right-0 bg-gradient-to-l from-black/[0.16] via-black/[0.04] to-transparent'
                  : 'left-0 bg-gradient-to-r from-black/[0.16] via-black/[0.04] to-transparent'
              }`}
            />
          </div>
        ))}
        {/* grzbiet */}
        <span className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/20" />
      </div>
      {/* ołówek */}
      <svg
        viewBox="0 0 320 22"
        className="absolute -right-[4%] bottom-[2px] w-[58%] rotate-[-14deg] drop-shadow-[0_6px_6px_rgba(30,28,25,0.25)]"
      >
        <rect x="40" y="3" width="240" height="16" rx="1.5" fill="#E2A33A" />
        <rect x="40" y="3" width="240" height="5" fill="#EDB956" />
        <rect x="40" y="14" width="240" height="5" fill="#C98B2A" />
        <rect x="280" y="2" width="22" height="18" rx="1" fill="#B9B4AC" />
        <rect x="302" y="2" width="16" height="18" rx="4" fill="#D98A8A" />
        <path d="M40 3 L10 11 L40 19 Z" fill="#F1D9B5" />
        <path d="M18 9 L2 11 L18 13 Z" fill="#2E2A26" />
      </svg>
    </div>
  );
}
