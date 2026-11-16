// cost7.mjs <port> <tag> [--cells w-pill,w-flow,...]: MEASURE-7, RU-53. cost5.mjs with the trace's stack category
// (disabled-by-default-devtools.timeline.stack), so each forced Layout in a trigger frame carries its caller (the top
// five frames); the carrier's `dock:rect` mark (the root's read after the flags) and the hold build's `dock:ro-miss`
// mark (each observer entry that fails RU-38's guard, with its box and the held box) are read in each trigger frame;
// the trigger frame's summed layout time is recorded beside its count (reported, not gated). The bound per frame:
// 3, or 4 where the frame's `dock:reread` mark names a flag that changed (fit: true). Output logs/cost2.<tag>.json.
// cost5.mjs: MEASURE-6. cost4.mjs with RU-38's first reading: each trigger frame lists the reason of
// every dock:read mark inside it (the hold build writes sync's reason in the mark's detail), so a
// second sync in one frame is named. Output logs/cost2.<tag>.json.
// cost2.mjs (PROTOTYPE-2: the spec's cells; forced layouts named by their stack; an open-seat change)
// cost.mjs <port> <tag> : G-11 by trace (Chromium, 1x and 4x CPU) and the rest checks.
// For each cell: unfold by hover and fold by a press outside, traced; counts Layout events
// (and their dirty objects) and FireAnimationFrame time per frame inside each travel;
// counts the elements whose inline style changed during the travel; then 2 s at rest:
// rAF calls, style mutations in the dock, getAnimations() on its subtree; and node counts.
// cost4.mjs: MEASURE-5. cost3.mjs with RU-29's reading: the trigger frame's Layout events named by the
// carrier's marks (dock:read, dock:flags, dock:reread, dock:write; the hold build only), each 4x
// cell run five times and the longest single Layout of each run kept (bound 2 ms, the median of
// the five), and the block-flow cell's median Layout after the trigger frame against the pill's.
// cost3.mjs: MEASURE-4. cost2.mjs launched with --use-angle=metal --enable-gpu --ignore-gpu-blocklist,
// and the page's UNMASKED_RENDERER_WEBGL written beside the numbers (results.renderer).
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const [port, tag, ...rest] = process.argv.slice(2);
const CELLS = rest.includes("--cells") ? rest[rest.indexOf("--cells") + 1].split(",") : null;
const OUT = new URL("../../logs/", import.meta.url);
mkdirSync(OUT, { recursive: true });
const INIT = `
window.__raf = 0; const _r = window.requestAnimationFrame.bind(window);
window.requestAnimationFrame = (cb) => { window.__raf++; return _r(cb); };
window.__styleMut = new Map();
addEventListener('DOMContentLoaded', () => {
  new MutationObserver((ms) => { for (const m of ms) { const k = m.target; window.__styleMut.set(k, (window.__styleMut.get(k) || 0) + 1); } })
    .observe(document.body, { attributes: true, attributeFilter: ['style'], subtree: true });
});`;
const cells = [
    ["w-pill", ""],
    ["w-flow", ""],
    ["w-ctl", "&corner=bottom-end"],
    ["w-seat", ""],
].filter(([id]) => !CELLS || CELLS.includes(id));
const results = {};
let browser;
try {
    browser = await pw.chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
    for (const [id, extra] of cells) {
        for (const [rate, rep] of [[1, 0], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]]) {
            const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
            try {
                await ctx.addInitScript(INIT);
                const page = await ctx.newPage();
                await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${id}${extra}`);
                await page.waitForSelector(`[data-testid=${id}]`);
                await page.waitForTimeout(600);
                const cdp = await ctx.newCDPSession(page);
                await cdp.send("Emulation.setCPUThrottlingRate", { rate });
                // MEASURE-4: the renderer the frame-cost numbers were read under.
                results.renderer ??= await page.evaluate(() => {
                    const g = document.createElement("canvas").getContext("webgl");
                    const x = g && g.getExtension("WEBGL_debug_renderer_info");
                    return x ? g.getParameter(x.UNMASKED_RENDERER_WEBGL) : g ? g.getParameter(g.RENDERER) : "no webgl";
                });
                const counts = await page.evaluate((id) => {
                    const d = document.querySelector(`[data-testid=${id}]`);
                    return { nodes: d.querySelectorAll("*").length + 1 };
                }, id);
                const events = [];
                cdp.on("Tracing.dataCollected", (e) => events.push(...e.value));
                const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
                await cdp.send("Tracing.start", { categories: "devtools.timeline,disabled-by-default-devtools.timeline,disabled-by-default-devtools.timeline.stack,blink.user_timing", transferMode: "ReportEvents" });
                await page.evaluate(() => { performance.mark("cost:start"); window.__styleMut.clear(); });
                const b = await page.locator(`[data-testid=${id}]`).boundingBox();
                await page.mouse.move(b.x + b.width / 2 - 5, b.y + b.height / 2);
                await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 3 });
                await page.waitForTimeout(1300);
                const openNodes = await page.evaluate((id) => document.querySelector(`[data-testid=${id}]`).querySelectorAll("*").length + 1, id);
                const styledOpen = await page.evaluate(() => [...window.__styleMut.keys()].filter((e) => e.closest?.(".glass-dock")).length);
                await page.evaluate(() => window.__styleMut.clear());
                let seatChange = null;
                if (id === "w-seat") {
                    await page.evaluate(() => window.__styleMut.clear());
                    await page.evaluate(() => document.querySelector("[data-testid=w-seat-marks]").click());
                    await page.waitForTimeout(900);
                    seatChange = await page.evaluate(() => [...window.__styleMut.keys()].filter((e) => e.closest?.(".glass-dock")).length);
                    await page.evaluate(() => window.__styleMut.clear());
                }
                await page.mouse.click(4, 4);
                await page.waitForTimeout(1300);
                const styledFold = await page.evaluate(() => [...window.__styleMut.entries()].filter(([e]) => e.closest?.(".glass-dock")).map(([e, n]) => (e.className?.toString?.() || e.tagName).slice(0, 40) + ":" + n));
                await page.evaluate(() => performance.mark("cost:end"));
                await cdp.send("Tracing.end");
                await done;
                // Rest: 2 s with nothing happening.
                const restCheck = await page.evaluate(async (id) => {
                    const d = document.querySelector(`[data-testid=${id}]`);
                    let muts = 0;
                    const mo = new MutationObserver((ms) => (muts += ms.length));
                    mo.observe(d, { attributes: true, subtree: true, childList: true });
                    const r0 = window.__raf;
                    await new Promise((r) => setTimeout(r, 2000));
                    mo.disconnect();
                    const anims = d.getAnimations({ subtree: true }).filter((a) => a.playState === "running");
                    return { rafCalls: window.__raf - r0, mutations: muts, runningAnimations: anims.length, animTargets: anims.slice(0, 6).map((a) => (a.effect?.target?.className?.toString?.() || "").slice(0, 30) + "/" + (a.animationName || a.transitionProperty || "")) };
                }, id);
                // Per frame: layout events and FireAnimationFrame time between DrawFrame boundaries.
                const lay = events.filter((e) => e.name === "Layout" && e.ph === "X");
                const raf = events.filter((e) => e.name === "FireAnimationFrame" && e.ph === "X");
                const frames = raf.map((e) => e.ts).sort((x, y) => x - y);
                const names = {};
                for (const e of events) names[e.name] = (names[e.name] || 0) + 1;
                const perFrame = [];
                for (let i = 1; i < frames.length; i++) {
                    const a = frames[i - 1], z = frames[i];
                    const L = lay.filter((e) => e.ts >= a && e.ts < z);
                    const R = raf.filter((e) => e.ts >= a && e.ts < z);
                    if (!R.length && !L.length) continue;
                    perFrame.push({ layouts: L.length, dirty: L.reduce((s, e) => s + (e.args?.beginData?.dirtyObjects || 0), 0), layoutMs: L.reduce((s, e) => s + (e.dur || 0), 0) / 1000, rafMs: R.reduce((s, e) => s + (e.dur || 0), 0) / 1000 });
                }
                const travel = perFrame.filter((f) => f.rafMs > 0);
                // Which call forced a layout: the top frame of each Layout event's stack.
                const forced = {};
                for (const e of lay) {
                    const st = e.args?.beginData?.stackTrace;
                    const k = st && st.length ? `${st[0].functionName || "(anon)"}@${(st[0].url || "").split("/").pop()}:${st[0].lineNumber}` : "(frame, not forced)";
                    forced[k] = (forced[k] || 0) + 1;
                }
                const med = (xs) => { const s = [...xs].sort((p, q) => p - q); return s.length ? +s[Math.floor(s.length / 2)].toFixed(3) : null; };
                const key = `${id}${extra}@${rate}x${rep ? "#" + rep : ""}`;
                // RU-29: each trigger frame (the frame of a dock:read mark), its Layout events named by
                // the marks they follow, between the BeginFrame before the mark and the next one.
                const reasonOf = (e) => { try { const dd = e.args?.data?.detail; const o = typeof dd === "string" ? JSON.parse(dd) : dd; return o?.reason ?? null; } catch { return null; } };
                const detailOf = (e) => { try { const dd = e.args?.data?.detail; return typeof dd === "string" ? JSON.parse(dd) : dd ?? null; } catch { return null; } };
                const marks = events.filter((e) => /^dock:(read|flags|reread|rect|write|end|ro-miss)$/.test(e.name) && e.ph !== "e").map((e) => ({ n: e.name.slice(5), ts: e.ts, reason: e.name === "dock:read" ? reasonOf(e) : null, detail: /^dock:(reread|ro-miss)$/.test(e.name) ? detailOf(e) : null })).sort((p, q) => p.ts - q.ts);
                const stackOf = (e) => (e.args?.beginData?.stackTrace ?? []).slice(0, 5).map((f) => `${f.functionName || "(anon)"}@${(f.url || "").split("/").pop().split("?")[0]}:${f.lineNumber}:${f.columnNumber}`);
                const begins = events.filter((e) => e.name === "BeginFrame").map((e) => e.ts).sort((p, q) => p - q);
                const triggers = [];
                const rafStarts = raf.map((e) => e.ts).sort((p, q) => p - q);
                // A trigger frame is the frame of a dock:write mark (sync's change branch). Each Layout in
                // it is named by the carrier mark before it; one before dock:read is "input" (the hit
                // test, Vue's flush), one inside the frame's rAF or after it is "frame".
                for (const mk of marks.filter((m) => m.n === "write")) {
                    const a = [...begins].reverse().find((b) => b <= mk.ts) ?? mk.ts - 16000;
                    const z = begins.find((b) => b > mk.ts) ?? mk.ts + 16000;
                    if (triggers.some((t) => t.a === a)) continue;
                    const fr = rafStarts.find((t) => t > mk.ts && t < z) ?? z;
                    const L = lay.filter((e) => e.ts >= a && e.ts < z).map((e) => {
                        const st = stackOf(e);
                        if (e.ts >= fr) return { by: "frame", ms: +((e.dur || 0) / 1000).toFixed(3), stack: st };
                        const before = [...marks].reverse().find((m) => m.ts <= e.ts && m.ts >= a && m.n !== "ro-miss");
                        return { by: before ? (before.n === "end" ? "after the carrier" : before.n) : "input", ms: +((e.dur || 0) / 1000).toFixed(3), stack: st };
                    });
                    const reads = marks.filter((m) => m.n === "read" && m.ts >= a && m.ts < z).map((m) => m.reason);
                    const flagMoved = marks.some((m) => m.n === "reread" && m.ts >= a && m.ts < z && m.detail?.fit === true);
                    const roMiss = marks.filter((m) => m.n === "ro-miss" && m.ts >= a && m.ts < z).map((m) => m.detail);
                    triggers.push({ a, z, layouts: L.length, bound: flagMoved ? 4 : 3, layoutMs: +L.reduce((s2, x) => s2 + x.ms, 0).toFixed(3), named: L.map((x) => `${x.by}:${x.ms}`), stacks: L.map((x) => `${x.by}: ${x.stack.join(" < ") || "(no stack)"}`), reasons: reads, roMiss });
                }
                const longest = +Math.max(0, ...lay.map((e) => (e.dur || 0) / 1000)).toFixed(3);
                const trig = new Set(); for (const t of triggers) for (const e of lay) if (e.ts >= t.a && e.ts < t.z) trig.add(e);
                const afterTrigger = lay.filter((e) => !trig.has(e)).map((e) => (e.dur || 0) / 1000);
                results[key] = {
                    nodesFolded: counts.nodes,
                    nodesOpen: openNodes,
                    framesWithRaf: travel.length,
                    layoutsPerFrameMax: Math.max(0, ...travel.map((f) => f.layouts)),
                    layoutsPerFrameMedian: med(travel.map((f) => f.layouts)),
                    dirtyPerLayoutMax: Math.max(0, ...lay.map((e) => e.args?.beginData?.dirtyObjects || 0)),
                    layoutMsMax: +Math.max(0, ...travel.map((f) => f.layoutMs)).toFixed(3),
                    rafMsMedian: med(travel.map((f) => f.rafMs)),
                    rafMsMax: +Math.max(0, ...travel.map((f) => f.rafMs)).toFixed(3),
                    elementsStyledUnfold: styledOpen,
                    elementsStyledFold: styledFold,
                    rest: restCheck,
                    seatChangeElementsStyled: seatChange,
                    layoutsBy: Object.fromEntries(Object.entries(forced).sort((p, q) => q[1] - p[1]).slice(0, 8)),
                    framesOver1Layout: travel.filter((f) => f.layouts > 1).length,
                    triggerFrames: triggers.map(({ layouts, bound, layoutMs, named, stacks, reasons, roMiss }) => ({ layouts, bound, over: layouts > bound, layoutMs, named, stacks, reasons, roMiss })),
                    longestLayoutMs: longest,
                    medianLayoutAfterTriggerMs: med(afterTrigger),
                    traceEventKinds: { Layout: names.Layout || 0, FireAnimationFrame: names.FireAnimationFrame || 0, UpdateLayoutTree: names.UpdateLayoutTree || 0 },
                };
                console.log(key, JSON.stringify(results[key]));
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    if (browser) await browser.close();
    // RU-29's summary: per cell, the median over the five 4x runs of each run's longest Layout.
    const sum = {};
    for (const [id, extra] of cells) {
        const ks = Object.keys(results).filter((k) => k.startsWith(`${id}${extra}@4x`));
        const xs = ks.map((k) => results[k].longestLayoutMs).sort((p, q) => p - q);
        const ms = ks.map((k) => results[k].medianLayoutAfterTriggerMs).filter((x) => x != null).sort((p, q) => p - q);
        sum[id] = { longest4x: xs, medianOfLongest4x: xs[Math.floor(xs.length / 2)] ?? null, medianLayoutAfterTrigger4x: ms[Math.floor(ms.length / 2)] ?? null };
    }
    results.summary = sum;
    const tf = Object.entries(results).filter(([k]) => k !== "summary" && k !== "renderer").flatMap(([k, v]) => (v.triggerFrames || []).map((t) => ({ k, ...t })));
    results.g11 = { triggerFrames: tf.length, over: tf.filter((t) => t.over).map((t) => `${t.k}: ${t.layouts} > ${t.bound} [${t.named.join(", ")}]`), byCount: tf.reduce((m, t) => ((m[t.layouts] = (m[t.layouts] || 0) + 1), m), {}), rest: Object.fromEntries(Object.entries(results).filter(([k]) => k !== "summary" && k !== "renderer" && k !== "g11").map(([k, v]) => [k, v.rest])) };
    console.log("g11", JSON.stringify({ triggerFrames: results.g11.triggerFrames, byCount: results.g11.byCount, over: results.g11.over.length }));
    console.log("summary", JSON.stringify(sum));
    writeFileSync(new URL(`cost2.${tag}.json`, OUT), JSON.stringify(results, null, 1));
}
