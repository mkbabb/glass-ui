// GAP probe: glass-ui's carousel, pager worm, deck and shell dock, measured with the
// instruments the O-95 study and re-measure used on apple.com/apple-homeview.
// Per-rAF getComputedStyle/getBoundingClientRect sampling, one headless Chromium per
// run, an in-process static server over the built demo (dist-demo), everything closed
// in `finally`.
//
// usage: node probe.mjs <scenario> <runTag> [W H]
// scenarios: rest enter pager-next smooth autoplay click retarget hover idle drag-snapback drag-fling
//            overscroll resize reduced dark deck dock-scroll worm-hero
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'data');
const FR = join(HERE, '..', 'frames');
mkdirSync(OUT, { recursive: true }); mkdirSync(FR, { recursive: true });
const DIST = process.env.GAP_DIST || '/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/REF/gap/wt/dist-demo';
const [scenario, runTag = 'r1', Wa, Ha] = process.argv.slice(2);
const TOUCH = /^drag|overscroll|touch/.test(scenario);
const W = +(Wa || (TOUCH ? 390 : 1440)), H = +(Ha || (TOUCH ? 844 : 900));
const load = () => execSync('sysctl -n vm.loadavg').toString().trim();
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---- static server (SPA fallback) -----------------------------------------
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.wasm': 'application/wasm' };
function serve() {
  return new Promise(res => {
    const srv = createServer((req, rsp) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let f = join(DIST, p);
      if (!f.startsWith(DIST) || !existsSync(f) || statSync(f).isDirectory()) f = join(DIST, 'index.html');
      rsp.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' });
      rsp.end(readFileSync(f));
    });
    srv.listen(0, '127.0.0.1', () => res(srv));
  });
}

