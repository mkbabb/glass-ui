#!/usr/bin/env node
// MEASURE copy: WebKit launches Playwright WebKit 2287 (tests-visual/webkit-2287.config.ts: 2311 crashes on a GlassDock); the sampler reads the clip chain (vb).
// probe.mjs <tree> <component> <scenario-file> [options]
//
// One headless browser per run; one new context per cell; everything closed in finally.
// Drives the scenario's steps against http://127.0.0.1:<port>/?c=<component> (the preview
// server for that tree must already be up: see README.md), samples every rendered frame
// for the scenario's tracked selectors (sampler.js), and writes per cell:
//   <out>/<base>.rows.json         rows + marks + pointer log + long tasks + animations seen
//   <out>/<base>.start.png         strip: the first N compositor frames of the motion
//   <out>/<base>.end.png           strip: the last N compositor frames, to rest
//   <out>/<base>.<strip>.png       any extra strips the scenario names
// <base> = <scenario.name>.<tree tag>.<engine>.<cell tag>
//
// Options:
//   --engine chromium|webkit   (default chromium; webkit must run under guarded --exclusive webkit)
//   --cell <tag>               run only the scenario cell with this tag (default: all cells)
//   --out <dir>                output directory (default ./out)
//   --port <n>                 override the tree's port
//   --hook ro|raf              sampling hook (default ro; see sampler.js)
//   --trace                    chromium only: record a performance trace and add layout,
//                              style and paint counts per frame to the rows (forces --hook raf)
//   --no-strip                 skip the screencast and strips
//   --frames <n>               frames per strip (default 12)
//   --dpr <n>                  device scale factor (default from cell, else 2; coarse cells 3)
//   --software                 chromium: composite in software (default is GPU: --use-angle=metal --enable-gpu-rasterization)
//   --browser-arg <flag>       extra browser flag (repeatable), e.g. --browser-arg=--use-angle=metal
//   --format jpeg|png          screencast frame format (default jpeg, --quality 92); the strip is always PNG
//
// <tree>: tree-v11.0.1 | v11.0.1 | tree-11.0.2-tip | tip | <path to a tree dir>
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const TREES = {
    "v11.0.1": { dir: "tree-v11.0.1", port: 5391, tag: "v11.0.1" },
    "tree-v11.0.1": { dir: "tree-v11.0.1", port: 5391, tag: "v11.0.1" },
    tip: { dir: "tree-11.0.2-tip", port: 5392, tag: "tip" },
    "tree-11.0.2-tip": { dir: "tree-11.0.2-tip", port: 5392, tag: "tip" },
};

function parseArgs(argv) {
    const pos = [],
        o = { engine: "chromium", out: "out", hook: null, trace: false, strip: true, frames: 12, format: "jpeg", quality: 92 };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === "--engine") o.engine = argv[++i];
        else if (a === "--cell") o.cell = argv[++i];
        else if (a === "--out") o.out = argv[++i];
        else if (a === "--port") o.port = +argv[++i];
        else if (a === "--hook") o.hook = argv[++i];
        else if (a === "--trace") o.trace = true;
        else if (a === "--no-strip") o.strip = false;
        else if (a === "--frames") o.frames = +argv[++i];
        else if (a === "--dpr") o.dpr = +argv[++i];
        else if (a === "--format") o.format = argv[++i];
        else if (a === "--browser-arg") (o.browserArgs ||= []).push(argv[++i]);
        else if (a === "--software") o.software = true;
        else if (a === "--quality") o.quality = +argv[++i];
        else pos.push(a);
    }
    if (pos.length < 3) {
        console.error("usage: probe.mjs <tree> <component> <scenario-file> [--engine chromium|webkit] [--cell tag] [--out dir] [--trace] [--no-strip]");
        process.exit(2);
    }
    [o.tree, o.component, o.scenario] = pos;
    return o;
}

