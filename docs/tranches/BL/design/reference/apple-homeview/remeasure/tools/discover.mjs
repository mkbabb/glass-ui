// Discovery: find the media dock (pagination dots + play/pause) on apple.com/apple-homeview.
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
const W = +(process.argv[2]||1440), H = +(process.argv[3]||900);
const browser = await chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: W, height: H } });
  const page = await ctx.newPage();
  await page.goto('https://www.apple.com/apple-homeview/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);
  const out = await page.evaluate(() => {
    const r = [];
    const cands = [...document.querySelectorAll('[class*="dotnav"],[class*="paddlenav"],[class*="play-pause"],[class*="playpause"],[class*="media-control"],[class*="carousel"],[class*="gallery"],[role="tablist"]')];
    for (const el of cands.slice(0,80)) {
      const b = el.getBoundingClientRect();
      r.push({ tag: el.tagName, cls: (el.className&&el.className.baseVal!==undefined?el.className.baseVal:el.className).toString().slice(0,140), id: el.id, y: Math.round(b.top+scrollY), x: Math.round(b.left), w: Math.round(b.width), h: Math.round(b.height), kids: el.children.length });
    }
    return { docH: document.documentElement.scrollHeight, r };
  });
  console.log(JSON.stringify(out, null, 1));
} finally { await browser.close(); }
