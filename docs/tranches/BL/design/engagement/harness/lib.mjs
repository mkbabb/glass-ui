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
// H5 (pass 5), CK-19: the GPU-backed Chromium witness, NAMED here as the 2026-10-16 machine law requires before any GPU
// launch argument is used. THE NEED: the `ambient` exemplar (the Aurora) paints its pointer field in WebGL2, and the
// default headless shell rasterises WebGL2 in SwiftShader, which the Aurora's software-raster guard
// (constants/renderMode.ts isSoftwareWebGLRenderer) answers with its static "css" ground: E-1's ambient cell then reads
// ENGINE LIMIT in Chromium (H4 §1.2). With these arguments the same headless shell reports "ANGLE Metal Renderer: Apple
// M5 Max" (`../pass-5/H5/logs/gpu-renderer-chromium.log`), so the Aurora resolves its WebGL substrate and the cell is
// graded. Used ONLY when a witness is run with `--gpu metal` (E-1's ambient cell, `--scenes ambient`); Chromium only; the
// headless shell, never a headed browser or another channel; one browser per run like every witness. Every witness
// header prints the renderer the arm got, and a GPU arm that comes up on a software renderer fails loud (exit 2)
export const GPU_ARGS = { metal: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] };
export class Engine {
  constructor(name, gpu = null) {
    this.name = name; this.b = null; this.notes = []; this.version = "?"; this.raw = null; this.navs = 0; this.rawNavs = 0; this.retired = 0;
    if (gpu && !(name === "chromium" && GPU_ARGS[gpu])) throw new Error(`--gpu ${gpu}: the GPU arm is named for Chromium only (${Object.keys(GPU_ARGS).join(", ")})`);
    this.gpu = gpu;
  }
  async browser() {
    if (this.b && this.b.isConnected()) return this.b;
    if (this.b) this.notes.push(`${this.name} disconnected; relaunched (load ${load()})`);
    if (this.name === "webkit") await holdWebkit();
    this.b = await pw[this.name].launch({ headless: true, ...(this.gpu ? { args: GPU_ARGS[this.gpu] } : {}) });
    this.version = this.b.version(); this.navs = 0;
    return this.b;
  }
  /** the WebGL2 renderer this engine's pages get (a blank page in its own context, closed) */
  async renderer() {
    const b = await this.browser(); const ctx = await b.newContext();
    try {
      const page = await ctx.newPage(); await page.setContent("<canvas></canvas>");
      return await page.evaluate(() => { const gl = document.querySelector("canvas").getContext("webgl2"); if (!gl) return "no WebGL2 context"; const x = gl.getExtension("WEBGL_debug_renderer_info"); const r = String(x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)); gl.getExtension("WEBGL_lose_context")?.loseContext(); return r; });
    } finally { await ctx.close(); }
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
    // H3 (pass 3): the ground is the page's own paint behind the face: every ancestor background down to the first
    // opaque one, composited in order. With no opaque ancestor the page paints no ground of its own (`ground` false);
    // the composite then sits on a placeholder white and arm (iii) refuses to grade it (CP §3.5: a transparent
    // accordion face read L 1.0000 at rest in both themes and its light moved L down)
    const stack = []; let ground = false;
    for (let e = el.parentElement; e; e = e.parentElement) { const c = rgba(getComputedStyle(e).backgroundColor); if (c && c[3] > 0) { stack.push(c); if (c[3] >= 0.999) { ground = true; break; } } }
    let base = ground ? stack.at(-1) : [1, 1, 1, 1];
    for (let i = stack.length - (ground ? 2 : 1); i >= 0; i--) base = over(base, stack[i]);
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
    // the read's resolution: every colour is read through an 8-bit canvas, so one quantum is 1/255 on each channel; q
    // is the luminance one such step moves at this composite (about 0.008 on a near-white face, 0.003 on the accent)
    const up = out.slice(0, 3).every((v) => v <= 1 - 1 / 255);
    const q = Math.abs(Math.min(1, lum(out.slice(0, 3).map((v) => v + (up ? 1 : -1) / 255)) * br) - L);
    return parts ? { L, base, fill, layers: layers.v, br, ground, q } : L;
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
    // H3 (pass 3), the library-internal handler rule: a handler counts as live when the member or its consumer bound
    // it. A handler a third-party component binds inside the member (reka-ui's Label: a mousedown that only blocks
    // double-click selection, C-A2 CK-01) is reported in `libHandled` and does not make a static root live; a third-party
    // primitive that really makes an element interactive also makes it focusable or gives it a role, which still count
    const out = groups.map((g) => {
      const stamped = g.els.map((e) => [e, cls(e)]).filter(([, c]) => c && c !== "unclassed");
      const statics = stamped.filter(([, c]) => c === "static").map(([e]) => [e, live(e, g.handlers)]).filter(([, b]) => b.length).map(([e, b]) => `${desc(e)} (${b.join(", ")})`);
      const libHandled = (g.libHandlers ?? []).filter((e) => !g.handlers.includes(e)).map(desc);
      return { dir: g.dir, root: g.root ? desc(g.root) : "none", classes: [...new Set(stamped.map(([, c]) => c))], stamped: stamped.slice(0, 6).map(([e, c]) => `${desc(e)}=${c}`), rootLive: g.root ? live(g.root, g.handlers) : [], statics, libHandled, n: g.els.length };
    });
    const multi = [...document.querySelectorAll('[class*="engage-"]')].map((e) => [e, [...e.classList].filter((c) => c.startsWith("engage-"))]).filter(([, l]) => l.length > 1).map(([e, l]) => `${desc(e)}: ${l.join("+")}`);
    // H3: a member the scene app's error boundary caught renders `[data-t="unrendered"]` (its title is the error); the
    // census names it rather than reading its absence as "no scene renders it"
    const unrendered = [...document.querySelectorAll('[data-t="unrendered"]')].map((e) => (e.getAttribute("title") ?? "").slice(0, 120));
    return { groups: out, multi, unrendered };
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
 * H7 (CK-27, REGISTRY §P6-7 item 6): the reduce arm REMOVED, in page, after the page is open and its PRM mode verified.
 * Every `@media` rule in the loaded CSSOM (nested rules followed: layers, supports, containers) that names
 * `prefers-reduced-motion: reduce` is switched off (`not all`) and every one that names `no-preference` is switched on
 * (`all`), and script asking `matchMedia("(prefers-reduced-motion: reduce)")` is told `false`. A face whose reduce arm is
 * CSS (the pop's instant state, the tabs indicator's travel gated on `no-preference`) or script asked at the act gets its
 * motion back. C-A6's plant resurrected the pop on `.engage-*` classes only and read 0.0000 on the tabs face, whose
 * commit is its indicator's travel. Returns how many rules each way it switched (a plant that switched nothing says so)
 */
export const PRM_PLANT = () => {
  let off = 0, on = 0;
  const walk = (rules) => { for (const r of rules) {
    if (r.media && typeof r.media.mediaText === "string" && /prefers-reduced-motion/.test(r.media.mediaText)) {
      if (/reduce/.test(r.media.mediaText) && !/no-preference/.test(r.media.mediaText)) { r.media.mediaText = "not all"; off++; }
      else if (/no-preference/.test(r.media.mediaText)) { r.media.mediaText = "all"; on++; }
    }
    let kids = null; try { kids = r.cssRules; } catch {} if (kids) walk(kids);
  } };
  for (const s of [...document.styleSheets, ...(document.adoptedStyleSheets ?? [])]) { let rs = null; try { rs = s.cssRules; } catch {} if (rs) walk(rs); }
  const mm = window.matchMedia.bind(window);
  window.matchMedia = (q) => (/prefers-reduced-motion:\s*reduce/.test(q) ? ({ matches: false, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false }) : mm(q));
  return { off, on };
};

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
  // H6 (E-11's clock census): `plant` [token, value] is set on <html> before any page script runs, so the page reads it
  // unreadable from its first read (a mount-time read included)
  if (o.plant) await page.addInitScript(([t, v]) => {
    const set = () => { if (!document.documentElement) return false; document.documentElement.style.setProperty(t, v); return true; };
    if (!set()) new MutationObserver((_, ob) => { if (set()) ob.disconnect(); }).observe(document, { childList: true });
  }, o.plant);
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

/** the scene app a build carries (build.mjs writes scene-app.json): the harness's own, or a named fork */
export function sceneApp(build) {
  try { const j = JSON.parse(fs.readFileSync(path.join(path.resolve(build), "scene-app.json"), "utf8")); return j.fork ? `FORK ${j.app} (sha1 ${j.sha1}): not the harness's app, not a scoring read` : `harness scenes/App.vue (sha1 ${j.sha1})`; }
  catch { return "UNKNOWN (no scene-app.json: a build from before H3)"; }
}

// ── the witness wrapper ─────────────────────────────────────────────────────────────────────────────
/**
 * witness(id, title, body): parses args, takes the lock, serves the target, launches the engine, runs body, prints
 * every cell ("  PASS|FAIL|UNMEASURED|REPORT <cell> · <line> · load a/b/c"), writes JSON, prints the verdict line
 * "<id> <engine> <VERDICT> · …" and exits. body receives { a, T, E, cell, guard, idx }.
 * guard(name, fn, ms): runs one cell's measurement with a timeout; an engine that closes or hangs is relaunched and
 * the cell re-run once (H-3: segment isolation). A crash that repeats is a FAIL "ENGINE CLOSED … REPRODUCED".
 */
export async function witness(id, title, body, defaultDeadlineS = 1500) {
  const a = parseArgs();
  const engine = a.engine === "webkit" ? "webkit" : "chromium";
  // H4: a witness that reads each cell several times (E-5's three-read rule) carries its own default deadline
  const deadline = +(a.deadline ?? defaultDeadlineS) * 1000;
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
    // H3 (pass 3): which scene app the build carries. A scoring read is on the harness's own app (REGISTRY §P2-7 item
    // 2: P-A2's fork moved 10 E-2 cells per engine); a fork built with `build.mjs --app` is named in every header
    if (!a.fixture) console.log(`# scene app: ${sceneApp(a.build)}`);
    E = new Engine(engine, typeof a.gpu === "string" ? a.gpu : null);
    await E.browser();
    console.log(`# ${engine} ${E.version}${engine === "webkit" ? " (Playwright WebKit, not Safari; real Safari UNMEASURED (owner's safaridriver checkbox))" : ""}`);
    // H5, CK-19: the named GPU arm states the renderer it got; a GPU arm on a software renderer is a harness error
    if (E.gpu) {
      const r = await E.renderer();
      console.log(`# GPU arm ${E.gpu} [${GPU_ARGS[E.gpu].join(" ")}] (the named CK-19 witness, lib.mjs GPU_ARGS): WebGL2 renderer "${r}"`);
      if (/swiftshader|llvmpipe|software|no WebGL2/i.test(r)) throw new Error(`the GPU arm ${E.gpu} came up on a software renderer ("${r}"): no GPU-backed read is possible`);
    }
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
 *  returns to its rest from a brighter start, rises nowhere) that also stands above the committed rest (the last frame).
 *  H3 (pass 3): "at rest" is stated in the read's resolution: the tail's spread within max(LIGHT_REST, one quantum of
 *  the read at the tail's colours). The pass-2 rule (0.004 flat) sat under one 8-bit step on a near-white face
 *  (≈ 0.008), so a face resting on an 8-bit dither read "not at rest" (C-CP §4.2) */
function riseOf(F, key) {
  const settle = key(F.at(-1)); let lo = key(F[0]), best = -Infinity, pk = 0;
  F.forEach((x, k) => { const v = key(x); lo = Math.min(lo, v); if (v - lo > best) { best = v - lo; pk = k; } });
  const T = F.filter((x) => x.t >= F.at(-1).t - REST_MS); const tail = T.map(key);
  const q = Math.max(0, ...T.map((x) => x.Lx?.q ?? 0)); const restBound = Math.max(LIGHT_REST, q);
  return { rise: Math.min(best, key(F[pk]) - settle), peak: key(F[pk]), settle, rest: Math.max(...tail) - Math.min(...tail) <= restBound + 1e-9, spread: Math.max(...tail) - Math.min(...tail), restBound, q, peakT: F[pk].t };
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
  return { ...w, rest: a.rest && b.rest, spread: Math.max(a.spread, b.spread), ground: F.every((x) => x.Lx.ground !== false), n: F.length };
}
/** the light read's resolution, for a line: the rise in quanta and the rest bound (H3) */
const quanta = (lr) => `${Number.isFinite(lr.q) && lr.q > 0 ? `${f(lr.rise / lr.q, 1)} quanta of ${f(lr.q, 4)}` : "quantum n/a"}, tail spread ${f(lr.spread, 4)} against ${f(lr.restBound, 4)}`;
/** CK-03 (H3): did anything commit across a film that should hold none (a mount, an arrival in the mount's own task)?
 *  Read without a rise from below, so a light already lit on the first filmed frame and decaying counts: the face's
 *  light layers over its COMMITTED fill standing ≥ LIGHT_RISE above their last frame on any frame (the committed fill's
 *  own change is not light, as in arm iii); the fill flashing above its rest (riseOf, as arm iii); the target's or the
 *  face's scale in flight on ≥ 2 frames; the body in flight on ≥ 2 frames */
export function commitsIn(film) {
  const fr = film.fr ?? film; const F = fr.filter((x) => x.Lx);
  const qt = quiet(fr);
  let above = NaN, fillRise = NaN, ground = true, fsm = 0;
  if (F.length >= 3) {
    const fin = F.at(-1).Lx; const fillFin = overN(fin.base, fin.fill);
    const lay = F.map((x) => Math.min(1, lumN(overN(fillFin, x.Lx.layers)) * x.Lx.br));
    above = Math.max(...lay) - lay.at(-1);
    fillRise = riseOf(F, (x) => lumN(overN(x.Lx.base, x.Lx.fill))).rise;
    ground = F.every((x) => x.Lx.ground !== false);
  }
  const FF = fr.filter((x) => x.f); if (FF.length > 2) { const s = FF.map((x) => x.f.s); fsm = s.filter((v) => Math.abs(v - s[0]) >= BOUNCE && Math.abs(v - s.at(-1)) >= BOUNCE).length; }
  const lit = above >= LIGHT_RISE || fillRise >= LIGHT_RISE; const moved = qt.smid >= 2 || fsm >= 2 || qt.mid >= 2;
  return { n: lit || moved ? 1 : 0, lit, moved, ground, line: `light above its committed rest ${f(above, 4)} (layers) · fill flash ${f(fillRise, 4)} (bound < ${LIGHT_RISE} each${ground ? "" : "; NO PAINTED GROUND"}) · target scale in flight ${qt.smid} frame(s), face ${fsm}, body ${qt.mid} (bound < 2 each) · ${fr.length} frames` };
}
// ── H5 (pass 5): the committed face IN PAINT (CK-02 arm iii, CK-10 commit-light; REGISTRY §P4-7 item 2) ──────────
// The composite (__light) stacks a face's first 12 descendants as whole-face layers, so a Switch's thumb or a Radio's
// 8 px dot reads as covering the face: it failed lights that paint 0.014-0.020 (P-A4 §6.1) and passed lights that paint
// 0.0000 (the toggle's dark commit, the tabs' dark light under reduce: C-A4 §0.4). Arm (iii) and E-9's commit-light now
// pass only on PAINT: P-A4's `facefilm` method made a read. On its own page (never inside a per-frame film, which takes no
// screenshot), the same gesture, then the face's box inset by PAINT_INSET px screenshotted at PAINT_AT ms after the
// gesture starts; each shot's mean relative luminance (sRGB linearised, every pixel). The composite stays printed beside
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
export const PAINT_AT = [0, 30, 60, 90, 120, 150, 180, 210, 240, 280, 330, 400, 500, 650, 710, 770, 830, 900];
export const PAINT_INSET = 3, PAINT_TAIL_MS = 300, PAINT_GAP = 75, PAINT_EARLY = 400;
const lin8 = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
/** a PNG's mean relative luminance, and one 8-bit quantum of luminance at its mean colour (the read's resolution) */
export function pngLum(buf) {
  const p = PNG.sync.read(buf); let s = 0, n = 0, R = 0, G = 0, B = 0;
  for (let i = 0; i < p.data.length; i += 4) { s += 0.2126 * lin8(p.data[i]) + 0.7152 * lin8(p.data[i + 1]) + 0.0722 * lin8(p.data[i + 2]); R += p.data[i]; G += p.data[i + 1]; B += p.data[i + 2]; n++; }
  const m = [R / n, G / n, B / n]; const up = m.every((v) => v <= 254); const L0 = 0.2126 * lin8(m[0]) + 0.7152 * lin8(m[1]) + 0.0722 * lin8(m[2]);
  const L1 = 0.2126 * lin8(m[0] + (up ? 1 : -1)) + 0.7152 * lin8(m[1] + (up ? 1 : -1)) + 0.0722 * lin8(m[2] + (up ? 1 : -1));
  return { L: s / n, q: Math.abs(L1 - L0), n };
}
/** The paint read: `go()` starts the gesture (not awaited until the end); the face is re-boxed before each shot (a pop
 *  or a grow moves its box). Returns [{ t, L, q } | { t, miss }] */
export async function paintFilm(page, faceSel, go, at = PAINT_AT) {
  const t0 = Date.now(); const pend = Promise.resolve().then(go); const pts = [];
  try {
    for (const t of at) {
      while (Date.now() - t0 < t) await new Promise((r) => setTimeout(r, 2));
      const bb = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height }; }, faceSel);
      if (!bb || bb.w <= 2 * PAINT_INSET + 1 || bb.h <= 2 * PAINT_INSET + 1) { pts.push({ t: Date.now() - t0, miss: true }); continue; }
      const buf = await page.screenshot({ clip: { x: bb.x + PAINT_INSET, y: bb.y + PAINT_INSET, width: bb.w - 2 * PAINT_INSET, height: bb.h - 2 * PAINT_INSET }, animations: "allow", caret: "initial" });
      pts.push({ t: Date.now() - t0, ...pngLum(buf) });
    }
  } finally { await pend; }
  return pts;
}
/** The rise of a paint series, read like the composite's (riseOf): a read brighter than the darkest read before it (a
 *  face that only returns to its rest from brighter rises nowhere, so the committed fill's own change toward rest is not
 *  light) that also stands above the committed rest (the last read); at rest when the reads of the last PAINT_TAIL_MS
 *  spread within max(LIGHT_REST, one 8-bit quantum at the tail's mean colour) */
