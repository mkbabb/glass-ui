// BG.W-DOCK-GLYPH-RIGID — non-authoring paint judge (per-frame glyph-bbox witness).
// Connects over CDP to the running Chrome (:9222), drives /dock/overview, records
// GL_RENDERER, then exercises the collapse↔expand morph on the "Collapsible" demo
// dock. During each morph it rAF-samples the glyph bbox aspect + the live root
// plate scale + [data-morphing] — the "per-frame glyph-bbox aspect ±5% of rest"
// screencast witness (rAF DOM measure is the authoritative geometry; a PNG frame
// only shows the composited pixels, the bbox is the exact number).
import { chromium } from "playwright-core";

const MODE = process.argv[2] || "light";
const ROUTE = "/dock/overview";
const BASE = "http://localhost:5200";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${MODE}`, {
    waitUntil: "load",
    timeout: 30000,
});
for (let i = 0; i < 120; i++) {
    if (
        await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready")
        )
    )
        break;
    await sleep(100);
}
const readyPresent = await page.evaluate(() =>
    document.documentElement.hasAttribute("data-capture-ready")
);

const glRenderer = await page.evaluate(() => {
    try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return "no-webgl";
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        return ext
            ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
            : gl.getParameter(gl.RENDERER);
    } catch (e) {
        return "err:" + e.message;
    }
});

// the collapsible demo dock: horizontal, has .dock-persistent, not always-expanded
const idx = await page.evaluate(() => {
    const docks = [...document.querySelectorAll(".glass-dock")];
    for (let i = 0; i < docks.length; i++) {
        const d = docks[i];
        if (
            d.querySelector(".dock-persistent") &&
            !d.classList.contains("vertical") &&
            d.getBoundingClientRect().width < 300
        )
            return i;
    }
    return -1;
});

function measureExpr(i) {
    return (i2) => {
        const d = [...document.querySelectorAll(".glass-dock")][i2];
        if (!d) return null;
        const r = d.getBoundingClientRect();
        const persistent = d.querySelector(".dock-persistent");
        const glyph = persistent ? persistent.querySelector("svg") : null;
        const gr = glyph ? glyph.getBoundingClientRect() : null;
        const cs = getComputedStyle(d);
        return {
            w: +r.width.toFixed(2),
            h: +r.height.toFixed(2),
            pillAspect: +(r.width / r.height).toFixed(4),
            rootScale: cs.scale,
            morphing: d.getAttribute("data-morphing"),
            collapsed:
                d.classList.contains("collapsed") ||
                d.getAttribute("data-collapsed"),
            glyphW: gr ? +gr.width.toFixed(3) : null,
            glyphH: gr ? +gr.height.toFixed(3) : null,
            glyphAspect: gr ? +(gr.width / gr.height).toFixed(4) : null,
            borderRadius: cs.borderRadius,
        };
    };
}

async function measure() {
    return await page.evaluate(measureExpr(idx), idx);
}

// rAF-sample the glyph bbox while polling for [data-morphing]; sampler runs in-page
// for `durationMs`, tagging each frame with its morph state.
async function rafSeries(durationMs) {
    return await page.evaluate(
        async ({ i, durationMs }) => {
            const d = [...document.querySelectorAll(".glass-dock")][i];
            const persistent = d ? d.querySelector(".dock-persistent") : null;
            const frames = [];
            const start = performance.now();
            return await new Promise((resolve) => {
                function tick() {
                    const now = performance.now();
                    const r = d.getBoundingClientRect();
                    const cs = getComputedStyle(d);
                    const glyph = persistent
                        ? persistent.querySelector("svg")
                        : null;
                    const gr = glyph ? glyph.getBoundingClientRect() : null;
                    frames.push({
                        t: +(now - start).toFixed(1),
                        morphing: d.getAttribute("data-morphing"),
                        pillW: +r.width.toFixed(2),
                        rootScale: cs.scale,
                        glyphAspect: gr
                            ? +(gr.width / gr.height).toFixed(4)
                            : null,
                        glyphW: gr ? +gr.width.toFixed(3) : null,
                    });
                    if (now - start < durationMs) requestAnimationFrame(tick);
                    else resolve(frames);
                }
                requestAnimationFrame(tick);
            });
        },
        { i: idx, durationMs }
    );
}

// box centre helper (for real pointer)
async function pillCentre() {
    return await page.evaluate((i) => {
        const d = [...document.querySelectorAll(".glass-dock")][i];
        const r = d.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, idx);
}

const restExpanded = await measure(); // initial expanded rest

// ── COLLAPSE ──────────────────────────────────────────────────────────────────
// hover on, then leave; the dock auto-collapses after the intent delay (~3.6s).
let c = await pillCentre();
await page.mouse.move(c.x, c.y);
await sleep(60);
await page.mouse.move(30, 860); // leave far
// poll until [data-morphing] appears (up to 6s), then rAF-sample the morph.
let collapseSeries = null;
let collapseFired = false;
{
    const t0 = Date.now();
    for (let i = 0; i < 90; i++) {
        const m = await measure();
        if (m && (m.morphing != null || m.pillW < 200)) {
            collapseFired = true;
            // capture the morph window densely
            collapseSeries = await rafSeries(650);
            break;
        }
        await sleep(60);
    }
}
await sleep(600); // settle
const restCollapsed = await measure(); // collapsed rest = the circle

// ── EXPAND ────────────────────────────────────────────────────────────────────
c = await pillCentre();
let expandSeries = null;
let expandFired = false;
{
    // begin hover; expand fires after HOVER_INTENT_MS (~short). Start rAF sampler
    // slightly before the morph and let it run through.
    await page.mouse.move(c.x, c.y);
    // small settle then dwell — poll for morph onset
    const t0 = Date.now();
    let onset = false;
    for (let i = 0; i < 60; i++) {
        const m = await measure();
        if (m && (m.morphing != null || m.pillW > 120)) {
            onset = true;
            expandFired = true;
            expandSeries = await rafSeries(650);
            break;
        }
        // keep the pointer live over the pill
        await page.mouse.move(c.x + (i % 2), c.y);
        await sleep(50);
    }
    if (!onset) {
        // force via longer dwell
        await sleep(500);
        const m = await measure();
        if (m && m.pillW > 120) {
            expandFired = true;
            expandSeries = await rafSeries(400);
        }
    }
}
await sleep(600);
const restAfterExpand = await measure();

const out = {
    mode: MODE,
    route: ROUTE,
    readyPresent,
    glRenderer,
    idx,
    restExpanded,
    restCollapsed,
    restAfterExpand,
    collapseFired,
    expandFired,
    collapseSeries,
    expandSeries,
};
console.log(JSON.stringify(out));

await page.close();
await browser.close();
