// aurora-arresting-readback — the THREE reference-anchored painterly metrics
// (RESEARCH.md §4), factored as importable readback math.
//
// This is the SHARED implementation: `scripts/aurora-arresting-metric.mjs` (the W-AUR1
// static-plate harness, consumer #1) carries a byte-equivalent copy for the standalone
// node CLI; the live-GPU `aurora-arresting.spec.ts` (W-AUR-PAINTERLY, consumer #2)
// imports THIS module so the colorfulness / structure-tensor anisotropy / power-spectrum
// slope read identically on the rendered medium readback (the substrate-with-consumer ≥2
// bar). One math home — keep this in lock-step with the metric script if either moves.
//
// §4.1 Hasler-Süsstrunk colorfulness   C = σ_rgyb + 0.3·μ_rgyb
// §4.2 structure-tensor anisotropy     A = (λ₁−λ₂)/(λ₁+λ₂)  (mean interior) + pinwheel ratio
// §4.3 radial luminance power-spectrum slope  β  (the −5/3 Kolmogorov keystone)

import { PNG } from "pngjs";

// The CANONICAL measurement width. The §1 reference plate `starry-night-crop.png` is
// 256×192; the live canvas screenshot is ~930px wide. The structure-tensor anisotropy
// (§4.2) and the power-spectrum slope (§4.3) are SPATIAL-FREQUENCY metrics — comparing a
// 930px render against a 256px-anchored band reads the WRONG band of the cascade (the
// fine pixel-scale speckle a 930px capture carries is below the reference plate's
// resolved-stroke scale and dilutes the directional coherence the band measures). Both
// the render AND the reference are normalised to ONE working width so the comparison is
// scale-matched (a box-filter downscale, the area-average that preserves the cascade
// energy distribution). The live aurora canvas screenshots at ≈930px; 464px is that
// halved (one octave down) — it lands the render's resolved-stroke scale on the 256px
// reference plate's band (Starry Night's strokes resolve at ≈30–50px in the 256 crop;
// our strokes at the halved width sit in the same resolved range). It is a fixed octave
// step, NOT a per-medium tuned width — the band is reference-anchored, the width is the
// reference-matched halving (the apples-to-apples read, not a resolution game).
export const CANONICAL_WIDTH = 464;

/** Area-average (box-filter) downscale to a fixed working width; preserves aspect. */
export function downscaleToWidth(src: PNG, targetW: number): PNG {
    if (src.width <= targetW) return src;
    const scale = src.width / targetW;
    const tw = targetW;
    const th = Math.max(1, Math.round(src.height / scale));
    const out = new PNG({ width: tw, height: th });
    for (let y = 0; y < th; y++) {
        for (let x = 0; x < tw; x++) {
            let r = 0;
            let g = 0;
            let b = 0;
            let cnt = 0;
            const sx0 = Math.floor(x * scale);
            const sx1 = Math.max(sx0 + 1, Math.floor((x + 1) * scale));
            const sy0 = Math.floor(y * scale);
            const sy1 = Math.max(sy0 + 1, Math.floor((y + 1) * scale));
            for (let sy = sy0; sy < sy1 && sy < src.height; sy++) {
                for (let sx = sx0; sx < sx1 && sx < src.width; sx++) {
                    const i = (sy * src.width + sx) * 4;
                    r += src.data[i]!;
                    g += src.data[i + 1]!;
                    b += src.data[i + 2]!;
                    cnt++;
                }
            }
            const o = (y * tw + x) * 4;
            out.data[o] = r / cnt;
            out.data[o + 1] = g / cnt;
            out.data[o + 2] = b / cnt;
            out.data[o + 3] = 255;
        }
    }
    return out;
}

