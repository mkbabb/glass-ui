// lib.mjs: the shared measurement floor for the D2 dock witnesses (H2, revised by H3:
// pass-3/H3.md rows H3-1, H3-3, H3-7, H3-11).
//
// A witness imports this file and nothing else from the harness except the
// adapter and fixture modules. Everything here is engine-agnostic: the same code
// drives headless Chromium and Playwright WebKit (which is not Safari). The
// safaridriver target (H-8) lives in safari.mjs and is reached through launch().
import { holdWebkit } from "../../../driver/webkit-lock.mjs";
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
/** The repository that holds this harness (docs/tranches/BL/design/dock/harness → repo). */
export const REPO = path.resolve(HERE, "../../../../../..");
const NODE_MODULES = process.env.DOCK_HARNESS_NODE_MODULES ?? path.join(REPO, "node_modules");
export const playwright = await import(pathToFileURL(path.join(NODE_MODULES, "playwright/index.mjs")).href);
const requireNM = createRequire(path.join(NODE_MODULES, "_.cjs"));
export const { PNG } = requireNM("pngjs");

// ── CLI ───────────────────────────────────────────────────────────────────────
export function parseArgs(argv = process.argv.slice(2)) {
    const a = { engine: "all", positional: [] };
    for (let i = 0; i < argv.length; i++) {
        const k = argv[i];
        if (k.startsWith("--")) {
            const key = k.slice(2);
            const next = argv[i + 1];
            if (next === undefined || next.startsWith("--")) a[key] = true;
            else { a[key] = next; i++; }
        } else a.positional.push(k);
    }
    return a;
}
export function engines(args) {
    return args.engine === "all" ? ["chromium", "webkit"] : String(args.engine).split(",");
}
export const ENGINE_LABEL = { chromium: "Chromium", webkit: "Playwright WebKit", safari: "Safari (safaridriver)" };
export function outDir(args, witness) {
    const root = args.out ?? process.env.DOCK_HARNESS_OUT ?? path.join(os.tmpdir(), "dock-harness");
    const shim = args["no-webkit-shim"] ? "-unshimmed" : "";
    const d = path.join(root, "runs", `${witness}-${args.fixture ? "fixture-" + args.fixture : path.basename(args.build ?? "nobuild")}${shim}`);
    fs.mkdirSync(d, { recursive: true });
    return d;
}
/** The 1-minute load average, recorded beside every timing (the brief's serialization law). */
export function loadAvg() { return +os.loadavg()[0].toFixed(2); }

// ── the pinned rung (H-3d) ────────────────────────────────────────────────────
/**
 * The spring the dock's extent morph rides, pinned here so a family cannot move
 * the witness's clock by editing its own token or adapter. Source of record:
 * src/composables/motion/spring/springPresets.ts, the "dock" row (response 0.3,
 * dampingFraction 0.88, settleBand 0.02). A build's adapter rung() must agree with
 * it; the fixture declares its own rung (fixtures.mjs FIXTURE_RUNG).
 */
export const DOCK_RUNG = { name: "dock", response: 0.3, dampingFraction: 0.88, settleBand: 0.02 };
export async function pinnedRung(target) {
    if (target.kind === "fixture") return (await import("./fixtures.mjs")).FIXTURE_RUNG;
    return DOCK_RUNG;
}

// ── static serving ────────────────────────────────────────────────────────────
const MIME = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".wasm": "application/wasm", ".jpg": "image/jpeg", ".webp": "image/webp" };
/** Serve a directory (SPA fallback to index.html) or a function (req URL → html string). */
export function serve(rootOrFn) {
    const server = http.createServer((req, res) => {
        const url = new URL(req.url, "http://x");
        if (typeof rootOrFn === "function") {
            res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
            res.end(rootOrFn(url));
            return;
        }
        let p = path.join(rootOrFn, decodeURIComponent(url.pathname));
        if (!p.startsWith(rootOrFn)) { res.writeHead(403); res.end(); return; }
        if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) {
            const idx = path.join(p, "index.html");
            p = fs.existsSync(idx) ? idx : path.join(rootOrFn, "index.html");
        }
        res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream", "cache-control": "no-store" });
        fs.createReadStream(p).pipe(res);
    });
    return new Promise((resolve) => server.listen(0, "127.0.0.1", () => {
        resolve({ url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) });
    }));
}

// ── targets: a build (scene page + demo) or the hand-made fixture ─────────────
/**
 * A target resolves a scene name to a URL and knows whether the page carries its
 * own `__dockProbe` (fixtures do) or needs the adapter injected (builds do).
 */
export async function openTarget(args) {
    if (args.fixture) {
        const { fixturePage } = await import("./fixtures.mjs");
        const srv = await serve((url) => fixturePage(url.searchParams));
        const fault = args.fixture === "pass" ? "" : args.fixture;
        return {
            kind: "fixture",
            label: `fixture:${args.fixture}`,
            url: (scene, q = {}) => {
                const s = scene === "sidebar" ? "rail" : scene;
                const p = new URLSearchParams({ scene: s, ...q });
                if (fault) p.set("fault", fault);
                return `${srv.url}/?${p}`;
            },
            adapter: null,
            close: srv.close,
        };
    }
    if (!args.build) throw new Error("pass --build <dir> (from build.mjs) or --fixture pass|<fault>");
    const build = path.resolve(args.build);
    const meta = JSON.parse(fs.readFileSync(path.join(build, "build.json"), "utf8"));
    const scene = await serve(path.join(build, "scene"));
    const demo = fs.existsSync(path.join(build, "demo", "index.html")) ? await serve(path.join(build, "demo")) : null;
    const adapterPath = args.adapter ? path.resolve(args.adapter) : path.join(HERE, "adapter-head.mjs");
    const adapter = await import(pathToFileURL(adapterPath).href);
    return {
        kind: "build",
        label: `${meta.label}@${meta.head.slice(0, 8)}`,
        meta,
        demoUrl: (route) => (demo ? demo.url + route : null),   // H4-10 · the demo app's own routes
        url: (name, q = {}) => {
            if (name === "sidebar") {
                if (!demo) throw new Error("the build has no demo (rebuild without --no-demo)");
                return `${demo.url}${adapter.sidebarRoute ?? "/"}`;
            }
            return `${scene.url}/?${new URLSearchParams({ scene: name, ...q })}`;
        },
        adapter,
        noWebkitShim: !!args["no-webkit-shim"],
        close: async () => { await scene.close(); if (demo) await demo.close(); },
    };
}

// ── engines + pages ───────────────────────────────────────────────────────────
// Playwright WebKit stalls when macOS AppSSO stops answering at about the 90th page load of one browser
// process (../../tile/pass-3/H3.md, H3-1). A WebKit browser is retired after NAV_CAP page loads (every
// load is one newContext in openScene) and the next context opens on a new process; a retired process
// closes once its last context has closed. DOCK_HARNESS_NAV_CAP overrides (the self-test control sets 3).
export const NAV_CAP = Number(process.env.DOCK_HARNESS_NAV_CAP) || 60;
export async function launch(engine) {
    if (engine === "safari") throw new Error("OWNER-RUN: real Safari is headed; under the machine law (2026-10-16) its cells are the owner's to run");
    // H5-2 · DOCK_HARNESS_EXPOSE_GC=1 (the self-test's `ctxgc` rows only): Chromium with V8's gc() in the page, so
    // the fixture can force a GC into the slot after an evaluate returns (ctx-diag's gc-slot). Not a GPU arg
    if (engine !== "webkit") { const b = await playwright[engine].launch({ headless: true, ...(engine === "chromium" && process.env.DOCK_HARNESS_EXPOSE_GC ? { args: ["--js-flags=--expose-gc"] } : {}) }); b.__engine = engine; return b; }
    await holdWebkit();
    let b = await playwright.webkit.launch({ headless: true }), loads = 0;
    const retired = [];
    const sweep = () => { const now = Date.now(); for (const r of retired.splice(0)) { if (!r.contexts().length) { r.close().catch(() => { }); continue; } if (now - (r.__retiredAt ??= now) > 30000) { console.log(`  (LEAK: a retired Playwright WebKit browser still held ${r.contexts().length} context(s) after 30 s; closed)`); r.close().catch(() => { }); continue; } retired.push(r); } };
    const h = {
        __engine: engine, relaunched: 0,
        async newContext(o) {
            sweep();
            if (loads > 0 && loads % NAV_CAP === 0) { retired.push(b); b = await playwright.webkit.launch({ headless: true }); h.relaunched++; console.log(`  (Playwright WebKit browser retired after ${loads} page loads and relaunched, ${h.relaunched}×)`); sweep(); }
            loads++;
            return b.newContext(o);
        },
        async close() { await Promise.all([b, ...retired.splice(0)].map((x) => x.close().catch(() => { }))); },
    };
    return h;
}
/** The cell label suffix for an engine on a target ("+shim" when the WebKit crash shim is on). */
export function engineTag(target, engine) {
    if (engine !== "webkit" || !target.adapter?.webkitShim) return "";
    return target.noWebkitShim ? "-unshimmed" : "+shim";
}
/**
 * Open one scene in a fresh context. `ctx` takes Playwright context options
 * (viewport, hasTouch, isMobile, reducedMotion, deviceScaleFactor, recordVideo).
 * Returns the page, ready: the dock is mounted and the probe contract is installed.
 */
// DOCK_HARNESS_THEME=light|dark sets the default theme of every scene a witness opens
// (a witness that names its own theme per cell, W7, keeps it). Unset: no colour scheme
// is forced and no class is added, which Playwright renders as light.
export async function openScene(browser, target, scene, { query = {}, ctx = {}, settle = 900, theme = process.env.DOCK_HARNESS_THEME || null } = {}) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...(theme ? { colorScheme: theme } : {}), ...ctx });
    const page = await context.newPage();
    const opened = Date.now();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 300)));
    let crashed = null;
    page.on("crash", () => { crashed = "page crashed"; });
    if (target.adapter?.config) await page.addInitScript(`window.__dockAdapterConfig = ${JSON.stringify(target.adapter.config)};`);
    if (scene === "sidebar" && target.adapter?.sidebarRootSel) await page.addInitScript(`window.__hpRootSel = ${JSON.stringify(target.adapter.sidebarRootSel)};`);
    // the init script runs before <html> exists: add the class when it appears (asserted after load)
    if (theme === "dark") await page.addInitScript(`(() => { const f = () => document.documentElement?.classList.add("dark"); if (document.documentElement) f(); else new MutationObserver((_, o) => { if (document.documentElement) { f(); o.disconnect(); } }).observe(document, { childList: true }); })();`);
    await page.addInitScript(HP_SRC);
    if (browser.__engine === "webkit" && target.adapter?.webkitShim && !target.noWebkitShim) {
        await page.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hp-wk-shim")) { const s = document.createElement("style"); s.id = "hp-wk-shim"; s.textContent = ${JSON.stringify(target.adapter.webkitShim)}; (document.head || document.documentElement).appendChild(s); } });`);
    }
    await page.goto(target.url(scene, query), { waitUntil: "load" });
    if (target.adapter) {
        await page.waitForFunction((sel) => document.querySelector(sel), target.adapter.rootSel(scene), { timeout: 20000 });
        await page.evaluate(target.adapter.source);
    }
    await page.waitForFunction(() => window.__dockProbe && window.__dockProbe.root(), null, { timeout: 20000 });
    await page.waitForTimeout(settle);
    if (crashed) throw new Error(crashed);
    if (theme) { const dark = await page.evaluate(() => document.documentElement.classList.contains("dark")); if (dark !== (theme === "dark")) throw new Error(`theme ${theme} not applied (html.dark ${dark})`); }
    return { page, context, errors, opened, close: () => context.close() };
}

