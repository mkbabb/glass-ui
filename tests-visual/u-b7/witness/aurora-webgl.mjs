// glass-ui U/B7 · the aurora WebGL witness (atlas PLAN §5.6, R-INTERACT §7).
//
// WHY CHROME FOR TESTING. R-INTERACT §7 left the aurora's WebGL path unmeasured: the
// Playwright headless shell (SwiftShader) resolves `renderMode: "auto"` and any forced
// arm under a software renderer to the "css" substrate, so the GPU path never ran.
// Measuring it needs a hardware GL context, which on this Mac is ANGLE over Metal. That
// is the named GPU/ANGLE-Metal witness the machine law allows full Chrome for Testing
// for (Playwright channel "chromium", revision 1228). It runs headless (new headless),
// never headed, never the owner's Google Chrome, one browser per run, a new context per
// cell, closed in `finally`. Launch only through ~/.claude/guard/guarded.
//
// What it records, per cell and per scroll step: `data-aurora-substrate`, the renderer
// status (engine), ground encodes (`toDataURL` calls on a canvas no larger than 16 px,
// the fallback ground's raster), style writes on `.aurora-placeholder`, and main-thread
// task time (CDP `Performance.getMetrics` TaskDuration delta).
//
// usage: GLASS_URL=http://127.0.0.1:<port> node aurora-webgl.mjs <label> <outfile>
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const req = createRequire(new URL("../../../package.json", import.meta.url));
const { chromium } = req("playwright");
const url = process.env.GLASS_URL;
const [label = "run", outFile] = process.argv.slice(2);
const STEPS = 12;

const cells = [
    { name: "webgl2-forced", query: "scene=aurora-scroll&mode=webgl&engine=webgl2" },
    { name: "webgl-mode", query: "scene=aurora-scroll&mode=webgl" },
];

const browser = await chromium.launch({
    channel: "chromium",
    headless: true,
    args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--enable-gpu-rasterization"],
});
const result = { label, browser: browser.version(), cells: [] };
try {
    for (const cell of cells) {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            await context.addInitScript(() => {
                const w = window;
                w.__groundEncodes = 0;
                const orig = HTMLCanvasElement.prototype.toDataURL;
                HTMLCanvasElement.prototype.toDataURL = function (...args) {
                    if (this.width <= 16 && this.height <= 16) w.__groundEncodes += 1;
                    return orig.apply(this, args);
                };
            });
            const page = await context.newPage();
            const cdp = await context.newCDPSession(page);
            await cdp.send("Performance.enable");
            const taskMs = async () => {
                const { metrics } = await cdp.send("Performance.getMetrics");
                return 1000 * (metrics.find((m) => m.name === "TaskDuration")?.value ?? 0);
            };
            await page.goto(`${url}/tests-visual/u-b7/harness.html?${cell.query}`);
            await page.waitForFunction(() => window.__ready);
            await page.waitForTimeout(2500);
            const head = await page.evaluate(() => {
                const root = document.querySelector(".aurora-root");
                const gl = document.querySelector("canvas.aurora-canvas");
                window.__groundWrites = 0;
                const mo = new MutationObserver((r) => (window.__groundWrites += r.length));
                for (const el of document.querySelectorAll(".aurora-placeholder")) {
                    mo.observe(el, { attributes: true, attributeFilter: ["style"] });
                }
                return {
                    substrate: root?.getAttribute("data-aurora-substrate") ?? null,
                    status: window.__auroraStatus ?? null,
                    armed: !!document.querySelector(".aurora-canvas--armed"),
                    canvas: gl ? [gl.width, gl.height] : null,
                    encodesAtRest: window.__groundEncodes,
                };
            });
            const steps = [];
            for (let i = 0; i < STEPS; i++) {
                const t0 = await taskMs();
                const e0 = await page.evaluate(() => [window.__groundEncodes, window.__groundWrites]);
                await page.mouse.wheel(0, 240);
                await page.waitForTimeout(200);
                const t1 = await taskMs();
                const e1 = await page.evaluate(() => [window.__groundEncodes, window.__groundWrites, scrollY]);
                steps.push({
                    step: i + 1,
                    scrollY: e1[2],
                    encodes: e1[0] - e0[0],
                    groundWrites: e1[1] - e0[1],
                    mainThreadMs: Math.round((t1 - t0) * 10) / 10,
                });
            }
            result.cells.push({ ...cell, ...head, steps });
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
const text = JSON.stringify(result, null, 1);
if (outFile) writeFileSync(outFile, text);
for (const c of result.cells) {
    const sum = (k) => c.steps.reduce((a, s) => a + s[k], 0);
    const ms = c.steps.map((s) => s.mainThreadMs).sort((a, b) => a - b);
    console.log(
        label, c.name, "substrate", c.substrate, "engine", c.status?.engine, c.status?.phase, "armed", c.armed,
        "| encodes", sum("encodes"), "writes", sum("groundWrites"),
        "| main ms/step median", ms[Math.floor(ms.length / 2)], "max", ms.at(-1),
    );
}
