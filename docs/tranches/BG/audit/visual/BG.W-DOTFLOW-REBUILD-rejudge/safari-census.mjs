// Safari viz-canvas census + 6x contrast-stretch. The canvas sits scrolled to top-150 in the
// 2880x1800 @2x snapshot. Crop the interior canvas box (avoiding the rounded corners + page bleed),
// census it, and write a 6x-boosted crop so a dim-but-nonzero render would become visible.
import { PNG } from "pngjs";
import { readFileSync, writeFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;

// Canvas interior box in the 2880x1800 snapshot (from visual inspection: canvas ~ x[500..2570] y[370..1270]).
// Take a SAFE interior sub-box to avoid rounded corners + surrounding page.
const BOX = { x: 560, y: 430, w: 1900, h: 780 };

function analyze(file, tag) {
    const png = PNG.sync.read(readFileSync(`${OUT}${file}`));
    const { width: W, height: H, data } = png;
    const x0 = BOX.x, y0 = BOX.y, w = Math.min(BOX.w, W - x0), h = Math.min(BOX.h, H - y0);
    let sum = 0, sq = 0, n = 0, max = 0, colored = 0; const lumArr = [];
    // build a boosted crop
    const crop = new PNG({ width: w, height: h });
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const si = ((y0 + y) * W + (x0 + x)) * 4;
            const r = data[si], g = data[si + 1], b = data[si + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            sum += lum; sq += lum * lum; n++;
            if (lum > max) max = lum;
            const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
            if (mx - mn > 24) colored++;
            if (lumArr.length < 400000) lumArr.push(lum);
            const di = (y * w + x) * 4;
            crop.data[di] = Math.min(255, r * 6);
            crop.data[di + 1] = Math.min(255, g * 6);
            crop.data[di + 2] = Math.min(255, b * 6);
            crop.data[di + 3] = 255;
        }
    }
    lumArr.sort((a, b) => a - b);
    const mean = sum / n;
    const stdev = Math.sqrt(Math.max(0, sq / n - mean * mean));
    const p99 = lumArr[Math.floor(lumArr.length * 0.99)];
    const p50 = lumArr[Math.floor(lumArr.length * 0.5)];
    writeFileSync(`${OUT}${tag}-viz-boost6x.png`, PNG.sync.write(crop));
    return {
        tag, box: { x: x0, y: y0, w, h },
        meanLum: +mean.toFixed(2), stdevLum: +stdev.toFixed(2),
        p50: +p50.toFixed(1), p99: +p99.toFixed(1), max: +max.toFixed(1),
        coloredPct: +((colored / n) * 100).toFixed(3),
        boost: `${tag}-viz-boost6x.png`,
    };
}

console.log(JSON.stringify(analyze("safari-dark-canvas.png", "safari-dark"), null, 2));
console.log(JSON.stringify(analyze("safari-light-canvas.png", "safari-light"), null, 2));
