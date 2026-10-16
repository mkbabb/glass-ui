// AMEND-4 Apple probe. Derived from amend3/tools/a3probe.mjs (its per-rAF sampler of #aap-highlights), extended
// with what CRITIQUE-3 found no tool reading on Apple:
//   - the glyph channel (P-13): opacity, transform and scale of every element under the play/pause button
//   - the timing source of every moving channel: the AAP subtree's Animations per frame (type, property, easing,
//     duration, delay, target), so a channel moved by a CSS transition/animation is told from one written by script
//   - three entries for E0 and the no-replay clause: intro-jump (one instant scroll past the trigger),
//     intro-wheel (40 px wheel steps every 133 ms, 300 px/s, from above), intro-outback (jump in; out above, back
//     in, out below, back in)
// No Apple code, pixels or media are stored: computed styles, rects and easing keywords only.
// usage: node a4probe.mjs <scenario> <runTag> [W H]
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'data', 'apple');
mkdirSync(OUT, { recursive: true });
const [scenario, runTag = 'r1', Wa, Ha] = process.argv.slice(2);
const W = +(Wa || 1440), H = +(Ha || 900);
const URL = 'https://www.apple.com/apple-homeview/';
const load = () => execSync('sysctl -n vm.loadavg').toString().trim();
const tag = [scenario, runTag, W].join('-');