export function paintRise(pts) {
  const P = pts.filter((x) => !x.miss && Number.isFinite(x.L));
  if (P.length < 6) return { rise: NaN, rest: false, n: P.length, missed: pts.length - P.length, line: `in paint: ${P.length} of ${pts.length} reads found the face (bound ≥ 6): NOT READ` };
  const settle = P.at(-1).L; let lo = P[0].L, best = -Infinity, pk = 0;
  P.forEach((x, k) => { lo = Math.min(lo, x.L); if (x.L - lo > best) { best = x.L - lo; pk = k; } });
  const tail = P.filter((x) => x.t >= P.at(-1).t - PAINT_TAIL_MS); const tl = tail.map((x) => x.L);
  const spread = Math.max(...tl) - Math.min(...tl); const q = Math.max(0, ...tail.map((x) => x.q ?? 0)); const restBound = Math.max(LIGHT_REST, q);
  // the read's cadence: a screenshot the loaded machine delays past PAINT_GAP ms in the first PAINT_EARLY ms can step over
  // a light whose attack and release last 240 ms (the fixture's 60 + 180), so a starved read is re-read by the witness
  // (E-2's janky rule; E-9 twice), never graded as a light that is not there
  const early = P.filter((x) => x.t <= PAINT_EARLY); const gap = Math.max(0, ...early.slice(1).map((x, k) => x.t - early[k].t), P[0].t);
  const r = { rise: Math.min(best, P[pk].L - settle), peak: P[pk].L, peakT: P[pk].t, settle, rest: spread <= restBound + 1e-9, spread, restBound, tailN: tail.length, n: P.length, missed: pts.length - P.length, gap, starved: gap > PAINT_GAP };
  return { ...r, line: `in paint: rise ${f(r.rise, 4)} (peak ${f(r.peak, 4)} at +${r.peakT} ms → rest ${f(settle, 4)}; bound ≥ ${LIGHT_RISE}) · at rest ${r.rest} (last ${r.tailN} reads spread ${f(spread, 4)} against ${f(restBound, 4)}) · ${r.n} reads${r.missed ? `, ${r.missed} missed` : ""}, largest gap ${gap} ms in the first ${PAINT_EARLY} ms (bound ≤ ${PAINT_GAP}${r.starved ? ": STARVED, re-read" : ""}) · trace [${P.map((x) => `+${x.t} ${x.L.toFixed(4)}`).join(" ")}]` };
}
/** CK-02's three arms over one film ({ fr, anims } from __film) against the admitted arms. H5: `paint` (paintRise over the
 *  same gesture on its own page) decides arm (iii); without it arm (iii) cannot pass (the composite is printed only). */
