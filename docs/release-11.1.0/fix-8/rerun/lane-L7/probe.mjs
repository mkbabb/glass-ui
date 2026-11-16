// Lane L7 witness probe: HandMark's draw on a compositor property, and its `drawn` event.
//
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label> <tree:green|red> [cells]
//
// One browser per run, a new context per cell, every context and the browser closed in
// `finally`. Chromium is Playwright's headless shell; WebKit is build 2287, pinned by
// executablePath as the earlier lanes do. Paint is read from the page's own screencast:
// its frames come from the compositor, so they keep arriving while the main thread is
// blocked, and they are what a reader sees. Writes <out-dir>/<label>-<engine>.json and
// cropped paint to png/.
import { chromium, webkit } from "playwright";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
// Playwright's own bundled image codecs (pngjs, jpeg-js), by file path: the package
// exports map does not list the bundle.
const { PNG, jpegjs } = require(join(dirname(require.resolve("playwright-core")), "lib/utilsBundle.js"));

const [engineName, base, outDir, label, tree = "green", only = ""] = process.argv.slice(2);
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });

const WEBKIT_2287 = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
const launch = () =>
    engineName === "webkit"
        ? webkit.launch(existsSync(WEBKIT_2287) ? { executablePath: WEBKIT_2287 } : {})
        : chromium.launch();

const PATH = "/docs/release-11.1.0/lane-L7/harness/index.html";
const WIDTHS = [390, 1440];
const THEMES = ["light", "dark"];
const SHAPES = ["underline", "strike", "highlight", "circle"];
const HEIGHT = 600;
const THROTTLE = 4;
const TASK_MS = Number(process.env.L7_TASK_MS ?? 50);
const results = { engine: engineName, label, tree, base, throttle: engineName === "chromium" ? THROTTLE : null, cells: [] };
const verdicts = [];
const verdict = (item, cell, pass, detail) => verdicts.push({ item, cell, pass, detail });

