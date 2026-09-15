// next export (output: 'export') renders a single <html lang> from the root
// layout for every route, so the /de and /en pages come out tagged lang="pl".
// This walks the built HTML under each non-Polish section and corrects the
// lang attribute after the fact, since static export has no middleware to do
// this per-request.
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const SECTIONS = ['de', 'en'];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

for (const lang of SECTIONS) {
  const sectionDir = path.join(outDir, lang);
  const indexFile = path.join(outDir, `${lang}.html`);

  const targets = [];
  if (fs.existsSync(sectionDir)) targets.push(...walk(sectionDir));
  if (fs.existsSync(indexFile)) targets.push(indexFile);

  for (const file of targets) {
    const html = fs.readFileSync(file, 'utf8');
    const fixed = html.replace('<html lang="pl"', `<html lang="${lang}"`);
    if (fixed !== html) {
      fs.writeFileSync(file, fixed);
    }
  }

  console.log(`fix-de-lang: updated ${targets.length} file(s) under out/${lang}`);
}
