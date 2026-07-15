#!/usr/bin/env node
// aurora-arresting-metric — the falsifiable "arresting" metric harness (AY.W-AUR1).
//
// Computes the THREE reference-anchored painterly metrics defined in
// src/components/aurora/RESEARCH.md §4 on an input PNG and prints the triple:
//
//   §4.1  Hasler-Süsstrunk colorfulness   C = σ_rgyb + 0.3·μ_rgyb
//   §4.2  structure-tensor anisotropy     A = (λ₁−λ₂)/(λ₁+λ₂)   (mean interior)
//   §4.3  radial luminance power-spectrum slope  β  (the −5/3 Kolmogorov keystone)
//
// This is a reproducible diagnostic rather than an acceptance identity: invoke it
// directly with starry-night-crop.png to print the reference triple. Browser evidence
// scenarios call the same exported functions on rendered medium readbacks.
//
// Pure Node + pngjs (a tests-visual devDependency, resolvable from the repo root). No
// shader code, no library surface — a build/test leaf under scripts/.

import { readFileSync } from "node:fs";
import { PNG } from "pngjs";

const SAMPLE_SCALE = 0.6; // sample the central 60% interior box (avoid the edge fade —
//                            the painterly-statistics INTERIOR_INSET=0.2 precedent)

// ── §4.1 — Hasler-Süsstrunk colorfulness ────────────────────────────────────
// C = σ_rgyb + 0.3·μ_rgyb,  rg = R−G,  yb = ½(R+G)−B
// Named perceptual cutoffs (Hasler & Süsstrunk 2003, ~95% human correlation):
//   not (0) · slightly (15) · moderately (33) · averagely (45) · quite (59) ·
//   highly (82) · extremely (109).
function colorfulness(rgb, n) {
    let sumRg = 0;
    let sumYb = 0;
    let sumRgSq = 0;
    let sumYbSq = 0;
    for (let i = 0; i < n; i++) {
        const r = rgb[i * 3];
        const g = rgb[i * 3 + 1];
        const b = rgb[i * 3 + 2];
        const rg = r - g;
        const yb = 0.5 * (r + g) - b;
        sumRg += rg;
        sumYb += yb;
        sumRgSq += rg * rg;
        sumYbSq += yb * yb;
    }
    const muRg = sumRg / n;
    const muYb = sumYb / n;
    const varRg = sumRgSq / n - muRg * muRg;
    const varYb = sumYbSq / n - muYb * muYb;
    const sigma = Math.sqrt(Math.max(0, varRg) + Math.max(0, varYb));
    const mu = Math.sqrt(muRg * muRg + muYb * muYb);
    return sigma + 0.3 * mu;
}

