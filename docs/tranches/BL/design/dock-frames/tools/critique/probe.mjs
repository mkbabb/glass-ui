// probe.mjs <engine> <out.json> [trees=v11.1.0,cure]
// The critic's cells, over the ROOT witness's slim page (tools/root/slim), served from each
// tree's slim-dist through page.route. One browser, a context per cell, all closed in finally.
// It reads what the ROOT's witness did not:
//   leave  the leaving face's travel while visible: the seal on an open, the run seats on a close.
//   fade   the entering face's fade: ms from its last 0 sample to its first >= 0.99 sample, and
//          the largest change between two samples at most 17.5 ms apart (W-I.8's fade bound).
//   both   two faces at strength: the largest min(seal, strongest run seat) in any frame.
//   key    a keyboard reach of the theme seat (About focused, then ArrowRight): first seat's
//          move, largest single step, frames moved, and whether the seat matched :focus-visible.
//   vert   the harness's vertical dock (dock-v-closed): plate and seat travel on the block axis.
//   cpu    Chromium only: frame intervals by index over opens and closes under 4x CPU throttle.
import { createRequire } from "node:module";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const TREES = join(HERE, "../../trees");
const require = createRequire(join(TREES, "v11.1.0/package.json"));
const pw = require("playwright");
const [engine = "chromium", outPath, treeArg = "v11.1.0,cure"] = process.argv.slice(2);
const trees = treeArg.split(",");
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".woff2": "font/woff2", ".svg": "image/svg+xml" };

const SAMPLER = `(() => {
  const eff = (el, stop) => { let o = 1; for (let n = el; n && n !== stop.parentElement; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.display !== 'contents') o *= +cs.opacity; } return +o.toFixed(3); };
  const c = (el) => { const b = el.getBoundingClientRect(); return [+(b.left + b.width / 2).toFixed(2), +(b.top + b.height / 2).toFixed(2)]; };
  window.__s2 = (sel, ms) => new Promise((done) => {
    const d = document.querySelector(sel); const run = d.querySelector('.dock-layer--full'); const sum = d.querySelector('.dock-layer--summary'); const plate = d.querySelector('.dock-plate') || d;
    const seats = [...run.querySelectorAll('[data-glass-dock-seat]')];
    const seal = (sum && sum.firstElementChild) || null;
    const rows = []; const t0 = performance.now(); let last = t0;
    const tick = (now) => {
      const p = plate.getBoundingClientRect();
      rows.push({ t: +(now - t0).toFixed(1), dt: +(now - last).toFixed(1), m: d.hasAttribute('data-morphing') ? 1 : 0, mt: +(d.style.getPropertyValue('--dock-morph-t') || 'NaN'),
        p: [+p.left.toFixed(2), +p.top.toFixed(2), +p.width.toFixed(2), +p.height.toFixed(2)],
        seats: seats.map((s) => [...c(s), eff(s, d)]), seal: seal ? [...c(seal), eff(seal, d)] : null, sl: run.scrollLeft, st: run.scrollTop });
      last = now;
      if (now - t0 < ms) requestAnimationFrame(tick); else done(rows);
    };
    requestAnimationFrame(tick);
  });
})()`;

