// Crop the Safari viz-canvas region from a 2880x1800 @2x scrolled capture and write
// (a) a tight crop and (b) a contrast-stretched crop to expose any sub-threshold structure.
import { PNG } from "pngjs";
import { readFileSync, writeFileSync } from "node:fs";

const D = new URL(".", import.meta.url).pathname;
// canvas scrolled to CSS top≈150 → @2x. canvas CSS: x≈249 w≈1033 h≈460
const X0 = 498, Y0 = 300, CW = 2066, CH = 920;

function cropBoost(inFile, tag, boost) {
    const png = PNG.sync.read(readFileSync(D + inFile));
    const { width: w, data } = png;
    const out = new PNG({ width: CW, height: CH });
    let sum = 0, sq = 0, n = 0, max = 0; const lumArr = [];
    for (let y = 0; y < CH; y++) {
        for (let x = 0; x < CW; x++) {
            const si = ((Y0 + y) * w + (X0 + x)) * 4;
            const di = (y * CW + x) * 4;
            let r = data[si], g = data[si + 1], b = data[si + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            sum += lum; sq += lum * lum; n++; if (lum > max) max = lum;
            if (lumArr.length < 200000) lumArr.push(lum);
            out.data[di] = Math.min(255, r * boost);
            out.data[di + 1] = Math.min(255, g * boost);
            out.data[di + 2] = Math.min(255, b * boost);
            out.data[di + 3] = 255;
        }
    }
    writeFileSync(D + tag, PNG.sync.write(out));
    lumArr.sort((a, b) => a - b);
    const mean = sum / n, stdev = Math.sqrt(Math.max(0, sq / n - mean * mean));
    return { tag, boost, meanLum: +mean.toFixed(2), stdevLum: +stdev.toFixed(2), p99: +lumArr[Math.floor(lumArr.length * 0.99)].toFixed(1), max: +max.toFixed(1) };
}

console.log(JSON.stringify(cropBoost("safari-dark-canvas-full.png", "safari-dark-viz-crop.png", 1)));
console.log(JSON.stringify(cropBoost("safari-dark-canvas-full.png", "safari-dark-viz-boost5.png", 5)));
console.log(JSON.stringify(cropBoost("safari-light-canvas-full.png", "safari-light-viz-crop.png", 1)));
