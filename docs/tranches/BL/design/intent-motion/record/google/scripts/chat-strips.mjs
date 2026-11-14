// Google Chat icon bar film frames. Clock: every running animation on the bar
// (document.getAnimations(), CSS + WAAPI, pseudo-elements included) is paused
// and SEEKED to t = 0, step, 2*step, ...; one element screenshot per seek. So
// frames are evenly spaced in animation time, independent of capture cost.
// Crops are the control only; anything outside the control's own rects is
// blanked in compose.py. Never captures message content.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const TARGET = 'https://chat.google.com/u/0/app/chat/1GLrwaAAAAE';
const FR = process.argv[2]; // frame dir (scratch)
mkdirSync(FR, { recursive: true });
const browser = await chromium.connectOverCDP('http://localhost:9223');
const page = await browser.contexts()[0].newPage();
const PARK = [700, 30];
const meta = {};
try {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('button.ph3cEe[aria-label="Board"]', { timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.mouse.move(...PARK);
  meta.dpr = await page.evaluate(() => devicePixelRatio);
  const bar = await page.evaluate(() => { const a = document.querySelector('button[aria-label="Start a video call"]').closest('.H0kN1').getBoundingClientRect(); const b = document.querySelector('button.ph3cEe[aria-label="Board"]').closest('.sYBKHd').getBoundingClientRect(); return { x: a.x - 4, y: a.y - 4, width: b.right - a.x + 8, height: 56 }; });
  meta.bar = bar;
  const box = async (sel) => page.locator(sel).last().boundingBox();
  const cen = (b) => [b.x + b.width / 2, b.y + b.height / 2];
  const pad = (b, p) => ({ x: b.x - p, y: b.y - p, width: b.width + 2 * p, height: b.height + 2 * p });
  // Pause every animation touching the bar (and the tooltip layer) and return their ids.
  const freeze = () => page.evaluate(() => {
    window.__fz = document.getAnimations().filter(a => a.playState !== 'finished');
    window.__fz.forEach(a => a.pause());
    return window.__fz.map(a => ({ name: a.animationName || a.transitionProperty || a.id || 'waapi', pe: a.effect?.pseudoElement || '', dur: a.effect?.getComputedTiming().duration, delay: a.effect?.getComputedTiming().delay, cls: String(a.effect?.target?.className || '').slice(0, 24) }));
  });
  const seek = (t) => page.evaluate((t) => { window.__fz.forEach(a => { a.currentTime = t; }); }, t);
  const release = () => page.evaluate(() => { (window.__fz || []).forEach(a => a.play()); window.__fz = []; });
  const strip = async (name, clip, total, step) => {
    const list = await freeze();
    meta[name] = { clip, total, step, anims: list };
    let i = 0;
    for (let t = 0; t <= total + 0.1; t += step) { await seek(t); await page.screenshot({ path: `${FR}/${name}-${String(i++).padStart(2, '0')}.png`, clip }); }
    await release();
  };

  // 1. Hover in, per button, 0..500 ms every 50 ms; then the hover-out pair.
  for (const [key, sel] of [['shared', 'button.ph3cEe[aria-label="Shared"]'], ['thread', 'button.ph3cEe[aria-label="Thread"]'], ['board', 'button.ph3cEe[aria-label="Board"]']]) {
    const b = await box(sel);
    const clip = pad(b, 6);
    await page.mouse.move(...cen(b));
    await strip(`hover-${key}`, clip, 500, 50);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${FR}/out-${key}-00.png`, clip });
    await page.mouse.move(...PARK);
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    await page.screenshot({ path: `${FR}/out-${key}-01.png`, clip });
    await page.waitForTimeout(400);
  }
  // 2. Video button state layer, 0..75 ms (in) — sampled every 15 ms.
  { const b = await box('button[aria-label="Start a video call"]'); const clip = pad(b, 4); await page.mouse.move(...cen(b)); await strip('hover-video', clip, 75, 15); await page.mouse.move(...PARK); await page.waitForTimeout(400); }
  // 3. Tooltip: hover Board, find the visible tooltip by its data-tooltip-id, time its arrival.
  {
    const b = await box('button.ph3cEe[aria-label="Board"]');
    const tid = await page.locator('button.ph3cEe[aria-label="Board"]').getAttribute('data-tooltip-id');
    meta.tooltipId = tid;
    const probe = page.evaluate((tid) => new Promise(res => {
      const t0 = performance.now(); const out = [];
      const tick = () => {
        const el = document.getElementById(tid);
        if (el) { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); out.push({ t: Math.round(performance.now() - t0), op: cs.opacity, tf: cs.transform, sc: cs.scale, rect: [r.x, r.y, r.width, r.height].map(Math.round), vis: cs.visibility, disp: cs.display, cls: String(el.className).slice(0, 60), tr: cs.transition.slice(0, 160), anims: el.getAnimations({ subtree: true }).map(a => ({ n: a.animationName || a.transitionProperty, d: a.effect.getComputedTiming().duration, e: a.effect.getComputedTiming().easing, dl: a.effect.getComputedTiming().delay, kf: a.effect.getKeyframes().map(({ computedOffset, ...f }) => f) })) }); }
        else out.push({ t: Math.round(performance.now() - t0), none: true });
        if (performance.now() - t0 < 1400) requestAnimationFrame(tick); else res(out);
      };
      requestAnimationFrame(tick);
    }), tid);
    await page.waitForTimeout(30);
    await page.mouse.move(...cen(b));
    meta.tooltipIn = await probe;
    const tr = await page.evaluate((tid) => { const r = document.getElementById(tid)?.getBoundingClientRect(); return r && { x: r.x, y: r.y, width: r.width, height: r.height }; }, tid);
    meta.tooltipRect = tr;
    if (tr) {
      const x0 = Math.min(b.x, tr.x) - 6, y0 = b.y - 6, x1 = Math.max(b.x + b.width, tr.x + tr.width) + 6, y1 = Math.max(b.y + b.height, tr.y + tr.height) + 6;
      const clip = { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
      meta.tooltipClip = clip;
      await page.screenshot({ path: `${FR}/tooltip-held.png`, clip });
      const probeOut = page.evaluate((tid) => new Promise(res => { const t0 = performance.now(); const out = []; const tick = () => { const el = document.getElementById(tid); const cs = el && getComputedStyle(el); out.push(el ? { t: Math.round(performance.now() - t0), op: cs.opacity, tf: cs.transform, vis: cs.visibility, disp: cs.display, cls: String(el.className).slice(0, 60), anims: el.getAnimations({ subtree: true }).map(a => ({ n: a.animationName || a.transitionProperty, d: a.effect.getComputedTiming().duration, e: a.effect.getComputedTiming().easing })) } : { t: Math.round(performance.now() - t0), none: true }); if (performance.now() - t0 < 700) requestAnimationFrame(tick); else res(out); }; requestAnimationFrame(tick); }), tid);
      await page.waitForTimeout(30);
      await page.mouse.move(...PARK);
      meta.tooltipOut = await probeOut;
    }
    await page.waitForTimeout(500);
  }
  // 3b. Tooltip enter as a strip: hover again, wait for the show delay, freeze at first sight.
  if (meta.tooltipClip) {
    const b = await box('button.ph3cEe[aria-label="Board"]');
    await page.mouse.move(...cen(b));
    await page.waitForFunction((tid) => { const el = document.getElementById(tid); return el && el.getAnimations({ subtree: true }).length > 0; }, meta.tooltipId, { timeout: 3000, polling: 'raf' }).catch(() => {});
    await strip('tooltip-enter', meta.tooltipClip, 200, 20);
    await page.mouse.move(...PARK); await page.waitForTimeout(500);
  }
  // 4. Press ripple on Shared: down, freeze, seek 0..450 by 45; slide off and release (no click).
  { const b = await box('button.ph3cEe[aria-label="Shared"]'); const clip = pad(b, 6); await page.mouse.move(...cen(b)); await page.waitForTimeout(700); await page.mouse.down(); await page.evaluate(() => new Promise(r => requestAnimationFrame(r))); await strip('press-shared', clip, 450, 45); await page.mouse.move(...PARK, { steps: 4 }); await page.mouse.up(); await page.waitForTimeout(600); }
  // 5. Keyboard focus ring on Shared: 0..600 by 50.
  { const b = await box('button.ph3cEe[aria-label="Shared"]'); await page.locator('button[aria-label="Start a video call"]').last().focus(); await page.keyboard.press('Tab'); await page.evaluate(() => new Promise(r => requestAnimationFrame(r))); await strip('focus-shared', pad(b, 10), 600, 50); await page.evaluate(() => document.activeElement.blur()); await page.waitForTimeout(500); }
  // 6. Selected: click Board; the bar re-forms. Whole-bar crop, 0..400 by 40.
  { await page.screenshot({ path: `${FR}/bar-rest.png`, clip: bar }); const b = await box('button.ph3cEe[aria-label="Board"]'); await page.mouse.move(...cen(b)); await page.waitForTimeout(600); await page.screenshot({ path: `${FR}/bar-hover-board.png`, clip: bar }); await page.mouse.click(...cen(b)); await page.waitForFunction(() => document.getAnimations().some(a => a.transitionProperty?.includes('radius')), null, { timeout: 2000, polling: 'raf' }).catch(() => {}); await strip('select-board', bar, 400, 40); await page.mouse.move(...PARK); await page.waitForTimeout(800); await page.screenshot({ path: `${FR}/bar-selected.png`, clip: bar });
    meta.selectedBoxes = await page.evaluate(() => [...document.querySelectorAll('button[data-panel-type],button[aria-label="Start a video call"]')].map(b => { const r = b.getBoundingClientRect(); return { lab: b.getAttribute('aria-label'), t: b.dataset.buttonType, exp: b.getAttribute('aria-expanded'), box: [r.x, r.y, r.width, r.height].map(Math.round) }; }));
  }
  writeFileSync(`${FR}/meta.json`, JSON.stringify(meta, null, 1));
  console.log('ok');
} catch (e) { console.log('ERR', e.stack); writeFileSync(`${FR}/meta.json`, JSON.stringify(meta, null, 1)); } finally {
  await page.close().catch(() => {});
  process.exit(0);
}
