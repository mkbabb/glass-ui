// BG.W-VIZ-RESIZE-ADOPT — pixel analysis: (1) crop the top-left engine badge for provenance decode,
// (2) badge magenta-border presence probe, (3) aurora recessive/oversaturation + grain-calm stats.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");

const DIR = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-RESIZE-ADOPT-paint";
const files = readdirSync(DIR).filter((f) => f.endsWith(".png") && !f.startsWith("badge-") && !f.startsWith("_"));

function load(f) { return PNG.sync.read(readFileSync(`${DIR}/${f}`)); }

// Crop a rectangle -> new PNG
function crop(src, x, y, w, h) {
    const out = new PNG({ width: w, height: h });
    for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
            const si = ((y + j) * src.width + (x + i)) << 2;
            const di = (j * w + i) << 2;
            out.data[di] = src.data[si];
            out.data[di + 1] = src.data[si + 1];
            out.data[di + 2] = src.data[si + 2];
            out.data[di + 3] = src.data[si + 3];
        }
    }
    return out;
}

// Detect magenta-ish pixels (badge border #ff00ff) in a region -> provenance locator presence.
function magentaCount(src, x0, y0, x1, y1) {
    let n = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * src.width + x) << 2;
        const r = src.data[i], g = src.data[i + 1], b = src.data[i + 2];
        if (r > 180 && b > 180 && g < 90) n++;
    }
    return n;
}
// Detect green badge text (#00ff66)
function greenTextCount(src, x0, y0, x1, y1) {
    let n = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * src.width + x) << 2;
        const r = src.data[i], g = src.data[i + 1], b = src.data[i + 2];
        if (g > 180 && r < 120 && b < 160 && b > 20) n++;
    }
    return n;
}

// Whole-image mean luminance + fraction of near-saturated (oversaturation) + local contrast (grain) proxy.
function imgStats(src, skipTopBadge = 300) {
    let sum = 0, cnt = 0, satHi = 0, satLo = 0;
    const step = 4; // subsample for speed
    for (let y = skipTopBadge; y < src.height; y += step) {
        for (let x = 0; x < src.width; x += step) {
            const i = (y * src.width + x) << 2;
            const r = src.data[i], g = src.data[i + 1], b = src.data[i + 2];
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            sum += lum; cnt++;
            const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
            const chroma = mx - mn;
            if (chroma > 170) satHi++;      // very saturated pixel (oversaturation signature)
            if (lum > 250) satLo++;         // blown-white pixel
        }
    }
    return { meanLum: +(sum / cnt).toFixed(1), satFrac: +(satHi / cnt).toFixed(4), whiteFrac: +(satLo / cnt).toFixed(4) };
}

const report = [];
for (const f of files.sort()) {
    const src = load(f);
    // Badge crop: top-left ~ 760x300 device px (badge is <=70vw, 4 lines @13px/1.5 * 2dpr ~ 156px tall)
    const bw = Math.min(1000, src.width), bh = Math.min(320, src.height);
    const bcrop = crop(src, 0, 0, bw, bh);
    writeFileSync(`${DIR}/badge-${f}`, PNG.sync.write(bcrop));
    const mag = magentaCount(src, 0, 0, Math.min(900, src.width), Math.min(320, src.height));
    const grn = greenTextCount(src, 0, 0, Math.min(900, src.width), Math.min(320, src.height));
    const stats = imgStats(src);
    report.push({ f, badgeMagenta: mag, badgeGreenText: grn, ...stats });
}
console.log(JSON.stringify(report, null, 2));
writeFileSync(`${DIR}/pixel-stats-vrz.json`, JSON.stringify(report, null, 2));
