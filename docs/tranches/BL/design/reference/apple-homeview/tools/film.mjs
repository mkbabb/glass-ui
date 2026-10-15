// film.mjs: per-rAF sampler + optional CDP screencast for apple.com/apple-homeview's
// highlights gallery and its all-access-pass media dock (#aap-highlights).
// One Chromium (headless) per run; every page/context/browser closed in finally.
//
// usage: node film.mjs <outDir> <framesScratchDir> <scenario,...|all>
//
// Sampling clock: a rAF callback registered at document start (before the page's own
// rAF users), so each row reads the styles committed by the PREVIOUS frame's script.
// Each row carries t = performance.now() (ms) and wall = timeOrigin + t (ms) so that
// screencast frames (metadata.timestamp, s) can be matched to rows.
import { chromium } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const URL_ = 'https://www.apple.com/apple-homeview/';
const [, , OUT = './samples', FRAMES = './frames-raw', WHICH = 'all'] = process.argv;
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(FRAMES, { recursive: true });

const SAMPLER = `
(() => {
  const S = window.__S = { on: false, rows: [], marks: [] };
  const num = (v) => { const f = parseFloat(v); return Number.isFinite(f) ? +f.toFixed(3) : v; };
  const R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return [+r.x.toFixed(2), +r.y.toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)]; };
  let E = null;
  const grab = () => {
    const aap = document.querySelector('#aap-highlights');
    if (!aap) return null;
    const g = document.querySelector('#highlights-gallery');
    return {
      aap, g,
      intro: aap.querySelector('.all-access-pass__intro-element'),
      b0: aap.querySelector('.aap-media-card-gallery__timed-dotnav'),
      b0bg: aap.querySelector('.aap-media-card-gallery__timed-dotnav > .all-access-pass__background'),
      b1: aap.querySelector('.play-pause-button-wrapper'),
      b1bg: aap.querySelector('.play-pause-button-wrapper > .all-access-pass__background'),
      btn: aap.querySelector('.play-pause-button'),
      items: [...aap.querySelectorAll('.aap-media-card-gallery__dotnav-item')],
      links: [...aap.querySelectorAll('.aap-media-card-gallery__dotnav-item .dotnav-link')],
      sc: g.querySelector('.scroll-container'),
      slides: [...g.querySelectorAll('.item-container > .gallery-item')],
      caps: [...g.querySelectorAll('.item-container > .gallery-item .caption-animation-container')],
    };
  };
  const cs = (e, p) => e ? getComputedStyle(e, p) : null;
  const bg = (e) => { if (!e) return null; const c = cs(e); return { w: e.style.width, h: e.style.height, tf: e.style.transform, scale: c.getPropertyValue('--scale').trim(), op: num(c.opacity), bf: c.backdropFilter, bc: c.backgroundColor, br: c.borderRadius, r: R(e) }; };
  const sample = () => {
    if (!E || !E.aap.isConnected) E = grab();
    if (!E) return { t: performance.now(), none: true };
    const t = performance.now();
    const c0 = cs(E.b0), c1 = cs(E.b1);
    const ci = cs(E.intro);
    const cur = E.links.findIndex((l) => l.classList.contains('current'));
    return {
      t: +t.toFixed(2), wall: +(performance.timeOrigin + t).toFixed(2), sy: scrollY, vw: innerWidth,
      aapCls: E.aap.className, gCls: E.g.className,
      aap: { r: R(E.aap), tf: E.aap.style.transform },
      intro: { r: R(E.intro), tf: E.intro.style.transform, w: E.intro.style.width, h: E.intro.style.height, op: num(ci.opacity), disp: ci.display, bc: ci.backgroundColor },
      b0: { r: R(E.b0), tf: E.b0.style.transform, alpha: c0.getPropertyValue('--alpha').trim(), pIntro: c0.getPropertyValue('--progress-intro').trim(), op: num(c0.opacity) },
      b0bg: bg(E.b0bg),
      b1: { r: R(E.b1), tf: E.b1.style.transform, alpha: c1.getPropertyValue('--alpha').trim(), op: num(c1.opacity) },
      b1bg: bg(E.b1bg),
      btn: (() => { const c = cs(E.btn); const vis = [...E.btn.querySelectorAll('svg')].filter((s) => getComputedStyle(s).display !== 'none').map((s) => s.classList[2]); return { op: num(c.opacity), tf: c.transform, bc: c.backgroundColor, icon: vis.join('|'), r: R(E.btn) }; })(),
      dots: E.links.map((l, i) => { const ci = cs(E.items[i]); const ca = cs(l, '::after'); return [i, +l.getBoundingClientRect().width.toFixed(2), +l.getBoundingClientRect().x.toFixed(2), num(ci.opacity), ci.transform, E.items[i].style.transform, l === E.links[cur] ? num(ca.width) : null, cs(l).backgroundColor]; }),
      cur,
      prog: E.g.style.getPropertyValue('--autoplay-progress'),
      sl: +E.sc.scrollLeft.toFixed(2),
      slides: E.slides.map((s) => { const r = s.getBoundingClientRect(); return +r.x.toFixed(1); }),
      caps: E.caps.map((c) => { const k = cs(c); return [num(k.opacity), k.transform]; }),
    };
  };
  const loop = () => { if (S.on) S.rows.push(sample()); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  S.start = (label) => { S.rows = []; S.marks = []; S.label = label; S.on = true; };
  S.stop = () => { S.on = false; return S.rows; };
  S.mark = (m) => S.marks.push({ m, t: +performance.now().toFixed(2) });
  S.one = sample;
})();
`;

