// Depth scan: how a page puts text behind and in front of a figure, and what moves
// its layers under scroll. One browser per run; a new context per mode; all closed in finally.
//
// Modes (each its own context): wide 1440x900 (frames + rates + per-frame writes + CDP
// layout counts), prm (1440, reduced motion: rates only + rest frame), narrow 390x844
// (rates + frames + coverage).
//
// What it reads:
//  - large text (>= 40 px; 28 px at 390): a 7x3 grid of points inside each line box;
//    at each point, is the topmost element the text itself or something else (a figure
//    painted over it)? Covered fraction, what covers it, stacking facts of both.
//  - a whole-document census of depth properties: animation-timeline, view/scroll
//    timelines, mask-image, clip-path, mix-blend-mode, sticky, preserve-3d, perspective,
//    background-clip:text, fixed backgrounds.
//  - libraries (gsap/ScrollTrigger, Lenis, Locomotive, Framer, three), canvases, videos.
//  - CSS text from the network: counts of the scroll-driven and masking features.
//  - under wheel scroll in 100 px steps: each tracked element's viewport top and its
//    computed transform/opacity/clip-path, so a layer's rate is d(top) per 100 px.
//  - which elements get inline style writes per frame (a scroll listener), and Chromium's
//    layout and style-recalc counts across the scroll.
//
// usage: node scan.mjs <chromium|webkit> <out.json> <frameDir> <name> <url> [--steps=N] [--modes=wide,prm,narrow] [--wait=ms]
import { chromium, webkit } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const [engine, out, FR, name, url] = process.argv.slice(2);
const opt = (k, d) => { const a = process.argv.find(x => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const STEPS = +opt('steps', 28);
const MODES = opt('modes', 'wide,prm,narrow').split(',');
const WAIT = +opt('wait', 5000);
const GATE = opt('gate', '') ? (await import('node:fs')).readFileSync(new URL('./gate.js', import.meta.url), 'utf8') : null;
mkdirSync(FR, { recursive: true });

const R = { engine, name, url, at: new Date().toISOString(), modes: {} };
const browser = await (engine === 'webkit' ? webkit : chromium).launch({ headless: true });

// ---- in-page helpers (stringified into the page) ----
const PAGE_LIB = () => {
  const key = (n) => { if (!n || !n.tagName) return String(n); const c = String(n.className?.baseVal ?? n.className ?? '').trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.'); return n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + (c ? '.' + c : ''); };
  const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.02; };
  const ownText = (el) => [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').replace(/\s+/g, ' ').trim();
  const stackFacts = (el) => {
    const cs = getComputedStyle(el);
    const f = { pos: cs.position, z: cs.zIndex };
    if (cs.isolation !== 'auto') f.iso = cs.isolation;
    if (cs.transform !== 'none') f.tf = cs.transform.slice(0, 60);
    if (+cs.opacity < 1) f.op = cs.opacity;
    if (cs.mixBlendMode !== 'normal') f.blend = cs.mixBlendMode;
    const mi = cs.maskImage || cs.webkitMaskImage; if (mi && mi !== 'none') f.mask = mi.slice(0, 80);
    if (cs.clipPath !== 'none') f.clip = cs.clipPath.slice(0, 80);
    if (cs.willChange !== 'auto') f.wc = cs.willChange;
    if (cs.filter !== 'none') f.filter = cs.filter.slice(0, 40);
    if (cs.animationTimeline && cs.animationTimeline !== 'auto') f.tl = cs.animationTimeline;
    return f;
  };
  // the chain of positioned / stacking ancestors up to body, compact
  const chain = (el) => { const a = []; for (let n = el; n && n !== document.body && a.length < 8; n = n.parentElement) { const f = stackFacts(n); if (f.pos !== 'static' || f.z !== 'auto' || Object.keys(f).length > 2) a.push(key(n) + ' ' + JSON.stringify(f)); } return a; };
  const bigText = (minPx) => {
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      if (out.length >= 24) break;
      const t = ownText(el); if (t.length < 2) continue;
      const cs = getComputedStyle(el); if (parseFloat(cs.fontSize) < minPx) continue;
      if (!vis(el)) continue;
      const r = el.getBoundingClientRect(); if (r.bottom < -2000 || r.top > innerHeight * 4) continue;
      out.push(el);
    }
    return out;
  };
  const coverage = (el) => {
    // text line boxes via a Range so empty padding is not sampled
    const rg = document.createRange(); rg.selectNodeContents(el); const rects = [...rg.getClientRects()].filter(r => r.width > 4 && r.height > 4);
    let n = 0, cov = 0; const by = {};
    for (const r of rects.slice(0, 6)) for (let i = 1; i <= 7; i++) for (let j = 1; j <= 3; j++) {
      const x = r.left + r.width * i / 8, y = r.top + r.height * j / 4;
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
      n++;
      const top = document.elementFromPoint(x, y);
      if (top && !(el === top || el.contains(top) || top.contains(el))) { cov++; const k = key(top); by[k] = (by[k] || 0) + 1; }
    }
    return { pts: n, covered: cov, by };
  };
  window.__D = { key, vis, ownText, stackFacts, chain, bigText, coverage };
};

const CENSUS = () => {
  const { key, stackFacts } = window.__D;
  const C = { timeline: [], viewTl: [], scrollTl: [], mask: [], clip: [], blend: [], sticky: [], fixed: [], p3d: [], persp: [], bgClipText: [], bgFixed: [], willChange: [] };
  const all = document.querySelectorAll('body *');
  let n = 0;
  for (const el of all) {
    if (++n > 12000) break;
    const cs = getComputedStyle(el);
    const add = (k, v) => { if (C[k].length < 12) C[k].push(key(el) + (v ? ' ' + v : '')); C[k + 'N'] = (C[k + 'N'] || 0) + 1; };
    if (cs.animationTimeline && cs.animationTimeline !== 'auto') add('timeline', cs.animationTimeline + ' ' + cs.animationName + ' ' + (cs.animationRange || ''));
    if (cs.viewTimelineName && cs.viewTimelineName !== 'none') add('viewTl', cs.viewTimelineName);
    if (cs.scrollTimelineName && cs.scrollTimelineName !== 'none') add('scrollTl', cs.scrollTimelineName);
    const mi = cs.maskImage || cs.webkitMaskImage; if (mi && mi !== 'none') add('mask', mi.slice(0, 90));
    if (cs.clipPath !== 'none') add('clip', cs.clipPath.slice(0, 90));
    if (cs.mixBlendMode !== 'normal') add('blend', cs.mixBlendMode);
    if (cs.position === 'sticky') add('sticky', 'top=' + cs.top);
    if (cs.position === 'fixed') add('fixed');
    if (cs.transformStyle === 'preserve-3d') add('p3d');
    if (cs.perspective !== 'none') add('persp', cs.perspective);
    if ((cs.backgroundClip || cs.webkitBackgroundClip) === 'text' || cs.webkitBackgroundClip === 'text') add('bgClipText');
    if (cs.backgroundAttachment === 'fixed') add('bgFixed');
    if (cs.willChange !== 'auto') add('willChange', cs.willChange);
  }
  C.elements = n;
  C.libs = { gsap: !!window.gsap, ScrollTrigger: !!(window.ScrollTrigger || window.gsap?.plugins?.scrollTrigger), lenis: !!(window.lenis || window.Lenis || document.documentElement.classList.contains('lenis')), locomotive: !!document.querySelector('[data-scroll-container]'), framer: !!document.querySelector('[data-framer-name],[data-framer-component-type]'), three: !!window.THREE || !!window.__THREE__, webflow: !!window.Webflow };
  C.canvas = [...document.querySelectorAll('canvas')].filter(c => c.width > 200).slice(0, 6).map(c => { const r = c.getBoundingClientRect(); return key(c) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' @' + Math.round(r.top + scrollY); });
  C.video = [...document.querySelectorAll('video')].slice(0, 6).map(v => { const r = v.getBoundingClientRect(); return key(v) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' @' + Math.round(r.top + scrollY) + (v.autoplay ? ' autoplay' : '') + (v.loop ? ' loop' : ''); });
  return C;
};

const TEXT_SCAN = (minPx) => {
  const { key, bigText, coverage, chain, stackFacts, ownText } = window.__D;
  const els = bigText(minPx);
  window.__T = els;
  const texts = els.map(el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); const t = ownText(el);
    // a duplicate: another element with the same own text
    let dup = 0; const dups = [];
    for (const o of document.querySelectorAll('body *')) { if (o !== el && ownText(o) === t) { dup++; if (dups.length < 3) { let hid = null; for (let n = o; n; n = n.parentElement) if (n.getAttribute?.('aria-hidden') === 'true') { hid = key(n); break; } dups.push(key(o) + (hid ? ' aria-hidden@' + hid : '') + ' ' + JSON.stringify(stackFacts(o))); } } }
    let hid = null; for (let n = el; n; n = n.parentElement) if (n.getAttribute?.('aria-hidden') === 'true') { hid = key(n); break; }
    return { key: key(el), text: t.slice(0, 60), fs: cs.fontSize, color: cs.color, box: [r.left, r.top + scrollY, r.width, r.height].map(Math.round), self: stackFacts(el), chain: chain(el), ariaHiddenAt: hid, dup, dups, cover: coverage(el) };
  });
  return texts;
};

