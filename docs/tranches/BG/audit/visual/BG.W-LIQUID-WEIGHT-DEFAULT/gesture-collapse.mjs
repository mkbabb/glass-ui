// dock-collapse-expand (row 4) — hover-expand then collapse the collapsible dock.
// Verify: glyph aspect stays 1:1 (no distortion any frame), BUTTERY cadence.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const CDP = process.env.CDP_URL || "http://localhost:9477";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-LIQUID-WEIGHT-DEFAULT";

const b = await chromium.connectOverCDP(CDP);
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5200/?capture=/dock/overview&mode=light", { waitUntil: "load" });
await p.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
await p.waitForTimeout(1000);

// Find the first collapsible dock (the "Collapsible (hover to expand)" section dock).
const box = await p.evaluate(() => {
    const docks = [...document.querySelectorAll(".glass-dock")];
    // pick a dock that is NOT the always-expanded shell / media transport — the collapsible one
    // heuristic: the collapsible section dock sits in the upper content area
    const cand = docks.map((d) => ({ d, r: d.getBoundingClientRect() }))
        .filter((o) => o.r.top > 120 && o.r.top < 700 && o.r.width > 40)
        .sort((a, b) => a.r.top - b.r.top);
    if (!cand.length) return null;
    const dock = cand[0].d;
    window.__dock = dock;
    window.__samples = [];
    window.__marks = {};
    let run = true;
    window.__stop = () => (run = false);
    window.__mark = (n) => (window.__marks[n] = performance.now());
    const tick = () => {
        if (!run) return;
        const dr = dock.getBoundingClientRect();
        // glyph aspect: measure each visible svg's width/height ratio
        const svgs = [...dock.querySelectorAll("svg")].map((s) => {
            const r = s.getBoundingClientRect();
            return r.width > 2 && r.height > 2 ? +(r.width / r.height).toFixed(4) : null;
        }).filter((v) => v != null);
        window.__samples.push({ t: performance.now(), dockW: +dr.width.toFixed(1), glyphAspects: svgs });
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const r = dock.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width };
});
if (!box) { console.log(JSON.stringify({ error: "no collapsible dock" })); await b.close(); process.exit(1); }

// EXPAND: hover the dock.
await p.mouse.move(box.x, box.y);
await p.evaluate(() => window.__mark("expand"));
await p.waitForTimeout(700);
// mid-expand screenshot already settled; capture the expanded state
await p.screenshot({ path: `${OUT}/lwd-dock-expanded-light.png`, fullPage: false });
// COLLAPSE: move away.
await p.mouse.move(box.x, 200);
await p.evaluate(() => window.__mark("collapse"));
await p.waitForTimeout(700);
await p.evaluate(() => window.__stop());

const data = await p.evaluate(() => ({ samples: window.__samples, marks: window.__marks }));
await ctx.close();
await b.close();

const { samples, marks } = data;
const FRAME = 1000 / 60;
// gesture windows: expand..expand+500, collapse..collapse+500
const analyze = (t0) => {
    const w = samples.filter((s) => s.t >= t0 && s.t <= t0 + 550);
    const gaps = [];
    for (let i = 1; i < w.length; i++) gaps.push(w[i].t - w[i - 1].t);
    const maxGap = gaps.length ? Math.max(...gaps) : 0;
    // glyph aspect distortion: any glyph aspect deviating from 1.0 by > 3%
    let worstAspect = 1;
    for (const s of w) for (const a of s.glyphAspects) if (Math.abs(a - 1) > Math.abs(worstAspect - 1)) worstAspect = a;
    const dockWs = w.map((s) => s.dockW);
    return {
        frames: w.length,
        maxGapMs: maxGap.toFixed(1),
        longFrames_gt50: gaps.filter((g) => g > 50).length,
        gaps_gt33: gaps.filter((g) => g > 2 * FRAME).length,
        worstGlyphAspect: worstAspect.toFixed(4),
        dockW_min: Math.min(...dockWs).toFixed(0), dockW_max: Math.max(...dockWs).toFixed(0),
    };
};
console.log(JSON.stringify({ expand: analyze(marks.expand), collapse: analyze(marks.collapse) }, null, 2));
