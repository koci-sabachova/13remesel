#!/usr/bin/env node
import {
  readFileSync, writeFileSync, mkdirSync, readdirSync,
  copyFileSync, existsSync, cpSync, rmSync,
} from 'node:fs';
import { join, basename } from 'node:path';

const ROOT = process.cwd();
const PAGES = join(ROOT, '_pages');
const PARTIALS = join(ROOT, '_partials');
const ASSETS = join(ROOT, 'assets');
const DIST = join(ROOT, 'docs');
const SITE_URL = 'https://trinactremesel.cz';

if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const head = readFileSync(join(PARTIALS, 'head.html'), 'utf8');
const header = readFileSync(join(PARTIALS, 'header.html'), 'utf8');
const footer = readFileSync(join(PARTIALS, 'footer.html'), 'utf8');

function parseFrontMatter(src) {
  const m = src.match(/^<!--meta\s*([\s\S]*?)-->\s*/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^\s*([a-zA-Z][a-zA-Z0-9_-]*)\s*:\s*(.*?)\s*$/);
    if (kv) meta[kv[1]] = kv[2];
  }
  return { meta, body: src.slice(m[0].length) };
}

function template(str, vars) {
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');
}

const pages = existsSync(PAGES)
  ? readdirSync(PAGES).filter(f => f.endsWith('.html'))
  : [];
const sitemap = [];

for (const file of pages) {
  const src = readFileSync(join(PAGES, file), 'utf8');
  const { meta, body } = parseFrontMatter(src);

  const slug = basename(file, '.html');
  const defaults = {
    title: 'Třináct řemesel',
    description: '',
    url: file === 'index.html' ? '/' : `/${slug}/`,
    ogImage: 'og-default.jpg',
  };
  const vars = { ...defaults, ...meta };

  const html = [
    '<!doctype html>',
    '<html lang="cs">',
    '<head>',
    template(head, vars),
    '</head>',
    '<body>',
    header,
    body,
    footer,
    '</body>',
    '</html>',
  ].join('\n');

  const outDir = file === 'index.html' ? DIST : join(DIST, slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);

  sitemap.push(vars.url);
  console.log(`✓ ${vars.url.padEnd(28)} ${(html.length / 1024).toFixed(1)} KB`);
}

if (existsSync(ASSETS)) {
  cpSync(ASSETS, join(DIST, 'assets'), {
    recursive: true,
    filter: (src) => !src.endsWith('.DS_Store') && !src.includes('/img/_src'),
  });
}

for (const f of ['404.html', 'robots.txt', 'CNAME', 'google.html', 'favicon.ico']) {
  if (existsSync(join(ROOT, f))) copyFileSync(join(ROOT, f), join(DIST, f));
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(u => `  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemapXml);

console.log(`\nBuilt ${pages.length} page(s) → dist/`);
