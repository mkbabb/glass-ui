// REMEASURE probe for the apple.com/apple-homeview media dock (#aap-highlights).
// Independent of the study's tools. Per-rAF getComputedStyle/getBoundingClientRect sampling,
// one headless Chromium per run, everything closed in finally.
//
// usage: node probe.mjs <scenario> <runTag> [W H]
// scenarios: intro-wheel intro-jump trigger autoplay click retarget hover pause idle drag resize reduced dark
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'data');
const FR = join(HERE, '..', 'frames');
mkdirSync(OUT, { recursive: true }); mkdirSync(FR, { recursive: true });
const [scenario, runTag = 'r1', Wa, Ha] = process.argv.slice(2);
const touch = scenario === 'drag' || scenario === 'intro-touch' || scenario === 'trigger-touch';
const W = +(Wa || (touch ? 390 : 1440)), H = +(Ha || (touch ? 844 : 900));
const URL = 'https://www.apple.com/apple-homeview/';
const load = () => execSync('sysctl -n vm.loadavg').toString().trim();

// ---- in-page sampler -------------------------------------------------------
const SAMPLER = () => {
  const q = s => document.querySelector(s);
  const aap = q('#aap-highlights');
  const gal = q('#highlights-gallery .scroll-container');
  const intro = aap.querySelector('.all-access-pass__intro-element');
  const [bgB, bgD] = [...aap.querySelectorAll('.all-access-pass__background')]; // DOM order: button wrapper first
  const wrapB = aap.querySelector('.play-pause-button-wrapper');
  const wrapD = aap.querySelector('.aap-media-card-gallery__timed-dotnav');
  const btn = aap.querySelector('.play-pause-button');
  const lis = [...aap.querySelectorAll('.dotnav-item')];
  const links = lis.map(l => l.querySelector('.dotnav-link'));
  const caps = [...document.querySelectorAll('#highlights-gallery .caption-animation-container')].slice(0, 3);
  const r1 = x => Math.round(x * 100) / 100;
  const box = el => { const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
    return { x: r1(b.left), y: r1(b.top), w: r1(b.width), h: r1(b.height), tf: cs.transform, op: +cs.opacity, disp: cs.display }; };
  const mat = el => { const cs = getComputedStyle(el);
    return { bf: cs.backdropFilter, bg: cs.backgroundColor, alpha: getComputedStyle(el.parentElement).getPropertyValue('--alpha').trim(), st: el.getAttribute('style') || '' }; };
  const snap = () => {
    const cur = links.findIndex(l => l.classList.contains('current'));
    const aft = cur >= 0 ? getComputedStyle(links[cur], '::after') : null;
    const lc = getComputedStyle(links[0]);
    const glyph = ['play-icon', 'pause-icon', 'replay-icon'].find(c => { const e = btn.querySelector('.' + c); return e && getComputedStyle(e).display !== 'none'; });
    return {
      t: performance.now(), sy: scrollY, ih: innerHeight,
      cls: aap.className, aapSt: aap.getAttribute('style') || '', aap: box(aap),
      intro: { ...box(intro), st: intro.getAttribute('style') || '', bg: getComputedStyle(intro).backgroundColor, filt: getComputedStyle(intro).filter },
      bgB: { ...box(bgB), ...mat(bgB) }, bgD: { ...box(bgD), ...mat(bgD) },
      wrapB: box(wrapB), wrapD: box(wrapD), btn: { ...box(btn), bgc: getComputedStyle(btn).backgroundColor }, glyph,
      li: lis.map(l => { const cs = getComputedStyle(l); return [+cs.opacity, cs.transform]; }),
      lw: links.map(l => r1(l.getBoundingClientRect().width)), lx: links.map(l => r1(l.getBoundingClientRect().left)),
      lbg: links.map(l => getComputedStyle(l).backgroundColor),
      cur, aw: aft ? parseFloat(aft.width) : null, aPlay: aft ? aft.animationPlayState : null,
      ap: lc.getPropertyValue('--autoplay-progress').trim(), pi: lc.getPropertyValue('--progress-intro').trim(),
      sl: gal.scrollLeft, cap: caps.map(c => { const cs = getComputedStyle(c); return [cs.transform, +cs.opacity]; }),
      galCls: document.querySelector('#highlights-gallery').className,
    };
  };
  window.__snap = snap;
  window.__rec = { on: false, frames: [] };
  window.__start = () => { window.__rec.on = true; window.__rec.frames = []; const loop = () => { if (!window.__rec.on) return; window.__rec.frames.push(snap()); requestAnimationFrame(loop); }; requestAnimationFrame(loop); };
  window.__stop = () => { window.__rec.on = false; return window.__rec.frames; };
};

