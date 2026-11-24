// Keep the current static pages intact during a gradual Astro migration.
// Run from the ROOT of the existing GitHub repository after adding Astro files there.
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const out = path.join(cwd, 'public');
fs.mkdirSync(out, { recursive: true });
const pages = [
  'index.html', 'about.html', 'people.html', 'initiatives.html',
  'join.html', 'contact.html', 'faq.html', 'robots.txt',
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
const members = JSON.parse(fs.readFileSync(path.join(cwd, 'src/data/people.json'), 'utf8'));
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const directory = members.map(member => {
  const name = escapeHtml(member.name);
  const profile = member.profile && escapeHtml(member.profile);
  const details = [member.role, member.background, member.interests, member.bio]
    .filter(Boolean).map(value => `<p>${escapeHtml(value)}</p>`).join('');
  const photograph = member.photo
    ? `<img src="${escapeHtml(member.photo)}" alt="${name}" width="120" height="120" loading="lazy">`
    : '';
  return `<article class="member">
    ${photograph}
    <h3>${name}</h3>
    ${details}
    ${profile ? `<a class="linkedin" href="${profile}" aria-label="${name} on LinkedIn" target="_blank" rel="noopener noreferrer">LinkedIn <svg style="display:inline-block;vertical-align:-.15em;flex:none" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor"/><path fill="#fff" d="M6 10h2.5v8H6zm1.25-4a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9zM11 10h2.4v1a2.7 2.7 0 0 1 2.4-1.2c2.2 0 3.2 1.3 3.2 3.5V18h-2.5v-4.3c0-1.1-.4-1.7-1.4-1.7s-1.6.7-1.6 1.8V18H11z"/></svg></a>` : ''}
  </article>`;
}).join('\n');
const people = path.join(out, 'people.html');
fs.writeFileSync(people, fs.readFileSync(people, 'utf8').replace('<!-- MEMBER DIRECTORY -->', () => directory));

// Old links to explore.html now reach the new Astro-generated Explore.
fs.writeFileSync(path.join(out, 'explore.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/explore/"><link rel="canonical" href="/explore/"><meta name="robots" content="noindex"><title>Explore — Mind Assembly</title></head><body><p><a href="/explore/">Continue to the new Explore library</a></p></body></html>`);
// Preserve the existing redirects and add a clean redirect if missing.
const redirects = path.join(out, '_redirects');
const existing = fs.existsSync(redirects) ? fs.readFileSync(redirects, 'utf8') : '';
if (!existing.includes('/explore.html')) {
  fs.writeFileSync(redirects, existing.replace(/\s*$/, '\n') + '/explore.html /explore/ 301\n');
}
console.log(`Legacy pages imported (${copied} source entries); the published homepage stays the current one.`);
