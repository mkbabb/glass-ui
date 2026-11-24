// witness.mjs <engine> <out.json> [trees=base,cure]
// The O-420 witness: each tree's slim page (tools/root/slim) served from its built
// slim-dist through page.route (no server), at 1440 and 390, light and dark, one browser,
// a context per cell, everything closed in finally. Per cell it reads, per rendered frame:
// the plate, every run seat's centre and EFFECTIVE opacity (the product of `opacity` over
// the ancestors that generate a box), the seal, the morph flag and scalar.
//   item 1  pop:   the largest effective opacity a run seat shows in the open's first
//                  morph frame (the others start at 0).
//           fade:  each face's fade, open and close: ms from its last sample at one end to
//                  its first at the other, and the largest change between two samples at
//                  most 17.5 ms apart (W-I.8's fade bound: at least 75 ms, at most 0.4).
//           both:  two faces at strength: the largest min(seal, strongest run seat).
//   item 2  drift: the largest travel of a seat's centre (open) or the seal's (close)
//                  over the frames where it is visible (effective opacity > 0.02); and the
//                  leaving face's: the seal on an open, the run seats on a close.
//   item 3  press: the largest move of the first run seat in the 1.3 s after a press on
//                  the theme seat, and the run's scroll offset before and after.
//           key:   the same after a key's reach of the theme seat (About focused, then
//                  ArrowRight), and whether the seat matched :focus-visible.
//   item 4  tail:  ms from the scalar first reaching 1 to the settle frame, and the seal's
//                  (or the persistent Home seat's) move in the settle frame.
//   item 5  tip:   a tooltip opened from the collapsed seal, then a hover open: whether it
//                  is still open 1.2 s later, and how far it travelled.
// Extra cells, 1440 light only: the harness's vertical dock (dock-v-closed), and the
// fourier repro under reduced motion.
import { createRequire } from "node:module";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const TREES = join(HERE, "../../trees");
const [engine = "chromium", outPath, treeArg = "base,cure"] = process.argv.slice(2);
const trees = treeArg.split(",");
const require = createRequire(join(TREES, trees[0], "package.json"));
const pw = require("playwright");
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".woff2": "font/woff2", ".svg": "image/svg+xml" };

const SAMPLER = `(() => {
  const eff = (el, stop) => { let o = 1; for (let n = el; n && n !== stop.parentElement; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.display !== 'contents') o *= +cs.opacity; } return +o.toFixed(3); };
  const c = (el) => { const b = el.getBoundingClientRect(); return [+(b.left + b.width / 2).toFixed(2), +(b.top + b.height / 2).toFixed(2)]; };
  window.__sample = (sel, ms) => new Promise((done) => {
    const d = document.querySelector(sel); const run = d.querySelector('.dock-layer--full'); const sum = d.querySelector('.dock-layer--summary'); const plate = d.querySelector('.dock-plate') || d;
    const seats = [...run.querySelectorAll('[data-glass-dock-seat]')];
    const seal = (sum && sum.firstElementChild) || d.querySelector('.dock-persistent [data-glass-dock-seat]');
    const pers = d.querySelector('.dock-persistent [data-glass-dock-seat]');
    const rows = []; const t0 = performance.now(); let last = t0;
    const tick = (now) => {
      const p = plate.getBoundingClientRect();
      rows.push({ t: +(now - t0).toFixed(1), dt: +(now - last).toFixed(1), m: d.hasAttribute('data-morphing') ? 1 : 0, mt: +(d.style.getPropertyValue('--dock-morph-t') || 'NaN'),
        px: +p.left.toFixed(2), py: +p.top.toFixed(2), pw: +p.width.toFixed(2), ph: +p.height.toFixed(2),
        seats: seats.map((s) => [...c(s), eff(s, d)]), seal: seal ? [...c(seal), eff(seal, d)] : null, pers: pers ? c(pers) : null, sl: run.scrollLeft });
      last = now;
      if (now - t0 < ms) requestAnimationFrame(tick); else done(rows);
    };
    requestAnimationFrame(tick);
  });
  // The first run seat's move after a cause, for 1.3 s.
  window.__watchRow = (sel) => new Promise((done) => { const d = document.querySelector(sel), run = d.querySelector('.dock-run'), s0 = run.querySelector('[data-glass-dock-seat]'); const x0 = s0.getBoundingClientRect().left; let worst = 0, at = null, steps = 0, prev = x0, big = 0, bigDt = null; const t0 = performance.now(); let lastT = t0; const tick = (now) => { const x = s0.getBoundingClientRect().left; if (Math.abs(x - prev) > 0.05) steps++; if (Math.abs(x - prev) > big) (big = Math.abs(x - prev)), (bigDt = +(now - lastT).toFixed(1)); prev = x; lastT = now; if (Math.abs(x - x0) > Math.abs(worst)) (worst = x - x0), (at = +(now - t0).toFixed(1)); if (now - t0 < 1300) requestAnimationFrame(tick); else { const a = document.activeElement; done({ move: +worst.toFixed(2), at, frames: steps, maxStep: +big.toFixed(2), maxStepDt: bigDt, sl: run.scrollLeft, focusVisible: !!a?.matches?.(':focus-visible'), onTheme: !!a?.closest?.('[data-testid=theme-seat]') }); } }; requestAnimationFrame(tick); });
  // Every tooltip popper on the page, for ms.
  window.__tips = (ms) => new Promise((done) => { const rows = []; const t0 = performance.now(); const tick = (now) => { const tips = [...document.querySelectorAll('[data-reka-popper-content-wrapper]')].map((w) => { const b = w.getBoundingClientRect(); const inner = w.querySelector('[data-state]'); return { x: +b.left.toFixed(2), y: +b.top.toFixed(2), w: +b.width.toFixed(2), state: inner?.getAttribute('data-state') ?? null, o: +getComputedStyle(inner ?? w).opacity }; }); rows.push({ t: +(now - t0).toFixed(1), tips }); if (now - t0 < ms) requestAnimationFrame(tick); else done(rows); }; requestAnimationFrame(tick); });
})()`;

