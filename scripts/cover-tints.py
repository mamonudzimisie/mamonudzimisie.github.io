#!/usr/bin/env python3
"""Wylicza jasny odcień tła pod każdą okładką (strona książki).

Bierze kolory okładki, wybiera najbardziej charakterystyczny (nasycony i
nie za mały, z pominięciem bieli i czerni), robi z niego jasny odcień
i zapisuje do data/coverTints.ts. Uruchom po dodaniu okładki:

    python3 scripts/cover-tints.py
"""
import colorsys
import pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
COVERS = ROOT / 'public' / 'covers'
OUT = ROOT / 'data' / 'coverTints.ts'
LIGHTNESS = 0.925  # jasność tła (0–1)

# Ręczne wyjątki (odcień HLS 0–1, nasycenie), gdy automat wybiera nie ten
# kolor — np. czerwone koło zamiast turkusowego tła okładki.
OVERRIDES = {
    'sudoku-duzym-drukiem-101.webp': (0.47, 0.32),
    'large-print-sudoku-101.webp': (0.47, 0.32),
    'znajdz-slowko-poziom-latwy.webp': (0.33, 0.32),
}


def tint_for(path: pathlib.Path) -> str:
    im = Image.open(path).convert('RGB')
    im.thumbnail((120, 120))
    pal = im.quantize(colors=8, method=Image.Quantize.MEDIANCUT)
    palette = pal.getpalette()
    counts = sorted(pal.getcolors(), reverse=True)
    total = sum(c for c, _ in counts)
    best, best_score = None, -1.0
    for count, idx in counts:
        r, g, b = palette[idx * 3: idx * 3 + 3]
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        share = count / total
        if share < 0.03 or l > 0.95 or l < 0.06:
            continue
        # Nasycenie liczy się bardziej niż powierzchnia: czerwone koło na
        # kremowej okładce Sudoku wygrywa z kremem.
        score = (share ** 0.75) * (0.08 + s)
        if score > best_score:
            best, best_score = (h, s), score
    h, s = OVERRIDES.get(path.name) or best or (0.09, 0.2)
    # Zawsze jasny, czysty odcień: stała jasność, umiarkowane nasycenie.
    r, g, b = colorsys.hls_to_rgb(h, LIGHTNESS, min(max(s * 0.7, 0.22), 0.5))
    mixed = [round(v * 255) for v in (r, g, b)]
    return '#' + ''.join(f'{v:02X}' for v in mixed)


def main() -> None:
    rows = []
    for path in sorted(COVERS.glob('*.webp')):
        rows.append(f"  '/covers/{path.name}': '{tint_for(path)}',")
    OUT.write_text(
        '// Wygenerowane przez scripts/cover-tints.py — nie edytuj ręcznie.\n'
        '// Jasne tło pod okładką na stronie książki, w odcieniu jej głównego koloru.\n'
        'export const COVER_TINTS: Record<string, string> = {\n'
        + '\n'.join(rows)
        + '\n};\n'
    )
    print(f'{len(rows)} okładek → {OUT.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
