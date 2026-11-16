// Lane L1 witness probe: the collapsed face (content-sized), the border rim, the nav mark.
//
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label>
//
// One browser per run, a new context per cell, every context and the browser closed in
// `finally`. Headless shell for Chromium (Playwright's default); WebKit is Playwright's
// own build. Each cell writes its readings to <out-dir>/<label>-<engine>.json and its
// cropped paint to <out-dir>/png/.
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [engineName, base, outDir, label] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });

const PATH = "/docs/release-11.1.0/lane-L1/harness/index.html";
const WIDTHS = [390, 1440];
const THEMES = ["light", "dark"];
const results = { engine: engineName, label, base, cells: [] };
const verdicts = [];

const verdict = (item, cell, pass, detail) => {
    verdicts.push({ item, cell, pass, detail });
};

async function open(browser, { width, theme, scene, dpr = 1, reduce = false, query = "" }) {
    const context = await browser.newContext({
        viewport: { width, height: 800 },
        deviceScaleFactor: dpr,
        reducedMotion: reduce ? "reduce" : "no-preference",
        colorScheme: theme,
    });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?scene=${scene}&theme=${theme}${query}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
    return { context, page };
}

// ── O-164 · the collapsed face ───────────────────────────────────────────────────
async function collapsed(browser, width, theme) {
    const { context, page } = await open(browser, { width, theme, scene: "collapsed" });
    try {
        const read = await page.evaluate(() => {
            const out = {};
            for (const key of ["wide", "square"]) {
                const host = document.querySelector(`[data-probe="${key}"]`);
                const dock = host.querySelector(".glass-dock");
                const summary = host.querySelector(".dock-layer--summary");
                const face = host.querySelector('[data-probe="face"]');
                const d = dock.getBoundingClientRect();
                const s = summary.getBoundingClientRect();
                const f = face.getBoundingClientRect();
                const cs = getComputedStyle(dock);
                out[key] = {
                    collapsed: dock.classList.contains("collapsed"),
                    dock: { w: d.width, h: d.height },
                    summary: { w: s.width, h: s.height, scrollW: summary.scrollWidth, clientW: summary.clientWidth },
                    face: { w: f.width, left: f.left - d.left, right: d.right - f.right },
                    radius: cs.borderTopLeftRadius,
                };
            }
            return out;
        });
        for (const key of ["wide", "square"]) {
            const box = await page.locator(`[data-probe="${key}"] .glass-dock`).boundingBox();
            await page.screenshot({
                path: join(pngDir, `${label}-${engineName}-o164-${key}-${width}-${theme}.png`),
                clip: { x: box.x - 6, y: box.y - 6, width: box.width + 12, height: box.height + 12 },
            });
        }
        const w = read.wide;
        const sq = read.square;
        // Green: the face is inside its pane and the dock with room at both ends; the
        // single glyph keeps a square (circular) dock.
        const unclipped = w.summary.scrollW <= w.summary.clientW + 0.5;
        const inside = w.face.left >= 4 && w.face.right >= 4;
        const square = Math.abs(sq.dock.w - sq.dock.h) <= 0.5;
        verdict("O-164", `${width}-${theme}`, unclipped && inside && square, { unclipped, inside, square });
        results.cells.push({ item: "O-164", width, theme, read });
    } finally {
        await context.close();
    }
}

// ── O-169 · the border rim ───────────────────────────────────────────────────────
function magentaMap(buffer) {
    const png = PNG.sync.read(buffer);
    const { width, height, data } = png;
    const hit = (x, y) => {
        const i = (y * width + x) * 4;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        return r - g > 90 && b - g > 90;
    };
    return { width, height, hit };
}

