// The draw under load, one harness for every candidate.   stall.mjs <engine> <out> ctl=<url> a=<url> b=<url>
// Lane L7's instrument, as both proposals used it: mount one mark, wait until its draw is 40 ms
// in, block the main thread for 50 ms. Chromium runs at a 4x CPU throttle. Paint is read from
// the page's screencast (compositor frames); frames are placed by a corner marker (A = before
// and during the task, B = first after, C = drawn); a control square on a plain transform
// proves the screencast sees compositor frames inside the task, else the cell is unmeasurable.
// Chromium also runs a traced pass: main-thread Layout / style / paint events between draw
// start and `drawn`, the display frames, and each animation's compositor verdict.
import { mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { PNG, jpegjs, launch, open } from "./lib.mjs";

const [engine, out, ...cands] = process.argv.slice(2);
const C = Object.fromEntries(cands.map((s) => s.split("=")));
const png = join(out, "png");
mkdirSync(png, { recursive: true });
const W = 1440, H = 700, THROTTLE = 4, TASK_MS = 50;
const CASES = [["h85", "underline"], ["h85", "highlight"], ["atlas42", "underline"]];
const rec = { engine, throttle: engine === "chromium" ? THROTTLE : null, taskMs: TASK_MS, cells: [], traces: [] };

const decode = (f) => { const img = jpegjs.decode(f.data, { useTArray: true }); return { ...img, scale: img.width / f.viewportWidth }; };
function crop(img, r) {
    const s = img.scale, x0 = Math.max(0, Math.round(r.x * s)), y0 = Math.max(0, Math.round(r.y * s));
    const w = Math.min(img.width - x0, Math.round(r.width * s)), h = Math.min(img.height - y0, Math.round(r.height * s));
    const o = new PNG({ width: w, height: h });
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = ((y0 + y) * img.width + x0 + x) * 4, k = (y * w + x) * 4;
        o.data[k] = img.data[i]; o.data[k + 1] = img.data[i + 1]; o.data[k + 2] = img.data[i + 2]; o.data[k + 3] = 255;
    }
    return o;
}
function markerOf(img) {
    const s = img.scale, i = (Math.round(10 * s) * img.width + Math.round(10 * s)) * 4;
    const [r, g, b] = [img.data[i], img.data[i + 1], img.data[i + 2]];
    return r > 180 && g < 90 && b < 90 ? "A" : b > 180 && r < 90 && g < 90 ? "B" : g > 140 && r < 90 && b < 90 ? "C" : "-";
}
function diff(a, b, th = 48) {
    let n = 0;
    for (let i = 0; i < Math.min(a.data.length, b.data.length); i += 4)
        if (Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2])) > th) n++;
    return n;
}

const mountAndBlock = (page) => page.evaluate(async (TASK_MS) => {
    const anims = () => (document.querySelector('[data-probe="mark"]')?.getAnimations({ subtree: true }) ?? []).filter((a) => a.playState === "running");
    const raf = () => new Promise((r) => requestAnimationFrame(r));
    window.__mount();
    let run = [];
    for (let i = 0; i < 400; i++) {
        await raf();
        run = anims();
        const lead = run.find((a) => (a.effect.getComputedTiming().delay || 0) === 0) ?? run[0];
        if (lead && (lead.currentTime ?? 0) >= 40) break;
    }
    window.__marker("rgb(255, 0, 0)");
    await new Promise((r) => setTimeout(r, 0));
    window.__marker("rgb(0, 0, 255)");
    const was = window.__phase;
    window.__phase = "probe";
    const props = [...new Set(run.flatMap((a) => a.effect.getKeyframes().flatMap((k) => Object.keys(k))))].filter((k) => !["offset", "computedOffset", "easing", "composite"].includes(k));
    window.__phase = was;
    const before = window.__reads.length;
    performance.mark("ab-task");
    const s = performance.now();
    while (performance.now() - s < TASK_MS) { /* the injected task */ }
    const taskMs = performance.now() - s;
    const inTask = window.__reads.length - before;
    return { props, taskMs, readsInTask: inTask, running: run.length };
}, TASK_MS);