async function open(browser, { width, theme, query, reducedMotion = "no-preference", media = "screen", throttle = false }) {
    const context = await browser.newContext({
        viewport: { width, height: HEIGHT },
        deviceScaleFactor: 1,
        colorScheme: theme,
        reducedMotion,
    });
    const page = await context.newPage();
    await page.emulateMedia({ media, reducedMotion, colorScheme: theme });
    if (throttle && engineName === "chromium") {
        const cdp = await context.newCDPSession(page);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: THROTTLE });
    }
    await page.goto(`${base}${PATH}?${query}&theme=${theme}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    return { context, page };
}

// ── in-page: the draw's own animations (not the opacity settle) ───────────────────────
const DRAW_ANIMS = `() => {
    const host = document.querySelector('[data-probe="mark"]') ?? document.querySelector(".hm");
    if (!host) return [];
    return host.getAnimations({ subtree: true }).filter((a) => {
        const kf = a.effect?.getKeyframes?.() ?? [];
        return kf.some((k) => "transform" in k || "strokeDashoffset" in k || "clipPath" in k);
    });
}`;

/** Mount the mark, wait until its draw is under way, then block the main thread. */
async function mountAndBlock(page) {
    return page.evaluate(
        async ({ DA, TASK_MS }) => {
            const drawAnims = eval(DA);
            const now = () => performance.timeOrigin + performance.now();
            const tMount = now();
            window.__mount();
            const raf = () => new Promise((r) => requestAnimationFrame(r));
            let anims = [];
            for (let i = 0; i < 300; i++) {
                await raf();
                anims = drawAnims().filter((a) => a.playState === "running");
                const lead = anims[0];
                if (lead) {
                    const delay = lead.effect.getTiming().delay || 0;
                    if ((lead.currentTime ?? 0) - delay >= 40) break;
                }
            }
            // Marker A paints in this frame: the last frame before the task. The task then
            // runs as the next task, before any new main-thread frame. It sets marker B
            // first, which can only paint once the task ends, so every frame that still
            // shows A after A's own first frame was produced while the main thread was blocked.
            window.__marker("rgb(255, 0, 0)");
            await new Promise((r) => setTimeout(r, 0));
            window.__marker("rgb(0, 0, 255)");
            const props = [...new Set(anims.flatMap((a) => a.effect.getKeyframes().flatMap((k) => Object.keys(k))))].filter(
                (k) => !["offset", "computedOffset", "easing", "composite"].includes(k),
            );
            const ct0 = anims.map((a) => a.currentTime);
            const t0 = now();
            const s = performance.now();
            while (performance.now() - s < TASK_MS) {
                /* the injected main-thread task */
            }
            const t1 = now();
            const ct1 = anims.map((a) => a.currentTime);
            const timing = anims.map((a) => {
                const t = a.effect.getComputedTiming();
                return { duration: t.duration, delay: t.delay, easing: a.effect.getTiming().easing, name: a.animationName ?? null };
            });
            const sp = getComputedStyle(document.querySelector('[data-probe="spring"]'));
            const drawEl = document.querySelector(".hm-reveal") ?? document.querySelector(".hm-guide");
            const spring = {
                duration: parseFloat(sp.animationDuration) * (sp.animationDuration.endsWith("ms") ? 1 : 1000),
                easing: sp.animationTimingFunction,
                drawEasing: drawEl ? getComputedStyle(drawEl).animationTimingFunction : null,
            };
            return { tMount, t0, t1, props, ct0, ct1, timing, spring, count: anims.length };
        },
        { DA: DRAW_ANIMS, TASK_MS },
    );
}

/** The mark's painted region: the union of its ink paths, padded. */
async function markRegion(page, sel = '[data-probe="mark"]') {
    return page.evaluate((s) => {
        const host = document.querySelector(s);
        const rs = [...host.querySelectorAll("path.hm-ink")].map((p) => p.getBoundingClientRect());
        const x0 = Math.min(...rs.map((r) => r.left)) - 6;
        const y0 = Math.min(...rs.map((r) => r.top)) - 6;
        const x1 = Math.max(...rs.map((r) => r.right)) + 6;
        const y1 = Math.max(...rs.map((r) => r.bottom)) + 6;
        return { x: Math.max(0, Math.floor(x0)), y: Math.max(0, Math.floor(y0)), width: Math.ceil(x1 - x0), height: Math.ceil(y1 - y0) };
    }, sel);
}

function decode(frame) {
    const img = jpegjs.decode(frame.data, { useTArray: true });
    return { width: img.width, height: img.height, data: img.data, scale: img.width / frame.viewportWidth };
}

function crop(img, r) {
    const s = img.scale;
    const x0 = Math.round(r.x * s), y0 = Math.round(r.y * s);
    const w = Math.min(img.width - x0, Math.round(r.width * s)), h = Math.min(img.height - y0, Math.round(r.height * s));
    const out = new PNG({ width: w, height: h });
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            const i = ((y0 + y) * img.width + x0 + x) * 4, o = (y * w + x) * 4;
            out.data[o] = img.data[i]; out.data[o + 1] = img.data[i + 1]; out.data[o + 2] = img.data[i + 2]; out.data[o + 3] = 255;
        }
    return out;
}

/** The corner marker's state in a frame: A (red, before the task), B (blue, after), C (green, drawn). */
function markerOf(img) {
    const s = img.scale, x = Math.round(10 * s), y = Math.round(10 * s);
    const i = (y * img.width + x) * 4;
    const [r, g, b] = [img.data[i], img.data[i + 1], img.data[i + 2]];
    if (r > 180 && g < 90 && b < 90) return "A";
    if (b > 180 && r < 90 && g < 90) return "B";
    if (g > 140 && r < 90 && b < 90) return "C";
    return "-";
}

function diffCount(a, b, threshold = 48) {
    let n = 0;
    const len = Math.min(a.data.length, b.data.length);
    for (let i = 0; i < len; i += 4) {
        const d = Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2]));
        if (d > threshold) n++;
    }
    return n;
}

// ── item 1: the draw keeps painting through a long main-thread task ──────────────────
async function stallCell(browser, width, theme, shape) {
    const cell = `${width}-${theme}-${shape}`;
    const { context, page } = await open(browser, { width, theme, query: `scene=draw&shape=${shape}`, throttle: true });
    const frames = [];
    try {
        await page.screencast.start({
            onFrame: (f) => frames.push({ ts: f.timestamp, data: f.data, viewportWidth: f.viewportWidth, at: Date.now() }),
            size: { width, height: HEIGHT },
            quality: 90,
        });
        await page.waitForTimeout(400);
        const before = frames.length;
        const run = await mountAndBlock(page);
        await page.waitForTimeout(1500);
        await page.screencast.stop();
        const region = await markRegion(page);
        const drawn = await page.evaluate(() => window.__drawn.slice());
        const drawnInfo = await page.evaluate(() => window.__drawnInfo ?? null);

        // Frames are placed by the paint marker, not by any clock (WebKit stamps its frames
        // on a monotonic clock of its own).
        const ref = decode(frames[Math.max(0, before - 1)]);
        const refCrop = crop(ref, region);
        const fin = crop(decode(frames[frames.length - 1]), region);
        const full = diffCount(fin, refCrop) || 1;
        const CTL = { x: 30, y: 0, width: 220, height: 20 };
        const seq = frames.map((f, i) => {
            const img = decode(f);
            const c = crop(img, region);
            return { i, t: f.ts, m: markerOf(img), p: diffCount(c, refCrop) / full, c, ctl: crop(img, CTL) };
        });
        const aFrames = seq.filter((s) => s.m === "A");
        // aFrames[0] is the last frame before the task; every later A frame is inside it.
        const inTask = aFrames.slice(1);
        const first = aFrames[0], last = aFrames[aFrames.length - 1];
        const rise = inTask.length >= 1 ? last.p - first.p : 0;
        // The control square moved inside the task: the screencast sees compositor frames there.
        const controlMoved = first ? inTask.some((s) => diffCount(s.ctl, first.ctl) > 20) : false;
        // The cell asks for TWO compositor frames inside the task (orchestrator ruling after
        // fix 7): one frame can land at the task's edge and read the stroke before it moved,
        // so it cannot tell a stalled draw from a running one.
        const measurable = inTask.length >= 2 && controlMoved;
        const pass = measurable && rise >= 0.05;
        // The ring keeps the dashoffset draw (no straight edge follows a ring); its reading
        // is recorded, not gated. A cell whose screencast saw fewer than two compositor
        // frames inside the task cannot answer the question either way, and is recorded as
        // unmeasurable.
        const item = shape === "circle"
            ? "stall (ring, dashoffset kept: recorded, not gated)"
            : !measurable
              ? "stall: unmeasurable, the screencast saw fewer than two compositor frames inside the task (recorded, not gated)"
              : `stall: paint advances through a ${TASK_MS} ms main-thread task`;
        verdict(item, cell, pass, {
            framesInTask: inTask.length,
            controlMoved,
            progressAtTaskStart: first ? +first.p.toFixed(3) : null,
            progressInTask: inTask.map((s) => +s.p.toFixed(3)),
            progressFirstFrameAfterTask: seq.find((s) => s.m === "B") ? +seq.find((s) => s.m === "B").p.toFixed(3) : null,
            rise: +rise.toFixed(3),
            task: { ms: +(run.t1 - run.t0).toFixed(1) },
            animatedProps: run.props,
            animCurrentTime: { atTaskStart: run.ct0, atTaskEnd: run.ct1 },
        });
        // The draw rides the compositor (transform alone), on the `present` clock.
        if (shape !== "circle" || tree === "green") {
            const onlyTransform = run.props.length > 0 && run.props.every((k) => k === "transform");
            const clock = run.timing.length > 0 && run.timing.every((t) => Math.abs(t.duration - run.spring.duration) < 0.5) && run.spring.drawEasing === run.spring.easing;
            verdict(shape === "circle" ? "ring: dashoffset on the present clock" : "compositor property (transform alone) on the present clock", cell,
                shape === "circle" ? run.props.join() === "strokeDashoffset" && clock : onlyTransform && clock,
                { props: run.props, durations: run.timing.map((t) => t.duration), spring: run.spring });
        }
        // A strip of what the reader saw across the task, cropped to the mark.
        const strip = [first, ...inTask, seq.find((s) => s.m === "B")].filter(Boolean);
        for (const s of seq) delete s.ctl;
        strip.forEach((s, k) => writeFileSync(join(pngDir, `${label}-${engineName}-stall-${cell}-${k}.png`), PNG.sync.write(s.c)));

        // item 2: `drawn` fires once, after the last stroke frame.
        if (tree === "green" || shape === "underline") {
            // `drawn` turns the marker green (C). After the last stroke frame: the stroke is
            // whole (≥ 99 % of its final ink) in C's first frame and in every frame after it.
            const c0 = seq.findIndex((s) => s.m === "C");
            let lastChange = null;
            for (let k = 1; k < seq.length; k++) if (Math.abs(seq[k].p - seq[k - 1].p) > 0.002) lastChange = k;
            // From C on the stroke stays whole: the ink's antialias moves by about 2 % once the
            // layers settle, on the ring as on the strokes, so a stable pixel count is not the test.
            const settled = c0 > 0 && seq.slice(c0).every((s) => s.p >= 0.99);
            const wholeBefore = c0 > 0 ? seq[c0 - 1].p : null;
            const ok = drawn.length === 1 && drawnInfo && drawnInfo.running === 0 && drawnInfo.final === true
                && c0 > 0 && settled;
            verdict("drawn: once, after the last stroke frame", cell, ok, {
                count: drawn.length,
                running: drawnInfo?.running ?? null,
                finalAtDrawn: drawnInfo?.final ?? null,
                lastStrokeChangeFrame: lastChange,
                progressBeforeDrawn: wholeBefore != null ? +wholeBefore.toFixed(3) : null,
                firstFrameAfterDrawn: c0,
                progressFromDrawnOn: c0 >= 0 ? seq.slice(c0).map((s) => +s.p.toFixed(3)) : null,
            });
        }
        results.cells.push({ cell, kind: "stall", run: { ...run }, region, frames: frames.length, framesBefore: before, seq: seq.map(({ i, t, m, p }) => ({ i, t, m, p: +p.toFixed(3) })) });
    } finally {
        await context.close();
    }
}

// ── item 2b: `drawn` at once under reduced motion and print ───────────────────────────
async function stillCell(browser, width, theme, mode, shape, inView) {
    const cell = `${width}-${theme}-${mode}-${shape}${inView ? "-in-view-below-fold" : ""}`;
    const opts = mode === "reduced-motion" ? { reducedMotion: "reduce" } : { media: "print" };
    const query = `scene=draw&shape=${shape}${inView ? "&trigger=in-view&fold=1" : ""}`;
    const { context, page } = await open(browser, { width, theme, query, ...opts });
    try {
        const r = await page.evaluate(async (DA) => {
            const drawAnims = eval(DA);
            const t = performance.now();
            window.__mount();
            const raf = () => new Promise((res) => requestAnimationFrame(res));
            await raf();
            // Final at frame 0: no draw animation runs, every window and frame sits home, and
            // the ring's dash is closed.
            const host = document.querySelector('[data-probe="mark"]');
            const home = (el) => ["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(getComputedStyle(el).transform);
            const atFrame0 = {
                drawn: window.__drawn.length,
                running: drawAnims().filter((a) => a.playState === "running").length,
                home: [...host.querySelectorAll(".hm-reveal, .hm-mark")].every(home),
                guidesClosed: [...host.querySelectorAll(".hm-guide")].every((g) => {
                    const cs = getComputedStyle(g);
                    return parseFloat(cs.strokeDashoffset) === 0;
                }),
                ink: host.getAttribute("data-ink"),
            };
            await new Promise((res) => setTimeout(res, 800));
            return { atFrame0, count: window.__drawn.length, after: window.__drawn[0] != null ? +(window.__drawn[0] - t).toFixed(1) : null };
        }, DRAW_ANIMS);
        const f = r.atFrame0;
        const pass = f.drawn === 1 && r.count === 1 && f.running === 0 && f.home && f.guidesClosed;
        verdict(`final at frame 0 and drawn immediately under ${mode}`, cell, pass, r);
        if (inView) await page.locator('[data-probe="mark"]').evaluate((el) => el.scrollIntoView({ block: "center" }));
        const region = await markRegion(page);
        await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${cell}.png`), clip: region });
    } finally {
        await context.close();
    }
}

