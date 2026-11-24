// live-probe.mjs <engine> <out.json>
// Roots O-420 items 1 and 3 on the live sites (read-only). One browser, a context per cell,
// everything closed in finally. Per cell on fourier: (a) the open and the close, every
// seat's and the seal's EFFECTIVE opacity (the product of `opacity` over the ancestors that
// generate a box, so a `display: contents` wrapper's own opacity counts for nothing, as it
// paints nothing) and box, per rendered frame; (b) the theme press: the run's scroll offset,
// scroll events, the snap positions, focus and the root's class, per frame; (c) Chromium
// only: a timeline trace over the close, to name what fills its long frames. On color and on
// glass's bottom dock: what the run's direct children are.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(HERE, "../../trees/v11.1.0/package.json"));
const pw = require("playwright");
const [engine = "chromium", outPath] = process.argv.slice(2);
const out = { engine, cells: [] };

const SAMPLER = `(() => {
  window.__eff = (el, stop) => { let o = 1; for (let n = el; n && n !== stop.parentElement; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.display !== 'contents') o *= +cs.opacity; } return +o.toFixed(3); };
  window.__sample = (sel, ms) => new Promise((done) => {
    const d = document.querySelector(sel); const run = d.querySelector('.dock-run, .dock-layer--full'); const sum = d.querySelector('.dock-layer--summary');
    const seats = [...run.querySelectorAll('[data-glass-dock-seat]')];
    const seal = sum && sum.firstElementChild;
    const rows = []; const t0 = performance.now(); let last = t0;
    const tick = (now) => {
      const r = d.getBoundingClientRect();
      rows.push({ t: +(now - t0).toFixed(1), dt: +(now - last).toFixed(1), m: d.hasAttribute('data-morphing') ? 1 : 0, mt: d.style.getPropertyValue('--dock-morph-t'), x: +r.left.toFixed(2), w: +r.width.toFixed(2), runOp: +getComputedStyle(run).opacity,
        seats: seats.map((s) => { const b = s.getBoundingClientRect(); return [+b.left.toFixed(2), window.__eff(s, d)]; }),
        seal: seal ? (() => { const b = seal.getBoundingClientRect(); return [+b.left.toFixed(2), window.__eff(seal, d)]; })() : null });
      last = now;
      if (now - t0 < ms) requestAnimationFrame(tick); else done({ rows, seatChain: seats.map((s) => { const c = []; for (let n = s.parentElement; n && n !== run; n = n.parentElement) c.push((n.className && n.className.toString().slice(0, 32)) + '|' + getComputedStyle(n).display); return c; }) });
    };
    requestAnimationFrame(tick);
  });
})()`;

async function openDock(page, sel, coarse) {
  const b = await page.locator(sel).first().boundingBox();
  if (coarse) await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2);
  else await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
}

