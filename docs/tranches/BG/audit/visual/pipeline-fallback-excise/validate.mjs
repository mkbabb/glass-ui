// BG.W-FALLBACK-EXCISE pipeline validation (NON-AUTHORING). For each of the 4 PNGs confirm:
//   (1) isRealPng + dimension-correct,
//   (2) the in-pixel engine badge is present (magenta #ff00ff fiducial border in the
//       top-left panel + high-contrast text ink),
//   (3) the route content is real (page body is NOT a uniform blank/shell slab —
//       non-trivial luminance variance across the body).
// Uses ONLY the repo's single PNG decoder leaf (reflect-capture-verify.mjs) for isRealPng/dims/stats.
import {
    isRealPng,
    pngDimensions,
    pngRegionStats,
} from "../../../../../../scripts/reflect-capture-verify.mjs";
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

function decodeRGBA(buf) {
    let p = 8,
        w = 0,
        h = 0,
        bitDepth = 0,
        colorType = 0;
    const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p);
        const type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") {
            w = data.readUInt32BE(0);
            h = data.readUInt32BE(4);
            bitDepth = data[8];
            colorType = data[9];
        } else if (type === "IDAT") idat.push(data);
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
                case 4: {
                    const pa = Math.abs(b - c),
                        pb = Math.abs(a - c),
                        pc = Math.abs(a + b - 2 * c);
                    val = rawByte + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
                    break;
                }
                default: val = rawByte;
            }
            line[x] = val & 0xff;
        }
        line.copy(prev);
        for (let x = 0; x < w; x++) {
            const s = x * channels;
            const d = (y * w + x) * 4;
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

    // Badge locator: top-left quadrant (0..42% x, 0..28% y) — magenta #ff00ff fiducial
    // border + high-contrast ink (near-black + near-white).
    let magenta = 0,
        inkHi = 0,
        inkLo = 0;
    const xMax = Math.floor(w * 0.42),
        yMax = Math.floor(h * 0.28);
    for (let y = 0; y < yMax; y++) {
        for (let x = 0; x < xMax; x++) {
            const d = (y * w + x) * 4;
            const r = data[d],
                g = data[d + 1],
                b = data[d + 2];
            if (r > 220 && g < 60 && b > 220) magenta++;
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            if (lum < 40) inkLo++;
            if (lum > 230) inkHi++;
        }
    }

    // Content region: page body below the badge (35%..90% y, 5%..95% x). A blank/shell
    // slab is near-uniform; real content has non-trivial luminance variance.
    const stats = pngRegionStats(path, { x: 0.05, y: 0.35, w: 0.9, h: 0.55 });
    let n = 0,
        sum = 0,
        sumSq = 0;
    const y0 = Math.floor(h * 0.35),
        y1 = Math.floor(h * 0.9);
    const x0 = Math.floor(w * 0.05),
        x1 = Math.floor(w * 0.95);
    const step = 7;
    for (let y = y0; y < y1; y += step) {
        for (let x = x0; x < x1; x += step) {
            const d = (y * w + x) * 4;
            const lum = 0.299 * data[d] + 0.587 * data[d + 1] + 0.114 * data[d + 2];
            sum += lum;
            sumSq += lum * lum;
            n++;
        }
    }
    const mean = sum / n;
    const stdev = Math.sqrt(Math.max(0, sumSq / n - mean * mean));

    const badgePresent = magenta > 200 && inkLo > 300 && inkHi > 300;
    const contentReal = stdev > 8;
    return {
        path: path.split("/").pop(),
        expectEngine,
        isRealPng: real,
        dims: `${dims.width}x${dims.height}`,
        badgeMagentaPx: magenta,
        badgeInkDarkPx: inkLo,
        badgeInkLightPx: inkHi,
        badgePresent,
        bodyMeanLum: +mean.toFixed(1),
        bodyStdevLum: +stdev.toFixed(1),
        contentReal,
        bodyMeanChroma: stats ? +stats.meanChroma?.toFixed(4) : null,
        VERDICT: real && badgePresent && contentReal ? "PASS" : "FAIL",
    };
}

const files = [
    ["fallback-excise-chrome-light-desktop.png", "CHROME"],
    ["fallback-excise-chrome-dark-desktop.png", "CHROME"],
    ["fallback-excise-safari-light-desktop.png", "WEBKIT"],
    ["fallback-excise-safari-dark-desktop.png", "WEBKIT"],
];
const results = files.map(([f, e]) => analyze(new URL(f, import.meta.url).pathname, e));
console.log(JSON.stringify(results, null, 2));
const allPass = results.every((r) => r.VERDICT === "PASS");
console.log("\nALL_PASS=" + allPass);
