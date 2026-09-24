// lib.mjs: the measurement floor for the D4 tile witnesses.
//
// A witness imports this file and measure.mjs. Everything here drives headless
// Chromium and Playwright WebKit with the same code. Playwright WebKit is the
// engine build Playwright ships; it is not Safari, and every WebKit number the
// harness prints is labelled "Playwright WebKit".
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
/** The repository that holds this harness (docs/tranches/BL/design/tile/harness → repo). */
export const REPO = path.resolve(HERE, "../../../../../..");
const NM = process.env.TILE_HARNESS_NODE_MODULES ?? path.join(REPO, "node_modules");
const pw = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const requireNM = createRequire(path.join(NM, "_.cjs"));
const { PNG } = requireNM("pngjs");
export { PNG };

export const DSF = 2;
export const VIEWPORT = { width: 1000, height: 900 };
const SETTLE_MS = 700;
export const ENGINE_LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };
export const SAFARI_CELL = "real Safari: UNMEASURED (owner's safaridriver checkbox)";

// ── CLI ───────────────────────────────────────────────────────────────────────
export function parseArgs(argv = process.argv.slice(2)) {
    const a = { positional: [] };
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
export function outRoot(args) {
    return path.resolve(args.out ?? process.env.TILE_HARNESS_OUT ?? path.join(os.tmpdir(), "tile-harness"));
}

// ── static serving ────────────────────────────────────────────────────────────
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf" };
/** Serve a directory, or a function (URL → html string). */
export function serve(rootOrFn) {
    const server = http.createServer((req, res) => {
        const url = new URL(req.url, "http://x");
        if (typeof rootOrFn === "function") {
            res.writeHead(200, { "content-type": MIME[".html"], "cache-control": "no-store" });
            res.end(rootOrFn(url));
            return;
        }
        let p = path.join(rootOrFn, decodeURIComponent(url.pathname));
        if (!p.startsWith(rootOrFn)) { res.writeHead(403); res.end(); return; }
        if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(rootOrFn, "index.html");
        res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream", "cache-control": "no-store" });
        fs.createReadStream(p).pipe(res);
    });
    return new Promise((resolve) => server.listen(0, "127.0.0.1", () => {
        resolve({ url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) });
    }));
}

// ── targets: a build of the scene page, or the hand-made fixture ──────────────
/** `--build <dir>` (from build.mjs) or `--fixture [--family e] [--fault <name>]`. */
export async function openTarget(args) {
    if (args.fixture) {
        const { fixturePage } = await import("./fixtures.mjs");
        const fault = typeof args.fault === "string" ? args.fault : "";
        const family = typeof args.family === "string" ? args.family : "";
        const srv = await serve((url) => fixturePage(url.searchParams, fault, family));
        const label = `fixture${family ? "-" + family : ""}${fault ? "+" + fault : ""}`;
        return { kind: "fixture", label, fault, url: (q) => `${srv.url}/?${q}`, close: srv.close, meta: { label, dev: true } };
    }
    if (!args.build || !fs.existsSync(path.join(args.build, "build.json"))) {
        throw new Error("pass --build <dir> (the directory build.mjs printed) or --fixture");
    }
    const dir = path.resolve(args.build);
    const meta = JSON.parse(fs.readFileSync(path.join(dir, "build.json"), "utf8"));
    const srv = await serve(path.join(dir, "dist"));
    return { kind: "build", label: meta.label, url: (q) => `${srv.url}/index.html?${q}`, close: srv.close, meta };
}

// ── engines ───────────────────────────────────────────────────────────────────
const browsers = {};
export async function browser(engine) {
    if (!browsers[engine]) {
        browsers[engine] = engine === "webkit" ? await pw.webkit.launch() : await pw.chromium.launch({ channel: "chromium" });
    }
    return browsers[engine];
}
export async function closeBrowsers() {
    for (const k of Object.keys(browsers)) { await browsers[k].close().catch(() => {}); delete browsers[k]; }
}
export async function engineVersion(engine) {
    return `${ENGINE_LABEL[engine]} ${(await browser(engine)).version()}`;
}