async function fourierCell(browser, w, scheme) {
  const coarse = w < 800;
  const ctx = await browser.newContext({ viewport: { width: w, height: coarse ? 844 : 900 }, deviceScaleFactor: 2, colorScheme: scheme, hasTouch: coarse });
  const cell = { site: "fourier", w, scheme };
  try {
    const page = await ctx.newPage();
    await page.addInitScript(SAMPLER);
    await page.goto("https://fourier.babb.dev/w", { waitUntil: "networkidle", timeout: 45000 });
    const sel = "header .glass-dock";
    await page.waitForSelector(sel, { timeout: 20000 });
    await page.waitForTimeout(1500);
    // (a) open
    const openP = page.evaluate(([s]) => window.__sample(s, 700), [sel]);
    await page.waitForTimeout(60);
    await openDock(page, sel, coarse);
    cell.open = await openP;
    await page.waitForTimeout(500);
    // (b) press the theme seat
    cell.pressBefore = await page.evaluate(([s]) => {
      const d = document.querySelector(s), run = d.querySelector('.dock-run');
      const cs = getComputedStyle(run);
      const seats = [...run.querySelectorAll('[data-glass-dock-seat]')];
      const rr = run.getBoundingClientRect();
      return { sl: run.scrollLeft, sw: run.scrollWidth, cw: run.clientWidth, maxScroll: run.scrollWidth - run.clientWidth, fits: d.hasAttribute('data-run-fits'), yieldVar: getComputedStyle(d).getPropertyValue('--dock-run-yield'),
        snapType: cs.scrollSnapType, scrollPadL: cs.scrollPaddingLeft, padL: cs.paddingLeft, padR: cs.paddingRight, before: getComputedStyle(run, '::before').width, after: getComputedStyle(run, '::after').width,
        runW: +rr.width.toFixed(3), runOffW: run.offsetWidth,
        seatSnap: seats.map((x) => { const b = x.getBoundingClientRect(); return [x.getAttribute('aria-label') || x.className.toString().slice(0, 20), +(b.left - rr.left + run.scrollLeft - parseFloat(cs.paddingLeft || 0)).toFixed(2), getComputedStyle(x).scrollSnapAlign]; }) };
    }, [sel]);
    await page.evaluate(([s]) => {
      const d = document.querySelector(s), run = d.querySelector('.dock-run');
      const seats = [...run.querySelectorAll('[data-glass-dock-seat]')];
      const t0 = performance.now(); window.__pt0 = t0; const rows = (window.__prow = []), ev = (window.__pev = []);
      run.addEventListener('scroll', () => ev.push({ t: +(performance.now() - t0).toFixed(1), e: 'scroll', sl: run.scrollLeft }));
      run.addEventListener('scrollend', () => ev.push({ t: +(performance.now() - t0).toFixed(1), e: 'scrollend', sl: run.scrollLeft }));
      document.addEventListener('focusin', (e) => ev.push({ t: +(performance.now() - t0).toFixed(1), e: 'focusin', tgt: (e.target.getAttribute && e.target.getAttribute('aria-label')) || e.target.className?.toString?.().slice(0, 24) }), true);
      document.addEventListener('pointerdown', () => ev.push({ t: +(performance.now() - t0).toFixed(1), e: 'pointerdown' }), true);
      document.addEventListener('click', () => ev.push({ t: +(performance.now() - t0).toFixed(1), e: 'click' }), true);
      new MutationObserver((rs) => { for (const r of rs) ev.push({ t: +(performance.now() - t0).toFixed(1), e: 'html.' + r.attributeName, v: document.documentElement.getAttribute(r.attributeName)?.slice(0, 60) }); }).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });
      new MutationObserver((rs) => { for (const r of rs) ev.push({ t: +(performance.now() - t0).toFixed(1), e: 'dock.' + r.attributeName, tgt: r.target === d ? 'root' : (r.target.className?.toString?.() || '').slice(0, 30), v: r.target.getAttribute(r.attributeName)?.slice(0, 50) }); }).observe(d, { attributes: true, subtree: true, attributeFilter: ['data-run-fits', 'class', 'data-morphing'] });
      const tick = (now) => { const b0 = seats[0].getBoundingClientRect(); rows.push({ t: +(now - t0).toFixed(1), sl: run.scrollLeft, s0: +b0.left.toFixed(2), sw: run.scrollWidth, cw: run.clientWidth, fits: d.hasAttribute('data-run-fits') ? 1 : 0, bW: getComputedStyle(run, '::before').width, aW: getComputedStyle(run, '::after').width }); if (now - t0 < 1300) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, [sel]);
    const tb = await page.locator(".sun-moon-toggle").first().boundingBox();
    cell.pressAt = await page.evaluate(() => +(performance.now() - window.__pt0).toFixed(1));
    if (coarse) await page.touchscreen.tap(tb.x + tb.width / 2, tb.y + tb.height / 2);
    else { await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.mouse.down(); await page.mouse.up(); }
    await page.waitForTimeout(1400);
    cell.press = await page.evaluate(() => ({ rows: window.__prow.filter((r, i, a) => i === 0 || r.sl !== a[i - 1].sl || r.s0 !== a[i - 1].s0 || r.fits !== a[i - 1].fits || r.bW !== a[i - 1].bW), ev: window.__pev }));
    cell.pressAfter = await page.evaluate(([s]) => { const d = document.querySelector(s), run = d.querySelector('.dock-run'); return { sl: run.scrollLeft, sw: run.scrollWidth, cw: run.clientWidth, fits: d.hasAttribute('data-run-fits'), before: getComputedStyle(run, '::before').width, after: getComputedStyle(run, '::after').width, active: document.activeElement?.getAttribute?.('aria-label') }; }, [sel]);
    // (c) the close, with a trace in Chromium
    const tracing = engine === "chromium";
    if (tracing) await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "v8.execute", "blink.user_timing"] });
    const closeP = page.evaluate(([s]) => window.__sample(s, 700), [sel]);
    await page.waitForTimeout(40);
    const tClose = Date.now();
    await page.evaluate(([s]) => { const d = document.querySelector(s); const seat = d.querySelector('.dock-run [data-glass-dock-seat]'); seat.focus({ preventScroll: true }); seat.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); }, [sel]);
    cell.close = await closeP;
    if (tracing) {
      const buf = await browser.stopTracing();
      const tr = JSON.parse(buf.toString());
      const evs = (tr.traceEvents || tr).filter((e) => e.ph === "X" && e.dur);
      // the close's first 140 ms on the main thread, by the renderer's own clock
      const mark = evs.filter((e) => e.name === "EventDispatch" && e.args?.data?.type === "keydown").map((e) => e.ts).sort((a, b) => b - a)[0];
      const main = evs.filter((e) => mark && e.ts >= mark && e.ts < mark + 140000);
      const top = {};
      for (const e of main) { const fn = e.args?.data?.functionName || e.args?.data?.url?.split('/').pop() || ''; const k = e.name + (fn ? ':' + fn : ''); top[k] = (top[k] || 0) + e.dur; }
      cell.trace = { keydownTs: mark, top: Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, v]) => [k, +(v / 1000).toFixed(2)]),
        frames: evs.filter((e) => mark && e.ts >= mark && e.ts < mark + 140000 && /^(UpdateLayoutTree|Layout|FunctionCall|RunTask|Paint|PrePaint|Commit|RecalculateStyles|ParseAuthorStyleSheet|ScheduleStyleRecalculation)$/.test(e.name) && e.dur > 2000).map((e) => [e.name, +((e.ts - mark) / 1000).toFixed(1), +(e.dur / 1000).toFixed(2), e.args?.data?.functionName || e.args?.data?.url?.split('/').pop() || e.args?.elementCount || e.args?.beginData?.dirtyObjects || ''].slice(0, 4)) };
    }
  } catch (e) { cell.error = String(e).slice(0, 400); }
  finally { await ctx.close(); }
  return cell;
}