// ── §4.2 — structure-tensor orientation-coherence anisotropy ─────────────────
// Per-pixel gradient outer product J = [[gx², gx·gy],[gx·gy, gy²]], Gaussian-smoothed
// (σ≈2), eigenvalues λ₁≥λ₂, anisotropy A = (λ₁−λ₂)/(λ₁+λ₂). Mean over the interior.
// A flat gradient or pure noise → A≈0; coherent flowing strokes → A in a high-but-
// not-degenerate band. Also returns the orientation histogram so a downstream pinwheel
// regression (Kuwahara banding) is detectable as a periodic spike, not just the mean.
function structureTensorAnisotropy(lum, w, h) {
    const gxx = new Float64Array(w * h);
    const gyy = new Float64Array(w * h);
    const gxy = new Float64Array(w * h);
    // Sobel gradients → per-pixel tensor components.
    for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
            const i = y * w + x;
            const tl = lum[i - w - 1];
            const tc = lum[i - w];
            const tr = lum[i - w + 1];
            const ml = lum[i - 1];
            const mr = lum[i + 1];
            const bl = lum[i + w - 1];
            const bc = lum[i + w];
            const br = lum[i + w + 1];
            const gx = tr + 2 * mr + br - (tl + 2 * ml + bl);
            const gy = bl + 2 * bc + br - (tl + 2 * tc + tr);
            gxx[i] = gx * gx;
            gyy[i] = gy * gy;
            gxy[i] = gx * gy;
        }
    }
    // Separable Gaussian smoothing (σ≈2 → radius 4) of the tensor field.
    const radius = 4;
    const sigma = 2;
    const kernel = [];
    let ksum = 0;
    for (let k = -radius; k <= radius; k++) {
        const v = Math.exp(-(k * k) / (2 * sigma * sigma));
        kernel.push(v);
        ksum += v;
    }
    for (let k = 0; k < kernel.length; k++) kernel[k] /= ksum;
    const blur = (src) => {
        const tmp = new Float64Array(w * h);
        const out = new Float64Array(w * h);
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let acc = 0;
                for (let k = -radius; k <= radius; k++) {
                    const xx = Math.min(w - 1, Math.max(0, x + k));
                    acc += src[y * w + xx] * kernel[k + radius];
                }
                tmp[y * w + x] = acc;
            }
        }
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let acc = 0;
                for (let k = -radius; k <= radius; k++) {
                    const yy = Math.min(h - 1, Math.max(0, y + k));
                    acc += tmp[yy * w + x] * kernel[k + radius];
                }
                out[y * w + x] = acc;
            }
        }
        return out;
    };
    const sxx = blur(gxx);
    const syy = blur(gyy);
    const sxy = blur(gxy);

    const HIST_BINS = 18; // 10° bins over [0,180)
    const hist = new Float64Array(HIST_BINS);
    let sumA = 0;
    let n = 0;
    const inset = (1 - SAMPLE_SCALE) / 2;
    const x0 = Math.floor(w * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y0 = Math.floor(h * inset);
    const y1 = Math.ceil(h * (1 - inset));
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = y * w + x;
            const a = sxx[i];
            const b = sxy[i];
            const c = syy[i];
            const trace = a + c;
            const diff = a - c;
            const disc = Math.sqrt(diff * diff + 4 * b * b);
            const l1 = (trace + disc) / 2;
            const l2 = (trace - disc) / 2;
            const denom = l1 + l2;
            const aniso = denom > 1e-9 ? (l1 - l2) / denom : 0;
            sumA += aniso;
            n++;
            // Dominant orientation (minor-eigenvector ⟂ gradient) for the histogram.
            const theta = 0.5 * Math.atan2(2 * b, a - c); // gradient orientation
            let deg = ((theta * 180) / Math.PI + 90) % 180; // stroke ⟂ gradient
            if (deg < 0) deg += 180;
            hist[Math.min(HIST_BINS - 1, Math.floor((deg / 180) * HIST_BINS))] += aniso;
        }
    }
    // Pinwheel-banding proxy: peak-bin / mean-bin of the anisotropy-weighted histogram.
    let hmax = 0;
    let hsum = 0;
    for (const v of hist) {
        hsum += v;
        if (v > hmax) hmax = v;
    }
    const histPeakRatio = hsum > 0 ? hmax / (hsum / HIST_BINS) : 0;
    return { meanA: n > 0 ? sumA / n : 0, histPeakRatio };
}

// ── §4.3 — radial luminance power-spectrum slope (the −5/3 keystone) ─────────
// 2D FFT of a Hann-windowed square luminance window, radially-averaged power, log-log
// slope fit over the large-scale band. The band excludes the DC/lowest bins (finite-
// window bias) and the smallest scales (Batchelor −1 fine-dab regime + pixel noise), so
// the fit lands on the −5/3 inertial-cascade range Ma et al. measured (β=1.67±0.13).
function fft1d(re, im, inverse) {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) {
        let bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) {
            [re[i], re[j]] = [re[j], re[i]];
            [im[i], im[j]] = [im[j], im[i]];
        }
    }
    for (let len = 2; len <= n; len <<= 1) {
        const ang = ((inverse ? 1 : -1) * 2 * Math.PI) / len;
        const wr = Math.cos(ang);
        const wi = Math.sin(ang);
        for (let i = 0; i < n; i += len) {
            let cr = 1;
            let ci = 0;
            for (let k = 0; k < len / 2; k++) {
                const aRe = re[i + k];
                const aIm = im[i + k];
                const bRe = re[i + k + len / 2] * cr - im[i + k + len / 2] * ci;
                const bIm = re[i + k + len / 2] * ci + im[i + k + len / 2] * cr;
                re[i + k] = aRe + bRe;
                im[i + k] = aIm + bIm;
                re[i + k + len / 2] = aRe - bRe;
                im[i + k + len / 2] = aIm - bIm;
                const ncr = cr * wr - ci * wi;
                ci = cr * wi + ci * wr;
                cr = ncr;
            }
        }
    }
}

