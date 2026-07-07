// Quantitative affine-vs-crackle judge. Traces a MAJOR gridline centerline down the frame
// and reports curvature sign-changes + per-row jump stats. The prior FAIL metric: 56-86
// sign-changes per traced line (~1 kink/8-12px) = crackle. A smooth affine bow has FEW
// sign-changes and small, slowly-varying second differences.
import { PNG } from "pngjs";
import fs from "fs";

const path = process.argv[2];
const png = PNG.sync.read(fs.readFileSync(path));
const { width: W, height: H, data } = png;

function lum(x, y) {
    const i = (y * W + x) * 4;
    // ignore near-transparent
    return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
}

// Column-darkness profile over a middle band to find major vertical lines (darkest, widest troughs)
const y0 = 60, y1 = H - 60;
const colDark = new Array(W).fill(0);
for (let x = 0; x < W; x++) {
    let s = 0;
    for (let y = y0; y < y1; y += 2) s += (255 - lum(x, y));
    colDark[x] = s / ((y1 - y0) / 2);
}
// find local maxima of darkness (line centers), pick the strongest few spaced apart
const peaks = [];
for (let x = 6; x < W - 6; x++) {
    const c = colDark[x];
    if (c > colDark[x - 1] && c >= colDark[x + 1] && c > 12) {
        // strength = prominence over local window
        let base = Infinity;
        for (let k = -5; k <= 5; k++) base = Math.min(base, colDark[x + k]);
        peaks.push({ x, strength: c, prom: c - base });
    }
}
peaks.sort((a, b) => b.prom - a.prom);
// dedupe within 15px
const chosen = [];
for (const p of peaks) {
    if (chosen.every(c => Math.abs(c.x - p.x) > 20)) chosen.push(p);
    if (chosen.length >= 6) break;
}

function traceVertical(cx) {
    // for each row, find darkest x within +-14 of the running center (subpixel via weighted centroid of darkness)
    let center = cx;
    const xs = [];
    for (let y = y0; y < y1; y++) {
        let bestX = center, bestV = -1;
        for (let x = Math.max(2, center - 14); x <= Math.min(W - 3, center + 14); x++) {
            const v = 255 - lum(x, y);
            if (v > bestV) { bestV = v; bestX = x; }
        }
        // weighted centroid around bestX for subpixel
        let sw = 0, swx = 0;
        for (let x = bestX - 2; x <= bestX + 2; x++) {
            const v = Math.max(0, 255 - lum(x, y) - 8);
            sw += v; swx += v * x;
        }
        const sub = sw > 0 ? swx / sw : bestX;
        xs.push(sub);
        center = Math.round(sub);
    }
    return xs;
}

function analyze(xs) {
    // smooth lightly to kill single-pixel quantization, then measure second difference
    const n = xs.length;
    // first diff
    const d1 = [];
    for (let i = 1; i < n; i++) d1.push(xs[i] - xs[i - 1]);
    // second diff (curvature proxy)
    const d2 = [];
    for (let i = 1; i < d1.length; i++) d2.push(d1[i] - d1[i - 1]);
    // sign changes of d1 (direction reversals of the line) with a deadband to ignore noise
    let signChanges = 0, prevSign = 0;
    const dead = 0.35;
    for (const v of d1) {
        if (Math.abs(v) < dead) continue;
        const s = Math.sign(v);
        if (prevSign !== 0 && s !== prevSign) signChanges++;
        prevSign = s;
    }
    // total horizontal excursion + max local jump
    const maxJump = Math.max(...d1.map(Math.abs));
    const rms2 = Math.sqrt(d2.reduce((a, v) => a + v * v, 0) / d2.length);
    const span = Math.max(...xs) - Math.min(...xs);
    return { rows: n, signChanges, maxJumpPx: +maxJump.toFixed(2), rmsCurvature: +rms2.toFixed(3), bowSpanPx: +span.toFixed(1) };
}

console.log("file:", path.split("/").pop());
for (const c of chosen.slice(0, 4)) {
    const xs = traceVertical(c.x);
    console.log("majorLine@x=" + c.x, "prom=" + c.prom.toFixed(1), JSON.stringify(analyze(xs)));
}
