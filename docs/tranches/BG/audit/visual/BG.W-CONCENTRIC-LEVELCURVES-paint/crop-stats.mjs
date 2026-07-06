// Crop a pixel region from a PNG + compute structure stats (mean L, L-std, edge energy).
// Blank plate → low L-std + near-zero edge. Structured contour map → high L-std + edge.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");
import fs from "node:fs";

const [, , src, out, xs, ys, ws, hs] = process.argv;
const x0 = parseInt(xs, 10), y0 = parseInt(ys, 10), cw = parseInt(ws, 10), ch = parseInt(hs, 10);
const png = PNG.sync.read(fs.readFileSync(src));
const { width, height, data } = png;

const crop = new PNG({ width: cw, height: ch });
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

// copy region
let sumL = 0, n = 0;
const Ls = [];
for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
        const si = ((y0 + y) * width + (x0 + x)) * 4;
        const di = (y * cw + x) * 4;
        crop.data[di] = data[si];
        crop.data[di + 1] = data[si + 1];
        crop.data[di + 2] = data[si + 2];
        crop.data[di + 3] = data[si + 3];
        const L = lum(data[si], data[si + 1], data[si + 2]) / 255;
        Ls.push(L); sumL += L; n++;
    }
}
const meanL = sumL / n;
let varL = 0;
for (const L of Ls) varL += (L - meanL) ** 2;
const stdL = Math.sqrt(varL / n);

// edge energy: mean |horizontal + vertical gradient| of L, sampled
let edgeSum = 0, edgeN = 0;
for (let y = 1; y < ch - 1; y += 2) {
    for (let x = 1; x < cw - 1; x += 2) {
        const L = Ls[y * cw + x];
        const Lr = Ls[y * cw + (x + 1)];
        const Ld = Ls[(y + 1) * cw + x];
        edgeSum += Math.abs(L - Lr) + Math.abs(L - Ld);
        edgeN++;
    }
}
const edge = edgeSum / edgeN;

fs.writeFileSync(out, PNG.sync.write(crop));
console.log(JSON.stringify({ src: src.split("/").pop(), out: out.split("/").pop(), region: { x0, y0, cw, ch }, meanL: +meanL.toFixed(4), stdL: +stdL.toFixed(4), edge: +edge.toFixed(5) }));
