// Critic 4 fifth probe (orchestrator-note-mark-press.md, O-247): does the run mark's first
// measure force the new dock's layout inside the mount task? A dock mounts on demand
// (the second probe's `mountdock` scene), with and without a marked run. Two readings:
//  - in the page: every getBoundingClientRect, getClientRects and getComputedStyle call
//    made between the state change and the end of Vue's flush, in order, with the source
//    file that made it (from the stack) and how long the call took;
//  - Chromium only, at 4x CPU: a trace of the same task, counting Layout events between
//    the two user-timing marks and naming the script frame that forced each.
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
mkdirSync(join(outDir, "png"), { recursive: true });
const PATH = "/docs/release-11.1.0/critic-4/probe4/harness/index.html";
const cells = [];
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

const instrument = async () => {
    const calls = [];
    let on = false;
    const owner = () => {
        const lines = (new Error().stack ?? "").split("\n").map((l) => l.trim()).filter((l) => /\/src\//.test(l));
        const m = lines[0]?.match(/\/src\/([^?:)]+)/);
        return m ? m[1].split("/").slice(-1)[0] : "other";
    };
    const wrap = (obj, name, api) => {
        const orig = obj[name];
        obj[name] = function (...a) {
            if (!on) return orig.apply(this, a);
            const t = performance.now();
            const r = orig.apply(this, a);
            calls.push({ api, owner: owner(), ms: +(performance.now() - t).toFixed(3) });
            return r;
        };
    };
    wrap(Element.prototype, "getBoundingClientRect", "rect");
    wrap(Element.prototype, "getClientRects", "rects");
    wrap(window, "getComputedStyle", "style");
    on = true;
    const t0 = performance.now();
    await window.__mountDock();
    const task = +(performance.now() - t0).toFixed(2);
    on = false;
    for (let i = 0; i < 3; i++) await new Promise((r) => requestAnimationFrame(r));
    const run = document.querySelector(".dock-run");
    return { taskMs: task, calls, markAfter3Frames: run?.hasAttribute("data-run-mark") ?? false };
};
const summarize = (r) => {
    const by = {};
    for (const c of r.calls) { const k = c.owner; by[k] ??= { n: 0, ms: 0 }; by[k].n++; by[k].ms = +(by[k].ms + c.ms).toFixed(3); }
    return { taskMs: r.taskMs, reads: r.calls.length, first: r.calls[0] ?? null, byOwner: by, markAfter3Frames: r.markAfter3Frames };
};

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    for (const width of [390, 1440]) for (const marked of [1, 0]) for (const rep of [1, 2, 3]) {
        const name = `${width}-${marked ? "marked" : "unmarked"}-${rep}`;
        const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "no-preference" });
        try {
            const page = await context.newPage();
            await page.goto(`${base}${PATH}?scene=mountdock&marked=${marked}`, { waitUntil: "load" });
            await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(700);
            let cdp = null;
            if (engineName === "chromium") { cdp = await context.newCDPSession(page); await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 }); }
            const traced = engineName === "chromium" && rep === 1;
            if (traced) await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline.stack", "blink.user_timing"] });
            const r = await page.evaluate(instrument);
            let trace = null;
            if (traced) {
                const events = JSON.parse((await browser.stopTracing()).toString()).traceEvents;
                const mark = (n) => events.find((e) => e.name === n)?.ts;
                const a = mark("c4-mount-start"), b = mark("c4-mount-end");
                const layouts = a && b ? events.filter((e) => e.name === "Layout" && e.ph === "X" && e.ts >= a && e.ts <= b) : [];
                trace = { marks: !!(a && b), taskMs: a && b ? +((b - a) / 1000).toFixed(2) : null, layouts: layouts.map((e) => ({ ms: +(e.dur / 1000).toFixed(2), forcedBy: (e.args?.beginData?.stackTrace ?? []).map((f) => `${(f.url ?? "").split("/").pop().split("?")[0]}:${f.functionName}`).slice(0, 4) })) };
            }
            cells.push({ cell: name, throttle: engineName === "chromium" ? 4 : 1, ...summarize(r), trace });
        } catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300) }); } finally { await context.close(); }
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
for (const c of cells) console.log(c.cell, c.error ?? `task ${c.taskMs} ms, ${c.reads} reads, first ${JSON.stringify(c.first)}, by ${JSON.stringify(c.byOwner)}${c.trace ? `, trace ${JSON.stringify(c.trace)}` : ""}`);
console.log(label, engineName, cells.length, "cells", cells.filter((c) => c.error).length, "errors");
