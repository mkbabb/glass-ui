// W-B.19 G-COST. Chromium: a 4x-throttled devtools trace across the whole scroll in
// 100 px wheel steps, for the page as built, its still twin (no lag) and the bite (the
// lag written as `top`); the inline style writes in the scenes; the listeners on
// window, document and each scene. Both engines: frame pacing through a continuous
// wheel scroll, and the animations per scene.
//   node cost.mjs <engine> <WxH>[:coarse]
import { chromium, webkit } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BITES } from "./bites.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = join(HERE, "..", "data");
mkdirSync(DATA, { recursive: true });
const BASE = "http://localhost:5467/demo/depth/index.html";
const [engineName, cellArg] = process.argv.slice(2);
const [w, h] = cellArg.split(":")[0].split("x").map(Number);
const coarse = cellArg.includes("coarse");

const raf2 = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

async function variant(browser, name, query, biteName) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: coarse ? 2 : 1, hasTouch: coarse });
    const res = { name };
    try {
        const page = await ctx.newPage();
        await page.goto(`${BASE}?${query}`, { waitUntil: "load" });
        await page.waitForTimeout(2500);
        if (biteName) await page.evaluate(BITES[biteName]);
        await page.evaluate(() => {
            window.__styleWrites = 0;
            new MutationObserver((ms) => { for (const m of ms) if (m.target.closest?.(".depth")) window.__styleWrites++; })
                .observe(document.body, { subtree: true, attributes: true, attributeFilter: ["style"] });
        });
        res.animations = await page.evaluate(() => [...document.querySelectorAll(".depth")].map((s) =>
            document.getAnimations().filter((a) => s.contains(a.effect?.target)).map((a) => ({
                name: a.animationName, target: a.effect.target.tagName,
                props: [...new Set((a.effect.getKeyframes() ?? []).flatMap((k) => Object.keys(k).filter((p) => !["offset", "easing", "composite", "computedOffset"].includes(p))))],
                timeline: a.timeline?.constructor?.name,
            }))));
        const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
        await page.mouse.move(w / 2, h / 2);

        let cdp = null;
        if (engineName === "chromium") {
            cdp = await ctx.newCDPSession(page);
            await cdp.send("DOM.enable");
            await cdp.send("DOM.getDocument", { depth: -1 });
            // listeners on window, document and the scenes
            const listeners = {};
            for (const [k, expr] of [["window", "window"], ["document", "document"], ["scenes", "document.querySelectorAll('.depth')"]]) {
                const { result } = await cdp.send("Runtime.evaluate", { expression: expr });
                if (k === "scenes") {
                    const props = await cdp.send("Runtime.getProperties", { objectId: result.objectId, ownProperties: true });
                    const types = [];
                    for (const p of props.result.filter((p) => /^\d+$/.test(p.name))) {
                        const l = await cdp.send("DOMDebugger.getEventListeners", { objectId: p.value.objectId });
                        types.push(...l.listeners.map((x) => x.type));
                    }
                    listeners.scenes = types;
                } else {
                    const l = await cdp.send("DOMDebugger.getEventListeners", { objectId: result.objectId });
                    listeners[k] = l.listeners.map((x) => x.type).filter((t) => /scroll|wheel|pointer|resize|touch|mouse/.test(t));
                }
            }
            res.listeners = listeners;
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
            const events = [];
            cdp.on("Tracing.dataCollected", (e) => events.push(...e.value));
            const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
            await cdp.send("Tracing.start", { categories: "devtools.timeline,disabled-by-default-devtools.timeline", transferMode: "ReportEvents" });
            let y = 0, steps = 0;
            while (y < maxScroll) {
                await page.mouse.wheel(0, 100);
                y = Math.min(maxScroll, y + 100);
                for (let k = 0; k < 20; k++) { const sy = await page.evaluate(() => scrollY); if (Math.abs(sy - y) < 1) break; await raf2(page); }
                await raf2(page);
                steps++;
            }
            await cdp.send("Tracing.end");
            await done;
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
            const main = events.find((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain");
            const onMain = (e) => main && e.pid === main.pid && e.tid === main.tid;
            const count = (n) => events.filter((e) => e.name === n && onMain(e) && e.ph !== "E");
            const layouts = count("Layout");
            const recalcs = count("UpdateLayoutTree");
            const paints = count("Paint");
            const tasks = events.filter((e) => e.name === "RunTask" && onMain(e) && e.dur);
            const frames = events.filter((e) => e.name === "BeginFrame" || e.name === "DrawFrame").length;
            // describe the nodes that painted and the layout roots
            const describe = async (backendNodeId) => {
                try { const { node } = await cdp.send("DOM.describeNode", { backendNodeId }); const cls = (node.attributes ?? []).reduce((a, v, i, arr) => (arr[i - 1] === "class" ? v : a), ""); return `${node.nodeName}${cls ? "." + cls.split(" ")[0] : ""}`; } catch { return "?"; }
            };
            const paintNodes = {};
            for (const p of paints) { const id = p.args?.data?.nodeId; const k = id ? await describe(id) : "layer"; paintNodes[k] = (paintNodes[k] ?? 0) + 1; }
            const layoutRoots = {};
            for (const l of layouts) for (const r of l.args?.endData?.layoutRoots ?? []) { const k = await describe(r.nodeId); layoutRoots[k] = (layoutRoots[k] ?? 0) + 1; }
            res.trace = {
                steps, layouts: layouts.length, layoutRoots, recalcs: recalcs.length,
                recalcElements: recalcs.map((e) => e.args?.elementCount ?? e.args?.data?.elementCount).filter((x) => x != null),
                paints: paints.length, paintNodes, frames,
                mainMs: +(tasks.reduce((a, e) => a + e.dur, 0) / 1000).toFixed(1),
                mainMsPerStep: +(tasks.reduce((a, e) => a + e.dur, 0) / 1000 / steps).toFixed(3),
            };
        }
        res.styleWrites = await page.evaluate(() => window.__styleWrites);

        // frame pacing: a continuous wheel scroll from the top, 100 px every 16 ms
        await page.evaluate(() => scrollTo(0, 0));
        await raf2(page);
        await page.evaluate(() => { window.__fr = []; let last = performance.now(); const tick = (t) => { window.__fr.push(t - last); last = t; if (window.__fr.length < 2000) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
        const n = Math.ceil(maxScroll / 100);
        for (let k = 0; k < n; k++) { await page.mouse.wheel(0, 100); await page.waitForTimeout(16); }
        await page.waitForTimeout(300);
        const fr = (await page.evaluate(() => window.__fr.slice(2))).sort((a, b) => a - b);
        const q = (p) => +fr[Math.min(fr.length - 1, Math.floor(fr.length * p))].toFixed(1);
        res.pacing = { frames: fr.length, p50: q(0.5), p95: q(0.95), max: q(1), over33: fr.filter((x) => x > 33.4).length };
    } finally {
        await ctx.close();
    }
    return res;
}

const B = { chromium, webkit }[engineName];
const browser = await B.launch();
try {
    const out = { engine: engineName, cell: cellArg, variants: [] };
    out.variants.push(await variant(browser, "built", "paused=1"));
    out.variants.push(await variant(browser, "still", "paused=1&still=1"));
    out.variants.push(await variant(browser, "bite-lag-as-top", "paused=1", "lag-as-top"));
    out.variants.push(await variant(browser, "built-live-blob", ""));
    const f = join(DATA, `cost-${engineName}-${cellArg.replace(/:/g, "-")}.json`);
    writeFileSync(f, JSON.stringify(out, null, 1));
    console.log(f);
} finally {
    await browser.close();
}
