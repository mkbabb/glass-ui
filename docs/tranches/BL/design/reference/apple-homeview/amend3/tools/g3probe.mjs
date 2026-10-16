// AMEND-3 glass-ui probe: amend2/tools/gprobe.mjs (its sampler, server, clock modes and plants unchanged) plus an
// event log (scrollsnapchange with its target index, scrollend, every Element.scrollTo call tagged probe|lib,
// visibilitychange) and the scenarios the round-2 critique found unmeasured: cr09 (the stale commit and the
// swallowed move, with their cause), flight / flight-lib (a programmatic move issued while the strip is moving),
// hidden (the demo autoplay under an emulated hidden document).
// Derived from the AMEND-2 glass-ui probe. The GAP probe's per-rAF sampler (gap/tools/probe.mjs), extended with the
// channels the critique found missing: the ring's material per frame (backdrop-filter, fill, shadow),
// the ring's opacity/transform (for entrance plants), the press attribute, the focused dot, each
// member's data-state, the CarouselPager counter, and pager-subtree animations. One browser per run,
// an in-process static server over the built demo, everything closed in `finally`.
//
// usage: node gprobe.mjs <scenario> <runTag> [W H]   env: ENG=chromium|webkit  RAF=120|60|stall  PLANT=fade|scale|fixed|sticky
// scenarios: reduced-pager material interrupt interrupt-lib keyboard press-cancel press-cancel-touch fps visibility
//            sticky enter2 contrast wk-cells
import { chromium, webkit } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { PNG } from '/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'data', 'gui');  // amend3/data/gui
mkdirSync(OUT, { recursive: true });
const DIST = process.env.GAP_DIST || '/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/REF2/amend3/wt/dist-demo';
const ENG = process.env.ENG || 'chromium';
const RAF = process.env.RAF || '120';
const PLANT = process.env.PLANT || '';
const [scenario, runTag = 'r1', Wa, Ha] = process.argv.slice(2);
const TOUCH = /touch/.test(scenario);
const W = +(Wa || (TOUCH ? 390 : 1440)), H = +(Ha || (TOUCH ? 844 : 900));
const load = () => execSync('sysctl -n vm.loadavg').toString().trim();
const sleep = ms => new Promise(r => setTimeout(r, ms));
const tag = [scenario, runTag, W, ENG !== 'chromium' ? ENG : '', RAF !== '120' ? 'raf' + RAF : '', PLANT ? 'plant-' + PLANT : ''].filter(Boolean).join('-');

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.wasm': 'application/wasm' };
function serve() {
  return new Promise(res => {
    const srv = createServer((req, rsp) => {
      const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let f = join(DIST, p);
      if (!f.startsWith(DIST) || !existsSync(f) || statSync(f).isDirectory()) f = join(DIST, 'index.html');
      rsp.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' });
      rsp.end(readFileSync(f));
    });
    srv.listen(0, '127.0.0.1', () => res(srv));
  });
}

