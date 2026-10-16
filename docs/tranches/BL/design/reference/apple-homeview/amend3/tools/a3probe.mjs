// AMEND-3 Apple probe: amend2/tools/aprobe.mjs (its sampler unchanged) plus two scenarios the round-2 critique
// found unmeasured: `hidden` (autoplay and the fill across an emulated hidden document: the visibility getters
// overridden and visibilitychange dispatched; headless Chromium cannot hide a page, amend3/data/hidden-check.json)
// and `sticky-smooth` (the sticky release under a smooth, rAF-driven 300 px/s scroll, so the release's velocity
// step is not the wheel's own step). No Apple code, pixels or media are stored.
// Derived from the AMEND-2 Apple probe: the properties no earlier row measured on apple.com/apple-homeview's
// #aap-highlights, with the re-measure's per-rAF sampler (remeasure/tools/probe.mjs SAMPLER, extended
// with focus, the dots' ::before, the AAP's container and gallery rects, and the rAF clock modes the
// glass-ui probe uses). One headless browser per run, closed in finally. Apple's pixels are decoded in
// memory for the contrast numbers and never written; no Apple code or media is stored.
//
// usage: node aprobe.mjs <scenario> <runTag> [W H]   env: ENG=chromium|webkit  RAF=120|60|stall
// scenarios: visibility sticky keyboard press-cancel intro contrast pause-resume
import { chromium, webkit } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { PNG } from '/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js';
import { writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'data', 'apple');
mkdirSync(OUT, { recursive: true });
const ENG = process.env.ENG || 'chromium';
const RAF = process.env.RAF || '120';
const [scenario, runTag = 'r1', Wa, Ha] = process.argv.slice(2);
const W = +(Wa || 1440), H = +(Ha || 900);
const URL = 'https://www.apple.com/apple-homeview/';
const load = () => execSync('sysctl -n vm.loadavg').toString().trim();
const sleep = ms => new Promise(r => setTimeout(r, ms));
const tag = [scenario, runTag, W, ENG !== 'chromium' ? ENG : '', RAF !== '120' ? 'raf' + RAF : ''].filter(Boolean).join('-');

const RAF_INIT = (mode) => {
  const orig = window.requestAnimationFrame.bind(window);
  window.__rafOrig = orig;
  if (mode === '60') {
    let q = new Map(), id = 0, flip = false;
    const pump = (t) => { flip = !flip; if (flip) { const cur = q; q = new Map(); for (const cb of cur.values()) { try { cb(t); } catch (e) { setTimeout(() => { throw e; }); } } } orig(pump); };
    orig(pump);
    window.requestAnimationFrame = (cb) => { id += 1; q.set(id, cb); return id; };
    window.cancelAnimationFrame = (h) => { q.delete(h); };
  } else if (mode === 'stall') {
    let n = 0;
    const jank = () => { n += 1; if (n % 6 === 0) { const t0 = performance.now(); while (performance.now() - t0 < 45) { /* block */ } } orig(jank); };
    orig(jank);
  }
};

