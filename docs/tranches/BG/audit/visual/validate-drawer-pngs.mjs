import { isRealPng, pngDimensions, pngRegionStats } from "../../../../../scripts/reflect-capture-verify.mjs";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
const dir = resolve(".");
const pngs = readdirSync(dir).filter((f) => f.startsWith("drawer-") && f.endsWith(".png")).sort();
const out = [];
for (const f of pngs) {
    const p = resolve(dir, f);
    const real = isRealPng(p);
    const dims = pngDimensions(p);
    // body region: central band to measure luminance variance (non-blank content)
    let variance = null, mean = null;
    try {
        const w = dims.width, h = dims.height;
        const stats = pngRegionStats(p, { x: Math.floor(w * 0.25), y: Math.floor(h * 0.35), w: Math.floor(w * 0.5), h: Math.floor(h * 0.3) });
        variance = stats.lumaVariance ?? stats.variance ?? null;
        mean = stats.lumaMean ?? stats.mean ?? null;
    } catch (e) { variance = `err:${e.message}`; }
    out.push({ f, real, w: dims.width, h: dims.height, mean, variance, nonBlank: typeof variance === "number" ? variance > 1 : null });
}
console.log(JSON.stringify(out, null, 2));
console.log("ALL_REAL=" + out.every((o) => o.real));
console.log("ALL_2880x1800_or_chrome=" + out.every((o) => (o.w === 2880 && o.h === 1800)));
