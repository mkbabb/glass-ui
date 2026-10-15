// lib.mjs · D5 engagement battery: arguments, serving (a build or the fixture), engines with relaunch, the page
// open with its mode cells, in-page helpers, the browser lock, the cell printer and the witness wrapper.
// Every witness is `node eN-*.mjs --build <dir> | --fixture [--fault <id>] [--engine chromium|webkit] [--out <dir>]`.
// Exit 0 PASS, 1 FAIL, 2 harness error (or a hang past the deadline), 3 UNMEASURED (no gating cell could be read).
import { holdWebkit } from "../../../driver/webkit-lock.mjs";
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
export const isClosed = (e) => /Target page, context or browser has been closed|Page closed|Browser closed|browser has disconnected|Target closed|crashed|CELL TIMEOUT|Timeout \d+ms exceeded|raw WebKit|Cannot find page proxy|Missing target for given targetId/i.test(String(e?.message ?? e));
// H2 (pass 2), after the tile harness's H3-1 (`../../tile/pass-3/H3.md` §1.1): every main-frame navigation in Playwright
// WebKit asks macOS AppSSO first, and on 2026-10-07 the call stopped answering at about the 90th navigation of one
// process. A WebKit browser (Playwright's, and the raw touch driver's, each its own process) is retired after NAV_CAP
// navigations, below that wall; `D5_HARNESS_NAV_CAP` overrides it. Each retirement is noted in the witness's output.
export const NAV_CAP = Number(process.env.D5_HARNESS_NAV_CAP ?? 60);
export class Engine {
  constructor(name) { this.name = name; this.b = null; this.notes = []; this.version = "?"; this.raw = null; this.navs = 0; this.rawNavs = 0; this.retired = 0; }
  async browser() {
    if (this.b && this.b.isConnected()) return this.b;
    if (this.b) this.notes.push(`${this.name} disconnected; relaunched (load ${load()})`);
    if (this.name === "webkit") await holdWebkit();
    this.b = await pw[this.name].launch({ headless: true });
    this.version = this.b.version(); this.navs = 0;
    return this.b;
  }
  /** Count one navigation; a WebKit browser at the cap is retired first (its open pages are the caller's, closed). */
  async nav() {
    if (this.name === "webkit" && this.b && this.navs >= NAV_CAP) {
      const b = this.b; this.b = null; this.retired++;
      try { await Promise.race([b.close(), new Promise((r) => setTimeout(r, 5000))]); } catch {} try { b.process?.()?.kill("SIGKILL"); } catch {}
      this.notes.push(`webkit browser retired after ${NAV_CAP} navigations (AppSSO wall, tile H3-1), relaunched (load ${load()})`);
    }
    this.navs++;
    return this.browser();
  }
  async rawNav() {
    if (this.raw && this.rawNavs >= NAV_CAP) { await this.raw.kill(); this.rawNavs = 0; this.retired++; this.notes.push(`raw WebKit touch driver retired after ${NAV_CAP} navigations, relaunched (load ${load()})`); }
    this.rawNavs++;
  }
  /** WebKit's touch driver (H-4, wktouch.mjs): the same build over its own pipe, launched on first use. */
  rawTouch() { if (!this.raw) this.raw = new WkTouch(pw.webkit.executablePath()); return this.raw; }
  // a crashed engine may never answer close(): 5 s, then its process is killed (a hang here stalled a whole witness)
  async kill() {
    const b = this.b; this.b = null; this.navs = 0; this.rawNavs = 0;
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
  // ── H2 (pass 2) ──
  // any CSS colour the engine parses (rgb, oklab, oklch, color(), color-mix results) → [r, g, b, a] in 0..1, through a
  // 1×1 canvas; null when the engine cannot parse it (a sentinel fill stays)
  let cx = null;
  const rgba = (c) => {
    if (!c || c === "none" || c === "transparent") return [0, 0, 0, 0];
    if (!cx) { const cv = document.createElement("canvas"); cv.width = cv.height = 1; cx = cv.getContext("2d", { willReadFrequently: true }); }
    cx.fillStyle = "rgba(1, 2, 3, 0.5)"; const sent = cx.fillStyle; cx.fillStyle = c;
    if (cx.fillStyle === sent && !/^rgba\(1, 2, 3, 0\.5\)$/.test(c)) return null;
    cx.clearRect(0, 0, 1, 1); cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data;
    return [d[0] / 255, d[1] / 255, d[2] / 255, d[3] / 255];
  };
  window.__rgba = rgba;
  const lin = (u) => (u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4);
  const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const over = (dst, src, k = 1) => { const a = src[3] * k; return [0, 1, 2].map((i) => src[i] * a + dst[i] * (1 - a)).concat([1]); };
  /** the effective opacity of an element: its own and every ancestor's, and 0 when hidden or boxless (CK-05's visible
   *  body precondition) */
  window.__vis = (el) => {
    if (!el) return { op: 0, w: 0, h: 0, vis: false };
    const r = el.getBoundingClientRect(); let op = 1;
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const cs = getComputedStyle(e); op *= +cs.opacity; if (cs.visibility === "hidden" || cs.display === "none") op = 0; }
    return { op, w: r.width, h: r.height, vis: op > 0 && r.width > 0 && r.height > 0 };
  };
  /** CK-02 arm (iii): the painted face's light. The face's layers (its background, its ::before and ::after, its first
   *  12 descendants' backgrounds, each at its opacity) composited source-over on the page colour behind it, at the
   *  face's own effective opacity, times its filter's brightness(): a relative luminance (0..1). An approximation of
   *  the pixels that is the same read every frame, so a rise and a decay read true; gradients (background-image) are
   *  not composited (the CK-25 frames are the pixel read). */
  window.__light = (sel, parts) => {
    const el = typeof sel === "string" ? document.querySelector(sel) : sel; if (!el) return null;
    let base = [1, 1, 1, 1];
    for (let e = el.parentElement; e; e = e.parentElement) { const c = rgba(getComputedStyle(e).backgroundColor); if (c && c[3] > 0) { base = over([1, 1, 1, 1], c); break; } }
    const cs = getComputedStyle(el);
    const mk = () => { let st = [0, 0, 0, 0]; return { add(c, k) { if (!c || c[3] * k <= 0) return; const a = c[3] * k, A = st[3] + a * (1 - st[3]); st = [0, 1, 2].map((i) => (c[i] * a + st[i] * st[3] * (1 - a)) / (A || 1)).concat([A]); }, get v() { return st; } }; };
    const all = mk(), layers = mk(); const fill = rgba(cs.backgroundColor) ?? [0, 0, 0, 0];
    all.add(fill, 1);
    const lay = (c, k) => { all.add(c, k); layers.add(c, k); };
    for (const ps of ["::before", "::after"]) { const b = getComputedStyle(el, ps); if (b.content === "none" || b.display === "none") continue; lay(rgba(b.backgroundColor), +b.opacity); }
    for (const k of [...el.querySelectorAll("*")].slice(0, 12)) { const c = getComputedStyle(k); let o = +c.opacity; for (let e = k.parentElement; e && e !== el; e = e.parentElement) o *= +getComputedStyle(e).opacity; lay(rgba(c.backgroundColor), o); }
    let op = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) op *= +getComputedStyle(e).opacity;
    const out = all.v[3] > 0 ? over(base, all.v, op) : base;
    let br = 1; for (const m of cs.filter.matchAll(/brightness\(([\d.]+)(%?)\)/g)) br *= +m[1] / (m[2] ? 100 : 1);
    const L = Math.min(1, lum(out) * br);
    return parts ? { L, base, fill, layers: layers.v, br } : L;
  };
  const LIGHT = new Set(["opacity", "background-color", "background", "background-image", "filter", "box-shadow", "color", "border-color", "border-top-color", "outline-color", "backdropFilter", "backgroundColor", "backgroundImage", "boxShadow", "borderColor"]);
  /** the light animations running in a subtree, read once per frame while __film runs: a CSS transition at its
   *  declared duration (as E-8 reads it), a CSS animation or a script animation at its timing's duration */
  const lightAnims = (root, seen, face) => {
    for (const a of root.getAnimations({ subtree: true })) {
      if (seen.has(a)) continue;
      const tgt = a.effect?.target; if (!tgt) continue;
      let props = a.transitionProperty ? [a.transitionProperty] : [...new Set((a.effect.getKeyframes?.() ?? []).flatMap((k) => Object.keys(k)))].filter((p) => !["offset", "easing", "composite", "computedOffset"].includes(p));
      props = props.filter((p) => LIGHT.has(p) || LIGHT.has(p.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())));
      if (!props.length) continue;
      let dur = a.effect.getTiming().duration; if (typeof dur !== "number") dur = NaN;
      if (a.transitionProperty) {
        const cs = getComputedStyle(tgt, a.effect.pseudoElement ?? null);
        const ps = cs.transitionProperty.split(",").map((s) => s.trim()); const ds = cs.transitionDuration.split(",").map((s) => s.trim());
        let i = ps.indexOf(a.transitionProperty); if (i < 0) i = ps.indexOf("all");
        if (i >= 0) { const m = ds[i % ds.length].match(/^([\d.]+)(m?s)$/); if (m) dur = +m[1] * (m[2] === "s" ? 1000 : 1); }
      }
      seen.set(a, { props, dur, kind: a.constructor.name, pseudo: a.effect.pseudoElement ?? "", self: !!face && tgt === face && !a.effect.pseudoElement, inFace: !!face && face.contains(tgt) });
    }
  };
  /** CK-01: the rendered members, read from the element (window.__e.members(): the scene app's own walk of its
   *  component tree, or the fixture's [data-member] roots). Per member instance: its directory, its root, the classes
   *  its own elements compute as `--rung-class` (unclassed omitted), and whether its root is inert (not focusable, no
   *  interactive role, no handler) and every element stamping `static` is too; page-wide, every element composing more
   *  than one engage-* class. */
  window.__census = () => {
    const groups = window.__e?.members?.(); if (!groups) return null;
    const ROLE = /^(button|switch|checkbox|radio|slider|tab|link|menuitem|menuitemcheckbox|menuitemradio|option|combobox|textbox|searchbox|spinbutton|gridcell|treeitem)$/;
    const desc = (e) => `${e.tagName.toLowerCase()}${e.getAttribute("role") ? `[role=${e.getAttribute("role")}]` : ""}${[...e.classList].slice(0, 3).map((c) => "." + c).join("")}`.slice(0, 80);
    const cls = (e) => getComputedStyle(e).getPropertyValue("--rung-class").trim();
    const live = (e, hs) => { const b = []; if (e.tabIndex >= 0 && !e.disabled) b.push(`tabIndex ${e.tabIndex}`); const r = e.getAttribute("role"); if (r && ROLE.test(r)) b.push(`role ${r}`); if (hs.includes(e)) b.push("handler"); return b; };
    const out = groups.map((g) => {
      const stamped = g.els.map((e) => [e, cls(e)]).filter(([, c]) => c && c !== "unclassed");
      const statics = stamped.filter(([, c]) => c === "static").map(([e]) => [e, live(e, g.handlers)]).filter(([, b]) => b.length).map(([e, b]) => `${desc(e)} (${b.join(", ")})`);
      return { dir: g.dir, root: g.root ? desc(g.root) : "none", classes: [...new Set(stamped.map(([, c]) => c))], stamped: stamped.slice(0, 6).map(([e, c]) => `${desc(e)}=${c}`), rootLive: g.root ? live(g.root, g.handlers) : [], statics, n: g.els.length };
    });
    const multi = [...document.querySelectorAll('[class*="engage-"]')].map((e) => [e, [...e.classList].filter((c) => c.startsWith("engage-"))]).filter(([, l]) => l.length > 1).map(([e, l]) => `${desc(e)}: ${l.join("+")}`);
    return { groups: out, multi };
  };
  /** one film, every frame for ms: the target's, the body's and the face's effective scale and box, the face's light,
   *  and (T) the frame's performance.now(); plus every light animation seen in the scene root's subtree */
  window.__film = (o) => new Promise((ok) => {
    const fr = []; const t0 = performance.now(); const seen = new Map(); const scope = document.querySelector("main") ?? document.body;
    const tick = () => {
      const t = performance.now() - t0;
      const fe = o.face ? pick(o.face) : null;
      const lx = fe ? window.__light(fe, true) : null;
      fr.push({ t, T: performance.now(), a: eff(pick(o.target)), b: o.body ? eff(pick(o.body)) : null, f: fe ? eff(fe) : null, L: lx ? lx.L : null, Lx: lx });
      try { lightAnims(scope, seen, fe); } catch {}
      if (t < o.ms) requestAnimationFrame(tick); else ok({ fr, anims: [...seen.values()] });
    };
    requestAnimationFrame(tick);
  });
};
export const paintDiff = (a, z) => (a && z ? Object.keys(a).filter((k) => a[k] !== z[k]) : []);

