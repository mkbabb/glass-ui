// lib.mjs · D5 engagement battery: arguments, serving (a build or the fixture), engines with relaunch, the page
// open with its mode cells, in-page helpers, the browser lock, the cell printer and the witness wrapper.
// Every witness is `node eN-*.mjs --build <dir> | --fixture [--fault <id>] [--engine chromium|webkit] [--out <dir>]`.
// Exit 0 PASS, 1 FAIL, 2 harness error (or a hang past the deadline), 3 UNMEASURED (no gating cell could be read).
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { WkTouch } from "./wktouch.mjs";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const GLASS = process.env.GLASS_UI ?? "/Users/mkbabb/Programming/glass-ui";
export const pw = (await import(`${GLASS}/node_modules/playwright/index.mjs`)).default;

export function parseArgs(argv = process.argv.slice(2)) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (!k.startsWith("--")) continue;
    const n = argv[i + 1];
    if (n === undefined || n.startsWith("--")) a[k.slice(2)] = true;
    else { a[k.slice(2)] = n; i++; }
  }
  return a;
}
export const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
export const f = (x, n = 3) => (typeof x === "number" && Number.isFinite(x) ? x.toFixed(n) : String(x));

/** Other headless browsers on the machine (other seats'); printed, never touched. */
export function browserCensus() {
  try {
    const ps = execSync("ps -Ao pid,command", { encoding: "utf8" }).split("\n");
    const chrome = ps.filter((l) => /headless|chrome-headless-shell|--headless/.test(l) && /chrom/i.test(l) && !/grep/.test(l)).length;
    const webkit = ps.filter((l) => /WebKitWebProcess|pw_run\.sh|MiniBrowser|Playwright\.app/.test(l) && !/grep/.test(l)).length;
    return `other headless processes: chromium ${chrome}, webkit ${webkit}`;
  } catch { return "other headless processes: unread"; }
}