/** The forced level-0 path: the one knob the library's PRT bracket sets (a11y-fallback.css). */
const LEVEL0 = ":root{--glass-level:0 !important;--glass-grain-opacity:0 !important}";

/**
 * Open one scene in one cell. mode: light | dark | prt | forced. flags: prm, coarse; query: extra URL params.
 * PRT: Chromium emulates `prefers-reduced-transparency` over CDP; Playwright WebKit
 * cannot, so it takes the forced level-0 path and the cell says so.
 */
export async function openPage(target, engine, scene, { mode = "light", prm = false, coarse = false, query = {} } = {}) {
    const b = await browser(engine);
    const opts = {
        viewport: VIEWPORT, deviceScaleFactor: DSF,
        colorScheme: mode === "dark" ? "dark" : "light",
        reducedMotion: prm ? "reduce" : "no-preference",
        forcedColors: mode === "forced" ? "active" : "none",
    };
    if (coarse) { opts.hasTouch = true; if (engine === "chromium") opts.isMobile = true; }
    const ctx = await b.newContext(opts);
    const page = await ctx.newPage();
    const logs = [];
    page.on("console", (m) => logs.push({ type: m.type(), text: m.text() }));
    page.on("pageerror", (e) => logs.push({ type: "pageerror", text: String(e) }));
    let cdp = null;
    if (engine === "chromium") {
        cdp = await ctx.newCDPSession(page);
        if (mode === "prt") {
            await cdp.send("Emulation.setEmulatedMedia", { features: [
                { name: "prefers-color-scheme", value: "light" },
                { name: "prefers-reduced-motion", value: prm ? "reduce" : "no-preference" },
                { name: "prefers-reduced-transparency", value: "reduce" },
            ] });
        }
    }
    await page.addInitScript(`(${inPageHelpers.toString()})()`);
    const q = new URLSearchParams({ scene });
    if (mode === "dark") q.set("mode", "dark");
    for (const [k, v] of Object.entries(query)) q.set(k, String(v));
    await page.goto(target.url(q.toString()), { waitUntil: "load" });
    await page.waitForFunction(() => window.__tile && window.__tile.ready === true, null, { timeout: 30000 });
    if (mode === "prt" && engine !== "chromium") await page.addStyleTag({ content: LEVEL0 });
    await page.evaluate(() => document.fonts.ready.then(() => true));
    await page.waitForTimeout(SETTLE_MS);
    const verify = await page.evaluate(() => ({
        dark: document.documentElement.classList.contains("dark"),
        prt: matchMedia("(prefers-reduced-transparency: reduce)").matches,
        forced: matchMedia("(forced-colors: active)").matches,
        prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
        hoverNone: matchMedia("(hover: none)").matches,
        coarse: matchMedia("(pointer: coarse)").matches,
        dev: !!window.__tile.dev,
    }));
    let modeLabel = mode, modeOk = true;
    if (mode === "dark") modeOk = verify.dark;
    if (mode === "prt") {
        if (engine === "chromium") modeOk = verify.prt;
        else modeLabel = "prt (forced level-0 path)";
    }
    if (mode === "forced") modeOk = verify.forced;
    if (prm && !verify.prm) modeOk = false;
    if (coarse && !(verify.hoverNone && verify.coarse)) modeOk = false;
    return { page, ctx, cdp, logs, verify, mode, modeLabel, modeOk, close: () => ctx.close() };
}