function powerSpectrumSlope(lum, w, h) {
    // Largest power-of-2 square that fits the interior.
    const minDim = Math.min(w, h);
    let N = 1;
    while (N * 2 <= minDim) N *= 2;
    const ox = Math.floor((w - N) / 2);
    const oy = Math.floor((h - N) / 2);

    // Hann window (separable) to suppress spectral leakage off the window edges.
    const hann = new Float64Array(N);
    for (let i = 0; i < N; i++) hann[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (N - 1));

    // Mean-subtract + window the interior square.
    let mean = 0;
    for (let y = 0; y < N; y++)
        for (let x = 0; x < N; x++) mean += lum[(oy + y) * w + (ox + x)];
    mean /= N * N;

    // Row FFTs.
    const re = [];
    const im = [];
    for (let y = 0; y < N; y++) {
        const rr = new Float64Array(N);
        const ii = new Float64Array(N);
        for (let x = 0; x < N; x++) rr[x] = (lum[(oy + y) * w + (ox + x)] - mean) * hann[x] * hann[y];
        fft1d(rr, ii, false);
        re.push(rr);
        im.push(ii);
    }
    // Column FFTs.
    for (let x = 0; x < N; x++) {
        const rr = new Float64Array(N);
        const ii = new Float64Array(N);
        for (let y = 0; y < N; y++) {
            rr[y] = re[y][x];
            ii[y] = im[y][x];
        }
        fft1d(rr, ii, false);
        for (let y = 0; y < N; y++) {
            re[y][x] = rr[y];
            im[y][x] = ii[y];
        }
    }

    // Radial average of the power spectrum (shift so DC is centred at N/2).
    const half = N / 2;
    const radialSum = new Float64Array(half + 1);
    const radialCnt = new Float64Array(half + 1);
    for (let y = 0; y < N; y++) {
        const ky = y < half ? y : y - N;
        for (let x = 0; x < N; x++) {
            const kx = x < half ? x : x - N;
            const r = Math.round(Math.sqrt(kx * kx + ky * ky));
            if (r > half) continue;
            const p = re[y][x] * re[y][x] + im[y][x] * im[y][x];
            radialSum[r] += p;
            radialCnt[r] += 1;
        }
    }

    // Fit slope over the large-scale inertial band. kMin excludes DC + the lowest 2 bins
    // (finite-window bias); kMax excludes the Batchelor −1 fine-dab regime + pixel noise
    // (the top quarter of the radial range). Ma et al. measured −5/3 over the LARGE
    // scales — the lower wavenumbers, which is exactly this band.
    const kMin = 3;
    const kMax = Math.floor(half * 0.5);
    const xs = [];
    const ys = [];
    for (let r = kMin; r <= kMax; r++) {
        if (radialCnt[r] === 0) continue;
        const pavg = radialSum[r] / radialCnt[r];
        if (pavg <= 0) continue;
        xs.push(Math.log(r));
        ys.push(Math.log(pavg));
    }
    // Ordinary least-squares slope of log(power) vs log(k).
    const m = xs.length;
    let sx = 0;
    let sy = 0;
    let sxx = 0;
    let sxy = 0;
    for (let i = 0; i < m; i++) {
        sx += xs[i];
        sy += ys[i];
        sxx += xs[i] * xs[i];
        sxy += xs[i] * ys[i];
    }
    const slope = (m * sxy - sx * sy) / (m * sxx - sx * sx);
    return { slope, bandLo: kMin, bandHi: kMax, fftSize: N };
}