const load1 = () => os.loadavg().map((x) => x.toFixed(2)).join(' ');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage(browser, opts = {}) {
  const ctx = await browser.newContext({
    viewport: opts.viewport ?? { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: opts.reducedMotion ?? 'no-preference',
    colorScheme: opts.colorScheme ?? 'light',
    hasTouch: !!opts.touch, isMobile: !!opts.touch,
    userAgent: opts.touch ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' : undefined,
  });
  await ctx.addInitScript(SAMPLER);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await page.goto(URL_, { waitUntil: 'load', timeout: 90000 });
  await page.waitForFunction(() => document.querySelector('#aap-highlights') && document.documentElement.classList.contains('enhanced'), null, { timeout: 30000 }).catch(() => {});
  await sleep(2500);
  return { ctx, page, cdp };
}

// geometry of the AAP trigger: start = a0t - 100vh + 0.6*a0h ; end = a1b - 75vh
async function geom(page) {
  return page.evaluate(() => {
    const g = document.querySelector('#highlights-gallery');
    const sec = g.closest('section');
    const top = g.getBoundingClientRect().top + scrollY, h = g.getBoundingClientRect().height;
    const sb = sec.getBoundingClientRect().bottom + scrollY;
    return { galTop: top, galH: h, secBottom: sb, vh: innerHeight, start: top - innerHeight + 0.6 * h, end: sb - 0.75 * innerHeight, docH: document.documentElement.scrollHeight };
  });
}

// constant-velocity scroll driven inside the page by rAF; resolves when done
async function rafScroll(page, from, to, pxPerS) {
  await page.evaluate(({ from, to, v }) => new Promise((res) => {
    scrollTo(0, from); const t0 = performance.now(); const d = to - from; const T = Math.abs(d) / v * 1000;
    const step = () => { const k = Math.min(1, (performance.now() - t0) / T); scrollTo(0, from + d * k); if (k < 1) requestAnimationFrame(step); else res(); };
    requestAnimationFrame(step);
  }), { from, to, v: pxPerS });
}

async function screencast(cdp, dir, on) {
  if (!on) { await cdp.send('Page.stopScreencast').catch(() => {}); return; }
  fs.mkdirSync(dir, { recursive: true });
  let n = 0;
  cdp.on('Page.screencastFrame', async (f) => {
    const name = `${String(n++).padStart(4, '0')}_${(f.metadata.timestamp * 1000).toFixed(1)}.jpg`;
    try { fs.writeFileSync(path.join(dir, name), Buffer.from(f.data, 'base64')); } catch {}
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 85, everyNthFrame: 1 });
}

async function save(name, page, extra = {}) {
  const rows = await page.evaluate(() => window.__S.stop());
  const marks = await page.evaluate(() => window.__S.marks);
  const out = { scenario: name, load: load1(), ...extra, marks, rows };
  fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(out));
  console.log(`${name}: ${rows.length} rows, load ${out.load}`);
}

const mark = (page, m) => page.evaluate((m) => window.__S.mark(m), m);
const startS = (page, l) => page.evaluate((l) => window.__S.start(l), l);

// settle at the gallery resting position (dock in view, intro played) then return geometry
async function enterAndSettle(page) {
  const G = await geom(page);
  await page.evaluate((y) => scrollTo(0, y), Math.round(G.galTop + G.galH / 2 - G.vh / 2));
  await sleep(2600);
  return G;
}