// ── §4.1 — Hasler-Süsstrunk colorfulness ────────────────────────────────────
export function colorfulness(rgb: Float64Array, n: number): number {
    let sumRg = 0;
    let sumYb = 0;
    let sumRgSq = 0;
    let sumYbSq = 0;
    for (let i = 0; i < n; i++) {
        const r = rgb[i * 3]!;
        const g = rgb[i * 3 + 1]!;
        const b = rgb[i * 3 + 2]!;
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
export function structureTensorAnisotropy(
    lum: Float64Array,
    w: number,
    h: number,
    sampleScale: number,
): { meanA: number; histPeakRatio: number } {
    const gxx = new Float64Array(w * h);
    const gyy = new Float64Array(w * h);
    const gxy = new Float64Array(w * h);
    for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
            const i = y * w + x;
            const tl = lum[i - w - 1]!;
            const tc = lum[i - w]!;
            const tr = lum[i - w + 1]!;
            const ml = lum[i - 1]!;
            const mr = lum[i + 1]!;
            const bl = lum[i + w - 1]!;
            const bc = lum[i + w]!;
            const br = lum[i + w + 1]!;
            const gx = tr + 2 * mr + br - (tl + 2 * ml + bl);
            const gy = bl + 2 * bc + br - (tl + 2 * tc + tr);
            gxx[i] = gx * gx;
            gyy[i] = gy * gy;
            gxy[i] = gx * gy;
        }
    }
    const radius = 4;
    const sigma = 2;
    const kernel: number[] = [];
    let ksum = 0;
    for (let k = -radius; k <= radius; k++) {
        const v = Math.exp(-(k * k) / (2 * sigma * sigma));
        kernel.push(v);
        ksum += v;
    }
    for (let k = 0; k < kernel.length; k++) kernel[k]! /= ksum;
    const blur = (src: Float64Array): Float64Array => {
        const tmp = new Float64Array(w * h);
        const out = new Float64Array(w * h);
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let acc = 0;
                for (let k = -radius; k <= radius; k++) {
                    const xx = Math.min(w - 1, Math.max(0, x + k));
                    acc += src[y * w + xx]! * kernel[k + radius]!;
                }
                tmp[y * w + x] = acc;
            }
        }
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let acc = 0;
                for (let k = -radius; k <= radius; k++) {
                    const yy = Math.min(h - 1, Math.max(0, y + k));
                    acc += tmp[yy * w + x]! * kernel[k + radius]!;
                }
                out[y * w + x] = acc;
            }
        }
        return out;
    };
    const sxx = blur(gxx);
    const syy = blur(gyy);
    const sxy = blur(gxy);

    const HIST_BINS = 18;
    const hist = new Float64Array(HIST_BINS);
    let sumA = 0;
    let n = 0;
    const inset = (1 - sampleScale) / 2;
    const x0 = Math.floor(w * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y0 = Math.floor(h * inset);
    const y1 = Math.ceil(h * (1 - inset));
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = y * w + x;
            const a = sxx[i]!;
            const b = sxy[i]!;
            const c = syy[i]!;
            const trace = a + c;
            const diff = a - c;
            const disc = Math.sqrt(diff * diff + 4 * b * b);
            const l1 = (trace + disc) / 2;
            const l2 = (trace - disc) / 2;
            const denom = l1 + l2;
            const aniso = denom > 1e-9 ? (l1 - l2) / denom : 0;
            sumA += aniso;
            n++;
            const theta = 0.5 * Math.atan2(2 * b, a - c);
            let deg = ((theta * 180) / Math.PI + 90) % 180;
            if (deg < 0) deg += 180;
            hist[Math.min(HIST_BINS - 1, Math.floor((deg / 180) * HIST_BINS))]! += aniso;
        }
    }
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
function fft1d(re: Float64Array, im: Float64Array, inverse: boolean): void {
    const n = re.length;
    for (let i = 1, j = 0; i < n; i++) {
        let bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) {
            [re[i], re[j]] = [re[j]!, re[i]!];
            [im[i], im[j]] = [im[j]!, im[i]!];
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
                const aRe = re[i + k]!;
                const aIm = im[i + k]!;
                const bRe = re[i + k + len / 2]! * cr - im[i + k + len / 2]! * ci;
                const bIm = re[i + k + len / 2]! * ci + im[i + k + len / 2]! * cr;
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

export function powerSpectrumSlope(
    lum: Float64Array,
    w: number,
    h: number,
): { slope: number; bandLo: number; bandHi: number; fftSize: number } {
    const minDim = Math.min(w, h);
    let N = 1;
    while (N * 2 <= minDim) N *= 2;
    const ox = Math.floor((w - N) / 2);
    const oy = Math.floor((h - N) / 2);

    const hann = new Float64Array(N);
    for (let i = 0; i < N; i++) hann[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (N - 1));

    let mean = 0;
    for (let y = 0; y < N; y++)
        for (let x = 0; x < N; x++) mean += lum[(oy + y) * w + (ox + x)]!;
    mean /= N * N;

    const re: Float64Array[] = [];
    const im: Float64Array[] = [];
    for (let y = 0; y < N; y++) {
        const rr = new Float64Array(N);
        const ii = new Float64Array(N);
        for (let x = 0; x < N; x++)
            rr[x] = (lum[(oy + y) * w + (ox + x)]! - mean) * hann[x]! * hann[y]!;
        fft1d(rr, ii, false);
        re.push(rr);
        im.push(ii);
    }
    for (let x = 0; x < N; x++) {
        const rr = new Float64Array(N);
        const ii = new Float64Array(N);
        for (let y = 0; y < N; y++) {
            rr[y] = re[y]![x]!;
            ii[y] = im[y]![x]!;
        }
        fft1d(rr, ii, false);
        for (let y = 0; y < N; y++) {
            re[y]![x] = rr[y]!;
            im[y]![x] = ii[y]!;
        }
    }

    const half = N / 2;
    const radialSum = new Float64Array(half + 1);
    const radialCnt = new Float64Array(half + 1);
    for (let y = 0; y < N; y++) {
        const ky = y < half ? y : y - N;
        for (let x = 0; x < N; x++) {
            const kx = x < half ? x : x - N;
            const r = Math.round(Math.sqrt(kx * kx + ky * ky));
            if (r > half) continue;
            const p = re[y]![x]! * re[y]![x]! + im[y]![x]! * im[y]![x]!;
            radialSum[r]! += p;
            radialCnt[r]! += 1;
        }
    }

    const kMin = 3;
    const kMax = Math.floor(half * 0.5);
    const xs: number[] = [];
    const ys: number[] = [];
    for (let r = kMin; r <= kMax; r++) {
        if (radialCnt[r] === 0) continue;
        const pavg = radialSum[r]! / radialCnt[r]!;
        if (pavg <= 0) continue;
        xs.push(Math.log(r));
        ys.push(Math.log(pavg));
    }
    const m = xs.length;
    let sx = 0;
    let sy = 0;
    let sxx = 0;
    let sxy = 0;
    for (let i = 0; i < m; i++) {
        sx += xs[i]!;
        sy += ys[i]!;
        sxx += xs[i]! * xs[i]!;
        sxy += xs[i]! * ys[i]!;
    }
    const slope = (m * sxy - sx * sy) / (m * sxx - sx * sx);
    return { slope, bandLo: kMin, bandHi: kMax, fftSize: N };
}

// ── readback helpers from a decoded PNG ──────────────────────────────────────
/** Central `sampleScale` interior RGB triplets (colorfulness + anisotropy sampling box). */
export function interiorRGB(png: PNG, sampleScale: number): { rgb: Float64Array; n: number } {
    const w = png.width;
    const h = png.height;
    const inset = (1 - sampleScale) / 2;
    const x0 = Math.floor(w * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y0 = Math.floor(h * inset);
    const y1 = Math.ceil(h * (1 - inset));
    const rgb = new Float64Array((x1 - x0) * (y1 - y0) * 3);
    let ci = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            rgb[ci * 3] = png.data[i]!;
            rgb[ci * 3 + 1] = png.data[i + 1]!;
            rgb[ci * 3 + 2] = png.data[i + 2]!;
            ci++;
        }
    }
    return { rgb, n: ci };
}

/** Full-frame Rec.709 luminance (the FFT windows its own interior; the tensor insets). */
export function fullLuma(png: PNG): Float64Array {
    const w = png.width;
    const h = png.height;
    const lum = new Float64Array(w * h);
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            lum[y * w + x] =
                0.2126 * png.data[i]! + 0.7152 * png.data[i + 1]! + 0.0722 * png.data[i + 2]!;
        }
    }
    return lum;
}

