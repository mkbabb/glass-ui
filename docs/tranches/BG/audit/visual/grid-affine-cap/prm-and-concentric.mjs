// (1) PRM-static: liquid-grid under prefers-reduced-motion must be STATIC (two frames ~700ms
//     apart byte-near-identical — the warp freezes mid-breath). (2) Concentric sanity: the shared
//     waveFlow leaf tune must not regress concentric (it still paints its contours).
import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "fs";
import crypto from "crypto";

const CDP = "http://localhost:9333";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/";

async function pollReady(page, ms = 15000) {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) return Date.now() - t0;
        await page.waitForTimeout(150);
    }
    return -1;
}
async function vizClip(page) {
    return page.evaluate(() => {
        const cs = Array.from(document.querySelectorAll("canvas"));
        let v = null;
        for (const c of cs) { const r = c.getBoundingClientRect(); if (r.width > 0 && r.width < window.innerWidth - 50) { v = c; break; } }
        if (!v) v = cs[cs.length - 1];
        v.scrollIntoView({ block: "center" });
        return true;
    }).then(() => page.waitForTimeout(500)).then(() => page.evaluate(() => {
        const cs = Array.from(document.querySelectorAll("canvas"));
        let v = null;
        for (const c of cs) { const r = c.getBoundingClientRect(); if (r.width > 0 && r.width < window.innerWidth - 50) { v = c; break; } }
        if (!v) v = cs[cs.length - 1];
        const r = v.getBoundingClientRect();
        return { x: Math.max(0, Math.round(r.x)), y: Math.max(0, Math.round(r.y)), width: Math.round(r.width), height: Math.round(r.height) };
    }));
}
function frameDiff(a, b) {
    const pa = PNG.sync.read(fs.readFileSync(a)), pb = PNG.sync.read(fs.readFileSync(b));
    if (pa.width !== pb.width || pa.height !== pb.height) return { changedFrac: 1, note: "dim-mismatch" };
    let changed = 0, tot = 0;
    for (let i = 0; i < pa.data.length; i += 4 * 7) {
        const d = Math.abs(pa.data[i] - pb.data[i]) + Math.abs(pa.data[i + 1] - pb.data[i + 1]) + Math.abs(pa.data[i + 2] - pb.data[i + 2]);
        if (d > 12) changed++;
        tot++;
    }
    return { changedFrac: +(changed / tot).toFixed(4) };
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());

// (1) PRM-static liquid-grid
{
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/substrates/liquid-grid")}&mode=light`, { waitUntil: "load", timeout: 30000 });
    await pollReady(page);
    const clip = await vizClip(page);
    const f1 = `${OUT}liquid-grid-chrome-prm-frame1.png`, f2 = `${OUT}liquid-grid-chrome-prm-frame2.png`;
    await page.screenshot({ path: f1, clip });
    await page.waitForTimeout(750);
    await page.screenshot({ path: f2, clip });
    const diff = frameDiff(f1, f2);
    console.log("PRM_STATIC:" + JSON.stringify({ clip, diff, f1, f2 }));
    await page.close();
}

// (2) Concentric sanity — the shared waveFlow leaf tune must not regress it
{
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/substrates/concentric")}&mode=light`, { waitUntil: "load", timeout: 30000 });
    const ready = await pollReady(page);
    const clip = await vizClip(page);
    const fp = `${OUT}concentric-chrome-light-reverify.png`;
    await page.screenshot({ path: fp, clip });
    // variance readback (contours present => real signal)
    const png = PNG.sync.read(fs.readFileSync(fp));
    let sum = 0, sum2 = 0, n = 0, mn = 255, mx = 0;
    for (let y = 0; y < png.height; y += 3) for (let x = 0; x < png.width; x += 3) {
        const i = (y * png.width + x) * 4;
        const L = 0.299 * png.data[i] + 0.587 * png.data[i + 1] + 0.114 * png.data[i + 2];
        sum += L; sum2 += L * L; n++; mn = Math.min(mn, L); mx = Math.max(mx, L);
    }
    const mean = sum / n, sd = Math.sqrt(sum2 / n - mean * mean);
    console.log("CONCENTRIC_REVERIFY:" + JSON.stringify({ ready, clip, fp, lum: { mean: +mean.toFixed(1), sd: +sd.toFixed(2), min: +mn.toFixed(1), max: +mx.toFixed(1) } }));
    await page.close();
}

await browser.close();