const S = {};

S['init-slow'] = async (b) => {
  const { ctx, page, cdp } = await newPage(b);
  try {
    const G = await geom(page);
    await screencast(cdp, path.join(FRAMES, 'init-slow'), true);
    await startS(page, 'init-slow'); await mark(page, `scroll ${G.start - 400}->${G.start + 300} @300px/s`);
    await rafScroll(page, Math.round(G.start - 400), Math.round(G.start + 300), 300);
    await mark(page, 'scroll-end'); await sleep(2000);
    await screencast(cdp, null, false);
    await save('init-slow', page, { geom: G });
  } finally { await page.close(); await ctx.close(); }
};

S['init-fast'] = async (b) => {
  const { ctx, page, cdp } = await newPage(b);
  try {
    const G = await geom(page);
    await screencast(cdp, path.join(FRAMES, 'init-fast'), true);
    await startS(page, 'init-fast'); await mark(page, `scroll ${G.start - 900}->${G.start + 600} @6000px/s`);
    await rafScroll(page, Math.round(G.start - 900), Math.round(G.start + 600), 6000);
    await mark(page, 'scroll-end'); await sleep(2200);
    await screencast(cdp, null, false);
    await save('init-fast', page, { geom: G });
  } finally { await page.close(); await ctx.close(); }
};

S['init-below'] = async (b) => {
  const { ctx, page } = await newPage(b);
  try {
    const G = await geom(page);
    await page.evaluate((y) => scrollTo(0, y), Math.round(G.end + 1200)); await sleep(1500);
    await startS(page, 'init-below'); await mark(page, `scroll up ${G.end + 1200}->${G.end - 300} @1500px/s`);
    await rafScroll(page, Math.round(G.end + 1200), Math.round(G.end - 300), 1500);
    await mark(page, 'scroll-end'); await sleep(2200);
    await save('init-below', page, { geom: G });
  } finally { await page.close(); await ctx.close(); }
};

S['replay'] = async (b) => {
  const { ctx, page } = await newPage(b);
  try {
    const G = await enterAndSettle(page);
    await startS(page, 'replay');
    await mark(page, 'exit-up'); await rafScroll(page, Math.round(G.galTop + G.galH / 2 - G.vh / 2), Math.round(G.start - 1500), 4000); await sleep(800);
    await mark(page, 're-enter'); await rafScroll(page, Math.round(G.start - 1500), Math.round(G.start + 300), 4000); await sleep(2000);
    await mark(page, 'exit-down'); await rafScroll(page, Math.round(G.start + 300), Math.round(G.end + 1500), 6000); await sleep(800);
    await mark(page, 're-enter-below'); await rafScroll(page, Math.round(G.end + 1500), Math.round(G.end - 300), 6000); await sleep(2000);
    await save('replay', page, { geom: G });
  } finally { await page.close(); await ctx.close(); }
};

S['autoplay'] = async (b) => {
  const { ctx, page, cdp } = await newPage(b);
  try {
    const G = await geom(page);
    await page.evaluate((y) => scrollTo(0, y), Math.round(G.galTop + G.galH / 2 - G.vh / 2));
    await startS(page, 'autoplay'); await mark(page, 'entered (jump)');
    await sleep(5200);
    await screencast(cdp, path.join(FRAMES, 'autoplay-advance'), true);
    await sleep(2800);
    await screencast(cdp, null, false);
    await sleep(6500);
    await save('autoplay', page, { geom: G });
  } finally { await page.close(); await ctx.close(); }
};

S['dotclick'] = async (b) => {
  const { ctx, page, cdp } = await newPage(b);
  try {
    await enterAndSettle(page);
    await screencast(cdp, path.join(FRAMES, 'dotclick'), true);
    await startS(page, 'dotclick'); await sleep(150);
    await mark(page, 'click dot 4'); await page.locator('#aap-highlights .dotnav-link').nth(3).click();
    await sleep(1700);
    await screencast(cdp, null, false);
    await mark(page, 'click dot 3 (adjacent)'); await page.locator('#aap-highlights .dotnav-link').nth(2).click();
    await sleep(1600);
    await save('dotclick', page);
  } finally { await page.close(); await ctx.close(); }
};

S['retarget'] = async (b) => {
  const { ctx, page } = await newPage(b);
  try {
    await enterAndSettle(page);
    await startS(page, 'retarget'); await sleep(100);
    await mark(page, 'click dot 6'); await page.locator('#aap-highlights .dotnav-link').nth(5).click();
    await sleep(300);
    await mark(page, 'click dot 2 at +300ms'); await page.locator('#aap-highlights .dotnav-link').nth(1).click({ force: true });
    await sleep(2400);
    await save('retarget', page);
  } finally { await page.close(); await ctx.close(); }
};