/** The four AX not-flat floors interior readback (the floor STAYS below the arresting bar). */
export function notFlatFloors(
    png: PNG,
    inset: number,
): { variance: number; meanChroma: number; gapFraction: number; mean: [number, number, number] } {
    const w = png.width;
    const h = png.height;
    const x0 = Math.floor(w * inset);
    const y0 = Math.floor(h * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y1 = Math.ceil(h * (1 - inset));
    let sumLum = 0;
    let sumLumSq = 0;
    let sumChroma = 0;
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    let n = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            const r = png.data[i]!;
            const g = png.data[i + 1]!;
            const b = png.data[i + 2]!;
            const lum = (r + g + b) / 3;
            const chroma = Math.max(r, g, b) - Math.min(r, g, b);
            sumLum += lum;
            sumLumSq += lum * lum;
            sumChroma += chroma;
            sumR += r;
            sumG += g;
            sumB += b;
            n++;
        }
    }
    const meanLum = n === 0 ? 0 : sumLum / n;
    const gapThreshold = meanLum * 0.6;
    let darkCount = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            const lum = (png.data[i]! + png.data[i + 1]! + png.data[i + 2]!) / 3;
            if (lum < gapThreshold) darkCount++;
        }
    }
    const variance = n === 0 ? 0 : sumLumSq / n - meanLum * meanLum;
    return {
        variance,
        meanChroma: n === 0 ? 0 : sumChroma / n,
        gapFraction: n === 0 ? 0 : darkCount / n,
        mean: [sumR / n, sumG / n, sumB / n],
    };
}