// ── in-page helpers (installed before any page script; shared by adapters) ────
export const HP_SRC = `(() => {
  const PX = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };
  const hp = {
    label(el) { if (!el) return "null"; return el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + [...el.classList].slice(0, 3).map((c) => "." + c).join(""); },
    isScroller(el) { const cs = getComputedStyle(el); return /^(auto|scroll|hidden)$/.test(cs.overflowX) || /^(auto|scroll|hidden)$/.test(cs.overflowY); },
    /** Scroll containers inside root (root included) that are ancestors of at least one seat. */
    seatScrollers(root, seats) {
      const seen = new Set(); const out = [];
      for (const s of seats) {
        for (let e = s.parentElement; e; e = e.parentElement) {
          if (!seen.has(e) && hp.isScroller(e)) { seen.add(e); const cs = getComputedStyle(e); out.push({ id: hp.label(e), ox: cs.overflowX, oy: cs.overflowY, rx: e.scrollWidth - e.clientWidth, ry: e.scrollHeight - e.clientHeight }); }
          if (e === root) break;
        }
      }
      return out;
    },
    /** Parse a computed clip-path inset() into px insets [t, r, b, l] against a w×h box. */
    insetOf(el, w, h) {
      const cp = getComputedStyle(el).clipPath || "none";
      const m = /^inset\\(([^)]*)\\)/.exec(cp);
      if (!m) return null;
      const body = m[1].split(/\\bround\\b/)[0].trim();
      const parts = body.match(/calc\\([^)]*\\)|[-\\d.]+(?:px|%)?/g) || ["0"];
      const res = (s, ref) => s.endsWith("%") ? PX(s) / 100 * ref : PX(s);
      // H5-13 · expand the shorthand BEFORE resolving: a one-value inset(10%) is 10% of the height on
      // the block sides and 10% of the width on the inline sides (it resolved every side against h)
      const [t, r = t, b = t, l = r] = parts;
      return [res(t, h), res(r, w), res(b, h), res(l, w)];
    },
    /** The rect an element clips its descendants to (Infinity on an unclipped axis). */
    clipRectOf(el) {
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      let L = -Infinity, T = -Infinity, R = Infinity, B = Infinity;
      const sx = el.offsetWidth ? r.width / el.offsetWidth : 1, sy = el.offsetHeight ? r.height / el.offsetHeight : 1;
      if (cs.overflowX !== "visible") { L = r.left + PX(cs.borderLeftWidth) * sx; R = r.right - PX(cs.borderRightWidth) * sx; }
      if (cs.overflowY !== "visible") { T = r.top + PX(cs.borderTopWidth) * sy; B = r.bottom - PX(cs.borderBottomWidth) * sy; }
      const ins = hp.insetOf(el, el.offsetWidth, el.offsetHeight);
      if (ins) { T = Math.max(T, r.top + ins[0] * sy); R = Math.min(R, r.right - ins[1] * sx); B = Math.min(B, r.bottom - ins[2] * sy); L = Math.max(L, r.left + ins[3] * sx); }
      return { l: L, t: T, r: R, b: B };
    },
    /** Bounding rect of el, cut by its own clip-path inset and every ancestor clip. */
    paintedRect(el) {
      const r = el.getBoundingClientRect();
      let o = { l: r.left, t: r.top, r: r.right, b: r.bottom };
      const sx = el.offsetWidth ? r.width / el.offsetWidth : 1, sy = el.offsetHeight ? r.height / el.offsetHeight : 1;
      const ins = hp.insetOf(el, el.offsetWidth, el.offsetHeight);
      if (ins) o = { l: o.l + ins[3] * sx, t: o.t + ins[0] * sy, r: o.r - ins[1] * sx, b: o.b - ins[2] * sy };
      for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
        const c = hp.clipRectOf(a);
        o = { l: Math.max(o.l, c.l), t: Math.max(o.t, c.t), r: Math.min(o.r, c.r), b: Math.min(o.b, c.b) };
      }
      return o;
    },
    /** H6-1 · the element's own CSS mask along the main axis ("x" | "y"): null when it has none; { at(x) } giving the mask
     *  alpha at viewport coordinate x (linear-gradient layers along that axis, stops in px, % or calc(% ± px), mask-size
     *  full, position at the origin, composite add); { unread: why } for any other mask, which the caller judges hard. */
    maskOf(el, ax) {
      const cs = getComputedStyle(el);
      const img = (cs.maskImage || cs.webkitMaskImage || "none").trim();
      if (!img || img === "none") return null;
      const unread = (why) => ({ unread: why });
      const split = (s) => { const out = []; let d = 0, cur = ""; for (const c of s) { if (c === "(") d++; else if (c === ")") d--; if (c === "," && d === 0) { out.push(cur.trim()); cur = ""; } else cur += c; } if (cur.trim()) out.push(cur.trim()); return out; };
      const size = (cs.maskSize || cs.webkitMaskSize || "auto").trim(), pos = (cs.maskPosition || cs.webkitMaskPosition || "0% 0%").trim();
      if (!["auto", "auto auto", "100% 100%", "100%", ""].includes(size)) return unread("mask-size " + size);
      if (!["0% 0%", "0px 0px", "left top", "0%", "0px", "", "left", "0% 0px", "0px 0%"].includes(pos)) return unread("mask-position " + pos);
      const mode = (cs.maskMode || "match-source").trim(); if (mode === "luminance") return unread("mask-mode luminance");
      const comp = (cs.maskComposite || cs.webkitMaskComposite || "add").trim(); if (!["add", "source-over", ""].includes(comp)) return unread("mask-composite " + comp);
      const r = el.getBoundingClientRect(); const W = ax === "y" ? el.offsetHeight : el.offsetWidth; if (!W) return unread("no box");
      const k = (ax === "y" ? r.height : r.width) / W, o = ax === "y" ? r.top : r.left;
      const alphaOf = (c) => {
        c = c.trim().toLowerCase(); if (c === "transparent") return 0;
        const i = c.indexOf("("); if (i < 0) return 1;
        const body = c.slice(i + 1, c.lastIndexOf(")"));
        let a = null; const sl = body.lastIndexOf("/");
        if (sl >= 0) a = body.slice(sl + 1).trim(); else { const parts = body.split(","); if (parts.length === 4) a = parts[3].trim(); }
        if (a == null || a === "") return 1; return a.endsWith("%") ? parseFloat(a) / 100 : parseFloat(a);
      };
      const lenOf = (t, L) => { t = t.trim(); if (t.startsWith("calc(")) { let s = 0; const inner = t.slice(5, -1).split(" ").filter(Boolean); let sign = 1; for (const tok of inner) { if (tok === "+") { sign = 1; continue; } if (tok === "-") { sign = -1; continue; } const v = lenOf(tok, L); if (v == null) return null; s += sign * v; sign = 1; } return s; } if (t.endsWith("%")) return parseFloat(t) / 100 * L; if (t.endsWith("px")) return parseFloat(t); if (t === "0") return 0; return null; };
      const layers = [];
      for (const layer of split(img)) {
        if (layer === "none") continue;
        if (!layer.startsWith("linear-gradient(")) return unread(layer.slice(0, 40));
        const args = split(layer.slice(16, layer.lastIndexOf(")")));
        let dir = ax === "y" ? "to bottom" : null, rev = false;
        const d0 = args[0];
        if (d0.startsWith("to ") || d0.endsWith("deg") || d0.endsWith("turn") || d0.endsWith("rad")) { dir = d0; args.shift(); }
        else if (ax === "x") return unread("default direction across the main axis");
        const deg = dir.endsWith("deg") ? ((parseFloat(dir) % 360) + 360) % 360 : dir.endsWith("turn") ? ((parseFloat(dir) * 360) % 360 + 360) % 360 : dir.endsWith("rad") ? ((parseFloat(dir) * 180 / Math.PI) % 360 + 360) % 360 : null;
        if (ax === "x") { if (dir === "to right" || deg === 90) rev = false; else if (dir === "to left" || deg === 270) rev = true; else return unread("direction " + dir); }
        else { if (dir === "to bottom" || deg === 180) rev = false; else if (dir === "to top" || deg === 0) rev = true; else return unread("direction " + dir); }
        const stops = [];
        for (const a of args) {
          let c, rest;
          const p = a.indexOf("(");
          if (p >= 0 && p < (a.indexOf(" ") < 0 ? Infinity : a.indexOf(" "))) { let d = 0, j = p; for (; j < a.length; j++) { if (a[j] === "(") d++; else if (a[j] === ")") { d--; if (d === 0) break; } } c = a.slice(0, j + 1); rest = a.slice(j + 1).trim(); }
          else { const sp = a.indexOf(" "); c = sp < 0 ? a : a.slice(0, sp); rest = sp < 0 ? "" : a.slice(sp + 1).trim(); }
          // a stop's colour may follow its position (engines serialize "black 10px"; "10px black" is read too)
          let al = alphaOf(c);
          if (Number.isNaN(al) || (lenOf(c, W) != null && rest)) { const t = c; c = rest; rest = t; al = alphaOf(c); }
          const ps = []; let d = 0, cur = ""; for (const ch of rest) { if (ch === "(") d++; else if (ch === ")") d--; if (ch === " " && d === 0) { if (cur) ps.push(cur); cur = ""; } else cur += ch; } if (cur) ps.push(cur);
          if (!ps.length) stops.push([null, al]);
          for (const q of ps) { const v = lenOf(q, W); if (v == null) return unread("stop " + q); stops.push([v, al]); }
        }
        if (stops.length < 2) return unread("one stop");
        if (stops[0][0] == null) stops[0][0] = 0;
        if (stops.at(-1)[0] == null) stops.at(-1)[0] = W;
        for (let i = 1; i < stops.length; i++) if (stops[i][0] != null && stops[i][0] < stops[i - 1][0]) stops[i][0] = stops[i - 1][0];
        for (let i = 1; i < stops.length - 1; i++) if (stops[i][0] == null) { let j = i; while (stops[j][0] == null) j++; const a = stops[i - 1][0], b = stops[j][0]; for (let m = i; m < j; m++) stops[m][0] = a + (b - a) * (m - i + 1) / (j - i + 1); }
        layers.push({ stops, rev });
      }
      if (!layers.length) return null;
      const one = (Ly, t) => { const s = Ly.stops; if (t <= s[0][0]) return s[0][1]; for (let i = 1; i < s.length; i++) if (t <= s[i][0]) { const [a0, v0] = s[i - 1], [a1, v1] = s[i]; return a1 - a0 < 1e-6 ? v1 : v0 + (v1 - v0) * (t - a0) / (a1 - a0); } return s.at(-1)[1]; };
      return { at(x) { const t0 = (x - o) / k; let keep = 1; for (const Ly of layers) keep *= 1 - Math.max(0, Math.min(1, one(Ly, Ly.rev ? W - t0 : t0))); return 1 - keep; } };
    },
    /** Effective opacity along the ancestor chain; 0 when not rendered or hidden. */
    visibleOpacity(el) {
      const cs0 = getComputedStyle(el);
      if (cs0.visibility !== "visible" || cs0.display === "none") return 0;
      let o = 1;
      for (let e = el; e && e !== document.documentElement; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === "none") return 0; o *= PX(cs.opacity); }
      return o;
    },
    /** True when el or an ancestor carries a non-identity scale or a blur filter (O-64 R-4, O-66 §2 "sharp").
     *  Exempt: the seat's OWN scale while it is the engagement carrier (the seat matches :hover or
     *  :active, or a CSS transition on scale/transform is settling on it). Engagement is D-2's
     *  and is judged by W2 and W4; this census judges the dock's motion carriers (plate, run,
     *  ancestors, a FLIP or squash on the seat). A blur is never exempt. */
    unsharp(el) {
      const engaged = el.matches(":hover, :active") || el.getAnimations().some((a) => a.constructor.name === "CSSTransition" && /^(scale|transform)$/.test(a.transitionProperty) && a.playState === "running");
      for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (e === el && engaged) { if (cs.filter && /blur\\(/.test(cs.filter) && !/blur\\(0(px)?\\)/.test(cs.filter)) return hp.label(e) + " filter " + cs.filter; continue; }
        if (cs.scale && cs.scale !== "none" && cs.scale.split(" ").some((v) => Math.abs(PX(v) - 1) > 1e-3)) return hp.label(e) + " scale " + cs.scale;
        if (cs.transform && cs.transform !== "none") {
          const m = cs.transform.match(/matrix(3d)?\\(([^)]*)\\)/);
          if (m) { const v = m[2].split(",").map(PX); const a = m[1] ? v[0] : v[0], b = m[1] ? v[1] : v[1], c = m[1] ? v[4] : v[2], d = m[1] ? v[5] : v[3];
            if (Math.abs(Math.hypot(a, b) - 1) > 1e-3 || Math.abs(Math.hypot(c, d) - 1) > 1e-3) return hp.label(e) + " transform " + cs.transform; }
        }
        if (cs.filter && /blur\\(/.test(cs.filter) && !/blur\\(0(px)?\\)/.test(cs.filter)) return hp.label(e) + " filter " + cs.filter;
      }
      return "";
    },
    /** Resolve a time token (a custom property holding a <time>) to ms on el. */
    tokenMs(el, name) {
      const d = document.createElement("div");
      d.style.cssText = "position:absolute;visibility:hidden;transition-duration:var(" + name + ")";
      el.appendChild(d); const v = getComputedStyle(d).transitionDuration; d.remove();
      const n = parseFloat(v); return v.endsWith("ms") ? n : n * 1000;
    },
    /** Transform-free union of seat layout rects along an axis (read at rest). */
    union(els) {
      let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
      for (const e of els) { const q = e.getBoundingClientRect(); if (!q.width && !q.height) continue; l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom); }
      return { l, t, r, b };
    },
  };
  window.__hp = hp;
})();`;

// ── probe paint (the pixel reads) ─────────────────────────────────────────────
// mode "plate": only the plate element paints, opaque magenta on white.
// mode "rim":   only the rim paints (its own colours), the plate keeps its clips but not its paint.
// mode "seat":  only one seat paints (its own colours) on white.
// mode "faces": the plate paints magenta; every seat paints its glyph ink green (#0f0) at its own
//               opacity, clip and transform; everything else paints nothing but keeps its box,
//               clip, opacity and visibility (H-3: faces are read from pixels, never the adapter).
// mode "els":   only the elements marked [data-hp-el] paint, in their own colours, on white.
// mode "edge":  only the plate paints, in its own colours, on a mid-grey page, backdrop-filter off (O-67).
//               An adapter whose edge is carried outside the plate (edge caps) names those
//               elements in the optional edge() read; they paint too, in their own colours.
// Every mode hides by `visibility`, which also takes an element out of hit-testing. An adapter
// whose press surface is not the plate (the D2-G hit pair) names it in the optional hit()
// read; it stays hit-testable in every mode and paints nothing, so a hover or press the
// witness issues under a probe lands where it would on the page.
const PROBE_CSS = `
html[data-hp], html[data-hp] body { background: #fff !important; background-image: none !important; }
html[data-hp="edge"], html[data-hp="edge"] body { background: #7f7f7f !important; }
html[data-hp]:where(:not([data-hp="faces"])) body * { visibility: hidden !important; }
html[data-hp="plate"] [data-hp-plate], html[data-hp="faces"] [data-hp-plate] { visibility: visible !important; background: #f0f !important; background-image: none !important; border-color: #f0f !important; box-shadow: none !important; outline: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; filter: none !important; opacity: 1 !important; }
html[data-hp] [data-hp-plate]::before, html[data-hp] [data-hp-plate]::after { display: none !important; }
html[data-hp="edge"] [data-hp-plate] { visibility: visible !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
html[data-hp="edge"] [data-hp-plate]::before, html[data-hp="edge"] [data-hp-plate]::after { display: block !important; }
html[data-hp="edge"] [data-hp-plate] * { visibility: hidden !important; }
html[data-hp="edge"] [data-hp-edge] { visibility: visible !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
html[data-hp="rim"] [data-hp-plate] { visibility: visible !important; background: transparent !important; background-image: none !important; border-color: transparent !important; box-shadow: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
html[data-hp="rim"] [data-hp-plate] > :not([data-hp-rim]):not(:has([data-hp-rim])) { visibility: hidden !important; }
html[data-hp="rim"] [data-hp-rim], html[data-hp="rim"] [data-hp-rim] * { visibility: visible !important; }
html[data-hp="seat"] [data-hp-seat], html[data-hp="seat"] [data-hp-seat] * { visibility: visible !important; }
html[data-hp="els"] [data-hp-el], html[data-hp="els"] [data-hp-el] * { visibility: visible !important; }
html[data-hp="faces"] body *, html[data-hp="faces"] body *::before, html[data-hp="faces"] body *::after { color: transparent !important; -webkit-text-fill-color: transparent !important; background: transparent !important; border-color: transparent !important; box-shadow: none !important; outline-color: transparent !important; text-shadow: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; caret-color: transparent !important; }
html[data-hp="faces"] body svg * { fill: transparent !important; stroke: transparent !important; }
html[data-hp="faces"] body img, html[data-hp="faces"] body canvas, html[data-hp="faces"] body video { visibility: hidden !important; }
html[data-hp="faces"] [data-hp-plate] { background: #f0f !important; }
html[data-hp="faces"] [data-hp-face], html[data-hp="faces"] [data-hp-face] * { color: #0f0 !important; -webkit-text-fill-color: #0f0 !important; }
html[data-hp="faces"] [data-hp-face] svg [fill]:not([fill="none"]), html[data-hp="faces"] [data-hp-face] svg:not([fill]) *:not([fill]) { fill: #0f0 !important; }
html[data-hp="faces"] [data-hp-face] svg [stroke]:not([stroke="none"]) { stroke: #0f0 !important; }
html[data-hp="faces"] [data-hp-face-bg] { background: #0f0 !important; }
html[data-hp="faces"] [data-hp-face]::before, html[data-hp="faces"] [data-hp-face]::after, html[data-hp="faces"] [data-hp-face] *::before, html[data-hp="faces"] [data-hp-face] *::after { display: none !important; }
html[data-hp] [data-hp-hit] { visibility: visible !important; background: transparent !important; background-image: none !important; border-color: transparent !important; box-shadow: none !important; outline: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
[data-hp-unclip] { overflow: visible !important; clip-path: none !important; contain: none !important; mask: none !important; -webkit-mask: none !important; }
`;
export async function probeMode(page, mode, { rim = "dock", els = null, faceSel = null } = {}) {
    await page.evaluate(({ css, mode, rim, els, faceSel }) => {
        if (!document.getElementById("hp-probe-css")) {
            const s = document.createElement("style"); s.id = "hp-probe-css"; s.textContent = css; document.head.appendChild(s);
        }
        const P = window.__dockProbe;
        for (const a of ["data-hp-plate", "data-hp-rim", "data-hp-face", "data-hp-face-bg", "data-hp-el", "data-hp-edge", "data-hp-hit"]) document.querySelectorAll(`[${a}]`).forEach((e) => e.removeAttribute(a));
        if (!mode) { document.documentElement.removeAttribute("data-hp"); return; }
        P.plate()?.setAttribute("data-hp-plate", "");
        for (const e of P.hit?.() ?? []) e.setAttribute("data-hp-hit", "");
        const rims = rim === "composed" ? [P.composedRim?.()].filter(Boolean) : (P.rim?.() ?? []);
        for (const e of rims) e.setAttribute("data-hp-rim", "");
        if (mode === "edge") for (const e of P.edge?.() ?? []) e.setAttribute("data-hp-edge", "");
        if (mode === "faces") {
            // a face paints its glyph ink green; a face element that paints a box (a track, a
            // badge, a capsule) paints that box green too, so a bare box outside the plate counts
            const faces = faceSel ? faceSel.flatMap((sel) => [...document.querySelectorAll(sel)]) : P.seats({ all: true });
            for (const e of faces) {
                e.setAttribute("data-hp-face", "");
                for (const x of [e, ...e.querySelectorAll("*")]) { const bg = getComputedStyle(x).backgroundColor; const m = bg.match(/rgba?\(([^)]*)\)/); const a = m ? (m[1].split(",")[3] ?? "1") : "0"; if (parseFloat(a) > 0.05 || getComputedStyle(x).backgroundImage !== "none") x.setAttribute("data-hp-face-bg", ""); }
            }
        }
        if (els) for (const sel of els) document.querySelectorAll(sel).forEach((e) => e.setAttribute("data-hp-el", ""));
        document.documentElement.setAttribute("data-hp", mode);
    }, { css: PROBE_CSS, mode, rim, els, faceSel });
}

/** Screenshot a clip rect (CSS px) and decode it. */
export async function shoot(page, clip) {
    const vp = page.viewportSize();
    const x = Math.max(0, Math.floor(clip.x)), y = Math.max(0, Math.floor(clip.y));
    const c = { x, y, width: Math.min(vp.width - x, Math.ceil(clip.width + (clip.x - x))), height: Math.min(vp.height - y, Math.ceil(clip.height + (clip.y - y))) };
    const buf = await page.screenshot({ clip: c, scale: "device", caret: "hide" });
    const png = PNG.sync.read(buf);
    return { w: png.width, h: png.height, data: png.data, clip: c, dsf: png.width / c.width, png: buf };
}
export function decodePng(buf) { const p = PNG.sync.read(buf); return { w: p.width, h: p.height, data: p.data }; }
/**
 * Coverage of the probe magenta (1 = plate) per pixel. `interiorG` is the green level
 * inside the plate: 0 on a lossless screenshot; a screencast (VP8) lifts it, so the
 * sampler measures it per frame and passes it in.
 */
export function magentaCoverage(img, interiorG = 0) {
    const cov = new Float32Array(img.w * img.h);
    for (let i = 0; i < cov.length; i++) {
        const r = img.data[i * 4], g = img.data[i * 4 + 1], b = img.data[i * 4 + 2];
        cov[i] = r > 150 && b > 150 ? Math.max(0, Math.min(1, (255 - g) / (255 - interiorG))) : 0;
    }
    return cov;
}
/** The green level inside a screencast frame's magenta (the median over strongly magenta pixels). */
export function interiorGreen(img) {
    const gs = [];
    for (let i = 0; i < img.w * img.h; i += 3) { const r = img.data[i * 4], g = img.data[i * 4 + 1], b = img.data[i * 4 + 2]; if (r > 180 && b > 180 && g < 140) gs.push(g); }
    if (gs.length < 20) return 0;
    gs.sort((a, b) => a - b);
    return gs[Math.floor(gs.length / 2)];
}
/** Deviation from white (0..1) per device pixel. */
export function inkCoverage(img) {
    const cov = new Float32Array(img.w * img.h);
    for (let i = 0; i < cov.length; i++) {
        const d = Math.max(255 - img.data[i * 4], 255 - img.data[i * 4 + 1], 255 - img.data[i * 4 + 2]);
        cov[i] = d / 255;
    }
    return cov;
}

/**
 * The silhouette read. Given a plate coverage map, find the plate's sub-pixel
 * edges from its middle row and column and measure every well-conditioned
 * boundary point of the four corners against a circle. Rows sample the steep half
 * of each quarter arc and columns the shallow half, so no sample sits on a tangent.
 * r defaults to half the cross-axis extent (the stadium law); `fitR: true` fits one
 * r per corner (the card law: each corner a circle, all four equal). Errors in CSS px.
 */