const opt = parseArgs(process.argv.slice(2));
// Chromium's headless shell composites in software unless told otherwise; a glass grasp
// (the Slider's full-viewport focus veil) then costs ~55 ms a frame at 1440 and every
// frame reads as dropped. GPU compositing (ANGLE on Metal) is the default; --software
// drops it. Still the headless shell, no window.
const GPU_ARGS = ["--use-angle=metal", "--enable-gpu-rasterization"];
const launchArgs = [...(opt.engine === "chromium" && !opt.software ? GPU_ARGS : []), ...(opt.browserArgs || [])];
const treeRow = TREES[opt.tree] || { dir: opt.tree, port: opt.port, tag: basename(opt.tree) };
const treeDir = resolve(HERE, treeRow.dir);
if (!existsSync(join(treeDir, "package.json"))) throw new Error("no tree at " + treeDir);
const port = opt.port || treeRow.port;
if (!port) throw new Error("no port for tree " + opt.tree + "; pass --port");
const require = createRequire(join(treeDir, "package.json"));
const pw = require("playwright");
const scenario = JSON.parse(readFileSync(resolve(opt.scenario), "utf8"));
const SAMPLER = readFileSync(join(HERE, "sampler.js"), "utf8");
const hook = opt.trace ? "raf" : opt.hook || scenario.hook || "ro";
const outDir = resolve(opt.out);
mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let sha = "";
try {
    sha = readFileSync(join(HERE, treeRow.tag === "tip" ? "TIP-SHA.txt" : "V11.0.1-SHA.txt"), "utf8").trim();
} catch {}

const DEFAULT_CELL = { tag: "1440-fine-light", w: 1440, h: 900, pointer: "fine", scheme: "light" };

