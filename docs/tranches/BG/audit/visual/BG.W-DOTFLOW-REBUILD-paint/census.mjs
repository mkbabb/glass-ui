// Pixel census over a canvas-crop PNG: mean/std/p99 luma, chroma %, warm/teal split,
// plus a column-luma profile (to expose a left-structure / right-white-out split) and a
// horizontal-band luma std (a proxy for "traceable streamline structure" vs "flat wash").
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { isRealPng, pngDimensions } from "/Users/mkbabb/Programming/glass-ui/scripts/reflect-capture-verify.mjs";

function decodeRGBA(buf) {
    let p = 8, w = 0, h = 0, bd = 0, ct = 0; const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p); const t = buf.toString("ascii", p + 4, p + 8);
        const d = buf.subarray(p + 8, p + 8 + len);
        if (t === "IHDR") { w = d.readUInt32BE(0); h = d.readUInt32BE(4); bd = d[8]; ct = d[9]; }
        else if (t === "IDAT") idat.push(d); else if (t === "IEND") break;
        p += 12 + len;
    }
    const ch = ct === 6 ? 4 : ct === 2 ? 3 : 1; if (bd !== 8) throw new Error("bd" + bd);
    const raw = inflateSync(Buffer.concat(idat)); const stride = w * ch;
    const out = Buffer.alloc(w * h * 4); const prev = Buffer.alloc(stride); let ri = 0;
    for (let y = 0; y < h; y++) {
        const f = raw[ri++]; const line = Buffer.alloc(stride);
        for (let x = 0; x < stride; x++) {
            const rb = raw[ri++]; const a = x >= ch ? line[x - ch] : 0; const b = prev[x]; const c = x >= ch ? prev[x - ch] : 0;
            let v; switch (f) { case 0: v = rb; break; case 1: v = rb + a; break; case 2: v = rb + b; break; case 3: v = rb + ((a + b) >> 1); break; case 4: { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v = rb + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; } default: v = rb; } line[x] = v & 0xff;
        }
        line.copy(prev);
        for (let x = 0; x < w; x++) { const s = x * ch, dd = (y * w + x) * 4; out[dd] = line[s]; out[dd + 1] = ch >= 3 ? line[s + 1] : line[s]; out[dd + 2] = ch >= 3 ? line[s + 2] : line[s]; out[dd + 3] = ch === 4 ? line[s + 3] : 255; }
    }
    return { w, h, data: out };
}

function analyze(path) {
    const buf = readFileSync(path);
    const { w, h, data } = decodeRGBA(buf);
    const lumas = [];
    let sum = 0, sq = 0, n = 0, chromatic = 0, warm = 0, teal = 0;
    // 5 vertical columns → column mean luma profile.
    const cols = 5; const colSum = new Array(cols).fill(0), colN = new Array(cols).fill(0);
    // horizontal-row std proxy: for a sample of rows, luma std across x
    let rowStdSum = 0, rowStdN = 0;
    const st = 3;
    for (let y = 0; y < h; y += st) {
        let rs = 0, rsq = 0, rn = 0;
        for (let x = 0; x < w; x += st) {
            const d = (y * w + x) * 4; const r = data[d], g = data[d + 1], b = data[d + 2];
            const l = 0.299 * r + 0.587 * g + 0.114 * b;
            lumas.push(l); sum += l; sq += l * l; n++;
            const mx = Math.max(r, g, b), mn = Math.min(r, g, b); const chr = mx - mn;
            if (chr > 22) { chromatic++; if (r >= b) warm++; else teal++; }
            const ci = Math.min(cols - 1, Math.floor((x / w) * cols)); colSum[ci] += l; colN[ci]++;
            rs += l; rsq += l * l; rn++;
        }
        if (rn > 4) { const m = rs / rn; rowStdSum += Math.sqrt(Math.max(0, rsq / rn - m * m)); rowStdN++; }
    }
    lumas.sort((a, b) => a - b);
    const mean = sum / n, std = Math.sqrt(Math.max(0, sq / n - mean * mean));
    const p99 = lumas[Math.floor(lumas.length * 0.99)];
    const p01 = lumas[Math.floor(lumas.length * 0.01)];
    const colMeans = colSum.map((s, i) => +(s / colN[i]).toFixed(0));
    return {
        png: path.split("/").pop(),
        isRealPng: isRealPng(path), dims: (() => { const dd = pngDimensions(path); return dd ? `${dd.width}x${dd.height}` : null; })(),
        meanLuma: +mean.toFixed(1), stdLuma: +std.toFixed(1),
        p01: +p01.toFixed(0), p99: +p99.toFixed(0),
        chromaticPct: +(100 * chromatic / n).toFixed(1),
        warmOfChromaticPct: chromatic ? +(100 * warm / chromatic).toFixed(0) : 0,
        tealOfChromaticPct: chromatic ? +(100 * teal / chromatic).toFixed(0) : 0,
        colLumaProfile_L2R: colMeans,
        rowLumaStd_structureProxy: +(rowStdSum / rowStdN).toFixed(1),
    };
}

const files = process.argv.slice(2);
const res = files.map(analyze);
console.log(JSON.stringify(res, null, 1));