const region = (page) => page.evaluate(() => {
    window.__phase = "probe";
    const host = document.querySelector('[data-probe="mark"]');
    const fs = parseFloat(getComputedStyle(host).fontSize);
    const rs = [...host.getClientRects()];
    const x0 = Math.min(...rs.map((r) => r.left)) - 0.4 * fs, y0 = Math.min(...rs.map((r) => r.top)) - 0.1 * fs;
    const x1 = Math.max(...rs.map((r) => r.right)) + 0.4 * fs, y1 = Math.max(...rs.map((r) => r.bottom)) + 0.2 * fs;
    const by = {};
    for (const r of window.__reads) if (r.phase !== "probe") (by[r.phase] ??= {}), (by[r.phase][r.api] = (by[r.phase][r.api] ?? 0) + 1);
    return { region: { x: Math.floor(x0), y: Math.floor(y0), width: Math.ceil(x1 - x0), height: Math.ceil(y1 - y0) }, reads: by, drawn: window.__draw.drawn.length, lines: rs.length };
});

async function cell(browser, c, row, shape) {
    const name = `${c}-${row}-${shape}`;
    const { context, page, errors } = await open(browser, `${C[c]}/ab/index.html?scene=one&row=${row}&shape=${shape}&defer=1&theme=light`, { width: W, height: H, dpr: 1 });
    const frames = [];
    try {
        if (engine === "chromium") await (await context.newCDPSession(page)).send("Emulation.setCPUThrottlingRate", { rate: THROTTLE });
        await page.screencast.start({ onFrame: (f) => frames.push({ data: f.data, viewportWidth: f.viewportWidth }), size: { width: W, height: H }, quality: 90 });
        await page.waitForTimeout(500);
        const before = frames.length;
        const run = await mountAndBlock(page);
        await page.waitForTimeout(1500);
        await page.screencast.stop();
        const after = await region(page);
        const ref = crop(decode(frames[Math.max(0, before - 1)]), after.region);
        const fin = crop(decode(frames[frames.length - 1]), after.region);
        const full = diff(fin, ref) || 1;
        const CTL = { x: 30, y: 0, width: 220, height: 20 };
        const seq = frames.map((f, i) => { const img = decode(f); const k = crop(img, after.region); return { i, m: markerOf(img), p: diff(k, ref) / full, c: k, ctl: crop(img, CTL) }; });
        const a = seq.filter((s) => s.m === "A");
        const inTask = a.slice(1);
        const first = a[0], last = a[a.length - 1];
        const controlMoved = first ? inTask.some((s) => diff(s.ctl, first.ctl) > 20) : false;
        const b = seq.find((s) => s.m === "B");
        const strip = [first, ...inTask, b].filter(Boolean);
        strip.forEach((s, k) => writeFileSync(join(png, `stall-${engine}-${name}-${k}.png`), PNG.sync.write(s.c)));
        rec.cells.push({
            cell: name, lines: after.lines, errors: errors.slice(0, 3),
            animatedProperties: run.props, runningAtTask: run.running,
            taskMs: +run.taskMs.toFixed(1), readsInsideTask: run.readsInTask,
            framesInsideTask: inTask.length, controlMovedInsideTask: controlMoved,
            measurable: controlMoved && inTask.length > 0,
            progressAtTaskStart: first ? +first.p.toFixed(3) : null,
            progressInsideTask: inTask.map((s) => +s.p.toFixed(3)),
            progressFirstFrameAfter: b ? +b.p.toFixed(3) : null,
            rise: inTask.length ? +(last.p - first.p).toFixed(3) : 0,
            drawnEvents: after.drawn, reads: after.reads,
        });
        console.log(JSON.stringify(rec.cells.at(-1)).slice(0, 600));
    } finally {
        await context.close();
    }
}