export function commitArms(film, arms = DEFAULT_ARMS, env = [], paint = null) {
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
  // the fill: the face's own background) all run on an envelope row's clock, and at least one runs. H5: the channel is
  // the fill only when the composite saw the fill itself flash (≥ LIGHT_RISE); otherwise the layers, so a composite that
  // cannot see the light (a thumb read as the whole face) does not pick the channel by noise
  const ch = lr.ch === "fill" && lr.rise >= LIGHT_RISE ? "fill" : "layers";
  const chan = anims.filter((x) => (ch === "fill" ? x.self && x.props.some((p) => /background/i.test(p)) : x.inFace && !x.self));
  const onRow = chan.filter((x) => Number.isFinite(x.dur) && clocks.some((c) => Math.abs(c - x.dur) <= 1));
  const clockOk = onRow.length > 0 && onRow.length === chan.length;
  // H3: arm (iii) reads light only over a ground the page paints; without one the composite sits on an assumed white
  // and is not graded (it can neither pass nor be called a rise). H5: the rise and the rest are read IN PAINT
  const iiiComposite = lr.ground && lr.rise >= LIGHT_RISE && lr.rest && clockOk;
  const iii = !!paint && lr.ground && paint.rise >= LIGHT_RISE && paint.rest && clockOk;
  const ok = { i, ii, iii };
  const pass = arms.some((k) => ok[k]);
  const animTxt = [...new Set(anims.map((x) => `${x.props.join("+")}${x.pseudo}@${Math.round(x.dur)}ms`))].join(", ").slice(0, 160);
  const paintTxt = paint ? `${paint.line}${paint.rise >= LIGHT_RISE && paint.rest ? "" : " (arm iii FAILS in paint)"}` : "in paint: NOT READ (an earlier admitted arm decides the cell; arm iii cannot pass without the paint read)";
  return { pass, arms: ok, iiiComposite, line: `arm ${pass ? arms.filter((k) => ok[k]).join("+") : "none"} of [${arms.join(",")}] · (i) body travel ${f(travel, 2)} px overshoot ${f(over, 2)} px · (ii) face peak ${f(pkS)} trough ${f(trS)} settle ${f(stS)} on ${f(w0, 1)} px = ${f(exc, 2)} px (bound > ${FACE_PX}) · (iii) ${lr.ground ? "" : "NO PAINTED GROUND under the face (the light is not graded) · "}${paintTxt} · beside it the composite: light rise ${f(lr.rise, 4)} on the ${lr.ch ?? "?"} channel (peak ${f(lr.peak, 4)} → rest ${f(lr.settle, 4)}, at rest ${lr.rest}; ${quanta(lr)}; composite verdict ${iiiComposite ? "pass" : "fail"}${!!paint && iiiComposite !== iii ? " DISAGREES with paint" : ""}) on envelope clocks [${onRow.map((x) => Math.round(x.dur)).join(",")}] of the ${ch} channel's [${chan.map((x) => Math.round(x.dur)).join(",")}] ms; light anims [${animTxt}] · ${fr.length} frames, median ${f(medianDt(fr), 1)} ms` };
}
/** CK-10 (H3): a light leg kept under reduce, read on the TRANSIENT: lightRise over the film (the layers over the
 *  committed fill, or a fill that flashes above its rest and returns), so the committed state's own fill change does not
 *  count (C-CP CK-27: E-9 passed A with its commit light zeroed). No clock condition here: the clock is E-8's */