async function main() {
    // Server up?
    const base = `http://127.0.0.1:${port}`;
    try {
        const r = await fetch(base + "/", { signal: AbortSignal.timeout(3000) });
        if (!r.ok) throw new Error("status " + r.status);
    } catch (e) {
        throw new Error(`no preview server at ${base} (${e.message}); start it: see README.md`);
    }

    const browserType = pw[opt.engine];
    if (!browserType) throw new Error("unknown engine " + opt.engine);
    const cells = (scenario.cells || [DEFAULT_CELL]).filter((c) => !opt.cell || c.tag === opt.cell);
    if (!cells.length) throw new Error("no cell " + opt.cell);
    let browser;
    const results = [];
    try {
        browser = await browserType.launch({ headless: true, args: launchArgs, ...(opt.engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
        for (const cell of cells) results.push(await runCell(browser, cell, base));
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
    for (const r of results) console.log(JSON.stringify(r));
}

async function runCell(browser, cellIn, base) {
    const cell = { ...DEFAULT_CELL, ...cellIn };
    const coarse = cell.pointer === "coarse";
    const dpr = opt.dpr || cell.dpr || (coarse ? 3 : 2);
    const ctxOpts = {
        viewport: { width: cell.w, height: cell.h },
        deviceScaleFactor: dpr,
        colorScheme: cell.scheme === "dark" ? "dark" : "light",
        reducedMotion: cell.reducedMotion ? "reduce" : "no-preference",
    };
    if (coarse && opt.engine !== "firefox") {
        ctxOpts.hasTouch = true;
        if (opt.engine === "chromium") ctxOpts.isMobile = true;
    }
    const tagBase = `${scenario.name}.${treeRow.tag}.${opt.engine}.${cell.tag}`;
    let context;
    const consoleErrors = [];
    try {
        context = await browser.newContext(ctxOpts);
        await context.addInitScript(SAMPLER);
        const page = await context.newPage();
        page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 300)));
        page.on("pageerror", (e) => consoleErrors.push("pageerror: " + String(e).slice(0, 300)));
        const q = new URLSearchParams({ c: opt.component });
        if (cell.scheme === "dark") q.set("scheme", "dark");
        const url = scenario.url ? base + scenario.url : `${base}/?${q}`;
        await page.goto(url, { waitUntil: "load" });
        if (!scenario.url) await page.waitForFunction(() => window.__animReady === true, null, { timeout: 15000 });
        const info = await page.evaluate(() => ({ info: window.__animInfo, error: window.__animError }));
        if (info.error) throw new Error("page error: " + info.error);
        if (scenario.ready) await page.waitForSelector(scenario.ready, { timeout: 10000 });
        await sleep(scenario.warmMs ?? 400);

        const cdp = opt.engine === "chromium" ? await context.newCDPSession(page) : null;
        const drv = driver(page, cdp, coarse);

        // Pre-steps run before recording (e.g. scroll into view, a first hover).
        for (const s of scenario.before || []) await drv.step(s);

        // Screencast (chromium): one frame per compositor frame that changed.
        const frames = [];
        let screencastOn = false;
        if (opt.strip && cdp) {
            cdp.on("Page.screencastFrame", (f) => {
                frames.push({ data: f.data, ts: f.metadata.timestamp, meta: f.metadata });
                cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
            });
            await cdp.send("Page.startScreencast", { format: opt.format, quality: opt.quality, everyNthFrame: 1 });
            screencastOn = true;
            await sleep(120);
        }
        let tracing = false;
        if (opt.trace && opt.engine === "chromium") {
            await browser.startTracing(page, {
                categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "blink.user_timing"],
            });
            tracing = true;
        }

        const start = await page.evaluate(
            ([track, h, anims]) => window.__sampler.start(track, { hook: h, anims }),
            [scenario.track, hook, scenario.anims !== false],
        );
        drv.t0 = start.t0;
        await sleep(50);
        for (const s of scenario.steps) await drv.step(s);
        const rec = await page.evaluate(() => window.__sampler.stop());

        let traceCounts = null;
        if (tracing) {
            const buf = await browser.stopTracing();
            traceCounts = traceToCounts(JSON.parse(buf.toString("utf8")), rec);
        }
        if (screencastOn) await cdp.send("Page.stopScreencast").catch(() => {});

        // Crop box: union of the crop selector's box over the recording, plus padding.
        const crop = await cropBox(page, rec, cell);
        const stripFiles = [];
        let screencast = null;
        if (screencastOn && frames.length) {
            screencast = matchFrames(frames, rec);
            const windows = stripWindows(screencast.inWindow, rec);
            for (const w of windows) {
                if (!w.frames.length) continue;
                const file = join(outDir, `${tagBase}.${w.name}.png`);
                await composeStrip(context, w.frames, crop, dpr, file, `${scenario.name} · ${treeRow.tag} · ${opt.engine} · ${cell.tag} · ${w.name}`);
                stripFiles.push(basename(file));
            }
        }

        const out = {
            meta: {
                scenario: scenario.name,
                component: opt.component,
                tree: treeRow.tag,
                sha,
                engine: opt.engine,
                browserVersion: browser.version(),
                cell: { ...cell, dpr },
                url,
                hook,
                browserArgs: launchArgs,
                page: info.info,
                drivenSteps: drv.log,
                consoleErrors,
                screencast: screencast && {
                    format: opt.format === "png" ? "png" : `jpeg q${opt.quality}`,
                    framesTotal: frames.length,
                    framesInMotion: screencast.inWindow.length,
                    rowsInMotion: screencast.rowsInWindow,
                    note: "CDP Page.screencast delivers one frame per compositor frame that changed; frames can be skipped when acks lag. framesInMotion / rowsInMotion is the coverage of this run.",
                },
                strips: stripFiles,
                crop,
                trace: traceCounts && traceCounts.summary,
                firstChange: rec.firstChange,
                lastChange: rec.lastChange,
                frameCount: rec.rows.length,
            },
            track: scenario.track,
            marks: rec.marks,
            rows: traceCounts ? mergeCounts(rec.rows, traceCounts.perRow) : rec.rows,
            ptrLog: rec.ptrLog,
            long: rec.long,
            loaf: rec.loaf,
            anims: rec.anims,
            analysis: scenario.analysis || {},
        };
        const rowsFile = join(outDir, `${tagBase}.rows.json`);
        writeFileSync(rowsFile, JSON.stringify(out));
        return {
            cell: cell.tag,
            rows: basename(rowsFile),
            strips: stripFiles,
            frames: rec.rows.length,
            firstChange: rec.firstChange,
            lastChange: rec.lastChange,
            screencast: out.meta.screencast && `${out.meta.screencast.framesInMotion}/${out.meta.screencast.rowsInMotion}`,
            consoleErrors: consoleErrors.length,
        };
    } finally {
        if (context) await context.close().catch(() => {});
    }
}