export function cornerRead(cov, w, h, dsf, axis = null, { fitR = false } = {}) {
    let top = -1, bottom = -1, left = w, right = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (cov[y * w + x] > 0.5) {
        if (top < 0) top = y; bottom = y; if (x < left) left = x; if (x > right) right = x;
    }
    if (top < 0) return { empty: true };
    const midY = Math.floor((top + bottom + 1) / 2), midX = Math.floor((left + right + 1) / 2);
    const rowSum = (y, x0, x1) => { let s = 0; for (let x = x0; x < x1; x++) s += cov[y * w + x]; return s; };
    const colSum = (x, y0, y1) => { let s = 0; for (let y = y0; y < y1; y++) s += cov[y * w + x]; return s; };
    const L = midX - rowSum(midY, 0, midX), R = midX + rowSum(midY, midX, w);
    const T = midY - colSum(midX, 0, midY), B = midY + colSum(midX, midY, h);
    const W = R - L, H = B - T;
    const rCross = (axis === "x" ? H : axis === "y" ? W : Math.min(W, H)) / 2;
    const cornerPts = (r) => {
        const band = r / Math.SQRT2;
        const corners = { tl: [L + r, T + r, -1, -1], tr: [R - r, T + r, 1, -1], bl: [L + r, B - r, -1, 1], br: [R - r, B - r, 1, 1] };
        const out = {};
        for (const [name, [cx, cy, sx, sy]] of Object.entries(corners)) {
            const pts = [];
            for (let y = 0; y < h; y++) { const yc = y + 0.5, dy = (yc - cy) * sy; if (dy < 0 || dy > band) continue; pts.push([sx < 0 ? midX - rowSum(y, 0, midX) : midX + rowSum(y, midX, w), yc]); }
            for (let x = 0; x < w; x++) { const xc = x + 0.5, dx = (xc - cx) * sx; if (dx < 0 || dx > band) continue; pts.push([xc, sy < 0 ? midY - colSum(x, 0, midY) : midY + colSum(x, midY, h)]); }
            out[name] = { pts, cx, cy };
        }
        return out;
    };
    const measure = (r) => {
        const cs = cornerPts(r); const out = {}; let worst = 0, worstCorner = "";
        for (const [name, { pts, cx, cy }] of Object.entries(cs)) {
            const errs = pts.map(([x, y]) => Math.hypot(x - cx, y - cy) - r);
            const maxAbs = Math.max(0, ...errs.map(Math.abs));
            const rMean = pts.length ? pts.reduce((s, [x, y]) => s + Math.hypot(x - cx, y - cy), 0) / pts.length : NaN;
            out[name] = { n: pts.length, maxErr: +(maxAbs / dsf).toFixed(3), rMean: +(rMean / dsf).toFixed(2) };
            if (maxAbs > worst) { worst = maxAbs; worstCorner = name; }
        }
        return { out, worst, worstCorner };
    };
    let r = rCross;
    if (fitR) {
        // the r (≤ cross/2) whose circles fit all four corners best: a scan in 0.25 device-px steps
        let best = null;
        for (let rr = Math.max(2, 0.1 * rCross); rr <= rCross + 1e-6; rr += 0.25) { const m = measure(rr); if (!best || m.worst < best.worst) best = { ...m, r: rr }; }
        r = best.r;
    }
    const m = measure(r);
    return { w: +(W / dsf).toFixed(2), h: +(H / dsf).toFixed(2), rExpected: +(r / dsf).toFixed(2), maxErr: +(m.worst / dsf).toFixed(3), worstCorner: m.worstCorner, corners: m.out, bbox: { l: L / dsf, t: T / dsf, r: R / dsf, b: B / dsf } };
}

/**
 * Faces from pixels (H-3). A "faces" probe shot paints the plate magenta and each
 * seat's glyph ink green at its own opacity. A pixel carries face ink outside the
 * plate when green dominates (g − max(r, b) ≥ 12, i.e. ≥ 5 % opacity over white);
 * over the plate a seat's green mixes with magenta and never dominates. Returns the
 * plate's bbox (magenta coverage ≥ 0.5) and the farthest face ink outside it, CSS px.
 */
export const FACE_DOM = 12;              // screenshot: green dominance ≥ 12/255 ≈ 5 % opacity over white
export const FACE_DOM_SCREENCAST = 40;   // screencast: VP8 chroma noise near glyph edges reaches 12-20/255 on white
export function facesRead(img, dsf, interiorG = 0, minDom = FACE_DOM) {
    const cov = magentaCoverage(img, interiorG);
    let l = img.w, t = img.h, r = -1, b = -1;
    for (let y = 0; y < img.h; y++) for (let x = 0; x < img.w; x++) if (cov[y * img.w + x] >= 0.5) { if (x < l) l = x; if (x > r) r = x; if (y < t) t = y; if (y > b) b = y; }
    if (r < 0) return { empty: true };
    let out = 0, ink = 0, n = 0;
    for (let y = 0; y < img.h; y++) for (let x = 0; x < img.w; x++) {
        const i = (y * img.w + x) * 4; const R = img.data[i], G = img.data[i + 1], B = img.data[i + 2];
        if (G - Math.max(R, B) < minDom) continue;
        ink++;
        const d = Math.max(l - x, x - r, t - y, y - b, 0);
        if (d > 0) { n++; if (d > out) out = d; }
    }
    return { plate: { l: l / dsf, t: t / dsf, r: (r + 1) / dsf, b: (b + 1) / dsf }, faceInk: ink, outsidePx: n, outside: +(out / dsf).toFixed(2) };
}

// ── the screencast sampler (H-1b) ─────────────────────────────────────────────
/**
 * Playwright WebKit's page.screenshot() completes a running registered-property
 * transition, paused or not, and the DOM then reads the completed value (PF-1,
 * re-measured in H2.md §1). WebKit morph frames are therefore read from the
 * context's screencast (recordVideo), decoded by ffmpeg into frames at 25 fps and
 * one video pixel per CSS pixel. `run(page, mark)` drives the page; mark(name)
 * stamps a wall-clock offset from the page's creation, which is the video's t=0.
 * Returns { frames: [{t, img}], marks }. System ffmpeg is required and a missing
 * binary fails loud.
 */
export async function screencast(browser, target, scene, { query = {}, ctx = {}, crop, dir }, run) {
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const vp = ctx.viewport ?? { width: 1440, height: 900 };
    const s = await openScene(browser, target, scene, { query, ctx: { ...ctx, recordVideo: { dir, size: vp } } });
    const marks = {};
    const mark = (name) => { marks[name] = Date.now() - s.opened; };
    try { await run(s.page, mark, s); } finally { await s.close(); }
    const video = fs.readdirSync(dir).find((f) => f.endsWith(".webm"));
    if (!video) throw new Error("screencast: no video was recorded");
    const c = crop(vp);
    const cx = Math.max(0, Math.floor(c.x)), cy = Math.max(0, Math.floor(c.y));
    const cw = Math.min(vp.width - cx, Math.ceil(c.width)), ch = Math.min(vp.height - cy, Math.ceil(c.height));
    try { execFileSync("ffmpeg", ["-v", "error", "-i", path.join(dir, video), "-vsync", "0", "-vf", `crop=${cw}:${ch}:${cx}:${cy}`, path.join(dir, "f%05d.png")]); }
    catch (e) { throw new Error("screencast: ffmpeg failed or is missing (" + String(e.message).slice(0, 120) + ")"); }
    const frames = fs.readdirSync(dir).filter((f) => /^f\d+\.png$/.test(f)).sort().map((f, i) => ({ t: i * 40, file: path.join(dir, f), origin: { x: cx, y: cy } }));
    return { frames, marks, video: path.join(dir, video) };
}
export function readFrame(f) { const img = decodePng(fs.readFileSync(f.file)); return { ...img, dsf: 1, clip: { x: f.origin.x, y: f.origin.y } }; }

// ── the frame logger (W2, W3, W4, W6, motion) ────────────────────────────────
/**
 * Starts an rAF loop that records, per frame: the rAF timestamp, the current mark,
 * the painted extent, the morph window, the posture, the seat scrollers, the seat
 * row (H-3b: every declared seat's transform-aware rect, clipped rect and opacity,
 * read by the harness, not the adapter), the unsharp census (O-66 §2), and the
 * ownership census (running animations per element·pseudo·property plus JS inline
 * writes sustained across frames, plus the extent-owner rule of K-13).
 */
export async function startLog(page, opts = {}) {
    opts = { stubLo: STUB_LO, stubHi: STUB_HI, cutPx: CUT_PX, hardPx: HARD_PX, showMin: STUB_SHOW, ...opts };
    await page.evaluate((opts) => {
        const P = window.__dockProbe, hp = window.__hp, root = P.root();
        const ids = new WeakMap(); let nid = 0; const idOf = (e) => { if (!ids.has(e)) ids.set(e, ++nid); return ids.get(e); };
        const kebab = (s) => s.startsWith("--") ? s : s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
        const kfCache = new WeakMap();
        // H4-1 · one glyph advance ("0") in the element's own computed font, CSS px (canvas measure: no page write)
        const advCache = new WeakMap(); const cv = document.createElement("canvas").getContext("2d");
        const glyphCache = new Map();   // H5-3 · per font and character: the ink bounds (canvas measure)
        const advOf = (el) => { if (advCache.has(el)) return advCache.get(el); const cs = getComputedStyle(el); cv.font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily; const a = +cv.measureText("0").width.toFixed(2); advCache.set(el, a); return a; };
        // H4-2 · the lanes: per element under the root, the animated values that paint (clip-path inset, translate +
        // transform translation, scale, opacity). Only non-identity lanes are stored; an absent lane is identity.
        const laneLabels = {}, laneEls = new Map();
        const laneOf = (el) => {
            const cs = getComputedStyle(el); const v = [];
            const cp = cs.clipPath || "none";
            // a clip lane is what the inset cuts from the box: a negative inset (an outset, e.g. inset(-8px -7px -8px
            // -100000px)) cuts only overflow paint, so it reads as 0 here. An outset that snaps to none is outside
            // this lane's reach (H4 entry 4: pass-3 G's dock-layers outset read as a 100000 px "residue")
            if (cp !== "none") { const ins = hp.insetOf(el, el.offsetWidth || 0, el.offsetHeight || 0); if (ins) { const c = ins.map((x) => +Math.max(0, x).toFixed(2)); if (c.some((x) => x > 0.01)) v.push(["clip", c]); } else v.push(["clipS", cp.slice(0, 80)]); }
            let tx = 0, ty = 0, sc = 1;
            if (cs.translate && cs.translate !== "none") { const p = cs.translate.split(" ").map((x) => parseFloat(x) || 0); tx += p[0] || 0; ty += p[1] || 0; }
            if (cs.transform && cs.transform !== "none") { const m = cs.transform.match(/matrix(3d)?\(([^)]*)\)/); if (m) { const n = m[2].split(",").map((x) => parseFloat(x)); if (m[1]) { tx += n[12]; ty += n[13]; sc *= Math.hypot(n[0], n[1]); } else { tx += n[4]; ty += n[5]; sc *= Math.hypot(n[0], n[1]); } } }
            if (cs.scale && cs.scale !== "none") sc *= parseFloat(cs.scale.split(" ")[0]) || 1;
            if (Math.abs(tx) > 0.01 || Math.abs(ty) > 0.01) v.push(["tr", [+tx.toFixed(2), +ty.toFixed(2)]]);
            if (Math.abs(sc - 1) > 1e-3) v.push(["sc", +sc.toFixed(4)]);
            const o = parseFloat(cs.opacity); if (o < 0.999) v.push(["op", +o.toFixed(3)]);
            return v;
        };
        const propsOf = (a) => {
            if (a.transitionProperty) return [a.transitionProperty];
            if (kfCache.has(a)) return kfCache.get(a);
            let ps = [];
            try { const k = a.effect.getKeyframes(); const s = new Set(); for (const f of k) for (const p of Object.keys(f)) if (!["offset", "easing", "composite", "computedOffset"].includes(p)) s.add(kebab(p)); ps = [...s]; } catch { }
            kfCache.set(a, ps); return ps;
        };
        const SIZE = /^(width|height|inline-size|block-size|min-width|max-width|min-height|max-height|min-inline-size|max-inline-size|flex-basis|flex-grow|grid-template-columns|grid-template-rows|padding-left|padding-right|padding-inline|margin-left|margin-right|margin-inline|letter-spacing|font-size)$/;
        const parseStyle = (txt) => { const m = {}; for (const decl of (txt || "").split(";")) { const i = decl.indexOf(":"); if (i > 0) m[decl.slice(0, i).trim()] = decl.slice(i + 1).trim(); } return m; };
        let writes = new Map();
        const mo = new MutationObserver((ms) => {
            for (const m of ms) {
                const a = parseStyle(m.oldValue), b = parseStyle(m.target.getAttribute("style"));
                for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) if (a[k] !== b[k]) {
                    const key = idOf(m.target) + "||" + k; writes.set(key, hp.label(m.target) + " " + k);
                }
            }
        });
        mo.observe(root, { subtree: true, attributes: true, attributeFilter: ["style"], attributeOldValue: true });
        const jsRun = new Map();
        const L = { frames: [], mark: "", stop: false, mo, dropped: 0 };
        window.__hpLog = L;
        // Read AFTER the frame: every rAF callback of this frame (the page's springs
        // included) has committed and the frame's style is resolved, so the values are
        // the ones painted at ts whatever order the callbacks ran in. A read that finds
        // the next frame already begun is dropped, never mis-timed.
        let frameNo = 0;
        const ch = new MessageChannel();
        ch.port1.onmessage = (ev) => { const [ts, n] = ev.data; if (n !== frameNo) { L.dropped++; return; } read(ts); };
        const tick = (ts) => {
            if (L.stop) { mo.disconnect(); return; }
            frameNo++;
            ch.port2.postMessage([ts, frameNo]);
            requestAnimationFrame(tick);
        };
        const read = (ts) => {
            const e = P.extent();
            const f = { t: ts, mk: L.mark, e: [e.l, e.t, e.r, e.b].map((v) => +v.toFixed(3)), m: !!P.morphing(), p: P.posture?.() ?? "" };
            if (opts.seats || opts.sharp || opts.ink) {
                const ss = P.seats({ all: true });
                // H5-7 appends q[11]: 1 while the seat is the engagement carrier (:hover / :active, or its own scale,
                // transform or translate transition running), whose own motion is D-2's, not the morph's
                if (opts.seats) f.s = ss.map((el) => { const q = el.getBoundingClientRect(); const c = hp.paintedRect(el); const eng = el.matches(":hover, :active") || el.getAnimations().some((a) => a.transitionProperty && /^(scale|transform|translate)$/.test(a.transitionProperty) && a.playState === "running"); return [idOf(el), +q.left.toFixed(2), +q.top.toFixed(2), +q.right.toFixed(2), +q.bottom.toFixed(2), +c.l.toFixed(2), +c.t.toFixed(2), +c.r.toFixed(2), +c.b.toFixed(2), +hp.visibleOpacity(el).toFixed(3), advOf(el), eng ? 1 : 0]; });
                if (opts.sharp) { let n = 0, who = ""; for (const el of ss) { if (hp.visibleOpacity(el) <= 0.05) continue; const u = hp.unsharp(el); if (u) { n++; who = who || u; } } f.us = n; if (who) f.usWho = who; }
                // H3-3 · ink leaves the adapter does not call seats (a carrier's clones, a face drawn
                // elsewhere): every element under the root that paints a glyph (a direct text node or an
                // <svg>) and lies inside no declared seat. [cl, ct, cr, cb (clipped), opacity, bbox area].
                // "Whoever paints it": a leaving seat's place is read from these as well as from the seat.
                if (opts.ink) {
                    const seatSet = new Set(ss);
                    const inSeat = (el) => { for (let x = el; x && x !== root; x = x.parentElement) if (seatSet.has(x)) return true; return false; };
                    const ks = [];
                    for (const el of root.querySelectorAll("*")) {
                        const tag = el.tagName.toLowerCase();
                        if (el instanceof SVGElement && tag !== "svg") continue;
                        if (tag !== "svg" && ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
                        if (inSeat(el)) continue;
                        const o = hp.visibleOpacity(el); if (o <= 0.05) continue;
                        const q = el.getBoundingClientRect(); if (q.width * q.height < 1) continue;
                        const c = hp.paintedRect(el);
                        // H4-1 appends the leaf's own box and its font's glyph advance: [.., bl, bt, br, bb, adv]
                        ks.push([+c.l.toFixed(2), +c.t.toFixed(2), +c.r.toFixed(2), +c.b.toFixed(2), +o.toFixed(3), +(q.width * q.height).toFixed(2), +q.left.toFixed(2), +q.top.toFixed(2), +q.right.toFixed(2), +q.bottom.toFixed(2), advOf(el)]);
                    }
                    f.k = ks;
                }
            }
            // H5-3 · the glyph stub. Every glyph under the root that paints above 0.5 opacity: its ink box on the main
            // axis (the character's range box, widened by its own font's ink bounds, canvas-measured: no page write; an
            // <svg> is one glyph, its box), against what its element paints (hp.paintedRect: its own and every ancestor
            // clip). A glyph cut by a clip edge that lies inside the plate (more than CUT_PX from the plate's own main
            // edges: the closing plate taking a seat is the leaving rule's) and painted between STUB_LO and STUB_HI of
            // its ink is a STUB. f.gn = glyphs judged; f.st = the first stubs [label, char, fraction, cut px, opacity]
            if (opts.glyphs) {
                const ax = P.axis(), e = P.extent(), pm0 = ax === "y" ? e.t : e.l, pm1 = ax === "y" ? e.b : e.r;
                const pr = new Map(), op = new Map(), sk = new Map(), mk = new Map(), st = []; let n = 0, unread = 0;
                const paints = (el) => { if (!op.has(el)) op.set(el, hp.visibleOpacity(el)); return op.get(el); };
                const clipOf = (el) => { if (!pr.has(el)) pr.set(el, hp.paintedRect(el)); return pr.get(el); };
                const kOf = (el) => { if (!sk.has(el)) { const q = el.getBoundingClientRect(); const L = ax === "y" ? el.offsetHeight : el.offsetWidth; sk.set(el, L ? (ax === "y" ? q.height : q.width) / L : 1); } return sk.get(el); };
                // H6-1 · the painted alpha across a glyph on the main axis, opacity aside: its element's clip (hard, from
                // hp.paintedRect) times every mask on it and its ancestors (hp.maskAlpha: linear-gradient mask layers, read
                // from the computed style). A mask the reader cannot parse is "unread" and the glyph is judged hard (E-2)
                const masksOf = (el) => { if (!mk.has(el)) { const ls = []; for (let a = el; a && a !== document.documentElement; a = a.parentElement) { const m = hp.maskOf(a, ax); if (m) ls.push(m); } mk.set(el, ls); } return mk.get(el); };
                const alphaAt = (el, x, c0, c1) => { if (x < c0 || x > c1) return 0; let a = 1; for (const m of masksOf(el)) { if (m.unread) return NaN; a *= m.at(x); } return a; };
                const judge = (el, g0, g1, ch) => {
                    if (g1 - g0 < 0.5) return; n++;
                    const c = clipOf(el), c0 = ax === "y" ? c.t : c.l, c1 = ax === "y" ? c.b : c.r;
                    const N = Math.max(8, Math.ceil((g1 - g0) / 0.25)), dx = (g1 - g0) / N;
                    const xs = [], as = []; let sum = 0, bad = false;
                    for (let i = 0; i <= N; i++) { const x = g0 + i * dx; const a = alphaAt(el, x, c0, c1); if (Number.isNaN(a)) { bad = true; break; } xs.push(x); as.push(a); if (i < N) sum += a; }
                    if (bad) { unread++; const frac = Math.max(0, Math.min(g1, c1) - Math.max(g0, c0)) / (g1 - g0); if (frac > opts.stubLo && frac < opts.stubHi) st.push([hp.label(el), ch, +frac.toFixed(2), null, +paints(el).toFixed(2), null, "unread mask"]); return; }
                    const share = sum / N;
                    if (share <= opts.stubLo || share >= opts.stubHi) return;
                    // the TRANSITIONS across the glyph: each run of samples strictly between 0.1 and 0.9 that joins a ≤ 0.1
                    // sample to a ≥ 0.9 one (either way). Its width is the distance between those two samples (a step reads
                    // one sample step, 0.25 px), its place the 0.5 crossing. A transition is HARD when its width ≤ HARD_PX
                    // and its place lies more than CUT_PX inside the plate's main edges (the plate's own edge taking a
                    // glyph is the leaving rule's). Every other transition's width is the ramp (RECORD)
                    let hard = null, ramp = Infinity;
                    for (let i = 0; i < as.length - 1; i++) {
                        const lo = as[i] <= 0.1, hi = as[i] >= 0.9; if (!lo && !hi) continue;
                        let j = i + 1; while (j < as.length && as[j] > 0.1 && as[j] < 0.9) j++;
                        if (j >= as.length || (lo ? as[j] <= 0.1 : as[j] >= 0.9)) continue;
                        let k = i; while (k < j && (as[k] < 0.5) === (as[i] < 0.5)) k++;
                        const x0 = xs[Math.max(i, k - 1)], x1 = xs[k], a0 = as[Math.max(i, k - 1)], a1 = as[k];
                        const at = Math.abs(a1 - a0) < 1e-9 ? x1 : x0 + (x1 - x0) * (0.5 - a0) / (a1 - a0);
                        const width = xs[j] - xs[i];
                        if (width <= opts.hardPx && at > pm0 + opts.cutPx && at < pm1 - opts.cutPx) { if (!hard) hard = [at, width]; }
                        else if (width > opts.hardPx) ramp = Math.min(ramp, width);
                        i = j - 1;
                    }
                    if (Number.isFinite(ramp)) f.rw = Math.min(f.rw ?? Infinity, +ramp.toFixed(2));
                    if (!hard) return;
                    st.push([hp.label(el), ch, +share.toFixed(2), +hard[0].toFixed(1), +paints(el).toFixed(2), +hard[1].toFixed(2)]);
                };
                const rng = document.createRange();
                const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
                for (let t = tw.nextNode(); t; t = tw.nextNode()) {
                    const el = t.parentElement; const s = t.textContent;
                    // H6-1 · every glyph the frame shows (above 5 % opacity), at any opacity: H5-3 judged only above 0.5
                    if (!el || !s.trim() || el.closest("svg") || paints(el) <= opts.showMin) continue;
                    const cs = getComputedStyle(el); const font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily; const k = kOf(el);
                    for (let i = 0; i < s.length; i++) {
                        const code = s.charCodeAt(i); const w2 = code >= 0xd800 && code <= 0xdbff ? 2 : 1; const ch = s.slice(i, i + w2);
                        if (!/\S/.test(ch)) { i += w2 - 1; continue; }
                        rng.setStart(t, i); rng.setEnd(t, i + w2); i += w2 - 1;
                        const rr = rng.getBoundingClientRect(); if (rr.width * rr.height <= 0) continue;
                        const key = font + "|" + ch; let m = glyphCache.get(key);
                        if (!m) { cv.font = font; const x = cv.measureText(ch); m = { l: x.actualBoundingBoxLeft || 0, r: x.actualBoundingBoxRight || x.width, a: x.actualBoundingBoxAscent || 0, d: x.actualBoundingBoxDescent || 0, fa: x.fontBoundingBoxAscent || 0 }; glyphCache.set(key, m); }
                        if (ax === "y") judge(el, rr.top + (m.fa - m.a) * k, rr.top + (m.fa + m.d) * k, ch);
                        else judge(el, rr.left - m.l * k, rr.left + m.r * k, ch);
                    }
                }
                for (const sv of root.querySelectorAll("svg")) { if (paints(sv) <= opts.showMin) continue; const q = sv.getBoundingClientRect(); judge(sv, ax === "y" ? q.top : q.left, ax === "y" ? q.bottom : q.right, "<svg>"); }
                f.gn = n; if (unread) f.gu = unread; if (st.length) { f.st = st.slice(0, 4); f.stn = st.length; }
            }
            // H3-2 · the main-axis length of named seats' cells (the largest ancestor that holds
            // exactly that one seat, inside the root): the seat's own width, whoever carries it
            if (opts.cellsOf) {
                const all = P.seats({ all: true }); const ax = P.axis();
                f.cw = opts.cellsOf.map((sel) => {
                    const el = root.querySelector(sel); if (!el) return null;
                    let c = el; while (c.parentElement && c.parentElement !== root && all.filter((x) => c.parentElement.contains(x)).length === 1) c = c.parentElement;
                    const q = c.getBoundingClientRect(); return +(ax === "y" ? q.height : q.width).toFixed(3);
                });
            }
            // H4-10 · the dock root's own layout box per frame (a layout pop is a one-frame step of it)
            if (opts.rootBox) { const q = root.getBoundingClientRect(); f.rb = [+q.left.toFixed(3), +q.top.toFixed(3), +q.right.toFixed(3), +q.bottom.toFixed(3)]; }
            // H3-7 · an in-flow neighbour beside the dock ([data-testid=neighbour]): its rect per frame
            if (opts.neighbour) { const nb = document.querySelector("[data-testid=neighbour]"); if (nb) { const q = nb.getBoundingClientRect(); f.nb = [+q.left.toFixed(3), +q.top.toFixed(3), +q.right.toFixed(3), +q.bottom.toFixed(3)]; } }
            if (opts.scrollers) f.sc = hp.seatScrollers(root, P.seats({ all: true }));
            // H4-2 · lanes. A seat's engagement is exempt: inside a seat that matches :hover or :active, the
            // scale and translation lanes are D-2's (W2, W4, W8 judge them); its clip and opacity are judged
            if (opts.lanes) {
                const seatEls = P.seats({ all: true });
                const engaged = (el) => seatEls.some((s) => s.contains(el) && s.matches(":hover, :active"));
                const ln = {};
                for (const el of [root, ...root.querySelectorAll("*")]) {
                    if (el instanceof SVGElement && el.tagName.toLowerCase() !== "svg") continue;
                    let v = laneOf(el); if (!v.length) continue;
                    if (engaged(el)) { v = v.filter((x) => x[0] !== "sc" && x[0] !== "tr"); if (!v.length) continue; }
                    // a seat's own engagement easing back (a running `scale` transition on it or inside it, after
                    // :hover / :active has ended) is the seat's lane, not the morph's: its scale is not recorded
                    else if (seatEls.some((s) => s.contains(el)) && el.getAnimations().some((a) => a.transitionProperty === "scale")) { v = v.filter((x) => x[0] !== "sc"); if (!v.length) continue; }
                    const id = idOf(el); if (!laneLabels[id]) laneLabels[id] = hp.label(el); ln[id] = v; laneEls.set(id, el);
                }
                // H4-2 · a geometric lane (clip, translate) CANCELLED to identity: present last frame with a residue
                // above 0.5 px, absent now, on an element still painting in the dock, in a step more than twice its
                // previous one (a spring's or a wipe's own tail eases in; a cancel jumps)
                const lc = [], P1 = L.ln1 || {}, P2 = L.ln2 || {};
                const dist = (a, b) => Math.max(...a.map((x, j) => Math.abs(x - b[j])));
                for (const id of Object.keys(P1)) for (const [k, v] of P1[id]) {
                    if (k !== "clip" && k !== "tr") continue;
                    const I = k === "clip" ? [0, 0, 0, 0] : [0, 0];
                    const cur = ln[id] && ln[id].find((x) => x[0] === k); if (cur && dist(cur[1], I) > 0.01) continue;   // still off identity (an inset(0) clip is identity)
                    const el = laneEls.get(+id); if (!el || !el.isConnected || !root.contains(el) || engaged(el) || hp.visibleOpacity(el) <= 0.05 || !el.getClientRects().length) continue;
                    const res = dist(v, I); if (res <= 0.5) continue;
                    const v2 = P2[id] && P2[id].find((x) => x[0] === k); const step = v2 ? dist(v, v2[1]) : 0;
                    if (res > 2 * step) lc.push([+id, k, +res.toFixed(2), +step.toFixed(2)]);
                }
                if (lc.length) f.lc = lc;
                L.ln2 = P1; L.ln1 = ln;
                f.ln = ln; L.laneLabels = laneLabels;
            }
            if (opts.owners) {
                const own = new Map(); let sizeAnim = "";
                for (const a of document.getAnimations()) {
                    if (a.playState !== "running") continue;
                    const tg = a.effect && a.effect.target; if (!tg || !(root === tg || root.contains(tg))) continue;
                    const kind = a.transitionProperty ? "transition" : a.animationName ? "animation:" + a.animationName : "waapi";
                    for (const p of propsOf(a)) {
                        const key = idOf(tg) + "|" + (a.effect.pseudoElement || "") + "|" + p; const l = own.get(key) || { who: hp.label(tg) + (a.effect.pseudoElement || "") + " " + p, by: [] }; l.by.push(kind); own.set(key, l);
                        if (tg !== root && SIZE.test(p) && !sizeAnim) sizeAnim = hp.label(tg) + " " + p + " (" + kind + ")";
                    }
                }
                const nowJs = new Set();
                for (const [key, who] of writes) { const n = (jsRun.get(key) || 0) + 1; jsRun.set(key, n); nowJs.add(key); if (n >= 2) { const [id, p] = key.split("||"); const k2 = id + "||" + p; const l = own.get(k2) || { who, by: [] }; l.by.push("js"); own.set(k2, l); } }
                for (const k of [...jsRun.keys()]) if (!nowJs.has(k)) jsRun.delete(k);
                writes = new Map();
                const dup = [...own.values()].filter((l) => l.by.length >= 2);
                if (dup.length) f.dup = dup.slice(0, 3).map((l) => l.who + " ← " + l.by.join("+"));
                // K-13: the dock's main-axis extent has one owner. A size animation inside
                // the dock that runs while the dock's own morph window is open is a second owner.
                if (sizeAnim && f.m) f.dup = [...(f.dup ?? []), "extent ← dock morph + " + sizeAnim];
            }
            L.frames.push(f);
        };
        requestAnimationFrame(tick);
    }, opts);
}
export async function mark(page, name) { await page.evaluate((n) => { window.__hpLog.mark = n; }, name); }
export async function stopLog(page) {
    const r = await page.evaluate(() => { window.__hpLog.stop = true; return { frames: window.__hpLog.frames, dropped: window.__hpLog.dropped, laneLabels: window.__hpLog.laneLabels ?? null }; });
    r.frames.dropped = r.dropped;
    if (r.laneLabels) r.frames.laneLabels = r.laneLabels;
    return r.frames;
}

