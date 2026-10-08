'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

// Słowo rozbite na litery do animacji „odkurzacza” (globals.css, .vacuum-letter):
// każda litera osobno jest porywana do przedniej okładki w wachlarzu
// (element z data-vacuum-target), a po chwili książka wypluwa ją z powrotem.
// Wektor lotu (--dx, --dy) liczymy tutaj, bo wachlarz stoi raz po prawej
// (komputer), raz pod tekstem (telefon). Bez JS litery lecą domyślnie w prawo.
//
// Czytnik ekranu dostaje całe słowo z ukrytej kopii; same litery są dla niego
// niewidoczne. NFC sklei ewentualne „a + ogonek” w jedno „ą”, żeby ogonek nie
// trafił do osobnego spanu. Rozbicie wyłącza kerning między literami: dla
// „wciągają” Baloo 2 nie ma żadnych par, dla „fesseln”/„addictive” to
// 0,017/0,005 em (~1 px przy 60 px) — niewidoczne.
export default function VacuumWord({ word }: { word: string }) {
  const letters = Array.from(word.normalize('NFC'));
  const lettersRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const aim = () => {
      const target = document.querySelector('[data-vacuum-target]');
      const box = lettersRef.current;
      if (!target || !box) return;
      const t = target.getBoundingClientRect();
      // Środek okładki, odrobinę powyżej połowy — tam, gdzie tytuł.
      const tx = t.left + t.width / 2;
      const ty = t.top + t.height * 0.42;
      // Pozycje z układu (offsetLeft), nie z getBoundingClientRect liter —
      // te bywają w trakcie animacji przesunięte.
      const base = box.getBoundingClientRect();
      box.querySelectorAll<HTMLElement>('.vacuum-letter').forEach((el) => {
        const x = base.left + el.offsetLeft + el.offsetWidth / 2;
        const y = base.top + el.offsetTop + el.offsetHeight / 2;
        el.style.setProperty('--dx', `${Math.round(tx - x)}px`);
        el.style.setProperty('--dy', `${Math.round(ty - y)}px`);
      });
    };
    aim();
    window.addEventListener('resize', aim);
    return () => window.removeEventListener('resize', aim);
  }, []);

  return (
    <>
      <span className="sr-only">{word}</span>
      <span ref={lettersRef} aria-hidden="true" className="relative">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="vacuum-letter"
            // Co druga litera kręci się w drugą stronę, każda o inny kąt.
            style={{ '--i': i, '--spin': `${(i % 2 ? -1 : 1) * (200 + ((i * 53) % 160))}deg` } as CSSProperties}
          >
            {letter}
          </span>
        ))}
      </span>
    </>
  );
}
