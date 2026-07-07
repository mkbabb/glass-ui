// Luminance/edge stats on a PNG (normalized 0..1). meanL, stdL, edge-energy (Sobel-ish
// mean abs horizontal+vertical neighbor delta) — structure metric. Prints for each arg path.
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

function lum(data, i) { return (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255; }

function stats(path) {
    const { w, h, data } = decodeRGBA(readFileSync(path));
    let n = 0, sum = 0, sq = 0, edge = 0, en = 0;
    // color spread: track distinct-ish hue via mean channel spread
    let rMean = 0, gMean = 0, bMean = 0;
    for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
        const i = (y * w + x) * 4;
        const L = lum(data, i);
        sum += L; sq += L * L; n++;
        rMean += data[i]; gMean += data[i + 1]; bMean += data[i + 2];
        if (x + 2 < w && y + 2 < h) {
            const Lx = lum(data, (y * w + x + 2) * 4);
            const Ly = lum(data, ((y + 2) * w + x) * 4);
            edge += Math.abs(L - Lx) + Math.abs(L - Ly); en++;
        }
    }
    const mean = sum / n, variance = sq / n - mean * mean;
    return {
        png: path.split("/").pop(), w, h,
        meanL: +mean.toFixed(4), stdL: +Math.sqrt(Math.max(0, variance)).toFixed(4),
        edge: +(edge / en).toFixed(5),
        rMean: Math.round(rMean / n), gMean: Math.round(gMean / n), bMean: Math.round(bMean / n),
    };
}

for (const p of process.argv.slice(2)) console.log(JSON.stringify(stats(p)));