/**
 * Open a scene. Modes: theme light|dark, coarse (hasTouch; isMobile in Chromium; verified as (hover: none) and
 * (pointer: coarse)), prm (reducedMotion reduce, verified), vp {width,height}, q (extra query).
 * Returns { page, ctx, close, modeOk, modeLine }.
 */
export async function openPage(E, T, scene, o = {}) {
  const b = await E.nav();
  const ctx = await b.newContext({
    viewport: o.vp ?? { width: 700, height: 500 }, deviceScaleFactor: 1,
    reducedMotion: o.prm ? "reduce" : "no-preference", colorScheme: o.theme === "dark" ? "dark" : "light",
    hasTouch: !!o.coarse, ...(o.coarse && E.name === "chromium" ? { isMobile: true } : {}),
  });
  const page = await ctx.newPage();
  // console errors (CK-21's fail-loud read) and page errors, kept per page
  const errors = []; page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); }); page.on("pageerror", (e) => errors.push(`pageerror: ${String(e.message ?? e).slice(0, 200)}`));
  await page.addInitScript(INIT);
  const q = new URLSearchParams({ scene, theme: o.theme ?? "light", ...(o.q ?? {}) });
  await page.goto(`${T.url}?${q}`);
  await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
  const m = await page.evaluate(() => ({ hn: matchMedia("(hover: none)").matches, pc: matchMedia("(pointer: coarse)").matches, prm: matchMedia("(prefers-reduced-motion: reduce)").matches, dark: document.documentElement.classList.contains("dark") }));
  let modeOk = true; const bits = [];
  if (o.coarse) { if (!(m.hn && m.pc)) modeOk = false; bits.push(`(hover:none) ${m.hn} (pointer:coarse) ${m.pc}`); }
  if (o.prm) { if (!m.prm) modeOk = false; bits.push(`PRM ${m.prm}`); }
  if (o.theme === "dark" && !m.dark) { modeOk = false; bits.push("dark class absent"); }
  return { page, ctx, errors, close: () => Promise.race([ctx.close().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]), modeOk, modeLine: bits.join(" ") };
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
export const BOUNCE = 0.002, TRAVEL = 4, OVERSHOOT = 0.5; // D4 tile/harness/measure.mjs:403, unchanged
// CK-02 (pass 2): the commit passes by ONE arm. (i) travel: a body that travels ≥ TRAVEL px and overshoots its landing by
// ≥ OVERSHOOT px. (ii) a geometric pop on the PAINTED FACE whose excursion exceeds FACE_PX px (the scale channel's
// legible floor, control-bit.css:284-293), with the bounce arm (a trough ≥ BOUNCE below the settle): admissible only
// when the owner rules Q-5's channel that way (`--commit-arms i,ii,iii`); the default is i,iii (the spring table's law,
// springPresets.ts:55-57). (iii) light: on the commit edge the face's luminance rises ≥ LIGHT_RISE above its committed
// rest and decays to it (the last REST_MS within LIGHT_REST), and a light animation on the face ran on an
// ENGAGE_ENVELOPES row's clock (its attack or its release); the committed state's own fill change (a
// monotonic step to the new rest) has no rise above that rest and does not count.
export const FACE_PX = 0.8, LIGHT_RISE = 0.01, LIGHT_REST = 0.004, REST_MS = 150;
export const DEFAULT_ARMS = ["i", "iii"];
export const medianDt = (fr) => { const d = fr.slice(1).map((x, k) => x.t - fr[k].t).sort((p, q) => p - q); return d.length ? d[d.length >> 1] : 0; };
/** the envelope clocks a light commit may run on: every row's attack and release (ms) */
export const envelopeClocks = (env) => (env ?? []).flatMap((r) => [r.attackMs, r.releaseMs]);
/** the light rise of a film: how far the face's luminance peaks above its settle, and whether it is back at rest */
const linN = (u) => (u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4);
const lumN = (c) => 0.2126 * linN(c[0]) + 0.7152 * linN(c[1]) + 0.0722 * linN(c[2]);
const overN = (dst, src) => { const a = src[3]; return [0, 1, 2].map((i) => src[i] * a + dst[i] * (1 - a)).concat([1]); };
/** the rise of one luminance series: a frame brighter than the darkest frame before it (a fade-in, light that only
 *  returns to its rest from a brighter start, rises nowhere) that also stands above the committed rest (the last frame) */