async function rim(browser, width, theme, dpr) {
    const { context, page } = await open(browser, { width, theme, scene: "rim", dpr });
    try {
        const readings = {};
        for (const value of [1, 0.5]) {
            await page.evaluate((v) => window.__setProgress(v), value);
            await page.waitForTimeout(1200);
            const geo = await page.evaluate(() => {
                const dock = document.querySelector('[data-probe="rim-host"] .glass-dock');
                const plate = dock.querySelector(".dock-plate");
                const stroke = dock.querySelector(".scroll-progress-rim__stroke");
                const d = dock.getBoundingClientRect();
                const ps = getComputedStyle(plate);
                return {
                    dock: { x: d.x, y: d.y, w: d.width, h: d.height },
                    plateBorder: ps.borderTopWidth,
                    radius: ps.borderTopLeftRadius,
                    stroke: stroke
                        ? (() => {
                              const r = stroke.getBoundingClientRect();
                              const s = getComputedStyle(stroke);
                              return { x: r.x - d.x, y: r.y - d.y, w: r.width, h: r.height, border: s.borderTopWidth, radius: s.borderTopLeftRadius, clip: s.clipPath };
                          })()
                        : null,
                };
            });
            const pad = 3;
            const clip = { x: geo.dock.x - pad, y: geo.dock.y - pad, width: geo.dock.w + 2 * pad, height: geo.dock.h + 2 * pad };
            const buffer = await page.screenshot({ clip });
            writeFileSync(join(pngDir, `${label}-${engineName}-o169-${value}-${width}-${theme}-dpr${dpr}.png`), buffer);
            const m = magentaMap(buffer);
            const s = dpr; // device px per CSS px
            const x0 = Math.round(pad * s), x1 = Math.round((pad + geo.dock.w) * s) - 1;
            const y0 = Math.round(pad * s), y1 = Math.round((pad + geo.dock.h) * s) - 1;
            const bw = Number.parseFloat(geo.plateBorder) || 1.5;
            const band = Math.ceil((bw + 1) * s); // the border band, with one px of antialias
            const radiusPx = Math.min(Number.parseFloat(geo.radius) || 0, geo.dock.h / 2) * s;
            let covered = 0, total = 0, leftHalfOnly = true, offBorder = 0, inkPixels = 0;
            const mid = (x0 + x1) / 2;
            for (let x = x0; x <= x1; x++) {
                total++;
                let any = false;
                for (let y = y0; y <= y1; y++) {
                    if (!m.hit(x, y)) continue;
                    any = true;
                    inkPixels++;
                    if (x > mid + s) leftHalfOnly = false;
                    // Off the border: deeper than the band from every edge, outside the
                    // corner squares (where the outline curves inward).
                    const dx = Math.min(x - x0, x1 - x), dy = Math.min(y - y0, y1 - y);
                    const inCorner = dx < radiusPx && dy < radiusPx;
                    if (!inCorner && dx > band && dy > band) offBorder++;
                }
                if (any) covered++;
            }
            const coverage = covered / total;
            readings[value] = { geo, coverage, leftHalfOnly, offBorder, inkPixels, band };
            const pass =
                value === 1
                    ? coverage >= 0.99 && offBorder === 0 && inkPixels > 0
                    : Math.abs(coverage - 0.5) <= 0.03 && leftHalfOnly && offBorder === 0;
            verdict("O-169", `${width}-${theme}-dpr${dpr}-p${value}`, pass, { coverage: +coverage.toFixed(4), offBorder, leftHalfOnly, inkPixels });
        }
        results.cells.push({ item: "O-169", width, theme, dpr, readings });
    } finally {
        await context.close();
    }
}

// The tick gate: one progress change, what restyles and what lays out.
async function rimTick(browser) {
    const { context, page } = await open(browser, { width: 1440, theme: "light", scene: "rim", query: "&value=0.3" });
    try {
        await page.waitForTimeout(800);
        const mutated = await page.evaluate(async () => {
            const targets = [];
            const mo = new MutationObserver((records) => {
                for (const r of records) targets.push(`${r.target.className || r.target.nodeName}|${r.attributeName ?? r.type}`);
            });
            mo.observe(document.body, { subtree: true, attributes: true, childList: true, characterData: true });
            window.__setProgress(0.4);
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            mo.disconnect();
            return [...new Set(targets)];
        });
        let trace = null;
        if (engineName === "chromium") {
            await page.waitForTimeout(1200);
            const cdp = await context.newCDPSession(page);
            const events = [];
            cdp.on("Tracing.dataCollected", (e) => events.push(...e.value));
            const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
            await cdp.send("Tracing.start", { categories: "devtools.timeline,disabled-by-default-devtools.timeline", transferMode: "ReportEvents" });
            await page.evaluate(() => window.__setProgress(0.5));
            await page.waitForTimeout(150);
            await cdp.send("Tracing.end");
            await done;
            const style = events.filter((e) => e.name === "UpdateLayoutTree" && e.ph !== "E");
            const layout = events.filter((e) => e.name === "Layout" && e.ph !== "E");
            trace = {
                updateLayoutTree: style.map((e) => e.args?.elementCount ?? e.args?.beginData?.elementCount ?? null),
                layoutCount: layout.length,
                layoutDirty: layout.map((e) => e.args?.beginData?.dirtyObjects ?? null),
            };
        }
        // Green: only the stroke's style and the root's aria-valuenow move; no layout.
        const onlyStroke = mutated.every((t) => t.startsWith("scroll-progress-rim__stroke|style") || t.endsWith("|aria-valuenow"));
        const strokeMoved = mutated.some((t) => t.startsWith("scroll-progress-rim__stroke|style"));
        const traceOk = trace ? trace.layoutCount === 0 && trace.updateLayoutTree.every((n) => n === null || n <= 2) : true;
        verdict("O-169", "tick", onlyStroke && strokeMoved && traceOk, { mutated, trace });
        results.cells.push({ item: "O-169-tick", mutated, trace });
    } finally {
        await context.close();
    }
}