const browser = await chromium.launch({ headless: true });
const meta = { scenario, runTag, W, H, url: URL, loadStart: load(), date: new Date().toISOString() };
let result = {};
try {
  const ctx = await browser.newContext({
    viewport: { width: W, height: H }, deviceScaleFactor: 2,
    hasTouch: touch, isMobile: touch,
    reducedMotion: scenario.startsWith('reduced') ? 'reduce' : 'no-preference',
    colorScheme: scenario === 'dark' ? 'dark' : 'light',
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await page.goto(URL, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2500);
  await page.evaluate(SAMPLER);
  const galTop = () => page.evaluate(() => document.querySelector('#highlights-gallery').getBoundingClientRect().top + scrollY);
  const gTop = await galTop();
  const preY = Math.max(0, gTop - H - 300);           // gallery fully below the fold
  const inY = gTop - 100;                              // gallery in view
  const rec = async ms => { await page.evaluate(() => window.__start()); await page.waitForTimeout(ms); return page.evaluate(() => window.__stop()); };
  const intro = async () => { await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(3500); };
  const shot = async name => { const el = await page.$('#aap-highlights'); const b = await el.boundingBox();
    await page.screenshot({ path: join(FR, `${scenario}-${runTag}-${name}.png`), clip: { x: b.x - 40, y: b.y - 40, width: b.width + 80, height: b.height + 80 } }); };
  const dotCenter = i => page.evaluate(i => { const b = document.querySelectorAll('#aap-highlights .dotnav-link')[i].getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; }, i);

  if (scenario === 'intro-wheel' || scenario === 'intro-jump' || scenario === 'intro-touch' || scenario === 'reduced' || scenario === 'dark') {
    await page.evaluate(y => scrollTo(0, y), preY); await page.waitForTimeout(1500);
    result.pre = await page.evaluate(() => window.__snap()); result.htmlCls = await page.evaluate(() => document.documentElement.className);
    await page.evaluate(() => window.__start());
    const t0 = await page.evaluate(() => performance.now());
    if (scenario === 'intro-wheel') {
      await page.mouse.move(W / 2, H / 2);
      let y = preY; while (y < inY) { await page.mouse.wheel(0, 40); y += 40; await page.waitForTimeout(16); }
    } else { await page.evaluate(y => scrollTo(0, y), inY); }
    result.tScrollStart = t0; result.tScrollEnd = await page.evaluate(() => performance.now());
    await page.waitForTimeout(3500);
    result.frames = await page.evaluate(() => window.__stop());
    if (scenario !== 'intro-wheel') await shot('rest');
    if (scenario === 'reduced' || scenario === 'dark') { result.after = await rec(7500); }
  }
  if (scenario === 'trigger' || scenario === 'trigger-fine' || scenario === 'trigger-touch') {
    // step the page in 8 px increments from preY; log where activation fires and what the dock's inline rise does.
    await page.evaluate(y => scrollTo(0, y), preY); await page.waitForTimeout(1500);
    const steps = [];
    const fine = scenario !== 'trigger';
    // fine: walk 1 px at a time across the band where the coarse walk saw activation (gallery top 59-61 % down the viewport)
    const y0 = fine ? Math.max(0, Math.round(gTop - 0.75 * H)) : preY, step = fine ? 1 : 8;
    for (let y = y0; y <= inY + 200; y += step) {
      await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(60);
      const s = await page.evaluate(() => { const s = window.__snap(); const g = document.querySelector('#highlights-gallery').getBoundingClientRect(); const c = document.querySelector('#aap-highlights').parentElement.getBoundingClientRect(); return { sy: s.sy, cls: s.cls, aapSt: s.aapSt, aapY: s.aap.y, galTop: g.top, galBot: g.bottom, contTop: c.top, contBot: c.bottom, ih: s.ih }; });
      steps.push(s);
      if (steps.length > 2 && /activated/.test(s.cls) && steps.filter(q => /activated/.test(q.cls)).length > (fine ? 5 : 30)) break;
    }
    result.steps = steps;
  }
  if (scenario === 'exit') {
    // after the intro: scroll back above the trigger, wait, scroll past the gallery's end, then return; does the dock leave / replay?
    await intro(); await page.waitForTimeout(800);
    await page.evaluate(() => window.__start());
    result.marks = [];
    const mark = async n => result.marks.push([n, await page.evaluate(() => performance.now())]);
    await mark('up'); await page.evaluate(y => scrollTo(0, y), preY); await page.waitForTimeout(1800);
    await mark('down'); await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(2200);
    const endY = await page.evaluate(() => { const c = document.querySelector('#aap-highlights').parentElement.getBoundingClientRect(); return c.bottom + scrollY + 200; });
    await mark('past'); await page.evaluate(y => scrollTo(0, y), endY); await page.waitForTimeout(1800);
    await mark('back'); await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(2200);
    result.frames = await page.evaluate(() => window.__stop());
  }
  if (scenario === 'slides') {
    // per-frame slide styles through one autoplay advance: are slides flat (translate only)?
    await intro();
    await page.evaluate(() => {
      const items = [...document.querySelectorAll('#highlights-gallery .gallery-item')];
      window.__slides = []; window.__slOn = true;
      const loop = () => { if (!window.__slOn) return;
        window.__slides.push({ t: performance.now(), sl: document.querySelector('#highlights-gallery .scroll-container').scrollLeft,
          s: items.slice(0, 3).map(el => { const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); return [Math.round(b.left * 10) / 10, cs.transform, cs.opacity, cs.filter, cs.borderRadius, cs.clipPath, cs.zIndex, Math.round(b.width), Math.round(b.height)]; }) });
        requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    });
    await page.waitForTimeout(8000);
    result.slides = await page.evaluate(() => { window.__slOn = false; return window.__slides; });
    result.frames = [];
  }
  if (scenario === 'reduced-click') {
    await page.evaluate(y => scrollTo(0, y), inY); await page.waitForTimeout(1500);
    await page.evaluate(() => window.__start());
    result.tPlay = await page.evaluate(() => performance.now());
    await page.click('#aap-highlights .play-pause-button'); await page.mouse.move(5, 5);
    await page.waitForTimeout(2000);
    const [x, y] = await dotCenter(3);
    result.tClick = await page.evaluate(() => performance.now());
    await page.mouse.click(x, y); await page.waitForTimeout(1500);
    result.frames = await page.evaluate(() => window.__stop());
  }
  if (scenario === 'ended') {
    // last slide: jump there by dot, press play, let the fill end, then press replay; also count prefers-color-scheme rules
    result.pcsRules = await page.evaluate(() => { let n = 0; const walk = l => { for (const r of l) { if (r.media && /prefers-color-scheme/.test(r.media.mediaText)) n++; if (r.cssRules) walk(r.cssRules); } }; for (const sh of document.styleSheets) { try { walk(sh.cssRules); } catch (e) {} } return n; });
    await intro(); await page.waitForTimeout(500);
    const [x, y] = await dotCenter(6); await page.mouse.click(x, y); await page.mouse.move(5, 5); await page.waitForTimeout(1500);
    await page.evaluate(() => window.__start());
    result.tPlay = await page.evaluate(() => performance.now());
    await page.click('#aap-highlights .play-pause-button'); await page.mouse.move(5, 5);
    await page.waitForTimeout(7000);
    result.tReplay = await page.evaluate(() => performance.now());
    await page.click('#aap-highlights .play-pause-button'); await page.mouse.move(5, 5);
    await page.waitForTimeout(2000);
    result.frames = await page.evaluate(() => window.__stop());
  }
  if (scenario === 'resize2') {
    // on slide 2 (paused by the dot click), resize 1440 -> 1000 -> 600 -> 1440 while sampling every frame
    await intro(); await page.waitForTimeout(500);
    const [x, y] = await dotCenter(2); await page.mouse.click(x, y); await page.mouse.move(5, 5); await page.waitForTimeout(1600);
    await page.evaluate(() => window.__start()); result.marks = [];
    for (const w of [1000, 600, 1440]) { await page.waitForTimeout(400); result.marks.push([w, await page.evaluate(() => performance.now())]); await page.setViewportSize({ width: w, height: H }); }
    await page.waitForTimeout(800);
    result.frames = await page.evaluate(() => window.__stop());
  }
  if (scenario === 'autoplay') { await intro(); result.frames = await rec(15000); }
  if (scenario === 'click') {
    await intro(); await page.waitForTimeout(1000);
    const [x, y] = await dotCenter(3);
    await page.mouse.move(x, y); await page.waitForTimeout(300);
    await page.evaluate(() => window.__start());
    await page.waitForTimeout(200);
    result.tClick = await page.evaluate(() => performance.now());
    await page.mouse.down(); await page.mouse.up();
    await page.waitForTimeout(2500);
    result.frames = await page.evaluate(() => window.__stop());
    await shot('after-click');
  }
  if (scenario === 'retarget' || scenario === 'retarget-late' || scenario === 'retarget-after') {
    await intro(); await page.waitForTimeout(1000);
    const [x1, y1] = await dotCenter(2); const [x2, y2] = await dotCenter(6);
    await page.evaluate(() => window.__start()); await page.waitForTimeout(150);
    result.tClick1 = await page.evaluate(() => performance.now());
    await page.mouse.click(x1, y1); await page.waitForTimeout({ retarget: 250, 'retarget-late': 600, 'retarget-after': 1300 }[scenario]);
    result.tClick2 = await page.evaluate(() => performance.now());
    await page.mouse.click(x2, y2); await page.waitForTimeout(2500);
    result.frames = await page.evaluate(() => window.__stop());
  }
  if (scenario === 'hover') {
    await intro(); await page.waitForTimeout(500);
    const b = await (await page.$('#aap-highlights .play-pause-button')).boundingBox();
    await page.mouse.move(5, 5); await page.waitForTimeout(400);
    await page.evaluate(() => window.__start()); await page.waitForTimeout(100);
    result.tHover = await page.evaluate(() => performance.now()); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(500);
    result.tDown = await page.evaluate(() => performance.now()); await page.mouse.down(); await page.waitForTimeout(400);
    await shot('btn-pressed');
    result.tUp = await page.evaluate(() => performance.now()); await page.mouse.up(); await page.waitForTimeout(500);
    const [dx, dy] = await dotCenter(5);
    result.tDotHover = await page.evaluate(() => performance.now()); await page.mouse.move(dx, dy); await page.waitForTimeout(600);
    await shot('dot-hover');
    result.tLeave = await page.evaluate(() => performance.now()); await page.mouse.move(5, 5); await page.waitForTimeout(500);
    result.frames = await page.evaluate(() => window.__stop());
  }
  if (scenario === 'pause' || scenario === 'idle') {
    await intro(); await page.waitForTimeout(800);
    await page.evaluate(() => window.__start()); await page.waitForTimeout(150);
    result.tClick = await page.evaluate(() => performance.now());
    await page.click('#aap-highlights .play-pause-button'); await page.mouse.move(5, 5);
    await page.waitForTimeout(scenario === 'idle' ? 6000 : 2000);
    result.frames = await page.evaluate(() => window.__stop());
    result.anims = await page.evaluate(() => document.getAnimations().map(a => ({ n: a.animationName || a.transitionProperty || a.constructor.name, st: a.playState, tgt: (a.effect?.target?.className || '').toString().slice(0, 60), pseudo: a.effect?.pseudoElement || '' })));
    if (scenario === 'idle') await shot('paused-rest');
  }
  if (scenario === 'drag') {
    await intro(); await page.waitForTimeout(1000);
    const g = await page.evaluate(() => { const b = document.querySelector('#highlights-gallery .scroll-container').getBoundingClientRect(); return [b.top + b.height / 2]; });
    const touchMove = async (x0, x1, ms, steps, hold = 0) => {
      const y = g[0];
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y }] });
      for (let i = 1; i <= steps; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x0 + (x1 - x0) * i / steps, y }] }); await page.waitForTimeout(ms / steps); }
      if (hold) { for (let i = 0; i < 10; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x1, y }] }); await page.waitForTimeout(hold / 10); } }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    };
    // slow drag of 30% width (sub-threshold), then fast flick of 30%, then a hold-and-drag to read 1:1 tracking
    result.legs = [];
    // edge: drag toward the start on slide 0 (rubber-band probe); hold30: slow 30 % drag, held still 400 ms, then released
    for (const [name, frac, ms, steps, hold] of [['edge', -0.3, 600, 20, 0], ['slow30', 0.3, 900, 30, 0], ['fast30', 0.3, 90, 4, 0], ['slow60', 0.6, 1200, 40, 0], ['hold30', 0.3, 900, 30, 400]]) {
      await page.evaluate(() => window.__start());
      const t = await page.evaluate(() => performance.now());
      await touchMove(frac < 0 ? W * 0.2 : W * 0.8, frac < 0 ? W * (0.2 - frac) : W * (0.8 - frac), ms, steps, hold);
      const tEnd = await page.evaluate(() => performance.now());
      await page.waitForTimeout(2500);
      result.legs.push({ name, frac, ms, t, tEnd, frames: await page.evaluate(() => window.__stop()) });
    }
  }
  if (scenario === 'resize') {
    await intro(); await page.waitForTimeout(800);
    const geo = async () => page.evaluate(() => window.__snap());
    result.at = [];
    for (const w of [1440, 1068, 834, 734, 390]) { await page.setViewportSize({ width: w, height: H }); await page.waitForTimeout(900); result.at.push({ w, s: await geo() }); }
    await page.setViewportSize({ width: 1440, height: H }); await page.waitForTimeout(100);
    await page.evaluate(() => window.__start()); await page.setViewportSize({ width: 390, height: H }); await page.waitForTimeout(1200);
    result.frames = await page.evaluate(() => window.__stop());
  }
  meta.loadEnd = load();
  const frames = result.frames || [];
  if (frames.length > 1) { const dts = frames.slice(1).map((f, i) => f.t - frames[i].t).sort((a, b) => a - b); meta.frameDt = { n: dts.length, p50: dts[dts.length >> 1], p95: dts[Math.floor(dts.length * 0.95)], max: dts[dts.length - 1] }; }
  writeFileSync(join(OUT, `${scenario}-${runTag}-${W}.json`), JSON.stringify({ meta, ...result }));
  console.log(JSON.stringify(meta));
} finally { await browser.close(); }
