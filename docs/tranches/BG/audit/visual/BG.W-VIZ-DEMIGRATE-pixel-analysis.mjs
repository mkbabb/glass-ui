// BG.W-VIZ-DEMIGRATE — quantitative viz-region non-blank analysis over the screenshot PNGs.
// Reads a viz sub-region, computes luminance mean/stdev, lumRange, distinct 4-bit color
// buckets, and an "ink fraction" (px whose lum deviates > 10 from region mean). A rendered
// viz shows high stdev + many buckets + meaningful ink fraction; a blank plate ~0.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-DEMIGRATE-paint";
// device-px regions (image 2880x1800) targeting the viz drawing area
// fourier viz-scroll: epicycle canvas center-left; constellation viz-scroll: demo-tile band
const REGIONS = {
    fourier: { x0: 900, y0: 520, x1: 2380, y1: 1560 },     // epicycle canvas
    constellation: { x0: 460, y0: 640, x1: 2760, y1: 1560 }, // demo lattice tiles band
};

function analyze(file, reg) {
    let png;
    try { png = PNG.sync.read(readFileSync(file)); } catch (e) { return { err: String(e).slice(0, 80) }; }
    const { width, height, data } = png;
    const x0 = Math.max(0, reg.x0), y0 = Math.max(0, reg.y0);
    const x1 = Math.min(width, reg.x1), y1 = Math.min(height, reg.y1);
    let n = 0, sum = 0, sum2 = 0, minL = 255, maxL = 0;
    const buckets = new Set();
    const lums = [];
    for (let y = y0; y < y1; y += 2) {
        for (let x = x0; x < x1; x += 2) {
            const i = (y * width + x) * 4;
            const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
            n++; sum += lum; sum2 += lum * lum;
            if (lum < minL) minL = lum; if (lum > maxL) maxL = lum;
            buckets.add((data[i] >> 4) + "," + (data[i + 1] >> 4) + "," + (data[i + 2] >> 4));
            lums.push(lum);
        }
    }
    const mean = sum / n;
    const variance = sum2 / n - mean * mean;
    const stdev = Math.sqrt(Math.max(0, variance));
    let ink = 0;
    for (const l of lums) if (Math.abs(l - mean) > 10) ink++;
    return {
        px: n, meanL: +mean.toFixed(1), stdev: +stdev.toFixed(2),
        minL: +minL.toFixed(0), maxL: +maxL.toFixed(0), lumRange: +(maxL - minL).toFixed(0),
        distinctBuckets: buckets.size, inkFraction: +(ink / n).toFixed(4),
    };
}

const files = [
    // rendered (should be non-blank / high structure)
    ["fourier-chrome-light", "demigrate-viz-substrates_fourier-field-chrome-light.png", "fourier"],
    ["fourier-chrome-dark", "demigrate-viz-substrates_fourier-field-chrome-dark.png", "fourier"],
    ["fourier-pwwebkit-light", "demigrate-viz-substrates_fourier-field-pwwebkit-light.png", "fourier"],
    ["fourier-pwwebkit-dark", "demigrate-viz-substrates_fourier-field-pwwebkit-dark.png", "fourier"],
    ["constellation-chrome-light", "demigrate-viz-substrates_constellation-chrome-light.png", "constellation"],
    ["constellation-chrome-dark", "demigrate-viz-substrates_constellation-chrome-dark.png", "constellation"],
    ["constellation-pwwebkit-light", "demigrate-viz-substrates_constellation-pwwebkit-light.png", "constellation"],
    ["constellation-pwwebkit-dark", "demigrate-viz-substrates_constellation-pwwebkit-dark.png", "constellation"],
    // off-screen WKWebView (KNOWN BLANK — no-rAF harness limitation, for contrast)
    ["fourier-safari-offscreen-BLANK-ref", "demigrate-viz-substrates_fourier-field-safari-dark.png", "fourier"],
    ["constellation-safari-offscreen-BLANK-ref", "demigrate-viz-substrates_constellation-safari-light.png", "constellation"],
];
const out = {};
for (const [label, fn, reg] of files) {
    out[label] = analyze(`${OUT}/${fn}`, REGIONS[reg]);
    console.error(label.padEnd(42), JSON.stringify(out[label]));
}
writeFileSync(`${OUT}/pixel-analysis.json`, JSON.stringify(out, null, 2));