// ── the browser lock: one D5 harness browser at a time on this machine ──────────────────────────────
const LOCK = path.join(os.tmpdir(), "bl-d5-engagement-harness.lock");
export async function acquireLock() {
  const t0 = Date.now();
  for (;;) {
    try { fs.writeFileSync(LOCK, String(process.pid), { flag: "wx" }); break; } catch {
      let pid = 0; try { pid = +fs.readFileSync(LOCK, "utf8"); } catch {}
      let alive = false; try { if (pid) { process.kill(pid, 0); alive = true; } } catch {}
      if (!alive) { try { fs.unlinkSync(LOCK); } catch {} continue; }
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  const release = () => { try { if (+fs.readFileSync(LOCK, "utf8") === process.pid) fs.unlinkSync(LOCK); } catch {} };
  process.on("exit", release);
  return (Date.now() - t0) / 1000;
}

// ── serving ─────────────────────────────────────────────────────────────────────────────────────────
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json" };
export async function serveTarget(a) {
  let handler;
  if (a.fixture) {
    const { fixturePage } = await import("./fixtures.mjs");
    const fault = typeof a.fault === "string" ? a.fault : "";
    handler = (q, r) => {
      const u = new URL(q.url, "http://x");
      if (u.pathname !== "/") { r.writeHead(404); return r.end(); }
      r.writeHead(200, { "content-type": "text/html" }); r.end(fixturePage(u.searchParams, fault));
    };
  } else {
    const dir = path.resolve(a.build);
    if (!fs.existsSync(path.join(dir, "index.html"))) throw new Error(`no build at ${dir} (index.html missing)`);
    handler = (q, r) => {
      let p = path.join(dir, decodeURIComponent(q.url.split("?")[0])); if (p.endsWith("/")) p += "index.html";
      if (!fs.existsSync(p)) { r.writeHead(404); return r.end(); }
      r.writeHead(200, { "content-type": TYPES[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(r);
    };
  }
  const srv = http.createServer(handler);
  await new Promise((ok) => srv.listen(0, "127.0.0.1", ok));
  return { url: `http://127.0.0.1:${srv.address().port}/`, close: () => srv.close(), kind: a.fixture ? "fixture" : "build", fault: a.fault ?? "" };
}

// ── engines ─────────────────────────────────────────────────────────────────────────────────────────
// an engine that closed, hung, or could not bring a page up in time (a 60 s ready wait, a navigation timeout): the
// cell is re-run once on a fresh browser, and only a repeat stands
export const isClosed = (e) => /Target page, context or browser has been closed|Page closed|Browser closed|browser has disconnected|Target closed|crashed|CELL TIMEOUT|Timeout \d+ms exceeded|raw WebKit|Cannot find page proxy/i.test(String(e?.message ?? e));
export class Engine {
  constructor(name) { this.name = name; this.b = null; this.notes = []; this.version = "?"; this.raw = null; }
  async browser() {
    if (this.b && this.b.isConnected()) return this.b;
    if (this.b) this.notes.push(`${this.name} disconnected; relaunched (load ${load()})`);
    this.b = await pw[this.name].launch({ headless: true });
    this.version = this.b.version();
    return this.b;
  }
  /** WebKit's touch driver (H-4, wktouch.mjs): the same build over its own pipe, launched on first use. */
  rawTouch() { if (!this.raw) this.raw = new WkTouch(pw.webkit.executablePath()); return this.raw; }
  // a crashed engine may never answer close(): 5 s, then its process is killed (a hang here stalled a whole witness)
  async kill() {
    const b = this.b; this.b = null;
    if (b) { try { await Promise.race([b.close(), new Promise((r) => setTimeout(r, 5000))]); } catch {} try { b.process?.()?.kill("SIGKILL"); } catch {} }
    await this.raw?.kill();
  }
  async close() { await this.kill(); }
}

/** In-page helpers, installed before any page script. */
export const INIT = () => {
  const eff = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    // the untransformed border-box width, unrounded (offsetWidth rounds to an integer and skews the ratio)
    const cs = getComputedStyle(el); let w0 = parseFloat(cs.width);
    if (!Number.isFinite(w0)) w0 = el.offsetWidth;
    else if (cs.boxSizing !== "border-box") w0 += parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    return { s: w0 ? r.width / w0 : 1, x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height, l: r.left, r: r.right, t: r.top };
  };
  // a selector, or a list read in order: the first that matches (E-4's sortable ghost, then the landed row)
  const pick = (sel) => (Array.isArray(sel) ? sel.map((x) => document.querySelector(x)).find(Boolean) ?? null : sel ? document.querySelector(sel) : null);
  window.__eff = eff;
  window.__q = (sel) => (sel ? document.querySelector(sel) : null);
  window.__sample = (selA, selB, ms) => new Promise((ok) => {
    const fr = []; const t0 = performance.now();
    const tick = () => { const t = performance.now() - t0; fr.push({ t, a: eff(pick(selA)), b: selB ? eff(pick(selB)) : null }); if (t < ms) requestAnimationFrame(tick); else ok(fr); };
    requestAnimationFrame(tick);
  });
  const PROPS = ["background-color", "background-image", "box-shadow", "color", "border-top-color", "opacity", "filter", "outline-style", "outline-color", "backdrop-filter"];
  window.__paint = (sel) => {
    const e = document.querySelector(sel); if (!e) return null;
    const o = {}; const cs = getComputedStyle(e);
    for (const p of PROPS) o[p] = cs.getPropertyValue(p);
    for (const ps of ["::before", "::after"]) { const b = getComputedStyle(e, ps); o[`${ps} opacity`] = b.opacity; o[`${ps} background`] = b.backgroundColor + " " + b.backgroundImage; o[`${ps} box-shadow`] = b.boxShadow; }
    // the first descendant layer that paints (a control's track or plate often paints below the role element)
    const kids = [...e.querySelectorAll("*")].slice(0, 12);
    kids.forEach((k, i) => { const c = getComputedStyle(k); o[`child${i} bg`] = c.backgroundColor + " " + c.backgroundImage; o[`child${i} shadow`] = c.boxShadow; o[`child${i} opacity`] = c.opacity; });
    return o;
  };
};
export const paintDiff = (a, z) => (a && z ? Object.keys(a).filter((k) => a[k] !== z[k]) : []);

/**
 * Open a scene. Modes: theme light|dark, coarse (hasTouch; isMobile in Chromium; verified as (hover: none) and
 * (pointer: coarse)), prm (reducedMotion reduce, verified), vp {width,height}, q (extra query).
 * Returns { page, ctx, close, modeOk, modeLine }.
 */
export async function openPage(E, T, scene, o = {}) {
  const b = await E.browser();
  const ctx = await b.newContext({
    viewport: o.vp ?? { width: 700, height: 500 }, deviceScaleFactor: 1,
    reducedMotion: o.prm ? "reduce" : "no-preference", colorScheme: o.theme === "dark" ? "dark" : "light",
    hasTouch: !!o.coarse, ...(o.coarse && E.name === "chromium" ? { isMobile: true } : {}),
  });
  const page = await ctx.newPage();
  await page.addInitScript(INIT);
  const q = new URLSearchParams({ scene, theme: o.theme ?? "light", ...(o.q ?? {}) });
  await page.goto(`${T.url}?${q}`);
  await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
  const m = await page.evaluate(() => ({ hn: matchMedia("(hover: none)").matches, pc: matchMedia("(pointer: coarse)").matches, prm: matchMedia("(prefers-reduced-motion: reduce)").matches, dark: document.documentElement.classList.contains("dark") }));
  let modeOk = true; const bits = [];
  if (o.coarse) { if (!(m.hn && m.pc)) modeOk = false; bits.push(`(hover:none) ${m.hn} (pointer:coarse) ${m.pc}`); }
  if (o.prm) { if (!m.prm) modeOk = false; bits.push(`PRM ${m.prm}`); }
  if (o.theme === "dark" && !m.dark) { modeOk = false; bits.push("dark class absent"); }
  return { page, ctx, close: () => Promise.race([ctx.close().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]), modeOk, modeLine: bits.join(" ") };
}

/** The scene index a target serves: { scene: { gates: [...], key, ... } }. */
export async function sceneIndex(E, T) {
  const P = await openPage(E, T, "__index");
  const idx = await P.page.evaluate(() => window.__e.index);
  await P.close();
  return idx;
}
export const scenesFor = (idx, id) => Object.entries(idx).filter(([, m]) => (m.gates ?? []).includes(id));

// ── the witness wrapper ─────────────────────────────────────────────────────────────────────────────
/**
 * witness(id, title, body): parses args, takes the lock, serves the target, launches the engine, runs body, prints
 * every cell ("  PASS|FAIL|UNMEASURED|REPORT <cell> · <line> · load a/b/c"), writes JSON, prints the verdict line
 * "<id> <engine> <VERDICT> · …" and exits. body receives { a, T, E, cell, guard, idx }.
 * guard(name, fn, ms): runs one cell's measurement with a timeout; an engine that closes or hangs is relaunched and
 * the cell re-run once (H-3: segment isolation). A crash that repeats is a FAIL "ENGINE CLOSED … REPRODUCED".
 */
export async function witness(id, title, body) {
  const a = parseArgs();
  const engine = a.engine === "webkit" ? "webkit" : "chromium";
  const deadline = +(a.deadline ?? 1500) * 1000;
  const dog = setTimeout(() => { console.log(`${id} ${engine} HARNESS ERROR · deadline ${deadline / 1000} s passed (hang) · load ${load()}`); process.exit(2); }, deadline);
  dog.unref();
  const waited = await acquireLock();
  const loadStart = load();
  console.log(`# ${id} · ${title}`);
  console.log(`# target ${a.fixture ? `fixture${a.fault ? ` fault ${a.fault}` : ""}` : a.build} · engine ${engine} · lock wait ${waited.toFixed(1)} s · ${browserCensus()} · load ${loadStart} at start`);
  const cells = [];
  const cell = (name, status, line) => {
    const l = `  ${status.padEnd(10)} ${name} · ${line} · load ${load()}`;
    cells.push({ name, status, line, load: load() }); console.log(l);
  };
  let T, E;
  try {
    T = await serveTarget(a);
    E = new Engine(engine);
    await E.browser();
    console.log(`# ${engine} ${E.version}${engine === "webkit" ? " (Playwright WebKit, not Safari; real Safari UNMEASURED (owner's safaridriver checkbox))" : ""}`);
    const guard = async (name, fn, ms = 90000) => {
      const once = async () => {
        let timer;
        try {
          return await Promise.race([fn(), new Promise((_, rej) => { timer = setTimeout(() => rej(new Error(`CELL TIMEOUT ${ms / 1000} s`)), ms); })]);
        } finally { clearTimeout(timer); }
      };
      try { return await once(); } catch (e1) {
        if (!isClosed(e1)) throw e1;
        await E.kill();
        const note1 = String(e1.message).split("\n")[0].slice(0, 140);
        try { const r = await once(); return { ...r, note: `NOT-REPRODUCED: engine closed on the first run (${note1})` }; } catch (e2) {
          if (!isClosed(e2)) throw e2;
          await E.kill();
          return { crashed: true, line: `ENGINE CLOSED, REPRODUCED 2/2 (${note1}; then ${String(e2.message).split("\n")[0].slice(0, 100)})` };
        }
      }
    };
    let idx = await sceneIndex(E, T);
    // --scenes a,b narrows any witness to those scenes (the verdict then covers only them; the header says so)
    if (typeof a.scenes === "string") { const keep = new Set(a.scenes.split(",")); idx = Object.fromEntries(Object.entries(idx).filter(([k]) => keep.has(k))); console.log(`# narrowed to scenes ${[...keep].join(", ")}`); }
    await body({ a, T, E, cell, guard, idx, engine });
  } catch (e) {
    console.log(`  HARNESS ERROR ${String(e?.stack ?? e).split("\n").slice(0, 3).join(" | ")}`);
    console.log(`${id} ${engine} HARNESS ERROR · ${String(e?.message ?? e).split("\n")[0]} · load ${load()}`);
    await E?.close(); T?.close(); process.exit(2);
  }
  for (const n of E.notes) console.log(`  note ${n}`);
  await E.close(); T.close();
  const gating = cells.filter((c) => c.status !== "REPORT");
  const nf = gating.filter((c) => c.status === "FAIL").length, np = gating.filter((c) => c.status === "PASS").length, nu = gating.filter((c) => c.status === "UNMEASURED").length;
  const verdict = nf ? "FAIL" : np ? "PASS" : "UNMEASURED";
  if (typeof a.out === "string") {
    fs.mkdirSync(a.out, { recursive: true });
    fs.writeFileSync(path.join(a.out, `${id}-${engine}${a.fixture ? `-fixture${a.fault ? `-${a.fault}` : ""}` : ""}.json`), JSON.stringify({ id, engine, version: E.version, target: a.fixture ? { fixture: true, fault: a.fault ?? null } : { build: a.build }, loadStart, loadEnd: load(), verdict, cells }, null, 1));
  }
  console.log(`${id} ${engine} ${verdict} · ${np} pass, ${nf} fail, ${nu} unmeasured of ${gating.length} gating cells (${cells.length - gating.length} reported) · load ${loadStart} at start, ${load()} at end`);
  process.exit(verdict === "FAIL" ? 1 : verdict === "PASS" ? 0 : 3);
}

// ── shared measurements ─────────────────────────────────────────────────────────────────────────────
export const POP = 0.015, BOUNCE = 0.002, TRAVEL = 4, OVERSHOOT = 0.5; // D4 tile/harness/measure.mjs:403, unchanged
export const medianDt = (fr) => { const d = fr.slice(1).map((x, k) => x.t - fr[k].t).sort((p, q) => p - q); return d.length ? d[d.length >> 1] : 0; };
/** The commit bar (D4 H-4): a pop that peaks ≥ POP above its settle and bounces ≥ BOUNCE below it, or a body that
 *  travels ≥ TRAVEL px and overshoots its landing by ≥ OVERSHOOT px. The settle is the last sampled scale. */
export function commitBar(fr) {
  const F = fr.filter((x) => x.a);
  if (F.length < 3) return { pass: false, line: `target absent in ${fr.length - F.length} of ${fr.length} frames` };
  const s = F.map((x) => x.a.s); let pk = 0; s.forEach((v, k) => { if (v > s[pk]) pk = k; });
  const settle = s[s.length - 1], trough = Math.min(...s.slice(pk));
  const pop = s[pk] - settle >= POP, bounce = trough <= settle - BOUNCE;
  let travel = 0, over = 0; const B = F.map((x) => x.b).filter(Boolean);
  if (B.length > 1) { const p = B[0], z = B[B.length - 1], d = [z.x - p.x, z.y - p.y], Ln = Math.hypot(...d); travel = Ln; if (Ln > 0) for (const r of B) over = Math.max(over, ((r.x - p.x) * d[0] + (r.y - p.y) * d[1]) / Ln - Ln); }
  return { pass: (pop && bounce) || (travel >= TRAVEL && over >= OVERSHOOT), line: `peak ${f(s[pk])} trough ${f(trough)} settle ${f(settle)} · body travel ${f(travel, 2)} px overshoot ${f(over, 2)} px · ${fr.length} frames, median ${f(medianDt(fr), 1)} ms` };
}
/** Scale range and body movement over frames (Tab entry, the mount case, PRM). */
export function quiet(fr) {
  const F = fr.filter((x) => x.a); if (!F.length) return { range: NaN, moved: NaN, mid: NaN };
  const s = F.map((x) => x.a.s); const range = Math.max(...s) - Math.min(...s);
  const B = F.map((x) => x.b).filter(Boolean);
  const moved = B.length > 1 ? Math.hypot(B.at(-1).x - B[0].x, B.at(-1).y - B[0].y) : 0;
  // frames strictly between start and end by more than 1 px from both: a body in flight
  const mid = B.length > 1 ? B.filter((r) => Math.hypot(r.x - B[0].x, r.y - B[0].y) > 1 && Math.hypot(r.x - B.at(-1).x, r.y - B.at(-1).y) > 1).length : 0;
  // frames whose scale is ≥ 0.002 away from both the first and the last frame: a scale in flight (a jump to a new
  // resting scale has none; a glide or a pop has many)
  const smid = s.filter((v) => Math.abs(v - s[0]) >= 0.002 && Math.abs(v - s.at(-1)) >= 0.002).length;
  return { range, moved, mid, smid, frames: fr.length };
}
export const tabKey = (engine) => (engine === "webkit" ? "Alt+Tab" : "Tab");
export async function center(page, sel) {
  const bx = page.locator ? await page.locator(sel).first().boundingBox()
    : await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, sel);
  if (!bx) throw new Error(`no box for ${sel}`);
  return { x: bx.x + bx.width / 2, y: bx.y + bx.height / 2, bx };
}
/**
 * A coarse page with touch input, in both engines (H-4). Returns openPage's shape ({ page, close, modeOk, modeLine })
 * plus touch(type, x, y) (touchStart | touchMove | touchEnd) and hold(x, y, readAtMs, read).
 *   Chromium: openPage with coarse; the hold is the long-tap gesture (Input.synthesizeTapGesture, the only CDP input
 *             that sets `:active` under touch: a raw CDP touchStart does not, PORTFOLIO §1.3 item 8); a drag is CDP
 *             Input.dispatchTouchEvent (which scrolls and flings natively).
 *   WebKit:   Playwright's touchscreen only taps, so the page is opened on the same WebKit build through wktouch.mjs,
 *             whose Input.dispatchTouchEvent holds `:active` from touchStart to touchEnd. A touch drag reaches the DOM
 *             but does not scroll: macOS WebKit has no touch scrolling (measured, pass-1/RH.md §2 H-4).
 * Both set a sticky `:hover` under the held touch, so every touch read subtracts hover.
 */
export async function openTouchPage(E, T, scene, o = {}) {
  if (E.name === "chromium") {
    const P = await openPage(E, T, scene, { ...o, coarse: true });
    const cdp = await P.ctx.newCDPSession(P.page);
    P.touch = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y }] });
    P.hold = async (x, y, readAtMs, read) => {
      const g = cdp.send("Input.synthesizeTapGesture", { x, y, duration: readAtMs + 550, tapCount: 1, gestureSourceType: "touch" });
      await P.page.waitForTimeout(readAtMs); const r = await read(); await g; return r;
    };
    return P;
  }
  const W = E.rawTouch();
  const q = new URLSearchParams({ scene, theme: o.theme ?? "light", ...(o.q ?? {}) });
  const R = await W.open(`${T.url}?${q}`, { vp: o.vp ?? { width: 700, height: 500 }, prm: !!o.prm, theme: o.theme, init: INIT.toString() });
  let ready = false;
  for (let k = 0; k < 500 && !ready; k++) { ready = await R.page.evaluate(() => !!(window.__e && window.__e.ready === true)); if (!ready) await R.page.waitForTimeout(40); }
  if (!ready) throw new Error("raw WebKit: the scene never became ready (CELL TIMEOUT)");
  const m = await R.page.evaluate(() => ({ hn: matchMedia("(hover: none)").matches, pc: matchMedia("(pointer: coarse)").matches, prm: matchMedia("(prefers-reduced-motion: reduce)").matches, dark: document.documentElement.classList.contains("dark") }));
  let modeOk = m.hn && m.pc; const bits = [`(hover:none) ${m.hn} (pointer:coarse) ${m.pc}`, "raw WebKit touch"];
  if (o.prm) { if (!m.prm) modeOk = false; bits.push(`PRM ${m.prm}`); }
  if (o.theme === "dark" && !m.dark) { modeOk = false; bits.push("dark class absent"); }
  return {
    page: R.page, touch: R.touch, close: R.close, modeOk, modeLine: bits.join(" "),
    hold: async (x, y, readAtMs, read) => { await R.touch("touchStart", x, y); await R.page.waitForTimeout(readAtMs); const r = await read(); await R.touch("touchEnd", x, y); return r; },
  };
}
/** A held touch on `sel`, read at readAtMs; `:active` and a sticky `:hover` are both set (PORTFOLIO §1.3 item 8). */
export async function touchHold(P, sel, readAtMs, read) {
  const { x, y } = await center(P.page, sel);
  return P.hold(x, y, readAtMs, read);
}