S['playpause'] = async (b) => {
  const { ctx, page, cdp } = await newPage(b);
  try {
    await enterAndSettle(page);
    const btn = page.locator('#aap-highlights .play-pause-button');
    const bb = await btn.boundingBox();
    await screencast(cdp, path.join(FRAMES, 'playpause'), true);
    await startS(page, 'playpause'); await sleep(100);
    await mark(page, 'hover'); await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 4 }); await sleep(400);
    await mark(page, 'down'); await page.mouse.down(); await sleep(400);
    await mark(page, 'up (toggle pause)'); await page.mouse.up(); await sleep(700);
    await mark(page, 'click (toggle play)'); await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await sleep(700);
    await mark(page, 'leave'); await page.mouse.move(bb.x - 300, bb.y - 200, { steps: 4 }); await sleep(500);
    await screencast(cdp, null, false);
    await save('playpause', page);
  } finally { await page.close(); await ctx.close(); }
};

S['hoverdot'] = async (b) => {
  const { ctx, page } = await newPage(b);
  try {
    await enterAndSettle(page);
    const d = await page.locator('#aap-highlights .dotnav-link').nth(4).boundingBox();
    await startS(page, 'hoverdot'); await sleep(100);
    await mark(page, 'hover dot 5'); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2, { steps: 3 }); await sleep(600);
    await mark(page, 'down'); await page.mouse.down(); await sleep(300); await page.mouse.move(d.x - 400, d.y - 300); await page.mouse.up();
    await mark(page, 'leave (cancelled press)'); await sleep(600);
    await save('hoverdot', page);
  } finally { await page.close(); await ctx.close(); }
};

S['keyboard'] = async (b) => {
  const { ctx, page } = await newPage(b);
  try {
    await enterAndSettle(page);
    await page.locator('#aap-highlights .dotnav-link.current').focus();
    await startS(page, 'keyboard'); await sleep(100);
    await mark(page, 'ArrowRight'); await page.keyboard.press('ArrowRight'); await sleep(1500);
    await mark(page, 'End'); await page.keyboard.press('End'); await sleep(1700);
    await mark(page, 'Home'); await page.keyboard.press('Home'); await sleep(1700);
    await mark(page, 'ArrowLeft (at 0)'); await page.keyboard.press('ArrowLeft'); await sleep(1500);
    await save('keyboard', page);
  } finally { await page.close(); await ctx.close(); }
};

S['wheel-x'] = async (b) => {
  const { ctx, page, cdp } = await newPage(b);
  try {
    await enterAndSettle(page);
    const r = await page.locator('#highlights-gallery .scroll-container').boundingBox();
    const x = r.x + r.width / 2, y = r.y + r.height / 3;
    await startS(page, 'wheel-x'); await sleep(100);
    await mark(page, 'synth mouse-wheel scroll x -300px @800px/s');
    await cdp.send('Input.synthesizeScrollGesture', { x, y, xDistance: -300, yDistance: 0, speed: 800, gestureSourceType: 'mouse', preventFling: true });
    await mark(page, 'gesture-end'); await sleep(1800);
    await mark(page, 'overscroll at start: wheel x +600 from index');
    await cdp.send('Input.synthesizeScrollGesture', { x, y, xDistance: 4000, yDistance: 0, speed: 6000, gestureSourceType: 'mouse', preventFling: true });
    await mark(page, 'gesture-end'); await sleep(1500);
    await save('wheel-x', page);
  } finally { await page.close(); await ctx.close(); }
};

// touch gestures at phone width; raw Input.dispatchTouchEvent so drags are exact
async function touchPath(cdp, pts, dtMs) {
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: pts[0][0], y: pts[0][1] }] });
  for (let i = 1; i < pts.length; i++) { await sleep(dtMs); await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: pts[i][0], y: pts[i][1] }] }); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
}
const lin = (x0, x1, y, n) => Array.from({ length: n + 1 }, (_, i) => [x0 + (x1 - x0) * i / n, y]);

