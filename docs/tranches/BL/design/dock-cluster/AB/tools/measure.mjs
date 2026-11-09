// measure.mjs --engine chromium|webkit --siteA <dir> --siteB <dir> --out <AB dir> [--widths 390,1440] [--themes light,dark] [--parts ...]
// The ONE AB harness (measurer, O-195). Both prototypes load the SAME fixture (AB/fixture) and are
// driven through the SAME hooks. Mid-morph frames come from the real dock spring under a virtual
// rAF clock (window.__vc), so frame k is the same spring time in both prototypes and both engines.
// One browser per run; a new context per cell; everything closed in finally.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import os from "node:os";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const NM = path.join(REPO, "node_modules");
const playwright = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const { PNG } = createRequire(path.join(NM, "_.cjs"))("pngjs");

const args = Object.fromEntries(process.argv.slice(2).reduce((a, k, i, arr) => (k.startsWith("--") ? [...a, [k.slice(2), arr[i + 1]]] : a), []));
const engine = args.engine ?? "chromium";
const out = path.resolve(args.out);
const widths = (args.widths ?? "390,1440").split(",").map(Number);
const themes = (args.themes ?? "light,dark").split(",");
const props = (args.props ?? "A,B").split(",");
const parts = new Set((args.parts ?? "design,seam,probe,radius,perf,reduced,a11y,controlset").split(","));
const sites = { A: path.resolve(args.siteA), B: path.resolve(args.siteB) };
fs.mkdirSync(path.join(out, "png"), { recursive: true });
fs.mkdirSync(path.join(out, "data"), { recursive: true });

const FRAME = 1000 / 120; // one virtual frame
const MID_MS = [40, 80, 140];
// Playwright WebKit 26.5 kills the page on the nested translucent color-mix() the GlassDock plate border
// resolves to (docs/tranches/BL/design/dock/harness/adapter-head.mjs). The shim pins that colour to one arm.
// It is scoped to where a GlassDock plate still paints its border: A's cluster and the naive row. B's own
// cluster.css sets that border transparent, so B needs no shim and gets none.
const WEBKIT_SHIM = ".glass-dock-cluster .dock-plate, .naive-row .dock-plate { border-color: var(--dock-plate-expanded-border) !important; }";

const VCLOCK = () => {
    const realRAF = window.requestAnimationFrame.bind(window);
    const realCAF = window.cancelAnimationFrame.bind(window);
    let frozen = false, t = 0, id = 1e7;
    const q = new Map();
    window.requestAnimationFrame = (cb) => { if (!frozen) return realRAF(cb); const i = ++id; q.set(i, cb); return i; };
    window.cancelAnimationFrame = (i) => { if (q.has(i)) q.delete(i); else realCAF(i); };
    window.__vc = {
        freeze() { frozen = true; t = performance.now(); },
        step(ms) { t += ms; const cbs = [...q.values()]; q.clear(); for (const cb of cbs) { try { cb(t); } catch (e) { console.error("vc cb", e); } } },
        thaw() { frozen = false; const cbs = [...q.values()]; q.clear(); for (const cb of cbs) realRAF(cb); },
        pending: () => q.size,
    };
};

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://x");
    const [, key, ...rest] = decodeURIComponent(u.pathname).split("/");
    const root = sites[key];
    if (!root) { res.writeHead(404); return res.end(); }
    let p = path.join(root, rest.join("/"));
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(root, "index.html");
    res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream", "cache-control": "no-store" });
    fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const Lum = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
const load = () => +os.loadavg()[0].toFixed(1);
const rec = { engine, started: new Date().toISOString(), cells: [], errors: [] };
const log = (...a) => console.log(`[${engine}]`, ...a);