const r2 = (x) => +(+x).toFixed(2);
function span(rows) {
  const m = rows.filter((x) => x.m);
  if (!m.length) return null;
  const i0 = rows.indexOf(m[0]), i1 = Math.min(rows.length - 1, rows.indexOf(m[m.length - 1]) + 1);
  return rows.slice(i0, i1 + 1);
}
function travel(xs) { return xs.length > 1 ? r2(Math.max(...xs) - Math.min(...xs)) : null; }
function fade(sp, pick) {
  const ts = sp.map((x) => x.t), op = sp.map(pick);
  let lastZero = -1, firstOne = -1;
  for (let i = 0; i < op.length; i++) { if (op[i] <= 0.005) lastZero = i; if (firstOne < 0 && op[i] >= 0.99 && i > lastZero) firstOne = i; }
  let big = 0;
  for (let i = 0; i < op.length; i++) for (let j = i + 1; j < op.length && ts[j] - ts[i] <= 17.5; j++) big = Math.max(big, Math.abs(op[j] - op[i]));
  return { ms: lastZero >= 0 && firstOne > lastZero ? r2(ts[firstOne] - ts[lastZero]) : null, maxStep17: r2(big), series: op.slice(0, 12) };
}
function analyse(open, close, axis) {
  const k = axis === "y" ? 1 : 0;
  const out = {};
  const so = span(open), sc = span(close);
  if (so) {
    // the entering run seats (the open): their own drift, the fade, both-at-strength
    const n = so[0].seats.length; let d = 0;
    for (let s = 0; s < n; s++) d = Math.max(d, travel(so.filter((x) => x.seats[s][2] > 0.02).map((x) => x.seats[s][k])) ?? 0);
    out.openEnterDrift = r2(d);
    out.openLeaveSealDrift = travel(so.filter((x) => x.seal && x.seal[2] > 0.02).map((x) => x.seal[k]));
    const mid = Math.floor(n / 2);
    out.openFade = fade(so, (x) => x.seats[mid][2]);
    out.openBoth = r2(Math.max(...so.map((x) => Math.min(x.seal ? x.seal[2] : 0, Math.max(...x.seats.map((s) => s[2]))))));
    out.openMs = r2(so[so.length - 1].t - so[0].t);
    out.openDt = so.map((x) => x.dt);
    out.openPlate = { start: travel(so.map((x) => (axis === "y" ? x.p[1] : x.p[0]))), centre: travel(so.map((x) => (axis === "y" ? x.p[1] + x.p[3] / 2 : x.p[0] + x.p[2] / 2))) };
  }
  if (sc) {
    const n = sc[0].seats.length; let d = 0, who = -1;
    for (let s = 0; s < n; s++) { const t = travel(sc.filter((x) => x.seats[s][2] > 0.02).map((x) => x.seats[s][k])) ?? 0; if (t > d) (d = t), (who = s); }
    out.closeLeaveSeatDrift = r2(d); out.closeLeaveSeat = who;
    out.closeEnterSealDrift = travel(sc.filter((x) => x.seal && x.seal[2] > 0.02).map((x) => x.seal[k]));
    out.closeFade = fade(sc, (x) => (x.seal ? x.seal[2] : 0));
    out.closeBoth = r2(Math.max(...sc.map((x) => Math.min(x.seal ? x.seal[2] : 0, Math.max(...x.seats.map((s) => s[2]))))));
    const last = sc[sc.length - 1], before = sc[sc.length - 2];
    out.closeSettleSealJump = last.seal && before.seal ? r2(last.seal[k] - before.seal[k]) : null;
    out.closeMs = r2(last.t - sc[0].t);
    out.closeDt = sc.map((x) => x.dt);
    out.closePlate = { start: travel(sc.map((x) => (axis === "y" ? x.p[1] : x.p[0]))), centre: travel(sc.map((x) => (axis === "y" ? x.p[1] + x.p[3] / 2 : x.p[0] + x.p[2] / 2))) };
  }
  return out;
}