const r2 = (x) => +(+x).toFixed(2);
function span(rows) {
  const m = rows.filter((x) => x.m);
  if (!m.length) return null;
  const i0 = rows.indexOf(m[0]), i1 = Math.min(rows.length - 1, rows.indexOf(m[m.length - 1]) + 1);
  return { i0, i1, rows: rows.slice(i0, i1 + 1) };
}
// A fade from `from` to the other end: ms from its last sample at `from` to its first at
// the other end, and the largest change between two samples at most 17.5 ms apart.
function fade(rows, pick, rising) {
  const ts = rows.map((x) => x.t), op = rows.map(pick);
  const atStart = (o) => (rising ? o <= 0.005 : o >= 0.99), atEnd = (o) => (rising ? o >= 0.99 : o <= 0.005);
  let lastStart = -1, firstEnd = -1;
  for (let i = 0; i < op.length; i++) { if (atStart(op[i])) lastStart = i; }
  for (let i = lastStart + 1; i < op.length && lastStart >= 0; i++) if (atEnd(op[i])) { firstEnd = i; break; }
  let big = 0;
  for (let i = 0; i < op.length; i++) for (let j = i + 1; j < op.length && ts[j] - ts[i] <= 17.5; j++) big = Math.max(big, Math.abs(op[j] - op[i]));
  return { ms: lastStart >= 0 && firstEnd > lastStart ? r2(ts[firstEnd] - ts[lastStart]) : null, maxStep17: r2(big) };
}
const travel = (xs) => (xs.length > 1 ? r2(Math.max(...xs) - Math.min(...xs)) : null);
// A persistent seat's step into a morph's first frame, and its largest step in the morph.
function persSteps(all, sp, k) {
  const rows = all.slice(Math.max(0, sp.i0 - 1), sp.i1 + 1).filter((x) => x.pers);
  if (rows.length < 2 || !all[sp.i0 - 1]?.pers) return { first: null, max: null };
  let max = 0;
  for (let i = 1; i < rows.length; i++) max = Math.max(max, Math.abs(rows[i].pers[k] - rows[i - 1].pers[k]));
  return { first: r2(all[sp.i0].pers[k] - all[sp.i0 - 1].pers[k]), max: r2(max) };
}

