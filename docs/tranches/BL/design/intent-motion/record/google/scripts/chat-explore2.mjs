// Locate the header icon bar (video / folder / tasks / pin) by geometry: every
// element in the header band right of centre that holds an svg. Interface only.
import { chromium } from 'playwright';

const TARGET = 'https://chat.google.com/u/0/app/chat/1GLrwaAAAAE';
const browser = await chromium.connectOverCDP('http://localhost:9223');
const page = await browser.contexts()[0].newPage();
try {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);
  const rows = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.y < 60 || r.y > 130 || r.x < 1150 || r.width === 0 || r.width > 300) continue;
      const cs = getComputedStyle(el);
      const ff = cs.fontFamily;
      let lab = el.getAttribute('aria-label') || el.getAttribute('data-tooltip') || '';
      if (/@|'s |profile|avatar/i.test(lab)) lab = '[redacted]';
      const icon = /Material|Symbols|Icons/i.test(ff) && el.children.length === 0 ? el.textContent.trim().slice(0, 24) : '';
      out.push({ tag: el.tagName, role: el.getAttribute('role'), lab: lab.slice(0, 40), cls: String(el.className?.baseVal ?? el.className).slice(0, 30), box: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], icon, sel: el.getAttribute('aria-selected') ?? el.getAttribute('aria-pressed') ?? el.getAttribute('aria-expanded') });
    }
    return out;
  });
  for (const r of rows) console.log(JSON.stringify(r));
} catch (e) { console.log('ERR', e.message); } finally {
  await page.close().catch(() => {});
  process.exit(0);
}
