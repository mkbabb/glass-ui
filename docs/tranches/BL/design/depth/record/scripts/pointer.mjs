// Pointer parallax probe: at the top of each page, move the pointer across the hero in
// five stops and record every element whose transform (or translate/rotate/scale) changes,
// plus inline style writes, so a pointer-driven layer shows up with its travel per stop.
// One browser for the run; a new context per page; all closed in finally.
// usage: node pointer.mjs <chromium|webkit> <out.json> <name=url>...
import { chromium, webkit } from 'playwright';
import { writeFileSync, readFileSync } from 'node:fs';

const [engine, out, ...pairs] = process.argv.slice(2);
const gate = readFileSync(new URL('./gate.js', import.meta.url), 'utf8');
const browser = await (engine === 'webkit' ? webkit : chromium).launch({ headless: true });
const R = {};
try {
  for (const p of pairs) {
    const [name, url] = [p.slice(0, p.indexOf('=')), p.slice(p.indexOf('=') + 1)];
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    try {
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(5000);
      await page.evaluate(gate).catch(() => {});
      await page.waitForTimeout(1500);
      await page.mouse.move(720, 450); await page.waitForTimeout(800);
      const snap = () => page.evaluate(() => {
        const key = (n) => { const c = String(n.className?.baseVal ?? n.className ?? '').trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.'); return n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + (c ? '.' + c : ''); };
        const m = {}; let i = 0;
        for (const el of document.querySelectorAll('body *')) {
          if (++i > 6000) break;
          const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight || r.width < 8) continue;
          const cs = getComputedStyle(el);
          const v = [cs.transform, cs.translate, cs.rotate, cs.scale].join('|');
          if (v !== 'none|none|none|none') m[i + ' ' + key(el)] = v;
        }
        return m;
      });
      await page.evaluate(() => { window.__PW = new Map(); new MutationObserver(ms => { for (const m of ms) { const n = m.target; const k = n.tagName.toLowerCase() + '.' + String(n.className?.baseVal ?? n.className).split(' ')[0]; window.__PW.set(k, (window.__PW.get(k) || 0) + 1); } }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['style'] }); });
      const stops = [[200, 200], [1240, 200], [1240, 700], [200, 700], [720, 450]];
      const snaps = [await snap()];
      for (const [x, y] of stops) { await page.mouse.move(x, y, { steps: 12 }); await page.waitForTimeout(700); snaps.push(await snap()); }
      const changed = {};
      for (const k of Object.keys(snaps[0])) { const vals = snaps.map(s => s[k]); if (new Set(vals).size > 1) changed[k] = vals.map(v => (v || '').slice(0, 70)); }
      R[name] = { url, changed: Object.fromEntries(Object.entries(changed).slice(0, 12)), changedCount: Object.keys(changed).length, writes: await page.evaluate(() => [...window.__PW.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)) };
    } catch (e) { R[name] = { url, error: e.message }; }
    finally { await ctx.close().catch(() => {}); }
    console.log(name, R[name].error || R[name].changedCount);
  }
} finally { await browser.close().catch(() => {}); writeFileSync(out, JSON.stringify(R, null, 1)); }
