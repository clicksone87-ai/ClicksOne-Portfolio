// Renders every page in headless Chrome/Edge (links are built by JS), then
// verifies each internal href points at an existing page and #anchor.
// Usage: node scripts/check-links.mjs
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const browsers = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].filter(Boolean);
const browser = browsers.find(b => existsSync(b));
if (!browser) { console.error('No Chrome/Edge found. Set CHROME=/path/to/chrome'); process.exit(2); }

const pages = readdirSync(root).filter(f => f.endsWith('.html'));
const dom = {};
for (const p of pages) {
  dom[p] = execFileSync(browser, ['--headless=new', '--disable-gpu', '--virtual-time-budget=4000',
    '--allow-file-access-from-files', '--dump-dom', pathToFileURL(resolve(root, p)).href],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
}
const ids = Object.fromEntries(pages.map(p => [p, new Set([...dom[p].matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))]));

let bad = 0, checked = 0;
const required = ['site-header', 'book-pill', 'cta-banner', 'site-footer'];
for (const p of pages) {
  for (const r of required) if (!dom[p].includes(r)) { console.log(`✗ ${p}: missing global element "${r}"`); bad++; }
  for (const [, href] of dom[p].matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(href) || href === '#') continue;
    checked++;
    const [file, hash] = href.split('#');
    const target = file || p;
    if (!pages.includes(target)) { console.log(`✗ ${p}: ${href} → page not found`); bad++; continue; }
    // work.html#<project> deep links open a modal by project id rather than an element id
    if (hash && !ids[target].has(hash) && !(target === 'work.html' && dom[target].includes(`data-id="${hash}"`))) {
      console.log(`✗ ${p}: ${href} → #${hash} not found on ${target}`); bad++;
    }
  }
}
console.log(`\n${pages.length} pages, ${checked} internal links checked, ${bad} problem(s).`);
process.exit(bad ? 1 : 0);
