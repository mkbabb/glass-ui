import { PNG } from "pngjs";
import fs from "fs";
const [src, dst, L, T, W, H] = process.argv.slice(2);
const png = PNG.sync.read(fs.readFileSync(src));
const l = +L, t = +T, w = +W, h = +H;
const out = new PNG({ width: w, height: h });
for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
        const si = ((t + y) * png.width + (l + x)) * 4, di = (y * w + x) * 4;
        out.data[di] = png.data[si]; out.data[di + 1] = png.data[si + 1];
        out.data[di + 2] = png.data[si + 2]; out.data[di + 3] = png.data[si + 3];
    }
fs.writeFileSync(dst, PNG.sync.write(out));
let s = 0; const luma = new Float64Array(w * h);
for (let i = 0, p = 0; i < out.data.length; i += 4, p++) { const v = 0.2126 * out.data[i] + 0.7152 * out.data[i + 1] + 0.0722 * out.data[i + 2]; luma[p] = v; s += v; }
let edge = 0, cnt = 0; for (let y = 0; y < h; y++) for (let x = 1; x < w; x++) { edge += Math.abs(luma[y * w + x] - luma[y * w + x - 1]); cnt++; }
console.log(JSON.stringify({ dst, w, h, mean: +(s / (w * h) / 255).toFixed(5), edge: +(edge / cnt / 255).toFixed(5) }));