/** Wait until the extent is still (±0.05 px) and no morph window is open for `quiet` ms. */
export async function waitRest(page, { quiet = 400, cap = 6000 } = {}) {
    return page.evaluate(async ({ quiet, cap }) => {
        const P = window.__dockProbe; const t0 = performance.now();
        let last = null, since = performance.now();
        for (;;) {
            await new Promise((r) => requestAnimationFrame(r));
            const e = P.extent(); const k = [e.l, e.t, e.r, e.b].map((v) => v.toFixed(2)).join(",") + (P.morphing() ? "m" : "");
            if (k !== last) { last = k; since = performance.now(); }
            if (performance.now() - since >= quiet && !P.morphing()) return { ok: true, ms: Math.round(performance.now() - t0) };
            if (performance.now() - t0 > cap) return { ok: false, ms: Math.round(performance.now() - t0) };
        }
    }, { quiet, cap });
}
/** Wait until posture() equals one of `want` (or cap). */
export async function waitPosture(page, want, cap = 8000) {
    return page.evaluate(async ({ want, cap }) => {
        const P = window.__dockProbe; const t0 = performance.now();
        for (;;) { await new Promise((r) => setTimeout(r, 30)); const p = P.posture(); if (want.includes(p)) return { ok: true, p, ms: Math.round(performance.now() - t0) }; if (performance.now() - t0 > cap) return { ok: false, p, ms: Math.round(performance.now() - t0) }; }
    }, { want, cap });
}
export async function extentNow(page) {
    return page.evaluate(() => { const e = window.__dockProbe.extent(); return { l: e.l, t: e.t, r: e.r, b: e.b, w: e.r - e.l, h: e.b - e.t, axis: window.__dockProbe.axis() }; });
}
export async function dockCenter(page) {
    return page.evaluate(() => { const e = window.__dockProbe.extent(); return { x: (e.l + e.r) / 2, y: (e.t + e.b) / 2 }; });
}
/** Scroll the scene's scroll source (window, an element, or a late element) to y. */
export async function scrollSource(page, y) {
    await page.evaluate((y) => { const s = window.__scene; if (s?.scrollTo) s.scrollTo(y); else window.scrollTo(0, y); }, y);
}

// ── spring math (the rung's own spec) ─────────────────────────────────────────
/**
 * Analytic step response of a (response, ζ) spring: ω0 = 2π / response. Returns the
 * peak normalised velocity (1/s), the first-peak overshoot fraction M
 * (0 when ζ ≥ 1), and the settle time into ±band.
 */
export function springSpec({ response, dampingFraction: z, settleBand = 0.02 }) {
    const w0 = (2 * Math.PI) / response;
    let vmax = 0, settle = 0, prev = 0;
    const dt = 1e-4;
    for (let t = dt; t < 5; t += dt) {
        const v = 1 + springErr(w0, z, -1, 0, t); vmax = Math.max(vmax, (v - prev) / dt); prev = v;
        if (Math.abs(v - 1) > settleBand) settle = t;
    }
    const M = z < 1 ? Math.exp((-z * Math.PI) / Math.sqrt(1 - z * z)) : 0;
    return { w0, zeta: z, vmaxNorm: vmax, M, settleS: settle, settleBand };
}
/** The error e(t) = x(t) − target of a spring released at e0 with velocity v0 (units/s). */
export function springErr(w0, z, e0, v0, t) {
    if (t <= 0) return e0;
    if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return Math.exp(-z * w0 * t) * (e0 * Math.cos(wd * t) + ((v0 + z * w0 * e0) / wd) * Math.sin(wd * t)); }
    if (z === 1) return (e0 + (v0 + w0 * e0) * t) * Math.exp(-w0 * t);
    const s = Math.sqrt(z * z - 1), r1 = -w0 * (z - s), r2 = -w0 * (z + s);
    const A = (v0 - r2 * e0) / (r1 - r2); return A * Math.exp(r1 * t) + (e0 - A) * Math.exp(r2 * t);
}
/**
 * H-3c · the trajectory row. Fits the analytic spring released from (x0, v0) toward
 * `to` to frames [{t (ms), L}], sliding the release time t0 over [tLo, tHi] in
 * 0.5 ms steps (input-to-first-frame latency is not the carrier's fault), and
 * returns the smallest worst-frame deviation, in px and as a fraction of |to − x0|
 * (or of the excursion when a retarget carries velocity).
 */
export function trajectoryFit(frames, rung, { x0, v0 = 0, to, tLo, tHi }) {
    const w0 = (2 * Math.PI) / rung.response, z = rung.dampingFraction;
    const e0 = x0 - to;
    let best = { dev: Infinity };
    for (let t0 = tLo; t0 <= tHi; t0 += 0.5) {
        let dev = 0, at = 0;
        for (const f of frames) {
            const tau = (f.t - t0) / 1000;
            const model = to + (tau <= 0 ? e0 : springErr(w0, z, e0, v0, tau));
            const d = Math.abs(f.L - model); if (d > dev) { dev = d; at = f.t; }
        }
        if (dev < best.dev) best = { dev, at, t0 };
    }
    return best;
}
/** Velocity (px/s) of the fitted spring at time t (ms), by central difference. */
export function springVel(rung, { x0, v0 = 0, to, t0 }, t) {
    const w0 = (2 * Math.PI) / rung.response, z = rung.dampingFraction, h = 1e-4;
    const x = (tt) => to + springErr(w0, z, x0 - to, v0, (tt - t0) / 1000);
    return (x(t + h * 1000) - x(t - h * 1000)) / (2 * h);
}

// ── the seat row (H-3b) ───────────────────────────────────────────────────────
export const SEAT_OVERLAP_FRAC = 0.2;
/**
 * frames[i].s = [[id, l,t,r,b (transform-aware), cl,ct,cr,cb (clipped), opacity], …].
 * A seat "paints" when its opacity > 0.05 and its clipped rect is non-empty.
 *   step     for each seat painting in consecutive frames, the main-axis step of its centre
 *            ≤ 1.5 · v̂max · D_seat · dt + 0.5 px, D_seat = |its last centre − its first|.
 *   overlap  0 frames where two painting seats' clipped rects intersect by more than 20 % of
 *            the narrower seat on both axes (a collision, or a double exposure above 5 %).
 */
