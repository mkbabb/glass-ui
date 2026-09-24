// lib.mjs: the shared measurement floor for the D2 dock witnesses.
//
// A witness imports this file and nothing else from the harness except the
// adapter and fixture modules. Everything here is engine-agnostic: the same code
// drives headless Chromium and Playwright WebKit (which is not Safari).
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
/** The repository that holds this harness (docs/tranches/BL/design/dock/harness → repo). */
export const REPO = path.resolve(HERE, "../../../../../..");
const NODE_MODULES = process.env.DOCK_HARNESS_NODE_MODULES ?? path.join(REPO, "node_modules");
export const playwright = await import(pathToFileURL(path.join(NODE_MODULES, "playwright/index.mjs")).href);
const requireNM = createRequire(path.join(NODE_MODULES, "_.cjs"));
const { PNG } = requireNM("pngjs");

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
export const ENGINE_LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };
export function outDir(args, witness) {
    const root = args.out ?? process.env.DOCK_HARNESS_OUT ?? path.join(os.tmpdir(), "dock-harness");
    const d = path.join(root, "runs", `${witness}-${args.fixture ? "fixture-" + args.fixture : path.basename(args.build ?? "nobuild")}`);
    fs.mkdirSync(d, { recursive: true });
    return d;
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
 * Scene names: fit, sidebar, rail, long, morph, vmorph, swap, menu, compact, rim, vrim.
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
export async function launch(engine) {
    const b = await playwright[engine].launch({ headless: true });
    b.__engine = engine;
    return b;
}
/** The cell label suffix for an engine on a target ("+shim" when the WebKit crash shim is on). */
export function engineTag(target, engine) {
    return engine === "webkit" && target.adapter?.webkitShim && !target.noWebkitShim ? "+shim" : "";
}
/**
 * Open one scene in a fresh context. `ctx` takes Playwright context options
 * (viewport, hasTouch, isMobile, reducedMotion). Returns the page, ready: the
 * dock is mounted and the probe contract is installed.
 */
export async function openScene(browser, target, scene, { query = {}, ctx = {}, settle = 900 } = {}) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...ctx });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 300)));
    if (target.adapter?.config) await page.addInitScript(`window.__dockAdapterConfig = ${JSON.stringify(target.adapter.config)};`);
    if (scene === "sidebar" && target.adapter?.sidebarRootSel) await page.addInitScript(`window.__hpRootSel = ${JSON.stringify(target.adapter.sidebarRootSel)};`);
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
    return { page, context, errors, close: () => context.close() };
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
      const v = parts.map((s, i) => res(s, i % 2 === 0 ? h : w));
      const [t, r = t, b = t, l = r] = v;
      return [t, r, b, l];
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
    /** Effective opacity along the ancestor chain; 0 when not rendered or hidden. */
    visibleOpacity(el) {
      const cs0 = getComputedStyle(el);
      if (cs0.visibility !== "visible" || cs0.display === "none") return 0;
      let o = 1;
      for (let e = el; e && e !== document.documentElement; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === "none") return 0; o *= PX(cs.opacity); }
      return o;
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

