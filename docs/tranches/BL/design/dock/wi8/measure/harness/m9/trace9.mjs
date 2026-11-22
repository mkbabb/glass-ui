// trace9.mjs <port> <tag> --mode idle|layer|docks [--n 18]: MEASURE-9 part H, item H9 (RU-90 on O-268, RU-103 as amended
// for C8-M13). Chromium (the headless shell; a trace is Chromium's), on a dev server so every stack names its source file
// and line (an unminified build). Each Layout event of the trace is listed with its stack (the frames the trace records,
// `disabled-by-default-devtools.timeline.stack`), its time from the window's start and its length; a layout with a
// stack ran inside a script (forced).
//   idle   release-11-0-2's own page (/tests-visual/release-11-0-2/fold-harness.html), as `:702` drives it: 5.4 s after
//          mount, 2.5 s of a scroll of 3 px every frame across the idle fold of the untouched `collapse="open"` dock. The
//          window's layouts, the frames and the morph frames (the spec's own counts); at 1280 by 800 fine, and at 390 by
//          844 coarse (touch, a mobile viewport), where the root's class over the 8 s and `(hover: none)` are recorded
//          (the reason the coarse dock never folds: GlassDock.vue's `alwaysExpanded`, a dock with no `#collapsed` under no
//          hover rests open).
//   writer the idle page again at 1280 fine with invalidation tracking: every style and layout invalidation in the
//          window (ScheduleStyleRecalculation, StyleRecalcInvalidationTracking, StyleInvalidatorInvalidationTracking,
//          LayoutInvalidationTracking) grouped by its stack and its reason, so the script that dirties each frame's
//          layout is named (RU-90: the idle-fold writer).
//   layer  w-tall (DockLayerGroup in a pill) at 1440: a hover open, a press outside to fold, each followed 1.2 s; every
//          layout whose stack names DockLayer or useDockRun, with the frame it read from.
//   docks  w-docks (&n= pills on one page): from the navigation to 1.5 s after the page is ready; the dock carrier's
//          mount syncs (its `dock:read` marks, reason mount) and every forced layout under a dock frame in the first
//          frame after mount, counted (more than one is a fault, C8-M13).
// The trace is reduced to those lists and written to logs/m9-trace-<tag>.json; the raw trace is not kept.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const mode = val("--mode", "idle");
const N = +val("--n", "18");
const CATS = ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.stack", "blink.user_timing", "v8.execute"];
const short = (u) => (u || "").replace(/^https?:\/\/[^/]+\//, "").replace(/\?.*$/, "");
const stackOf = (e) => (e.args?.beginData?.stackTrace ?? e.args?.data?.stackTrace ?? []).slice(0, 8).map((f) => `${f.functionName || "(anon)"}@${short(f.url)}:${(f.lineNumber ?? 0) + 1}`);
function parse(buf) {
    const t = JSON.parse(buf.toString());
    return (Array.isArray(t) ? t : t.traceEvents).filter((e) => e.ph !== "M");
}
const out = { tag, mode, port: +port };
let browser;
try {
    browser = await pw.chromium.launch({ headless: true });
    const cells = mode === "writer" ? [["fine", { viewport: { width: 1280, height: 800 } }]] : mode === "idle" ? [["fine", { viewport: { width: 1280, height: 800 } }], ["coarse", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }]] : [["fine", { viewport: { width: 1440, height: 900 } }]];
    for (const [name, opts] of cells) {
        const ctx = await browser.newContext(opts);
        try {
            const page = await ctx.newPage();
            out.renderer = await page.evaluate(() => { const g = document.createElement("canvas").getContext("webgl"); const x = g?.getExtension("WEBGL_debug_renderer_info"); return x ? g.getParameter(x.UNMASKED_RENDERER_WEBGL) : null; }).catch(() => null);
            const res = { cell: name };
            if (mode === "idle") {
                await page.goto(`http://127.0.0.1:${port}/tests-visual/release-11-0-2/fold-harness.html`);
                await page.locator("body[data-ready='1'] .fold-dock").waitFor();
                const classes = [];
                const watch = setInterval(() => page.evaluate(() => [Math.round(performance.now()), document.querySelector(".glass-dock")?.className, document.querySelector(".glass-dock")?.hasAttribute("data-morphing")]).then((x) => classes.push(x)).catch(() => {}), 500);
                await page.waitForTimeout(5400);
                await browser.startTracing(page, { categories: CATS });
                const t0 = await page.evaluate(() => { performance.mark("m9:window"); return performance.now(); });
                const r = await page.evaluate(async () => {
                    const root = document.querySelector(".glass-dock");
                    let frames = 0, morphFrames = 0, last = root.style.getPropertyValue("--dock-morph-t");
                    const end = performance.now() + 2500;
                    await new Promise((done) => { const tick = () => { frames++; scrollBy(0, 3); const t = root.style.getPropertyValue("--dock-morph-t"); if (t !== last) morphFrames++; last = t; if (performance.now() < end) requestAnimationFrame(tick); else done(); }; requestAnimationFrame(tick); });
                    return { frames, morphFrames, collapsed: root.classList.contains("collapsed"), hoverNone: matchMedia("(hover: none)").matches };
                });
                const ev = parse(await browser.stopTracing());
                clearInterval(watch);
                const mark = ev.find((e) => e.name === "m9:window");
                const base = mark ? mark.ts : Math.min(...ev.map((e) => e.ts).filter(Boolean));
                const lay = ev.filter((e) => e.name === "Layout" && e.ts >= base && e.ts <= base + 2.6e6);
                res.spec = r;
                res.layouts = lay.length;
                res.forced = lay.filter((e) => stackOf(e).length).length;
                const byStack = new Map();
                for (const e of lay) { const k = stackOf(e).join(" < ") || "(no script: the frame's own layout)"; byStack.set(k, (byStack.get(k) ?? 0) + 1); }
                res.byStack = [...byStack.entries()].sort((x, y) => y[1] - x[1]).map(([stack, n]) => ({ n, stack }));
                res.list = lay.slice(0, 400).map((e) => ({ at: +((e.ts - base) / 1000).toFixed(1), ms: e.dur ? +(e.dur / 1000).toFixed(2) : null, stack: stackOf(e) }));
                res.classes = classes;
                res.bound = r.morphFrames + 12;
                res.pass = r.collapsed && r.morphFrames > 10 && lay.length <= r.morphFrames + 12;
            } else if (mode === "writer") {
                await page.goto(`http://127.0.0.1:${port}/tests-visual/release-11-0-2/fold-harness.html`);
                await page.locator("body[data-ready='1'] .fold-dock").waitFor();
                await page.waitForTimeout(5400);
                await browser.startTracing(page, { categories: [...CATS, "disabled-by-default-devtools.timeline.invalidationTracking"] });
                await page.evaluate(() => performance.mark("m9:window"));
                const r = await page.evaluate(async () => {
                    const root = document.querySelector(".glass-dock");
                    let frames = 0; const end = performance.now() + 2500;
                    await new Promise((done) => { const tick = () => { frames++; scrollBy(0, 3); if (performance.now() < end) requestAnimationFrame(tick); else done(); }; requestAnimationFrame(tick); });
                    return { frames, collapsed: root.classList.contains("collapsed") };
                });
                const ev = parse(await browser.stopTracing());
                const mark = ev.find((e) => e.name === "m9:window");
                const base = mark ? mark.ts : 0;
                const NAMES = new Set(["ScheduleStyleRecalculation", "StyleRecalcInvalidationTracking", "StyleInvalidatorInvalidationTracking", "LayoutInvalidationTracking", "ScheduleStyleInvalidationTracking"]);
                const inv = ev.filter((e) => NAMES.has(e.name) && e.ts >= base);
                const key = (e) => { const d = e.args?.data ?? {}; const st = (d.stackTrace ?? []).slice(0, 5).map((f) => `${f.functionName || "(anon)"}@${short(f.url)}:${(f.lineNumber ?? 0) + 1}`).join(" < "); return `${e.name} | ${d.reason ?? d.changedAttribute ?? d.changedClass ?? d.invalidationSet ?? ""} | ${d.nodeName ?? ""} | ${st || "(no stack)"}`; };
                const by = new Map();
                for (const e of inv) by.set(key(e), (by.get(key(e)) ?? 0) + 1);
                res.spec = r;
                res.layouts = ev.filter((e) => e.name === "Layout" && e.ts >= base).length;
                res.invalidations = inv.length;
                res.byKey = [...by.entries()].sort((x, y) => y[1] - x[1]).slice(0, 40).map(([k, n]) => ({ n, k: k.slice(0, 400) }));
            } else if (mode === "layer") {
                await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-tall`);
                await page.waitForSelector("[data-testid=w-tall]");
                await page.waitForTimeout(1500);
                await browser.startTracing(page, { categories: CATS });
                await page.evaluate(() => performance.mark("m9:window"));
                const b = await page.locator("[data-testid=w-tall]").boundingBox();
                await page.mouse.move(b.x - 20, b.y + b.height / 2); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
                await page.waitForTimeout(1200);
                await page.mouse.click(1430, 890);
                await page.waitForTimeout(1200);
                const ev = parse(await browser.stopTracing());
                const mark = ev.find((e) => e.name === "m9:window");
                const base = mark ? mark.ts : 0;
                const lay = ev.filter((e) => e.name === "Layout" && e.ts >= base);
                res.layouts = lay.length;
                res.forced = lay.filter((e) => stackOf(e).length).length;
                res.dockLayer = lay.filter((e) => stackOf(e).some((f) => /DockLayer|useDockRun/.test(f))).map((e) => ({ at: +((e.ts - base) / 1000).toFixed(1), stack: stackOf(e) }));
                const byStack = new Map();
                for (const e of lay.filter((x) => stackOf(x).length)) { const k = stackOf(e).slice(0, 4).join(" < "); byStack.set(k, (byStack.get(k) ?? 0) + 1); }
                res.byStack = [...byStack.entries()].sort((x, y) => y[1] - x[1]).map(([stack, n]) => ({ n, stack }));
            } else {
                await browser.startTracing(page, { categories: CATS });
                await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-docks&n=${N}`);
                await page.waitForSelector(`[data-testid=w-docks-${N - 1}]`, { timeout: 60000 });
                await page.waitForTimeout(1500);
                const ev = parse(await browser.stopTracing());
                const reads = ev.filter((e) => e.name === "dock:read" && e.ph !== "e").map((e) => { let d = e.args?.data?.detail ?? e.args?.detail ?? null; if (typeof d === "string") { try { d = JSON.parse(d); } catch { d = null; } } return { ts: e.ts, reason: d?.reason ?? null }; }).sort((x, y) => x.ts - y.ts);
                // a mark's detail may not reach the trace: then the mount batch is every dock:read within 300 ms of the first
                const named = reads.some((r) => r.reason);
                const mounts = named ? reads.filter((r) => r.reason === "mount") : reads.filter((r) => reads.length && r.ts - reads[0].ts <= 300000);
                res.reasonsInTrace = named;
                res.docks = N;
                res.mountReads = mounts.length;
                res.readReasons = Object.entries(reads.reduce((m, r) => ((m[r.reason] = (m[r.reason] ?? 0) + 1), m), {}));
                const first = mounts[0]?.ts ?? null;
                // the frame the mount syncs run in: from the first mount read to the next frame's start after the last
                const frames = ev.filter((e) => (e.name === "BeginFrame" || e.name === "BeginMainThreadFrame" || e.name === "AnimationFrameFired" || e.name === "FireAnimationFrame") && first != null && e.ts >= first).map((e) => e.ts).sort((x, y) => x - y);
                const lastMount = mounts.length ? mounts[mounts.length - 1].ts : null;
                const frameEnd = lastMount != null ? (frames.find((t) => t > lastMount + 2000) ?? lastMount + 16700) : null;
                const lay = first != null ? ev.filter((e) => e.name === "Layout" && e.ts >= first - 1000 && e.ts <= frameEnd) : [];
                const dockLay = lay.filter((e) => stackOf(e).some((f) => /components\/dock|useGlassBackdropLuminance/.test(f)));
                res.firstFrameLayouts = lay.length;
                res.firstFrameForcedUnderDock = dockLay.length;
                res.firstFrameSpanMs = first != null ? +((frameEnd - first) / 1000).toFixed(1) : null;
                const byStack = new Map();
                for (const e of dockLay) { const k = stackOf(e).slice(0, 5).join(" < "); byStack.set(k, (byStack.get(k) ?? 0) + 1); }
                res.byStack = [...byStack.entries()].sort((x, y) => y[1] - x[1]).map(([stack, n]) => ({ n, stack }));
                res.allForcedAfterLoad = ev.filter((e) => e.name === "Layout" && stackOf(e).some((f) => /components\/dock/.test(f))).length;
                res.pass = res.firstFrameForcedUnderDock <= 1;
            }
            out[name] = res;
            console.log(name, JSON.stringify({ ...res, list: undefined, byStack: res.byStack?.slice(0, 6), byKey: res.byKey?.slice(0, 8) }).slice(0, 2500));
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m9-trace-${tag}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