async function traced(browser, c, row, shape) {
    const { context, page } = await open(browser, `${C[c]}/ab/index.html?scene=one&row=${row}&shape=${shape}&defer=1&theme=light`, { width: W, height: H, dpr: 1 });
    const path = join(out, `trace-${engine}-${c}-${row}-${shape}.json`);
    try {
        await (await context.newCDPSession(page)).send("Emulation.setCPUThrottlingRate", { rate: THROTTLE });
        await browser.startTracing(page, { path, categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "blink.user_timing", "cc", "viz", "blink", "blink.animations"] });
        await page.waitForTimeout(300);
        await mountAndBlock(page);
        await page.waitForTimeout(1200);
        await browser.stopTracing();
        const ev = JSON.parse(readFileSync(path, "utf8")).traceEvents;
        const mk = (n) => ev.filter((e) => e.name === n && (e.cat ?? "").includes("blink.user_timing")).map((e) => e.ts).sort((x, y) => x - y);
        const tMount = mk("ab-mount").at(-1), tDraw = mk("ab-draw-start")[0], tDrawn = mk("ab-drawn")[0], tTask = mk("ab-task")[0];
        const main = ev.find((e) => e.name === "ab-mount")?.tid;
        const count = (from, to) => {
            const by = {};
            for (const e of ev) {
                if (!(e.ts >= from && e.ts <= to) || !e.name || e.ph === "E") continue;
                const key = `${e.tid === main ? "main" : "other"}:${e.name}`;
                if (!/^(main:(Layout|UpdateLayoutTree|PrePaint|Paint|Layerize|Commit|TimerFire|FireAnimationFrame|IntersectionObserverController::computeIntersections|HitTest)|other:(Display::DrawAndSwap))$/.test(key)) continue;
                const b = (by[key] ??= { n: 0, ms: 0 });
                b.n++; b.ms += (e.dur ?? 0) / 1000;
            }
            for (const k in by) by[k].ms = +by[k].ms.toFixed(2);
            return by;
        };
        const draws = ev.filter((e) => e.name === "Display::DrawAndSwap" && e.ph !== "E" && e.ts >= tDraw && e.ts <= tDrawn).map((e) => e.ts).sort((x, y) => x - y);
        const gaps = draws.slice(1).map((t, i) => +((t - draws[i]) / 1000).toFixed(1));
        const inTaskFrames = tTask ? draws.filter((t) => t > tTask && t < tTask + TASK_MS * 1000).length : null;
        // Each animation's compositor verdict (devtools.timeline "Animation" events).
        const verdicts = {};
        for (const e of ev) {
            if (e.name !== "Animation" || !e.args?.data) continue;
            const d = e.args.data;
            const k = `${d.name ?? d.displayName ?? "?"}`;
            const v = (verdicts[k] ??= { events: 0, compositeFailed: new Set(), unsupported: new Set() });
            v.events++;
            if (d.compositeFailed !== undefined) v.compositeFailed.add(d.compositeFailed);
            for (const u of d.unsupportedProperties ?? []) v.unsupported.add(u);
        }
        for (const k in verdicts) verdicts[k] = { events: verdicts[k].events, compositeFailed: [...verdicts[k].compositeFailed], unsupported: [...verdicts[k].unsupported] };
        rec.traces.push({
            cell: `${c}-${row}-${shape}`,
            mountToDrawMs: tDraw && tMount ? +((tDraw - tMount) / 1000).toFixed(1) : null,
            drawToDrawnMs: tDraw && tDrawn ? +((tDrawn - tDraw) / 1000).toFixed(1) : null,
            mountTask: tMount && tDraw ? count(tMount, tDraw) : null,
            duringDraw: tDraw && tDrawn ? count(tDraw, tDrawn) : null,
            displayFramesDuringDraw: draws.length, displayFramesInsideTask: inTaskFrames, worstFrameGapMs: gaps.length ? Math.max(...gaps) : null,
            animationVerdicts: verdicts,
        });
        console.log(JSON.stringify(rec.traces.at(-1)).slice(0, 900));
    } finally {
        await context.close();
        rmSync(path, { force: true }); // the raw trace is large; the counts are the record
    }
}

const browser = await launch(engine);
try {
    for (const c of Object.keys(C)) { const { context } = await open(browser, `${C[c]}/ab/index.html?scene=one&row=h85&shape=underline&theme=light`, { width: W, height: H, dpr: 1 }); await context.close(); }
    for (const c of Object.keys(C)) for (const [row, shape] of CASES) await cell(browser, c, row, shape).catch((e) => rec.cells.push({ cell: `${c}-${row}-${shape}`, error: String(e) }));
    if (engine === "chromium") for (const c of Object.keys(C)) for (const [row, shape] of CASES) await traced(browser, c, row, shape).catch((e) => rec.traces.push({ cell: `${c}-${row}-${shape}`, error: String(e) }));
} finally {
    await browser.close();
    writeFileSync(join(out, `stall-${engine}.json`), JSON.stringify(rec, null, 1));
}
