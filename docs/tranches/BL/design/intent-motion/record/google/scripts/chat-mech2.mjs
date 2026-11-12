// Google Chat icon bar, second pass: full rule text with media context, the
// keyframes, state-layer pseudo styles, tooltip enter/exit, press, focus,
// selected. Interface chrome only.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const TARGET = 'https://chat.google.com/u/0/app/chat/1GLrwaAAAAE';
const OUT = new URL('../data/', import.meta.url).pathname;
const browser = await chromium.connectOverCDP('http://localhost:9223');
const page = await browser.contexts()[0].newPage();
const R = {};
const PARK = [700, 30];
try {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('button.ph3cEe[aria-label="Board"]', { timeout: 30000 });
  const expanded = () => page.evaluate(() => Object.fromEntries([...document.querySelectorAll('button.ph3cEe')].map(b => [b.getAttribute('aria-label'), b.getAttribute('aria-expanded')])));
  R.initialExpanded = await expanded();
  await page.waitForTimeout(3000);
  await page.mouse.move(...PARK);

  R.rules = await page.evaluate(() => {
    const keys = ['GVOJ8d', 'aljsS', 'RpHHi', 'VCwAb', 'ph3cEe', 'INEv2e', 'XjoK4b', 'UTNHae', 'scale-and-rotate', 'gm3-focus-ring', 'kuuWnf'];
    const hits = []; const kf = {};
    const walk = (rules, ctx) => {
      for (const r of rules) {
        if (r.type === CSSRule.KEYFRAMES_RULE) { if (/scale-and-rotate|focus-ring|tooltip|fade|scale/i.test(r.name)) kf[r.name] = r.cssText; continue; }
        if (r.selectorText) { if (keys.some(k => r.cssText.includes(k))) hits.push({ ctx, css: r.cssText.slice(0, 2500) }); continue; }
        if (r.cssRules) walk(r.cssRules, (ctx ? ctx + ' > ' : '') + (r.conditionText ?? r.constructor.name));
      }
    };
    for (const s of document.styleSheets) { try { walk(s.cssRules, ''); } catch {} }
    return { hits, kf };
  });

  const center = async (l) => { const b = await page.locator(`button[aria-label="${l}"]`).last().boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };

  // Generic recorder: per rAF frame, computed props of the bar + any tooltip-like node.
  const rec = (ms) => page.evaluate((ms) => {
    const group = document.querySelector('button.ph3cEe[aria-label="Board"]').closest('.sYBKHd');
    const video = document.querySelector('button[aria-label="Start a video call"]').closest('.H0kN1');
    const props = ['transform', 'scale', 'rotate', 'opacity', 'clip-path', 'background-color', 'color', 'font-variation-settings', 'visibility', 'display', 'box-shadow', 'outline', 'border-radius', 'transition'];
    const out = []; const t0 = performance.now(); let prev = new Map();
    return new Promise(res => {
      const tick = () => {
        const t = performance.now() - t0;
        const nodes = [video, ...video.querySelectorAll('*'), group, ...group.querySelectorAll('*'), ...document.querySelectorAll('[role=tooltip]')];
        const frame = { t: Math.round(t), diff: [], anims: [] };
        nodes.forEach((n, i) => {
          for (const pseudo of [null, '::before', '::after']) {
            const cs = getComputedStyle(n, pseudo);
            if (pseudo && cs.content === 'none') continue;
            const key = (n.getAttribute('aria-label') || n.getAttribute('role') || '') + '|' + String(n.className?.baseVal ?? n.className).split(' ').slice(0, 2).join('.') + (pseudo || '') + '#' + i;
            const o = {}; for (const p of props) o[p] = cs.getPropertyValue(p);
            if (n.getAttribute('role') === 'tooltip') { const r = n.getBoundingClientRect(); o.rect = [r.x, r.y, r.width, r.height].map(Math.round).join(','); o.text = (n.textContent || '').trim().slice(0, 30); }
            const p0 = prev.get(key);
            const ch = {}; for (const k in o) if (!p0 || p0[k] !== o[k]) ch[k] = o[k];
            if (p0 && Object.keys(ch).length) frame.diff.push({ key, ch });
            if (!p0 && t > 0 && n.getAttribute('role') === 'tooltip') frame.diff.push({ key, appeared: o });
            prev.set(key, o);
          }
          for (const a of n.getAnimations({ subtree: false })) frame.anims.push({ i, cls: String(n.className).slice(0, 30), target: a.effect?.pseudoElement, type: a.constructor.name, prop: a.transitionProperty, name: a.animationName, ct: Math.round(a.currentTime ?? -1), timing: (({ duration, easing, delay, fill }) => ({ duration, easing, delay, fill }))(a.effect?.getComputedTiming?.() ?? {}), frames: a.effect?.getKeyframes?.().map(({ computedOffset, ...f }) => f) });
        });
        // pseudo-element animations hang off the document
        for (const a of document.getAnimations()) { const pe = a.effect?.pseudoElement; if (pe && (group.contains(a.effect.target) || video.contains(a.effect.target))) frame.anims.push({ pseudo: pe, cls: String(a.effect.target.className).slice(0, 30), type: a.constructor.name, prop: a.transitionProperty, name: a.animationName, ct: Math.round(a.currentTime ?? -1), timing: (({ duration, easing, delay, fill }) => ({ duration, easing, delay, fill }))(a.effect.getComputedTiming()) }); }
        if (frame.diff.length || frame.anims.length) out.push(frame);
        if (t < ms) requestAnimationFrame(tick); else res(out);
      };
      requestAnimationFrame(tick);
    });
  }, ms);

  const run = async (name, ms, act) => { const p = rec(ms); await page.waitForTimeout(40); await act(); R[name] = await p; R['exp_' + name] = await expanded(); writeFileSync(OUT + 'chat-mech2.json', JSON.stringify(R, null, 1)); };

  // Tooltip: hold on Board 1800 ms, then leave and watch 900 ms.
  await run('tooltipIn', 1800, async () => page.mouse.move(...(await center('Board')), { steps: 2 }));
  await run('tooltipOut', 900, async () => page.mouse.move(...PARK, { steps: 2 }));
  await page.waitForTimeout(500);
  // Video button hover (state layer on ::before) in and out.
  await run('videoIn', 600, async () => page.mouse.move(...(await center('Start a video call')), { steps: 2 }));
  await run('videoOut', 600, async () => page.mouse.move(...PARK, { steps: 2 }));
  await page.waitForTimeout(500);
  // Press without click: down on Shared, hold, slide off, release elsewhere.
  await page.mouse.move(...(await center('Shared')), { steps: 2 });
  await page.waitForTimeout(700);
  await run('pressDown', 700, async () => page.mouse.down());
  await run('pressRelease', 700, async () => { await page.mouse.move(...PARK, { steps: 4 }); await page.mouse.up(); });
  await page.waitForTimeout(500);
  // Focus by keyboard: focus video, Tab onto Shared.
  await page.locator('button[aria-label="Start a video call"]').focus();
  await run('focusIn', 900, async () => page.keyboard.press('Tab'));
  R.focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  await run('focusOut', 700, async () => page.evaluate(() => document.activeElement.blur()));
  await page.waitForTimeout(400);
  // Selected: click Board, watch; then click again to restore.
  await run('selectOn', 1400, async () => page.locator('button.ph3cEe[aria-label="Board"]').click());
  R.selectedState = await page.evaluate(() => { const b = document.querySelector('button.ph3cEe[aria-label="Board"]'); const k = b.closest('.kuuWnf.INEv2e'); const g = b.closest('.OEWUyd').querySelector('.GVOJ8d'); return { pressed: b.getAttribute('aria-pressed'), kcls: k.className, clip: getComputedStyle(g).clipPath.slice(0, 80), bg: getComputedStyle(g).backgroundColor }; });
  await page.mouse.move(...PARK);
  await page.waitForTimeout(800);
  await run('selectOff', 1400, async () => page.locator('button.ph3cEe[aria-label="Board"]').click());
  await page.mouse.move(...PARK);
  await page.waitForTimeout(800);
  // Restore: any panel button now expanded that was not at load gets one click.
  const now = await expanded();
  for (const [k, v] of Object.entries(now)) if (v === 'true' && R.initialExpanded[k] !== 'true') { await page.locator(`button.ph3cEe[aria-label="${k}"]`).click(); await page.waitForTimeout(800); }
  R.finalExpanded = await expanded();
  writeFileSync(OUT + 'chat-mech2.json', JSON.stringify(R, null, 1));
  console.log('ok', Object.entries(R).map(([k, v]) => `${k}:${Array.isArray(v) ? v.length : typeof v}`).join(' '));
} catch (e) { console.log('ERR', e.stack); } finally {
  await page.close().catch(() => {});
  process.exit(0);
}
