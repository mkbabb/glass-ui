// Crop a region from a PNG and write it + print stats. args: in.png out.png x0 y0 w h
import { readFileSync, writeFileSync } from "node:fs";
import { inflateSync, deflateSync } from "node:zlib";

function decodeRGBA(buf) {
    let p = 8, w = 0, h = 0, bd = 0, ct = 0; const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p); const type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; }
        else if (type === "IDAT") idat.push(data); else if (type === "IEND") break;
        p += 12 + len;
    }
    const ch = ct === 6 ? 4 : ct === 2 ? 3 : 1; if (bd !== 8) throw new Error("bd" + bd);
    const raw = inflateSync(Buffer.concat(idat)); const stride = w * ch;
    const out = Buffer.alloc(w * h * 4); const prev = Buffer.alloc(stride); let ri = 0;
    for (let y = 0; y < h; y++) {
        const f = raw[ri++]; const line = Buffer.alloc(stride);
        for (let x = 0; x < stride; x++) {
            const rb = raw[ri++]; const a = x >= ch ? line[x - ch] : 0; const b = prev[x]; const c = x >= ch ? prev[x - ch] : 0;
            let v; switch (f) {
                case 0: v = rb; break; case 1: v = rb + a; break; case 2: v = rb + b; break;
                case 3: v = rb + ((a + b) >> 1); break;
                case 4: { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v = rb + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; }
                default: v = rb;
            } line[x] = v & 0xff;
        }
        line.copy(prev);
        for (let x = 0; x < w; x++) { const s = x * ch, d = (y * w + x) * 4;
            out[d] = line[s]; out[d + 1] = ch >= 3 ? line[s + 1] : line[s];
            out[d + 2] = ch >= 3 ? line[s + 2] : line[s]; out[d + 3] = ch === 4 ? line[s + 3] : 255; }
    }
    return { w, h, data: out };
}

function crc32(buf) {
    let c = ~0; for (let i = 0; i < buf.length; i++) { c ^= buf[i]; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1)); } return ~c >>> 0;
}
function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const t = Buffer.from(type, "ascii"); const body = Buffer.concat([t, data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body)); return Buffer.concat([len, body, crc]);
}
function encodeRGBA(w, h, data) {
    const stride = w * 4; const raw = Buffer.alloc((stride + 1) * h);
    for (let y = 0; y < h; y++) { raw[y * (stride + 1)] = 0; data.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride); }
    const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
    return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

const [inP, outP, x0, y0, cw, ch] = process.argv.slice(2);
const X = +x0, Y = +y0, W = +cw, H = +ch;
const src = decodeRGBA(readFileSync(inP));
const crop = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const sx = X + x, sy = Y + y; const s = (sy * src.w + sx) * 4; const d = (y * W + x) * 4;
    crop[d] = src.data[s]; crop[d + 1] = src.data[s + 1]; crop[d + 2] = src.data[s + 2]; crop[d + 3] = 255;
}
writeFileSync(outP, encodeRGBA(W, H, crop));
// stats
let n = 0, sum = 0, sq = 0, edge = 0, en = 0, rM = 0, gM = 0, bM = 0;
for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
    const i = (y * W + x) * 4; const L = (0.299 * crop[i] + 0.587 * crop[i + 1] + 0.114 * crop[i + 2]) / 255;
    sum += L; sq += L * L; n++; rM += crop[i]; gM += crop[i + 1]; bM += crop[i + 2];
    if (x + 2 < W && y + 2 < H) { const Lx = (0.299 * crop[(y * W + x + 2) * 4] + 0.587 * crop[(y * W + x + 2) * 4 + 1] + 0.114 * crop[(y * W + x + 2) * 4 + 2]) / 255;
        const Ly = (0.299 * crop[((y + 2) * W + x) * 4] + 0.587 * crop[((y + 2) * W + x) * 4 + 1] + 0.114 * crop[((y + 2) * W + x) * 4 + 2]) / 255;
        edge += Math.abs(L - Lx) + Math.abs(L - Ly); en++; }
}
const mean = sum / n, variance = sq / n - mean * mean;
console.log(JSON.stringify({ out: outP.split("/").pop(), w: W, h: H, meanL: +mean.toFixed(4), stdL: +Math.sqrt(Math.max(0, variance)).toFixed(4), edge: +(edge / en).toFixed(5), rMean: Math.round(rM / n), gMean: Math.round(gM / n), bMean: Math.round(bM / n) }));