// pick tracked layers: big text + the largest media in the first viewports + sticky/fixed-ish
const PICK = () => {
  const { key, vis } = window.__D;
  const media = [...document.querySelectorAll('img,picture,video,canvas,svg,[style*="background-image"]')].filter(e => { if (!vis(e)) return false; const r = e.getBoundingClientRect(); return r.width * r.height > 40000 && r.top + scrollY < innerHeight * 3.5; })
    .sort((a, b) => { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); return (rb.width * rb.height) - (ra.width * ra.height); }).slice(0, 8);
  const T = (window.__T || []).filter(e => e.getBoundingClientRect().top + scrollY < innerHeight * 3.5).slice(0, 8);
  window.__P = [...T.map(e => ['text', e]), ...media.map(e => ['media', e])];
  return window.__P.map(([k, e]) => k + ' ' + key(e));
};
const SAMPLE = () => window.__P.map(([k, e]) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return [Math.round(r.top * 10) / 10, cs.transform === 'none' ? 0 : cs.transform.slice(0, 70), +(+cs.opacity).toFixed(3), cs.clipPath === 'none' ? 0 : cs.clipPath.slice(0, 50), Math.round(r.height)]; });

const WRITES_ON = () => {
  window.__W = { writes: new Map(), cls: 0, frames: 0, on: true };
  const { key } = window.__D;
  new MutationObserver(ms => { for (const m of ms) { if (m.attributeName === 'style') { const k = key(m.target); window.__W.writes.set(k, (window.__W.writes.get(k) || 0) + 1); } else window.__W.cls++; } }).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
  const tick = () => { if (!window.__W.on) return; window.__W.frames++; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
};
const WRITES_OFF = () => { window.__W.on = false; return { frames: window.__W.frames, classChanges: window.__W.cls, writers: [...window.__W.writes.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20) }; };

async function metrics(cdp) { if (!cdp) return null; const { metrics } = await cdp.send('Performance.getMetrics'); const m = Object.fromEntries(metrics.map(x => [x.name, x.value])); return [m.LayoutCount, m.RecalcStyleCount, m.LayoutDuration, m.RecalcStyleDuration]; }

async function runMode(mode) {
  const narrow = mode === 'narrow';
  const ctx = await browser.newContext({ viewport: narrow ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: mode === 'prm' ? 'reduce' : 'no-preference', locale: 'en-US' });
  const M = {};
  const css = [];
  try {
    const page = await ctx.newPage();
    if (mode === 'wide') page.on('response', async (res) => { try { const ct = res.headers()['content-type'] || ''; if (/text\/css/.test(ct) || res.request().resourceType() === 'stylesheet') { const t = await res.text(); css.push([res.url(), t]); } } catch {} });
    const cdp = engine === 'chromium' && mode === 'wide' ? await ctx.newCDPSession(page) : null;
    if (cdp) await cdp.send('Performance.enable');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(WAIT);
    if (GATE) { M.gate = await page.evaluate(GATE).catch(e => 'gate-err ' + e.message); await page.waitForTimeout(2500); }
    await page.mouse.move(narrow ? 195 : 720, narrow ? 420 : 450);
    await page.evaluate(PAGE_LIB);
    const vh = narrow ? 844 : 900, vw = narrow ? 390 : 1440;
    M.docH = await page.evaluate(() => document.documentElement.scrollHeight);
    if (mode === 'wide') M.census = await page.evaluate(CENSUS);
    M.texts = await page.evaluate(TEXT_SCAN, narrow ? 28 : 40);
    M.tracked = await page.evaluate(PICK);
    // frames: the rest state, then evenly through the scroll
    const frameAt = new Set(mode === 'prm' ? [0] : narrow ? [0, Math.round(STEPS / 3), Math.round(2 * STEPS / 3), STEPS] : [0, 3, 6, 10, 14, 19, 24, STEPS].filter(s => s <= STEPS));
    const shot = async (s) => page.screenshot({ path: `${FR}/${name}-${mode}-${String(s).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 72, clip: { x: 0, y: 0, width: vw, height: vh } }).catch(() => {});
    await page.evaluate(WRITES_ON);
    const m0 = await metrics(cdp);
    const S = [];
    for (let s = 0; s <= STEPS; s++) {
      if (s > 0) { await page.mouse.wheel(0, 100); await page.waitForTimeout(90); }
      const y = await page.evaluate(() => Math.round(scrollY));
      S.push([y, await page.evaluate(SAMPLE)]);
      if (frameAt.has(s)) { await page.waitForTimeout(250); await shot(s); }
    }
    await page.waitForTimeout(600);
    S.push([await page.evaluate(() => Math.round(scrollY)), await page.evaluate(SAMPLE)]);
    const m1 = await metrics(cdp);
    M.writes = await page.evaluate(WRITES_OFF);
    if (m0 && m1) M.cost = { layouts: m1[0] - m0[0], recalcs: m1[1] - m0[1], layoutMs: Math.round((m1[2] - m0[2]) * 1000), recalcMs: Math.round((m1[3] - m0[3]) * 1000) };
    // rates: per tracked element, d(top)/d(scrollY) * 100 over each step where both moved
    M.rates = M.tracked.map((label, i) => {
      const seg = [];
      for (let k = 1; k < S.length; k++) { const dy = S[k][0] - S[k - 1][0]; if (dy <= 0) continue; const dt = S[k][1][i][0] - S[k - 1][1][i][0]; seg.push(Math.round(-dt / dy * 1000) / 10); }
      const tfs = [...new Set(S.map(x => String(x[1][i][1])))];
      const ops = [...new Set(S.map(x => x[1][i][2]))];
      const clips = [...new Set(S.map(x => String(x[1][i][3])))];
      return { label, ratePer100: seg, transformVaries: tfs.length > 1, tfSample: tfs.slice(0, 4), opacity: ops.length > 1 ? [Math.min(...ops), Math.max(...ops)] : ops[0], clipVaries: clips.length > 1, clipSample: clips.slice(0, 3) };
    });
    M.scrollYs = S.map(x => x[0]);
    // re-scan coverage at the end of the scroll window, and mid
    M.textsEnd = await page.evaluate(TEXT_SCAN, narrow ? 28 : 40).then(t => t.filter(x => x.cover.covered > 0).map(x => ({ key: x.key, text: x.text, cover: x.cover })));
  } catch (e) { M.error = e.message; }
  finally { await ctx.close().catch(() => {}); }
  if (css.length) {
    const pat = { animationTimeline: /animation-timeline/g, viewFn: /view\(\s*[^)]*\)/g, scrollFn: /scroll\(\s*(root|nearest|self|block|inline|x|y|\))/g, viewTimeline: /view-timeline/g, supportsTl: /@supports[^{]*animation-timeline/g, maskImage: /mask-image/g, clipPath: /clip-path/g, mixBlend: /mix-blend-mode/g, sticky: /position:\s*sticky/g, prm: /prefers-reduced-motion/g, preserve3d: /preserve-3d/g, perspective: /perspective\s*:/g };
    M.cssText = { files: css.length, bytes: css.reduce((a, [, t]) => a + t.length, 0), counts: Object.fromEntries(Object.entries(pat).map(([k, re]) => [k, css.reduce((a, [, t]) => a + (t.match(re) || []).length, 0)])) };
    // keep a few literal timeline rules for the record
    const rules = [];
    for (const [u, t] of css) { const re = /[^{}]{0,160}\{[^{}]*animation-timeline[^{}]*\}/g; let m; while ((m = re.exec(t)) && rules.length < 10) rules.push(m[0].replace(/\s+/g, ' ').slice(0, 400)); }
    M.cssText.timelineRules = rules;
  }
  R.modes[mode] = M;
}

try {
  for (const m of MODES) await runMode(m);
} catch (e) { R.error = e.message; }
finally { await browser.close().catch(() => {}); writeFileSync(out, JSON.stringify(R, null, 1)); }
const w = R.modes.wide;
console.log('ok', engine, name, w ? JSON.stringify({ err: w.error, cost: w.cost, libs: w.census?.libs, tl: w.census?.timelineN, mask: w.census?.maskN, blend: w.census?.blendN, sticky: w.census?.stickyN, covered: (w.texts || []).filter(t => t.cover.covered).length, css: w.cssText?.counts }) : R.error);