function analyse(open, close, axis = "x") {
  const k = axis === "y" ? 1 : 0;
  const r = {};
  const so = span(open);
  if (so) {
    const om = so.rows.filter((x) => x.m);
    const first = om.find((x) => x.mt > 0) ?? om[0];
    r.popOpen = Math.max(0, ...first.seats.map((s) => s[2]));
    r.popOpenAt = first.mt;
    const n = so.rows[0].seats.length; let drift = 0, who = -1;
    for (let s = 0; s < n; s++) { const t = travel(so.rows.filter((x) => x.seats[s][2] > 0.02).map((x) => x.seats[s][k])) ?? 0; if (t > drift) (drift = t), (who = s); }
    r.driftOpen = r2(drift); r.driftOpenSeat = who;
    r.leaveDriftOpen = travel(so.rows.filter((x) => x.seal && x.seal[2] > 0.02).map((x) => x.seal[k]));
    const mid = Math.floor(n / 2);
    r.fadeInOpen = fade(so.rows, (x) => Math.max(...x.seats.map((s) => s[2])), true);
    r.fadeInOpenMid = fade(so.rows, (x) => x.seats[mid][2], true);
    r.fadeOutOpen = fade(so.rows, (x) => (x.seal ? x.seal[2] : 0), false);
    r.bothOpen = r2(Math.max(...so.rows.map((x) => Math.min(x.seal ? x.seal[2] : 0, Math.max(...x.seats.map((s) => s[2]))))));
    const hit = om.findIndex((x) => x.mt >= 1);
    const settle = open[so.i1];
    r.tailOpenMs = hit >= 0 ? r2(settle.t - om[hit].t) : null;
    r.openSettlePlateW = r2((axis === "y" ? settle.ph - open[so.i1 - 1].ph : settle.pw - open[so.i1 - 1].pw));
    r.openMs = r2(settle.t - om[0].t);
    r.openLastSteps = open.slice(Math.max(so.i0, so.i1 - 5), so.i1 + 1).map((x, j, a) => (j ? r2(axis === "y" ? x.ph - a[j - 1].ph : x.pw - a[j - 1].pw) : null)).slice(1);
    r.openFirstDt = so.rows.slice(0, 4).map((x) => x.dt);
    r.persOpen = persSteps(open, so, k);
  }
  const sc = span(close);
  if (sc) {
    const cm = sc.rows.filter((x) => x.m);
    const vis = sc.rows.filter((x) => x.seal && x.seal[2] > 0.02).map((x) => x.seal[k]);
    r.sealDriftClose = travel(vis);
    const n = sc.rows[0].seats.length; let d = 0;
    for (let s = 0; s < n; s++) d = Math.max(d, travel(sc.rows.filter((x) => x.seats[s][2] > 0.02).map((x) => x.seats[s][k])) ?? 0);
    r.leaveDriftClose = r2(d);
    const settle = close[sc.i1], before = close[sc.i1 - 1];
    r.sealSettleJump = settle.seal && before.seal ? r2(settle.seal[k] - before.seal[k]) : null;
    r.persSettleJump = settle.pers && before.pers ? r2(settle.pers[k] - before.pers[k]) : null;
    r.closeSettlePlateW = r2(axis === "y" ? settle.ph - before.ph : settle.pw - before.pw);
    r.fadeInClose = fade(sc.rows, (x) => (x.seal ? x.seal[2] : 0), true);
    r.fadeOutClose = fade(sc.rows, (x) => Math.max(...x.seats.map((s) => s[2])), false);
    r.bothClose = r2(Math.max(...sc.rows.map((x) => Math.min(x.seal ? x.seal[2] : 0, Math.max(...x.seats.map((s) => s[2]))))));
    const hit = cm.findIndex((x) => x.mt >= 1);
    r.tailCloseMs = hit >= 0 ? r2(settle.t - cm[hit].t) : null;
    r.closeMs = r2(settle.t - cm[0].t);
    r.closeLastSteps = close.slice(Math.max(sc.i0, sc.i1 - 5), sc.i1 + 1).map((x, j, a) => (j ? r2(axis === "y" ? x.ph - a[j - 1].ph : x.pw - a[j - 1].pw) : null)).slice(1);
    r.longFramesClose = sc.rows.filter((x) => x.dt > 24).map((x) => x.dt);
    r.closeFirstDt = sc.rows.slice(0, 4).map((x) => x.dt);
    r.persClose = persSteps(close, sc, k);
    r.plateStartTravelClose = travel(sc.rows.map((x) => (axis === "y" ? x.py : x.px)));
  }
  return r;
}