const SAMPLER = () => {
  const raf = window.__rafOrig || window.requestAnimationFrame.bind(window);
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
  const lis = [...aap.querySelectorAll('.dotnav-item')];
  const links = lis.map(l => l.querySelector('.dotnav-link'));
  const r1 = x => Math.round(x * 100) / 100;
  const rc = el => { const b = el.getBoundingClientRect(); return [r1(b.left), r1(b.top), r1(b.width), r1(b.height)]; };
  const box = el => { const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
    return { x: r1(b.left), y: r1(b.top), w: r1(b.width), h: r1(b.height), tf: cs.transform, op: +cs.opacity, disp: cs.display }; };
  const mat = el => { const cs = getComputedStyle(el);
    return { bf: cs.backdropFilter || cs.webkitBackdropFilter, bg: cs.backgroundColor, alpha: getComputedStyle(el.parentElement).getPropertyValue('--alpha').trim() }; };
  const snap = () => {
    const cur = links.findIndex(l => l.classList.contains('current'));
    const aft = cur >= 0 ? getComputedStyle(links[cur], '::after') : null;
    const lc = getComputedStyle(links[0]);
    const glyph = ['play-icon', 'pause-icon', 'replay-icon'].find(c => { const e = btn.querySelector('.' + c); return e && getComputedStyle(e).display !== 'none'; });
    return {
      t: performance.now(), sy: scrollY, cls: aap.className, aapSt: aap.getAttribute('style') || '', aap: box(aap),
      cont: rc(cont), gal: rc(galEl), pos: getComputedStyle(aap).position,
      intro: { ...box(intro), bg: getComputedStyle(intro).backgroundColor },
      bgB: { ...box(bgB), ...mat(bgB) }, bgD: { ...box(bgD), ...mat(bgD) },
      wrapB: box(wrapB), wrapD: box(wrapD), btn: { ...box(btn), bgc: getComputedStyle(btn).backgroundColor }, glyph,
      li: lis.map(l => { const cs = getComputedStyle(l); return [+cs.opacity, cs.transform]; }),
      lw: links.map(l => r1(l.getBoundingClientRect().width)),
      lbg: links.map(l => getComputedStyle(l).backgroundColor),
      lbf: links.map(l => { const cs = getComputedStyle(l, '::before'); return [cs.transform, cs.scale, cs.backgroundColor, cs.opacity]; }),
      foc: links.indexOf(document.activeElement), act: document.activeElement ? (document.activeElement.className || document.activeElement.tagName).toString().slice(0, 50) : '',
      cur, aw: aft ? parseFloat(aft.width) : null, aPlay: aft ? aft.animationPlayState : null,
      ap: lc.getPropertyValue('--autoplay-progress').trim(), sl: gal.scrollLeft, galCls: galEl.className,
    };
  };
  window.__snap = snap;
  window.__rec = { on: false, frames: [] };
  window.__marks = [];
  window.__mark = n => window.__marks.push([n, performance.now()]);
  window.__start = () => { window.__rec.on = true; window.__rec.frames = []; const loop = () => { if (!window.__rec.on) return; window.__rec.frames.push(snap()); raf(loop); }; raf(loop); };
  window.__stop = () => { window.__rec.on = false; return window.__rec.frames; };
};

function boxMean(png, x0, y0, x1, y1) {
  let r = 0, g = 0, b = 0, n = 0;
  for (let y = Math.max(0, Math.round(y0)); y < Math.min(png.height, Math.round(y1)); y++)
    for (let x = Math.max(0, Math.round(x0)); x < Math.min(png.width, Math.round(x1)); x++) {
      const i = (png.width * y + x) << 2; r += png.data[i]; g += png.data[i + 1]; b += png.data[i + 2]; n++;
    }
  return n ? [r / n, g / n, b / n] : null;
}
const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const Yl = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => { const [l1, l2] = [Yl(a), Yl(b)].sort((p, q) => q - p); return (l1 + 0.05) / (l2 + 0.05); };