export function seatRow(frames, axis, spec, scale = 1) {
    const main = (q) => axis === "y" ? [q[2], q[4]] : [q[1], q[3]];
    const cmain = (q) => axis === "y" ? [q[6], q[8]] : [q[5], q[7]];
    const ccross = (q) => axis === "y" ? [q[5], q[7]] : [q[6], q[8]];
    const paints = (q) => q[9] > 0.05 && q[7] - q[5] > 0.5 && q[8] - q[6] > 0.5;
    const tracks = new Map();
    frames.forEach((f, i) => (f.s ?? []).forEach((q) => { if (!tracks.has(q[0])) tracks.set(q[0], []); tracks.get(q[0]).push({ i, t: f.t, c: (main(q)[0] + main(q)[1]) / 2, p: paints(q) }); }));
    let worst = { ratio: 0 };
    for (const [id, tr] of tracks) {
        if (tr.filter((x) => x.p).length < 2) continue;
        const D = scale * Math.max(...tr.map((x) => Math.abs(x.c - tr[0].c)));   // its whole travel, painting or clipped (scaled up for a reversal)
        for (let k = 1; k < tr.length; k++) {
            const a = tr[k - 1], b = tr[k];
            if (!a.p || !b.p || b.i !== a.i + 1) continue;
            const dt = b.t - a.t;
            const bound = 1.5 * spec.vmaxNorm * D * (dt / 1000) + 0.5;
            const step = Math.abs(b.c - a.c);
            if (step / bound > worst.ratio) worst = { ratio: +(step / bound).toFixed(2), step: +step.toFixed(2), bound: +bound.toFixed(2), seat: id, atMs: +(b.t - frames[0].t).toFixed(1) };
        }
    }
    let overlapFrames = 0, firstOverlap = null;
    for (const f of frames) {
        const ps = (f.s ?? []).filter(paints);
        let hit = null;
        for (let a = 0; a < ps.length && !hit; a++) for (let b = a + 1; b < ps.length && !hit; b++) {
            const [a0, a1] = cmain(ps[a]), [b0, b1] = cmain(ps[b]), [c0, c1] = ccross(ps[a]), [d0, d1] = ccross(ps[b]);
            const im = Math.min(a1, b1) - Math.max(a0, b0), ic = Math.min(c1, d1) - Math.max(c0, d0);
            if (im > SEAT_OVERLAP_FRAC * Math.min(a1 - a0, b1 - b0) && ic > SEAT_OVERLAP_FRAC * Math.min(c1 - c0, d1 - d0)) hit = { seats: [ps[a][0], ps[b][0]], mainPx: +im.toFixed(2), opacities: [ps[a][9], ps[b][9]] };
        }
        if (hit) { overlapFrames++; if (!firstOverlap) firstOverlap = { ...hit, atMs: +(f.t - frames[0].t).toFixed(1) }; }
    }
    return { step: { ok: worst.ratio <= 1, ...worst }, overlap: { ok: overlapFrames === 0, frames: overlapFrames, first: firstOverlap } };
}

// ── H3-1 · the paint floor ────────────────────────────────────────────────────
const area4 = (l, t, r, b) => Math.max(0, r - l) * Math.max(0, b - t);
const isect4 = (a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];
/**
 * A moving frame (the plate's main length or either main edge moves > 0.25 px) is BLANK when no
 * seat of the entering face paints (opacity > 0.05, clipped rect ≥ 0.5 px on both axes) with at
 * least 1 × 1 px of its clipped rect inside the plate. The entering face is the set of seats that
 * paint inside the plate on the strip's last frame. A run of more than BLANK_RUN_MAX blank frames
 * fails: H2 counted an invisible face as neither overhanging nor overlapping (B′ V-2, 26 blank
 * frames on a swap passed three W3 checks), so `faces`, `seatStep` and `seatOverlap` now stand on
 * this floor. A strip whose plate moves and whose last frame paints no seat fails too.
 */
export const BLANK_RUN_MAX = 1;
export function blankRow(frames, ax) {
    const paints = (q) => q[9] > 0.05 && q[7] - q[5] > 0.5 && q[8] - q[6] > 0.5;
    const inPlate = (q, e) => { const c = isect4([q[5], q[6], q[7], q[8]], e); return c[2] - c[0] >= 1 && c[3] - c[1] >= 1; };
    const last = frames.at(-1);
    const entering = new Set((last.s ?? []).filter((q) => paints(q) && inPlate(q, last.e)).map((q) => q[0]));
    const len = (f) => ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0];
    const edges = (f) => ax === "y" ? [f.e[1], f.e[3]] : [f.e[0], f.e[2]];
    let moving = 0, blank = 0, run = 0, longest = 0, at = null;
    for (let i = 1; i < frames.length; i++) {
        const f = frames[i], g = frames[i - 1];
        const mv = Math.abs(len(f) - len(g)) > 0.25 || edges(f).some((v, k) => Math.abs(v - edges(g)[k]) > 0.25);
        if (!mv) { run = 0; continue; }
        moving++;
        const vis = (f.s ?? []).some((q) => entering.has(q[0]) && paints(q) && inPlate(q, f.e));
        if (vis) { run = 0; continue; }
        blank++; run++;
        if (run > longest) { longest = run; at = +(f.t - frames[0].t).toFixed(1); }
    }
    const ok = entering.size ? longest <= BLANK_RUN_MAX : moving === 0;
    return { ok, entering: entering.size, movingFrames: moving, blankFrames: blank, longestRun: longest, atMs: at, why: entering.size ? `${blank} blank of ${moving} moving frame(s), longest run ${longest} (bound ${BLANK_RUN_MAX})` : "no seat paints inside the plate at the end" };
}

// ── H3-3 · leaving seats, a gap-free rule ─────────────────────────────────────
export const LEAVE_HI = 0.9, LEAVE_LO = 0.1, LEAVE_FRAC = 0.25, LEAVE_MIN_FRAMES = 3, LEAVE_TRACK_TOL = 0.1;
/**
 * A seat LEAVES when its visible ink is ≥ LEAVE_HI on the strip's first frame (the rest before the
 * trigger) and ≤ LEAVE_LO on its last. Its ink per frame, "whoever paints it":
 *   own    opacity × (its clipped rect ∩ the plate) / its transform-aware box
 *   place  the largest, over the non-seat ink leaves (frames[i].k) and the seats the first frame
 *          did not have (a carrier's clones, declared or not), of
 *          opacity × (it ∩ the seat's painted place at rest ∩ the plate) / its box
 *   ink    max(own, place)
 * It passes when EITHER
 *   (a) it travels with the glass: in every frame its ink ≥ its coverage − LEAVE_TRACK_TOL, where
 *       coverage = (its box ∩ the plate) / its box (its last known box once it is gone or boxless): the
 *       closing edge takes it, nothing takes it ahead of the edge; OR
 *   (b) it fades on the plate's time: from the last frame with ink ≥ LEAVE_HI to the first with
 *       ink ≤ LEAVE_LO spans ≥ LEAVE_MIN_FRAMES frames and ≥ LEAVE_FRAC × the plate morph's own
 *       length (motion start to landing; the pinned clock when the plate does not move).
 * No threshold gap: 0.968 → 0.937 → 0 is one frame from 0.937 to 0 (B′ V-3), and a clone that
 * fades while its original vanishes reads as the fade it paints (G's inverse `popdetail`).
 */
export function leavingRow(frames, lengthMs) {
    const maps = frames.map((f) => new Map((f.s ?? []).map((q) => [q[0], q])));
    const inkOwn = (q, e) => unitInk(q[9], [q[5], q[6], q[7], q[8]], [q[1], q[2], q[3], q[4]], e);   // H6-3
    // a stand-in at the seat's place: a non-seat ink leaf (f.k), or a seat the strip's first frame did
    // not have (a carrier's clone that the adapter's own selectors match, as D2-G's ghosts do)
    const born = new Set(maps[0].keys());
    // H6-3 · each stand-in's ink is bounded by its own box too: a leaf in the pre-H4-1 form (no box) keeps its clipped rect
    const inkPlace = (f, place) => Math.max(0,
        ...(f.k ?? []).map((k) => k[5] < 1 ? 0 : unitInk(k[4], isect4([k[0], k[1], k[2], k[3]], place), k.length >= 11 ? [k[6], k[7], k[8], k[9]] : null, f.e, k[5])),
        ...(f.s ?? []).filter((q) => !born.has(q[0])).map((q) => unitInk(q[9], isect4([q[5], q[6], q[7], q[8]], place), [q[1], q[2], q[3], q[4]], f.e)));
    const rows = []; let inkMax = 0;
    for (const [id, q0] of maps[0]) {
        if (inkOwn(q0, frames[0].e) < LEAVE_HI) continue;
        const place = [q0[5], q0[6], q0[7], q0[8]];
        let box = [q0[1], q0[2], q0[3], q0[4]];
        const ser = frames.map((f, i) => {
            const q = maps[i].get(id);
            if (q && area4(q[1], q[2], q[3], q[4]) >= 1) box = [q[1], q[2], q[3], q[4]];   // a seat taken out of the box tree (display: none) keeps its last box, as a removed one does
            const ink = Math.max(q ? inkOwn(q, f.e) : 0, inkPlace(f, place));
            const bb = area4(...box);
            inkMax = Math.max(inkMax, ink);
            return { t: f.t, ink, cov: bb < 1 ? 0 : area4(...isect4(box, f.e)) / bb };
        });
        if (ser.at(-1).ink > LEAVE_LO) continue;
        const deficit = Math.max(0, ...ser.map((x) => x.cov - x.ink));
        const i1 = ser.findIndex((x) => x.ink <= LEAVE_LO);
        let i0 = Math.max(0, i1 - 1); while (i0 > 0 && ser[i0].ink < LEAVE_HI) i0--;
        const spanMs = ser[i1].t - ser[i0].t, spanFrames = i1 - i0;
        const tracks = deficit <= LEAVE_TRACK_TOL, fades = spanFrames >= LEAVE_MIN_FRAMES && spanMs >= LEAVE_FRAC * lengthMs;
        // H5-4 · the vanish bound on every leaving seat, first and last steps included: its one-frame ink drop, less
        // what the closing plate edge took that frame (its coverage drop), is at most VANISH_MAX
        let vd = { drop: 0 };
        for (let i = 1; i < ser.length; i++) { const d = (ser[i - 1].ink - ser[i].ink) - Math.max(0, ser[i - 1].cov - ser[i].cov); if (d > vd.drop) vd = { drop: +d.toFixed(3), from: +ser[i - 1].ink.toFixed(3), to: +ser[i].ink.toFixed(3), atMs: +(ser[i].t - ser[0].t).toFixed(1) }; }
        rows.push({ seat: id, ok: tracks || fades, tracks, deficit: +deficit.toFixed(3), fades, spanMs: +spanMs.toFixed(1), spanFrames, path: ser.slice(i0, i1 + 1).map((x) => +x.ink.toFixed(3)), vanish: vd });
    }
    const bad = rows.filter((r) => !r.ok);
    const w = bad[0] ?? rows.reduce((m, r) => (!m || r.spanMs < m.spanMs ? r : m), null);
    const bound = +(LEAVE_FRAC * lengthMs).toFixed(1);
    const vw = rows.reduce((m, r) => (!m || r.vanish.drop > m.vanish.drop ? r : m), null);
    const vanish = { ok: !vw || vw.vanish.drop <= VANISH_MAX, drop: vw ? vw.vanish.drop : 0, seat: vw?.seat, from: vw?.vanish.from, to: vw?.vanish.to, atMs: vw?.vanish.atMs };
    return { ok: bad.length === 0, leaving: rows.length, failing: bad.length, lengthMs: +lengthMs.toFixed(1), rows, vanish, inkMax: +inkMax.toFixed(3), inkOk: inkMax <= 1 + 1e-6,
        why: (rows.length ? `${rows.length} leaving seat(s), ${bad.length} failing${w ? `; ${bad.length ? "worst" : "tightest"} seat ${w.seat}: ink ${w.path.join(" → ")} over ${w.spanMs} ms / ${w.spanFrames} frame(s) (fade bound ≥ ${LEAVE_MIN_FRAMES} frames and ≥ ${bound} ms), coverage deficit ${w.deficit} (track bound ${LEAVE_TRACK_TOL})` : ""}` : "no seat leaves")
            + (rows.length ? `; vanish worst one-frame drop beyond the closing edge ${vanish.drop}${vw && vanish.drop ? ` (seat ${vw.seat} ${vanish.from} → ${vanish.to} at +${vanish.atMs} ms)` : ""} (bound ${VANISH_MAX})` : "")
            + (rows.length ? `; largest unit ink read ${+inkMax.toFixed(3)} (an ink is a share of the unit's own box: ≤ 1, H6-3)` : "") };
}
/**
 * H6-3 (pass-6/H6.md) · a unit's ink is its painted share of its OWN box, at most 1:
 *   opacity × area(painted ∩ plate ∩ own box) / area(own box).
 * The painted rect comes from hp.paintedRect, which a negative (outset) clip-path inset widens past the box: a unit
 * whose clip spans the plate across read up to 1.56 (B′-proto §6.7), the instrument reading the clip's box in place of
 * the unit's (ruled REGISTRY §P5-2.1). `area` is the own box's area when the box is not at hand (a leaf in the pre-H4-1
 * form). DOCK_HARNESS_INK_UNBOUNDED=1 restores the pass-5 reading, for the plant only (selftest `platewide!unbounded`).
 */
const INK_UNBOUNDED = process.env.DOCK_HARNESS_INK_UNBOUNDED === "1";
export function unitInk(opacity, painted, box, plate, area = null) {
    const bb = box ? area4(...box) : area;
    if (!(bb >= 1)) return 0;
    const p = box && !INK_UNBOUNDED ? isect4(painted, box) : painted;
    return opacity * area4(...isect4(p, plate)) / bb;
}
/** H5-4 · the one-frame ink drop a leaving seat may take beyond its coverage drop (H4-5's retarget bound, now on every leaving cell). */
export const VANISH_MAX = 0.5;

// ── H4-1 · the splice ─────────────────────────────────────────────────────────
/**
 * A unit is a seat (frames[i].s) or a non-seat ink leaf (frames[i].k): its transform-aware box, its
 * clipped (painted) rect, its opacity and one glyph advance of its own font ("0", canvas-measured).
 * On the main axis a unit is CUT at an edge when its painted edge lies more than CUT_PX inside its
 * box. In every frame after the strip's first (the rest before the trigger):
 *   splice  two painting units overlap on the cross axis, face each other with a cut edge each, and
 *           the gap between those two edges is under one glyph advance (the larger of theirs) less
 *           CUT_PX: two faces meeting at a seam inside a glyph run read as a false glyph (B′-crit
 *           CX-1 "A' B ols Brushes", G-crit CX-1 "Ɛools"). A negative gap (the two overlap) counts.
 *   sliver  a painting unit whose box is at least one advance long paints less than one advance
 *           (less CUT_PX), cut at an edge that lies inside the plate (more than CUT_PX from the
 *           plate's own edge). The plate's closing edge taking a seat is the leaving rule's (H3-3),
 *           never a sliver; a face clip that leaves a 1 px strip of glyph is (B′-crit V-2).
 * The gate: 0 splice frames and 0 sliver frames.
 */
export const CUT_PX = 0.5;
export function spliceRow(frames, ax) {
    const units = (f) => {
        const u = [];
        for (const q of f.s ?? []) u.push({ id: "s" + q[0], b: [q[1], q[2], q[3], q[4]], c: [q[5], q[6], q[7], q[8]], o: q[9], adv: q[10] ?? 0 });
        for (const [i, k] of (f.k ?? []).entries()) if (k.length >= 11) u.push({ id: "k" + i, b: [k[6], k[7], k[8], k[9]], c: [k[0], k[1], k[2], k[3]], o: k[4], adv: k[10] });
        return u.filter((x) => x.o > 0.05 && x.c[2] - x.c[0] > 0.5 && x.c[3] - x.c[1] > 0.5);
    };
    const M0 = ax === "y" ? 1 : 0, M1 = ax === "y" ? 3 : 2, C0 = ax === "y" ? 0 : 1, C1 = ax === "y" ? 2 : 3;
    let spliceFrames = 0, sliverFrames = 0, firstSplice = null, firstSliver = null, worstGap = Infinity;
    for (let i = 1; i < frames.length; i++) {
        const f = frames[i], us = units(f);
        const startCut = (x) => x.c[M0] > x.b[M0] + CUT_PX, endCut = (x) => x.c[M1] < x.b[M1] - CUT_PX;
        let sp = null, sl = null;
        for (let a = 0; a < us.length && !sp; a++) for (let b = 0; b < us.length && !sp; b++) {
            if (a === b) continue;
            const u = us[a], v = us[b];
            if (u.c[M0] > v.c[M0]) continue;   // u is the one that starts first
            if (Math.min(u.c[C1], v.c[C1]) - Math.max(u.c[C0], v.c[C0]) <= 0.5) continue;
            if (!endCut(u) || !startCut(v)) continue;
            const gap = v.c[M0] - u.c[M1], adv = Math.max(u.adv, v.adv);
            if (gap < adv - CUT_PX) { sp = { units: [u.id, v.id], gapPx: +gap.toFixed(2), advPx: adv, atMs: +(f.t - frames[0].t).toFixed(1) }; worstGap = Math.min(worstGap, gap); }
        }
        const e = f.e, pm0 = ax === "y" ? e[1] : e[0], pm1 = ax === "y" ? e[3] : e[2];
        for (const x of us) {
            if (sl) break;
            const len = x.c[M1] - x.c[M0], box = x.b[M1] - x.b[M0];
            if (box < x.adv || len >= x.adv - CUT_PX) continue;
            const inner = (startCut(x) && x.c[M0] > pm0 + CUT_PX) || (endCut(x) && x.c[M1] < pm1 - CUT_PX);
            if (inner) sl = { unit: x.id, paintsPx: +len.toFixed(2), advPx: x.adv, boxPx: +box.toFixed(2), atMs: +(f.t - frames[0].t).toFixed(1) };
        }
        if (sp) { spliceFrames++; if (!firstSplice) firstSplice = sp; }
        if (sl) { sliverFrames++; if (!firstSliver) firstSliver = sl; }
    }
    const ok = spliceFrames === 0 && sliverFrames === 0;
    return { ok, spliceFrames, sliverFrames, firstSplice, firstSliver,
        why: `${spliceFrames} splice frame(s)${firstSplice ? ` (first at ${firstSplice.atMs} ms: units ${firstSplice.units.join("|")} meet at a ${firstSplice.gapPx} px gap, one advance ${firstSplice.advPx} px)` : ""}, ${sliverFrames} sliver frame(s)${firstSliver ? ` (first at ${firstSliver.atMs} ms: unit ${firstSliver.unit} paints ${firstSliver.paintsPx} px of a ${firstSliver.boxPx} px box, one advance ${firstSliver.advPx} px)` : ""} (bound 0 each)` };
}