// ── driver ───────────────────────────────────────────────────────────────────
function loadInterior(path) {
    const png = PNG.sync.read(readFileSync(path));
    const w = png.width;
    const h = png.height;
    // Full-frame luminance (the FFT windows its own interior square; the structure
    // tensor + colourfulness sample the central SAMPLE_SCALE box).
    const lum = new Float64Array(w * h);
    const inset = (1 - SAMPLE_SCALE) / 2;
    const x0 = Math.floor(w * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y0 = Math.floor(h * inset);
    const y1 = Math.ceil(h * (1 - inset));
    const rgb = new Float64Array((x1 - x0) * (y1 - y0) * 3);
    let ci = 0;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const r = png.data[i];
            const g = png.data[i + 1];
            const b = png.data[i + 2];
            lum[y * w + x] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            if (x >= x0 && x < x1 && y >= y0 && y < y1) {
                rgb[ci * 3] = r;
                rgb[ci * 3 + 1] = g;
                rgb[ci * 3 + 2] = b;
                ci++;
            }
        }
    }
    return { w, h, lum, rgb, rgbN: ci };
}

const path = process.argv[2];
if (!path) {
    console.error("usage: node scripts/aurora-arresting-metric.mjs <input.png>");
    process.exit(2);
}

const { w, h, lum, rgb, rgbN } = loadInterior(path);
const C = colorfulness(rgb, rgbN);
const { meanA, histPeakRatio } = structureTensorAnisotropy(lum, w, h);
const { slope, bandLo, bandHi, fftSize } = powerSpectrumSlope(lum, w, h);

// The Hasler-Süsstrunk category label for the printed C.
const CUTOFFS = [
    [109, "extremely"],
    [82, "highly"],
    [59, "quite"],
    [45, "averagely"],
    [33, "moderately"],
    [15, "slightly"],
    [0, "not"],
];
const label = CUTOFFS.find(([t]) => C >= t)[1];

// §4.3 acceptance band (the −5/3 Kolmogorov ± Ma-et-al. spread).
const SLOPE_LO = -1.85;
const SLOPE_HI = -1.45;
const inBand = slope >= SLOPE_LO && slope <= SLOPE_HI;

console.log(`aurora-arresting-metric — ${path}  (${w}×${h}, fft ${fftSize}×${fftSize})`);
console.log(`  §4.1 colorfulness   C = ${C.toFixed(2)}  (${label} colorful)`);
console.log(`  §4.2 anisotropy     A = ${meanA.toFixed(4)}  (hist peak/mean ${histPeakRatio.toFixed(2)})`);
console.log(`  §4.3 spectrum slope β = ${slope.toFixed(4)}  (band k∈[${bandLo},${bandHi}]; target [${SLOPE_LO}, ${SLOPE_HI}])`);
console.log(`  reference-anchor triple: { C: ${C.toFixed(2)}, A: ${meanA.toFixed(4)}, beta: ${slope.toFixed(4)} }`);
console.log(`  §4.3 in-band: ${inBand ? "YES" : "NO"}`);

// The harness MUST recover the −5/3 target on the ground-truth painting; a slope outside
// the band on Starry Night itself is a HARNESS bug (FFT band / luminance projection), not
// a research miss — fail loud so the diagnostic loop fires before the wave closes.
if (/starry-night/.test(path) && !inBand) {
    console.error(
        `\nHARNESS BUG: recovered β=${slope.toFixed(4)} on the ground-truth painting, outside [${SLOPE_LO}, ${SLOPE_HI}]. ` +
            `The harness cannot bound the downstream tuner until it recovers the paper's −5/3 on Starry Night itself.`,
    );
    process.exit(1);
}
