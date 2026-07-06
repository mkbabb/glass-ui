// Quantify the "smooth continuous curve vs shimmer-with-noise" criterion.
// Trace a MAJOR horizontal gridline's centerline across X and measure its high-frequency
// roughness (kink count via 2nd-difference sign changes) and travel band. A smooth affine
// bow => few sign changes, low high-freq energy. A crackle/noise line => many.
import { PNG } from "pngjs";
import fs from "node:fs";

function load(p) {
    return PNG.sync.read(fs.readFileSync(p));
}
function luma(png, x, y) {
    const i = (png.width * y + x) << 2;
    const d = png.data;
    return 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
}

// Find the major horizontal gridlines: scan each row's mean darkness (light mode) and pick
// rows that are local minima with strong contrast (the bold major lines).
function analyze(path, mode) {
    const png = load(path);
    const W = png.width,
        H = png.height;
    // row-mean luminance profile
    const rowMean = new Float64Array(H);
    for (let y = 0; y < H; y++) {
        let s = 0;
        for (let x = 0; x < W; x++) s += luma(png, x, y);
        rowMean[y] = s / W;
    }
    const globalMean = rowMean.reduce((a, b) => a + b, 0) / H;
    // major lines: strongest deviation rows. light mode -> darker (min); dark -> brighter (max)
    const dark = mode === "light";
    // pick a target y in the mid third that is a strong line
    let bestY = -1,
        bestDev = 0;
    for (let y = Math.floor(H * 0.35); y < Math.floor(H * 0.65); y++) {
        const dev = dark ? globalMean - rowMean[y] : rowMean[y] - globalMean;
        if (dev > bestDev) {
            bestDev = dev;
            bestY = y;
        }
    }
    // trace centerline: for each column x, within a +-14px band around bestY, find extremum
    const band = 16;
    const ys = [];
    for (let x = 4; x < W - 4; x++) {
        let ey = bestY,
            ev = dark ? 1e9 : -1e9;
        for (let dy = -band; dy <= band; dy++) {
            const y = bestY + dy;
            if (y < 1 || y >= H - 1) continue;
            const v = luma(png, x, y);
            if (dark ? v < ev : v > ev) {
                ev = v;
                ey = y;
            }
        }
        ys.push(ey);
    }
    // smooth-vs-noise metrics on the centerline y(x)
    const n = ys.length;
    // total travel band (max-min) — the bow amplitude
    const ymin = Math.min(...ys),
        ymax = Math.max(...ys);
    // 1st difference
    const d1 = [];
    for (let i = 1; i < n; i++) d1.push(ys[i] - ys[i - 1]);
    // 2nd-difference sign changes => kink count (a smooth curve has few; crackle has many)
    let signChanges = 0;
    for (let i = 2; i < n; i++) {
        const a = ys[i] - ys[i - 1];
        const b = ys[i - 1] - ys[i - 2];
        if (a !== 0 && b !== 0 && Math.sign(a) !== Math.sign(b)) signChanges++;
    }
    // high-frequency energy: mean abs 2nd difference
    let hf = 0;
    for (let i = 2; i < n; i++) hf += Math.abs(ys[i] - 2 * ys[i - 1] + ys[i - 2]);
    hf /= n - 2;
    return {
        mode,
        path: path.split("/").pop(),
        targetY: bestY,
        rowDev: +bestDev.toFixed(2),
        bowBandPx: ymax - ymin,
        kinkSignChanges: signChanges,
        kinkPerHundredPx: +((100 * signChanges) / n).toFixed(1),
        meanAbs2ndDiff: +hf.toFixed(3),
    };
}

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
    console.log(JSON.stringify(analyze(args[i], args[i + 1])));
}
