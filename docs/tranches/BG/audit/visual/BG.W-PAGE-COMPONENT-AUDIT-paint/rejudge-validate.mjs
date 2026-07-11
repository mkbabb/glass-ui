// Re-judge validation — NON-AUTHORING paint judge, post-fix (suppressesShellField).
// Reads the fresh ./rejudge/ captures. Gate-parity warm read via the repo's SINGLE decoder
// leaf (reflect-capture-verify) + warmIdentityVerdict at the roster's declared probe boxes.
import {
    isRealPng,
    pngDimensions,
    pngRegionHueHistogram,
    pngRegionDelta,
    pngRegionStats,
} from "../../../../../../scripts/reflect-capture-verify.mjs";
import { warmIdentityVerdict } from "../../../../../../scripts/lib/paint-arm.mjs";
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { resolve } from "node:path";

const DIR = new URL("./rejudge/", import.meta.url).pathname;
const MIN_W = 320, MIN_H = 320;
const WARM_BAND = Object.freeze({
    warmFractionFloor: 0.55,
    chromaCeiling: 0.3,
    edgeCastCeiling: 0.16,
    topBarCeiling: 0.14,
    cornerClipFloor: 0.04,
});
const CORNER_REGION = Object.freeze({ x: 0, y: 0, w: 0.04, h: 0.04 });
const edgeRegion = (f) => ({ x: f.x, y: f.y, w: Math.min(0.02, f.w), h: f.h });

const ROWS = [
    ["display", "/display/atoms", "display-atoms", { x: 0.2, y: 0.35, w: 0.55, h: 0.3 }, { lMin: 0.3, lMax: 0.99, cMin: 0.018, cMax: 0.24 }],
    ["containers", "/containers/dialog", "containers-dialog", { x: 0.3, y: 0.3, w: 0.4, h: 0.3 }, { lMin: 0.3, lMax: 0.99, cMin: 0.018, cMax: 0.24 }],
    ["data", "/data/metrics", "data-metrics", { x: 0.15, y: 0.35, w: 0.6, h: 0.3 }, { lMin: 0.3, lMax: 0.99, cMin: 0.018, cMax: 0.24 }],
    ["feedback", "/feedback/toast", "feedback-toast", { x: 0.42, y: 0.35, w: 0.2, h: 0.2 }, { lMin: 0.3, lMax: 0.99, cMin: 0.018, cMax: 0.26 }],
    ["navigation", "/navigation/tabs", "navigation-tabs", { x: 0.2, y: 0.35, w: 0.55, h: 0.3 }, { lMin: 0.3, lMax: 0.99, cMin: 0.018, cMax: 0.24 }],
    ["compositions", "/compositions/hero", "compositions-hero", { x: 0.2, y: 0.25, w: 0.6, h: 0.4 }, { lMin: 0.3, lMax: 0.99, cMin: 0.02, cMax: 0.28 }],
    ["motion", "/motion/scroll", "motion-scroll", { x: 0.2, y: 0.35, w: 0.55, h: 0.3 }, { lMin: 0.3, lMax: 0.99, cMin: 0.018, cMax: 0.24 }],
    ["sentinel", "/forms/inputs", "forms-inputs", { x: 0.2, y: 0.35, w: 0.55, h: 0.3 }, { lMin: 0.3, lMax: 0.99, cMin: 0.018, cMax: 0.24 }],
    ["sentinel", "/compositions/math-paper", "compositions-math-paper", { x: 0.2, y: 0.3, w: 0.55, h: 0.35 }, { lMin: 0.3, lMax: 0.99, cMin: 0.015, cMax: 0.24 }],
    ["sentinel", "/containers/sheet", "containers-sheet", { x: 0.3, y: 0.3, w: 0.4, h: 0.3 }, { lMin: 0.3, lMax: 0.99, cMin: 0.018, cMax: 0.24 }],
    ["sentinel", "/data/metric-stack", "data-metric-stack", { x: 0.2, y: 0.35, w: 0.55, h: 0.3 }, { lMin: 0.3, lMax: 0.99, cMin: 0.018, cMax: 0.24 }],
];

function decodeRGBA(buf) {
    let p = 8, w = 0, h = 0, bd = 0, ct = 0;
    const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p);
        const type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; }
        else if (type === "IDAT") idat.push(data);
        else if (type === "IEND") break;
        p += 12 + len;
    }
    const ch = ct === 6 ? 4 : ct === 2 ? 3 : 1;
    if (bd !== 8) throw new Error("bd" + bd);
    const raw = inflateSync(Buffer.concat(idat));
    const stride = w * ch;
    const out = Buffer.alloc(w * h * 4);
    const prev = Buffer.alloc(stride);
    let ri = 0;
    for (let y = 0; y < h; y++) {
        const f = raw[ri++];
        const line = Buffer.alloc(stride);
        for (let x = 0; x < stride; x++) {
            const rb = raw[ri++];
            const a = x >= ch ? line[x - ch] : 0;
            const b = prev[x];
            const c = x >= ch ? prev[x - ch] : 0;
            let v;
            switch (f) {
                case 0: v = rb; break;
                case 1: v = rb + a; break;
                case 2: v = rb + b; break;
                case 3: v = rb + ((a + b) >> 1); break;
                case 4: { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v = rb + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; }
                default: v = rb;
            }
            line[x] = v & 0xff;
        }
        line.copy(prev);
        for (let x = 0; x < w; x++) {
            const s = x * ch, d = (y * w + x) * 4;
            out[d] = line[s]; out[d + 1] = ch >= 3 ? line[s + 1] : line[s];
            out[d + 2] = ch >= 3 ? line[s + 2] : line[s]; out[d + 3] = ch === 4 ? line[s + 3] : 255;
        }
    }
    return { w, h, data: out };
}

