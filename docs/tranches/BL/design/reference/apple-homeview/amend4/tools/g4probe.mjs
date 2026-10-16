// AMEND-4 glass-ui probe. Derived from amend3/tools/g3probe.mjs (its static server, event log and per-rAF sampler),
// with the cells CRITIQUE-3 found unmeasured:
//   retarget-mf  R-02: a hop 0 -> 2 on the hero worm, and a same-direction retarget to 4 issued 46 / 80 / 120 /
//                250 ms after the launch frame (in-page, from a rAF watcher, so the delay is frame-exact)
//   block        M-08: the 208 px worm carousel's hops +1 / +3 / -4, with ONE main-thread block of BLOCK ms
//                (env BLOCK=0|45|150|400) issued 30 ms after each launch frame; BLOCK=0 is the reference clock
//   jump4        P-21a: an unguarded strip.scrollTo({left: 4*pitch, behavior: "smooth"}) from rest at 0, twice
//   enter3       CR-03: the entrance witness with its timing source. Run tag selects the entry: wheel (40 px per
//                133 ms, 300 px/s), jump (one instant scroll), outback (jump in, out, back in). Plants (env PLANT),
//                init-time CSS/JS only, never library code:
//                  linear     a CSS animation of the ring's rise on a linear() easing sampled from Apple's row
//                             (40 stops over 1.6 s), plus a shrinking blob inside the ring and a 20 ms pip stagger
//                  token      the same, on var(--spring-panel) with var(--spring-panel-duration)
//                  rafspring  the same rise stepped from rAF by the closed-form Apple-row spring (no Animation)
//                  cascade    the library's own .scroll-cascade (a view() timeline) on the ring's parent
//                  replay     the linear plant, re-fired on every entry
//   Every frame also records the ring's own Animations (type, name, easing, duration, timeline).
// usage: node g4probe.mjs <scenario> <runTag> [W H]   env: PLANT, BLOCK, GAP_DIST
// One browser per run; page, context, browser and server closed in finally.
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'data', 'gui');
mkdirSync(OUT, { recursive: true });
const DIST = process.env.GAP_DIST || '/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/REF2/amend4/wt/dist-demo';
const PLANT = process.env.PLANT || '';
const BLOCK = +(process.env.BLOCK || 0);
const KE = +(process.env.K || 0);  // enter3: which carousel enters (0, the hero, enters from above; 2 can enter from below)
const [scenario, runTag = 'r1', Wa, Ha] = process.argv.slice(2);
const W = +(Wa || 1440), H = +(Ha || 900);
const load = () => execSync('sysctl -n vm.loadavg').toString().trim();
const sleep = ms => new Promise(r => setTimeout(r, ms));
const tag = [scenario, runTag, W, H !== 900 ? 'h' + H : '', scenario === 'block' ? 'b' + BLOCK : '', KE ? 'k' + KE : '', PLANT ? 'plant-' + PLANT : ''].filter(Boolean).join('-');

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

// Apple's rise row (REMEASURE P-05: omega0 10.37 rad/s, zeta 0.414), sampled into a CSS linear() the way a
// generator would: 40 equally spaced stops of the step response over 1.6 s, the last stop forced to 1.
const APPLE_W0 = 10.37, APPLE_Z = 0.414;
const springP = (t) => { if (t <= 0) return 0; const wd = APPLE_W0 * Math.sqrt(1 - APPLE_Z * APPLE_Z);
  return 1 - Math.exp(-APPLE_Z * APPLE_W0 * t) * (Math.cos(wd * t) + APPLE_Z * APPLE_W0 / wd * Math.sin(wd * t)); };
const LINEAR_STOPS = Array.from({ length: 40 }, (_, i) => (i === 39 ? 1 : springP(i / 39 * 1.6)));
const LINEAR_EASE = 'linear(' + LINEAR_STOPS.map(v => v.toFixed(5)).join(', ') + ')';