async function open(browser, prop, w, theme, o = {}) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 560 }, deviceScaleFactor: 2, colorScheme: theme, reducedMotion: o.reduced ? "reduce" : "no-preference" });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message));
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    page.on("crash", () => errs.push("PAGE CRASH"));
    await page.addInitScript(VCLOCK);
    if (engine === "webkit") await page.addInitScript((css) => { const add = () => { const st = document.createElement("style"); st.textContent = css; (document.head || document.documentElement).appendChild(st); }; document.documentElement ? add() : document.addEventListener("readystatechange", add, { once: true }); }, WEBKIT_SHIM);
    const q = new URLSearchParams({ mode: o.mode ?? "design", fused: o.fused ? "1" : "0", ...(theme === "dark" ? { dark: "1" } : {}), ...(o.naive ? { naive: "1" } : {}) });
    await page.goto(`${base}/${prop}/?${q}`);
    await page.waitForFunction(() => window.__ab?.ready, null, { timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    return { ctx, page, errs };
}

const geom = (page) => page.evaluate(() => {
    const root = document.querySelector("[data-testid=cluster]");
    const ds = [...root.querySelectorAll(":scope > .glass-dock")];
    const rs = ds.map((d) => d.getBoundingClientRect());
    const rr = root.getBoundingClientRect();
    return {
        root: { l: rr.left, r: rr.right, t: rr.top, b: rr.bottom },
        plates: rs.map((r) => ({ l: r.left, r: r.right, t: r.top, b: r.bottom })),
        overflow: ds.map((d) => d.scrollWidth - d.clientWidth),
        vw: innerWidth,
    };
});

const vstep = (page, n) => page.evaluate(([n, f]) => { for (let i = 0; i < n; i++) window.__vc.step(f); }, [n, FRAME]);
async function fuseTo(page, v, ms) {
    await page.evaluate((v) => { window.__vc.freeze(); window.__ab.set(v); }, v);
    await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
    await vstep(page, Math.round(ms / FRAME));
}

async function shot(page, name, g, pad = 28) {
    const xs = g.plates.flatMap((p) => [p.l, p.r]), ys = g.plates.flatMap((p) => [p.t, p.b]);
    const x0 = Math.max(0, Math.floor(Math.min(...xs) - pad)), x1 = Math.min(g.vw, Math.ceil(Math.max(...xs) + pad));
    const y0 = Math.floor(Math.min(...ys) - pad), y1 = Math.ceil(Math.max(...ys) + pad);
    const clip = { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
    const buf = await page.screenshot({ clip });
    if (name) fs.writeFileSync(path.join(out, "png", name + ".png"), buf);
    return { png: PNG.sync.read(buf), clip };
}
async function full(page) {
    const buf = await page.screenshot();
    return { png: PNG.sync.read(buf), clip: { x: 0, y: 0 } };
}
// luminance at css (x, y) in a capture
function L(img, x, y) {
    const { png, clip } = img;
    const px = Math.round((x - clip.x) * 2), py = Math.round((y - clip.y) * 2);
    if (px < 0 || py < 0 || px >= png.width || py >= png.height) return NaN;
    return Lum(png.data, (py * png.width + px) * 4);
}
function rowStats(img, y, xa, xb) {
    const v = [];
    for (let x = xa; x <= xb; x += 0.5) { const l = L(img, x, y); if (!Number.isNaN(l)) v.push(l); }
    const m = v.reduce((a, b) => a + b, 0) / v.length;
    return { n: v.length, mean: +m.toFixed(1), sd: +Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length).toFixed(2) };
}
// the step metric: |L(x) − mean(L(x−4), L(x+4))|, max over x in [xa, xb] (css px, half-px steps)
function stepMax(img, y, xa, xb) {
    let best = 0, at = xa;
    for (let x = xa; x <= xb; x += 0.5) {
        const s = Math.abs(L(img, x, y) - (L(img, x - 4, y) + L(img, x + 4, y)) / 2);
        if (s > best) { best = s; at = x; }
    }
    return { step: +best.toFixed(1), at: +at.toFixed(1) };
}
function profile(img, y, xa, xb) { const v = []; for (let x = xa; x <= xb; x += 0.5) v.push(+L(img, x, y).toFixed(1)); return v; }

// ---- parts ----
async function design(browser, prop, w, theme, cell) {
    const tag = `${engine}-${prop}-${w}-${theme}`;
    const { ctx, page, errs } = await open(browser, prop, w, theme, { mode: "design" });
    try {
        const g0 = await geom(page);
        cell.overflow = g0.overflow;
        await page.evaluate(() => window.__vc.freeze());
        const span = (g) => ({ plates: g.plates, overflow: g.overflow });
        // fixed crop: union of split and fused boxes so the frames line up
        await shot(page, `${tag}-design-0-split`, g0);
        cell.designFrames = { split: span(g0) };
        let elapsed = 0;
        await page.evaluate(() => window.__ab.set(true));
        await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
        for (const ms of MID_MS) {
            await vstep(page, Math.round((ms - elapsed) / FRAME)); elapsed = ms;
            const g = await geom(page);
            await shot(page, `${tag}-design-${ms}ms`, g0.plates.length ? { ...g, plates: [...g0.plates, ...g.plates] } : g);
            cell.designFrames[`${ms}ms`] = span(g);
        }
        await vstep(page, 200);
        const gf = await geom(page);
        await shot(page, `${tag}-design-9-fused`, { ...gf, plates: [...g0.plates, ...gf.plates] });
        cell.designFrames.fused = span(gf);
        await page.evaluate(() => window.__ab.set([true, false]));
        await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
        await vstep(page, 200);
        const gp = await geom(page);
        await shot(page, `${tag}-design-partial`, { ...gp, plates: [...g0.plates, ...gp.plates] });
        cell.designFrames.partial = span(gp);
    } finally { cell.designErrors = errs.slice(0, 5); await ctx.close(); }
}

async function seam(browser, prop, w, theme, cell) {
    const tag = `${engine}-${prop === "naive" ? "naive" : prop}-${w}-${theme}`;
    const { ctx, page, errs } = await open(browser, prop === "naive" ? "A" : prop, w, theme, { mode: "flat", naive: prop === "naive", fused: prop === "naive" });
    try {
        if (prop !== "naive") await fuseTo(page, true, 1700);
        const g = await geom(page);
        const img = await shot(page, `${tag}-seam-fused`, g);
        const p = g.plates;
        const t = Math.min(...p.map((q) => q.t)), b = Math.max(...p.map((q) => q.b)), mid = (t + b) / 2;
        const rows = { haloTop: t - 5, rimTop: t + 2, inTop: t + 6, mid, inBot: b - 6, haloBot: b + 5 };
        cell.seam = { joins: [], floor: {}, gaps: p.slice(1).map((q, i) => +(q.l - p[i].r).toFixed(2)) };
        const c0 = (p[0].l + p[0].r) / 2;
        for (const [k, y] of Object.entries(rows)) cell.seam.floor[k] = stepMax(img, y, c0 - 6, c0 + 6).step;
        for (let i = 0; i < p.length - 1; i++) {
            const jx = (p[i].r + p[i + 1].l) / 2;
            const j = { x: +jx.toFixed(2) };
            for (const [k, y] of Object.entries(rows)) j[k] = stepMax(img, y, jx - 3, jx + 3);
            const half = (y, a, b) => { let t = 0, n = 0; for (let x = a; x <= b; x += 0.5) { t += L(img, x, y); n++; } return t / n; };
            j.tone = {};
            for (const [k, y] of Object.entries(rows)) j.tone[k] = +Math.abs(half(y, jx + 1, jx + 8) - half(y, jx - 8, jx - 1)).toFixed(1);
            j.profileMid = profile(img, mid, jx - 16, jx + 16);
            j.profileInTop = profile(img, rows.inTop, jx - 16, jx + 16);
            cell.seam.joins.push(j);
        }
        // a 4x crop of the first join for the report
        const jx = (p[0].r + p[1].l) / 2;
        const buf = await page.screenshot({ clip: { x: jx - 20, y: t - 10, width: 40, height: b - t + 20 } });
        fs.writeFileSync(path.join(out, "png", `${tag}-seam-zoom.png`), buf);
    } finally { cell.seamErrors = errs.slice(0, 5); await ctx.close(); }
}

async function probe(browser, prop, w, theme, cell) {
    const tag = `${engine}-${prop}-${w}-${theme}`;
    const { ctx, page, errs } = await open(browser, prop, w, theme, { mode: "stripes" });
    try {
        const frames = {};
        const read = async (label) => {
            const g = await geom(page);
            const img = await full(page);
            const r = { plates: [], bridge: [] };
            for (const q of g.plates) {
                const y = (q.t + q.b) / 2;
                r.plates.push(rowStats(img, y, q.l + 12, q.r - 12).sd);
            }
            r.seamTone = [];
            for (let i = 0; i < g.plates.length - 1; i++) {
                const jx = (g.plates[i].r + g.plates[i + 1].l) / 2, y = (g.plates[i].t + g.plates[i].b) / 2;
                r.bridge.push(rowStats(img, y, jx - 3, jx + 3).sd);
                r.seamTone.push(+Math.abs(rowStats(img, y, jx + 1, jx + 13).mean - rowStats(img, y, jx - 13, jx - 1).mean).toFixed(1));
            }
            const bandY = (g.plates[0].t + g.plates[0].b) / 2;
            r.bareBand = rowStats(img, bandY, 1, Math.max(12, g.plates[0].l - 10)).sd;
            r.ctlBackdropDiv = rowStats(img, 48, 24, 128).sd;
            r.ctlFilterDiv = rowStats(img, 48, 168, 272).sd;
            r.ctlBare = rowStats(img, 48, 296, 380).sd;
            frames[label] = r;
            if (["split", "80ms", "fused"].includes(label)) await shot(page, `${tag}-probe-${label}`, g);
        };
        await page.evaluate(() => window.__vc.freeze());
        await read("split");
        let el = 0;
        await page.evaluate(() => window.__ab.set(true));
        await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
        for (const ms of MID_MS) { await vstep(page, Math.round((ms - el) / FRAME)); el = ms; await read(`${ms}ms`); }
        await vstep(page, 200);
        await read("fused");
        cell.probe = frames;
    } finally { cell.probeErrors = errs.slice(0, 5); await ctx.close(); }
}

const RADIUS_SCAN = () => {
    const root = document.querySelector("[data-testid=cluster]");
    const els = [root, ...root.querySelectorAll("*")];
    let reads = 0, pct = 0, squarePct = 0, ellip = 0, clipPct = 0;
    const examples = [];
    for (const el of els) {
        for (const pseudo of [null, "::before", "::after"]) {
            const cs = getComputedStyle(el, pseudo);
            if (pseudo && (cs.content === "none" || cs.content === "normal")) continue;
            for (const p of ["border-top-left-radius", "border-top-right-radius", "border-bottom-left-radius", "border-bottom-right-radius"]) {
                const v = cs.getPropertyValue(p); reads++;
                if (v.includes("%")) {
                    const b = el.getBoundingClientRect();
                    if (Math.abs(b.width - b.height) > 0.5) { pct++; if (examples.length < 4) examples.push(`${el.className}${pseudo ?? ""} ${p}: ${v} on ${b.width.toFixed(1)}x${b.height.toFixed(1)}`); }
                    else squarePct++;
                }
                const parts = v.trim().split(/\s+/);
                if (parts.length === 2 && parts[0] !== parts[1]) { ellip++; if (examples.length < 4) examples.push(`ELLIPSE ${el.className}${pseudo ?? ""} ${p}: ${v}`); }
            }
            if (cs.clipPath && cs.clipPath.includes("%")) clipPct++;
        }
    }
    return { reads, pct, squarePct, ellip, clipPct, examples };
};

async function radius(browser, prop, w, theme, cell) {
    const { ctx, page, errs } = await open(browser, prop, w, theme, { mode: "design" });
    try {
        const tot = { frames: 0, reads: 0, pct: 0, squarePct: 0, ellip: 0, clipPctFrames: 0, examples: [] };
        const add = (r) => { tot.frames++; tot.reads += r.reads; tot.pct += r.pct; tot.squarePct += r.squarePct; tot.ellip += r.ellip; if (r.clipPct) tot.clipPctFrames++; tot.examples.push(...r.examples); };
        await page.evaluate(() => window.__vc.freeze());
        add(await page.evaluate(RADIUS_SCAN));
        for (const v of [true, [true, false], false]) {
            await page.evaluate((v) => window.__ab.set(v), v);
            await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
            for (let k = 0; k < 60; k++) { await vstep(page, 1); add(await page.evaluate(RADIUS_SCAN)); }
        }
        tot.examples = [...new Set(tot.examples)].slice(0, 6);
        cell.radius = tot;
    } finally { cell.radiusErrors = errs.slice(0, 5); await ctx.close(); }
}

const RAF_WINDOW = (opts) => new Promise((resolve) => {
    const ts = [];
    const t0 = performance.now();
    if (opts.morph) { window.__ab.set(true); setTimeout(() => window.__ab.set(false), 500); }
    const f = (t) => { ts.push(t); if (performance.now() - t0 < 1000) requestAnimationFrame(f); else resolve(ts); };
    requestAnimationFrame(f);
});
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(2); };