async function load(page, tree, name, scheme) {
  await page.goto(`http://${tree}.test/slim/?c=${name}&scheme=${scheme}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => window.__animReady === true, null, { timeout: 20000 });
  const err = await page.evaluate(() => window.__animError);
  if (err) throw new Error(err);
  await page.waitForTimeout(800);
}

async function openClose(page, sel, w, coarse, how, opts = {}) {
  await page.locator(sel).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const b = await page.locator(sel).first().boundingBox();
  const openP = page.evaluate(([s]) => window.__sample(s, 900), [sel]);
  openP.catch(() => {});
  await page.waitForTimeout(50);
  if (coarse) await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2);
  else await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  const open = await openP;
  await page.waitForTimeout(300);
  if (opts.between) await opts.between();
  const closeP = page.evaluate(([s, ms]) => window.__sample(s, ms), [sel, how === "outside" ? 1500 : 900]);
  closeP.catch(() => {});
  await page.waitForTimeout(40);
  if (how === "outside") {
    if (coarse) await page.touchscreen.tap(w - 6, 838);
    else await page.mouse.click(w - 10, 880);
  } else {
    await page.evaluate(([s]) => { const d = document.querySelector(s); const seat = d.querySelector('.dock-layer--full [data-glass-dock-seat]'); seat.focus({ preventScroll: true }); seat.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); }, [sel]);
  }
  const close = await closeP;
  if (!coarse) await page.mouse.move(w - 4, 896);
  await page.waitForTimeout(400);
  return { open, close };
}

async function press(page, sel, coarse) {
  const before = await page.evaluate(([s]) => { const run = document.querySelector(s).querySelector('.dock-run'); return { sl: run.scrollLeft, max: run.scrollWidth - run.clientWidth, fits: document.querySelector(s).hasAttribute('data-run-fits'), snap: getComputedStyle(run).scrollSnapType, overflow: getComputedStyle(run).overflowX }; }, [sel]);
  const pressP = page.evaluate(([s]) => window.__watchRow(s), [sel]);
  pressP.catch(() => {});
  await page.waitForTimeout(30);
  const tb = await page.locator("[data-testid=theme-seat]").first().boundingBox();
  if (coarse) await page.touchscreen.tap(tb.x + tb.width / 2, tb.y + tb.height / 2);
  else { await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.mouse.down(); await page.mouse.up(); }
  const out = { before, ...(await pressP), dark: await page.evaluate(() => document.documentElement.classList.contains("dark")) };
  if (coarse) await page.touchscreen.tap(tb.x + tb.width / 2, tb.y + tb.height / 2);
  else { await page.mouse.down(); await page.mouse.up(); }
  await page.waitForTimeout(400);
  return out;
}

async function keyReach(page, sel, w, coarse) {
  const b = await page.locator(sel).first().boundingBox();
  if (coarse) await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2);
  else await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const r = document.querySelector('[data-testid=fourier-dock] .dock-run'); r.scrollLeft = 0; });
  await page.focus("[data-testid=about-seat]");
  await page.waitForTimeout(400);
  const before = await page.evaluate(([s]) => { const run = document.querySelector(s).querySelector('.dock-run'); return { sl: run.scrollLeft, max: run.scrollWidth - run.clientWidth, fits: document.querySelector(s).hasAttribute('data-run-fits'), overflow: getComputedStyle(run).overflowX }; }, [sel]);
  const p = page.evaluate(([s]) => window.__watchRow(s), [sel]);
  p.catch(() => {});
  await page.waitForTimeout(30);
  await page.keyboard.press("ArrowRight");
  return { before, ...(await p) };
}

async function tip(page) {
  const sel = "[data-testid=tip-dock]";
  const b = await page.locator("[data-testid=tip-seal]").first().boundingBox();
  const rowsP = page.evaluate(() => window.__tips(1500));
  rowsP.catch(() => {});
  await page.mouse.move(b.x + b.width / 2 - 3, b.y + b.height / 2);
  await page.waitForTimeout(16);
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  const rows = await rowsP;
  const open = rows.filter((r) => r.tips.some((t) => t.state && t.state !== "closed"));
  const xs = rows.flatMap((r) => r.tips.filter((t) => t.state && t.state !== "closed").map((t) => t.x));
  const last = rows[rows.length - 1];
  const expanded = await page.evaluate(([s]) => document.querySelector(s).classList.contains("expanded"), [sel]);
  return { opened: open.length > 0, openAtEnd: last.tips.some((t) => t.state && t.state !== "closed" && t.o > 0.02), lastOpenAt: open.length ? open[open.length - 1].t : null, travel: travel(xs), expanded };
}

function route(ctx, tree) {
  const dist = join(TREES, tree, "slim-dist");
  return ctx.route(`http://${tree}.test/**`, (rt) => {
    const u = new URL(rt.request().url());
    let p = u.pathname.replace(/^\/slim\/?/, "");
    if (!p || p.endsWith("/")) p += "index.html";
    const f = join(dist, p);
    if (!existsSync(f)) return rt.fulfill({ status: 404, body: "" });
    return rt.fulfill({ status: 200, body: readFileSync(f), headers: { "content-type": TYPES[extname(f)] ?? "application/octet-stream" } });
  });
}