const PLANT_INIT = ([plant, linearEase, w0, z, K]) => {
  if (!plant) return;
  const ease = plant === 'token' ? 'var(--spring-panel-duration) var(--spring-panel)' : `1.6s ${linearEase}`;
  const css = `
    .glass-pager-ring.__plant-wait{translate:0 180px}
    .glass-pager-ring.__plant-in{animation:__plantRise ${ease} both}
    @keyframes __plantRise{from{translate:0 180px}to{translate:0 0}}
    .__plant-blob{position:absolute;left:50%;top:50%;width:30px;height:80px;margin:-40px 0 0 -15px;border-radius:15px;background:rgb(120 110 100);pointer-events:none;z-index:3}
    .__plant-blob.__go{animation:__plantBlob .54s linear both}
    @keyframes __plantBlob{from{scale:1.3}to{scale:0}}
    @keyframes __plantPip{from{translate:0 36px;opacity:0}to{translate:0 0;opacity:1}}`;
  const add = () => {
    const s = document.createElement('style'); s.textContent = plant === 'cascade' ? '' : css; document.head.appendChild(s);
    window.__plantArm = () => {
      const car = document.querySelectorAll('[data-slot="carousel"]')[K];
      const ring = car && car.querySelector('.glass-pager-ring');
      if (!ring) return false;
      if (plant === 'cascade') { ring.parentElement.classList.add('scroll-cascade'); return 'cascade'; }
      const pips = [...ring.querySelectorAll('.goo-dot')];
      const blob = document.createElement('div'); blob.className = '__plant-blob'; ring.appendChild(blob);
      if (getComputedStyle(ring).position === 'static') ring.style.position = 'relative';
      const wait = () => { ring.classList.remove('__plant-in'); blob.classList.remove('__go'); blob.style.display = '';
        if (plant === 'rafspring') ring.style.translate = '0 180px'; else ring.classList.add('__plant-wait');
        pips.forEach(p => { p.style.animation = 'none'; p.style.opacity = '0'; }); };
      const fire = () => {
        ring.classList.remove('__plant-wait'); void ring.offsetWidth;
        blob.classList.add('__go'); setTimeout(() => { blob.style.display = 'none'; }, 560);
        pips.forEach((p, i) => { p.style.opacity = ''; p.style.animation = `__plantPip .1s ease-out ${740 + 20 * i}ms both`; });
        if (plant === 'rafspring') {
          const raf = window.__rafOrig || requestAnimationFrame.bind(window); let t0 = null;
          const wd = w0 * Math.sqrt(1 - z * z);
          const step = (now) => { if (t0 === null) t0 = now; const t = (now - t0) / 1000;
            const p = 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + z * w0 / wd * Math.sin(wd * t));
            ring.style.translate = `0 ${(180 * (1 - p)).toFixed(3)}px`; if (t < 3) raf(step); else ring.style.translate = ''; };
          raf(step);
        } else ring.classList.add('__plant-in');
      };
      wait();
      let fired = false;
      const io = new IntersectionObserver((es) => { for (const e of es) {
        if (e.isIntersecting && (!fired || plant === 'replay')) { fired = true; fire(); if (plant !== 'replay') io.disconnect(); }
        else if (!e.isIntersecting && plant === 'replay' && fired) wait();
      } }, { threshold: 0.6 });
      io.observe(car);  // the carousel, not the translated ring
      return true;
    };
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
};