export function lightLeg(film, paint = null) {
  const lr = lightRise(film.fr ?? film);
  // H5: the transient is read IN PAINT (paintRise over the same reduce commit on its own page); the composite is printed
  // beside it and decides nothing (it passed the tabs' dark light under reduce at 0.0016-0.0018 in paint, C-A4 §0.4)
  const comp = lr.ground && lr.rise >= LIGHT_RISE && lr.rest;
  const pass = !!paint && lr.ground && paint.rise >= LIGHT_RISE && paint.rest;
  return { pass, line: `${lr.ground ? "" : "NO PAINTED GROUND under the face · "}${paint ? paint.line : "in paint: NOT READ"} · beside it the composite: light rise ${f(lr.rise, 4)} on the ${lr.ch ?? "?"} channel (peak ${f(lr.peak, 4)} → rest ${f(lr.settle, 4)}, at rest ${lr.rest}; bound ≥ ${LIGHT_RISE}; ${quanta(lr)}; composite verdict ${comp ? "pass" : "fail"}${paint && comp !== pass ? " DISAGREES with paint" : ""})` };
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
    // H2: one held touch read at several times (CK-06's sustain: +200 ms and +1 s), each read timed from the touch; H5: the
    // read is passed the ms elapsed since the touch began (E-5's onset)
    // H7 (CK-06; P-E6 §3, REGISTRY §P6-7 item 14): the clock starts at the FIRST TOUCH EVENT the page receives, not at the
    // send. The gesture synthesizer delivers touchstart some ms after `Input.synthesizeTapGesture` is sent (P-E6 read the
    // slider press 2.5-3.7 ms after the touch, and the +25 ms read missed it), so a clock started at the send read the
    // onset early by the delivery lag. The page stamps its first touchstart (capture, before any page listener) on its
    // own clock; the harness polls for it and maps it onto its clock with the round trip's midpoint. P.lastLag holds the
    // send → touchstart lag of the last hold (E-5 prints it). No touchstart within 1 s fails loud (the clock cannot start)
    P.holdAt = async (x, y, times, read) => {
      await P.page.evaluate(() => { window.__touch0 = null; addEventListener("touchstart", () => { if (window.__touch0 == null) window.__touch0 = performance.now(); }, { capture: true, once: true, passive: true }); });
      const sent = Date.now();
      const g = cdp.send("Input.synthesizeTapGesture", { x, y, duration: Math.max(...times) + 550, tapCount: 1, gestureSourceType: "touch" });
      let t0 = null;
      while (t0 == null && Date.now() - sent < 1000) {
        const a = Date.now(); const q = await P.page.evaluate(() => (window.__touch0 == null ? null : performance.now() - window.__touch0)); const b = Date.now();
        if (q != null) t0 = (a + b) / 2 - q;
      }
      if (t0 == null) { await g.catch(() => {}); throw new Error("touch clock: no touchstart reached the page within 1000 ms of the gesture's send"); }
      P.lastLag = t0 - sent; const out = [];
      for (const t of times) { await P.page.waitForTimeout(Math.max(0, t - (Date.now() - t0))); out.push(await read(Date.now() - t0)); }
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
      for (const t of times) { await R.page.waitForTimeout(Math.max(0, t - (Date.now() - t0))); out.push(await read(Date.now() - t0)); }
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

// ── H11 (pass 11): the lens's travel helpers, one source for E-10's side cells and E-11's travel cells (moved here from
// e10-continuity.mjs, where H10 wrote them; REGISTRY §P10-7 items 1-5). ──
// The cards a lens cell carries: none, scale 0.8 (origin 0 0), and an ancestor CSS zoom (REGISTRY §P10-7 item 4: zoom is a
// property any consumer can set; the lens inherits it, top layer or not, and its own CSS px are zoomed)
export const LENS_TF = { none: null, scale: { scale: "0.8", transformOrigin: "0 0" }, zoom08: { zoom: "0.8" }, zoom125: { zoom: "1.25" }, zoom2: { zoom: "2" }, zoom25: { zoom: "2.5" } };
// The rows the library declares: every `--spring-<row>-duration` in the CSSOM, resolved on a probe (inline !important, as E-8).
export const rowsOf = () => { const names = new Set(); const walk = (rules) => { for (const r of rules) { if (r.style) for (let i = 0; i < r.style.length; i++) { const m = r.style[i].match(/^--spring-([a-z]+)-duration$/); if (m) names.add(m[1]); } if (r.cssRules) walk(r.cssRules); } };
  for (const sh of document.styleSheets) { try { walk(sh.cssRules); } catch {} }
  const p = document.createElement("div"); document.body.appendChild(p); const out = [];
  for (const n of names) { p.style.cssText = `transition-duration: var(--spring-${n}-duration) !important; transition-timing-function: var(--spring-${n}) !important`; const cs = getComputedStyle(p); const d = Number.parseFloat(cs.transitionDuration); out.push({ n, ms: /ms/.test(cs.transitionDuration) ? d : d * 1000, ease: cs.transitionTimingFunction }); }
  p.remove(); return out; };
// A `linear()` curve as a function of the clock's fraction; what one nominal frame of it can move, and its overshoot.
export const curveOf = (ease) => { const m = /^linear\((.*)\)$/.exec(ease.trim()); if (!m) return null; const stops = m[1].split(",").map((x) => { const [v, ...ps] = x.trim().split(/\s+/); return { v: Number.parseFloat(v), p: ps.length ? Number.parseFloat(ps[0]) / 100 : null }; });
  if (stops[0].p == null) stops[0].p = 0; if (stops.at(-1).p == null) stops.at(-1).p = 1; for (let i = 1; i < stops.length - 1; i++) if (stops[i].p == null) { let j = i; while (stops[j].p == null) j++; for (let k = i; k < j; k++) stops[k].p = stops[i - 1].p + ((stops[j].p - stops[i - 1].p) * (k - i + 1)) / (j - i + 1); }
  return (t) => { if (t <= 0) return stops[0].v; if (t >= 1) return stops.at(-1).v; for (let i = 1; i < stops.length; i++) if (t <= stops[i].p) { const a = stops[i - 1], b = stops[i]; return b.p === a.p ? b.v : a.v + ((b.v - a.v) * (t - a.p)) / (b.p - a.p); } return stops.at(-1).v; }; };
const NOM_MS = 1000 / 60;
export const rowFacts = (row) => { const c = curveOf(row.ease); if (!c || !(row.ms > 0)) return { ...row, peak: NaN, over: NaN }; const fr = NOM_MS / row.ms; let peak = 0, over = 0; for (let t = 0; t < 1; t += fr / 8) { peak = Math.max(peak, Math.abs(c(t + fr) - c(t))); over = Math.max(over, c(t) - 1); } return { ...row, peak, over }; };
// The row a lens travel rides: the one whose clock a running non-opacity animation on the lens carries (within 2 ms)
export const rodeRow = (ams, rows) => { const facts = rows.map(rowFacts).filter((x) => Number.isFinite(x.peak)); return ams.map((ms) => facts.find((x) => Math.abs(x.ms - ms) <= 2)).find(Boolean) ?? null; };
// The film: a hold's lens against its track, per frame (a task posted from requestAnimationFrame, after that frame's paint), while the
// track is carried to the line, the row where the lens's top would leave the viewport. Drive `page` (scrollBy) or `carry` (the scroller's
// `top`, written in the scroller's own CSS px: a step of `rate` painted px under its zoom). `side`: on past the line by 40 px, then 900 ms.
// `at-change`: on until the lens changes side (else 40 px past the line), then a wobble of ±3 px. `at-line`: on to the line, then the
// wobble. The wobble: 40 frames toggling every 2, then 6 toggles every 30 frames, so neither a band under 6 px nor a dwell clock passes it.
export const sideFilm = ([L, drive, B, mode, rate]) => new Promise((ok) => {
  const q = (x) => document.querySelector(x); const b = B ? q(B) : null; let top = b ? Number.parseFloat(b.style.top) || 0 : 0; const zb = b ? b.currentCSSZoom ?? 1 : 1;
  const move = (dy) => { if (drive === "page") scrollBy(0, -dy); else { top += dy / zb; b.style.top = `${top}px`; } };
  // H11: each sample is stamped with the document timeline's time, the time every animation on the page was sampled at for the
  // geometry the read sees (it advances only at a rendering update), not with performance.now() in the posted task, whose lag behind
  // the frame (0-3 ms headless at load 12) let a lawful travel read 10 % past its row over a 16.7 ms window
  const out = []; const ch = new MessageChannel(); let n = 0; const T = () => document.timeline.currentTime; const t0 = T();
  ch.port1.onmessage = () => { const l = q(L.lens), t = q(L.track); if (!l || !t) return; const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); if (!(a1.width > 0)) return; const rel = a1.top + a1.height / 2 - (d.top + d.height / 2);
    const an = l.getAnimations().filter((x) => x.playState === "running").map((x) => ({ ms: x.effect.getTiming().duration, p: x.transitionProperty ?? Object.keys(x.effect.getKeyframes()[0] ?? {}).filter((k) => !["offset", "easing", "composite", "computedOffset"].includes(k)).join(",") }));
    out.push({ n, t: T() - t0, rel, pin: rel < 0 ? a1.bottom - d.top : a1.top - d.bottom, dx: a1.left + a1.width / 2 - (d.left + d.width / 2), lt: a1.top, lb: a1.bottom, tt: d.top, tb: d.bottom, H: a1.height, an }); };
  const l0 = q(L.lens), t1 = q(L.track); if (!l0 || !t1) { ok({ out, none: true }); return; }
  const H0 = l0.getBoundingClientRect().height, lineDist = t1.getBoundingClientRect().top - H0; const total = Math.ceil((Math.max(0, lineDist) + 40) / rate);
  let i = 0, phase = "in", k = 0, o = 0, tEnd = 0, side0 = null;
  const wobble = () => { const want = k < 40 ? (Math.floor(k / 2) % 2 ? 3 : -3) : (Math.floor((k - 40) / 30) % 2 ? 3 : -3); if (want !== o) { move(want - o); o = want; } k++; return k >= 40 + 6 * 30; };
  const tick = () => { n++; const last = out.at(-1); if (side0 == null && last) side0 = last.rel > 0;
    if (phase === "in") { const arrived = mode === "side" ? i >= total : mode === "at-line" ? i * rate >= lineDist : (last && side0 != null && last.rel > 0 !== side0) || i >= total;
      // at-change: back one carry step, the last place before the change was read, so ±3 px straddles the line whichever frame the change was read on
      if (arrived) { if (mode === "at-change") move(rate); phase = mode === "side" ? "dwell" : "wobble"; tEnd = performance.now() + 900; } else { move(-rate); i++; } }
    else if (phase === "wobble") { if (wobble()) { phase = "dwell"; tEnd = performance.now() + 500; } }
    ch.port2.postMessage(0);
    if (phase === "dwell" && performance.now() >= tEnd) setTimeout(() => ok({ out, H0, lineDist, total, vh: innerHeight, zb }), 50); else requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
// The card under a lens cell: `page` puts the row without a clip 230 px down a tall page, the card (tf) on the root's parent; `carry`
// sets the card on the row's scroller, scrolls its rest box 6 px under its top and sets the scroller 170 px down the viewport, the
// `top` written in the scroller's own (zoomed) CSS px. The row's page-wide veil is hidden, so only the lens is read
export const sideSetup = (m, tf) => async (page, drive) => {
  const css = LENS_TF[tf] ?? null;
  if (drive === "page") await page.evaluate(([root, css]) => { const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px"; if (css) Object.assign(document.querySelector(root).parentElement.style, css); }, [m.root ?? '[data-e~="root"]', css]);
  else await page.evaluate(([B, Q, css]) => { const b = document.querySelector(B); if (css) Object.assign(b.style, css); b.style.position = "relative"; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const y = b.getBoundingClientRect().top; b.style.top = `${(170 - y) / (b.currentCSSZoom ?? 1)}px`; }, [m.clip.box, m.clip.rest, css]);
  if (m.veil) await page.evaluate((v) => { const st = document.createElement("style"); st.textContent = `${v} { visibility: hidden !important; }`; document.head.appendChild(st); }, m.veil);
};