const meta = { scenario, runTag, W, H, ENG, RAF, url: URL, loadStart: load(), date: new Date().toISOString() };
const result = { meta };
let browser;
try {
  browser = await (ENG === 'webkit' ? webkit : chromium).launch({ headless: true });
  meta.browser = browser.version();
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: scenario.startsWith('contrast') ? 2 : 1, reducedMotion: 'no-preference', colorScheme: 'light' });
  if (RAF !== '120') await ctx.addInitScript(RAF_INIT, RAF);
  await ctx.addInitScript(() => {
    window.__vis = [];
    document.addEventListener('visibilitychange', () => window.__vis.push([performance.now(), document.visibilityState]));
    window.__hide = (on) => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => (on ? 'hidden' : 'visible') });
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => on });
      document.dispatchEvent(new Event('visibilitychange'));
      window.dispatchEvent(new Event(on ? 'blur' : 'focus'));
    };
  });
  const page = await ctx.newPage();
  const errors = []; page.on('crash', () => errors.push('PAGE CRASHED'));
  await page.goto(URL, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2500);
  await page.evaluate(SAMPLER);
  const gTop = await page.evaluate(() => document.querySelector('#highlights-gallery').getBoundingClientRect().top + scrollY);
  const preY = Math.max(0, gTop - H - 300), inY = gTop - 100;
  result.geom = { gTop, preY, inY };
  const mark = n => page.evaluate(n => window.__mark(n), n);
  const start = () => page.evaluate(() => window.__start());
  const stop = async () => { const frames = await page.evaluate(() => window.__stop()); return { frames, marks: await page.evaluate(() => window.__marks) }; };
  const intro = async () => { await page.evaluate(y => scrollTo(0, y), preY); await page.waitForTimeout(800); await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(3500); };
  const dotCenter = i => page.evaluate(i => { const b = document.querySelectorAll('#aap-highlights .dotnav-link')[i].getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; }, i);
  const btnCenter = () => page.evaluate(() => { const b = document.querySelector('#aap-highlights .play-pause-button').getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; });

  if (scenario === 'intro') {
    // the re-measure's intro-jump at a different rAF clock (RAF=60 or stall), and in WebKit (ENG=webkit)
    await page.evaluate(y => scrollTo(0, y), preY); await page.waitForTimeout(1500);
    await start(); await mark('jump');
    await page.evaluate(y => scrollTo(0, y), inY);
    await page.waitForTimeout(3500);
    Object.assign(result, await stop());
  } else if (scenario === 'hidden') {
    // autoplay on, gallery in view; 1.5 s, then the document hidden for 5 s, then visible for 5 s
    await intro(); await page.mouse.move(5, 5); await page.waitForTimeout(600);
    await start(); await page.waitForTimeout(1500);
    await mark('hide'); await page.evaluate(() => window.__hide(true)); await page.waitForTimeout(5000);
    await mark('show'); await page.evaluate(() => window.__hide(false)); await page.waitForTimeout(5000);
    Object.assign(result, await stop());
    result.vis = await page.evaluate(() => window.__vis);
  } else if (scenario === 'sticky-smooth') {
    // the sticky leg of `sticky`, driven by a rAF loop that sets scrollY = y0 + 300 px/s * elapsed before each
    // sample (a smooth scroll; no wheel steps), until the AAP's container is 300 px above the viewport
    await intro(); await page.mouse.move(W - 20, 200);
    const y0 = Math.max(0, gTop - H + 150);
    await page.evaluate(y => scrollTo(0, y), y0); await page.waitForTimeout(700);
    await mark('start');
    result.smooth = await page.evaluate(([y0]) => new Promise((res) => {
      const raf = window.__rafOrig || requestAnimationFrame.bind(window);
      const frames = []; let t0 = null;
      const cont = document.querySelector('#aap-highlights').parentElement;
      const step = (now) => {
        if (t0 === null) t0 = now;
        scrollTo(0, y0 + 0.3 * (now - t0));
        frames.push(window.__snap());
        if (cont.getBoundingClientRect().bottom < -300 || now - t0 > 15000) return res(frames);
        raf(step);
      };
      raf(step);
    }), [y0]);
    result.frames = result.smooth; delete result.smooth;
    await mark('end');
    result.marks = await page.evaluate(() => window.__marks);
  } else if (scenario === 'visibility') {
    // autoplay on; scroll the gallery out above (preY) for 4 s, back in for 4 s; then out below (past the
    // container) for 4 s, back in. Does autoplay pause off-screen, and does the fill resume where it froze?
    await intro(); await page.mouse.move(5, 5);
    await start(); await page.waitForTimeout(1500);
    await mark('outAbove'); await page.evaluate(y => scrollTo(0, y), preY); await page.waitForTimeout(4000);
    await mark('inA'); await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(4000);
    const endY = await page.evaluate(() => { const c = document.querySelector('#aap-highlights').parentElement.getBoundingClientRect(); return c.bottom + scrollY + 300; });
    await mark('outBelow'); await page.evaluate(y => scrollTo(0, y), endY); await page.waitForTimeout(4000);
    await mark('inB'); await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(4000);
    Object.assign(result, await stop());
  } else if (scenario === 'sticky') {
    // after the intro, wheel down 40 px per 133 ms (300 px/s) until the AAP's container is 300 px above the
    // viewport: when does the dock stop being stuck, and how does it leave?
    // start with the gallery entering from below (its top 150 px above the fold), so the leg passes through
    // the stuck regime, the release, and the exit
    await intro(); await page.mouse.move(W - 20, 200);
    await page.evaluate(y => scrollTo(0, y), Math.max(0, gTop - H + 150)); await page.waitForTimeout(700);
    await start(); await mark('start');
    for (let i = 0; i < 200; i++) {
      await page.mouse.wheel(0, 40); await page.waitForTimeout(133);
      const b = await page.evaluate(() => document.querySelector('#aap-highlights').parentElement.getBoundingClientRect().bottom);
      if (b < -300) break;
    }
    await mark('end'); await page.waitForTimeout(600);
    Object.assign(result, await stop());
  } else if (scenario === 'keyboard') {
    await intro(); await page.mouse.move(5, 5);
    await page.evaluate(() => { const l = [...document.querySelectorAll('#aap-highlights .dotnav-link')]; (l.find(x => x.classList.contains('current')) || l[0]).focus(); });
    await start(); await mark('focused'); await page.waitForTimeout(400);
    for (const key of ['ArrowRight', 'ArrowRight', 'End', 'Home', 'ArrowLeft', 'Tab']) { await mark(key); await page.keyboard.press(key); await page.waitForTimeout(1500); }
    Object.assign(result, await stop());
  } else if (scenario === 'press-cancel') {
    await intro();
    const [x, y] = await dotCenter(3);
    await page.mouse.move(x, y); await page.waitForTimeout(400);
    await start(); await page.waitForTimeout(100);
    await mark('down'); await page.mouse.down(); await page.waitForTimeout(300);
    await mark('dragOff'); await page.mouse.move(x, y - 60, { steps: 6 }); await page.waitForTimeout(400);
    await mark('up'); await page.mouse.up(); await page.waitForTimeout(1500);
    // control: a press released on the dot
    const [x5, y5] = await dotCenter(5);
    await page.mouse.move(x5, y5); await page.waitForTimeout(300);
    await mark('down5'); await page.mouse.down(); await page.waitForTimeout(300);
    await mark('up5'); await page.mouse.up(); await page.waitForTimeout(1500);
    Object.assign(result, await stop());
  } else if (scenario === 'pause-resume') {
    await intro(); await page.mouse.move(5, 5); await page.waitForTimeout(1200);
    await start(); await page.waitForTimeout(800);
    const [bx, by] = await btnCenter();
    await mark('pause'); await page.mouse.click(bx, by); await page.mouse.move(5, 5); await page.waitForTimeout(1500);
    await mark('play'); await page.mouse.click(bx, by); await page.mouse.move(5, 5); await page.waitForTimeout(3500);
    Object.assign(result, await stop());
  } else if (scenario === 'contrast') {
    // per slide at rest (paused): inactive dot ink vs the pill's composite, and the pill vs the media beside it
    await intro();
    const [bx, by] = await btnCenter(); await page.mouse.click(bx, by); await page.mouse.move(5, 5); await page.waitForTimeout(500);
    result.slides = [];
    const shas = [];
    for (let i = 0; i < 7; i++) {
      const [x, y] = await dotCenter(i); await page.mouse.click(x, y); await page.mouse.move(5, 5); await page.waitForTimeout(1600);
      const g = await page.evaluate(() => {
        const a = document.querySelector('#aap-highlights');
        const bx = e => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom]; };
        const links = [...a.querySelectorAll('.dotnav-link')];
        const cur = links.findIndex(l => l.classList.contains('current'));
        const pill = bx(a.querySelector('.aap-media-card-gallery__timed-dotnav'));
        return { cur, pill, links: links.map(bx), ink: getComputedStyle(links[(cur + 1) % 7]).backgroundColor, ap: a.className };
      });
      const buf = await page.screenshot();
      shas.push(createHash('sha256').update(buf).digest('hex').slice(0, 16));
      const png = PNG.sync.read(buf); const s = 2;
      const inact = (g.cur + 1) % 7; const L = g.links[inact];
      const cxy = [(L[0] + L[2]) / 2, (L[1] + L[3]) / 2];
      const dotC = boxMean(png, s * (cxy[0] - 1.5), s * (cxy[1] - 1.5), s * (cxy[0] + 1.5), s * (cxy[1] + 1.5));
      const fillC = boxMean(png, s * (cxy[0] + 9), s * (g.pill[1] + 6), s * (cxy[0] + 11), s * (g.pill[1] + 10)); // pill fill between dots
      const mediaC = boxMean(png, s * (g.pill[0] - 60), s * (g.pill[1] + 10), s * (g.pill[0] - 20), s * (g.pill[3] - 10));
      result.slides.push({ i, cur: g.cur, ink: g.ink, dot: dotC, fill: fillC, media: mediaC,
        c_dot_fill: +contrast(dotC, fillC).toFixed(3), c_fill_media: +contrast(fillC, mediaC).toFixed(3) });
    }
    result.screenshotSha256_16 = shas; // hashes only; the pixels are not stored
  } else if (scenario === 'contrast-stuck') {
    // the dock in its stuck regime (gallery 300 px into the viewport from below), where it overlaps the media
    // cards: per slide, inactive dot ink vs the pill's own fill and the pill's fill vs the pixels just outside it
    await intro();
    await page.evaluate(y => scrollTo(0, y), Math.max(0, gTop - H + 300)); await page.waitForTimeout(900);
    const [bx, by] = await btnCenter(); await page.mouse.click(bx, by); await page.mouse.move(5, 5); await page.waitForTimeout(500);
    result.slides = []; const shas = [];
    for (let i = 0; i < 7; i++) {
      const [x, y] = await dotCenter(i); await page.mouse.click(x, y); await page.mouse.move(5, 5); await page.waitForTimeout(1600);
      const g = await page.evaluate(() => {
        const a = document.querySelector('#aap-highlights');
        const bx = e => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom]; };
        const links = [...a.querySelectorAll('.dotnav-link')];
        const cur = links.findIndex(l => l.classList.contains('current'));
        // what is under the pill's centre once the AAP is hidden from hit-testing
        const pill = bx(a.querySelector('.aap-media-card-gallery__timed-dotnav'));
        a.style.pointerEvents = 'none'; const under = document.elementFromPoint((pill[0] + pill[2]) / 2, (pill[1] + pill[3]) / 2); a.style.pointerEvents = '';
        return { cur, pill, links: links.map(bx), ink: getComputedStyle(links[(cur + 1) % 7]).backgroundColor, under: under ? (under.tagName + '.' + (under.className || '').toString().slice(0, 60)) : null, aapTop: a.getBoundingClientRect().top };
      });
      const buf = await page.screenshot();
      shas.push(createHash('sha256').update(buf).digest('hex').slice(0, 16));
      const png = PNG.sync.read(buf); const s = 2;
      const inact = (g.cur + 1) % 7; const L = g.links[inact];
      const cxy = [(L[0] + L[2]) / 2, (L[1] + L[3]) / 2];
      const dotC = boxMean(png, s * (cxy[0] - 1.5), s * (cxy[1] - 1.5), s * (cxy[0] + 1.5), s * (cxy[1] + 1.5));
      const fillC = boxMean(png, s * (cxy[0] + 9), s * (g.pill[1] + 6), s * (cxy[0] + 11), s * (g.pill[1] + 10));
      const outC = boxMean(png, s * (g.pill[0] - 60), s * (g.pill[1] + 10), s * (g.pill[0] - 20), s * (g.pill[3] - 10));
      result.slides.push({ i, cur: g.cur, under: g.under, aapTop: g.aapTop, ink: g.ink, dot: dotC, fill: fillC, outside: outC,
        c_dot_fill: +contrast(dotC, fillC).toFixed(3), c_fill_outside: +contrast(fillC, outC).toFixed(3) });
    }
    result.screenshotSha256_16 = shas;
  } else throw new Error('unknown scenario ' + scenario);
  result.errors = errors;
  meta.loadEnd = load();
  const fr = result.frames || [];
  if (fr.length > 1) { const d = fr.slice(1).map((f, i) => f.t - fr[i].t).sort((a, b) => a - b); meta.frameDt = { n: d.length, p50: +d[d.length >> 1].toFixed(2), p95: +d[Math.floor(d.length * 0.95)].toFixed(2), max: +d[d.length - 1].toFixed(2) }; }
  await page.close(); await ctx.close();
} finally { if (browser) await browser.close().catch(() => {}); }
const f = join(OUT, `${tag}.json.gz`);
writeFileSync(f, gzipSync(JSON.stringify(result)));
console.log(JSON.stringify({ wrote: f, frames: (result.frames || []).length, load: [meta.loadStart, meta.loadEnd], frameDt: meta.frameDt }));
