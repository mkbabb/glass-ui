// cost9.mjs: s9/mkcost9.py's copy of m8/cost8.mjs with the landing frames (RU-103 as amended for C8-M9).
// cost8.mjs <port> <tag> [--cells ...] [--engine chromium|webkit] [--reps N]: MEASURE-8 H4 (RU-74 as amended for C7-M6,
// RU-81) and H9 (RU-80). cost7.mjs with:
//   - phase marks from the page, not the source: the init script wraps every ResizeObserver callback and every
//     requestAnimationFrame callback in `dock:ro`/`dock:raf` console.timeStamp marks (microsecond trace time; user-timing marks are coarsened; start and end, the observer's callback
//     marked `in-dock` when any entry's target lies in a .glass-dock), so a Layout with no stack is named by the phase it
//     falls in: inside a delivery, inside a rAF callback, after a delivery's writes (between a delivery's end and the
//     next mark), or after the carrier's write;
//   - G-11's trigger clause reads the trigger frame and the two frames after it: in each of the two, the Layout events
//     under a script stack (forced) are counted beside the frame's own (no stack), and the clause asks none forced;
//   - the bound named only by `dock:reread` (fit: true), as before; a deciding frame's reread with no flag change
//     (the build's "whether or not a flag moved") is printed, not credited;
//   - --engine webkit: no trace exists there (RU-74, RU-85), so only G-11's rest clause runs: 2 s at rest after the
//     unfold and the fold, rAF calls, style and DOM mutations in the dock, running animations (the same script);
//   - --reps N: the 4x CPU run repeated N times (default 5) for the run-to-run spread RU-80 compares.
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
const ENGINE = rest.includes("--engine") ? rest[rest.indexOf("--engine") + 1] : "chromium";
const REPS = rest.includes("--reps") ? +rest[rest.indexOf("--reps") + 1] : 5;
const OUT = new URL("../../logs/", import.meta.url);
mkdirSync(OUT, { recursive: true });
const INIT = `
window.__raf = 0; const _r = window.requestAnimationFrame.bind(window);
window.requestAnimationFrame = (cb) => { window.__raf++; return _r((t) => { console.timeStamp('dock:raf-start'); try { return cb(t); } finally { console.timeStamp('dock:raf-end'); } }); };
const _RO = window.ResizeObserver;
window.ResizeObserver = class extends _RO { constructor(cb) { super((entries, obs) => { const own = entries.some((e) => e.target?.closest?.('.glass-dock')); console.timeStamp(own ? 'dock:ro-start-in-dock' : 'dock:ro-start'); try { return cb(entries, obs); } finally { console.timeStamp(own ? 'dock:ro-end-in-dock' : 'dock:ro-end'); } }); } };
window.__styleMut = new Map();
addEventListener('DOMContentLoaded', () => {
  new MutationObserver((ms) => { for (const m of ms) { const k = m.target; window.__styleMut.set(k, (window.__styleMut.get(k) || 0) + 1); } })
    .observe(document.body, { attributes: true, attributeFilter: ['style'], subtree: true });
  new MutationObserver((ms) => { for (const m of ms) if (m.target.classList?.contains('glass-dock') && m.oldValue !== null && !m.target.hasAttribute('data-morphing')) console.timeStamp('dock:land'); })
    .observe(document.body, { attributes: true, attributeFilter: ['data-morphing'], attributeOldValue: true, subtree: true });
});`;
const cells = [
    ["w-pill", ""],
    ["w-flow", ""],
    ["w-ctl", "&corner=bottom-end"],
    ["w-seat", ""],
    // MEASURE-7 step 6: RU-61's prototype cell, read only when asked (--cells w-inflow); not one of G-11's four
    ["w-inflow", "", true],
].filter(([id, , only]) => (CELLS ? CELLS.includes(id) : !only));
const results = {};
const REST = async (id) => {
    const d = document.querySelector(`[data-testid=${id}]`);
    let muts = 0;
    const mo = new MutationObserver((ms) => (muts += ms.length));
    mo.observe(d, { attributes: true, subtree: true, childList: true });
    const r0 = window.__raf;
    await new Promise((r) => setTimeout(r, 2000));
    mo.disconnect();
    const anims = d.getAnimations({ subtree: true }).filter((a) => a.playState === "running");
    return { rafCalls: window.__raf - r0, mutations: muts, runningAnimations: anims.length, animTargets: anims.slice(0, 6).map((a) => (a.effect?.target?.className?.toString?.() || "").slice(0, 30) + "/" + (a.animationName || a.transitionProperty || "")) };
};
let browser;
try {
    browser = ENGINE === "webkit"
        ? await pw.webkit.launch({ headless: true, executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` })
        : await pw.chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
    for (const [id, extra] of cells) {
        for (const [rate, rep] of ENGINE === "webkit" ? [[1, 0]] : [[1, 0], ...Array.from({ length: REPS }, (_, k) => [4, k])]) {
            const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
            try {
                await ctx.addInitScript(INIT);
                const page = await ctx.newPage();
                await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${id}${extra}`);
                await page.waitForSelector(`[data-testid=${id}]`);
                await page.waitForTimeout(600);
                if (ENGINE === "webkit") {
                    const b0 = await page.locator(`[data-testid=${id}]`).boundingBox();
                    await page.mouse.move(b0.x + b0.width / 2 - 5, b0.y + b0.height / 2);
                    await page.mouse.move(b0.x + b0.width / 2, b0.y + b0.height / 2, { steps: 3 });
                    await page.waitForTimeout(1300);
                    const openRest = await page.evaluate(REST, id);
                    await page.mouse.click(4, 4);
                    await page.waitForTimeout(1300);
                    const foldRest = await page.evaluate(REST, id);
                    const key = `${id}${extra}@webkit`;
                    results[key] = { rest: foldRest, restOpen: openRest };
                    console.log(key, JSON.stringify(results[key]));
                    continue;
                }
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
                const restCheck = await page.evaluate(REST, id);
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
                // the phase marks are console.timeStamp events (TimeStamp, microsecond trace time): user-timing marks carry
                // performance.now's coarsened clock, too coarse to order a mark against a layout microseconds away
                const phases = events.filter((e) => e.name === "TimeStamp" && /^dock:(raf|ro)-(start|end)(-in-dock)?$/.test(e.args?.data?.message ?? "")).map((e) => ({ n: e.args.data.message.slice(5), ts: e.ts })).sort((p, q) => p.ts - q.ts);
                const phaseOf = (ts) => {
                    const before = [...phases].reverse().find((m) => m.ts <= ts);
                    if (!before) return "no phase mark before it";
                    if (/start/.test(before.n)) return before.n.startsWith("ro") ? `inside a delivery${/in-dock/.test(before.n) ? " (the dock's)" : ""}` : "inside a rAF callback";
                    return before.n.startsWith("ro") ? `after a delivery's writes${/in-dock/.test(before.n) ? " (the dock's)" : ""}` : "after a rAF callback";
                };
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
                        if (e.ts >= fr) return { by: "frame", ms: +((e.dur || 0) / 1000).toFixed(3), stack: st, phase: phaseOf(e.ts) };
                        const before = [...marks].reverse().find((m) => m.ts <= e.ts && m.ts >= a && m.n !== "ro-miss");
                        return { by: before ? (before.n === "end" ? "after the carrier" : before.n) : "input", ms: +((e.dur || 0) / 1000).toFixed(3), stack: st, phase: phaseOf(e.ts) };
                    });
                    const reads = marks.filter((m) => m.n === "read" && m.ts >= a && m.ts < z).map((m) => m.reason);
                    const flagMoved = marks.some((m) => m.n === "reread" && m.ts >= a && m.ts < z && m.detail?.fit === true);
                    const roMiss = marks.filter((m) => m.n === "ro-miss" && m.ts >= a && m.ts < z).map((m) => m.detail);
                    const rereadNoFlag = marks.some((m) => m.n === "reread" && m.ts >= a && m.ts < z && m.detail?.fit !== true);
                    // C7-M6: the two frames after the trigger frame, each its Layout events under a script stack (forced)
                    // against the frame's own (no stack)
                    const after = [];
                    let b0 = z;
                    for (let k = 0; k < 2; k++) {
                        const b1 = begins.find((b) => b > b0) ?? b0 + 16700;
                        const LL = lay.filter((e) => e.ts >= b0 && e.ts < b1);
                        const forcedL = LL.filter((e) => stackOf(e).length);
                        after.push({ layouts: LL.length, forced: forcedL.length, own: LL.length - forcedL.length, forcedStacks: forcedL.map((e) => stackOf(e).join(" < ")), phases: LL.map((e) => `${stackOf(e).length ? "forced" : "own"}: ${phaseOf(e.ts)}`) });
                        b0 = b1;
                    }
                    triggers.push({ a, z, layouts: L.length, bound: flagMoved ? 4 : 3, rereadNoFlag, layoutMs: +L.reduce((s2, x) => s2 + x.ms, 0).toFixed(3), named: L.map((x) => `${x.by}:${x.ms}`), stacks: L.map((x) => `${x.by}: ${x.stack.join(" < ") || "(no stack)"} [${x.phase}]`), reasons: reads, roMiss, after, afterForced: after.reduce((s2, f) => s2 + f.forced, 0) });
                }
                // C8-M9: each landing (a dock's data-morphing removed), its frame and the two after it
                const lands = events.filter((e) => e.name === "TimeStamp" && e.args?.data?.message === "dock:land").map((e) => e.ts).sort((p, q) => p - q);
                const landings = lands.map((ts) => {
                    let b0 = [...begins].reverse().find((b) => b <= ts) ?? ts - 16000;
                    const fr = [];
                    for (let k = 0; k < 3; k++) {
                        const b1 = begins.find((b) => b > b0) ?? b0 + 16700;
                        const LL = lay.filter((e) => e.ts >= b0 && e.ts < b1);
                        const forcedL = LL.filter((e) => stackOf(e).length);
                        fr.push({ layouts: LL.length, forced: forcedL.length, forcedStacks: forcedL.map((e) => stackOf(e).join(" < ")) });
                        b0 = b1;
                    }
                    return { frames: fr, forced: fr.reduce((s2, f) => s2 + f.forced, 0) };
                });
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
                    // RU-80 (H9): every Layout event in the run, counted and its time summed
                    layoutCount: lay.length,
                    layoutMsSum: +(lay.reduce((t, e) => t + (e.dur || 0), 0) / 1000).toFixed(3),
                    rafMsMedian: med(travel.map((f) => f.rafMs)),
                    rafMsMax: +Math.max(0, ...travel.map((f) => f.rafMs)).toFixed(3),
                    elementsStyledUnfold: styledOpen,
                    elementsStyledFold: styledFold,
                    rest: restCheck,
                    seatChangeElementsStyled: seatChange,
                    layoutsBy: Object.fromEntries(Object.entries(forced).sort((p, q) => q[1] - p[1]).slice(0, 8)),
                    framesOver1Layout: travel.filter((f) => f.layouts > 1).length,
                    triggerFrames: triggers.map(({ layouts, bound, rereadNoFlag, layoutMs, named, stacks, reasons, roMiss, after, afterForced }) => ({ layouts, bound, over: layouts > bound, rereadNoFlag, layoutMs, named, stacks, reasons, roMiss, after, afterForced, afterOver: afterForced > 0 })),
                    landings,
                    landingForced: landings.reduce((s2, l) => s2 + l.forced, 0),
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
    results.g11 = { triggerFrames: tf.length, over: tf.filter((t) => t.over).map((t) => `${t.k}: ${t.layouts} > ${t.bound} [${t.named.join(", ")}]`), afterOver: tf.filter((t) => t.afterOver).map((t) => `${t.k}: ${t.afterForced} forced in the two frames after [${t.after.map((f) => f.forcedStacks.join(" | ")).join(" ; ")}]`), byCount: tf.reduce((m, t) => ((m[t.layouts] = (m[t.layouts] || 0) + 1), m), {}), rest: Object.fromEntries(Object.entries(results).filter(([k]) => k !== "summary" && k !== "renderer" && k !== "g11").map(([k, v]) => [k, v.rest])) };
    console.log("g11", JSON.stringify({ triggerFrames: results.g11.triggerFrames, byCount: results.g11.byCount, over: results.g11.over.length, afterOver: results.g11.afterOver.length }));
    console.log("summary", JSON.stringify(sum));
    writeFileSync(new URL(`m8-cost.${tag}.${ENGINE}.json`, OUT), JSON.stringify(results, null, 1));
}