// ---- in-page sampler -------------------------------------------------------
// Installed with page.evaluate(SAMPLER, exhibitIndex). Records one row per rAF into
// window.__rows until window.__stop(). Reads the frame the previous rAF committed.
const SAMPLER = (k) => {
  const r2 = x => Math.round(x * 100) / 100;
  const car = document.querySelectorAll('[data-slot="carousel"]')[k];
  const strip = car ? car.querySelector('[data-slot="carousel-content"]') : null;
  const items = strip ? [...strip.children] : [];
  const pager = car ? car.querySelector('[data-slot="pager-dots"]') : document.querySelector('[data-slot="pager-dots"]');
  const bodies = pager ? [...pager.querySelectorAll('.goo-body')] : [];
  const neck = pager ? pager.querySelector('.goo-neck') : null;
  const layer = pager ? pager.querySelector('.pager-worm-layer') : null;
  const pips = pager ? [...pager.querySelectorAll('.goo-dot')] : [];
  const btns = pager ? [...pager.querySelectorAll('.pager-dot')] : [];
  const dock = [...document.querySelectorAll('.glass-dock')].map(e => [e, e.getBoundingClientRect()]).filter(([e, b]) => b.width * b.height > 0).sort((a, b) => b[1].width * b[1].height - a[1].width * a[1].height).map(x => x[0])[0] || null;
  const main = document.querySelector('main.demo-main-scroller') || document.scrollingElement;
  const rect = el => { const b = el.getBoundingClientRect(); return [r2(b.left), r2(b.top), r2(b.width), r2(b.height)]; };
  window.__rows = [];
  window.__marks = [];
  window.__mark = (name) => window.__marks.push([name, performance.now()]);
  let on = true;
  window.__stop = () => { on = false; };
  const snap = (now) => {
    const row = { t: now, pn: performance.now(), sy: scrollY, ms: Math.round(main.scrollTop * 100) / 100 };
    if (strip) {
      row.sl = r2(strip.scrollLeft); row.st = r2(strip.scrollTop);
      row.it = items.map(n => { const cs = getComputedStyle(n); const c = n.firstElementChild;
        return [n.dataset.state, cs.scale, r2(+cs.opacity), c ? getComputedStyle(c).translate : '', r2(n.getBoundingClientRect().left)]; });
    }
    if (pager) {
      row.cur = btns.findIndex(b => b.getAttribute('aria-current') === 'true');
      row.bA = rect(bodies[0]); row.bB = rect(bodies[1]); row.nk = rect(neck);
      row.nkOp = getComputedStyle(neck).opacity;
      row.str = layer.style.getPropertyValue('--stretch');
      const vis = [row.bA, row.bB].concat(+row.nkOp > 0 ? [row.nk] : []);
      const lo = Math.min(...vis.map(b => b[0])), hi = Math.max(...vis.map(b => b[0] + b[2]));
      row.wl = r2(lo); row.ww = r2(hi - lo); row.wh = r2(Math.max(...vis.map(b => b[3])));
      row.pip = pips.map(p => { const cs = getComputedStyle(p, '::before'); return [cs.scale, cs.backgroundColor, getComputedStyle(p).translate]; });
      row.ring = rect(pager);
    }
    if (dock) { const cs = getComputedStyle(dock); row.dk = rect(dock); row.dkT = cs.transform; row.dkO = cs.opacity; }
    row.anims = document.getAnimations().filter(a => a.playState === 'running').length;
    return row;
  };
  const loop = (now) => { if (!on) return; window.__rows.push(snap(now)); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  return { items: items.length, pips: pips.length, hasDock: !!dock };
};

// Static anatomy + material of the elements the study described at rest.
const ANATOMY = (k) => {
  const r2 = x => Math.round(x * 100) / 100;
  const car = document.querySelectorAll('[data-slot="carousel"]')[k];
  const pager = car ? car.querySelector('[data-slot="pager-dots"]') : document.querySelector('[data-slot="pager-dots"]');
  const mat = el => { if (!el) return null; const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
    return { x: r2(b.left), y: r2(b.top), w: r2(b.width), h: r2(b.height), radius: cs.borderRadius, bf: cs.backdropFilter || cs.webkitBackdropFilter,
      bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 300), shadow: cs.boxShadow, border: cs.borderTopWidth + ' ' + cs.borderTopStyle + ' ' + cs.borderTopColor,
      filter: cs.filter, pos: cs.position, bottom: cs.bottom, opacity: cs.opacity, transition: cs.transition.slice(0, 300) }; };
  const out = { pager: mat(pager) };
  if (pager) {
    out.pips = [...pager.querySelectorAll('.goo-dot')].map(p => { const cs = getComputedStyle(p, '::before'); const b = p.getBoundingClientRect();
      return { cx: r2(b.left + b.width / 2), w: cs.width, h: cs.height, bg: cs.backgroundColor, tr: cs.transition }; });
    out.bodies = [...pager.querySelectorAll('.goo-body, .goo-neck')].map(mat);
    out.btn = mat(pager.querySelector('.pager-dot'));
  }
  if (car) { const s = car.querySelector('[data-slot="carousel-content"]'); const cs = getComputedStyle(s);
    out.strip = { snap: cs.scrollSnapType, beh: cs.scrollBehavior, osb: cs.overscrollBehaviorX, w: s.clientWidth, sw: s.scrollWidth,
      itemTr: getComputedStyle(s.children[0]).transition, stop: getComputedStyle(s.children[0]).scrollSnapStop }; }
  const dock = [...document.querySelectorAll('.glass-dock')].map(e => [e, e.getBoundingClientRect()]).filter(([e, b]) => b.width * b.height > 0).sort((a, b) => b[1].width * b[1].height - a[1].width * a[1].height).map(x => x[0])[0] || null;
  out.dock = mat(dock);
  if (dock) { const plate = dock.querySelector('.dock-plate'); out.dockPlate = mat(plate);
    out.dockPlateBefore = plate ? (() => { const cs = getComputedStyle(plate, '::before'); return { bf: cs.backdropFilter, bg: cs.backgroundColor, shadow: cs.boxShadow }; })() : null; }
  const vars = getComputedStyle(document.documentElement);
  out.tokens = Object.fromEntries(['--spring-dock', '--spring-dock-duration', '--spring-world-duration', '--spring-press', '--spring-press-duration',
    '--duration-fast', '--ease-standard', '--space-body', '--space-residue', '--glass-veil-floating'].map(n => [n, vars.getPropertyValue(n).trim().slice(0, 400)]));
  return out;
};