// rAF clock modes (init script). 60: the page's rAF callbacks run on every other compositor frame
// (a 60 Hz page on a 120 Hz host); stall: every 6th frame blocks the main thread 45 ms (dropped frames).
// The sampler keeps the original rAF, so it still samples every compositor frame.
const RAF_INIT = (mode) => {
  const orig = window.requestAnimationFrame.bind(window);
  const corig = window.cancelAnimationFrame.bind(window);
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

// Witness plants (init-time CSS + an IntersectionObserver), never library code.
const PLANT_INIT = (plant) => {
  const css = {
    fade: '.glass-pager-ring.__plant-in{animation:__plantFade 1s linear both}.glass-pager-ring.__plant-wait{opacity:0}@keyframes __plantFade{from{opacity:0}to{opacity:1}}',
    scale: '.glass-pager-ring.__plant-in{animation:__plantScale 1s linear both}.glass-pager-ring.__plant-wait{opacity:0;scale:0}@keyframes __plantScale{from{opacity:0;scale:0}to{opacity:1;scale:1}}',
    fixed: '[data-slot="carousel"] [data-slot="pager-dots"]{position:fixed!important;bottom:32px!important;left:50%!important;translate:-50% 0!important;z-index:50}',
    sticky: '[data-slot="carousel"] [data-slot="pager-dots"]{position:sticky!important;bottom:32px!important;z-index:50}[data-slot="carousel"] > .mt-4{position:sticky;bottom:32px;z-index:50}',
  }[plant];
  if (!css) return;
  const add = () => {
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    if (plant === 'fade' || plant === 'scale') {
      // armed on demand (the hero sits in the first viewport, so a load-time arm fires before any recording):
      // the probe scrolls the hero out, calls __plantArm(), starts sampling, then scrolls it back in.
      window.__plantArm = () => {
        const ring = document.querySelector('[data-slot="carousel"] .glass-pager-ring');
        if (!ring) return false;
        ring.classList.remove('__plant-in'); ring.classList.add('__plant-wait');
        const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) { ring.classList.remove('__plant-wait'); ring.classList.add('__plant-in'); io.disconnect(); } }, { threshold: 0.6 });
        io.observe(ring);
        return true;
      };
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
};

// Event log (init script, no library code touched). Element.prototype.scrollTo is wrapped so each call records
// who issued it: the probe sets window.__probeCall around its own calls; every other call is the library's.
const EVENT_INIT = () => {
  window.__ev = [];
  const log = (...a) => window.__ev.push([performance.now(), ...a]);
  window.__evlog = log;
  const st = Element.prototype.scrollTo;
  Element.prototype.scrollTo = function (...args) {
    const o = typeof args[0] === 'object' ? args[0] : { left: args[0], top: args[1] };
    if (this.matches && this.matches('[data-slot="carousel-content"]')) {
      const car = this.closest('[data-slot="carousel"]'); const k = [...document.querySelectorAll('[data-slot="carousel"]')].indexOf(car);
      const who = window.__probeCall ? 'probe' : 'lib';
      if (who === 'lib' && window.__dropLib) { log('dropped', who, k, Math.round(o.left ?? -1), o.behavior || 'auto', Math.round(this.scrollLeft)); return; }
      log('scrollTo', who, k, Math.round(o.left ?? -1), o.behavior || 'auto', Math.round(this.scrollLeft));
    }
    return st.apply(this, args);
  };
  const hook = () => {
    document.querySelectorAll('[data-slot="carousel-content"]').forEach((el, k) => {
      if (el.__hooked) return; el.__hooked = true;
      el.addEventListener('scrollsnapchange', (e) => log('snapchange', k, [...el.children].indexOf(e.snapTargetInline), Math.round(el.scrollLeft)));
      el.addEventListener('scrollend', () => log('scrollend', k, Math.round(el.scrollLeft)));
    });
  };
  document.addEventListener('visibilitychange', () => log('visibility', document.visibilityState));
  // IntersectionObserver callbacks rooted on a carousel strip are logged (best entry and its ratio) before the
  // library's callback runs, so a commit can be attributed to its source
  const IO = window.IntersectionObserver;
  window.IntersectionObserver = function (cb, opts) {
    const root = opts && opts.root;
    const wrapped = (entries, obs) => {
      if (root && root.matches && root.matches('[data-slot="carousel-content"]')) {
        const k = [...document.querySelectorAll('[data-slot="carousel-content"]')].indexOf(root);
        let best = null; for (const e of entries) if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        if (best) log('io', k, [...root.children].indexOf(best.target), +best.intersectionRatio.toFixed(3), Math.round(root.scrollLeft));
      }
      return cb(entries, obs);
    };
    return new IO(wrapped, opts);
  };
  window.IntersectionObserver.prototype = IO.prototype;
  // emulated hidden document: the visibility getters are overridden and visibilitychange is dispatched.
  // rAF and timers keep running (a real hidden tab also stops rAF and throttles timers to >= 1 s).
  window.__hide = (on) => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => (on ? 'hidden' : 'visible') });
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => on });
    document.dispatchEvent(new Event('visibilitychange'));
  };
  const mo = new MutationObserver(hook);
  const start = () => { hook(); mo.observe(document.documentElement, { childList: true, subtree: true }); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
};