// ── in-page helpers (window.__th): DOM reads only, no source text ─────────────
function inPageHelpers() {
    const px = (s) => { const v = parseFloat(s); return Number.isFinite(v) ? v : 0; };
    const rad = (v, w, h) => {
        const [a, b = a] = String(v).trim().split(/\s+/);
        const f = (t, L) => (t.endsWith("%") ? (parseFloat(t) / 100) * L : px(t));
        return { x: f(a, w), y: f(b, h) };
    };
    const th = {
        scene: () => document.querySelector("[data-scene]"),
        group(root = th.scene()) { return (root && root.querySelector("[data-group]")) || root; },
        items(root = th.scene()) {
            if (!root) return [];
            const marked = [...root.querySelectorAll("[data-item]")];
            if (marked.length) return marked;
            return [...th.group(root).querySelectorAll('[role="radio"],[role="option"],[role="tab"],[aria-pressed],[aria-checked]')];
        },
        on(el) {
            for (const n of ["aria-checked", "aria-pressed", "aria-selected"]) {
                const v = el.getAttribute(n);
                if (v !== null) return v === "true";
            }
            const s = el.getAttribute("data-state");
            return s === "on" || s === "checked" || s === "active";
        },
        /** The layout border box (unaffected by scale/transform). */
        size(el) {
            const cs = getComputedStyle(el);
            let w = px(cs.width), h = px(cs.height);
            if (cs.boxSizing !== "border-box") {
                w += px(cs.paddingLeft) + px(cs.paddingRight) + px(cs.borderLeftWidth) + px(cs.borderRightWidth);
                h += px(cs.paddingTop) + px(cs.paddingBottom) + px(cs.borderTopWidth) + px(cs.borderBottomWidth);
            }
            return { w, h };
        },
        /** The used corner by the CSS Backgrounds 3 §5.5 overlap rule. */
        corner(el) {
            const cs = getComputedStyle(el);
            const { w, h } = th.size(el);
            const tl = rad(cs.borderTopLeftRadius, w, h), tr = rad(cs.borderTopRightRadius, w, h);
            const br = rad(cs.borderBottomRightRadius, w, h), bl = rad(cs.borderBottomLeftRadius, w, h);
            const q = (L, s) => (s > 0 ? L / s : Infinity);
            const f = Math.min(1, q(w, tl.x + tr.x), q(w, bl.x + br.x), q(h, tl.y + bl.y), q(h, tr.y + br.y));
            return { w, h, computed: cs.borderTopLeftRadius, rx: tl.x, ry: tl.y, used: tl.x * f, usedY: tl.y * f, clamped: f < 0.9995 };
        },
        rect(el) { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; },
        tokenNames(prefix = "--radius-") {
            const names = new Set();
            const cs = getComputedStyle(document.documentElement);
            for (let i = 0; i < cs.length; i++) if (cs[i].startsWith(prefix)) names.add(cs[i]);
            const walk = (rules) => {
                for (const r of rules) {
                    if (r.style) for (let i = 0; i < r.style.length; i++) if (r.style[i].startsWith(prefix)) names.add(r.style[i]);
                    if (r.cssRules) walk(r.cssRules);
                }
            };
            for (const s of document.styleSheets) { try { walk(s.cssRules); } catch { /* cross-origin */ } }
            return [...names].sort();
        },
        /** Resolve a custom property IN the element's context (a probe child reads it). */
        resolve(el, name, prop = "border-top-left-radius") {
            const p = document.createElement("span");
            p.setAttribute("data-th-probe", "");
            p.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;${prop}:var(${name})`;
            el.appendChild(p);
            const v = getComputedStyle(p).getPropertyValue(prop).trim();
            p.remove();
            return v;
        },
        /** Every named radius role that resolves to a finite px corner in this element's context. */
        rungs(el) {
            return th.tokenNames().map((n) => ({ name: n, value: th.resolve(el, n) }))
                .filter((t) => /^[\d.]+px$/.test(t.value) && px(t.value) > 0 && px(t.value) < 999)
                .map((t) => ({ name: t.name, px: px(t.value) }));
        },
        /** Rows of content: text line boxes, graphics and painted leaves inside [data-ink], clustered by vertical overlap. */
        rows(el) {
            const roots = [...el.querySelectorAll("[data-ink]")];
            const scope = roots.length ? roots : [el];
            const rects = [];
            for (const root of scope) {
                const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
                while (tw.nextNode()) {
                    const t = tw.currentNode;
                    if (!t.textContent.trim()) continue;
                    const r = document.createRange(); r.selectNodeContents(t);
                    for (const q of r.getClientRects()) if (q.width > 0.5 && q.height > 0.5) rects.push(q);
                }
                for (const e of [root, ...root.querySelectorAll("*")]) {
                    if (e.closest("svg") && e.tagName.toLowerCase() !== "svg") continue;
                    const cs = getComputedStyle(e);
                    const graphic = /^(svg|img|canvas|video)$/i.test(e.tagName);
                    const leafPaint = !e.children.length && (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none");
                    if (!graphic && !leafPaint) continue;
                    const q = e.getBoundingClientRect();
                    if (q.width > 0.5 && q.height > 0.5) rects.push(q);
                }
            }
            rects.sort((a, b) => a.top - b.top);
            let rows = 0, bottom = -Infinity;
            for (const q of rects) {
                if (q.top >= bottom - 1) { rows++; bottom = q.bottom; } else bottom = Math.max(bottom, q.bottom);
            }
            return rows;
        },
        /** The item's one-line extent: its [data-ink] content swapped for one short text line, measured, restored. */
        rung(el) {
            const tops = [...el.querySelectorAll("[data-ink]")].filter((e) => !e.parentElement.closest("[data-ink]"));
            if (!tops.length) return th.size(el).h;
            const marks = tops.map((e) => { const c = document.createComment("th"); e.replaceWith(c); return [c, e]; });
            const x = document.createElement("span"); x.textContent = "x";
            marks[0][0].before(x);
            const h = th.size(el).h;
            x.remove();
            marks.forEach(([c, e]) => c.replaceWith(e));
            return h;
        },
        /** Append one more line to the item's [data-line-slot]; removeLines() takes every added line out. */
        addLine(el) {
            const slot = el.querySelector("[data-line-slot]") || el;
            const br = document.createElement("br"); br.setAttribute("data-th-added", "");
            const s = document.createElement("span"); s.setAttribute("data-th-added", ""); s.textContent = "one more line";
            slot.append(br, s);
        },
        removeLines(el) { el.querySelectorAll("[data-th-added]").forEach((n) => n.remove()); },
        hideInk(on) {
            let st = document.getElementById("__th_ink");
            if (on && !st) {
                st = document.createElement("style"); st.id = "__th_ink";
                st.textContent = "[data-ink],[data-ink] *{visibility:hidden !important}";
                document.head.appendChild(st);
            }
            if (!on && st) st.remove();
        },
        pin(el, on) {
            if (on) { el.style.setProperty("scale", "1", "important"); el.style.setProperty("transition", "none", "important"); }
            else { el.style.removeProperty("scale"); el.style.removeProperty("transition"); }
        },
        scale(el) {
            const cs = getComputedStyle(el);
            let sx = 1, sy = 1;
            if (cs.scale && cs.scale !== "none") { const p = cs.scale.split(/\s+/).map(parseFloat); sx = p[0]; sy = p[1] ?? p[0]; }
            if (cs.transform && cs.transform !== "none") { const m = new DOMMatrixReadOnly(cs.transform); sx *= Math.hypot(m.a, m.b); sy *= Math.hypot(m.c, m.d); }
            return { sx, sy, scale: cs.scale, transform: cs.transform };
        },
        /** Running animations and transitions on the item and its library-owned subtree (consumer [data-ink] content excluded). */
        anims(el) {
            return el.getAnimations({ subtree: true }).filter((a) => {
                const t = a.effect && a.effect.target;
                return !(t && t.closest && t.closest("[data-ink]"));
            }).map((a) => ({
                kind: a.constructor.name,
                prop: a.transitionProperty ?? a.animationName ?? "",
                target: (a.effect.target === el ? "item" : (a.effect.target?.tagName?.toLowerCase() ?? "?")) + (a.effect.pseudoElement ?? ""),
                duration: a.effect.getComputedTiming().duration,
                state: a.playState,
            }));
        },
        tag() {
            const its = th.items();
            its.forEach((e, i) => e.setAttribute("data-th-idx", String(i)));
            const g = th.group(); if (g) g.setAttribute("data-th-group", "");
            return its.length;
        },
        active() {
            const a = document.activeElement;
            if (!a || a === document.body) return "body";
            const s = a.getAttribute("data-sentinel"); if (s) return s;
            const it = a.closest("[data-th-idx]");
            return it ? Number(it.getAttribute("data-th-idx")) : "other";
        },
    };
    window.__th = th;
}

// ── pixels ────────────────────────────────────────────────────────────────────
export function clipAround(r, pad) {
    const x = Math.floor(r.x - pad), y = Math.floor(r.y - pad);
    return { x, y, width: Math.ceil(r.x + r.w + pad) - x, height: Math.ceil(r.y + r.h + pad) - y };
}
export async function shot(page, clip) {
    const buf = await page.screenshot({ clip, animations: "disabled", caret: "hide" });
    const png = PNG.sync.read(buf);
    return { png, clip, dsf: png.width / clip.width };
}
export const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
};
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
export const hex = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
export function px(s, i) { const d = s.png.data; return [d[i * 4], d[i * 4 + 1], d[i * 4 + 2]]; }
/** Mean colour over a CSS-px rect inside the shot. */
export function meanRect(s, r) {
    const { png, clip, dsf } = s;
    const x0 = Math.max(0, Math.round((r.x - clip.x) * dsf)), y0 = Math.max(0, Math.round((r.y - clip.y) * dsf));
    const x1 = Math.min(png.width, Math.round((r.x + r.w - clip.x) * dsf)), y1 = Math.min(png.height, Math.round((r.y + r.h - clip.y) * dsf));
    let R = 0, G = 0, B = 0, n = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const i = (y * png.width + x) * 4; R += png.data[i]; G += png.data[i + 1]; B += png.data[i + 2]; n++; }
    return n ? [R / n, G / n, B / n] : [0, 0, 0];
}
/**
 * Per-pixel comparison of two shots of the same clip, the R3-02 method:
 * `changed` = largest channel moved by more than 10; `cN` = pixels whose own
 * contrast against the other shot's pixel is at least N:1; `p95` of that contrast.
 * Counts are device pixels.
 */
export function compare(a, b, mask = null) {
    const n = a.png.width * a.png.height;
    let changed = 0, c3 = 0, c15 = 0, total = 0;
    const cs = [];
    for (let i = 0; i < n; i++) {
        if (mask && !mask(i)) continue;
        total++;
        const p = px(a, i), q = px(b, i);
        if (Math.max(Math.abs(p[0] - q[0]), Math.abs(p[1] - q[1]), Math.abs(p[2] - q[2])) > 10) changed++;
        const c = contrast(p, q);
        if (c >= 3) c3++;
        if (c >= 1.5) c15++;
        cs.push(c);
    }
    cs.sort((x, y) => x - y);
    return { total, changed, c3, c15, p95: cs.length ? cs[Math.floor(cs.length * 0.95)] : 1 };
}
export function savePng(s, file) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, PNG.sync.write(s.png)); }

// ── CDP: accessibility tree and matched styles (Chromium only) ────────────────
/** backendNodeIds for a selector, through the CDP DOM domain. */
export async function backendIds(cdp, selector) {
    const { root } = await cdp.send("DOM.getDocument", { depth: 0 });
    const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector });
    const out = [];
    for (const nodeId of nodeIds) { const { node } = await cdp.send("DOM.describeNode", { nodeId }); out.push({ nodeId, backendNodeId: node.backendNodeId }); }
    return out;
}
/** The AX node for one DOM node: role, name and the state properties. */
export async function axOf(cdp, backendNodeId) {
    const { nodes } = await cdp.send("Accessibility.getPartialAXTree", { backendNodeId, fetchRelatives: false });
    const n = nodes.find((x) => x.backendDOMNodeId === backendNodeId) ?? nodes[0];
    if (!n) return { role: null };
    const prop = (k) => n.properties?.find((p) => p.name === k)?.value?.value;
    return { role: n.role?.value ?? null, name: n.name?.value ?? "", ignored: !!n.ignored, checked: prop("checked"), pressed: prop("pressed"), selected: prop("selected"), focusable: prop("focusable") };
}

// ── reporting ─────────────────────────────────────────────────────────────────
/** A witness result: { id, title, engine, target, cells: [{ gating, pass (true|false|null), line, ... }] }. */
export function verdict(res) {
    const gating = res.cells.filter((c) => c.gating);
    const measured = gating.filter((c) => c.pass !== null);
    const passed = measured.filter((c) => c.pass).length;
    res.pass = measured.length > 0 && passed === measured.length;
    res.tally = `${passed}/${measured.length} gating cells pass` + (gating.length > measured.length ? `, ${gating.length - measured.length} unmeasured` : "");
    return res;
}
export function print(res) {
    console.log(`${res.id} · ${res.title}`);
    console.log(`  target ${res.target}${res.dev === false ? " (production build)" : " (DEV build)"} · ${res.engineLabel}`);
    for (const c of res.cells) {
        const tag = c.pass === null ? "UNMEASURED" : !c.gating ? (c.pass ? "info-pass" : "info-fail") : c.pass ? "PASS" : "FAIL";
        console.log(`  ${tag.padEnd(10)} ${c.line}`);
    }
    for (const n of res.notes ?? []) console.log(`  note ${n}`);
    console.log(`${res.id} ${res.pass ? "PASS" : "FAIL"} · ${res.tally}`);
}
/** CLI wrapper: run one witness, print, write JSON, exit 0 on PASS and 1 on FAIL (2 on a harness error). */
export async function cli(id, runFn) {
    const args = parseArgs();
    let target;
    // a hung engine (a pointer move that never returns, a crashed target) fails loud instead of stalling the run
    const deadline = Number(args.deadline ?? 1200);
    setTimeout(() => { console.error(`${id} HARNESS ERROR: no verdict within ${deadline} s (an engine hung)`); process.exit(2); }, deadline * 1000).unref();
    try {
        target = await openTarget(args);
        const res = verdict(await runFn(args, target));
        print(res);
        const dir = path.join(outRoot(args), "runs", target.label);
        fs.mkdirSync(dir, { recursive: true });
        const file = path.join(dir, `${id}${res.engine ? "-" + res.engine : ""}.json`);
        fs.writeFileSync(file, JSON.stringify(res, null, 1));
        console.log(`  json ${file}`);
        await closeBrowsers(); await target.close();
        process.exit(res.pass ? 0 : 1);
    } catch (e) {
        console.error(`${id} HARNESS ERROR ${e.stack ?? e}`);
        await closeBrowsers(); if (target) await target.close();
        process.exit(2);
    }
}
/** The scene list the page declares (window.__tile.scenes). */
export async function sceneList(target, engine = "chromium") {
    const P = await openPage(target, engine, "__index");
    const list = await P.page.evaluate(() => window.__tile.scenes);
    await P.close();
    return list;
}
/** Scenes a witness judges: gates first, then info rows. */
export function scenesFor(list, id, { info = true } = {}) {
    const g = list.filter((s) => (s.gates ?? []).includes(id)).map((s) => ({ ...s, gating: true }));
    const i = info ? list.filter((s) => (s.info ?? []).includes(id)).map((s) => ({ ...s, gating: false })) : [];
    return [...g, ...i];
}
/** Race a step against a deadline; resolves { ok, value } or { ok: false, error } (a hang or a crashed target). */
export async function within(ms, fn) {
    let timer;
    const t = new Promise((r) => { timer = setTimeout(() => r({ ok: false, error: `no answer within ${ms / 1000} s (hung)` }), ms); });
    const run = fn().then((value) => ({ ok: true, value }), (e) => ({ ok: false, error: String(e.message ?? e).split("\n")[0] }));
    const r = await Promise.race([run, t]);
    clearTimeout(timer);
    return r;
}
export const f2 =(v) => (v === null || v === undefined || Number.isNaN(v) ? "—" : Number(v).toFixed(2));
