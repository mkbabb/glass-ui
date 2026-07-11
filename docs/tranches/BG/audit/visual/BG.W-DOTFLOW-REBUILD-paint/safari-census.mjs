// Census a rectangular region of a Safari @2x capture (2880x1800).
import { PNG } from "pngjs";
import { readFileSync } from "node:fs";

function region(path, rx, ry, rw, rh) {
    const png = PNG.sync.read(readFileSync(path));
    const { width: w, height: h, data } = png;
    const x0 = Math.round(rx * w), y0 = Math.round(ry * h);
    const x1 = Math.round((rx + rw) * w), y1 = Math.round((ry + rh) * h);
    let sum = 0, sq = 0, n = 0, colored = 0, max = 0; const lumArr = [];
    for (let y = y0; y < y1; y += 2) {
        for (let x = x0; x < x1; x += 2) {
            const i = (y * w + x) * 4;
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            sum += lum; sq += lum * lum; n++;
            if (lum > max) max = lum;
            const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
            if (mx - mn > 24) colored++;
            if (lumArr.length < 300000) lumArr.push(lum);
        }
    }
    lumArr.sort((a, b) => a - b);
    const mean = sum / n;
    const stdev = Math.sqrt(Math.max(0, sq / n - mean * mean));
    return {
        region: `x[${x0},${x1}] y[${y0},${y1}] n=${n}`,
        meanLum: +mean.toFixed(2), stdevLum: +stdev.toFixed(2),
        p50: +lumArr[Math.floor(lumArr.length * 0.5)].toFixed(1),
        p99: +lumArr[Math.floor(lumArr.length * 0.99)].toFixed(1),
        max: +max.toFixed(1), coloredPct: +((colored / n) * 100).toFixed(2),
    };
}

const D = new URL(".", import.meta.url).pathname;
// scrolled capture: viz canvas ~ x[0.25,0.90] y[0.15,0.66] of the 2880x1800 frame
for (const [f, label] of [
    ["safari-dark-canvas-full.png", "safari-dark VIZ canvas"],
    ["safari-light-canvas-full.png", "safari-light VIZ canvas"],
]) {
    console.log(label, JSON.stringify(region(D + f, 0.26, 0.16, 0.62, 0.48)));
}
// non-scrolled full: shell AURORA backdrop region (far right, below badge, avoids text)
for (const [f, label] of [
    ["safari-dark-full.png", "safari-dark AURORA-backdrop (right strip)"],
    ["safari-light-full.png", "safari-light AURORA-backdrop (right strip)"],
]) {
    console.log(label, JSON.stringify(region(D + f, 0.86, 0.25, 0.12, 0.5)));
}