// ── H5-3 · the glyph stub ─────────────────────────────────────────────────────
/**
 * frames[i].gn / .st from startLog `glyphs` (the in-page read is described there). H4-1 judges unit pairs and
 * whole-unit slivers, so a glyph cut through inside one unit wider than an advance passed it, and both pass-4
 * routes painted such stubs in 1-4 tiles of every face exchange ("B" read as "3", "A" as "\", B′-crit §4,
 * G-crit §4). The rule: in any moving frame (from the strip's second frame to one frame after its last change of
 * the extent or of a seat's painted rect), no glyph painting above 0.5 opacity is cut by a clip edge inside the
 * plate to between STUB_LO and STUB_HI of its ink. The gate is 0 stub frames.
 */
/**
 * H6-1 (pass-6/H6.md) · the stub judges the EDGE, not the opacity. H5-3 judged a cut glyph only above 0.5 opacity, so a
 * route that painted every cut glyph at exactly 0.5 passed by construction while its strips showed half-ink stubs
 * ("\", "[", "ools": B′-crit §4, G-crit §4). Now, per frame, every glyph the frame shows (above STUB_SHOW opacity) is read
 * across its ink box on the main axis as the painted alpha of its element's clip (hard) times every mask on it and its
 * ancestors (startLog `glyphs`, hp.maskOf), opacity aside. A STUB is a glyph whose painted share is strictly between
 * STUB_LO and STUB_HI and whose alpha goes from ≤ 0.1 to ≥ 0.9 (or back) inside HARD_PX, at a place more than CUT_PX
 * inside the plate's main edges: a hard edge through the glyph, at ANY opacity. A ramp at least one advance wide passes
 * (the fixture's mask ramp); the narrowest ramp a frame showed is RECORD (`ramp`). A mask the reader cannot parse is
 * named "unread mask" and fails (E-2: never a silent green). The gate is 0 stub frames.
 */
export const STUB_LO = 0.1, STUB_HI = 0.9, HARD_PX = 2, STUB_SHOW = 0.05;
export function stubRow(frames, ax) {
    if (!frames.some((f) => f.gn != null)) return null;
    const sig = (f) => [...f.e, ...(f.s ?? []).flatMap((q) => [q[5], q[6], q[7], q[8], q[9]])];
    let last = 0;
    for (let i = 1; i < frames.length; i++) { const a = sig(frames[i - 1]), b = sig(frames[i]); if (a.length !== b.length || a.some((v, k) => Math.abs(v - b[k]) > 0.25)) last = i; }
    const end = Math.min(frames.length - 1, last + 1);
    let judged = 0, stubFrames = 0, first = null, glyphs = 0, ramp = Infinity, unread = 0;
    for (let i = 1; i <= end; i++) {
        const f = frames[i]; if (f.gn == null) continue;
        judged++; glyphs = Math.max(glyphs, f.gn); if (f.rw != null) ramp = Math.min(ramp, f.rw); unread += f.gu ?? 0;
        if (f.st?.length) { stubFrames++; if (!first) { const [label, ch, frac, edge, op, widthPx, note] = f.st[0]; first = { atMs: +(f.t - frames[0].t).toFixed(1), label, ch, frac, edgePx: edge, opacity: op, edgeWidthPx: widthPx, note, inFrame: f.stn }; } }
    }
    void ax;
    return { ok: stubFrames === 0, judged, stubFrames, glyphs, first, rampPx: Number.isFinite(ramp) ? ramp : null, unreadGlyphs: unread,
        why: `${stubFrames} stub frame(s) of ${judged} judged (up to ${glyphs} glyphs a frame)${first ? `; first at ${first.atMs} ms: "${first.ch}" in ${first.label} painted ${Math.round(first.frac * 100)} % at opacity ${first.opacity}, ${first.note ? first.note : `a hard edge (10→90 % alpha in ${first.edgeWidthPx} px) at ${first.edgePx} px`} (${first.inFrame} stub(s) in that frame)` : ""}${Number.isFinite(ramp) ? `; narrowest ramp across a glyph ${ramp} px (RECORD)` : ""} (bound 0; a stub is a glyph painted ${STUB_LO * 100}-${STUB_HI * 100} %, at any opacity, by an edge whose alpha goes 10→90 % inside ${HARD_PX} px, inside the plate)` };
}

// ── H7-1 · a hole in the run, read from paint ─────────────────────────────────
/**
 * H7-1 (pass-7/H7.md) replaces H6-2's DOM credit. H6-2 read a slot's ink from the DOM and counted what OTHER seats paint at
 * the slot's place as the slot's own (a FLIP neighbour at its old place, a leaving face's seat under a mask the DOM cannot
 * see), so on B′ it read 0 hole frames where the cast shows seat 1's slot empty for 2-3 frames between "H" and "2" at full
 * ink (B′-crit §2). The hole is now read from the CAST (the screencast FM records), as the critic's holes.py read it:
 *
 *   SLOTS     the seats laid at rest in either face of the exchange: those painting ≥ HOLE_HI (DOM unitInk, a rest frame
 *             has no seam to hide) on the strip's first frame (the face that leaves) or its last (the face being assembled).
 *   PLACE     each frame, each slot's own laid box (the DOM rect of the seat, the slot's place in the face being laid,
 *             from the log frame nearest the cast frame's time), mapped into the cast: the cast's scale fitted once on the
 *             rest frame (glyph clusters against seat centres), its per-frame shift the median offset of the glyph
 *             clusters from the DOM-full seats' centres (a 40 ms frame and the rAF log need not share a phase). Nothing
 *             another seat's DOM rect says is read: only pixels inside the slot's own box.
 *   INK       per frame, the slot's ink mass: the sum over its box's columns of max(0, c − HOLE_NOISE), c the column's
 *             largest contrast |L − ground| on the seat row, ground the frame's own plate tone (the median of the row
 *             band across the plate), over the same mass at the slot's own rest frame. So a dark ground reads as a light
 *             one does: full ink is the slot's own rest contrast in its own frame's terms (the critic's fixed threshold
 *             missed dark first-expand frames).
 *   HOLE      a slot laid inside the plate reading below HOLE_LO while the nearest painting (≥ HOLE_LO) slot on each side
 *             reads HOLE_HI or more. A slot that reads below HOLE_LO at its own rest is no place of the run and is dropped.
 *   GATE      judged from the trigger's frame to one cast frame past the strip's last DOM change. A cast frame is 40 ms:
 *             one hole frame cannot show the hole outlived one display frame, two consecutive frames show it outlived
 *             40 ms. So no slot may be a hole in more than HOLE_RUN_MAX = 1 consecutive cast frame.
 * Returns null when the strip or the cast cannot be read (the caller fails the cell: never a silent green).
 */
export const HOLE_LO = 0.1, HOLE_HI = 0.9, HOLE_RUN_MAX = 1;
/** VP8 luma noise near glyph edges reaches 12-20/255 (FACE_DOM_SCREENCAST); a column below this contrast carries no ink */
export const HOLE_NOISE = 24;
/** a glyph cluster farther than this from a seat centre is not that seat's (seat pitch at rest is 37-52 px) */
export const HOLE_MATCH_PX = 18;
export function holePaint(strip, cast, { start, frameMs = 40, ax = "x" } = {}) {
    if (ax !== "x" || !strip?.length || !cast?.length) return null;
    const iGo = strip.findIndex((f) => f.mk === "go");
    if (iGo < 1 || !strip.some((f) => f.s)) return null;
    const first = strip[0], last = strip.at(-1);
    const inkDom = (q, e) => unitInk(q[9], [q[5], q[6], q[7], q[8]], [q[1], q[2], q[3], q[4]], e);
    const restIds = (f) => new Set((f.s ?? []).filter((q) => inkDom(q, f.e) >= HOLE_HI).map((q) => q[0]));
    const endIds = restIds(last), startIds = restIds(first);
    const ids = [...new Set([...startIds, ...endIds])];
    if (ids.length < 3) return { ok: true, slots: ids.length, holeFrames: 0, why: `${ids.length} slot(s) at rest: no slot has a side on each hand` };
    // the cast frame ↔ the log frame: frame `start` is the first painted after the trigger, the log's go frame
    const tGo = strip[iGo].t;
    const logAt = (k) => { if (k < start) return first; const T = tGo + (k - start) * frameMs; let b = strip[iGo]; for (const f of strip) if (Math.abs(f.t - T) < Math.abs(b.t - T)) b = f; return b; };
    const sig = (f) => [...f.e, ...(f.s ?? []).flatMap((q) => [q[1], q[3], q[5], q[6], q[7], q[8], q[9]])];
    let lastCh = iGo;
    for (let i = 1; i < strip.length; i++) { const a = sig(strip[i - 1]), b = sig(strip[i]); if (a.length !== b.length || a.some((v, k) => Math.abs(v - b[k]) > 0.25)) lastCh = i; }
    const kOf = (t) => start + Math.round((t - tGo) / frameMs);
    const kEnd = Math.min(cast.length - 1, kOf(strip[Math.min(strip.length - 1, lastCh)].t) + 1);
    const kRest = Math.min(cast.length - 1, Math.max(kEnd, kOf(last.t)));
    const kPre = Math.max(0, start - 1);
    if (kEnd <= start) return null;
    // per frame: the seat row's band and ground, and each column's largest contrast
    const lum = (img, x, y) => { const i = (y * img.w + x) * 4; return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3; };
    const profile = (img, f, a, b) => {
        const qs = (f.s ?? []).filter((q) => q[3] - q[1] >= 1 && q[4] - q[2] >= 1);
        if (!qs.length) return null;
        const Y0 = Math.max(0, Math.floor(a * Math.min(...qs.map((q) => q[2])) - img.clip.y)), Y1 = Math.min(img.h - 1, Math.ceil(a * Math.max(...qs.map((q) => q[4])) - img.clip.y));
        const X0 = Math.max(0, Math.floor(a * f.e[0] + b)), X1 = Math.min(img.w - 1, Math.ceil(a * f.e[2] + b));
        if (Y1 <= Y0 || X1 <= X0) return null;
        const ls = []; for (let y = Y0; y <= Y1; y += 2) for (let x = X0; x <= X1; x += 2) ls.push(lum(img, x, y));
        ls.sort((p, q) => p - q); const ground = ls[ls.length >> 1];
        const col = new Float64Array(img.w);
        for (let x = 0; x < img.w; x++) { let m = 0; for (let y = Y0; y <= Y1; y++) m = Math.max(m, Math.abs(lum(img, x, y) - ground)); col[x] = m; }
        return { col, ground };
    };
    // glyph clusters on a profile: runs of columns above the noise, joined across gaps ≤ 6 px (holes.py's rule)
    const clusters = (col) => { const out = []; let s = -1, p = -1; for (let x = 0; x <= col.length; x++) { const on = x < col.length && col[x] > 2 * HOLE_NOISE; if (on) { if (s < 0) s = x; else if (x - p > 6) { out.push((s + p) / 2); s = x; } p = x; } } if (s >= 0) out.push((s + p) / 2); return out; };
    const fullSeats = (f) => (f.s ?? []).filter((q) => inkDom(q, f.e) >= 0.99).map((q) => (q[1] + q[3]) / 2);
    const match = (ps, cs, a, b) => ps.map((p) => { const x = a * p + b; let best = null; for (const c of cs) if (Math.abs(c - x) <= HOLE_MATCH_PX && (best == null || Math.abs(c - x) < Math.abs(best - x))) best = c; return best == null ? null : [p, best]; }).filter(Boolean);
    // the cast's scale and offset, fitted on the rest frame: frame x = a · css x + b (Playwright WebKit's recorder may paint
    // the page at about 0.98, a per-session fact: H6 §3.3)
    let a = 1, b = -cast[kRest].clip.x;
    const restProf = profile(cast[kRest], last, a, b);
    if (!restProf) return null;
    for (let it = 0; it < 3; it++) {
        const m = match(fullSeats(last), clusters(restProf.col), a, b);
        if (m.length < 2) break;
        const n = m.length, mx = m.reduce((s, [p]) => s + p, 0) / n, my = m.reduce((s, [, c]) => s + c, 0) / n;
        const sxx = m.reduce((s, [p]) => s + (p - mx) ** 2, 0), sxy = m.reduce((s, [p, c]) => s + (p - mx) * (c - my), 0);
        if (n >= 3 && sxx > 100 ** 2) a = Math.min(1.04, Math.max(0.96, sxy / sxx));
        b = my - a * mx;
    }
    const mass = (prof, q, dx) => { const x0 = Math.max(0, Math.round(a * q[1] + b + dx)), x1 = Math.min(prof.col.length - 1, Math.round(a * q[3] + b + dx)); let s = 0; for (let x = x0; x <= x1; x++) s += Math.max(0, prof.col[x] - HOLE_NOISE); return s; };
    // the log frame a cast frame shows. The recorder's frames and the rAF log share no phase, and the video may lag the paint
    // by a frame or more, so ONE lag is fitted per cast: of the lags in ±LAG_MS (5 ms steps), the one under which the
    // DOM-full seats' centres meet the most glyph clusters over the judged frames (a fraction per frame, less a residual
    // term). Each frame's shift is then the median residual of its matched seats
    const LAG_MS = 2 * frameMs;
    const profs = new Map();
    const profAt = (k) => { if (!profs.has(k)) { const p = profile(cast[k], logAt(k), a, b); profs.set(k, p ? { ...p, cs: clusters(p.col) } : null); } return profs.get(k); };
    const nearest = (T) => { let best = strip[iGo]; for (const f of strip) if (f.t >= strip[iGo].t - frameMs && Math.abs(f.t - T) < Math.abs(best.t - T)) best = f; return best; };
    let lag = 0, lagScore = -Infinity;
    for (let L = -LAG_MS; L <= 2 * LAG_MS; L += 5) {
        let s = 0;
        for (let k = start; k <= kEnd; k++) {
            const p = profAt(k); if (!p) continue;
            const f = nearest(tGo + (k - start) * frameMs + L), ps = fullSeats(f); if (!ps.length) continue;
            const m = match(ps, p.cs, a, b);
            s += m.length / ps.length - 0.5 * m.reduce((t, [q, c]) => t + Math.abs(c - (a * q + b)), 0) / Math.max(1, m.length) / HOLE_MATCH_PX;
        }
        if (s > lagScore + 1e-9) { lagScore = s; lag = L; }
    }
    // a judged frame whose seats meet fewer than two clusters under the cast's lag (a fast frame the one lag misplaces by a
    // seat pitch) is matched on its own among the log frames within one cast frame of that time; a judged frame where no
    // DOM-full seat meets a glyph is UNREAD: it is not judged, and it ends any hole run (it never lengthens one). The rest
    // frames are always read (a face of one seat meets one cluster)
    const resid = (f, prof) => match(fullSeats(f), prof.cs, a, b).map(([p, c]) => c - (a * p + b)).sort((p, q) => p - q);
    let judging = false;
    const at = (k) => {
        const prof = profAt(k); if (!prof) return null;
        let f = k < start ? first : nearest(tGo + (k - start) * frameMs + lag), d = resid(f, prof);
        if (d.length < 2 && judging) {
            const T = tGo + (k - start) * frameMs + lag;
            for (const g of strip.slice(iGo)) { if (Math.abs(g.t - T) > frameMs) continue; const e = resid(g, prof); if (e.length > d.length || (e.length === d.length && e.length && Math.abs(e[e.length >> 1]) < Math.abs(d[d.length >> 1]))) { f = g; d = e; } }
        }
        if (!d.length && judging) return { unread: true };
        return { f, prof, n: d.length, dx: d.length ? d[d.length >> 1] : 0 };
    };
    // each slot's rest mass: the face being assembled at its rest frame, the face that leaves at the frame before the trigger
    const R = at(kRest), P = at(kPre);
    if (!R || !P || R.unread || P.unread) return null;
    const restMass = new Map(), dropped = [];
    for (const id of ids) {
        const [fr, rf] = endIds.has(id) ? [R, last] : [P, first];
        const q = (rf.s ?? []).find((x) => x[0] === id);
        const m = q ? mass(fr.prof, q, fr.dx) : 0;
        if (m < 4 * HOLE_NOISE) { dropped.push({ slot: id, why: "no ink at its own rest" }); continue; }
        restMass.set(id, m);
    }
    // a slot laid inside the plate at the end that reads empty there is no place of the run
    for (const q of last.s ?? []) if (restMass.has(q[0]) && !endIds.has(q[0])) {
        const c = (q[1] + q[3]) / 2;
        if (c > last.e[0] && c < last.e[2] && mass(R.prof, q, R.dx) / restMass.get(q[0]) < HOLE_LO) { restMass.delete(q[0]); dropped.push({ slot: q[0], why: "laid inside the plate and empty at rest" }); }
    }
    const run = new Map([...restMass.keys()].map((id) => [id, 0]));
    let worst = null, holeFrames = 0, judged = 0, unread = 0; const dxs = [], frames = [];
    judging = true;
    for (let k = start; k <= kEnd; k++) {
        const r = at(k); if (!r) continue;
        if (r.unread) { unread++; for (const id of run.keys()) run.set(id, 0); frames.push([+((k - start) * frameMs).toFixed(0), "unread"]); continue; }
        judged++; dxs.push(r.dx);
        // H8-1 · the frame's tile difference against the cast frame before it (tileDiff), so a hole run's record tells a held
        // painted frame from two distinct empty frames
        const laid = (r.f.s ?? []).filter((q) => restMass.has(q[0]) && q[3] - q[1] >= 1).filter((q) => { const c = (q[1] + q[3]) / 2; return c > r.f.e[0] && c < r.f.e[2]; })
            .sort((p, q) => (p[1] + p[3]) - (q[1] + q[3]));
        const inks = laid.map((q) => mass(r.prof, q, r.dx) / restMass.get(q[0]));
        frames.push([+((k - start) * frameMs).toFixed(0), r2(r.dx), r2(r.prof.ground), laid.map((q, j) => [q[0], +inks[j].toFixed(3)]), k > 0 ? tileDiff(cast[k - 1], cast[k]) : null]);
        const holeNow = new Set();
        laid.forEach((q, j) => {
            if (inks[j] >= HOLE_LO) return;
            let L = -1, Rr = -1;
            for (let i = j - 1; i >= 0; i--) if (inks[i] >= HOLE_LO) { L = i; break; }
            for (let i = j + 1; i < laid.length; i++) if (inks[i] >= HOLE_LO) { Rr = i; break; }
            if (L < 0 || Rr < 0 || inks[L] < HOLE_HI || inks[Rr] < HOLE_HI) return;
            holeNow.add(q[0]);
            const n = run.get(q[0]) + 1; run.set(q[0], n);
            if (!worst || n > worst.frames) worst = { slot: q[0], frames: n, atMs: (k - start) * frameMs, ink: +inks[j].toFixed(3), sides: [+inks[L].toFixed(2), +inks[Rr].toFixed(2)] };
        });
        for (const id of run.keys()) if (!holeNow.has(id)) run.set(id, 0);
        if (holeNow.size) holeFrames++;
    }
    const ok = !worst || worst.frames <= HOLE_RUN_MAX;
    const dxAbs = dxs.length ? Math.max(...dxs.map(Math.abs)) : 0;
    return { ok, slots: restMass.size, dropped, judged, unread, holeFrames, worst, scale: +a.toFixed(4), lagMs: lag, worstShiftPx: r2(dxAbs), frames,
        restDiff: kRest > 0 ? tileDiff(cast[kRest - 1], cast[kRest]) : null,
        why: `${restMass.size} slot(s) read from paint over ${judged} cast frame(s)${unread ? ` (${unread} unread: no seat met its glyph)` : ""} (scale ${a.toFixed(3)}, video lag ${lag} ms, shift ≤ ${r2(dxAbs)} px); ${holeFrames} frame(s) with a hole${worst ? `, longest ${worst.frames} consecutive frame(s): seat ${worst.slot} at ink ${worst.ink} at +${worst.atMs} ms while the nearest painting slots read ${worst.sides.join(" / ")}` : ""}${dropped.length ? `; ${dropped.length} slot(s) dropped (${dropped.map((d) => d.why).join("; ")})` : ""} (bound ${HOLE_RUN_MAX} cast frame of ${frameMs} ms; a hole is a slot below ${HOLE_LO} of its own rest ink whose nearest painting slots read ${HOLE_HI} or more)` };
}

