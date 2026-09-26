// D2-G prototype · the cost row (REGISTRY §6 question 2 on the real dock): does the dock's
// extent keep moving under a 1.2 s main-thread block? The block test's method
// (D2-G-block.md §3, D2-D Q2) moved from a static page onto a built dock:
//
//   - the scene's morph dock at rest, probe paint "plate" (the plate magenta on white);
//   - `__scene.expand()`, then two rAFs (the episode's animations are committed), then a
//     1,200 ms busy loop on the main thread;
//   - the context's screencast (recordVideo, one video px per CSS px), ffmpeg frames at the
//     encoder's rate (40 ms apart, lib.mjs `screencast`), the plate's painted extent read as
//     the magenta run on the dock's centre row.
//
// Per cell: the extent when the block starts and ends, the travel inside the block, and the
// longest stall (consecutive frames with one extent while not at the target). The control is
// the floor build (floor.patch alone, its own adapter), whose extent is a main-thread spring.
//
//   node D2-G-cost.mjs --build <dir> --adapter <adapter.mjs> --label <name> --out <dir> [--engine chromium,webkit] [--reps 2] [--after <ms>]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { openTarget, launch, screencast, readFrame, probeMode, extentNow } from "../harness/lib.mjs";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const build = arg("build"), adapter = arg("adapter"), label = arg("label", "build"), out = arg("out");
const engineList = arg("engine", "chromium,webkit").split(","), reps = +arg("reps", 2);
// --after <ms>: start the block this long after the expand call (default: two rAFs after it)
const after = arg("after", null);
const BLOCK_MS = 1200;
const load = () => +os.loadavg()[0].toFixed(2);

const target = await openTarget({ build, adapter: path.resolve(adapter) });
const cells = [];
for (const engine of engineList) {
    const browser = await launch(engine);
    for (let rep = 1; rep <= reps; rep++) {
        const dir = path.join(out, `${label}-${engine}-${rep}`);
        let rest = null, marks = null;
        const l0 = load();
        const { frames } = await screencast(browser, target, "morph", {
            ctx: { deviceScaleFactor: 1 }, dir,
            crop: () => ({ x: 0, y: (rest.t + rest.b) / 2 - 2, width: 1440, height: 4 }),
        }, async (page, mark) => {
            rest = await extentNow(page);
            await probeMode(page, "plate");
            await page.waitForTimeout(400);
            mark("go");
            marks = await page.evaluate(([ms, afterMs]) => new Promise((res) => {
                const t0 = performance.now();
                window.__scene.expand();
                const block = () => {
                    const b0 = performance.now();
                    while (performance.now() - b0 < ms) { /* the block */ }
                    res({ blockStart: b0 - t0, blockEnd: performance.now() - t0 });
                };
                if (afterMs != null) setTimeout(block, afterMs);
                else requestAnimationFrame(() => requestAnimationFrame(block));
            }), [BLOCK_MS, after == null ? null : +after]);
            mark("done");
            await page.waitForTimeout(900);
            marks.after = await extentNow(page);
        });
        // extent per frame: the magenta run on the centre row of the crop
        const widths = frames.map((f) => {
            const img = readFrame(f);
            const y = Math.floor(img.h / 2);
            let lo = -1, hi = -1;
            for (let x = 0; x < img.w; x++) {
                const i = (y * img.w + x) * 4, r = img.data[i], g = img.data[i + 1], b = img.data[i + 2];
                if (r > 180 && g < 110 && b > 180) { if (lo < 0) lo = x; hi = x; }
            }
            return lo < 0 ? 0 : hi - lo + 1;
        });
        const from = rest.r - rest.l, to = marks.after.r - marks.after.l;
        // the first frame that leaves the rest marks the episode's start; the block starts
        // blockStart ms after the expand call and lasts BLOCK_MS
        const first = widths.findIndex((w) => w > 0 && Math.abs(w - from) > 2);
        const startMs = first < 0 ? null : first * 40;
        const inBlock = (i) => startMs != null && i * 40 >= startMs + marks.blockStart - 40 && i * 40 <= startMs + marks.blockEnd - 40;
        const blockW = widths.filter((_, i) => inBlock(i));
        let stall = 0, run = 0;
        for (let i = 1; i < widths.length; i++) {
            if (!inBlock(i)) { run = 0; continue; }
            if (widths[i] === widths[i - 1] && Math.abs(widths[i] - to) > 2) { run += 40; stall = Math.max(stall, run); } else run = 0;
        }
        const cell = {
            label, engine: engine === "webkit" ? "Playwright WebKit" : "Chromium", rep, from: +from.toFixed(2), to: +to.toFixed(2),
            block: { startMs: +marks.blockStart.toFixed(1), endMs: +marks.blockEnd.toFixed(1) },
            framesInBlock: blockW.length,
            extentAtBlockStart: blockW[0] ?? null, extentAtBlockEnd: blockW.at(-1) ?? null,
            travelInBlock: blockW.length ? Math.max(...blockW) - Math.min(...blockW) : null,
            reachedTargetInBlock: blockW.some((w) => Math.abs(w - to) <= 2),
            longestStallMs: stall, widths, loadBefore: l0, loadAfter: load(),
        };
        cells.push(cell);
        console.log(`${cell.engine} ${label} rep ${rep}: ${from.toFixed(1)} → ${to.toFixed(1)} px; block ${cell.block.startMs}-${cell.block.endMs} ms after expand; ${cell.framesInBlock} frames in block; extent ${cell.extentAtBlockStart} → ${cell.extentAtBlockEnd} (travel ${cell.travelInBlock} px, target reached in block: ${cell.reachedTargetInBlock}); longest stall ${stall} ms  [load ${l0} → ${cell.loadAfter}]`);
    }
    await browser.close();
}
await target.close();
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, `cost-${label}.json`), JSON.stringify(cells, null, 1));
