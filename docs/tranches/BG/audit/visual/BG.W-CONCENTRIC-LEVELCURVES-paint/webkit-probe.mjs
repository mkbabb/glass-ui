// playwright-webkit probe: console/pageerror capture + per-canvas element-screenshot
// stats, isolating whether concentric-specific blank persists on the WebKit substrate
// (aurora on the SAME createGpuSubstrate is the control).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { webkit } = require("playwright");
const { PNG } = require("pngjs");
import fs from "node:fs";

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-CONCENTRIC-LEVELCURVES-paint";
const ROUTE = "/substrates/concentric";
const mode = process.argv[2] || "light";

const stats = (buf) => {
    const png = PNG.sync.read(buf);
    const { width, height, data } = png;
    const lum = (r, g, b) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const Ls = [];
    let sumL = 0;
    for (let i = 0; i < data.length; i += 4) { const L = lum(data[i], data[i + 1], data[i + 2]); Ls.push(L); sumL += L; }
    const meanL = sumL / Ls.length;
    let v = 0; for (const L of Ls) v += (L - meanL) ** 2; const stdL = Math.sqrt(v / Ls.length);
    let e = 0, en = 0;
    for (let y = 1; y < height - 1; y += 2) for (let x = 1; x < width - 1; x += 2) {
        const L = Ls[y * width + x], Lr = Ls[y * width + x + 1], Ld = Ls[(y + 1) * width + x];
        e += Math.abs(L - Lr) + Math.abs(L - Ld); en++;
    }
    return { w: width, h: height, meanL: +meanL.toFixed(4), stdL: +stdL.toFixed(4), edge: +(e / en).toFixed(5) };
};

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode });
const page = await ctx.newPage();
const consoleMsgs = [];
const pageErrors = [];
page.on("console", (m) => consoleMsgs.push(`${m.type()}: ${m.text()}`));
page.on("pageerror", (e) => pageErrors.push(String(e)));

await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
await page.waitForTimeout(2000);

const env = await page.evaluate(() => ({
    hasGpu: typeof navigator.gpu !== "undefined",
    webgl2: (() => { try { return !!document.createElement("canvas").getContext("webgl2"); } catch { return false; } })(),
    canvases: Array.from(document.querySelectorAll("canvas")).map((c) => ({ cls: c.className.split(" ").slice(0, 2).join(" "), backW: c.width, backH: c.height, opacity: getComputedStyle(c).opacity })),
}));

// element screenshots (composited GL) for aurora control + concentric target
const results = {};
for (const sel of ["canvas.aurora-canvas", "canvas.concentric-canvas"]) {
    const loc = page.locator(sel).first();
    if (await loc.count()) {
        // scroll into view for concentric (below fold)
        await loc.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        const buf = await loc.screenshot();
        const key = sel.includes("aurora") ? "aurora" : "concentric";
        fs.writeFileSync(`${OUT}/wkpw-${key}-${mode}.png`, buf);
        results[key] = stats(buf);
    }
}

console.log(JSON.stringify({ mode, env, results, consoleMsgs: consoleMsgs.slice(-20), pageErrors }, null, 2));
await browser.close();