/**
 * H8-1 (pass-8/H8.md) · the tile difference: the mean absolute grey difference of two cast frames, rows inset TILE_INSET px
 * top and bottom, grey the ITU-R 601 luma as PIL's "L" rounds it. It is the pass-7 critic's tilediff.py measure
 * (pass-7/D2-Bp-crit-records/scripts/tilediff.py) on the same frames the strip tiles are cut from. A held painted frame reads
 * at the level of two rest frames (0.00-0.09 there); two distinct painted frames read far above it (8.01 on Playwright
 * WebKit dark first-expand). HELD_GREY divides them in the record; both fail `hole` alike.
 */
export const TILE_INSET = 4, HELD_GREY = 1;
/** PIL's "L" conversion, integer as PIL rounds it: (299 R + 587 G + 114 B + 500) / 1000 */
const grey = (d, i) => Math.floor((299 * d[i] + 587 * d[i + 1] + 114 * d[i + 2] + 500) / 1000);
export function tileDiff(a, b) {
    if (!a || !b || a.w !== b.w || a.h !== b.h || a.h <= 2 * TILE_INSET) return null;
    let s = 0, n = 0;
    for (let y = TILE_INSET; y < a.h - TILE_INSET; y++) for (let x = 0; x < a.w; x++) {
        const i = (y * a.w + x) * 4;
        s += Math.abs(grey(a.data, i) - grey(b.data, i)); n++;
    }
    return +(s / n).toFixed(2);
}
/**
 * H8-1 · every hole run of a read, from the frames H7-1 recorded (`hole.frames`: [ms, shift, ground, [[slot, ink]…], dPrev],
 * or [ms, "unread"]). The rule is holePaint's own, applied to its own record: a laid slot below HOLE_LO whose nearest
 * painting (≥ HOLE_LO) slot on each side reads HOLE_HI or more is a hole in that frame; an unread frame ends every run.
 * Returns the runs longer than HOLE_RUN_MAX: { slot, frames, fromMs, toMs, diffs } (diffs: the tile differences inside the
 * run, from the frame's dPrev where the record holds it). One derivation for records of every pass since H7.
 */
export function holeRuns(hole) {
    const fr = hole?.frames ?? []; const open = new Map(), out = [];
    const close = (id) => { const r = open.get(id); if (r && r.frames > HOLE_RUN_MAX) out.push(r); open.delete(id); };
    for (const f of fr) {
        if (f[1] === "unread") { for (const id of [...open.keys()]) close(id); continue; }
        const laid = f[3] ?? [], now = new Set();
        laid.forEach(([id, ink], j) => {
            if (ink >= HOLE_LO) return;
            let L = -1, R = -1;
            for (let i = j - 1; i >= 0; i--) if (laid[i][1] >= HOLE_LO) { L = i; break; }
            for (let i = j + 1; i < laid.length; i++) if (laid[i][1] >= HOLE_LO) { R = i; break; }
            if (L < 0 || R < 0 || laid[L][1] < HOLE_HI || laid[R][1] < HOLE_HI) return;
            now.add(id);
            const r = open.get(id);
            if (r) { r.frames++; r.toMs = f[0]; r.diffs.push(f[4] ?? null); } else open.set(id, { slot: id, frames: 1, fromMs: f[0], toMs: f[0], diffs: [] });
        });
        for (const id of [...open.keys()]) if (!now.has(id)) close(id);
    }
    for (const id of [...open.keys()]) close(id);
    return out;
}

// ── H4-2 · the window flag covers every lane ─────────────────────────────────
/**
 * frames[i].ln = { elementId: [[kind, value], …] } for every element under the root with a
 * non-identity clip-path, translate/transform translation, scale or opacity (lib.mjs startLog
 * `lanes`); an element absent from a frame is at identity. The flag (`data-morphing`, the adapter's
 * morphing()) closes at the first frame after it was open that reads closed. From that frame on,
 * every lane must already be at its final value (the strip's last frame): within LANE_PX for a clip
 * inset or a translation, LANE_SCALE for a scale, LANE_OPACITY for opacity, and an unparsed clip
 * string equal. A lane still easing after the flag closed (G-crit CX-2: a seam cut 24.2 px from
 * identity that snaps 9-17 ms after the flag clears) fails; so does one cancelled to identity in a
 * single frame from a residue above LANE_PX after the flag. A strip whose flag never opened is not
 * judged here (W3 `window` judges it).
 */
/** H3-11, extended by H5-5/H5-7: a morph cell is OWNER-BLOCKED (Q-4) when its only failure is `window` and Q-4's
 *  lenient window holds; or when it fails `window` and `lanes`, the lanes' only failure is a seat still moving after
 *  the flag (no lane residue, no cancel: H5-7's seat read) and the last frame a seat is off its final centre falls
 *  inside the lenient allowance counted from the flag's opening (the window's own time base). A flag that closes at the 2 %
 *  band closes while the spring's tail still moves the seats; that is the same question Q-4 asks. */
export function q4Blocked(failed, a) {
    if (a.window?.q4 !== true || !failed.includes("window")) return undefined;
    const rest = failed.filter((k) => k !== "window");
    if (!rest.length) return "Q-4";
    const l = a.lanes;
    if (rest.length === 1 && rest[0] === "lanes" && l && !l.worst && !l.cancels?.length && l.seatAfterFlag && a.window.open != null && l.seatAfterFlag.lastMs - a.window.open <= (a.window.q4AllowMs ?? 0)) return "Q-4";
    return undefined;
}
export const LANE_PX = 0.5, LANE_SCALE = 0.005, LANE_OPACITY = 0.02;
export function lanesRow(frames, labels = {}) {
    if (!frames.some((f) => f.ln)) return null;
    const iOpen = frames.findIndex((f) => f.m);
    const iClose = iOpen < 0 ? -1 : frames.findIndex((f, i) => i > iOpen && !f.m);
    if (iClose < 0) return { ok: true, judged: false, why: iOpen < 0 ? "the flag never opened (judged by window)" : "the flag never closed (judged by window)" };
    const ident = { clip: [0, 0, 0, 0], tr: [0, 0], sc: 1, op: 1, clipS: "none" };
    const val = (f, id, kind) => { const v = f.ln?.[id]?.find((x) => x[0] === kind); return v ? v[1] : ident[kind]; };
    const fin = frames.at(-1);
    // a lane cancelled to identity inside the window (or after it), with its residue
    const cancels = frames.slice(Math.max(0, iOpen)).flatMap((f) => (f.lc ?? []).map(([id, k, res, step]) => ({ lane: `${labels[id] ?? id} ${k}`, residue: res, step, atMs: +(f.t - frames[iOpen].t).toFixed(1) })));
    const ids = new Set(); for (const f of frames.slice(iClose)) for (const id of Object.keys(f.ln ?? {})) ids.add(id);
    for (const id of Object.keys(fin.ln ?? {})) ids.add(id);
    let worst = null;
    for (let i = iClose; i < frames.length; i++) {
        const f = frames[i];
        for (const id of ids) for (const kind of ["clip", "tr", "sc", "op", "clipS"]) {
            const a = val(f, id, kind), b = val(fin, id, kind);
            let res, bound;
            if (kind === "clipS") { res = a === b ? 0 : 1; bound = 0; }
            else if (Array.isArray(a)) { res = Math.max(...a.map((x, k) => Math.abs(x - b[k]))); bound = LANE_PX; }
            else { res = Math.abs(a - b); bound = kind === "sc" ? LANE_SCALE : LANE_OPACITY; }
            if (res > bound && (!worst || res / Math.max(bound, 1e-3) > worst.ratio)) worst = { ratio: res / Math.max(bound, 1e-3), lane: `${labels[id] ?? id} ${kind}`, residue: +res.toFixed(3), bound, atMs: +(f.t - frames[iClose].t).toFixed(1), value: a, final: b };
        }
    }
    const c0 = cancels.sort((a, b) => b.residue - a.residue)[0];
    // H5-7 · every seat POSITION too: from the frame the flag closes, a painting seat's transform-aware centre (main
    // and cross) stays within LANE_PX of its centre on the strip's last frame. The lanes above read clip, translate,
    // scale and opacity; a seat that settles by layout after the flag (G-crit §6.3: the unrotated control's
    // 0.51-0.58 px one-frame move after the window closed) moves no lane. A frame on which the seat is the
    // engagement carrier (q[11]) is D-2's and is skipped; a scale about the centre moves no centre
    let seatWorst = null, lastOff = 0;
    if (frames.some((f) => f.s)) {
        const cen = (q) => [(q[1] + q[3]) / 2, (q[2] + q[4]) / 2];
        const finS = new Map((fin.s ?? []).filter((q) => q[9] > 0.05).map((q) => [q[0], q]));
        for (let i = iClose; i < frames.length; i++) for (const q of frames[i].s ?? []) {
            const z = finS.get(q[0]); if (!z || q[9] <= 0.05 || q[11] || z[11]) continue;
            const [a, b] = cen(q), [c, d] = cen(z); const res = Math.max(Math.abs(a - c), Math.abs(b - d));
            if (res > LANE_PX) { lastOff = frames[i].t - frames[0].t; if (!seatWorst || res > seatWorst.residue) seatWorst = { seat: q[0], residue: +res.toFixed(3), atMs: +(frames[i].t - frames[iClose].t).toFixed(1) }; }
        }
        if (seatWorst) seatWorst.lastMs = +lastOff.toFixed(1);   // the last frame any seat is off its final centre, from the strip's first frame
    }
    return { ok: !worst && !cancels.length && !seatWorst, judged: true, flagClosedMs: +(frames[iClose].t - frames[0].t).toFixed(1), lanes: ids.size, worst, cancels: cancels.slice(0, 4), seatAfterFlag: seatWorst,
        why: (worst ? `${worst.lane} is ${JSON.stringify(worst.value)} ${worst.atMs} ms after the flag closed (final ${JSON.stringify(worst.final)}; residue ${worst.residue}, bound ${worst.bound})` : `every lane (${ids.size}) at its final value from the frame the flag closed`)
            + (cancels.length ? `; ${cancels.length} lane(s) cancelled to identity, the largest ${c0.lane} from ${c0.residue} px in one frame (previous step ${c0.step} px) at ${c0.atMs} ms` : "; no lane cancelled to identity")
            + (frames.some((f) => f.s) ? (seatWorst ? `; seat ${seatWorst.seat} is ${seatWorst.residue} px from its final centre ${seatWorst.atMs} ms after the flag closed (bound ${LANE_PX})` : "; every seat at its final position from the flag") : "") };
}

// ── reporting ────────────────────────────────────────────────────────────────
export function makeReport(witness, target) {
    const cells = [];
    const only = parseArgs().cells ? new RegExp(String(parseArgs().cells)) : null;   // --cells <regex>: run only the blocks that record a matching cell
    const rep = {
        cells,
        // H4-5 · the --cells filter: a block runs whole, but only the cells the filter names are recorded
        // (G-crit §7.6: an anchored filter ran the block and reported every cell in it). The engine tag
        // is stripped before the test, so '^reversal$' names `reversal+shim` too.
        add(cell) { if (only && !only.test(cell.cell) && !only.test(cell.cell.replace(/(\+shim|-unshimmed)$/, ""))) return; cell.load = loadAvg(); cells.push(cell); const tag = cell.record ? "RECORD" : cell.pass ? "PASS" : cell.unmeasured ? "UNMEASURED" : cell.ownerBlocked ? "OWNER-BLOCKED" : "FAIL"; console.log(`${tag}  ${witness}  ${ENGINE_LABEL[cell.engine] ?? cell.engine}  ${cell.cell}  ${cell.summary}  [load ${cell.load}]`); },
        /**
         * Run one scene's block; if it throws (a page crash, a missing hook), every
         * named cell it did not record FAILS with the error, so an unshimmed WebKit
         * crash is recorded per cell instead of aborting the witness.
         */
        async guard(engine, names, fn) {
            // H4 entry 5: the skip test strips the engine tag as add() does; an anchored re-run of a
            // `-unshimmed` cell skipped its block and recorded 0/0 (base-R5-head-unshimmed-rerun1.log)
            if (only && !names.some((n) => only.test(n) || only.test(n.replace(/(\+shim|-unshimmed)$/, "")))) return;
            // per engine: a name the other engine already recorded must not hide this engine's error (H4 entry 4:
            // every Playwright WebKit block error on an untagged build was dropped silently, the cell absent)
            const before = new Set(cells.filter((c) => c.engine === engine).map((c) => c.cell));
            // DOCK_HARNESS_BLOCK_TIMEOUT_MS: a block that has not returned by then is abandoned and its
            // unrecorded cells are UNMEASURED (the harness hung, the dock was not read). Headless
            // Chromium's rAF was seen to stop for 30 s and more at load averages near 400 (pass-3/H3.md §3.0)
            const cap = +(process.env.DOCK_HARNESS_BLOCK_TIMEOUT_MS ?? 0);
            let timer = null;
            try {
                const p = fn();
                if (cap > 0) { p.catch(() => { }); await Promise.race([p, new Promise((_, rej) => { timer = setTimeout(() => rej(new Error(`HARNESS-TIMEOUT: the block did not return in ${cap} ms`)), cap); })]); }
                else await p;
            }
            catch (e) {
                const msg = String(e?.message ?? e).split("\n")[0].slice(0, 200);
                const hung = msg.startsWith("HARNESS-TIMEOUT");
                for (const n of names) if (!before.has(n) && !cells.some((c) => c.cell === n && c.engine === engine)) rep.add(hung ? { engine, cell: n, pass: false, unmeasured: true, timedOut: true, summary: `UNMEASURED: ${msg}` } : { engine, cell: n, pass: false, crashed: true, summary: `not measured: ${msg}` });
            }
            finally { if (timer) clearTimeout(timer); }
        },
        finish(dir) {
            const failed = cells.filter(counts).filter((c) => !c.pass);
            fs.writeFileSync(path.join(dir, `${witness}.json`), JSON.stringify({ witness, target: target.label, when: new Date().toISOString(), load: loadAvg(), cells }, null, 1));
            const ob = cells.filter((c) => c.ownerBlocked && !c.pass).length;
            console.log(`${failed.length ? "FAIL" : "PASS"}  ${witness}  ${target.label}  ${cells.filter((c) => c.pass).length}/${cells.length} cells pass${cells.some((c) => c.unmeasured) ? `, ${cells.filter((c) => c.unmeasured).length} UNMEASURED` : ""}${ob ? `, ${ob} OWNER-BLOCKED` : ""}  (json: ${path.join(dir, witness + ".json")})`);
            process.exitCode = failed.length ? 1 : 0;
            // an abandoned (timed-out) block may still hold a browser: the record is written, so leave
            if (cells.some((c) => c.timedOut)) setTimeout(() => process.exit(process.exitCode), 2000);
            return failed.length === 0;
        },
    };
    return rep;
}
export const r2 = (v) => (Number.isFinite(v) ? +v.toFixed(2) : v);
/** A cell that counts as a verdict: not RECORD, not UNMEASURED, not OWNER-BLOCKED (H3-11: a cell
 *  whose only failure waits on an owner ruling is reported, never counted as a route defect). */
export const counts = (c) => !c.record && !c.unmeasured && !c.ownerBlocked;

// ── the morph analysis (W3, W6): one transition's frame strip against the pinned rung ──
export const K_JITTER = 1.5;
export const STEP_SLACK_PX = 0.5;
export const DEAD_PX = 0.05;
export const SUBPX_PX = 1.0;
export const TRAJ_TOL = 0.04;
/**
 * frames: [{t, e:[l,t,r,b], m, dup?, s?}] for one transition, the first frame being the
 * last one before its trigger. rung: the PINNED rung (H-3d); its clock is the analytic
 * settle time into its band, never a token the family declares.
 *   continuity  every frame's step of the length and of both main-axis edges ≤ 1.5·v̂max·D·dt + 0.5 px
 *   landing     overshoot ≤ 0.05 px (dead) or a designed bounce (M > band and o ≈ M·D)
 *   window      opens for D ≥ 0.5 px; lasts ≤ clock + 2F + the longest frame (from the retarget
 *               for a reversal); closes between 1 frame before and 2 frames after the landing
 *   owners      0 frames with two running owners of one element·pseudo·property, or of the extent
 *   trajectory  (H-3c) the length follows the rung's analytic spring from the observed release
 *               within TRAJ_TOL·D + 1 px; a reversal re-releases it from the fitted state
 *   terminal    (H-3c) the last step into the target ≤ 1.5 × the step before it (dt-scaled) + 0.5 px
 *   seats       (H-3b) the seat row, when the strip carries seats
 */
