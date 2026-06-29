// OKLCh pixel sampler — reads a PNG, averages sRGB over patch rects (in 2x PNG coords),
// converts mean to OKLab/OKLCh. Warm = hue in [25,100]°, above gray floor C>=0.008.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");

function srgbToLin(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function rgbToOklch(R, G, B) {
    const r = srgbToLin(R), g = srgbToLin(G), b = srgbToLin(B);
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const A = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const Bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
    const C = Math.sqrt(A * A + Bb * Bb);
    let H = Math.atan2(Bb, A) * 180 / Math.PI; if (H < 0) H += 360;
    return { L, C, H, a: A, b: Bb };
}
function relLum(R, G, B) {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(R) + 0.7152 * f(G) + 0.0722 * f(B);
}

const pngPath = process.argv[2];
const patches = JSON.parse(process.argv[3]); // [{name,x,y,w,h}] in 2x PNG coords
const png = PNG.sync.read(fs.readFileSync(pngPath));
const out = [];
for (const p of patches) {
    let rs = 0, gs = 0, bs = 0, n = 0;
    for (let y = p.y; y < p.y + p.h && y < png.height; y++) {
        for (let x = p.x; x < p.x + p.w && x < png.width; x++) {
            const i = (png.width * y + x) << 2;
            rs += png.data[i]; gs += png.data[i + 1]; bs += png.data[i + 2]; n++;
        }
    }
    const R = rs / n, G = gs / n, B = bs / n;
    const o = rgbToOklch(R, G, B);
    out.push({
        name: p.name,
        rgb: [Math.round(R), Math.round(G), Math.round(B)],
        L: +o.L.toFixed(3), C: +o.C.toFixed(4), H: +o.H.toFixed(1),
        warm: o.H >= 25 && o.H <= 100, aboveGray: o.C >= 0.008,
        relLum: +relLum(R, G, B).toFixed(4),
    });
}
console.log(JSON.stringify(out, null, 2));
