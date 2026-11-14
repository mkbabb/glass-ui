// Attach to the shared signed-in Chrome over CDP, open OUR OWN tab, list icon
// buttons in the interface chrome only (labels, rects). Never reads message text.
import { chromium } from 'playwright';

const TARGET = 'https://chat.google.com/u/0/app/chat/1GLrwaAAAAE';
const browser = await chromium.connectOverCDP('http://localhost:9223');
const ctx = browser.contexts()[0];
const page = await ctx.newPage();
try {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);
  const href = page.url();
  console.log('URL host:', new URL(href).host);
  if (/accounts\.google\.com/.test(href)) { console.log('SIGN-IN PAGE: stop'); }
  // Chat renders its app inside iframes; list frames by host only.
  for (const f of page.frames()) console.log('frame', new URL(f.url() || 'about:blank').host, f.url().slice(0, 60).replace(/\?.*/, ''));
  for (const f of page.frames()) {
    const rows = await f.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('[role=button],button,[role=tab],a[role=link]')) {
        const r = el.getBoundingClientRect();
        if (r.width < 16 || r.width > 64 || r.height < 16 || r.height > 64) continue;
        if (!el.querySelector('svg, i, img[src*=icon]')) continue;
        let lab = el.getAttribute('aria-label') || el.getAttribute('data-tooltip') || '';
        if (/@|'s |profile|avatar/i.test(lab)) lab = '[redacted]';
        out.push({ lab: lab.slice(0, 40), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), cls: (el.className?.baseVal ?? el.className).toString().slice(0, 40), n: el.querySelectorAll('*').length });
      }
      return out;
    }).catch(e => 'ERR ' + e.message);
    if (Array.isArray(rows) && rows.length) { console.log('--- frame', new URL(f.url()).pathname.slice(0, 40)); for (const r of rows) console.log(JSON.stringify(r)); }
  }
} catch (e) { console.log("ERR", e.message); } finally {
  await page.close().catch(() => {});
  process.exit(0);
}