async function structureCell(browser, site, url, sel, w) {
  const coarse = w < 800;
  const ctx = await browser.newContext({ viewport: { width: w, height: coarse ? 844 : 900 }, deviceScaleFactor: 2, hasTouch: coarse });
  const cell = { site, w, structure: true };
  try {
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForSelector(sel, { timeout: 20000 });
    await page.waitForTimeout(1500);
    cell.children = await page.evaluate(([s]) => { const d = document.querySelector(s); const run = d.querySelector('.dock-layer--full'); return [...run.children].map((c) => ({ cls: c.className.toString().slice(0, 50), tag: c.tagName, display: getComputedStyle(c).display, seats: c.querySelectorAll('[data-glass-dock-seat]').length, isSeat: c.hasAttribute('data-glass-dock-seat'), w: +c.getBoundingClientRect().width.toFixed(1) })); }, [sel]);
  } catch (e) { cell.error = String(e).slice(0, 300); }
  finally { await ctx.close(); }
  return cell;
}

const browser = await pw[engine].launch(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : {});
try {
  for (const [w, scheme] of [[1440, "light"], [390, "light"], [1440, "dark"], [390, "dark"]]) out.cells.push(await fourierCell(browser, w, scheme));
  out.cells.push(await structureCell(browser, "color", "https://color.babb.dev/", ".glass-dock", 1440));
  out.cells.push(await structureCell(browser, "glass-bottom", "https://glass.babb.dev/dock/chrome", "[data-testid=bottom-dock-collapsible]", 390));
} finally { await browser.close(); writeFileSync(outPath, JSON.stringify(out)); }