async function perf(browser, prop, w, theme, cell) {
    const { ctx, page, errs } = await open(browser, prop, w, theme, { mode: "design" });
    try {
        let cdp = null;
        if (engine === "chromium") { cdp = await ctx.newCDPSession(page); await cdp.send("Performance.enable"); }
        const metrics = async () => cdp ? Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value])) : null;
        const KEYS = ["LayoutCount", "RecalcStyleCount", "LayoutDuration", "RecalcStyleDuration", "ScriptDuration", "TaskDuration"];
        const runs = [];
        for (const morph of [false, true, false, true, false, true]) {
            const m0 = await metrics();
            const ts = await page.evaluate(RAF_WINDOW, { morph });
            const m1 = await metrics();
            const iv = ts.slice(1).map((t, i) => t - ts[i]);
            const r = { morph, frames: iv.length, p50: pct(iv, 0.5), p95: pct(iv, 0.95), max: +Math.max(...iv).toFixed(2), over17: iv.filter((x) => x > 17.5).length, load: load() };
            if (m0) for (const k of KEYS) r[k] = +(m1[k] - m0[k]).toFixed(4);
            runs.push(r);
            await page.waitForTimeout(400);
        }
        cell.perf = runs;
        if (engine === "chromium" && w === 1440) {
            const sumTrace = async (morph) => {
                await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "cc", "gpu", "viz", "blink"] });
                await page.evaluate(RAF_WINDOW, { morph });
                const buf = await browser.stopTracing();
                const ev = JSON.parse(buf.toString()).traceEvents ?? [];
                const by = {};
                for (const e of ev) if (e.ph === "X" && e.dur) by[e.name] = (by[e.name] ?? 0) + e.dur / 1000;
                const pick = ["Paint", "RasterTask", "PrePaint", "Layerize", "UpdateLayoutTree", "Layout", "CompositeLayers", "Commit", "DrawFrame", "SkiaGpuQueue::Flush", "GPUTask", "Display::DrawAndSwap", "SkiaOutputSurfaceImplOnGpu::FinishPaintCurrentFrame"];
                const outm = {};
                for (const k of pick) if (by[k]) outm[k] = +by[k].toFixed(1);
                outm.top = Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => `${k} ${v.toFixed(1)}`);
                return outm;
            };
            cell.trace = { idle: await sumTrace(false), morph: await sumTrace(true) };
        }
    } finally { cell.perfErrors = errs.slice(0, 5); await ctx.close(); }
}

