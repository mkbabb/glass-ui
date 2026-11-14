// Google Chat: the VISIBLE tooltip of the Board button. A MutationObserver
// notes nodes added or restyled near the button after hover; a rAF loop
// records the visible tooltip's style and animations through enter and exit;
// then a seeked strip of its enter. Crop = button + tooltip; the composer
// blanks everything outside those two rects.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const TARGET = 'https://chat.google.com/u/0/app/chat/1GLrwaAAAAE';
const FR = process.argv[2]; mkdirSync(FR, { recursive: true });
const browser = await chromium.connectOverCDP('http://localhost:9223');
const page = await browser.contexts()[0].newPage();
const PARK = [700, 30];
const M = {};
try {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('button.ph3cEe[aria-label="Board"]', { timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.mouse.move(...PARK);
  const b = await page.locator('button.ph3cEe[aria-label="Board"]').boundingBox();
  // Find the tooltip: watch for any element whose box appears within 80 px under the button.
  const near = ([bx, by, bw, bh]) => { window.__near = (r) => r.width > 10 && r.width < 300 && r.height > 10 && r.height < 80 && r.y > by - 90 && r.y < by + bh + 90 && r.x < bx + bw + 160 && r.right > bx - 160; window.__before = new Set([...document.querySelectorAll('body *')].filter(e => { const cs = getComputedStyle(e); return window.__near(e.getBoundingClientRect()) && cs.visibility !== 'hidden' && +cs.opacity > 0; })); };
  await page.evaluate(near, [b.x, b.y, b.width, b.height]);
  const find = page.evaluate(() => new Promise(res => {
    const t0 = performance.now(); const seen = [];
    const tick = () => {
      for (const el of document.querySelectorAll('body *')) {
        if (window.__before.has(el) || el.closest('.sYBKHd')) continue;
        const r = el.getBoundingClientRect(); if (!window.__near(r)) continue; const cs = getComputedStyle(el);
        if (cs.visibility !== 'hidden' && cs.display !== 'none') seen.push({ t: Math.round(performance.now() - t0), tag: el.tagName, id: el.id, role: el.getAttribute('role'), cls: String(el.className).slice(0, 80), rect: [r.x, r.y, r.width, r.height].map(Math.round), op: cs.opacity, text: (el.textContent || '').trim().slice(0, 20), kids: el.querySelectorAll('*').length });
      }
      if (seen.length) { const top = seen.sort((a, b) => b.kids - a.kids)[0]; const el = [...document.querySelectorAll('body *')].find(e => !window.__before.has(e) && e.tagName === top.tag && String(e.className).slice(0, 80) === top.cls && window.__near(e.getBoundingClientRect())); el?.setAttribute('data-study-tip', '1'); res(seen.slice(0, 8)); return; }
      if (performance.now() - t0 < 2500) requestAnimationFrame(tick); else res(seen);
    };
    requestAnimationFrame(tick);
  }));
  await page.waitForTimeout(30);
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  M.found = await find;
  // Climb to the tooltip's outermost own box (stop where size jumps).
  M.tip = await page.evaluate(() => {
    let el = document.querySelector('[data-study-tip]'); if (!el) return null;
    const chain = [];
    for (let e = el, d = 0; e && e !== document.body && d < 6; e = e.parentElement, d++) { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); chain.push({ tag: e.tagName, id: e.id, role: e.getAttribute('role'), cls: String(e.className).slice(0, 80), rect: [r.x, r.y, r.width, r.height].map(Math.round), op: cs.opacity, tf: cs.transform, sc: cs.scale, tr: cs.transition.slice(0, 200), anim: cs.animation.slice(0, 160), radius: cs.borderRadius, bg: cs.backgroundColor, shadow: cs.boxShadow, origin: cs.transformOrigin, pos: cs.position }); }
    return chain;
  });
  // Mark the root of the visible tooltip as the highest chain node of tooltip size.
  await page.evaluate(() => {
    let el = document.querySelector('[data-study-tip]'); const r0 = el.getBoundingClientRect(); let root = el;
    for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) { const r = e.getBoundingClientRect(); if (r.width > r0.width + 40 || r.height > r0.height + 30) break; root = e; }
    root.setAttribute('data-study-root', '1');
  });
  const recTip = (ms) => page.evaluate((ms) => new Promise(res => {
    const t0 = performance.now(); const out = []; let prev = '';
    const tick = () => {
      const el = document.querySelector('[data-study-root]');
      const row = el ? (() => { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return { op: cs.opacity, tf: cs.transform, sc: cs.scale, vis: cs.visibility, disp: cs.display, rect: [r.x, r.y, r.width, r.height].map(Math.round).join(','), cls: String(el.className).slice(0, 80), anims: el.getAnimations({ subtree: true }).map(a => ({ n: a.animationName || a.transitionProperty || 'waapi', d: a.effect.getComputedTiming().duration, e: a.effect.getComputedTiming().easing, dl: a.effect.getComputedTiming().delay, ct: Math.round(a.currentTime), kf: a.effect.getKeyframes().map(({ computedOffset, ...f }) => f) })) }; })() : { gone: true };
      const s = JSON.stringify({ ...row, anims: row.anims?.map(a => a.n) });
      if (s !== prev || row.anims?.length) out.push({ t: Math.round(performance.now() - t0), ...row });
      prev = s;
      if (performance.now() - t0 < ms) requestAnimationFrame(tick); else res(out);
    };
    requestAnimationFrame(tick);
  }), ms);
  await page.waitForTimeout(600);
  M.tipRect = await page.evaluate(() => { const r = document.querySelector('[data-study-root]')?.getBoundingClientRect(); return r && { x: r.x, y: r.y, width: r.width, height: r.height }; });
  M.btn = b;
  // Exit
  const out = recTip(800); await page.waitForTimeout(30); await page.mouse.move(...PARK); M.exit = await out;
  await page.waitForTimeout(600);
  // Enter, timed from the pointer arriving (show delay included)
  const inn = recTip(1200); await page.waitForTimeout(30); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); M.enter = await inn;
  // Seeked strip of the enter: leave, re-enter, freeze at the first animation frame.
  await page.mouse.move(...PARK); await page.waitForTimeout(700);
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  const ok = await page.waitForFunction(() => { const el = document.querySelector('[data-study-root]'); return el && el.getAnimations({ subtree: true }).length > 0; }, null, { timeout: 3000, polling: 'raf' }).then(() => true).catch(() => false);
  M.seekable = ok;
  if (ok && M.tipRect) {
    const tr = M.tipRect;
    const x0 = Math.floor(Math.min(b.x, tr.x) - 6), y0 = Math.floor(b.y - 4), x1 = Math.ceil(Math.max(b.x + b.width, tr.x + tr.width) + 6), y1 = Math.ceil(tr.y + tr.height + 6);
    M.clip = { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
    const total = await page.evaluate(() => { window.__fz = document.querySelector('[data-study-root]').getAnimations({ subtree: true }); window.__fz.forEach(a => a.pause()); return Math.max(...window.__fz.map(a => a.effect.getComputedTiming().endTime)); });
    M.total = total; const step = total / 10;
    for (let i = 0; i <= 10; i++) { await page.evaluate((t) => window.__fz.forEach(a => { a.currentTime = t; }), i * step); await page.screenshot({ path: `${FR}/tip-enter-${String(i).padStart(2, '0')}.png`, clip: M.clip }); }
    await page.evaluate(() => window.__fz.forEach(a => a.play()));
  }
  await page.mouse.move(...PARK);
  writeFileSync(`${FR}/tip-meta.json`, JSON.stringify(M, null, 1));
  console.log('ok', JSON.stringify(M.found).slice(0, 300), M.seekable);
} catch (e) { console.log('ERR', e.stack); writeFileSync(`${FR}/tip-meta.json`, JSON.stringify(M, null, 1)); } finally {
  await page.close().catch(() => {});
  process.exit(0);
}