function warmRead(abs, field) {
    const hist = pngRegionHueHistogram(abs, field);
    if (!hist) return null;
    const real = isRealPng(abs);
    const dims = pngDimensions(abs);
    const captureReal = real && !!dims && dims.w >= MIN_W && dims.h >= MIN_H;
    const stats = {
        dominantFamily: hist.dominantFamily, warm: hist.warm, warmFraction: hist.warmFraction,
        meanChroma: hist.meanChroma, meanL: hist.meanL, captureReal,
    };
    const eD = pngRegionDelta(abs, edgeRegion(field), field);
    if (eD) stats.edgeDelta = eD.dE;
    const corner = pngRegionStats(abs, CORNER_REGION);
    if (corner) stats.cornerL = corner.meanL;
    return { stats, verdict: warmIdentityVerdict(stats, WARM_BAND), dims };
}

function bodyAndBadge(abs) {
    const { w, h, data } = decodeRGBA(readFileSync(abs));
    let magenta = 0, inkLo = 0, inkHi = 0;
    const xMax = Math.floor(w * 0.42), yMax = Math.floor(h * 0.3);
    for (let y = 0; y < yMax; y++) for (let x = 0; x < xMax; x++) {
        const d = (y * w + x) * 4, r = data[d], g = data[d + 1], b = data[d + 2];
        if (r > 200 && g < 80 && b > 200) magenta++;
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (lum < 40) inkLo++; if (lum > 225) inkHi++;
    }
    let n = 0, sum = 0, sq = 0;
    const y0 = Math.floor(h * 0.35), y1 = Math.floor(h * 0.95), x0 = Math.floor(w * 0.05), x1 = Math.floor(w * 0.95), step = 9;
    for (let y = y0; y < y1; y += step) for (let x = x0; x < x1; x += step) {
        const d = (y * w + x) * 4;
        const lum = 0.299 * data[d] + 0.587 * data[d + 1] + 0.114 * data[d + 2];
        sum += lum; sq += lum * lum; n++;
    }
    const mean = sum / n, variance = sq / n - mean * mean, stdev = Math.sqrt(Math.max(0, variance));
    return { badgeMagentaPx: magenta, badgeInk: inkLo + inkHi, bodyMean: +mean.toFixed(1), bodyStdev: +stdev.toFixed(1) };
}

const results = [];
for (const [cat, route, stem, field, band] of ROWS) {
    for (const engine of ["chromium", "webkit"]) {
        for (const mode of ["light", "dark"]) {
            const suffix = engine === "webkit" ? "-safari" : "";
            const abs = resolve(DIR, `${stem}${suffix}-${mode}-desktop-full.png`);
            let rec = { cat, route, engine, mode, file: `${stem}${suffix}-${mode}-desktop-full.png` };
            try {
                const wr = warmRead(abs, field);
                const s = wr ? wr.stats : null;
                const bb = bodyAndBadge(abs);
                const warm = wr ? wr.verdict.pass : false;
                const bandOk = s && s.meanL >= band.lMin && s.meanL <= band.lMax && s.meanChroma >= band.cMin && s.meanChroma <= band.cMax;
                const badgeOk = bb.badgeMagentaPx > 20 && bb.badgeInk > 200;
                const nonBlank = bb.bodyStdev > 6;
                rec = {
                    ...rec,
                    dims: wr?.dims ? `${wr.dims.w}x${wr.dims.h}` : "??",
                    dominantFamily: s?.dominantFamily, warmFraction: s ? +s.warmFraction.toFixed(3) : null,
                    meanL: s ? +s.meanL.toFixed(3) : null, meanChroma: s ? +s.meanChroma.toFixed(4) : null,
                    edgeDelta: s?.edgeDelta != null ? +s.edgeDelta.toFixed(3) : null,
                    cornerL: s?.cornerL != null ? +s.cornerL.toFixed(3) : null,
                    warmVerdict: warm, warmReasons: warm ? undefined : wr?.verdict.reasons,
                    bandOk, bodyStdev: bb.bodyStdev, bodyMean: bb.bodyMean,
                    badgeMagentaPx: bb.badgeMagentaPx, badgeInk: bb.badgeInk, badgeOk, nonBlank,
                    verdict: warm && badgeOk && nonBlank ? "PASS" : "FAIL",
                };
            } catch (e) {
                rec = { ...rec, error: String(e.message || e), verdict: "FAIL" };
            }
            results.push(rec);
        }
    }
}

const byRoute = {};
for (const r of results) (byRoute[r.route] ??= []).push(r);
const routeVerdicts = Object.entries(byRoute).map(([route, caps]) => ({
    route, caps: caps.length, allWarm: caps.every((c) => c.warmVerdict === true),
    allPass: caps.every((c) => c.verdict === "PASS"),
    notWarm: caps.filter((c) => c.warmVerdict !== true).map((c) => `${c.engine}/${c.mode}`),
}));

console.log(JSON.stringify({
    perCapture: results, routeVerdicts,
    convergedWarm: routeVerdicts.filter((r) => r.allWarm).length + "/" + routeVerdicts.length,
    allPass: routeVerdicts.filter((r) => r.allPass).length + "/" + routeVerdicts.length,
}, null, 2));