async function main() {
  const srv = await serve();
  const base = `http://127.0.0.1:${srv.address().port}`;
  const meta = { scenario, runTag, W, H, loadStart: load(), started: new Date().toISOString(), dist: DIST };
  let browser;
  const result = { meta };
  try {
    browser = await chromium.launch({ headless: true });
    meta.chromium = browser.version();
    const ctx = await browser.newContext({
      viewport: { width: W, height: H }, deviceScaleFactor: 1, hasTouch: TOUCH, isMobile: TOUCH,
      reducedMotion: scenario === 'reduced' ? 'reduce' : 'no-preference',
      colorScheme: scenario === 'dark' ? 'dark' : 'light',
    });
    // Touch release fires pointerleave, which restarts the demo's 4200 ms autoplay and
    // contaminates commit timings; drag scenarios block that one timer (demo-only, not
    // library code).
    if (TOUCH) await ctx.addInitScript(() => { const si = window.setInterval; window.setInterval = (f, ms, ...a) => ms === 4200 ? 0 : si(f, ms, ...a); });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    const route = scenario === 'deck' ? '/motion/deck' : '/navigation/carousel';
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await sleep(1200);
    const K = scenario === 'worm-hero' ? 2 : (scenario === 'pager-next' || scenario === 'reduced') ? 1 : 0; // exhibit index: 0 hero, 2 hero-scale worm
    const sel = `[data-slot="carousel"] >> nth=${K}`;
    const pagerSel = scenario === 'deck' ? '[data-slot="pager-dots"]' : `${sel} >> [data-slot="pager-dots"]`;
    const dotSel = i => `${pagerSel} >> .pager-dot >> nth=${i}`;
    const stripSel = `${sel} >> [data-slot="carousel-content"]`;
    const arm = async () => page.evaluate(SAMPLER, K);
    const stop = async () => { await page.evaluate(() => window.__stop()); await sleep(50); return page.evaluate(() => ({ rows: window.__rows, marks: window.__marks })); };
    const mark = n => page.evaluate(n => window.__mark(n), n);
    // stop the demo autoplay unless the scenario is about it: park the pointer inside
    // the hero frame (pointerenter stops it; it restarts on pointerleave).
    const parkInside = async () => { const b = await page.locator(stripSel).boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); };
    const intoView = async () => { await page.locator(sel).scrollIntoViewIfNeeded(); await sleep(400); };

    if (scenario !== 'enter' && scenario !== 'dock-scroll' && scenario !== 'deck') await intoView();
    result.anatomy = await page.evaluate(ANATOMY, K);

    if (scenario === 'rest' || scenario === 'dark') {
      await parkInside(); await arm(); await sleep(1500); Object.assign(result, await stop());
      await page.locator(sel).screenshot({ path: join(FR, `${scenario}-${runTag}-${W}.png`) });
    } else if (scenario === 'enter') {
      // The study's trigger: scroll the element in from below, slowly (300 px/s, 1 px steps
      // per 3.3 ms ≈ 2.5 px per 120 Hz frame). Anything that animates on entry is recorded.
      await page.evaluate(() => { const m = document.querySelector('main') || document.scrollingElement; (m.scrollTo ? m : window).scrollTo(0, 0); });
      await sleep(600);
      await arm();
      const scroller = await page.evaluate(() => { const c = [document.scrollingElement, ...document.querySelectorAll('main, [data-scroll-root], .app-main')].find(e => e && e.scrollHeight > e.clientHeight + 10); return c ? (c.tagName + '.' + c.className).slice(0, 80) : null; });
      result.scroller = scroller;
      const targetY = await page.evaluate(() => { const c = document.querySelector('[data-slot="carousel"]'); return c.getBoundingClientRect().top; });
      result.targetTop0 = targetY;
      await page.mouse.move(W / 2, H / 2);
      const steps = Math.ceil((targetY - H * 0.4) / 40);
      for (let i = 0; i < Math.max(steps, 10); i++) { await page.mouse.wheel(0, 40); await sleep(133); } // 300 px/s
      await mark('scrolled');
      await sleep(2500);
      Object.assign(result, await stop());
    } else if (scenario === 'autoplay') {
      // the demo autoplay ticks every 4200 ms while the pointer is outside the frame
      await page.mouse.move(5, 5);
      await arm(); await sleep(9800); Object.assign(result, await stop());
    } else if (scenario === 'click') {
      await parkInside(); await sleep(300); await arm(); await sleep(200);
      for (const [i, wait] of [[1, 1600], [4, 2200], [0, 2400]]) {
        const b = await page.locator(dotSel(i)).boundingBox();
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await sleep(150);
        await mark('click' + i); await page.mouse.down(); await page.mouse.up(); await sleep(wait);
        if (i === 4) await page.locator(sel).screenshot({ path: join(FR, `click-dot4-${runTag}-${W}.png`) });
      }
      Object.assign(result, await stop());
    } else if (scenario === 'retarget') {
      await parkInside(); await sleep(300); await arm(); await sleep(200);
      const b2 = await page.locator(dotSel(2)).boundingBox(); const b4 = await page.locator(dotSel(4)).boundingBox(); const b1 = await page.locator(dotSel(1)).boundingBox();
      await page.mouse.move(b2.x + 12, b2.y + 12); await mark('click2'); await page.mouse.down(); await page.mouse.up();
      await sleep(250); await page.mouse.move(b4.x + 12, b4.y + 12); await mark('click4'); await page.mouse.down(); await page.mouse.up();
      await sleep(2200);
      // reverse mid-flight: 4 -> 0 then at +200 ms back to 1
      const b0 = await page.locator(dotSel(0)).boundingBox();
      await page.mouse.move(b0.x + 12, b0.y + 12); await mark('click0'); await page.mouse.down(); await page.mouse.up();
      await sleep(200); await page.mouse.move(b1.x + 12, b1.y + 12); await mark('click1'); await page.mouse.down(); await page.mouse.up();
      await sleep(2200);
      Object.assign(result, await stop());
    } else if (scenario === 'hover') {
      await parkInside(); await arm(); await sleep(200);
      const b = await page.locator(dotSel(2)).boundingBox();
      await page.mouse.move(b.x + 12, b.y + 12); await mark('hoverIn'); await sleep(700);
      await mark('down'); await page.mouse.down(); await sleep(500); await mark('up'); await page.mouse.up(); await sleep(1600);
      const b3 = await page.locator(dotSel(3)).boundingBox(); await page.mouse.move(b3.x + 12, b3.y + 12); await sleep(300);
      await page.mouse.move(b.x + 12, b.y - 60); await mark('hoverOut'); await sleep(700);
      Object.assign(result, await stop());
    } else if (scenario === 'idle') {
      await parkInside(); await sleep(500); await arm(); await sleep(4000); Object.assign(result, await stop());
      result.idleAnims = await page.evaluate(() => document.getAnimations().map(a => [a.playState, a.animationName || a.transitionProperty || '', a.effect && a.effect.target ? (a.effect.target.className || '').toString().slice(0, 40) : '']));
    } else if (scenario.startsWith('drag') || scenario === 'overscroll') {
      // CDP touch legs on the hero strip at 390 (the study's 390 touch cell)
      await parkInside(); await sleep(200);
      const b = await page.locator(stripSel).boundingBox();
      const y = b.y + b.height / 2;
      const touch = async (type, x) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
      await arm(); await sleep(200);
      const leg = async (x0, dx, ms, name, hold = 0) => {
        await mark(name + ':down'); await touch('touchStart', x0);
        const n = Math.max(2, Math.round(ms / 8));
        for (let i = 1; i <= n; i++) { await touch('touchMove', x0 + dx * i / n); await sleep(ms / n); }
        if (hold) await sleep(hold);
        await mark(name + ':up'); await touch('touchEnd', x0 + dx); await sleep(2000);
      };
      const cx = b.x + b.width / 2;
      if (scenario === 'drag-snapback') {
        await leg(cx + 60, -0.3 * b.width, 1200, 'slow30', 120);  // slow, 30 % of the stride, still at release
        await leg(cx + 60, -0.3 * b.width, 1200, 'slow30b', 120);
        await leg(cx + 80, -0.62 * b.width, 1500, 'slow62', 120); // crosses the half-stride under the finger
      } else if (scenario === 'drag-fling') {
        await leg(cx + 60, -117, 90, 'fling117');                 // the re-measure's flick: 117 px in 90 ms
        await leg(cx + 80, -160, 100, 'fling160');                // the study's: 160 px in 100 ms
        await leg(cx + 80, -160, 100, 'fling160b');
      } else {
        await page.evaluate(() => { const s = document.querySelector('[data-slot="carousel-content"]'); s.scrollLeft = 0; });
        await sleep(600);
        await leg(b.x + 40, 200, 600, 'over200', 150);
      }
      Object.assign(result, await stop());
    } else if (scenario === 'resize') {
      await parkInside(); await sleep(200);
      await page.evaluate(() => { const s = document.querySelector('[data-slot="carousel-content"]'); const p = s.children[1].offsetLeft - s.children[0].offsetLeft; s.scrollTo({ left: 2 * p, behavior: 'instant' }); });
      await sleep(1200);
      await arm(); await sleep(200);
      for (const w of [1000, 600, 1440]) { await mark('resize' + w); await page.setViewportSize({ width: w, height: H }); await sleep(900); }
      Object.assign(result, await stop());
    } else if (scenario === 'reduced') {
      await parkInside(); await sleep(200); await arm(); await sleep(200);
      const nb = await page.locator(`${sel} >> [data-slot="carousel-pager-next"]`).boundingBox();
      await page.mouse.move(nb.x + nb.width / 2, nb.y + nb.height / 2); await mark('next1'); await page.mouse.down(); await page.mouse.up(); await sleep(1500);
      await page.evaluate(() => window.__mark('scrollTo4'));
      await page.evaluate(() => { const s = document.querySelectorAll('[data-slot="carousel"]')[1].querySelector('[data-slot="carousel-content"]'); const p = s.children[1].offsetLeft - s.children[0].offsetLeft; s.scrollTo({ left: 4 * p, behavior: 'smooth' }); });
      await sleep(1500);
      Object.assign(result, await stop());
    } else if (scenario === 'deck') {
      await page.locator('[data-slot="deck-stage"]').scrollIntoViewIfNeeded(); await sleep(400);
      // sample the active and previous slide transforms plus the pager worm
      await page.evaluate(() => {
        const slides = [...document.querySelectorAll('[data-slot="deck-stage"] .deck-slide')];
        const pager = document.querySelector('[data-slot="pager-dots"]');
        const bodies = pager ? [...pager.querySelectorAll('.goo-body')] : []; const neck = pager ? pager.querySelector('.goo-neck') : null;
        const r2 = x => Math.round(x * 100) / 100;
        const rect = el => { const b = el.getBoundingClientRect(); return [r2(b.left), r2(b.top), r2(b.width), r2(b.height)]; };
        window.__rows = []; window.__marks = []; window.__mark = n => window.__marks.push([n, performance.now()]);
        let on = true; window.__stop = () => { on = false; };
        const loop = now => { if (!on) return;
          window.__rows.push({ t: now, sl: slides.map(s => { const cs = getComputedStyle(s); return [s.dataset.state, cs.transform, r2(+cs.opacity)]; }),
            bA: bodies[0] ? rect(bodies[0]) : null, bB: bodies[1] ? rect(bodies[1]) : null, nk: neck ? rect(neck) : null, nkOp: neck ? getComputedStyle(neck).opacity : null });
          requestAnimationFrame(loop); };
        requestAnimationFrame(loop);
      });
      await page.locator('[data-slot="deck-stage"]').click({ position: { x: 5, y: 5 } }).catch(() => {});
      await sleep(300);
      await mark('ArrowRight'); await page.keyboard.press('ArrowRight'); await sleep(1500);
      await mark('ArrowRight2'); await page.keyboard.press('ArrowRight'); await sleep(250);
      await mark('ArrowLeft-retarget'); await page.keyboard.press('ArrowLeft'); await sleep(1500);
      Object.assign(result, await stop());
    } else if (scenario === 'dock-scroll') {
      // the shell dock under page scroll: does it lag, squash or move? (R-08)
      await arm(); await sleep(300);
      await page.mouse.move(W / 2, H / 3);
      for (let i = 0; i < 20; i++) { await page.mouse.wheel(0, 80); await sleep(16); }
      await mark('flung'); await sleep(1500);
      for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 8); await sleep(100); }
      await sleep(800);
      Object.assign(result, await stop());
    } else if (scenario === 'pager-next') {
      await page.locator(sel).scrollIntoViewIfNeeded(); await sleep(300);
      result.anatomy = await page.evaluate(ANATOMY, K);
      await arm(); await sleep(200);
      const nb = await page.locator(`${sel} >> [data-slot="carousel-pager-next"]`).boundingBox();
      await page.mouse.move(nb.x + nb.width / 2, nb.y + nb.height / 2); await sleep(150);
      await mark('next1'); await page.mouse.down(); await page.mouse.up(); await sleep(1600);
      // retarget: three presses 120 ms apart
      await mark('next3a'); await page.mouse.down(); await page.mouse.up(); await sleep(120);
      await mark('next3b'); await page.mouse.down(); await page.mouse.up(); await sleep(120);
      await mark('next3c'); await page.mouse.down(); await page.mouse.up(); await sleep(1800);
      Object.assign(result, await stop());
    } else if (scenario === 'smooth') {
      // the platform curve useDeckSnap.scrollTo rides (behavior 'smooth'), on the hero strip,
      // at 1, 3 and 4 members, plus a reversal at +250 ms
      await parkInside(); await arm(); await sleep(200);
      const go = (n) => page.evaluate((n) => { const s = document.querySelector('[data-slot="carousel-content"]'); const p = s.children[1].offsetLeft - s.children[0].offsetLeft; window.__mark('to' + n); s.scrollTo({ left: n * p, behavior: 'smooth' }); }, n);
      await go(1); await sleep(1500); await go(4); await sleep(1800); await go(1); await sleep(1800);
      await go(4); await sleep(250); await go(0); await sleep(2000);
      Object.assign(result, await stop());
    } else if (scenario === 'worm-frames') {
      // a few stills of the worm mid-hop (1 -> 4); each still logs the page time it shows
      await parkInside(); await sleep(300);
      const b = await page.locator(dotSel(4)).boundingBox();
      await page.mouse.move(b.x + 12, b.y + 12);
      const ring = await page.locator(pagerSel).boundingBox();
      const clip = { x: ring.x - 40, y: ring.y - 14, width: ring.width + 80, height: ring.height + 28 };
      const shots = [];
      await page.screenshot({ path: join(FR, `worm-frames-${runTag}-0.png`), clip });
      const t0 = await page.evaluate(() => performance.now());
      await page.mouse.down(); await page.mouse.up();
      for (let k = 1; k <= 5; k++) {
        const tp = await page.evaluate(() => performance.now());
        await page.screenshot({ path: join(FR, `worm-frames-${runTag}-${k}.png`), clip });
        shots.push([k, Math.round(tp - t0)]);
      }
      result.shots = shots; result.clip = clip;
    } else if (scenario === 'worm-hero') {
      await parkInside(); await sleep(200); await arm(); await sleep(200);
      for (const [i, wait] of [[1, 1400], [4, 1800]]) { const b = await page.locator(dotSel(i)).boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await mark('click' + i); await page.mouse.down(); await page.mouse.up(); await sleep(wait); }
      Object.assign(result, await stop());
    } else throw new Error('unknown scenario ' + scenario);
    meta.loadEnd = load();
    await page.close(); await ctx.close();
  } finally {
    if (browser) await browser.close().catch(() => {});
    srv.close();
  }
  const f = join(OUT, `${scenario}-${runTag}-${W}.json.gz`);
  writeFileSync(f, gzipSync(JSON.stringify(result)));
  console.log(JSON.stringify({ wrote: f, rows: result.rows ? result.rows.length : 0, load: [meta.loadStart, meta.loadEnd] }));
}
main().catch(e => { console.error(e); process.exit(1); });
