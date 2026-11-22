// Keep the current static pages intact during a gradual Astro migration.
// Run from the ROOT of the existing GitHub repository after adding Astro files there.
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const out = path.join(cwd, 'public');
fs.mkdirSync(out, { recursive: true });
const pages = [
  'index.html', 'about.html', 'people.html', 'initiatives.html',
  'join.html', 'contact.html', 'faq.html', 'robots.txt', 'sitemap.xml',
  'main.js', 'styles.css', 'mind-assembly-icon.png', 'mind-assembly-logo.webp',
  '_redirects'
];
let copied = 0;
for (const file of pages) {
  const source = path.join(cwd, file);
  if (fs.existsSync(source) && fs.statSync(source).isFile()) {
    fs.copyFileSync(source, path.join(out, file));
    copied++;
  }
}
const assets = path.join(cwd, 'assets');
if (fs.existsSync(assets) && fs.statSync(assets).isDirectory()) {
  fs.cpSync(assets, path.join(out, 'assets'), { recursive: true, force: true });
  copied++;
}
// Old links to explore.html now reach the new Astro-generated Explore.
fs.writeFileSync(path.join(out, 'explore.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/explore/"><link rel="canonical" href="/explore/"><meta name="robots" content="noindex"><title>Explore — Mind Assembly</title></head><body><p><a href="/explore/">Continue to the new Explore library</a></p></body></html>`);
// Preserve the existing redirects and add a clean redirect if missing.
const redirects = path.join(out, '_redirects');
const existing = fs.existsSync(redirects) ? fs.readFileSync(redirects, 'utf8') : '';
if (!existing.includes('/explore.html')) {
  fs.writeFileSync(redirects, existing.replace(/\s*$/, '\n') + '/explore.html /explore/ 301\n');
}
console.log(`Legacy pages imported (${copied} source entries); the published homepage stays the current one.`);
