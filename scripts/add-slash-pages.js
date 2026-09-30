// next export writes /pl/books as out/pl/books.html. GitHub Pages serves that
// file for /pl/books, but /pl/books/ (trailing slash) is a 404 because there is
// no out/pl/books/index.html — and links from outside do arrive with a slash.
// This copies every exported page to <page>/index.html so both forms work.
// The copy gets a canonical link to the slash-less URL (unless the page already
// declares one), so search engines keep treating the two as one page.
// Runs after fix-de-lang, so the copies carry the corrected lang attribute.
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const siteUrl = fs
  .readFileSync(path.join(__dirname, '..', 'lib', 'site.ts'), 'utf8')
  .match(/SITE_URL = '([^']+)'/)[1];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_next') walk(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

let created = 0;
for (const file of walk(outDir)) {
  const name = path.basename(file, '.html');
  if (name === 'index' || name === '404') continue;

  const target = path.join(path.dirname(file), name, 'index.html');
  if (fs.existsSync(target)) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('rel="canonical"')) {
    const route = path.relative(outDir, file).replace(/\.html$/, '').split(path.sep).join('/');
    html = html.replace('</head>', `<link rel="canonical" href="${siteUrl}/${route}"/></head>`);
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  created += 1;
}

console.log(`add-slash-pages: created ${created} index.html copies`);
