// Google Chat header icon bar: read the MECHANISM (structure, CSS rules,
// computed styles, getAnimations timeline per rAF frame through hover in/out).
// Interface chrome only: never reads message text; labels are the buttons' own.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const TARGET = 'https://chat.google.com/u/0/app/chat/1GLrwaAAAAE';
const OUT = new URL('../data/', import.meta.url).pathname;
const browser = await chromium.connectOverCDP('http://localhost:9223');
const page = await browser.contexts()[0].newPage();
const result = {};
try {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('button[aria-label="Board"]', { timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.mouse.move(700, 30); // park the pointer off the bar

  result.structure = await page.evaluate(() => {
    const group = document.querySelector('button[aria-label="Board"]').closest('.sYBKHd');
    const video = document.querySelector('button[aria-label="Start a video call"]');
    const dump = (el, d = 0) => {
      const r = el.getBoundingClientRect();
      const node = { tag: el.tagName.toLowerCase(), cls: String(el.className?.baseVal ?? el.className), box: [r.x, r.y, r.width, r.height].map(Math.round) };
      const lab = el.getAttribute('aria-label'); if (lab) node.lab = lab;
      if (el.tagName === 'path') node.d = el.getAttribute('d');
      const cs = getComputedStyle(el);
      if (/Material|Symbols/.test(cs.fontFamily) && !el.children.length) { node.ligature = el.textContent.trim(); node.font = cs.fontFamily.slice(0, 50); node.fvs = cs.fontVariationSettings; node.fontSize = cs.fontSize; }
      node.kids = [...el.children].map(c => dump(c, d + 1));
      return node;
    };
    const host = group.parentElement;
    return { video: dump(video.closest('.H0kN1') || video), group: dump(group), groupNodes: group.querySelectorAll('*').length + 1, hostCls: String(host.className) };
  });

  // CSS rules that name any class in the bar subtree, plus referenced keyframes.
  result.rules = await page.evaluate(() => {
    const group = document.querySelector('button[aria-label="Board"]').closest('.sYBKHd');
    const video = document.querySelector('button[aria-label="Start a video call"]');
    const classes = new Set();
    for (const root of [group, video.closest('.H0kN1') || video]) for (const el of [root, ...root.querySelectorAll('*')]) for (const c of (el.classList || [])) classes.add(c);
    const want = [...classes].filter(c => c.length > 3);
    const hits = []; const kf = {};
    const walk = (rules) => {
      for (const r of rules) {
        if (r.cssRules && !r.selectorText) { walk(r.cssRules); continue; }
        if (r.type === CSSRule.KEYFRAMES_RULE) { kf[r.name] = r.cssText.slice(0, 1500); continue; }
        if (!r.selectorText) continue;
        if (want.some(c => r.selectorText.includes('.' + c))) {
          const t = r.cssText;
          if (/transition|animation|transform|clip-path|border-radius|background|scale|rotate|opacity|mask|font-variation|shape|d:|offset|width|height|color|fill/i.test(t)) hits.push(t.slice(0, 700));
        }
      }
    };
    for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
    return { classes: want, hits, keyframes: kf };
  });

  const PROBE = () => {
    const group = document.querySelector('button[aria-label="Board"]').closest('.sYBKHd');
    const video = document.querySelector('button[aria-label="Start a video call"]').closest('.H0kN1');
    const nodes = [video, ...video.querySelectorAll('*'), group, ...group.querySelectorAll('*')];
    const props = ['transform', 'scale', 'rotate', 'translate', 'opacity', 'clip-path', 'border-radius', 'background-color', 'color', 'fill', 'font-variation-settings', 'font-size', 'width', 'height', 'd', 'mask-image', 'box-shadow', 'corner-shape', 'transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay'];
    const snap = () => nodes.map(n => { const cs = getComputedStyle(n); const o = {}; for (const p of props) o[p] = cs.getPropertyValue(p); if (n.tagName === 'path') o.attrD = n.getAttribute('d'); return o; });
    return { nodes, props, snap };
  };

  // Rest computed styles per node (only non-default values kept).
  result.rest = await page.evaluate(`(${PROBE})().snap()`);

  // Timeline: record each rAF frame what changed + live animations, while we hover.
  const startRec = async (ms) => page.evaluate(([src, ms]) => {
    const { nodes, snap } = eval(`(${src})()`);
    window.__rec = []; const t0 = performance.now(); let prev = null;
    return new Promise(res => {
      const tick = () => {
        const t = performance.now() - t0; const s = snap();
        const diff = {};
        s.forEach((o, i) => { for (const k in o) if (!prev || prev[i][k] !== o[k]) { if (prev) (diff[i] ??= {})[k] = o[k]; } });
        const anims = nodes.flatMap((n, i) => n.getAnimations().map(a => ({ i, type: a.constructor.name, prop: a.transitionProperty, name: a.animationName, ct: Math.round(a.currentTime ?? -1), timing: (({ duration, easing, delay, fill, endDelay, iterations }) => ({ duration, easing, delay, fill, endDelay, iterations }))(a.effect?.getComputedTiming?.() ?? {}), composite: a.effect?.composite, frames: a.effect?.getKeyframes?.().map(f => { const c = { ...f }; delete c.computedOffset; return c; }) })));
        if (Object.keys(diff).length || anims.length) window.__rec.push({ t: Math.round(t), diff, anims });
        prev = s;
        if (t < ms) requestAnimationFrame(tick); else res(window.__rec);
      };
      requestAnimationFrame(tick);
    });
  }, [PROBE.toString(), ms]);

  const center = async (label) => { const b = await page.locator(`button[aria-label="${label}"]`).boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
  result.timelines = {};
  for (const label of ['Shared', 'Thread', 'Board', 'Start a video call']) {
    const [x, y] = await center(label);
    const recIn = startRec(1600);
    await page.waitForTimeout(50);
    await page.mouse.move(x, y, { steps: 2 });
    const tin = await recIn;
    const recOut = startRec(1200);
    await page.waitForTimeout(50);
    await page.mouse.move(700, 30, { steps: 2 });
    const tout = await recOut;
    result.timelines[label] = { in: tin, out: tout };
    await page.waitForTimeout(600);
  }
  writeFileSync(OUT + 'chat-mech.json', JSON.stringify(result, null, 1));
  console.log('ok', Object.keys(result.timelines).map(k => `${k}: in ${result.timelines[k].in.length} frames, out ${result.timelines[k].out.length}`).join('; '));
} catch (e) { console.log('ERR', e.stack); } finally {
  await page.close().catch(() => {});
  process.exit(0);
}
