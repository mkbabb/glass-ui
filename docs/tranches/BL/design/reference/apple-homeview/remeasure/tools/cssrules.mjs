// Extract authored CSS rules that govern the dock (all-access-pass / aap / dotnav / play-pause) + keyframes.
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { createHash } from 'node:crypto';
const browser = await chromium.launch({ headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const sheets = [];
  page.on('response', async r => { if (r.request().resourceType()==='stylesheet' || /\.css(\?|$)/.test(r.url())) { try { const b = await r.body(); sheets.push({ url: r.url(), bytes: b.length, sha256: createHash('sha256').update(b).digest('hex') }); } catch {} } });
  await page.goto('https://www.apple.com/apple-homeview/', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2000);
  const rules = await page.evaluate(() => {
    const out = []; const re = /all-access-pass|aap-|dotnav|play-pause|paddlenav|media-card-gallery/;
    const walk = (list, ctx) => { for (const r of list) {
      if (r.selectorText && re.test(r.selectorText)) { out.push({ ctx, text: r.cssText }); continue; }
      if (r.cssRules && !(r instanceof CSSKeyframesRule)) { walk(r.cssRules, (r.conditionText||r.media?.mediaText||r.selectorText||'') ); continue; }
      if (r instanceof CSSKeyframesRule) { if (/aap|access|dotnav|progress|intro/i.test(r.name)) out.push({ ctx, text: r.cssText }); continue; }
      if (r.selectorText && re.test(r.selectorText)) out.push({ ctx, text: r.cssText });
    } };
    for (const s of document.styleSheets) { try { walk(s.cssRules, ''); } catch (e) {} }
    return out;
  });
  console.log(JSON.stringify({ sheets, rules }, null, 1));
} finally { await browser.close(); }