async function reduced(browser, prop, w, theme, cell) {
    const { ctx, page, errs } = await open(browser, prop, w, theme, { mode: "design", reduced: true });
    try {
        const samples = await page.evaluate(() => new Promise((resolve) => {
            const root = document.querySelector("[data-testid=cluster]");
            const mats = () => [...root.querySelectorAll(".dock-cluster-plate, :scope > .glass-dock > .dock-plate")];
            const ds = [...root.querySelectorAll(":scope > .glass-dock")];
            const out = [];
            const t0 = performance.now();
            window.__ab.set(true);
            const f = () => {
                const op = Math.min(...mats().map((m) => +getComputedStyle(m).opacity));
                const ctlOp = Math.min(...ds.map((d) => { const b = d.querySelector("button"); let o = 1, e = b; while (e && e !== root) { o *= +getComputedStyle(e).opacity; e = e.parentElement; } return o; }));
                const g = ds.map((d) => { const r = d.getBoundingClientRect(); return `${Math.round(r.left * 2) / 2},${Math.round(r.right * 2) / 2}`; }).join("|");
                const clip = mats().map((m) => getComputedStyle(m).clipPath).join("|");
                const rad = ds.map((d) => getComputedStyle(d).borderTopRightRadius).join("|");
                const tr = ds.map((d) => d.style.translate || "").join("|");
                out.push({ t: +(performance.now() - t0).toFixed(1), op: +op.toFixed(3), ctlOp: +ctlOp.toFixed(3), sig: `${g}#${clip.length}:${clip.slice(0, 400)}#${rad}`, tr });
                if (performance.now() - t0 < 1000) requestAnimationFrame(f); else resolve(out);
            };
            requestAnimationFrame(f);
        }));
        const sigs = [...new Set(samples.map((s) => s.sig))];
        const ops = samples.map((s) => s.op);
        const mid = ops.filter((o) => o > 0.05 && o < 0.95).length;
        cell.reduced = {
            samples: samples.length, minOpacity: Math.min(...ops), endOpacity: ops.at(-1), intermediateOpacityFrames: mid,
            minControlOpacity: Math.min(...samples.map((s) => s.ctlOp)),
            geometryStates: sigs.length, translateWritten: samples.some((s) => s.tr.replace(/\|/g, "") !== ""),
            opacityTrace: samples.filter((_, i) => i % 3 === 0).map((s) => [s.t, s.op]),
            firstChangeMs: samples.find((s) => s.sig !== samples[0].sig)?.t ?? null,
        };
        const g = await geom(page);
        await shot(page, `${engine}-${prop}-${w}-${theme}-reduced-end`, g);
    } finally { cell.reducedErrors = errs.slice(0, 5); await ctx.close(); }
}