// ── input driver ────────────────────────────────────────────────────────────
function driver(page, cdp, coarse) {
    const d = { log: [], t0: 0, pos: { x: 0, y: 0 }, down: false };
    const box = (sel) =>
        page.evaluate((s) => {
            const e = document.querySelector(s);
            if (!e) return null;
            const r = e.getBoundingClientRect();
            return { x: r.x, y: r.y, w: r.width, h: r.height };
        }, sel);
    // A point: [x, y] | {sel, at:[fx, fy]} | {rel:[dx, dy]} (from the gesture's start)
    d.point = async (p, origin) => {
        if (Array.isArray(p)) return { x: p[0], y: p[1] };
        if (p.rel) return { x: origin.x + p.rel[0], y: origin.y + p.rel[1] };
        const b = await box(p.sel);
        if (!b) throw new Error("no element " + p.sel);
        const at = p.at || [0.5, 0.5];
        return { x: b.x + b.w * at[0] + (p.dx || 0), y: b.y + b.h * at[1] + (p.dy || 0) };
    };
    const touch = (type, x, y) =>
        cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1 }] });
    const useTouch = coarse && cdp;
    d.moveTo = async (x, y) => {
        if (useTouch && d.down) await touch("touchMove", x, y);
        else await page.mouse.move(x, y);
        d.pos = { x, y };
    };
    d.press = async (x, y) => {
        if (useTouch) await touch("touchStart", x, y);
        else {
            await page.mouse.move(x, y);
            await page.mouse.down();
        }
        d.pos = { x, y };
        d.down = true;
    };
    d.release = async () => {
        if (useTouch) await touch("touchEnd", d.pos.x, d.pos.y);
        else await page.mouse.up();
        d.down = false;
    };
    // Move along a straight segment at hz, on an absolute schedule.
    d.segment = async (to, ms, hz = 60) => {
        const from = { ...d.pos };
        const n = Math.max(1, Math.round((ms / 1000) * hz));
        const t0 = Date.now();
        for (let k = 1; k <= n; k++) {
            const f = k / n;
            await d.moveTo(from.x + (to.x - from.x) * f, from.y + (to.y - from.y) * f);
            const due = t0 + (k * 1000) / hz;
            const wait = due - Date.now();
            if (wait > 0) await sleep(wait);
        }
    };
    const mark = (name) => page.evaluate((n) => window.__sampler && window.__sampler.mark(n), name);

    d.step = async (s) => {
        const t = Date.now();
        switch (s.do) {
            case "mark":
                await mark(s.name);
                break;
            case "wait":
                await sleep(s.ms);
                break;
            case "settle": {
                // Wait until the tracked values have changed (unless afterChange:false) and
                // then stayed still for quietMs, or maxMs passes.
                const quiet = s.quietMs ?? 300,
                    max = s.maxMs ?? 4000,
                    need = s.afterChange !== false;
                const begin = await page.evaluate(() => performance.now());
                for (;;) {
                    const q = await page.evaluate(() => window.__sampler.quiet());
                    const changedSince = q.lastChange >= begin;
                    if ((changedSince || !need) && q.now - Math.max(q.lastChange, begin) >= quiet) break;
                    if (q.now - begin > max) {
                        d.log.push({ do: "settle", timeout: true, maxMs: max });
                        break;
                    }
                    await sleep(25);
                }
                break;
            }
            case "waitChange": {
                // Wait until any tracked value changes after this step starts (maxMs cap).
                const max = s.maxMs ?? 6000;
                const begin = await page.evaluate(() => performance.now());
                for (;;) {
                    const q = await page.evaluate(() => window.__sampler.quiet());
                    if (q.lastChange >= begin) break;
                    if (q.now - begin > max) {
                        d.log.push({ do: "waitChange", timeout: true, maxMs: max });
                        break;
                    }
                    await sleep(10);
                }
                break;
            }
            case "hover": {
                const p = await d.point(s);
                if (s.ms) await d.segment(p, s.ms, s.hz);
                else await d.moveTo(p.x, p.y);
                break;
            }
            case "move": {
                const p = await d.point(s.to, d.pos);
                if (s.ms) await d.segment(p, s.ms, s.hz);
                else await d.moveTo(p.x, p.y);
                break;
            }
            case "leave": {
                const p = await d.point(s.to || [4, 4], d.pos);
                if (s.ms) await d.segment(p, s.ms, s.hz);
                else await d.moveTo(p.x, p.y);
                break;
            }
            case "down": {
                const p = s.sel ? await d.point(s) : s.to ? await d.point(s.to, d.pos) : d.pos;
                await d.press(p.x, p.y);
                break;
            }
            case "up":
                await d.release();
                break;
            case "click": {
                const p = await d.point(s);
                if (useTouch) {
                    await d.press(p.x, p.y);
                    await d.release();
                } else if (coarse) {
                    // FOLD-2 (C2-9): a coarse cell taps. Without CDP (WebKit) the tap is
                    // Playwright's touchscreen; a mouse click here pinned the dock and the
                    // cell read a mouse press in a narrow window.
                    await page.touchscreen.tap(p.x, p.y);
                    d.pos = p;
                } else {
                    await page.mouse.click(p.x, p.y);
                    d.pos = p;
                }
                break;
            }
            case "key":
                await page.keyboard.press(s.key);
                break;
            case "keydown":
                await page.keyboard.down(s.key);
                break;
            case "keyup":
                await page.keyboard.up(s.key);
                break;
            case "focus":
                await page.evaluate((sel) => document.querySelector(sel)?.focus(), s.sel);
                break;
            case "drag": {
                // {from: point, path: [{to: point, ms}|{pause: ms}|{mark: name}], hz, release}
                const origin = await d.point(s.from);
                await d.press(origin.x, origin.y);
                if (s.markDown) await mark(s.markDown);
                for (const seg of s.path) {
                    if (seg.pause) await sleep(seg.pause);
                    else if (seg.mark) await mark(seg.mark);
                    else await d.segment(await d.point(seg.to, origin), seg.ms ?? 300, s.hz ?? 60);
                }
                if (s.release !== false) {
                    if (s.markUp) await mark(s.markUp);
                    await d.release();
                }
                break;
            }
            case "waitFraction": {
                // {as, ch, to: number | point-with-ch, fraction, from?, maxMs?}
                let to = s.to;
                if (typeof to === "object") {
                    const p = await d.point(to);
                    const b = to.sel ? await box(to.sel) : null;
                    const ch = to.ch || s.ch;
                    to = ch === "cy" ? p.y : ch === "x" && b ? b.x : ch === "y" && b ? b.y : ch === "w" && b ? b.w : ch === "h" && b ? b.h : p.x;
                }
                const r = await page.evaluate((a) => window.__sampler.waitFraction(a), {
                    as: s.as,
                    ch: s.ch,
                    to,
                    fraction: s.fraction,
                    from: s.from,
                    maxMs: s.maxMs,
                });
                d.log.push({ do: "waitFraction", ...r });
                break;
            }
            case "eval":
                await page.evaluate(s.js);
                break;
            case "scroll":
                await page.mouse.wheel(s.dx || 0, s.dy || 0);
                break;
            // PROTOTYPE-2: a window resize (G-2's resize cell).
            case "viewport":
                await page.setViewportSize({ width: s.w, height: s.h });
                break;
            default:
                throw new Error("unknown step " + JSON.stringify(s));
        }
        if (s.do !== "waitFraction") d.log.push({ do: s.do, ms: Date.now() - t });
    };
    return d;
}