/** H3-11 · Q-4's most lenient reading, until the owner rules: (c) a dock-only clock of about 0.27 s,
 *  (a) the flag may close at the 2 % band with the sub-band tail painting after it, and a reversal's
 *  allowance measured from its release velocity. A window that fails the pinned clock but holds
 *  under this reading is OWNER-BLOCKED (Q-4), never a route defect; one that fails both is FAIL. */
export const Q4_DOCK_CLOCK_MS = 270;
/** H6-5 · a frame-time comparison's rounding allowance (rAF timestamps are quantized to 0.1-1 ms) */
export const W8_EPS_MS = 0.5;
export function analyseMorph(frames, rung, { ax = "x", reversal = null, seats = true, paintFloor = false, laneLabels = null } = {}) {
    const spec = springSpec(rung);
    const clockMs = spec.settleS * 1000;
    const len = (f) => ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0];
    const edges = (f) => ax === "y" ? [f.e[1], f.e[3]] : [f.e[0], f.e[2]];
    const L = frames.map(len);
    const start = L[0], tgt = L.at(-1);
    const Dnet = Math.abs(tgt - start);
    const D = Math.max(Dnet, ...L.map((v) => Math.abs(v - start)), reversal ? Math.abs(reversal.to1 - start) : 0);
    const dir = Math.sign(tgt - start) || 1;
    const dts = frames.slice(1).map((f, i) => f.t - frames[i].t).sort((a, b) => a - b);
    const F = Math.max(16.7, dts.length ? dts[Math.floor(dts.length / 2)] : 16.7);
    // continuity
    let worst = { ratio: 0 };
    for (let i = 1; i < frames.length; i++) {
        const dt = frames[i].t - frames[i - 1].t;
        const bound = K_JITTER * spec.vmaxNorm * D * (dt / 1000) + STEP_SLACK_PX;
        const steps = [Math.abs(L[i] - L[i - 1]), ...edges(frames[i]).map((v, k) => Math.abs(v - edges(frames[i - 1])[k]))];
        const step = Math.max(...steps);
        if (step / bound > worst.ratio) worst = { ratio: step / bound, step, bound, t: frames[i].t - frames[0].t, dt };
    }
    // landing
    const iStart = L.findIndex((v) => Math.abs(v - start) > 0.5);
    const iR = reversal ? frames.findIndex((f) => f.mk === reversal.mark) : -1;
    const landFrom = iR > 0 ? iR : Math.max(0, iStart);
    const dirL = iR > 0 ? (Math.sign(tgt - L[iR]) || 1) : dir;
    const o = iStart < 0 ? 0 : Math.max(0, ...L.slice(landFrom).map((v) => (v - tgt) * dirL));
    let rev = 0, lastSign = 0;
    for (let i = Math.max(1, landFrom); i < L.length; i++) { const d = L[i] - L[i - 1]; if (Math.abs(d) < 0.01) continue; const sg = Math.sign(d); if (lastSign && sg !== lastSign) rev++; lastSign = sg; }
    const designed = spec.M > spec.settleBand;
    const Dl = iR > 0 ? Math.abs(tgt - L[iR]) : Dnet;
    let landing;
    if (o <= DEAD_PX) landing = { ok: true, why: "dead" };
    else if (o < SUBPX_PX) landing = { ok: false, why: `sub-pixel ring ${r2(o)} px (O-64 R-3)` };
    else if (designed && Math.abs(o - spec.M * Dl) <= Math.max(1, 0.5 * spec.M * Dl)) landing = { ok: true, why: `designed bounce ${r2(o)} px ≈ M·D ${r2(spec.M * Dl)}` };
    else landing = { ok: false, why: `undesigned overshoot ${r2(o)} px (spring M·D = ${r2(spec.M * Dl)} px)` };
    // window (H-3d: the clock is the pinned rung's)
    const iLand = (() => { for (let i = L.length - 1; i >= 0; i--) if (Math.abs(L[i] - tgt) > 0.5) return i + 1; return 0; })();
    const iOpen = frames.findIndex((f) => f.m);
    const iClose = iOpen < 0 ? -1 : frames.findIndex((f, i) => i > iOpen && !f.m);
    const t = (i) => i < 0 || i >= frames.length ? null : frames[i].t - frames[0].t;
    const win = { open: t(iOpen), close: t(iClose), land: t(iLand), motionStart: t(iStart), clockMs: r2(clockMs), frameMs: r2(F) };
    let windowOk = true, windowWhy = "", q4 = null;
    if (D >= 0.5 && iOpen < 0) { windowOk = false; windowWhy = "no window opened for the change (O-64 R-2)"; }
    else if (iOpen >= 0) {
        const end = iClose < 0 ? frames.length - 1 : iClose;
        const from = iR > 0 ? Math.max(iOpen, iR) : iOpen;
        const dur = frames[end].t - frames[from].t;
        const stall = Math.max(0, ...frames.slice(from + 1, end + 1).map((f, k) => f.t - frames[from + k].t));
        const allow = clockMs + 2 * F + stall;
        win.duration = r2(frames[end].t - frames[iOpen].t); win.fromRetargetMs = iR > 0 ? r2(dur) : undefined; win.allowMs = r2(allow);
        if (iClose < 0) { windowOk = false; windowWhy = "window never closed"; }
        else if (dur > allow) { windowOk = false; windowWhy = `window ${r2(dur)} ms${iR > 0 ? " after the retarget" : ""} > clock ${r2(clockMs)} + 2×${r2(F)} + stall ${r2(stall)} = ${r2(allow)} ms (O-64 R-4, H-3d)`; }
        if (iClose >= 0) q4 = { dur, stall, from };
        // H6-5 · W-8 counted in TIME: the flag closes no later than 2 × the measured frame interval F after the extent
        // lands, and no earlier than one F before it. H5 counted rAF log entries, so a crowded log read 3 entries in
        // 21.4 ms (1.3 display frames) as 3 frames (pass-5/H5.md §2, the fixture's `lead-remove` borderline)
        if (windowOk && Dnet >= 0.5 && iClose >= 0) {
            const gapMs = frames[iClose].t - frames[iLand].t;
            win.closeMinusLandFrames = iClose - iLand; win.closeMinusLandMs = r2(gapMs);
            if (gapMs < -(F + W8_EPS_MS)) { windowOk = false; windowWhy = `window closed ${r2(-gapMs)} ms (${iLand - iClose} log entries) before the extent landed (bound one frame, ${r2(F)} ms; W-8)`; }
            else if (gapMs > 2 * F + W8_EPS_MS) { windowOk = false; windowWhy = `window closed ${r2(gapMs)} ms (${iClose - iLand} log entries) after the extent landed (bound 2 × ${r2(F)} = ${r2(2 * F)} ms; W-8)`; }
        }
    }
    // trajectory (H-3c)
    let traj = { ok: true, why: "no motion" };
    if (D >= 0.5 && iStart > 0) {
        const pts = frames.map((f, i) => ({ t: f.t, L: L[i] }));
        const tLo = frames[iStart - 1].t - F, tHi = frames[iStart].t;
        if (iR > 0) {
            const seg1 = pts.slice(iStart - 1, iR);
            const f1 = trajectoryFit(seg1, rung, { x0: start, to: reversal.to1, tLo, tHi });
            let best2 = { dev: Infinity };
            for (let tr = frames[Math.max(0, iR - 2)].t; tr <= frames[iR].t + F; tr += 1) {
                const w0 = (2 * Math.PI) / rung.response, z = rung.dampingFraction;
                const xr = reversal.to1 + springErr(w0, z, start - reversal.to1, 0, (tr - f1.t0) / 1000);
                const vr = springVel(rung, { x0: start, to: reversal.to1, t0: f1.t0 }, tr);
                const seg2 = pts.filter((p) => p.t >= tr);
                const f2 = trajectoryFit(seg2, rung, { x0: xr, v0: vr, to: tgt, tLo: tr, tHi: tr });
                if (f2.dev < best2.dev) best2 = { ...f2, xr, vr };
            }
            if (q4) { q4.xr = best2.xr; q4.vr = best2.vr; }
            const D1 = Math.abs(reversal.to1 - start) * Math.min(1, Math.abs(L[iR] - start) / Math.max(1e-6, Math.abs(reversal.to1 - start)));
            const D2 = Math.max(Math.abs(tgt - best2.xr), ...pts.slice(iR).map((p) => Math.abs(p.L - tgt)));
            const tol1 = TRAJ_TOL * Math.abs(reversal.to1 - start) + 1, tol2 = TRAJ_TOL * D2 + 1;
            traj = { ok: f1.dev <= tol1 && best2.dev <= tol2, dev1: r2(f1.dev), tol1: r2(tol1), dev2: r2(best2.dev), tol2: r2(tol2), vAtRetarget: r2(best2.vr / 1000), D1: r2(D1),
                why: `before the retarget ${r2(f1.dev)} px (tol ${r2(tol1)}); after it, released at ${r2(best2.xr)} px with ${r2(best2.vr / 1000)} px/ms: ${r2(best2.dev)} px (tol ${r2(tol2)})` };
        } else {
            const f = trajectoryFit(pts.slice(iStart - 1), rung, { x0: start, to: tgt, tLo, tHi });
            const tol = TRAJ_TOL * Dnet + 1;
            traj = { ok: f.dev <= tol, dev: r2(f.dev), tol: r2(tol), frac: r2(f.dev / Math.max(Dnet, 1e-6)), atMs: r2(f.at - frames[0].t), why: `worst ${r2(f.dev)} px (${r2(100 * f.dev / Math.max(Dnet, 1e-6))} % of D) from the rung's analytic spring (tol ${r2(tol)})` };
        }
    }
    // terminal step (H-3c)
    let terminal = { ok: true, why: "no motion" };
    if (D >= 0.5 && iStart > 0) {
        const st = [];
        for (let i = iStart; i < frames.length; i++) { const s = Math.abs(L[i] - L[i - 1]); if (s > 0.05) st.push({ i, s, dt: frames[i].t - frames[i - 1].t }); }
        if (st.length < 2) terminal = { ok: false, why: `the motion is ${st.length} step(s): ${r2(st[0]?.s ?? 0)} px` };
        else { const a = st.at(-2), b = st.at(-1); const bound = 1.5 * a.s * (b.dt / a.dt) + 0.5; terminal = { ok: b.s <= bound, last: r2(b.s), prev: r2(a.s), bound: r2(bound), why: `last step ${r2(b.s)} px after ${r2(a.s)} px (bound ${r2(bound)})` }; }
    }
    // H3-11 · the Q-4 lenient reading (only where the pinned-clock window failed), and H6-11's two branches beside it.
    //   lenient  max(pinned clock, Q4_DOCK_CLOCK_MS) + 2F + stall, a reversal's band time from its release velocity, the flag
    //            closing early only inside the 2 % band; the verdict (OWNER-BLOCKED when it holds) stands on this alone
    //   (a)      the flag closes at the 2 % band and the tail paints after it: the pinned clock + 2F + stall (a reversal's
    //            band time from its release velocity), early close only inside the band, late close ≤ 2F (time, H6-5)
    //   (c)      a dock-only clock of Q4_DOCK_CLOCK_MS: 270 ms + 2F + stall (from the retarget for a reversal), and W-8 as
    //            written (H6-5): the flag closes between one F before and 2F after the landing
    // Both are RECORD: printed beside the lenient one so a ruling turns the cells without a re-run; no verdict changes.
    if (!windowOk && q4 && iOpen >= 0) {
        const w0 = (2 * Math.PI) / rung.response, z = rung.dampingFraction;
        let bandT = 0;
        if (iR > 0 && Number.isFinite(q4.xr)) {
            const e0 = q4.xr - tgt, band = rung.settleBand * Math.max(Math.abs(e0), Math.abs(tgt - start));
            let T = 0; for (let tt = 0; tt < 3; tt += 5e-4) if (Math.abs(springErr(w0, z, e0, q4.vr, tt)) > band) T = tt;
            bandT = T * 1000;
        }
        const gapMs = iClose >= 0 && iLand >= 0 ? frames[iClose].t - frames[iLand].t : 0;
        const Dl2 = iR > 0 ? Math.abs(tgt - L[iR]) : Dnet;
        const inBand = Math.abs(L[iClose] - tgt) <= rung.settleBand * Dl2 + 0.5;
        const late = gapMs > 2 * F + W8_EPS_MS, early = gapMs < -(F + W8_EPS_MS);
        const reading = (allow, bandEarly) => {
            if (q4.dur > allow) return { ok: false, allowMs: r2(allow), why: `${r2(q4.dur)} ms > ${r2(allow)}` };
            if (Dnet >= 0.5 && late) return { ok: false, allowMs: r2(allow), why: `closed ${r2(gapMs)} ms after landing` };
            if (Dnet >= 0.5 && early && !(bandEarly && inBand)) return { ok: false, allowMs: r2(allow), why: `closed ${r2(-gapMs)} ms before landing${bandEarly ? ", outside the band" : ""}` };
            return { ok: true, allowMs: r2(allow), why: `${r2(q4.dur)} ms ≤ ${r2(allow)}` };
        };
        const L4 = reading(Math.max(Math.max(clockMs, Q4_DOCK_CLOCK_MS) + 2 * F + q4.stall, bandT + 2 * F + q4.stall), true);
        win.q4 = L4.ok; win.q4AllowMs = L4.allowMs;
        win.q4a = reading(Math.max(clockMs + 2 * F + q4.stall, bandT + 2 * F + q4.stall), true);
        win.q4c = reading(Q4_DOCK_CLOCK_MS + 2 * F + q4.stall, false);
    }
    // owners
    const dupFrames = frames.filter((f) => f.dup);
    const owners = { ok: dupFrames.length === 0, frames: dupFrames.length, first: dupFrames[0]?.dup };
    const out = {
        D: r2(Dnet), start: r2(start), target: r2(tgt), frames: frames.length, travelMs: win.land != null && win.motionStart != null ? r2(win.land - win.motionStart) : null,
        continuity: { ok: worst.ratio <= 1, ratio: r2(worst.ratio), step: r2(worst.step), bound: r2(worst.bound), atMs: r2(worst.t), dt: r2(worst.dt) },
        landing: { ...landing, overshoot: r2(o), reversals: rev }, window: { ok: windowOk, why: windowWhy, ...win }, owners, trajectory: traj, terminal,
        spec: { vmaxNorm: r2(spec.vmaxNorm), M: +spec.M.toExponential(3), band: spec.settleBand, clockMs: r2(clockMs) },
    };
    const exc = Math.max(1e-6, ...L.map((v) => Math.abs(v - start)));
    if (seats && frames.some((f) => f.s)) out.seats = seatRow(frames, ax, spec, reversal ? Math.max(1, D / exc) : 1);
    if (paintFloor && frames.some((f) => f.s)) {
        out.blank = blankRow(frames, ax);
        out.leaving = leavingRow(frames, out.travelMs != null && D >= 0.5 ? out.travelMs : clockMs);
        out.splice = spliceRow(frames, ax);   // H4-1
        const st = stubRow(frames, ax);       // H5-3, re-cut by H6-1
        if (st) out.stub = st;
    }
    const ln = lanesRow(frames, laneLabels ?? frames.laneLabels ?? {});   // H4-2
    if (ln?.judged) out.lanes = ln;
    return out;
}
export function morphChecks(a) {
    const c = { continuity: a.continuity.ok, landing: a.landing.ok, window: a.window.ok, owners: a.owners.ok, trajectory: a.trajectory.ok, terminal: a.terminal.ok };
    if (a.seats) { c.seatStep = a.seats.step.ok; c.seatOverlap = a.seats.overlap.ok; }
    if (a.blank) c.blank = a.blank.ok;
    if (a.leaving) c.leaving = a.leaving.ok;
    if (a.leaving?.vanish && a.leaving.leaving) c.vanish = a.leaving.vanish.ok;   // H5-4
    if (a.leaving?.leaving) c.ink = a.leaving.inkOk;                           // H6-3 (the instrument: an ink is ≤ 1)
    if (a.splice) c.splice = a.splice.ok;
    if (a.stub) c.stub = a.stub.ok;                                            // H5-3
    if (a.lanes) c.lanes = a.lanes.ok;
    if (a.faces) c.faces = a.faces.ok;
    return c;
}
export function morphSummary(a) {
    const s = [`D ${a.D} px (${a.start}→${a.target})`, `step ×${a.continuity.ratio}`, a.landing.why + (a.landing.reversals ? `, ${a.landing.reversals} reversal(s)` : ""),
        `window ${a.window.duration ?? "none"} ms (allow ${a.window.allowMs ?? "-"}, clock ${a.window.clockMs})${a.window.why ? " — " + a.window.why : ""}`,
        `trajectory ${a.trajectory.why}`, `terminal ${a.terminal.why}`, `owners ${a.owners.frames}${a.owners.first ? " (" + a.owners.first[0] + ")" : ""}`];
    if (a.seats) s.push(`seat step ×${a.seats.step.ratio ?? 0}${a.seats.step.step != null ? ` (${a.seats.step.step} px)` : ""}, seat overlap ${a.seats.overlap.frames} frame(s)`);
    if (a.blank) s.push(`blank ${a.blank.why}`);
    if (a.leaving) s.push(`leaving ${a.leaving.why}`);
    if (a.splice) s.push(`splice ${a.splice.why}`);
    if (a.stub) s.push(`stub ${a.stub.why}`);
    if (a.lanes) s.push(`lanes ${a.lanes.why}`);
    if (a.window.q4 != null) s.push(`Q-4 lenient window ${a.window.q4 ? "holds" : "fails"} (allow ${a.window.q4AllowMs} ms); Q-4 (a) flag at the 2 % band ${a.window.q4a.ok ? "holds" : "fails"} (${a.window.q4a.why}); Q-4 (c) 270 ms dock clock ${a.window.q4c.ok ? "holds" : "fails"} (${a.window.q4c.why})`);
    if (a.faces) s.push(`faces ${a.faces.why}`);
    return s.join("; ");
}
