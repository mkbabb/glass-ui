// Quick Chrome motion sanity: N frames of the concentric hero, bounded per-frame ΔmeanLum,
// all-distinct (alive, not frozen). Confirms the field flow is healthy on the working engine.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const { PNG } = require("pngjs");
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-CONCENTRIC-LEVELCURVES-paint";
const mode = process.argv[2] || "light";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const meanL = (buf) => { const p = PNG.sync.read(buf); let s = 0; for (let i = 0; i < p.data.length; i += 4) s += (0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]) / 255; return s / (p.data.length / 4); };

const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: mode });
const page = await ctx.newPage();
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/substrates/concentric")}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
const el = page.locator("canvas.concentric-canvas").first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
const means = [];
let prev = null, maxD = 0;
const N = 10, gap = 500;
for (let i = 0; i < N; i++) {
    const buf = await el.screenshot();
    const m = meanL(buf);
    if (prev !== null) maxD = Math.max(maxD, Math.abs(m - prev));
    prev = m; means.push(+m.toFixed(5));
    await page.waitForTimeout(gap);
}
const distinct = new Set(means).size;
console.log(JSON.stringify({ mode, frames: N, spanMs: N * gap, distinct, maxDeltaMeanLum: +maxD.toFixed(5), means }));
await ctx.close();
await browser.close();
