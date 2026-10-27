#!/usr/bin/env python3
"""Miniatury okładek (320 px szerokości) do małych, przechylonych okładek:
kafelki „Znajdź coś dla siebie” i ściana okładek w „O nas”.

Pomniejszanie 850 px → ~70 px w przeglądarce przy obróconym obrazku dawało
postrzępione krawędzie i migotanie siatek. Uruchom po dodaniu okładki:

    python3 scripts/cover-thumbs.py
"""
import pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
COVERS = ROOT / 'public' / 'covers'
OUT = COVERS / 'thumbs'
WIDTH = 320


# Strony pokazywane w kafelku „Do pobrania” (components/AudienceLinks.tsx).
# Miniatura ląduje obok oryginału w podkatalogu thumbs/.
PAGES = [
    'materialy/wykreslanki-jesien-5-6-lat.webp',
    'materialy/wykreslanki-halloween-5-6-lat.webp',
    'samples/large-print-sudoku-100/4.webp',
    'samples/large-print-sudoku-100/5.webp',
]


def thumb(src: pathlib.Path, dst: pathlib.Path) -> None:
    im = Image.open(src).convert('RGB')
    h = round(im.height * WIDTH / im.width)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.resize((WIDTH, h), Image.LANCZOS).save(dst, 'WEBP', quality=86, method=6)


def main() -> None:
    for path in sorted(COVERS.glob('*.webp')):
        thumb(path, OUT / path.name)
    for rel in PAGES:
        src = ROOT / 'public' / rel
        thumb(src, src.parent / 'thumbs' / src.name)
    print(f'{len(list(OUT.glob("*.webp")))} okładek + {len(PAGES)} stron → miniatury')


if __name__ == '__main__':
    main()