// Event log (amend3 g3probe's, unchanged in kind): scrollTo calls tagged probe|lib, scrollsnapchange, scrollend.
const EVENT_INIT = () => {
  window.__rafOrig = window.requestAnimationFrame.bind(window);
  window.__ev = [];
  const log = (...a) => window.__ev.push([performance.now(), ...a]);
  const st = Element.prototype.scrollTo;
  Element.prototype.scrollTo = function (...args) {
    const o = typeof args[0] === 'object' ? args[0] : { left: args[0], top: args[1] };
    if (this.matches && this.matches('[data-slot="carousel-content"]')) {
      const car = this.closest('[data-slot="carousel"]'); const k = [...document.querySelectorAll('[data-slot="carousel"]')].indexOf(car);
      log('scrollTo', window.__probeCall ? 'probe' : 'lib', k, Math.round(o.left ?? -1), o.behavior || 'auto', Math.round(this.scrollLeft));
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
  const mo = new MutationObserver(hook);
  const start = () => { hook(); mo.observe(document.documentElement, { childList: true, subtree: true }); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
};

const SAMPLER = (k) => {
  const raf = window.__rafOrig || window.requestAnimationFrame.bind(window);
  const r2 = x => Math.round(x * 100) / 100;
  const car = document.querySelectorAll('[data-slot="carousel"]')[k];
  const strip = car.querySelector('[data-slot="carousel-content"]');
  const items = [...strip.children];
  const pager = car.querySelector('[data-slot="pager-dots"]');
  const ringEl = pager.closest('.glass-pager-ring') || pager.querySelector('.glass-pager-ring') || pager;
  const bodies = [...pager.querySelectorAll('.goo-body')];
  const neck = pager.querySelector('.goo-neck');
  const layer = pager.querySelector('.pager-worm-layer');
  const pips = [...pager.querySelectorAll('.goo-dot')];
  const btns = [...pager.querySelectorAll('.pager-dot')];
  const main = document.querySelector('main.demo-main-scroller') || document.querySelector('main') || document.scrollingElement;
  const rect = el => { const b = el.getBoundingClientRect(); return [r2(b.left), r2(b.top), r2(b.width), r2(b.height)]; };
  // the spring tokens as the page resolves them (easing strings, and each duration as a computed time)
  const probe = document.createElement('div'); document.body.appendChild(probe);
  const rs = getComputedStyle(document.documentElement);
  window.__tokens = {};
  for (const n of ['press', 'present', 'dock', 'panel', 'bloom', 'world']) {
    probe.style.transitionDuration = `var(--spring-${n}-duration)`;
    window.__tokens[n] = { easing: rs.getPropertyValue(`--spring-${n}`).trim(), duration: getComputedStyle(probe).transitionDuration };
  }
  probe.remove();
  const ids = new WeakMap(); let nid = 0; window.__anim = [];
  const animRow = (a) => {
    if (!ids.has(a)) {
      ids.set(a, nid++);
      const t = a.effect ? a.effect.getTiming() : {};
      const kf = a.effect && a.effect.getKeyframes ? [...new Set(a.effect.getKeyframes().flatMap(f => Object.keys(f).filter(x => !['offset', 'computedOffset', 'easing', 'composite'].includes(x))))] : [];
      window.__anim.push({ id: ids.get(a), type: a.constructor.name, name: a.animationName || a.transitionProperty || '',
        easing: t.easing, duration: t.duration, delay: t.delay, props: kf,
        kfEasing: a.effect && a.effect.getKeyframes ? [...new Set(a.effect.getKeyframes().map(f => f.easing))] : [],
        timeline: a.timeline ? a.timeline.constructor.name : null, target: a.effect && a.effect.target ? (a.effect.target.className || '').toString().slice(0, 60) : '' });
    }
    return [ids.get(a), a.playState, a.effect ? r2((a.effect.getComputedTiming().progress ?? -1) * 1000) / 1000 : null];
  };
  window.__rows = []; window.__marks = [];
  window.__mark = (name, t) => window.__marks.push([name, t ?? performance.now()]);
  let on = true;
  window.__stop = () => { on = false; };
  const blobEl = () => ringEl.querySelector('.__plant-blob');
  const snap = (now) => {
    const row = { t: now, ms: r2(main.scrollTop || 0), car: rect(car), sl: r2(strip.scrollLeft) };
    row.cur = btns.findIndex(b => b.getAttribute('aria-current') === 'true');
    if (bodies.length) { row.bA = rect(bodies[0]); row.bB = rect(bodies[1]); row.nk = rect(neck); row.nkOp = getComputedStyle(neck).opacity; }
    row.str = layer ? layer.style.getPropertyValue('--stretch') : '';
    row.pip = pips.map(p => { const cs = getComputedStyle(p); return [cs.translate, cs.opacity]; });
    row.ring = rect(ringEl);
    const cs = getComputedStyle(ringEl);
    row.rop = r2(+cs.opacity); row.rtf = [cs.transform, cs.scale, cs.translate];
    row.mat = [cs.backdropFilter || '', cs.backgroundColor];
    const b = blobEl(); row.blob = b && getComputedStyle(b).display !== 'none' ? rect(b) : null;
    row.ranims = ringEl.getAnimations().map(animRow);
    return row;
  };
  const loop = (now) => { if (!on) return; window.__rows.push(snap(now)); raf(loop); };
  raf(loop);
  return { items: items.length, pips: pips.length, tokens: window.__tokens };
};

async function main() {
  const srv = await serve();
  const base = `http://127.0.0.1:${srv.address().port}`;
  const meta = { scenario, runTag, W, H, PLANT, BLOCK, loadStart: load(), started: new Date().toISOString(), dist: DIST,
    linearEaseStops: PLANT ? LINEAR_STOPS.map(v => +v.toFixed(5)) : undefined };
  const result = { meta };
  let browser, ctx, page;
  try {
    browser = await chromium.launch({ headless: true });
    meta.browser = browser.version();
    ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: 'no-preference', colorScheme: 'light' });
    await ctx.addInitScript(EVENT_INIT);
    if (PLANT) await ctx.addInitScript(PLANT_INIT, [PLANT, LINEAR_EASE, APPLE_W0, APPLE_Z, KE]);
    page = await ctx.newPage();
    const errors = []; page.on('pageerror', e => errors.push(String(e).slice(0, 200))); page.on('crash', () => errors.push('PAGE CRASHED'));
    await page.goto(base + '/navigation/carousel', { waitUntil: 'networkidle', timeout: 60000 });
    await sleep(1200);
    const K = scenario === 'block' ? 2 : KE;
    const sel = `[data-slot="carousel"] >> nth=${K}`;
    const stripSel = `${sel} >> [data-slot="carousel-content"]`;
    const arm = async () => (result.armed = await page.evaluate(SAMPLER, K));
    const stop = async () => { await page.evaluate(() => window.__stop()); await sleep(60);
      return page.evaluate(() => ({ rows: window.__rows, marks: window.__marks, events: window.__ev, anims: window.__anim, tokens: window.__tokens })); };
    const mark = n => page.evaluate(n => window.__mark(n), n);
    const parkInside = async () => { const b = await page.locator(stripSel).boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); };
    const intoView = async () => { await page.locator(sel).scrollIntoViewIfNeeded(); await sleep(400); };
    const mainTo = (y) => page.evaluate((y) => { const m = document.querySelector('main.demo-main-scroller') || document.querySelector('main'); m.scrollTo({ top: y, behavior: 'instant' }); }, y);
    const mainTop = () => page.evaluate(() => (document.querySelector('main.demo-main-scroller') || document.querySelector('main')).scrollTop);
    const pitchGo = (n, beh = 'smooth') => page.evaluate(([k, n, beh]) => { const s = document.querySelectorAll('[data-slot="carousel"]')[k].querySelector('[data-slot="carousel-content"]'); const p = s.children[1].offsetLeft - s.children[0].offsetLeft; if (window.__mark) window.__mark('to' + n); window.__probeCall = true; s.scrollTo({ left: n * p, behavior: beh }); window.__probeCall = false; }, [K, n, beh]);
    // click dot `a` in-page; on the worm's launch frame (first body change) start a timer; at the first frame
    // >= `delay` ms after launch either click dot `b` (retarget) or block the main thread `block` ms
    const hop = (a, b, delay, block) => page.evaluate(([k, a, b, delay, block]) => new Promise((res) => {
      const raf = window.__rafOrig;
      const pager = document.querySelectorAll('[data-slot="carousel"]')[k].querySelector('[data-slot="pager-dots"]');
      const btns = [...pager.querySelectorAll('.pager-dot')]; const bodies = [...pager.querySelectorAll('.goo-body')];
      const key = () => bodies.map(x => { const r = x.getBoundingClientRect(); return r.left.toFixed(2) + ',' + r.width.toFixed(2); }).join('|');
      const k0 = key(); let tl = null, done = false; const t0 = performance.now();
      window.__mark('click' + a); btns[a].click();
      const chk = (now) => {
        if (tl === null) { if (key() !== k0) { tl = now; window.__mark('launch', now); } }
        else if (!done && now - tl >= delay) {
          done = true;
          if (b !== null) { window.__mark('retarget' + b, now); btns[b].click(); }
          if (block) { window.__mark('blockStart', now); const s = performance.now(); while (performance.now() - s < block) { /* block */ } window.__mark('blockEnd'); }
          return res({ launch: tl, at: now });
        }
        if (performance.now() - t0 > 2000) return res({ launch: tl, timeout: true });
        raf(chk);
      };
      raf(chk);
    }), [K, a, b, delay, block]);

    if (scenario === 'retarget-mf') {
      await intoView(); await parkInside(); await arm(); await sleep(200);
      result.legs = [];
      for (const delay of [46, 80, 120, 250]) {
        await page.evaluate(() => window.__mark('leg'));
        result.legs.push(await hop(2, 4, delay, 0)); await sleep(1500);
        await page.evaluate(() => { window.__mark('reset'); [...document.querySelectorAll('[data-slot="carousel"]')[0].querySelectorAll('.pager-dot')][0].click(); });
        await sleep(1500);
      }
      Object.assign(result, await stop());
    } else if (scenario === 'block') {
      await intoView(); await parkInside(); await arm(); await sleep(200);
      result.legs = [];
      for (const i of [1, 4, 0]) { result.legs.push(await hop(i, null, 30, BLOCK)); await sleep(1800); }
      Object.assign(result, await stop());
    } else if (scenario === 'jump4') {
      await intoView(); await parkInside(); await pitchGo(0, 'instant'); await sleep(900); await arm(); await sleep(200);
      await pitchGo(4); await sleep(2500); await pitchGo(0, 'instant'); await sleep(1500); await pitchGo(4); await sleep(2500);
      Object.assign(result, await stop());
    } else if (scenario === 'enter3' && runTag.startsWith('below')) {
      // carousel K enters from BELOW: start with its top 300 px under the fold, bring it to 25 % of the viewport
      await mainTo(0); await sleep(300);
      const m0 = await mainTop(); const ct = await page.evaluate((k) => document.querySelectorAll('[data-slot="carousel"]')[k].getBoundingClientRect().top, K);
      const yIn = m0 + ct - 0.25 * H, yOut = Math.max(0, yIn - (0.75 * H + 300));
      result.entry = { yIn, yOut };
      await mainTo(yOut); await sleep(800); await page.mouse.move(W / 2, H / 2);
      result.outState = await page.evaluate(([k, H]) => { const b = document.querySelectorAll('[data-slot="carousel"]')[k].getBoundingClientRect(); return { carTop: b.top, carBottom: b.bottom, H }; }, [K, H]);
      result.plantArmed = await page.evaluate(() => (window.__plantArm ? window.__plantArm() : null));
      await sleep(100); await arm();
      if (runTag.includes('wheel')) {
        await mark('wheel'); for (let i = 0; i < 80; i++) { await page.mouse.wheel(0, 40); await sleep(133); if ((await mainTop()) >= yIn) break; }
        await mark('scrolled'); await sleep(2800);
      } else { await mark('jump'); await mainTo(yIn); await sleep(2800); }
      Object.assign(result, await stop());
    } else if (scenario === 'enter3') {
      // at 1440 x 900 <main> scrolls only 324 px and the hero never leaves the viewport: these runs use H 500
      await mainTo(1500); await sleep(800); await page.mouse.move(W / 2, H / 2);
      result.outState = await page.evaluate(([k, H]) => { const b = document.querySelectorAll('[data-slot="carousel"]')[k].getBoundingClientRect(); return { carTop: b.top, carBottom: b.bottom, H }; }, [K, H]);
      result.plantArmed = await page.evaluate(() => (window.__plantArm ? window.__plantArm() : null));
      // the in-position puts the carousel's top at 25 % of the viewport (at H 500 and <main> at 0 only 55 % of the
      // hero is visible, under the plants' 0.6 threshold)
      const yIn = Math.max(0, (await mainTop()) + result.outState.carTop - 0.25 * H); result.entry = { yIn };
      await sleep(100); await arm();
      if (runTag.startsWith('wheel')) {
        await mark('wheel'); for (let i = 0; i < 60; i++) { await page.mouse.wheel(0, -40); await sleep(133); if ((await mainTop()) <= yIn) break; }
        await mark('scrolled'); await sleep(2800);
      } else {
        await mark('jump'); await mainTo(yIn); await sleep(2800);
        if (runTag.startsWith('outback')) {
          await mark('out'); await mainTo(1500); await sleep(900);
          result.outState2 = await page.evaluate((k) => { const b = document.querySelectorAll('[data-slot="carousel"]')[k].getBoundingClientRect(); return { carTop: b.top, carBottom: b.bottom }; }, K);
          await mark('back'); await mainTo(yIn); await sleep(2800);
        }
      }
      Object.assign(result, await stop());
    } else throw new Error('unknown scenario ' + scenario);
    result.errors = errors;
    meta.loadEnd = load();
  } finally {
    if (page) await page.close().catch(() => {});
    if (ctx) await ctx.close().catch(() => {});
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