const SAMPLER = (k) => {
  const raf = window.__rafOrig || window.requestAnimationFrame.bind(window);
  const r2 = x => Math.round(x * 100) / 100;
  const car = document.querySelectorAll('[data-slot="carousel"]')[k];
  const strip = car ? car.querySelector('[data-slot="carousel-content"]') : null;
  const items = strip ? [...strip.children] : [];
  const pager = car ? car.querySelector('[data-slot="pager-dots"]') : null;
  const ringEl = pager ? (pager.closest('.glass-pager-ring') || pager.querySelector('.glass-pager-ring') || pager) : null;
  const bodies = pager ? [...pager.querySelectorAll('.goo-body')] : [];
  const neck = pager ? pager.querySelector('.goo-neck') : null;
  const layer = pager ? pager.querySelector('.pager-worm-layer') : null;
  const pips = pager ? [...pager.querySelectorAll('.goo-dot')] : [];
  const btns = pager ? [...pager.querySelectorAll('.pager-dot')] : [];
  const ctr = car ? car.querySelector('[data-slot="carousel-pager-counter"]') : null;
  const main = document.querySelector('main.demo-main-scroller') || document.querySelector('main') || document.scrollingElement;
  const rect = el => { const b = el.getBoundingClientRect(); return [r2(b.left), r2(b.top), r2(b.width), r2(b.height)]; };
  window.__rows = []; window.__marks = [];
  window.__mark = (name) => window.__marks.push([name, performance.now()]);
  let on = true;
  window.__stop = () => { on = false; };
  const snap = (now) => {
    const row = { t: now, pn: performance.now(), ms: r2(main.scrollTop || 0), sy: scrollY };
    if (car) row.car = rect(car);
    if (strip) {
      row.sl = r2(strip.scrollLeft);
      row.it = items.map(n => { const cs = getComputedStyle(n); const c = n.firstElementChild;
        return [n.dataset.state, cs.scale, r2(+cs.opacity), c ? getComputedStyle(c).translate : '', r2(n.getBoundingClientRect().left)]; });
    }
    if (ctr) row.ctr = ctr.textContent.trim();
    if (pager) {
      row.cur = btns.findIndex(b => b.getAttribute('aria-current') === 'true');
      row.foc = btns.indexOf(document.activeElement);
      row.press = pips.findIndex(p => p.hasAttribute('data-press'));
      if (bodies.length) { row.bA = rect(bodies[0]); row.bB = rect(bodies[1]); row.nk = rect(neck); row.nkOp = getComputedStyle(neck).opacity; }
      row.str = layer ? layer.style.getPropertyValue('--stretch') : '';
      row.pip = pips.map(p => { const cs = getComputedStyle(p, '::before'); return [cs.scale, cs.backgroundColor, getComputedStyle(p).translate]; });
      row.ring = rect(ringEl);
      const cs = getComputedStyle(ringEl);
      row.mat = [cs.backdropFilter || cs.webkitBackdropFilter || '', cs.backgroundColor, cs.boxShadow];
      row.rop = r2(+cs.opacity); row.rtf = [cs.transform, cs.scale, cs.translate]; row.rpos = cs.position;
      row.panims = ringEl.getAnimations({ subtree: true }).filter(a => a.playState === 'running').map(a => a.animationName || a.transitionProperty || 'anim');
    }
    row.anims = document.getAnimations().filter(a => a.playState === 'running').length;
    return row;
  };
  const loop = (now) => { if (!on) return; window.__rows.push(snap(now)); raf(loop); };
  raf(loop);
  return { items: items.length, pips: pips.length, ring: !!ringEl, ctr: !!ctr };
};