async function guard(out, fn) { try { Object.assign(out, await fn()); } catch (e) { out.error = String(e).slice(0, 300); } return out; }

const res = { engine, trees, cells: [], extra: [] };
const browser = await pw[engine].launch(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : {});
try {
  for (const tree of trees) for (const w of [1440, 390]) for (const scheme of ["light", "dark"]) {
    const coarse = w < 800;
    const ctx = await browser.newContext({ viewport: { width: w, height: coarse ? 844 : 900 }, deviceScaleFactor: 2, colorScheme: scheme, hasTouch: coarse });
    try {
      await ctx.addInitScript(SAMPLER);
      await route(ctx, tree);
      const cell = { tree, w, scheme, pages: [] };
      const page = await ctx.newPage();
      try {
        const f = await guard({ page: "fourier-dock" }, async () => {
          await load(page, tree, "fourier-dock", scheme);
          const sel = "[data-testid=fourier-dock]";
          let pr = null;
          const { open, close } = await openClose(page, sel, w, coarse, "escape", { between: async () => { pr = await press(page, sel, coarse); } });
          const key = await keyReach(page, sel, w, coarse);
          return { ...analyse(open, close), press: pr, key };
        });
        cell.pages.push(f);
        cell.pages.push(await guard({ page: "group-dock" }, async () => {
          await load(page, tree, "group-dock", scheme);
          const { open, close } = await openClose(page, "[data-testid=group-dock]", w, coarse, "escape");
          return analyse(open, close);
        }));
        if (!coarse) cell.pages.push(await guard({ page: "dock" }, async () => {
          await load(page, tree, "dock", scheme);
          const { open, close } = await openClose(page, "[data-testid=dock-h-closed]", w, coarse, "outside");
          return analyse(open, close);
        }));
        if (!coarse) cell.pages.push(await guard({ page: "tip-dock" }, async () => {
          await load(page, tree, "tip-dock", scheme);
          return { tip: await tip(page) };
        }));
      } finally { await page.close(); }
      res.cells.push(cell);
      console.error(tree, w, scheme, "done");
    } finally { await ctx.close(); }
  }
  // Extra cells at 1440 light: the vertical dock; the fourier repro under reduced motion.
  for (const tree of trees) {
    for (const reduced of [false, true]) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light", reducedMotion: reduced ? "reduce" : "no-preference" });
      try {
        await ctx.addInitScript(SAMPLER);
        await route(ctx, tree);
        const page = await ctx.newPage();
        try {
          if (!reduced) {
            const out = await guard({ tree, cell: "vertical" }, async () => {
              await load(page, tree, "dock", "light");
              const a = await openClose(page, "[data-testid=dock-v-closed]", 1440, false, "outside");
              return analyse(a.open, a.close, "y");
            });
            res.extra.push(out);
          } else {
            const out = await guard({ tree, cell: "reduced" }, async () => {
              await load(page, tree, "fourier-dock", "light");
              const a = await openClose(page, "[data-testid=fourier-dock]", 1440, false, "escape");
              // Under reduced motion the morph lands at once, so read every sampled frame.
              const all = (rows) => ({ i0: 0, i1: rows.length - 1, rows });
              const oi = all(a.open), ci = all(a.close);
              const steps = (rows) => rows.map((x, j) => (j ? r2(x.pw - rows[j - 1].pw) : 0)).filter((d) => Math.abs(d) > 0.05);
              return {
                openWidthSteps: steps(a.open), closeWidthSteps: steps(a.close),
                fadeInOpen: fade(oi.rows, (x) => Math.max(...x.seats.map((s) => s[2])), true),
                fadeOutOpen: fade(oi.rows, (x) => (x.seal ? x.seal[2] : 0), false),
                fadeInClose: fade(ci.rows, (x) => (x.seal ? x.seal[2] : 0), true),
                fadeOutClose: fade(ci.rows, (x) => Math.max(...x.seats.map((s) => s[2])), false),
                morphFramesOpen: a.open.filter((x) => x.m).length, morphFramesClose: a.close.filter((x) => x.m).length,
              };
            });
            res.extra.push(out);
          }
        } finally { await page.close(); }
        console.error(tree, reduced ? "reduced" : "vertical", "done");
      } finally { await ctx.close(); }
    }
  }
} finally { await browser.close(); writeFileSync(outPath, JSON.stringify(res)); }
