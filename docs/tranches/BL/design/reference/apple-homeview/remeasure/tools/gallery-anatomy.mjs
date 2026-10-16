// How the slides move: find scroll containers / transformed tracks inside #highlights-gallery; read inline vars on the dock.
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
const W = +(process.argv[2]||1440), H = +(process.argv[3]||900);
const browser = await chromium.launch({ headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: W, height: H } })).newPage();
  await page.goto('https://www.apple.com/apple-homeview/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.evaluate(() => { const g = document.querySelector('#highlights-gallery'); window.scrollTo(0, g.getBoundingClientRect().top + scrollY - 100); });
  await page.waitForTimeout(3000);
  const r = await page.evaluate(() => {
    const g = document.querySelector('#highlights-gallery'); const out = [];
    for (const el of [g, ...g.querySelectorAll('*')]) {
      const cs = getComputedStyle(el);
      if (/(auto|scroll)/.test(cs.overflowX) || cs.transform !== 'none' || cs.scrollSnapType !== 'none' || cs.translate !== 'none') {
        const b = el.getBoundingClientRect();
        out.push({ tag: el.tagName, cls: (el.getAttribute('class')||'').slice(0,90), ox: cs.overflowX, snap: cs.scrollSnapType, snapAlign: cs.scrollSnapAlign, sb: cs.scrollBehavior, tf: cs.transform, tr: cs.translate, sl: el.scrollLeft, sw: el.scrollWidth, cw: el.clientWidth, rect: [b.left|0, b.top|0, b.width|0, b.height|0], style: (el.getAttribute('style')||'').slice(0,200) });
      }
    }
    const aap = document.querySelector('#aap-highlights');
    const styled = [...aap.querySelectorAll('[style]'), aap].map(e => ({ cls: (e.getAttribute('class')||'').slice(0,60), style: e.getAttribute('style') }));
    const items = [...g.querySelectorAll('[class*="item"]')].slice(0,12).map(e => ({ cls: e.className.toString().slice(0,80), w: e.getBoundingClientRect().width|0, x: e.getBoundingClientRect().left|0 }));
    return { out: out.slice(0, 40), styled, items, svgFilters: document.querySelectorAll('filter, feGaussianBlur, feColorMatrix').length };
  });
  console.log(JSON.stringify(r, null, 1));
} finally { await browser.close(); }