// ── O-188 · the nav mark ─────────────────────────────────────────────────────────
async function nav(browser, width, theme, reduce) {
    const { context, page } = await open(browser, { width, theme, scene: "nav", reduce });
    try {
        const read = await page.evaluate(async () => {
            const run = document.querySelector('[data-probe="nav"] .dock-run');
            const mark = () => {
                const s = getComputedStyle(run, "::before");
                // The mark's inline offset is its `inset-inline-start` (fix 6; a `translate` before),
                // which reads as `left` on a left-to-right page.
                const x = s.content === "none" ? NaN : Number.parseFloat(s.left);
                return { content: s.content, x, w: Number.parseFloat(s.width), bg: s.backgroundColor };
            };
            const plate = (i) => {
                const el = run.querySelector(`[data-tab="${i}"]`);
                const r = el.getBoundingClientRect();
                const p = run.getBoundingClientRect();
                const cs = getComputedStyle(el);
                // The selected fill's own box: its background-clip box (the selected tab's
                // `background` shorthand resets the clip to border-box).
                const inset =
                    cs.backgroundClip === "content-box"
                        ? Number.parseFloat(cs.borderLeftWidth) + Number.parseFloat(cs.paddingLeft)
                        : cs.backgroundClip === "padding-box"
                          ? Number.parseFloat(cs.borderLeftWidth)
                          : 0;
                return { x: r.left - p.left - run.clientLeft + run.scrollLeft + inset, clip: cs.backgroundClip, bg: cs.backgroundColor };
            };
            const before = mark();
            const seatBefore = plate(0);
            const frames = [];
            window.__select(3);
            const t0 = performance.now();
            await new Promise((resolve) => {
                const tick = () => {
                    frames.push({ t: performance.now() - t0, ...mark() });
                    if (performance.now() - t0 < 1400) requestAnimationFrame(tick);
                    else resolve();
                };
                requestAnimationFrame(tick);
            });
            return { before, seatBefore, frames, target: plate(3), runMark: run.hasAttribute("data-run-mark") };
        });
        const start = read.before.x;
        const end = read.target.x;
        const xs = read.frames.map((f) => f.x).filter((x) => Number.isFinite(x));
        const lo = Math.min(start, end) + 1, hi = Math.max(start, end) - 1;
        const intermediate = new Set(xs.filter((x) => x > lo && x < hi).map((x) => x.toFixed(1))).size;
        const last = xs.at(-1);
        const landed = Number.isFinite(last) && Math.abs(last - end) <= 1;
        const firstSample = xs[0];
        const cut = Number.isFinite(firstSample) && Math.abs(firstSample - end) <= 1 && intermediate === 0;
        const pass = reduce ? cut && landed : intermediate >= 3 && landed;
        verdict("O-188", `${width}-${theme}${reduce ? "-prm" : ""}`, pass, { start, end, intermediate, landed, firstSample, frames: xs.length, runMark: read.runMark });
        if (!reduce) {
            // Paint mid-glide: re-run the change and capture at ~120 ms.
            await page.evaluate(() => window.__select(0));
            await page.waitForTimeout(1200);
            await page.evaluate(() => window.__select(3));
            await page.waitForTimeout(120);
            const box = await page.locator('[data-probe="nav"] .glass-dock').boundingBox();
            await page.screenshot({
                path: join(pngDir, `${label}-${engineName}-o188-mid-${width}-${theme}.png`),
                clip: { x: box.x - 6, y: box.y - 6, width: box.width + 12, height: box.height + 12 },
            });
            await page.waitForTimeout(1200);
            await page.screenshot({
                path: join(pngDir, `${label}-${engineName}-o188-rest-${width}-${theme}.png`),
                clip: { x: box.x - 6, y: box.y - 6, width: box.width + 12, height: box.height + 12 },
            });
        }
        results.cells.push({ item: "O-188", width, theme, reduce, read: { before: read.before, seatBefore: read.seatBefore, target: read.target, runMark: read.runMark, xs } });
    } finally {
        await context.close();
    }
}

// WebKit runs on Playwright's build 2287, the build the dock renders in (build 2311, the
// one this Playwright installs by default, crashes the page on a GlassDock); this is the
// pin tests-visual/webkit-2287.config.ts and the 11.0.0 records use.
const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;
const browser = await engine.launch(
    engineName === "webkit" ? { headless: true, executablePath: WEBKIT_2287 } : { headless: true },
);
try {
    for (const width of WIDTHS)
        for (const theme of THEMES) {
            await collapsed(browser, width, theme);
            await nav(browser, width, theme, false);
            for (const dpr of [1, 2]) await rim(browser, width, theme, dpr);
        }
    for (const width of WIDTHS) await nav(browser, width, "light", true);
    await rimTick(browser);
} finally {
    await browser.close();
}
results.verdicts = verdicts;
const summary = {};
for (const v of verdicts) {
    summary[v.item] ??= { pass: 0, fail: 0 };
    summary[v.item][v.pass ? "pass" : "fail"]++;
}
results.summary = summary;
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify(results, null, 1));
console.log(JSON.stringify(summary));
for (const v of verdicts.filter((v) => !v.pass)) console.log("FAIL", v.item, v.cell, JSON.stringify(v.detail));
process.exit(verdicts.every((v) => v.pass) ? 0 : 1);
