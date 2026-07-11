// Non-authoring validation of the 4 depth-tier PNGs. Reuses ONLY reflect-capture-verify.mjs.
import {
    isRealPng,
    pngDimensions,
    pngRegionStats,
} from "/Users/mkbabb/Programming/glass-ui/scripts/reflect-capture-verify.mjs";
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

function decodeRGBA(buf) {
    let p = 8, w = 0, h = 0, bitDepth = 0, colorType = 0;
    const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p);
        const type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; }
        else if (type === "IDAT") idat.push(data);
        else if (type === "IEND") break;
        p += 12 + len;
    }
    const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
    if (bitDepth !== 8) throw new Error("bitDepth " + bitDepth);
    const raw = inflateSync(Buffer.concat(idat));
    const stride = w * channels;
    const out = Buffer.alloc(w * h * 4);
    const prev = Buffer.alloc(stride);
    let ri = 0;
    for (let y = 0; y < h; y++) {
        const filter = raw[ri++];
        const line = Buffer.alloc(stride);
        for (let x = 0; x < stride; x++) {
            const rawByte = raw[ri++];
            const a = x >= channels ? line[x - channels] : 0;
            const b = prev[x];
            const c = x >= channels ? prev[x - channels] : 0;
            let val;
            switch (filter) {
                case 0: val = rawByte; break;
                case 1: val = rawByte + a; break;
                case 2: val = rawByte + b; break;
                case 3: val = rawByte + ((a + b) >> 1); break;
                case 4: { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); val = rawByte + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; }
                default: val = rawByte;
            }
            line[x] = val & 0xff;
        }
        line.copy(prev);
        for (let x = 0; x < w; x++) {
            const s = x * channels, d = (y * w + x) * 4;
            out[d] = line[s];
            out[d + 1] = channels >= 3 ? line[s + 1] : line[s];
            out[d + 2] = channels >= 3 ? line[s + 2] : line[s];
            out[d + 3] = channels === 4 ? line[s + 3] : 255;
        }
    }
    return { w, h, data: out };
}

function analyze(path, expectEngine) {
    const buf = readFileSync(path);
    const real = isRealPng(path);
    const dims = pngDimensions(path);
    const { w, h, data } = decodeRGBA(buf);
    // Badge locator: top-left quadrant for magenta #ff00ff fiducial + high-contrast ink.
    let magenta = 0, inkHi = 0, inkLo = 0;
    const xMax = Math.floor(w * 0.42), yMax = Math.floor(h * 0.28);
    for (let y = 0; y < yMax; y++) {
        for (let x = 0; x < xMax; x++) {
            const d = (y * w + x) * 4;
            const r = data[d], g = data[d + 1], b = data[d + 2];
            if (r > 220 && g < 60 && b > 220) magenta++;
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            if (lum < 40) inkLo++;
            if (lum > 230) inkHi++;
        }
    }
    // Body content region variance (blank shell = near-uniform).
    const stats = pngRegionStats(path, { x: 0.05, y: 0.35, w: 0.9, h: 0.55 });
    let n = 0, sum = 0, sumSq = 0;
    const y0 = Math.floor(h * 0.35), y1 = Math.floor(h * 0.9);
    const x0 = Math.floor(w * 0.05), x1 = Math.floor(w * 0.95), step = 7;
    for (let y = y0; y < y1; y += step) {
        for (let x = x0; x < x1; x += step) {
            const d = (y * w + x) * 4;
            const lum = 0.299 * data[d] + 0.587 * data[d + 1] + 0.114 * data[d + 2];
            sum += lum; sumSq += lum * lum; n++;
        }
    }
    const mean = sum / n, variance = sumSq / n - mean * mean, stdev = Math.sqrt(Math.max(0, variance));
    return {
        path: path.split("/").pop(), expectEngine,
        isRealPng: real, dims,
        badgeMagentaPx: magenta, badgeInkDarkPx: inkLo, badgeInkLightPx: inkHi,
        bodyMeanLum: +mean.toFixed(1), bodyStdevLum: +stdev.toFixed(1),
        bodyMeanChroma: stats ? +stats.meanChroma?.toFixed(4) : null,
        bodyMeanAlpha: stats ? +stats.meanAlpha?.toFixed(3) : null,
    };
}

const D = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/pipeline-depth-tier/";
const files = [
    ["depth-tier-chrome-light-desktop-full.png", "CHROME"],
    ["depth-tier-chrome-dark-desktop-full.png", "CHROME"],
    ["depth-tier-safari-light-desktop-full.png", "WEBKIT"],
    ["depth-tier-safari-dark-desktop-full.png", "WEBKIT"],
];
const results = files.map(([f, e]) => analyze(D + f, e));
console.log(JSON.stringify(results, null, 2));

// Verdict roll-up
const pass = results.every(r =>
    r.isRealPng && r.dims && r.dims.width === 2880 && r.dims.height === 1800 &&
    r.badgeMagentaPx > 50 && (r.badgeInkDarkPx + r.badgeInkLightPx) > 200 &&
    r.bodyStdevLum > 8
);
console.log("\nVERDICT_ALL_PASS:", pass);