// ── crop, frames, strips ────────────────────────────────────────────────────
async function cropBox(page, rec, cell) {
    const pad = scenario.cropPad ?? 16;
    let x0 = Infinity,
        y0 = Infinity,
        x1 = -Infinity,
        y1 = -Infinity;
    const asList = scenario.cropAs ? [].concat(scenario.cropAs) : null;
    for (const row of rec.rows) {
        for (const [k, o] of Object.entries(row.el)) {
            if (!o || !o.vis) continue;
            const key = k.split("#")[0];
            if (asList && !asList.includes(key)) continue;
            x0 = Math.min(x0, o.x);
            y0 = Math.min(y0, o.y);
            x1 = Math.max(x1, o.x + o.w);
            y1 = Math.max(y1, o.y + o.h);
        }
    }
    if (scenario.crop) {
        const b = await page.evaluate((s) => {
            const e = document.querySelector(s);
            if (!e) return null;
            const r = e.getBoundingClientRect();
            return { x: r.x, y: r.y, w: r.width, h: r.height };
        }, scenario.crop);
        if (b) {
            x0 = Math.min(x0, b.x);
            y0 = Math.min(y0, b.y);
            x1 = Math.max(x1, b.x + b.w);
            y1 = Math.max(y1, b.y + b.h);
        }
    }
    if (!Number.isFinite(x0)) return { x: 0, y: 0, w: cell.w, h: cell.h };
    x0 = Math.max(0, Math.floor(x0 - pad));
    y0 = Math.max(0, Math.floor(y0 - pad));
    x1 = Math.min(cell.w, Math.ceil(x1 + pad));
    y1 = Math.min(cell.h, Math.ceil(y1 + pad));
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

// Screencast timestamps are wall-clock seconds; rows are page time from t0.
function matchFrames(frames, rec) {
    const toPage = (ts) => ts * 1000 - rec.timeOrigin - rec.t0;
    const rows = rec.rows;
    const all = frames.map((f) => {
        const t = toPage(f.ts);
        // the last row sampled at or before this frame's time
        let row = null;
        for (let i = rows.length - 1; i >= 0; i--)
            if (rows[i].now <= t + 1) {
                row = rows[i];
                break;
            }
        return { ...f, t, row: row ? row.i : null };
    });
    const a = rec.firstChange ?? 0,
        b = (rec.lastChange ?? 0) + 300;
    const inWindow = all.filter((f) => f.t >= a - 34 && f.t <= b);
    const rowsInWindow = rows.filter((r) => r.now >= a && r.now <= (rec.lastChange ?? 0)).length;
    return { all, inWindow, rowsInWindow };
}

// Motion segments: runs of changed rows separated by at least gapMs of stillness.
function segments(rows, gapMs = 250) {
    const segs = [];
    let cur = null;
    for (const r of rows) {
        if (!r.changed) continue;
        if (cur && r.now - cur.endT <= gapMs) {
            cur.end = r.i;
            cur.endT = r.now;
        } else {
            cur = { start: r.i, end: r.i, startT: r.now, endT: r.now };
            segs.push(cur);
        }
    }
    return segs;
}

function stripWindows(frames, rec) {
    const n = opt.frames;
    const out = [];
    if (!frames.length) return out;
    const segs = segments(rec.rows, scenario.gapMs ?? 250).slice(0, 4);
    segs.forEach((s, k) => {
        const name = segs.length === 1 ? "" : `seg${k + 1}.`;
        const inSeg = frames.filter((f) => f.t >= s.startT - 34 && f.t <= s.endT + 34);
        if (!inSeg.length) return;
        out.push({ name: name + "start", frames: inSeg.slice(0, n) });
        if (inSeg.length > n) out.push({ name: name + "end", frames: inSeg.slice(-n) });
    });
    // Extra strips: {name, fromMark, n} start at a mark's time.
    for (const s of scenario.strips || []) {
        const m = rec.marks.find((k) => k.name === s.fromMark);
        if (!m) continue;
        out.push({ name: s.name, frames: frames.filter((f) => f.t >= m.t - 17).slice(0, s.n || n) });
    }
    return out;
}

const COMPOSE_HTML = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#fff">
<canvas id="c"></canvas><script>
window.compose = async ({ n, crop, dpr, maxW, title, labels }) => {
  const imgs = await Promise.all(Array.from({ length: n }, (_, i) => new Promise((res, rej) => {
    const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = '/frame/' + i + '.png';
  })));
  const sx = imgs[0].naturalWidth / innerWidthCss;
  const srcW = Math.round(crop.w * dpr), srcH = Math.round(crop.h * dpr);
  const gap = 6, band = 16, head = 20;
  let scale = Math.min(1, (maxW - 2 * gap) / srcW);
  const tw = Math.round(srcW * scale), th = Math.round(srcH * scale);
  const cols = Math.max(1, Math.floor((maxW - gap) / (tw + gap)));
  const rows = Math.ceil(n / cols);
  const c = document.getElementById('c');
  c.width = Math.min(maxW, cols * (tw + gap) + gap); c.height = head + rows * (th + band + gap) + gap;
  const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = '#222'; g.font = '12px ui-monospace, Menlo, monospace'; g.fillText(title, gap, 14);
  imgs.forEach((im, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = gap + col * (tw + gap), y = head + row * (th + band + gap);
    g.fillStyle = '#333'; g.font = '11px ui-monospace, Menlo, monospace'; g.fillText(labels[i], x, y + 11);
    const k = im.naturalWidth / (innerWidthCss * dpr);
    g.drawImage(im, crop.x * dpr * k, crop.y * dpr * k, srcW * k, srcH * k, x, y + band, tw, th);
    g.strokeStyle = '#ddd'; g.strokeRect(x - 0.5, y + band - 0.5, tw + 1, th + 1);
  });
  return c.toDataURL('image/png');
};
</script>`;

async function composeStrip(context, frames, crop, dpr, file, title) {
    const page = await context.newPage();
    try {
        await page.route("http://anim.local/**", (route) => {
            const u = new URL(route.request().url());
            const m = u.pathname.match(/^\/frame\/(\d+)\.png$/);
            if (m) return route.fulfill({ contentType: opt.format === "png" ? "image/png" : "image/jpeg", body: Buffer.from(frames[+m[1]].data, "base64") });
            return route.fulfill({ contentType: "text/html", body: COMPOSE_HTML });
        });
        await page.goto("http://anim.local/compose.html");
        const t0 = frames[0].t;
        const labels = frames.map((f, i) => `f${f.row ?? "?"} ${f.t.toFixed(1)}ms${i ? ` +${(f.t - frames[i - 1].t).toFixed(1)}` : ""}`);
        const deviceWidth = frames[0].meta.deviceWidth;
        await page.evaluate((w) => (window.innerWidthCss = w), deviceWidth);
        const url = await page.evaluate((a) => window.compose(a), { n: frames.length, crop, dpr, maxW: 1200, title, labels });
        writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));
        void t0;
    } finally {
        await page.close().catch(() => {});
    }
}

// ── trace → per-frame layout counts ─────────────────────────────────────────
function traceToCounts(trace, rec) {
    const ev = trace.traceEvents || trace;
    const mark = ev.find((e) => e.name === "anim:start" && (e.cat || "").includes("blink.user_timing"));
    if (!mark) return { summary: { error: "no anim:start mark in trace" }, perRow: [] };
    const { pid, tid } = mark;
    // trace ts is microseconds; the mark's page time is 0 (t0)
    const off = mark.ts / 1000;
    const kinds = { Layout: "layout", UpdateLayoutTree: "style", Paint: "paint", PrePaint: "prepaint" };
    const hits = ev
        .filter((e) => e.pid === pid && e.tid === tid && kinds[e.name] && (e.ph === "X" || e.ph === "B"))
        .map((e) => ({ k: kinds[e.name], t: e.ts / 1000 - off, dur: (e.dur || 0) / 1000 }));
    const rows = rec.rows;
    const perRow = rows.map(() => ({ layout: 0, style: 0, paint: 0, prepaint: 0, layoutMs: 0 }));
    for (const h of hits) {
        let k = rows.findIndex((r) => r.now >= h.t);
        if (k < 0) continue;
        perRow[k][h.k]++;
        if (h.k === "layout") perRow[k].layoutMs += h.dur;
    }
    const sum = (k) => perRow.reduce((a, r) => a + r[k], 0);
    return {
        perRow,
        summary: {
            layouts: sum("layout"),
            styles: sum("style"),
            paints: sum("paint"),
            framesWithLayout: perRow.filter((r) => r.layout > 0).length,
            frames: rows.length,
            note: "counted on the page's main thread between consecutive rows; hook raf (the sampler adds no layout of its own; a layout forced by its reads only happens when something already dirtied layout)",
        },
    };
}
function mergeCounts(rows, perRow) {
    return rows.map((r, i) => ({ ...r, lc: perRow[i] }));
}

main().catch((e) => {
    console.error("probe failed:", e.message);
    process.exit(1);
});