async function a11y(browser, prop, w, theme, cell) {
    const { ctx, page, errs } = await open(browser, prop, w, theme, { mode: "design" });
    try {
        const root = page.locator("[data-testid=cluster]");
        const census = () => page.evaluate(() => {
            const r = document.querySelector("[data-testid=cluster]");
            return [...r.querySelectorAll("button, [role], [tabindex]")].map((e) => ({
                tag: e.tagName, role: e.getAttribute("role"), name: e.getAttribute("aria-label") ?? e.textContent.trim(), tab: e.tabIndex,
                inert: !!e.closest("[inert]"), hidden: !!e.closest("[aria-hidden=true]"), disabled: !!e.disabled,
            })).filter((x) => !x.hidden || x.tag === "BUTTON");
        });
        const active = () => page.evaluate(() => { const a = document.activeElement; return a ? (a.getAttribute("aria-label") ?? a.textContent.trim()) : null; });
        const tabOrder = async () => {
            await page.focus("#sentinel-before");
            const seq = [];
            for (let i = 0; i < 12; i++) { await page.keyboard.press("Tab"); const a = await active(); if (a === "after" || a === null) break; seq.push(a); }
            await page.evaluate(() => document.activeElement?.blur());
            return seq;
        };
        const s0 = await root.ariaSnapshot(), c0 = await census();
        // mid-fuse (virtual clock, 80 ms into the real spring), then settled; no focus moves in between
        await fuseTo(page, true, 80);
        const sMid = await root.ariaSnapshot(), cMid = await census();
        await vstep(page, 200);
        const s1 = await root.ariaSnapshot(), c1 = await census();
        await page.evaluate(() => window.__vc.thaw());
        const t1 = await tabOrder();
        await fuseTo(page, false, 1700);
        await page.evaluate(() => window.__vc.thaw());
        const t0 = await tabOrder();
        // focus retention through a fuse and a fission
        await page.getByRole("button", { name: "Text size" }).focus();
        const before = await active();
        await fuseTo(page, true, 80);
        const midFocus = await active();
        await vstep(page, 200);
        const afterFuse = await active();
        await page.evaluate(() => { window.__ab.set(false); });
        await page.evaluate(() => new Promise((r) => setTimeout(r, 0)));
        await vstep(page, 200);
        const afterFission = await active();
        await page.evaluate(() => window.__vc.thaw());
        const diff = (a, b) => { const x = a.split("\n"), y = b.split("\n"); return x.map((l, i) => (l !== y[i] ? `${l}  ->  ${y[i]}` : null)).filter(Boolean).slice(0, 6); };
        const cdiff = (a, b) => a.map((e, i) => (JSON.stringify(e) !== JSON.stringify(b[i]) ? `${JSON.stringify(e)} -> ${JSON.stringify(b[i])}` : null)).filter(Boolean).slice(0, 6);
        cell.a11y = {
            treeSame: s0 === s1 && s0 === sMid, censusSame: JSON.stringify(c0) === JSON.stringify(c1) && JSON.stringify(c0) === JSON.stringify(cMid),
            tabSplit: t0, tabFused: t1, tabSame: JSON.stringify(t0) === JSON.stringify(t1),
            focus: { before, midFocus, afterFuse, afterFission }, focusKept: [midFocus, afterFuse, afterFission].every((x) => x === before),
            snapshot: s0, controls: c0.filter((x) => x.tag === "BUTTON").length,
            treeDiffMid: diff(s0, sMid), treeDiffFused: diff(s0, s1), censusDiffMid: cdiff(c0, cMid), censusDiffFused: cdiff(c0, c1),
        };
    } finally { cell.a11yErrors = errs.slice(0, 5); await ctx.close(); }
}

