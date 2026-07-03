// BG.W-VIZ-REVEAL-BLOOM — the LIVE (non-capture) reveal-bloom computational probe.
// Capture mode neutralizes CSS animations by design, so the reveal-bloom overshoot is
// verified in a NORMAL demo load: per route, freshly navigate, then poll the canvas's
// computed `filter` while the one-shot `@keyframes substrate-reveal-bloom` runs, and
// confirm: (a) data-substrate-reveal attr fired on first-visible, (b) getAnimations()
// carries the substrate-reveal-bloom animation, (c) the brightness OVERSHOOTS past 1.0
// (≥+12% peak) then settles to ~1.0, (d) canvas rect stays scale(1) (field bloom, no
// box-zoom), (e) glContextCount is bounded (one-GL-per-route budget).
import { chromium } from "playwright";

const BASE = "http://localhost:5200";
const ROUTES = [
    "/substrates",
    "/substrates/aurora",
    "/substrates/blob",
    "/substrates/constellation",
    "/substrates/fourier-field",
];
const MODES = ["light", "dark"];

const CDP = process.env.CDP_URL || "http://localhost:9477";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The in-page probe: freshly reload the route (so the one-shot reveal re-fires from
// cold), then sample the canvas filter over ~1s at ~60Hz. Returns the sampled ramp +
// the machinery facts. Runs in a NON-capture URL (no ?capture= param).
const PROBE = () => {
    return new Promise((resolve) => {
        const parseBrightness = (filterStr) => {
            if (!filterStr || filterStr === "none") return 1;
            const m = /brightness\(([^)]+)\)/.exec(filterStr);
            return m ? parseFloat(m[1]) : 1;
        };
        const parseSaturate = (filterStr) => {
            if (!filterStr || filterStr === "none") return 1;
            const m = /saturate\(([^)]+)\)/.exec(filterStr);
            return m ? parseFloat(m[1]) : 1;
        };
        // Find the reveal-target canvas. The attr may not have fired yet at t0.
        const findCanvas = () =>
            document.querySelector("canvas[data-substrate-reveal]") ||
            document.querySelector("main canvas");

        const t0 = performance.now();
        const samples = [];
        let attrEverSeen = false;
        let animEverSeen = false;
        let scaleViolation = false;
        let firstAttrMs = -1;

        const tick = () => {
            const cv = findCanvas();
            const now = performance.now() - t0;
            if (cv) {
                const cs = getComputedStyle(cv);
                const b = parseBrightness(cs.filter);
                const s = parseSaturate(cs.filter);
                const hasAttr = cv.hasAttribute("data-substrate-reveal");
                if (hasAttr && !attrEverSeen) {
                    attrEverSeen = true;
                    firstAttrMs = now;
                }
                // getAnimations on the canvas — the running substrate-reveal-bloom
                const anims = (cv.getAnimations ? cv.getAnimations() : []).map(
                    (a) => a.animationName || (a.effect && a.effect.getKeyframes ? "css" : "?"),
                );
                if (anims.some((n) => String(n).includes("substrate-reveal-bloom")))
                    animEverSeen = true;
                // transform: the FIELD bloom keeps scale(1). Read the matrix scale.
                const tr = cs.transform;
                if (tr && tr !== "none") {
                    const m = /matrix\(([^)]+)\)/.exec(tr);
                    if (m) {
                        const parts = m[1].split(",").map(parseFloat);
                        const sx = parts[0];
                        const sy = parts[3];
                        if (Math.abs(sx - 1) > 0.02 || Math.abs(sy - 1) > 0.02)
                            scaleViolation = true;
                    }
                }
                samples.push({ ms: Math.round(now), b: +b.toFixed(4), s: +s.toFixed(4), hasAttr });
            } else {
                samples.push({ ms: Math.round(now), b: null, s: null, hasAttr: false });
            }
            if (now < 1400) requestAnimationFrame(tick);
            else {
                const bs = samples.map((x) => x.b).filter((x) => x != null);
                const peak = bs.length ? Math.max(...bs) : null;
                const last = bs.length ? bs[bs.length - 1] : null;
                const min = bs.length ? Math.min(...bs) : null;
                resolve({
                    canvasFound: !!findCanvas(),
                    attrEverSeen,
                    animEverSeen,
                    firstAttrMs,
                    scaleViolation,
                    peakBrightness: peak,
                    minBrightness: min,
                    lastBrightness: last,
                    overshootPct: peak != null ? +((peak - 1) * 100).toFixed(2) : null,
                    sampleCount: samples.length,
                    // a compact ramp trace (every ~8th sample) for the DELTA
                    ramp: samples.filter((_, i) => i % 6 === 0).map((x) => [x.ms, x.b]),
                });
            }
        };
        requestAnimationFrame(tick);
    });
};

const GL_COUNT = () => {
    // Count live WebGL/WebGL2 contexts by probing canvases. A rough one-GL-per-route check.
    const cvs = Array.from(document.querySelectorAll("canvas"));
    let gl = 0;
    for (const c of cvs) {
        // A canvas already holding a GL context returns the same context object; a fresh
        // getContext on a 2d canvas would return null for webgl2. Best-effort count of
        // canvases that ARE gl-backed (has a __glProbed marker or reports a drawingBuffer).
        try {
            const ctx =
                c.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
                c.getContext("webgl");
            if (ctx) gl++;
        } catch {
            /* 2d canvas throws-free returns null */
        }
    }
    return { canvasCount: cvs.length, glCanvasCount: gl };
};

async function main() {
    const browser = await chromium.connectOverCDP(CDP);
    const results = {};
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            deviceScaleFactor: 2,
            colorScheme: mode,
            viewport: { width: 1440, height: 900 },
        });
        for (const route of ROUTES) {
            const page = await ctx.newPage();
            const renderer = { glRenderer: "?" };
            // Non-capture navigation — the reveal-bloom runs live.
            await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
            // Let the SPA settle + the viz mount. The reveal fires on first-visible.
            await page.waitForTimeout(500);
            // Probe the reveal ramp (freshly reloads to catch the cold one-shot).
            await page.reload({ waitUntil: "domcontentloaded" });
            // GL renderer probe
            try {
                renderer.glRenderer = await page.evaluate(() => {
                    const c = document.createElement("canvas");
                    const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-gl";
                    const ext = gl.getExtension("WEBGL_debug_renderer_info");
                    return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "masked";
                });
            } catch (e) {
                renderer.glRenderer = "probe-err";
            }
            const probe = await page.evaluate(PROBE);
            const glc = await page.evaluate(GL_COUNT);
            const key = `${route}|${mode}`;
            results[key] = { ...probe, ...glc, glRenderer: renderer.glRenderer };
            console.log(
                `${key.padEnd(38)} attr=${probe.attrEverSeen} anim=${probe.animEverSeen} peak=${probe.peakBrightness} overshoot=${probe.overshootPct}% last=${probe.lastBrightness} scaleOK=${!probe.scaleViolation} glCv=${glc.glCanvasCount} gpu=${renderer.glRenderer.slice(0, 40)}`,
            );
            await page.close();
        }
        await ctx.close();
    }
    await browser.close();
    console.log("\n===JSON===");
    console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
    console.error("PROBE FAILED", e);
    process.exit(1);
});