// Mean RGB of a box in a decoded PNG (deviceScaleFactor-scaled coordinates).
function boxMean(png, x0, y0, x1, y1) {
  let r = 0, g = 0, b = 0, n = 0;
  for (let y = Math.max(0, Math.round(y0)); y < Math.min(png.height, Math.round(y1)); y++)
    for (let x = Math.max(0, Math.round(x0)); x < Math.min(png.width, Math.round(x1)); x++) {
      const i = (png.width * y + x) << 2; r += png.data[i]; g += png.data[i + 1]; b += png.data[i + 2]; n++;
    }
  return n ? [r / n, g / n, b / n] : null;
}
const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const Y = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (a, b) => { const [l1, l2] = [Y(a), Y(b)].sort((p, q) => q - p); return (l1 + 0.05) / (l2 + 0.05); };

async function main() {
  const srv = await serve();
  const base = `http://127.0.0.1:${srv.address().port}`;
  const meta = { scenario, runTag, W, H, ENG, RAF, PLANT, loadStart: load(), started: new Date().toISOString(), dist: DIST };
  const result = { meta };
  let browser;
  try {
    browser = await (ENG === 'webkit' ? webkit : chromium).launch({ headless: true });
    meta.browser = browser.version();
    const reduce = /^reduced/.test(scenario);
    const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: scenario === 'contrast' ? 2 : 1,
      hasTouch: TOUCH, isMobile: TOUCH && ENG === 'chromium', reducedMotion: reduce ? 'reduce' : 'no-preference', colorScheme: 'light' });
    if (RAF !== '120') await ctx.addInitScript(RAF_INIT, RAF);
    if (PLANT) await ctx.addInitScript(PLANT_INIT, PLANT);
    await ctx.addInitScript(EVENT_INIT);
    // touch releases fire pointerleave, which restarts the demo autoplay: block its one timer in touch runs
    if (TOUCH) await ctx.addInitScript(() => { const si = window.setInterval; window.setInterval = (f, ms, ...a) => ms === 4200 ? 0 : si(f, ms, ...a); });
    const page = await ctx.newPage();
    const errors = []; page.on('pageerror', e => errors.push(String(e).slice(0, 200))); page.on('crash', () => errors.push('PAGE CRASHED'));
    const cdp = ENG === 'chromium' ? await ctx.newCDPSession(page) : null;
    await page.goto(base + '/navigation/carousel', { waitUntil: 'networkidle', timeout: 60000 });
    await sleep(1200);
    const K = scenario === 'fps' ? 2 : (scenario === 'interrupt-lib' || scenario === 'flight-lib') ? 1 : 0;
    const sel = `[data-slot="carousel"] >> nth=${K}`;
    const pagerSel = `${sel} >> [data-slot="pager-dots"]`;
    const dotSel = i => `${pagerSel} >> .pager-dot >> nth=${i}`;
    const stripSel = `${sel} >> [data-slot="carousel-content"]`;
    const arm = async () => (result.armed = await page.evaluate(SAMPLER, K));
    const stop = async () => { await page.evaluate(() => window.__stop()); await sleep(60); return page.evaluate(() => ({ rows: window.__rows, marks: window.__marks, events: window.__ev })); };
    const mark = n => page.evaluate(n => window.__mark(n), n);
    const parkInside = async () => { const b = await page.locator(stripSel).boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); };
    const intoView = async () => { await page.locator(sel).scrollIntoViewIfNeeded(); await sleep(400); };
    const clickDot = async (i) => { const b = await page.locator(dotSel(i)).boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await mark('click' + i); await page.mouse.down(); await page.mouse.up(); };
    const pitchGo = (n, beh = 'smooth') => page.evaluate(([k, n, beh]) => { const s = document.querySelectorAll('[data-slot="carousel"]')[k].querySelector('[data-slot="carousel-content"]'); const p = s.children[1].offsetLeft - s.children[0].offsetLeft; if (window.__mark) window.__mark('to' + n); window.__probeCall = true; s.scrollTo({ left: n * p, behavior: beh }); window.__probeCall = false; }, [K, n, beh]);
    const inFlight = (from, to, second, frac) => page.evaluate(([k, from, to, second, frac]) => new Promise((res) => {
      const s = document.querySelectorAll('[data-slot="carousel"]')[k].querySelector('[data-slot="carousel-content"]');
      const p = s.children[1].offsetLeft - s.children[0].offsetLeft;
      const raf = window.__rafOrig || requestAnimationFrame;
      window.__mark('to' + to); window.__probeCall = true; s.scrollTo({ left: to * p, behavior: 'smooth' }); window.__probeCall = false;
      const goal = from * p + frac * (to - from) * p;
      const t0 = performance.now();
      const chk = () => {
        const done = to > from ? s.scrollLeft >= goal : s.scrollLeft <= goal;
        if (done) { window.__mark('inflight-to' + second); window.__probeCall = true; s.scrollTo({ left: second * p, behavior: 'smooth' }); window.__probeCall = false; res({ issuedAtSl: s.scrollLeft, ms: performance.now() - t0 }); }
        else if (performance.now() - t0 > 1500) res({ issued: false, sl: s.scrollLeft });
        else raf(chk);
      };
      raf(chk);
    }), [K, from, to, second, frac]);
    const nextInFlight = (frac) => page.evaluate(([k, frac]) => new Promise((res) => {
      const car = document.querySelectorAll('[data-slot="carousel"]')[k];
      const s = car.querySelector('[data-slot="carousel-content"]'); const nb = car.querySelector('[data-slot="carousel-pager-next"]');
      const p = s.children[1].offsetLeft - s.children[0].offsetLeft; const from = s.scrollLeft;
      const raf = window.__rafOrig || requestAnimationFrame;
      window.__mark('next'); nb.click();
      const t0 = performance.now();
      const chk = () => {
        if (s.scrollLeft >= from + frac * p) { window.__mark('next-inflight'); nb.click(); res({ issuedAtSl: s.scrollLeft, ms: performance.now() - t0 }); }
        else if (performance.now() - t0 > 1500) res({ issued: false, sl: s.scrollLeft });
        else raf(chk);
      };
      raf(chk);
    }), [K, frac]);
    const mainTo = (y) => page.evaluate((y) => { const m = document.querySelector('main.demo-main-scroller') || document.querySelector('main'); m.scrollTo({ top: y, behavior: 'instant' }); }, y);
    const mainTop = () => page.evaluate(() => (document.querySelector('main.demo-main-scroller') || document.querySelector('main')).scrollTop);
    const carTop = () => page.evaluate((k) => document.querySelectorAll('[data-slot="carousel"]')[k].getBoundingClientRect().top, K);

    if (!['sticky', 'enter2', 'visibility'].includes(scenario)) await intoView();

    if (scenario === 'reduced-pager') {
      await parkInside(); await arm(); await sleep(200);
      await clickDot(3); await sleep(1500); await clickDot(0); await sleep(1500);
      await page.mouse.move(5, 5); await mark('pointerOut'); await sleep(9000);
      Object.assign(result, await stop());
    } else if (scenario === 'material') {
      await parkInside(); await arm(); await sleep(200);
      for (const [i, w] of [[1, 1200], [4, 1500], [0, 1500]]) { await clickDot(i); await sleep(w); }
      await pitchGo(2); await sleep(1500); await pitchGo(0); await sleep(1500);
      Object.assign(result, await stop());
    } else if (scenario === 'interrupt') {
      // the critique's sequence (smooth r1/r2), then a clean interrupt: 0 -> 3 pitches, at +250 ms back to 1
      await parkInside(); await arm(); await sleep(200);
      await pitchGo(1); await sleep(1500); await pitchGo(4); await sleep(1800); await pitchGo(1); await sleep(1800);
      await pitchGo(4); await sleep(250); await pitchGo(0); await sleep(2500);
      await pitchGo(3); await sleep(250); await pitchGo(1); await sleep(2500);
      Object.assign(result, await stop());
    } else if (scenario === 'interrupt-lib') {
      // the library path: CarouselPager Next (useDeckSnap.scrollTo smooth), then 150 ms later the hand
      // scrolls the strip back one card (a horizontal wheel). Does the committed index follow the strip?
      await arm(); await sleep(200);
      const nb = await page.locator(`${sel} >> [data-slot="carousel-pager-next"]`).boundingBox();
      const sb = await page.locator(stripSel).boundingBox();
      await page.mouse.move(nb.x + nb.width / 2, nb.y + nb.height / 2); await mark('next'); await page.mouse.down(); await page.mouse.up();
      await sleep(150); await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2); await mark('wheelBack'); await page.mouse.wheel(-260, 0);
      await sleep(3000);
      await page.mouse.move(nb.x + nb.width / 2, nb.y + nb.height / 2); await mark('next2'); await page.mouse.down(); await page.mouse.up(); await sleep(2000);
      Object.assign(result, await stop());
    } else if (scenario === 'keyboard') {
      await parkInside(); await arm(); await sleep(200);
      await page.evaluate((k) => { const p = document.querySelectorAll('[data-slot="carousel"]')[k].querySelector('[data-slot="pager-dots"]'); p.querySelector('.pager-dot[tabindex="0"]').focus(); }, K);
      await mark('focused'); await sleep(400);
      for (const key of ['ArrowRight', 'ArrowRight', 'End', 'Home', 'ArrowLeft']) { await mark(key); await page.keyboard.press(key); await sleep(1100); }
      Object.assign(result, await stop());
    } else if (scenario === 'press-cancel') {
      await parkInside(); await arm(); await sleep(200);
      const b = await page.locator(dotSel(2)).boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await sleep(400);
      await mark('down'); await page.mouse.down(); await sleep(300);
      await mark('dragOff'); await page.mouse.move(b.x + b.width / 2, b.y - 60, { steps: 6 }); await sleep(400);
      await mark('up'); await page.mouse.up(); await sleep(1200);
      await mark('elsewhere'); await page.mouse.move(5, 5); await sleep(800);
      Object.assign(result, await stop());
    } else if (scenario === 'press-cancel-touch') {
      await parkInside(); await arm(); await sleep(200);
      const b = await page.locator(dotSel(2)).boundingBox();
      const x = b.x + b.width / 2, y = b.y + b.height / 2;
      await mark('down'); await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] }); await sleep(300);
      await mark('dragOff'); for (let i = 1; i <= 6; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - 10 * i }] }); await sleep(30); }
      await sleep(300);
      await mark('up'); await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await sleep(1500);
      Object.assign(result, await stop());
    } else if (scenario === 'fps') {
      await parkInside(); await arm(); await sleep(200);
      for (const [i, w] of [[1, 1400], [4, 1800], [0, 1800]]) { await clickDot(i); await sleep(w); }
      Object.assign(result, await stop());
    } else if (scenario === 'visibility') {
      // the demo autoplay (4200 ms) with the pointer outside the frame: does it keep ticking while the
      // hero is scrolled out of view? and is any time-driven channel on the pager (a progress fill)?
      await intoView(); await page.mouse.move(5, 5); await sleep(600);
      await arm(); await mark('inView'); await sleep(5000);
      const y0 = await mainTop();
      await mark('scrolledOut'); await mainTo(y0 + 1600); await sleep(9000);
      await mark('scrolledIn'); await mainTo(y0); await sleep(5000);
      Object.assign(result, await stop());
    } else if (scenario === 'sticky') {
      // slow scroll (40 px per 133 ms, 300 px/s) from the hero's top at 80 % of the viewport until the
      // hero's bottom is 300 px above the top: where is the pager group relative to the viewport and the carousel?
      await page.mouse.move(5, 5); await mainTo(0); await sleep(300);
      const t0 = await carTop(); const m0 = await mainTop();
      await mainTo(Math.max(0, m0 + t0 - 0.8 * H)); await sleep(700);
      await page.mouse.move(W - 30, H / 2); // the page gutter, outside the frame (the demo autoplay keeps its own clock)
      await arm(); await mark('start');
      for (let i = 0; i < 60; i++) { await page.mouse.wheel(0, 40); await sleep(133); const tp = await carTop(); if (tp < -800) break; }
      await mark('end'); await sleep(600);
      Object.assign(result, await stop());
    } else if (scenario === 'enter2') {
      // the GAP enter scenario at two speeds (300 px/s wheel, and one instant jump), for the entrance witness
      // the hero is the first thing on the page, so it enters from above: scroll it out (ring ~900 px above the
      // viewport), arm the plant (if any) and the sampler, then bring it back by one jump or by 40 px wheel steps
      // every 133 ms (300 px/s)
      await mainTo(1500); await sleep(800); await page.mouse.move(W / 2, H / 2);
      result.plantArmed = await page.evaluate(() => (window.__plantArm ? window.__plantArm() : null));
      await arm();
      if (runTag.includes('jump')) { await mark('jump'); await mainTo(0); }
      else { await mark('wheel'); for (let i = 0; i < 60; i++) { await page.mouse.wheel(0, -40); await sleep(133); if ((await mainTop()) <= 0) break; } }
      await mark('scrolled'); await sleep(2500);
      Object.assign(result, await stop());
    } else if (scenario === 'contrast') {
      // per slide at rest: the active indicator and an inactive pip against the ring's own fill, and the
      // ring's fill against the field behind it. Numbers only; the PNG is decoded in memory and not written.
      await page.mouse.move(5, 5);
      const n = await page.evaluate(() => document.querySelector('[data-slot="carousel-content"]').children.length);
      result.slides = [];
      for (let i = 0; i < n; i++) {
        await pitchGo(i, 'instant'); await sleep(700);
        const g = await page.evaluate(() => {
          const pager = document.querySelector('[data-slot="carousel"] [data-slot="pager-dots"]');
          const ring = pager.closest('.glass-pager-ring') || pager;
          const bx = e => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom]; };
          const pips = [...pager.querySelectorAll('.goo-dot')].map(bx);
          const body = bx(pager.querySelector('.goo-body'));
          const cur = [...pager.querySelectorAll('.pager-dot')].findIndex(b => b.getAttribute('aria-current') === 'true');
          return { ring: bx(ring), pips, body, cur, ink: getComputedStyle(pager.querySelector('.goo-dot'), '::before').backgroundColor };
        });
        const buf = await page.screenshot();
        const png = PNG.sync.read(buf);
        const s = 2, c = ([x0, y0, x1, y1], f = 0.25) => { const w = x1 - x0, h = y1 - y0; return [s * (x0 + f * w), s * (y0 + f * h), s * (x1 - f * w), s * (y1 - f * h)]; };
        const inact = g.pips.findIndex((_, j) => j !== g.cur);
        const pipC = boxMean(png, ...c(g.pips[inact], 0.35));
        const bodyC = boxMean(png, ...c(g.body, 0.3));
        const [rx0, ry0, rx1, ry1] = g.ring; const gapX = (g.pips[inact][0] + g.pips[inact][2]) / 2 + 13; // between two pips, on the fill
        const fillC = boxMean(png, s * (gapX - 1), s * (ry0 + 3), s * (gapX + 1), s * (ry0 + 6));
        const fieldC = boxMean(png, s * (rx0 - 30), s * (ry0 + 4), s * (rx0 - 10), s * (ry1 - 4));
        result.slides.push({ i, cur: g.cur, ink: g.ink, pip: pipC, body: bodyC, fill: fillC, field: fieldC,
          c_pip_fill: +contrast(pipC, fillC).toFixed(3), c_body_fill: +contrast(bodyC, fillC).toFixed(3), c_fill_field: +contrast(fillC, fieldC).toFixed(3) });
      }
    } else if (scenario === 'cr09') {
      // the interrupt sequence (amend2 `interrupt`), with the event log: which commit source fires, and which
      // scrollTo calls the library issues, around the stale commit (to4 then to0 at +250 ms) and the swallowed
      // move (to3 then to1 at +250 ms)
      await parkInside(); await arm(); await sleep(200);
      await pitchGo(1); await sleep(1500); await pitchGo(4); await sleep(1800); await pitchGo(1); await sleep(1800);
      await pitchGo(4); await sleep(250); await pitchGo(0); await sleep(2500);
      await pitchGo(3); await sleep(250); await pitchGo(1); await sleep(2500);
      Object.assign(result, await stop());
    } else if (scenario === 'flight') {
      // a programmatic move issued while the strip is moving (P-21's missing leg): (A) 0 -> 1, and at 35 % of the
      // hop a same-direction call to 2; (B) from rest at 2, 2 -> 3, and at 35 % a reversal to 1
      await parkInside(); await arm(); await sleep(200);
      result.legA = await inFlight(0, 1, 2, 0.35); await sleep(1800);
      await pitchGo(2); await sleep(1500);
      result.legB = await inFlight(2, 3, 1, 0.35); await sleep(1800);
      Object.assign(result, await stop());
    } else if (scenario === 'flight-lib') {
      // the library path: CarouselPager Next, and a second Next when the strip has covered 35 % of the first hop
      await arm(); await sleep(200);
      result.legC = await nextInFlight(0.35); await sleep(2000);
      result.legC2 = await nextInFlight(0.35); await sleep(2000);
      Object.assign(result, await stop());
    } else if (scenario === 'hidden') {
      // the demo autoplay (4200 ms, pointer outside the frame) across an emulated hidden document: 9 s hidden
      await intoView(); await page.mouse.move(5, 5); await sleep(600);
      await arm(); await mark('visible'); await sleep(5000);
      await mark('hide'); await page.evaluate(() => window.__hide(true)); await sleep(9000);
      await mark('show'); await page.evaluate(() => window.__hide(false)); await sleep(5000);
      Object.assign(result, await stop());
    } else if (scenario === 'jump-noecho') {
      // is the truncated multi-member jump (P-21a) scroll-snap-stop, or the commit echo? from 0, scrollTo(4 pitches)
      // with the library's own scrollTo calls dropped (an instrument switch in the init script, no library code
      // touched), then the same jump with them live
      await parkInside(); await arm(); await sleep(200);
      await page.evaluate(() => { window.__dropLib = true; });
      await pitchGo(4); await sleep(2200); await pitchGo(0); await sleep(2200);
      await page.evaluate(() => { window.__dropLib = false; });
      await mark('echo-on'); await sleep(300);
      await pitchGo(4); await sleep(2200);
      Object.assign(result, await stop());
    } else if (scenario === 'wk-cells') {
      // the engine-specific cells, any engine: (1) dot click -> does the strip move; (2) a 4-pitch smooth
      // scrollTo; (3) the interrupt; (4) a hop from rest (the launch step)
      await parkInside(); await arm(); await sleep(300);
      await clickDot(3); await sleep(1500); await clickDot(0); await sleep(1500);
      await pitchGo(4); await sleep(2000); await pitchGo(0); await sleep(2000);
      await pitchGo(3); await sleep(250); await pitchGo(1); await sleep(2500);
      Object.assign(result, await stop());
    } else throw new Error('unknown scenario ' + scenario);
    result.errors = errors;
    meta.loadEnd = load();
    await page.close(); await ctx.close();
  } finally {
    if (browser) await browser.close().catch(() => {});
    srv.close();
  }
  const rows = result.rows || [];
  if (rows.length > 1) { const d = rows.slice(1).map((r, i) => r.t - rows[i].t).sort((a, b) => a - b); meta.frameDt = { n: d.length, p50: +d[d.length >> 1].toFixed(2), p95: +d[Math.floor(d.length * 0.95)].toFixed(2), max: +d[d.length - 1].toFixed(2) }; }
  const f = join(OUT, `${tag}.json.gz`);
  writeFileSync(f, gzipSync(JSON.stringify(result)));
  console.log(JSON.stringify({ wrote: f, rows: rows.length, load: [meta.loadStart, meta.loadEnd], frameDt: meta.frameDt, errors: (result.errors || []).length }));
}
main().catch(e => { console.error(e); process.exit(1); });