async function load(page, tree, name, scheme) {
  await page.goto(`http://${tree}.test/slim/?c=${name}&scheme=${scheme}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => window.__animReady === true, null, { timeout: 20000 });
  const err = await page.evaluate(() => window.__animError);
  if (err) throw new Error(err);
  await page.waitForTimeout(800);
}
async function cycle(page, sel, axis, closeHow, w) {
  await page.locator(sel).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const b = await page.locator(sel).first().boundingBox();
  const openP = page.evaluate(([s]) => window.__s2(s, 900), [sel]);
  openP.catch(() => {});
  await page.waitForTimeout(50);
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  const open = await openP;
  await page.waitForTimeout(300);
  const closeP = page.evaluate(([s]) => window.__s2(s, 1500), [sel]);
  closeP.catch(() => {});
  await page.waitForTimeout(40);
  if (closeHow === "escape") {
    await page.evaluate(([s]) => { const d = document.querySelector(s); const seat = d.querySelector('.dock-layer--full [data-glass-dock-seat]'); seat.focus({ preventScroll: true }); seat.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); }, [sel]);
  } else {
    await page.mouse.click(w - 10, 880);
  }
  const close = await closeP;
  await page.mouse.move(w - 4, 896);
  await page.waitForTimeout(400);
  return analyse(open, close, axis);
}

async function keyReach(page, sel) {
  const b = await page.locator(sel).first().boundingBox();
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.waitForTimeout(1200);
  await page.focus("[data-testid=about-seat]");
  await page.waitForTimeout(300);
  const before = await page.evaluate(([s]) => { const run = document.querySelector(s).querySelector('.dock-run'); return { sl: run.scrollLeft, max: run.scrollWidth - run.clientWidth, fits: document.querySelector(s).hasAttribute('data-run-fits') }; }, [sel]);
  const pressP = page.evaluate(([s]) => new Promise((done) => { const d = document.querySelector(s), run = d.querySelector('.dock-run'), s0 = run.querySelector('[data-glass-dock-seat]'); const x0 = s0.getBoundingClientRect().left; let worst = 0, steps = 0, prev = x0, big = 0; const t0 = performance.now(); const tick = (now) => { const x = s0.getBoundingClientRect().left; if (Math.abs(x - prev) > 0.05) steps++; big = Math.max(big, Math.abs(x - prev)); prev = x; if (Math.abs(x - x0) > Math.abs(worst)) worst = x - x0; if (now - t0 < 1300) requestAnimationFrame(tick); else { const a = document.activeElement; done({ move: +worst.toFixed(2), frames: steps, maxStep: +big.toFixed(2), sl: run.scrollLeft, onTheme: !!a?.closest?.('[data-testid=theme-seat]'), focusVisible: !!a?.matches?.(':focus-visible') }); } }; requestAnimationFrame(tick); }), [sel]);
  pressP.catch(() => {});
  await page.waitForTimeout(30);
  await page.keyboard.press("ArrowRight");
  return { before, ...(await pressP) };
}

const res = { engine, cells: [] };
const browser = await pw[engine].launch(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : {});
try {
  for (const tree of trees) {
    const w = 1440, scheme = "light";
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme });
    try {
      await ctx.addInitScript(SAMPLER);
      const dist = join(TREES, tree, "slim-dist");
      await ctx.route(`http://${tree}.test/**`, (route) => {
        const u = new URL(route.request().url());
        let p = u.pathname.replace(/^\/slim\/?/, "");
        if (!p || p.endsWith("/")) p += "index.html";
        const f = join(dist, p);
        if (!existsSync(f)) return route.fulfill({ status: 404, body: "" });
        return route.fulfill({ status: 200, body: readFileSync(f), headers: { "content-type": TYPES[extname(f)] ?? "application/octet-stream" } });
      });
      const cell = { tree, w, scheme };
      const page = await ctx.newPage();
      try {
        await load(page, tree, "fourier-dock", scheme);
        cell.fourier = [];
        for (let i = 0; i < 3; i++) cell.fourier.push(await cycle(page, "[data-testid=fourier-dock]", "x", "escape", w));
        await load(page, tree, "group-dock", scheme);
        cell.group = [];
        for (let i = 0; i < 2; i++) cell.group.push(await cycle(page, "[data-testid=group-dock]", "x", "escape", w));
        await load(page, tree, "fourier-dock", scheme);
        cell.key = await keyReach(page, "[data-testid=fourier-dock]");
        await load(page, tree, "dock", scheme);
        cell.vert = [];
        for (let i = 0; i < 2; i++) cell.vert.push(await cycle(page, "[data-testid=dock-v-closed]", "y", "outside", w));
        if (engine === "chromium") {
          await load(page, tree, "fourier-dock", scheme);
          const cdp = await ctx.newCDPSession(page);
          await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
          cell.cpu = [];
          for (let i = 0; i < 6; i++) { const r = await cycle(page, "[data-testid=fourier-dock]", "x", "escape", w); cell.cpu.push({ openDt: r.openDt, closeDt: r.closeDt }); }
          await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
          await cdp.detach();
        }
      } catch (e) { cell.error = String(e).slice(0, 300); }
      finally { await page.close(); }
      res.cells.push(cell);
      console.error(tree, "done");
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); writeFileSync(outPath, JSON.stringify(res)); }