// a control added to the middle plate while fused: does the cluster glide its plates or jump them?
async function controlset(browser, prop, w, theme, cell) {
    const { ctx, page, errs } = await open(browser, prop, w, theme, { mode: "design", fused: false });
    try {
        await fuseTo(page, true, 1700);
        const g0 = await geom(page);
        await page.evaluate(() => window.__ab.extra(true));
        await page.evaluate(() => new Promise((r) => setTimeout(r, 80))); // real rendering frames run (ResizeObserver), the virtual clock does not advance
        const tr = [g0, await geom(page)];
        for (let k = 0; k < 80; k++) {
            await vstep(page, 1); tr.push(await geom(page));
            if (k === 5) await shot(page, `${engine}-${prop}-${w}-${theme}-controlset-50ms`, tr.at(-1));
        }
        const restGap = g0.plates.slice(1).map((q, i) => q.l - g0.plates[i].r);
        const overlap = Math.max(0, ...tr.slice(1).flatMap((g) => g.plates.slice(1).map((q, i) => restGap[i] - (q.l - g.plates[i].r))));
        const edges = (g) => g.plates.flatMap((p) => [p.l, p.r]);
        let maxJump = 0, moving = 0;
        for (let k = 1; k < tr.length; k++) {
            const d = Math.max(...edges(tr[k]).map((e, i) => Math.abs(e - edges(tr[k - 1])[i])));
            maxJump = Math.max(maxJump, d); if (d > 0.05) moving++;
        }
        const total = Math.max(...edges(tr.at(-1)).map((e, i) => Math.abs(e - edges(g0)[i])));
        const first = Math.max(...edges(tr[1]).map((e, i) => Math.abs(e - edges(g0)[i])));
        cell.controlset = { totalShift: +total.toFixed(2), firstFrameJump: +first.toFixed(2), maxPerFrame: +maxJump.toFixed(2), framesMoving: moving, maxExtraOverlap: +overlap.toFixed(2) };
        await shot(page, `${engine}-${prop}-${w}-${theme}-controlset-end`, tr.at(-1));
    } finally { cell.controlsetErrors = errs.slice(0, 5); await ctx.close(); }
}