const SAMPLER = () => {
  const raf = window.requestAnimationFrame.bind(window);
  const q = s => document.querySelector(s);
  const aap = q('#aap-highlights');
  const cont = aap.parentElement;
  const galEl = q('#highlights-gallery');
  const gal = q('#highlights-gallery .scroll-container');
  const intro = aap.querySelector('.all-access-pass__intro-element');
  const [bgB, bgD] = [...aap.querySelectorAll('.all-access-pass__background')];
  const wrapB = aap.querySelector('.play-pause-button-wrapper');
  const wrapD = aap.querySelector('.aap-media-card-gallery__timed-dotnav');
  const btn = aap.querySelector('.play-pause-button');
  const glyphEls = [...btn.querySelectorAll('*')].slice(0, 12);
  const lis = [...aap.querySelectorAll('.dotnav-item')];
  const links = lis.map(l => l.querySelector('.dotnav-link'));
  const r1 = x => Math.round(x * 100) / 100;
  const rc = el => { const b = el.getBoundingClientRect(); return [r1(b.left), r1(b.top), r1(b.width), r1(b.height)]; };
  const box = el => { const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
    return { x: r1(b.left), y: r1(b.top), w: r1(b.width), h: r1(b.height), tf: cs.transform, op: +cs.opacity, disp: cs.display }; };
  const mat = el => { const cs = getComputedStyle(el);
    return { bf: cs.backdropFilter || cs.webkitBackdropFilter, bg: cs.backgroundColor, alpha: getComputedStyle(el.parentElement).getPropertyValue('--alpha').trim() }; };
  const nameOf = el => ((el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || el.tagName).toString().slice(0, 40);
  window.__glyphNames = glyphEls.map(nameOf);
  const ids = new WeakMap(); let nid = 0; window.__anim = [];
  const animRow = (a) => {
    if (!ids.has(a)) {
      ids.set(a, nid++);
      const t = a.effect ? a.effect.getTiming() : {};
      window.__anim.push({ id: ids.get(a), type: a.constructor.name, name: a.animationName || a.transitionProperty || '',
        easing: t.easing, duration: t.duration, delay: t.delay,
        target: a.effect && a.effect.target ? nameOf(a.effect.target) : '', pseudo: a.effect ? a.effect.pseudoElement : null });
    }
    return ids.get(a);
  };
  const snap = (now) => {
    const cur = links.findIndex(l => l.classList.contains('current'));
    const aft = cur >= 0 ? getComputedStyle(links[cur], '::after') : null;
    return {
      t: now, sy: scrollY, cls: aap.className, aapSt: (aap.getAttribute('style') || '').slice(0, 200), aap: box(aap),
      cont: rc(cont), gal: rc(galEl),
      intro: { ...box(intro), bg: getComputedStyle(intro).backgroundColor },
      bgB: { ...box(bgB), ...mat(bgB) }, bgD: { ...box(bgD), ...mat(bgD) },
      wrapB: box(wrapB), wrapD: box(wrapD), btn: { ...box(btn), bgc: getComputedStyle(btn).backgroundColor },
      glyph: glyphEls.map(e => { const cs = getComputedStyle(e); return [cs.display, +cs.opacity, cs.transform, cs.scale]; }),
      li: lis.map(l => { const cs = getComputedStyle(l); return [+cs.opacity, cs.transform]; }),
      lw: links.map(l => r1(l.getBoundingClientRect().width)),
      cur, aw: aft ? parseFloat(aft.width) : null,
      pi: getComputedStyle(links[0]).getPropertyValue('--progress-intro').trim(),
      sl: gal.scrollLeft,
      anims: aap.getAnimations({ subtree: true }).filter(a => a.playState === 'running').map(animRow),
    };
  };
  window.__rec = { on: false, frames: [] };
  window.__marks = [];
  window.__mark = n => window.__marks.push([n, performance.now()]);
  window.__start = () => { window.__rec.on = true; window.__rec.frames = []; const loop = (now) => { if (!window.__rec.on) return; window.__rec.frames.push(snap(now)); raf(loop); }; raf(loop); };
  window.__stop = () => { window.__rec.on = false; return { frames: window.__rec.frames, anims: window.__anim, glyphNames: window.__glyphNames }; };
};

const meta = { scenario, runTag, W, H, url: URL, loadStart: load(), date: new Date().toISOString() };
const result = { meta };
let browser, ctx, page;
try {
  browser = await chromium.launch({ headless: true });
  meta.browser = browser.version();
  ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: 'no-preference', colorScheme: 'light' });
  page = await ctx.newPage();
  const errors = []; page.on('crash', () => errors.push('PAGE CRASHED'));
  await page.goto(URL, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2500);
  await page.evaluate(SAMPLER);
  const gTop = await page.evaluate(() => document.querySelector('#highlights-gallery').getBoundingClientRect().top + scrollY);
  const preY = Math.max(0, gTop - H - 300), inY = gTop - 100;
  result.geom = { gTop, preY, inY };
  const mark = n => page.evaluate(n => window.__mark(n), n);
  const start = () => page.evaluate(() => window.__start());
  const stop = async () => ({ ...(await page.evaluate(() => window.__stop())), marks: await page.evaluate(() => window.__marks) });
  await page.mouse.move(5, 5);
  await page.evaluate(y => scrollTo(0, y), preY); await page.waitForTimeout(1500);
  await start();
  if (scenario === 'intro-jump' || scenario === 'intro-outback') {
    await mark('jump'); await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(3500);
    if (scenario === 'intro-outback') {
      await mark('outAbove'); await page.evaluate(y => scrollTo(0, y), preY); await page.waitForTimeout(1500);
      await mark('inA'); await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(2500);
      const endY = await page.evaluate(() => { const c = document.querySelector('#aap-highlights').parentElement.getBoundingClientRect(); return c.bottom + scrollY + 300; });
      await mark('outBelow'); await page.evaluate(y => scrollTo(0, y), endY); await page.waitForTimeout(1500);
      await mark('inB'); await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(2500);
    }
  } else if (scenario === 'intro-wheel') {
    await mark('wheel');
    for (let i = 0; i < 120; i++) {
      await page.mouse.wheel(0, 40); await page.waitForTimeout(133);
      if (await page.evaluate(() => document.querySelector('#aap-highlights').className.includes('activated'))) break;
    }
    await mark('activated-seen'); await page.waitForTimeout(3500);
  } else throw new Error('unknown scenario ' + scenario);
  Object.assign(result, await stop());
  result.errors = errors;
  meta.loadEnd = load();
} finally {
  if (page) await page.close().catch(() => {});
  if (ctx) await ctx.close().catch(() => {});
  if (browser) await browser.close().catch(() => {});
}
const fr = result.frames || [];
if (fr.length > 1) { const d = fr.slice(1).map((f, i) => f.t - fr[i].t).sort((a, b) => a - b); meta.frameDt = { n: d.length, p50: +d[d.length >> 1].toFixed(2), p95: +d[Math.floor(d.length * 0.95)].toFixed(2), max: +d[d.length - 1].toFixed(2) }; }
const f = join(OUT, `${tag}.json.gz`);
writeFileSync(f, gzipSync(JSON.stringify(result)));
console.log(JSON.stringify({ wrote: f, frames: fr.length, load: [meta.loadStart, meta.loadEnd], frameDt: meta.frameDt }));