S['touch'] = async (b) => {
  const { ctx, page, cdp: c2 } = await newPage(b, { viewport: { width: 390, height: 844 }, touch: true });
  try {
    await enterAndSettle(page);
    const r = await page.locator('#highlights-gallery .scroll-container').boundingBox();
    const y = r.y + Math.min(r.height / 3, 200), cx = 195;
    await startS(page, 'touch'); await sleep(100);
    await mark(page, 'slow drag -120px over 1.2s, release still'); await touchPath(c2, [...lin(cx + 60, cx - 60, y, 60), ...Array(8).fill([cx - 60, y])], 20); await sleep(1600);
    await mark(page, 'fast fling -160px over 100ms'); await touchPath(c2, lin(cx + 80, cx - 80, y, 6), 16); await sleep(2200);
    await mark(page, 'drag -150 then reverse +200, release moving'); await touchPath(c2, [...lin(cx + 80, cx - 70, y, 20), ...lin(cx - 70, cx + 130, y, 14)], 16); await sleep(2000);
    await mark(page, 'overscroll at index 0: scroll to 0 first'); await page.evaluate(() => document.querySelector('#highlights-gallery .scroll-container').scrollTo({ left: 0, behavior: 'instant' })); await sleep(900);
    await mark(page, 'drag +200px at start (overscroll), hold, release'); await touchPath(c2, [...lin(cx - 100, cx + 100, y, 30), ...Array(6).fill([cx + 100, y])], 16); await sleep(1500);
    await save('touch', page);
  } finally { await page.close(); await ctx.close(); }
};

S['ended'] = async (b) => {
  const { ctx, page } = await newPage(b);
  try {
    await enterAndSettle(page);
    await page.locator('#aap-highlights .dotnav-link').nth(6).click(); await sleep(1500);
    await page.locator('#aap-highlights .play-pause-button').click(); // play from last slide
    await startS(page, 'ended'); await mark(page, 'playing on last slide');
    await sleep(7000);
    await mark(page, 'click replay'); await page.locator('#aap-highlights .play-pause-button').click();
    await sleep(2200);
    await save('ended', page);
  } finally { await page.close(); await ctx.close(); }
};

S['resize'] = async (b) => {
  const { ctx, page } = await newPage(b);
  try {
    await enterAndSettle(page);
    await page.locator('#aap-highlights .dotnav-link').nth(2).click(); await sleep(1500);
    await startS(page, 'resize'); await sleep(100);
    await mark(page, 'resize 1440->1000'); await page.setViewportSize({ width: 1000, height: 900 }); await sleep(1500);
    await mark(page, 'resize 1000->600'); await page.setViewportSize({ width: 600, height: 900 }); await sleep(1500);
    await mark(page, 'resize 600->1440'); await page.setViewportSize({ width: 1440, height: 900 }); await sleep(1500);
    await save('resize', page);
  } finally { await page.close(); await ctx.close(); }
};

S['reduced'] = async (b) => {
  const { ctx, page } = await newPage(b, { reducedMotion: 'reduce' });
  try {
    const G = await geom(page);
    const html = await page.evaluate(() => document.documentElement.className);
    await startS(page, 'reduced'); await mark(page, 'jump into view');
    await page.evaluate((y) => scrollTo(0, y), Math.round(G.galTop + G.galH / 2 - G.vh / 2)); await sleep(2500);
    await mark(page, 'click dot 4'); await page.locator('#aap-highlights .dotnav-link').nth(3).click(); await sleep(1500);
    await mark(page, 'click play'); await page.locator('#aap-highlights .play-pause-button').click(); await sleep(3000);
    await save('reduced', page, { htmlClass: html, geom: G });
  } finally { await page.close(); await ctx.close(); }
};

S['mobile'] = async (b) => {
  const { ctx, page, cdp } = await newPage(b, { viewport: { width: 390, height: 844 }, touch: true });
  try {
    const G = await geom(page);
    await screencast(cdp, path.join(FRAMES, 'mobile-init'), true);
    await startS(page, 'mobile'); await mark(page, 'scroll @1200px/s');
    await rafScroll(page, Math.round(G.start - 500), Math.round(G.start + 400), 1200);
    await sleep(2200);
    await screencast(cdp, null, false);
    await save('mobile', page, { geom: G });
  } finally { await page.close(); await ctx.close(); }
};

const names = WHICH === 'all' ? Object.keys(S) : WHICH.split(',');
const browser = await chromium.launch({ headless: true });
try {
  console.log(`chromium ${browser.version()} load ${load1()}`);
  for (const n of names) {
    try { await S[n](browser); } catch (e) { console.log(`${n}: ERROR ${e.message.split('\n')[0]}`); }
  }
} finally { await browser.close(); }