// ── item 3: the look at rest (compared across trees by compare.mjs) ──────────────────
async function restCell(browser, width, theme) {
    const cell = `${width}-${theme}`;
    const { context, page } = await open(browser, { width, theme, query: "scene=rest" });
    try {
        await page.waitForTimeout(1500);
        const regions = {};
        for (const s of SHAPES) {
            const region = await markRegion(page, `[data-probe="mark-${s}"]`);
            regions[s] = region;
            await page.screenshot({ path: join(pngDir, `${label}-${engineName}-rest-${cell}-${s}.png`), clip: region });
        }
        results.cells.push({ cell, kind: "rest", regions });
    } finally {
        await context.close();
    }
}

const browser = await launch();
try {
    // Warm the dev server (its first load optimizes dependencies) before any throttled cell.
    {
        const context = await browser.newContext();
        try {
            const page = await context.newPage();
            await page.goto(`${base}${PATH}?scene=rest`, { waitUntil: "load" });
            await page.waitForFunction(() => window.__ready === true, null, { timeout: 120_000 });
        } finally {
            await context.close();
        }
    }
    for (const width of WIDTHS)
        for (const theme of THEMES) {
            if (only && only !== "rest")
                for (const s of only.split(",")) await stallCell(browser, width, theme, s);
            if (!only) {
                for (const s of SHAPES) await stallCell(browser, width, theme, s);
                for (const m of ["reduced-motion", "print"])
                    for (const s of ["underline", "circle"])
                        for (const inView of [false, true]) await stillCell(browser, width, theme, m, s, inView);
            }
            if (!only || only === "rest") await restCell(browser, width, theme);
        }
} finally {
    await browser.close();
}

results.verdicts = verdicts;
const failed = verdicts.filter((v) => !v.pass && !v.item.includes("recorded, not gated"));
results.summary = { total: verdicts.length, passed: verdicts.length - failed.length };
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify(results, null, 2));
const byItem = {};
for (const v of verdicts) (byItem[v.item] ??= []).push(v.pass);
for (const [k, v] of Object.entries(byItem)) console.log(`${v.filter(Boolean).length}/${v.length}  ${k}`);
console.log(`${label} ${engineName}: ${results.summary.passed}/${results.summary.total}`);
process.exit(failed.length ? 1 : 0);