const browserType = playwright[engine];
let browser;
try {
    browser = await browserType.launch({ headless: true });
    rec.version = browser.version();
    for (const w of widths) for (const theme of themes) {
        const naiveCell = { prop: "naive", w, theme };
        if (parts.has("seam")) { try { await seam(browser, "naive", w, theme, naiveCell); } catch (e) { naiveCell.error = String(e).slice(0, 300); } rec.cells.push(naiveCell); }
        for (const prop of props) {
            const cell = { prop, w, theme, load: load() };
            log(prop, w, theme, "load", cell.load);
            const run = async (name, fn) => { if (!parts.has(name)) return; try { await fn(browser, prop, w, theme, cell); } catch (e) { cell[`${name}Error`] = String(e).slice(0, 400); log("ERR", name, String(e).slice(0, 200)); } };
            await run("design", design);
            await run("seam", seam);
            await run("probe", probe);
            await run("radius", radius);
            if (theme === "light") await run("perf", perf);
            if (w === 1440) await run("reduced", reduced);
            if (theme === "light") await run("a11y", a11y);
            if (w === 1440 && theme === "light") await run("controlset", controlset);
            rec.cells.push(cell);
            fs.writeFileSync(path.join(out, "data", `${engine}.json`), JSON.stringify(rec, null, 1));
        }
    }
} finally {
    rec.ended = new Date().toISOString();
    fs.writeFileSync(path.join(out, "data", `${engine}.json`), JSON.stringify(rec, null, 1));
    if (browser) await browser.close().catch(() => {});
    server.close();
}
log("done", rec.cells.length, "cells");
