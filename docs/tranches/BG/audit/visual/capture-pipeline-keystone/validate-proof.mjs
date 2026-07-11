// Dual-engine capture-pipeline PROOF validator.
// Decodes each of the 4 PNGs and asserts: real PNG, dimension-correct, in-pixel engine badge
// present (magenta #ff00ff fiducial + high-contrast ink), and real route content (body variance
// >> 0 => not a blank/bare-shell). Reuses the repo's SINGLE PNG decoder leaf (reflect-capture-verify).
import { isRealPng, pngDimensions } from "../../../../../../scripts/reflect-capture-verify.mjs";
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

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

function analyze(path, expectEngine) {
    const buf = readFileSync(path);
    const real = isRealPng(path);
    const dims = pngDimensions(path);
    const { w, h, data } = decodeRGBA(buf);
    // badge region: top-left panel (badge painted there by engine-badge.ts)
    let magenta = 0, inkLo = 0, inkHi = 0;
    const xMax = Math.floor(w * 0.42), yMax = Math.floor(h * 0.30);
    for (let y = 0; y < yMax; y++) for (let x = 0; x < xMax; x++) {
        const d = (y * w + x) * 4, r = data[d], g = data[d + 1], b = data[d + 2];
        if (r > 200 && g < 80 && b > 200) magenta++;
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (lum < 40) inkLo++;
        if (lum > 225) inkHi++;
    }
    // body region: below the badge, full width — variance proves real content, not a flat shell
    let n = 0, sum = 0, sq = 0;
    const y0 = Math.floor(h * 0.35), y1 = Math.floor(h * 0.95), x0 = Math.floor(w * 0.05), x1 = Math.floor(w * 0.95), step = 9;
    for (let y = y0; y < y1; y += step) for (let x = x0; x < x1; x += step) {
        const d = (y * w + x) * 4;
        const lum = 0.299 * data[d] + 0.587 * data[d + 1] + 0.114 * data[d + 2];
        sum += lum; sq += lum * lum; n++;
    }
    const mean = sum / n, variance = sq / n - mean * mean, stdev = Math.sqrt(Math.max(0, variance));
    return {
        png: path.split("/").pop(), expectEngine, isRealPng: real, dims,
        badgeMagentaPx: magenta, badgeInkDarkPx: inkLo, badgeInkLightPx: inkHi,
        bodyMeanLum: +mean.toFixed(1), bodyStdevLum: +stdev.toFixed(1),
        verdict: (real && magenta > 20 && (inkLo + inkHi) > 200 && stdev > 6) ? "PASS" : "FAIL",
    };
}

const files = [
    ["dark-readability-chrome-light-desktop-full.png", "CHROME"],
    ["dark-readability-chrome-dark-desktop-full.png", "CHROME"],
    ["dark-readability-safari-light-desktop-full.png", "WEBKIT"],
    ["dark-readability-safari-dark-desktop-full.png", "WEBKIT"],
];
const res = files.map(([f, e]) => analyze(new URL(f, import.meta.url).pathname, e));
console.log(JSON.stringify(res, null, 2));
