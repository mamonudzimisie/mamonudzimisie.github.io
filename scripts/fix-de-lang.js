// next export (output: 'export') renders a single <html lang> from the root
// layout for every route, so the /de pages come out tagged lang="pl". This
// walks the built HTML under out/de and corrects the lang attribute after
// the fact, since static export has no middleware to do this per-request.
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

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

const deDir = path.join(outDir, 'de');
const deIndexFile = path.join(outDir, 'de.html');

const targets = [];
if (fs.existsSync(deDir)) targets.push(...walk(deDir));
if (fs.existsSync(deIndexFile)) targets.push(deIndexFile);

for (const file of targets) {
  const html = fs.readFileSync(file, 'utf8');
  const fixed = html.replace('<html lang="pl"', '<html lang="de"');
  if (fixed !== html) {
    fs.writeFileSync(file, fixed);
  }
}

console.log(`fix-de-lang: updated ${targets.length} file(s) under out/de`);