// ── probe paint (the silhouette read) ─────────────────────────────────────────
// mode "plate": only the plate element paints, opaque magenta on white.
// mode "rim":   only the rim paints (its own colours), the plate keeps its clips but not its paint.
// mode "seat":  only one seat paints (its own colours) on white.
const PROBE_CSS = `
html[data-hp], html[data-hp] body { background: #fff !important; background-image: none !important; }
html[data-hp] body * { visibility: hidden !important; }
html[data-hp="plate"] [data-hp-plate] { visibility: visible !important; background: #f0f !important; background-image: none !important; border-color: #f0f !important; box-shadow: none !important; outline: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; filter: none !important; opacity: 1 !important; }
html[data-hp] [data-hp-plate]::before, html[data-hp] [data-hp-plate]::after { display: none !important; }
html[data-hp="rim"] [data-hp-plate] { visibility: visible !important; background: transparent !important; background-image: none !important; border-color: transparent !important; box-shadow: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
html[data-hp="rim"] [data-hp-plate] > :not([data-hp-rim]):not(:has([data-hp-rim])) { visibility: hidden !important; }
html[data-hp="rim"] [data-hp-rim], html[data-hp="rim"] [data-hp-rim] * { visibility: visible !important; }
html[data-hp="seat"] [data-hp-seat], html[data-hp="seat"] [data-hp-seat] * { visibility: visible !important; }
[data-hp-unclip] { overflow: visible !important; clip-path: none !important; contain: none !important; mask: none !important; -webkit-mask: none !important; }
`;
export async function probeMode(page, mode, { rim = "dock" } = {}) {
    await page.evaluate(({ css, mode, rim }) => {
        if (!document.getElementById("hp-probe-css")) {
            const s = document.createElement("style"); s.id = "hp-probe-css"; s.textContent = css; document.head.appendChild(s);
        }
        const P = window.__dockProbe;
        document.querySelectorAll("[data-hp-plate]").forEach((e) => e.removeAttribute("data-hp-plate"));
        document.querySelectorAll("[data-hp-rim]").forEach((e) => e.removeAttribute("data-hp-rim"));
        if (!mode) { document.documentElement.removeAttribute("data-hp"); return; }
        P.plate()?.setAttribute("data-hp-plate", "");
        const rims = rim === "composed" ? [P.composedRim?.()].filter(Boolean) : (P.rim?.() ?? []);
        for (const e of rims) e.setAttribute("data-hp-rim", "");
        document.documentElement.setAttribute("data-hp", mode);
    }, { css: PROBE_CSS, mode, rim });
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
/** Coverage of the probe magenta (1 = plate) per device pixel. */
export function magentaCoverage(img) {
    const cov = new Float32Array(img.w * img.h);
    for (let i = 0; i < cov.length; i++) {
        const r = img.data[i * 4], g = img.data[i * 4 + 1], b = img.data[i * 4 + 2];
        cov[i] = r > 150 && b > 150 ? 1 - g / 255 : 0;
    }
    return cov;
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
 * edges from its middle row and column, take r = min(w, h) / 2, and measure every
 * well-conditioned boundary point of the four corners against the circle of
 * radius r centred r in from both edges. Rows sample the steep half of each
 * quarter arc and columns the shallow half, so no sample sits on a tangent.
 * Returns errors in CSS px.
 */
export function cornerRead(cov, w, h, dsf, axis = null) {
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
    // r is half the CROSS-axis extent (the task's definition); with no axis given, the shorter side.
    const r = (axis === "x" ? H : axis === "y" ? W : Math.min(W, H)) / 2;
    const band = r / Math.SQRT2;
    const corners = { tl: [L + r, T + r, -1, -1], tr: [R - r, T + r, 1, -1], bl: [L + r, B - r, -1, 1], br: [R - r, B - r, 1, 1] };
    const out = {};
    let worst = 0, worstCorner = "";
    for (const [name, [cx, cy, sx, sy]] of Object.entries(corners)) {
        const pts = [];
        for (let y = 0; y < h; y++) {
            const yc = y + 0.5, dy = (yc - cy) * sy;
            if (dy < 0 || dy > band) continue;
            const xb = sx < 0 ? midX - rowSum(y, 0, midX) : midX + rowSum(y, midX, w);
            pts.push([xb, yc]);
        }
        for (let x = 0; x < w; x++) {
            const xc = x + 0.5, dx = (xc - cx) * sx;
            if (dx < 0 || dx > band) continue;
            const yb = sy < 0 ? midY - colSum(x, 0, midY) : midY + colSum(x, midY, h);
            pts.push([xc, yb]);
        }
        const errs = pts.map(([x, y]) => Math.hypot(x - cx, y - cy) - r);
        const maxAbs = Math.max(0, ...errs.map(Math.abs));
        const rMean = pts.length ? pts.reduce((s, [x, y]) => s + Math.hypot(x - cx, y - cy), 0) / pts.length : NaN;
        out[name] = { n: pts.length, maxErr: +(maxAbs / dsf).toFixed(3), rMean: +(rMean / dsf).toFixed(2) };
        if (maxAbs > worst) { worst = maxAbs; worstCorner = name; }
    }
    return { w: +(W / dsf).toFixed(2), h: +(H / dsf).toFixed(2), rExpected: +(r / dsf).toFixed(2), maxErr: +(worst / dsf).toFixed(3), worstCorner, corners: out };
}

// ── the frame logger (W2, W3, W4) ────────────────────────────────────────────
/**
 * Starts an rAF loop that records, per frame: the rAF timestamp, the current mark,
 * the painted extent, the morph window, the posture, the worst face overhang, the
 * seat scrollers, and the ownership census (running animations per
 * element·pseudo·property plus JS inline writes sustained across frames).
 */
export async function startLog(page, opts = {}) {
    await page.evaluate((opts) => {
        const P = window.__dockProbe, hp = window.__hp, root = P.root();
        const ids = new WeakMap(); let nid = 0; const idOf = (e) => { if (!ids.has(e)) ids.set(e, ++nid); return ids.get(e); };
        const kebab = (s) => s.startsWith("--") ? s : s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
        const kfCache = new WeakMap();
        const propsOf = (a) => {
            if (a.transitionProperty) return [a.transitionProperty];
            if (kfCache.has(a)) return kfCache.get(a);
            let ps = [];
            try { const k = a.effect.getKeyframes(); const s = new Set(); for (const f of k) for (const p of Object.keys(f)) if (!["offset", "easing", "composite", "computedOffset"].includes(p)) s.add(kebab(p)); ps = [...s]; } catch { }
            kfCache.set(a, ps); return ps;
        };
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
            if (opts.faces) {
                let oh = 0, who = "";
                for (const s of P.paintingSeats()) {
                    const q = s.rect; const o = Math.max(e.l - q.l, q.r - e.r, e.t - q.t, q.b - e.b);
                    if (o > oh) { oh = o; who = hp.label(s.el); }
                }
                f.oh = +oh.toFixed(3); if (oh > 0.5) f.ohWho = who;
            }
            if (opts.scrollers) f.sc = hp.seatScrollers(root, P.seats({ all: true }));
            if (opts.owners) {
                const own = new Map();
                for (const a of document.getAnimations()) {
                    if (a.playState !== "running") continue;
                    const tg = a.effect && a.effect.target; if (!tg || !(root === tg || root.contains(tg))) continue;
                    const kind = a.transitionProperty ? "transition" : a.animationName ? "animation:" + a.animationName : "waapi";
                    for (const p of propsOf(a)) { const key = idOf(tg) + "|" + (a.effect.pseudoElement || "") + "|" + p; const l = own.get(key) || { who: hp.label(tg) + (a.effect.pseudoElement || "") + " " + p, by: [] }; l.by.push(kind); own.set(key, l); }
                }
                const nowJs = new Set();
                for (const [key, who] of writes) { const n = (jsRun.get(key) || 0) + 1; jsRun.set(key, n); nowJs.add(key); if (n >= 2) { const [id, p] = key.split("||"); const k2 = id + "||" + p; const l = own.get(k2) || { who, by: [] }; l.by.push("js"); own.set(k2, l); } }
                for (const k of [...jsRun.keys()]) if (!nowJs.has(k)) jsRun.delete(k);
                writes = new Map();
                const dup = [...own.values()].filter((l) => l.by.length >= 2);
                if (dup.length) f.dup = dup.slice(0, 3).map((l) => l.who + " ← " + l.by.join("+"));
            }
            L.frames.push(f);
        };
        requestAnimationFrame(tick);
    }, opts);
}
export async function mark(page, name) { await page.evaluate((n) => { window.__hpLog.mark = n; }, name); }
export async function stopLog(page) {
    const r = await page.evaluate(() => { window.__hpLog.stop = true; return { frames: window.__hpLog.frames, dropped: window.__hpLog.dropped }; });
    r.frames.dropped = r.dropped;
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

// ── spring math (the rung's own spec) ─────────────────────────────────────────
/**
 * Analytic step response of a (response, ζ) spring: ω0 = 2π / response. Returns the
 * peak normalised velocity (1/s), the first-peak overshoot fraction M
 * (0 when ζ ≥ 1), and the settle time into ±band.
 */
export function springSpec({ response, dampingFraction: z, settleBand = 0.02 }) {
    const w0 = (2 * Math.PI) / response;
    const x = (t) => {
        if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)); }
        if (z === 1) return 1 - (1 + w0 * t) * Math.exp(-w0 * t);
        const s = Math.sqrt(z * z - 1), r1 = -w0 * (z - s), r2 = -w0 * (z + s);
        return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
    };
    let vmax = 0, settle = 0, prev = x(0);
    const dt = 1e-4;
    for (let t = dt; t < 5; t += dt) {
        const v = x(t); vmax = Math.max(vmax, (v - prev) / dt); prev = v;
        if (Math.abs(v - 1) > settleBand) settle = t;
    }
    const M = z < 1 ? Math.exp((-z * Math.PI) / Math.sqrt(1 - z * z)) : 0;
    return { w0, zeta: z, vmaxNorm: vmax, M, settleS: settle, settleBand };
}

// ── reporting ────────────────────────────────────────────────────────────────
export function makeReport(witness, target) {
    const cells = [];
    return {
        cells,
        add(cell) { cells.push(cell); const tag = cell.pass ? "PASS" : "FAIL"; console.log(`${tag}  ${witness}  ${ENGINE_LABEL[cell.engine] ?? cell.engine}  ${cell.cell}  ${cell.summary}`); },
        finish(dir) {
            const failed = cells.filter((c) => !c.pass);
            fs.writeFileSync(path.join(dir, `${witness}.json`), JSON.stringify({ witness, target: target.label, when: new Date().toISOString(), cells }, null, 1));
            console.log(`${failed.length ? "FAIL" : "PASS"}  ${witness}  ${target.label}  ${cells.length - failed.length}/${cells.length} cells pass  (json: ${path.join(dir, witness + ".json")})`);
            process.exitCode = failed.length ? 1 : 0;
            return failed.length === 0;
        },
    };
}
export const r2 = (v) => (Number.isFinite(v) ? +v.toFixed(2) : v);