function riseOf(F, key) {
  const settle = key(F.at(-1)); let lo = key(F[0]), best = -Infinity, pk = 0;
  F.forEach((x, k) => { const v = key(x); lo = Math.min(lo, v); if (v - lo > best) { best = v - lo; pk = k; } });
  const tail = F.filter((x) => x.t >= F.at(-1).t - REST_MS).map(key);
  return { rise: Math.min(best, key(F[pk]) - settle), peak: key(F[pk]), settle, rest: Math.max(...tail) - Math.min(...tail) <= LIGHT_REST, peakT: F[pk].t };
}
/** CK-02 arm (iii)'s light rise over a film, on two channels, the larger standing: (layers) the face's light layers
 *  (pseudo-elements, descendants) and its brightness() over its COMMITTED fill (the last frame's), so the committed
 *  state's own fill change cannot count and the face's own opacity (a fade) is not light; (fill) the face's own
 *  background colour alone over the colour behind it (a fill that flashes brighter and returns) */
export function lightRise(fr) {
  const F = fr.filter((x) => x.Lx); if (F.length < 3) return { rise: NaN, rest: false, n: F.length };
  const fin = F.at(-1).Lx; const fillFin = overN(fin.base, fin.fill);
  const a = riseOf(F, (x) => Math.min(1, lumN(overN(fillFin, x.Lx.layers)) * x.Lx.br));
  const b = riseOf(F, (x) => lumN(overN(x.Lx.base, x.Lx.fill)));
  const w = a.rise >= b.rise ? { ...a, ch: "layers" } : { ...b, ch: "fill" };
  return { ...w, rest: a.rest && b.rest, n: F.length };
}
/** CK-02's three arms over one film ({ fr, anims } from __film) against the admitted arms. */
export function commitArms(film, arms = DEFAULT_ARMS, env = []) {
  const fr = film.fr ?? film; const anims = film.anims ?? [];
  const F = fr.filter((x) => x.a);
  if (F.length < 3) return { pass: false, line: `target absent in ${fr.length - F.length} of ${fr.length} frames` };
  // (i) travel
  let travel = 0, over = 0; const B = F.map((x) => x.b).filter(Boolean);
  if (B.length > 1) { const p = B[0], z = B[B.length - 1], d = [z.x - p.x, z.y - p.y], Ln = Math.hypot(...d); travel = Ln; if (Ln > 0) for (const r of B) over = Math.max(over, ((r.x - p.x) * d[0] + (r.y - p.y) * d[1]) / Ln - Ln); }
  const i = travel >= TRAVEL && over >= OVERSHOOT;
  // (ii) the painted face's excursion in px
  const FF = fr.filter((x) => x.f); let ii = false, exc = NaN, w0 = NaN, pkS = NaN, trS = NaN, stS = NaN;
  if (FF.length >= 3) {
    const s = FF.map((x) => x.f.s); let pk = 0; s.forEach((v, k) => { if (v > s[pk]) pk = k; });
    stS = s.at(-1); pkS = s[pk]; trS = Math.min(...s.slice(pk)); w0 = FF.at(-1).f.w / (FF.at(-1).f.s || 1);
    exc = (pkS - stS) * w0; ii = exc > FACE_PX && trS <= stS - BOUNCE;
  }
  // (iii) light
  const lr = lightRise(fr); const clocks = envelopeClocks(env);
  // the clock: the light animations of the rising channel (the face's layers: its pseudo-elements and descendants;
  // the fill: the face's own background) all run on an envelope row's clock, and at least one runs
  const chan = anims.filter((x) => (lr.ch === "fill" ? x.self && x.props.some((p) => /background/i.test(p)) : x.inFace && !x.self));
  const onRow = chan.filter((x) => Number.isFinite(x.dur) && clocks.some((c) => Math.abs(c - x.dur) <= 1));
  const iii = lr.rise >= LIGHT_RISE && lr.rest && onRow.length > 0 && onRow.length === chan.length;
  const ok = { i, ii, iii };
  const pass = arms.some((k) => ok[k]);
  const animTxt = [...new Set(anims.map((x) => `${x.props.join("+")}${x.pseudo}@${Math.round(x.dur)}ms`))].join(", ").slice(0, 160);
  return { pass, arms: ok, line: `arm ${pass ? arms.filter((k) => ok[k]).join("+") : "none"} of [${arms.join(",")}] · (i) body travel ${f(travel, 2)} px overshoot ${f(over, 2)} px · (ii) face peak ${f(pkS)} trough ${f(trS)} settle ${f(stS)} on ${f(w0, 1)} px = ${f(exc, 2)} px (bound > ${FACE_PX}) · (iii) light rise ${f(lr.rise, 4)} on the ${lr.ch ?? "?"} channel (peak ${f(lr.peak, 4)} → rest ${f(lr.settle, 4)}, at rest ${lr.rest}; bound ≥ ${LIGHT_RISE}) on envelope clocks [${onRow.map((x) => Math.round(x.dur)).join(",")}] of the channel's [${chan.map((x) => Math.round(x.dur)).join(",")}] ms; light anims [${animTxt}] · ${fr.length} frames, median ${f(medianDt(fr), 1)} ms` };
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
  const lr = lightRise(fr);
  return { range, moved, mid, smid, frames: fr.length, rise: lr.rise };
}
export const tabKey = (engine) => (engine === "webkit" ? "Alt+Tab" : "Tab");
// A commit key is held for a hand's dwell, not released in the same task. reka's RadioGroupItem checks on the focus an
// arrow key moves only while that key is still down (its keyup clears the flag before the deferred click): a zero-dwell
// press read NOT DRIVEN on the Radio in Chromium at HEAD, 4 of 4 runs (../pass-2/H2.md §2.3).
export const KEY_DWELL = { delay: 80 };
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
    // the drag's clock: each touchMove is stamped at most MOVE_GAP s after the event before it, so the velocity the
    // platform computes is the drive's (16 ms moves), not the harness's round-trip latency under load (the fixture
    // strip's native fling read 0.00 px at load 144 when its moves arrived late, pass-2/H2.md §2.1). A touchEnd less
    // than STILL_GAP s after the last move is a fling released at once, delayed only by that latency, and is stamped
    // MOVE_GAP after it; a longer gap is a still release (E-4 pauses 1000 ms) and keeps its real length
    const MOVE_GAP = 0.02, STILL_GAP = 0.7; let tLast = 0, tReal = 0;
    P.touch = (type, x, y) => {
      const now = Date.now() / 1000;
      const gap = now - tReal;
      const ts = type === "touchStart" ? now : tLast + (type === "touchMove" || gap < STILL_GAP ? Math.min(gap, MOVE_GAP) : gap);
      tLast = ts; tReal = now;
      return cdp.send("Input.dispatchTouchEvent", { type, timestamp: ts, touchPoints: type === "touchEnd" ? [] : [{ x, y }] });
    };
    P.hold = async (x, y, readAtMs, read) => {
      const g = cdp.send("Input.synthesizeTapGesture", { x, y, duration: readAtMs + 550, tapCount: 1, gestureSourceType: "touch" });
      await P.page.waitForTimeout(readAtMs); const r = await read(); await g; return r;
    };
    // H2: one held touch read at several times (CK-06's sustain: +200 ms and +1 s), each read timed from the touch
    P.holdAt = async (x, y, times, read) => {
      const g = cdp.send("Input.synthesizeTapGesture", { x, y, duration: Math.max(...times) + 550, tapCount: 1, gestureSourceType: "touch" });
      const t0 = Date.now(); const out = [];
      for (const t of times) { await P.page.waitForTimeout(Math.max(0, t - (Date.now() - t0))); out.push(await read()); }
      await g; return out;
    };
    return P;
  }
  await E.rawNav();
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
    holdAt: async (x, y, times, read) => {
      await R.touch("touchStart", x, y); const t0 = Date.now(); const out = [];
      for (const t of times) { await R.page.waitForTimeout(Math.max(0, t - (Date.now() - t0))); out.push(await read()); }
      await R.touch("touchEnd", x, y); return out;
    },
    shot: R.shot,
  };
}
/** A held touch on `sel`, read at readAtMs; `:active` and a sticky `:hover` are both set (PORTFOLIO §1.3 item 8). */
export async function touchHold(P, sel, readAtMs, read) {
  const { x, y } = await center(P.page, sel);
  return P.hold(x, y, readAtMs, read);
}
